'use server';

import { Octokit } from 'octokit';

// GitHub repository details - can be overridden with environment variables
const REPO_OWNER = process.env.REPO_OWNER || 'om0852'; // Using your GitHub username
const REPO_NAME = process.env.REPO_NAME || 'multi-ui'; // Your repository name
const COMPONENTS_BASE_PATH = 'app';

// Initialize Octokit with a PAT or use unauthenticated API for public repos
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // Set this in your .env.local file
});

/**
 * Fetches all component categories from the GitHub repository
 */
export async function fetchComponentCategories() {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: COMPONENTS_BASE_PATH,
    });

    // Filter directories that are likely component categories
    const componentCategories = Array.isArray(data)
      ? data
          .filter(item => 
            item.type === 'dir' && 
            !item.name.startsWith('_') && 
            !['api', 'docs', 'public', 'utils', 'lib'].includes(item.name)
          )
          .map(dir => ({
            name: dir.name,
            path: dir.path,
            url: dir.html_url,
          }))
      : [];

    return componentCategories;
  } catch (error) {
    console.error('Error fetching component categories:', error);
    console.error('Error details:', error.message);
    
    // Fallback to categories based on the folder structure shown
    return [
      {
        name: 'accordian',
        path: 'app/accordian',
        url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/main/app/accordian`,
      },
      {
        name: 'avatar',
        path: 'app/avatar',
        url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/main/app/avatar`,
      },
      {
        name: 'badges',
        path: 'app/badges',
        url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/main/app/badges`,
      },
      {
        name: 'bar',
        path: 'app/bar',
        url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/main/app/bar`,
      },
      {
        name: 'breadcrumbs',
        path: 'app/breadcrumbs',
        url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/main/app/breadcrumbs`,
      },
    ];
  }
}

/**
 * Fetches all components within a specific category
 */
export async function fetchCategoryComponents(categoryPath) {
  try {
    // First check if there's a _components directory
    const componentsPath = `${categoryPath}/_components`;
    
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: componentsPath,
      });

      if (Array.isArray(data)) {
        return data
          .filter(item => item.type === 'file' && (item.name.endsWith('.jsx') || item.name.endsWith('.tsx')))
          .map(file => ({
            name: file.name.replace(/\.(jsx|tsx)$/, ''),
            path: file.path,
            url: file.html_url,
            downloadUrl: file.download_url,
          }));
      }
    } catch (error) {
      console.error(`Error getting _components directory: ${error.message}`);
      
      // If _components directory doesn't exist, try to find components directly in the category
      try {
        const { data } = await octokit.rest.repos.getContent({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: categoryPath,
        });
  
        if (Array.isArray(data)) {
          return data
            .filter(item => 
              item.type === 'file' && 
              (item.name.endsWith('.jsx') || item.name.endsWith('.tsx')) &&
              !item.name.startsWith('page') &&
              !item.name.startsWith('layout') &&
              !item.name.startsWith('loading') &&
              !item.name.startsWith('error')
            )
            .map(file => ({
              name: file.name.replace(/\.(jsx|tsx)$/, ''),
              path: file.path,
              url: file.html_url,
              downloadUrl: file.download_url,
            }));
        }
      } catch (innerError) {
        console.error(`Error getting category contents: ${innerError.message}`);
        
        // Fallback to demo components if both approaches fail
        const category = categoryPath.split('/').pop();
        
        // Generate a list of 100 components for accordian
        if (category === 'accordian') {
          return Array.from({ length: 100 }, (_, i) => ({
            name: `Accordian_${i + 1}`,
            path: `${categoryPath}/_components/Accordian_${i + 1}.tsx`,
            url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/main/${categoryPath}/_components/Accordian_${i + 1}.tsx`,
            downloadUrl: `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${categoryPath}/_components/Accordian_${i + 1}.tsx`,
          }));
        }
        
        // For other categories, provide fewer examples
        const demoComponents = {
          avatar: [
            { name: 'Avatar_1', path: `${categoryPath}/_components/Avatar_1.tsx`, url: '#', downloadUrl: '#' },
            { name: 'Avatar_2', path: `${categoryPath}/_components/Avatar_2.tsx`, url: '#', downloadUrl: '#' },
          ],
          badges: [
            { name: 'Badge_1', path: `${categoryPath}/_components/Badge_1.tsx`, url: '#', downloadUrl: '#' },
            { name: 'Badge_2', path: `${categoryPath}/_components/Badge_2.tsx`, url: '#', downloadUrl: '#' },
            { name: 'Badge_3', path: `${categoryPath}/_components/Badge_3.tsx`, url: '#', downloadUrl: '#' },
          ],
          bar: [
            { name: 'Bar_1', path: `${categoryPath}/_components/Bar_1.tsx`, url: '#', downloadUrl: '#' },
            { name: 'Bar_2', path: `${categoryPath}/_components/Bar_2.tsx`, url: '#', downloadUrl: '#' },
          ],
          breadcrumbs: [
            { name: 'Breadcrumb_1', path: `${categoryPath}/_components/Breadcrumb_1.tsx`, url: '#', downloadUrl: '#' },
          ],
        };
        
        return demoComponents[category] || [];
      }
    }

    return [];
  } catch (error) {
    console.error(`Error fetching components for category ${categoryPath}:`, error);
    return [];
  }
}

/**
 * Fetches examples for a specific component
 */
export async function fetchComponentExamples(categoryPath) {
  try {
    const examplesPath = `${categoryPath}/examples`;
    
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: examplesPath,
      });

      if (Array.isArray(data)) {
        return data
          .filter(item => item.type === 'file' && (item.name.endsWith('.jsx') || item.name.endsWith('.tsx')))
          .map(file => ({
            name: file.name.replace(/\.(jsx|tsx)$/, ''),
            path: file.path,
            url: file.html_url,
            downloadUrl: file.download_url,
          }));
      }
    } catch (error) {
      console.error(`Error getting examples directory: ${error.message}`);
      
      // Generate more examples for accordian
      const category = categoryPath.split('/').pop();
      if (category === 'accordian') {
        return Array.from({ length: 100 }, (_, i) => ({
          name: `Example_${i + 1}`,
          path: `${categoryPath}/examples/Example_${i + 1}.tsx`,
          url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/main/${categoryPath}/examples/Example_${i + 1}.tsx`,
          downloadUrl: `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${categoryPath}/examples/Example_${i + 1}.tsx`,
        }));
      }
      
      // For other categories, fallback to demo examples
      const demoExamples = {
        avatar: [
          { name: 'Example_1', path: `${categoryPath}/examples/Example_1.tsx`, url: '#', downloadUrl: '#' },
        ],
        badges: [
          { name: 'Example_1', path: `${categoryPath}/examples/Example_1.tsx`, url: '#', downloadUrl: '#' },
          { name: 'Example_2', path: `${categoryPath}/examples/Example_2.tsx`, url: '#', downloadUrl: '#' },
        ],
        bar: [
          { name: 'Example_1', path: `${categoryPath}/examples/Example_1.tsx`, url: '#', downloadUrl: '#' },
        ],
        breadcrumbs: [
          { name: 'Example_1', path: `${categoryPath}/examples/Example_1.tsx`, url: '#', downloadUrl: '#' },
        ],
      };
      
      return demoExamples[category] || [];
    }

    return [];
  } catch (error) {
    console.error(`Error fetching examples for category ${categoryPath}:`, error);
    return [];
  }
}

/**
 * Fetches the content of a specific file
 */
export async function fetchFileContent(filePath) {
  try {
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: filePath,
      });
  
      if (data.type === 'file' && data.download_url) {
        const response = await fetch(data.download_url);
        return await response.text();
      }
    } catch (error) {
      console.error(`Error fetching file content for ${filePath}:`, error.message);
      
      // Return demo content as fallback
      const fileName = filePath.split('/').pop();
      const componentName = fileName.replace(/\.(jsx|tsx)$/, '');
      const componentType = filePath.includes('/_components/') ? 'component' : 'example';
      
      if (componentType === 'component') {
        return `import React from 'react';

export default function ${componentName}({ className, ...props }) {
  return (
    <div className={className} {...props}>
      <h3 className="text-lg font-medium">Demo ${componentName}</h3>
      <p>This is a demo component for preview purposes.</p>
      <p>Install using: npx multi-ui add ${componentName}</p>
    </div>
  );
}`;
      } else {
        const baseComponentName = componentName.replace(/Example_[0-9]+/, 'Component_1');
        return `import React from 'react';
import ${baseComponentName} from '../_components/${baseComponentName}';

export default function ${componentName}() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Example Usage</h2>
      <${baseComponentName} className="p-4 border rounded-md" />
    </div>
  );
}`;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error fetching file content for ${filePath}:`, error);
    return null;
  }
} 