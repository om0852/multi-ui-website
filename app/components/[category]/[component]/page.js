'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { fetchFileContent, fetchComponentExamples } from '../../../_lib/github';

export default function ComponentPage({ params }) {
  // Use React.use to unwrap the params Promise
  const unwrappedParams = use(params);
  const { category, component } = unwrappedParams;
  
  const [componentContent, setComponentContent] = useState(null);
  const [examples, setExamples] = useState([]);
  const [exampleContents, setExampleContents] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedButton, setCopiedButton] = useState(null);
  
  // Pagination for examples
  const [currentExamplePage, setCurrentExamplePage] = useState(1);
  const examplesPerPage = 5;

  useEffect(() => {
    async function loadComponentAndExamples() {
      try {
        setLoading(true);
        
        // Fetch the component content
        const componentPath = `app/${category}/_components/${component}.tsx`;
        const content = await fetchFileContent(componentPath);
        
        if (!content) {
          // Try JSX if TSX not found
          const jsxContent = await fetchFileContent(`app/${category}/_components/${component}.jsx`);
          setComponentContent(jsxContent);
        } else {
          setComponentContent(content);
        }
        
        // Fetch example previews
        const categoryPath = `app/${category}`;
        const examplesData = await fetchComponentExamples(categoryPath);
        
        // Filter examples that match the current component
        const matchingExamples = examplesData.filter(
          (example) => example.name.toLowerCase().includes(component.toLowerCase())
        );
        setExamples(matchingExamples);
        
        // For performance reasons, only fetch content for the first page initially
        const firstPageExamples = matchingExamples.slice(0, examplesPerPage);
        const contents = {};
        
        await Promise.all(
          firstPageExamples.map(async (example) => {
            const exampleContent = await fetchFileContent(example.path);
            contents[example.name] = exampleContent;
          })
        );
        
        setExampleContents(contents);
      } catch (err) {
        console.error(`Error loading component ${component}:`, err);
        setError(`Failed to load component details. Please try again later.`);
      } finally {
        setLoading(false);
      }
    }
    
    loadComponentAndExamples();
  }, [category, component]);
  
  // Load additional example contents when page changes
  useEffect(() => {
    async function loadPageExamples() {
      try {
        const startIndex = (currentExamplePage - 1) * examplesPerPage;
        const endIndex = startIndex + examplesPerPage;
        const pageExamples = examples.slice(startIndex, endIndex);
        
        // Skip examples we already have content for
        const examplesMissingContent = pageExamples.filter(
          example => !exampleContents[example.name]
        );
        
        if (examplesMissingContent.length > 0) {
          setLoading(true);
          const newContents = { ...exampleContents };
          
          await Promise.all(
            examplesMissingContent.map(async (example) => {
              const exampleContent = await fetchFileContent(example.path);
              newContents[example.name] = exampleContent;
            })
          );
          
          setExampleContents(newContents);
        }
      } catch (err) {
        console.error(`Error loading examples for page ${currentExamplePage}:`, err);
      } finally {
        setLoading(false);
      }
    }
    
    if (examples.length > 0) {
      loadPageExamples();
    }
  }, [currentExamplePage, examples, exampleContents]);

  const handleCopyInstall = () => {
    const installCommand = `npm install @multi-ui/${category}-${component.toLowerCase().replace(/_/g, '-')}`;
    navigator.clipboard.writeText(installCommand).then(() => {
      setCopiedButton('install');
      setTimeout(() => setCopiedButton(null), 2000);
    });
  };

  const handleCopyCLI = () => {
    const cliCommand = `npx multi-ui add ${component}`;
    navigator.clipboard.writeText(cliCommand).then(() => {
      setCopiedButton('cli');
      setTimeout(() => setCopiedButton(null), 2000);
    });
  };
  
  // Calculate pagination for examples
  const totalExamplePages = Math.ceil(examples.length / examplesPerPage);
  const currentPageExamples = examples.slice(
    (currentExamplePage - 1) * examplesPerPage,
    currentExamplePage * examplesPerPage
  );
  
  // Handle example pagination
  const paginateExamples = (pageNumber) => setCurrentExamplePage(pageNumber);
  const goToNextExamplePage = () => setCurrentExamplePage(prev => Math.min(prev + 1, totalExamplePages));
  const goToPrevExamplePage = () => setCurrentExamplePage(prev => Math.max(prev - 1, 1));

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <Link
          href={`/components/${category}`}
          className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
        >
          ← Back to {category} Components
        </Link>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter capitalize md:text-4xl">
          {component.replace(/_/g, ' ')}
        </h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          A reusable {component.replace(/_/g, ' ')} component for your UI projects.
          {examples.length > 0 && ` (${examples.length} examples available)`}
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-400 border-t-transparent"></div>
          <span className="ml-3">Loading component details...</span>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-400">
          <p>{error}</p>
          <p className="mt-2 text-sm">
            Make sure you have the correct GitHub repository settings in the configuration.
          </p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Installation section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <h2 className="text-xl font-semibold">Installation</h2>
            
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="mb-2 text-base font-medium">Option 1: Using CLI (Recommended)</h3>
                <div className="flex items-center rounded-md bg-gray-100 p-3 dark:bg-gray-800">
                  <code className="flex-1 font-mono text-sm">
                    npx multi-ui add {component}
                  </code>
                  <button
                    onClick={handleCopyCLI}
                    className="ml-2 rounded-md bg-primary-100 p-2 text-primary-600 transition-colors hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50"
                    aria-label="Copy CLI command"
                  >
                    {copiedButton === 'cli' ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Make sure you have installed the Multi UI CLI first: <code className="bg-gray-100 px-1 py-0.5 text-xs dark:bg-gray-800">npm install @omsalunke0852/multi-ui-cli</code>
                </p>
              </div>
              
              <div>
                <h3 className="mb-2 text-base font-medium">Option 2: NPM Package</h3>
                <div className="flex items-center rounded-md bg-gray-100 p-3 dark:bg-gray-800">
                  <code className="flex-1 font-mono text-sm">
                    npm install @multi-ui/{category}-{component.toLowerCase().replace(/_/g, '-')}
                  </code>
                  <button
                    onClick={handleCopyInstall}
                    className="ml-2 rounded-md bg-primary-100 p-2 text-primary-600 transition-colors hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50"
                    aria-label="Copy installation command"
                  >
                    {copiedButton === 'install' ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Component code section */}
          {componentContent && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
              <h2 className="text-xl font-semibold">Component Source</h2>
              <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                <SyntaxHighlighter
                  language="jsx"
                  style={nightOwl}
                  customStyle={{ margin: 0, borderRadius: '0.5rem', maxHeight: '400px' }}
                >
                  {componentContent}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          {/* Examples section */}
          {examples.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Examples</h2>
                {examples.length > examplesPerPage && (
                  <div className="text-sm text-gray-500">
                    Showing {((currentExamplePage - 1) * examplesPerPage) + 1} to {Math.min(currentExamplePage * examplesPerPage, examples.length)} of {examples.length} examples
                  </div>
                )}
              </div>
              
              <div className="mt-6 grid grid-cols-1 gap-8">
                {currentPageExamples.map((example, index) => (
                  <div key={example.name} className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 flex justify-between items-center">
                      <h3 className="font-medium">{example.name.replace(/_/g, ' ')}</h3>
                      <a 
                        href={example.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        View on GitHub
                      </a>
                    </div>
                    
                    {exampleContents[example.name] ? (
                      <SyntaxHighlighter
                        language="jsx"
                        style={nightOwl}
                        customStyle={{ margin: 0, borderRadius: '0' }}
                      >
                        {exampleContents[example.name]}
                      </SyntaxHighlighter>
                    ) : (
                      <div className="p-4 flex items-center justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary-400 border-t-transparent"></div>
                        <span className="ml-3 text-sm">Loading example...</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Example pagination */}
              {examples.length > examplesPerPage && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center space-x-2">
                    <button 
                      onClick={goToPrevExamplePage}
                      disabled={currentExamplePage === 1}
                      className={`px-3 py-1 rounded-md ${
                        currentExamplePage === 1 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                    >
                      Previous
                    </button>
                    
                    <div className="flex space-x-1">
                      {/* Show limited page numbers with ellipsis */}
                      {[...Array(totalExamplePages)].map((_, index) => {
                        const pageNumber = index + 1;
                        
                        // Show first page, last page, current page, and pages around current
                        if (
                          pageNumber === 1 || 
                          pageNumber === totalExamplePages ||
                          (pageNumber >= currentExamplePage - 1 && pageNumber <= currentExamplePage + 1)
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => paginateExamples(pageNumber)}
                              className={`px-3 py-1 rounded-md ${
                                currentExamplePage === pageNumber
                                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        }
                        
                        // Add ellipsis
                        if (
                          (pageNumber === 2 && currentExamplePage > 3) ||
                          (pageNumber === totalExamplePages - 1 && currentExamplePage < totalExamplePages - 2)
                        ) {
                          return <span key={pageNumber} className="px-2 py-1">...</span>;
                        }
                        
                        return null;
                      })}
                    </div>
                    
                    <button
                      onClick={goToNextExamplePage}
                      disabled={currentExamplePage === totalExamplePages}
                      className={`px-3 py-1 rounded-md ${
                        currentExamplePage === totalExamplePages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </div>
          )}

          {/* Usage section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <h2 className="text-xl font-semibold">Usage</h2>
            <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <SyntaxHighlighter
                language="jsx"
                style={nightOwl}
                customStyle={{ margin: 0, borderRadius: '0.5rem' }}
              >
{`import { ${component} } from '@multi-ui/${category}-${component.toLowerCase().replace(/_/g, '-')}';

export default function MyComponent() {
  return (
    <div>
      <${component} />
    </div>
  );
}`}
              </SyntaxHighlighter>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 