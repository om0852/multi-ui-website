'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCategoryComponents } from '../../_lib/github';
import { use } from 'react';

export default function CategoryPage({ params }) {
  // Use React.use to unwrap the params Promise
  const unwrappedParams = use(params);
  const { category } = unwrappedParams;
  
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const componentsPerPage = 12;

  useEffect(() => {
    async function loadComponents() {
      try {
        setLoading(true);
        const categoryPath = `app/${category}`;
        const componentsData = await fetchCategoryComponents(categoryPath);
        setComponents(componentsData);
      } catch (err) {
        console.error(`Error loading components for category ${category}:`, err);
        setError(`Failed to load components for ${category}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    }

    loadComponents();
  }, [category]);

  // Calculate pagination
  const totalPages = Math.ceil(components.length / componentsPerPage);
  const indexOfLastComponent = currentPage * componentsPerPage;
  const indexOfFirstComponent = indexOfLastComponent - componentsPerPage;
  const currentComponents = components.slice(indexOfFirstComponent, indexOfLastComponent);
  
  // Handle page navigation
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <Link
          href="/components"
          className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
        >
          ← Back to Categories
        </Link>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter capitalize md:text-4xl">{category} Components</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Browse and preview {category} UI components for your next project.
          {components.length > 12 && ` Showing ${components.length} available components.`}
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-400 border-t-transparent"></div>
          <span className="ml-3">Loading components...</span>
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

      {!loading && !error && components.length === 0 && (
        <div className="rounded-lg bg-yellow-50 p-4 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
          <p>No components found in this category.</p>
          <p className="mt-2 text-sm">
            Please check your GitHub repository structure or try another category.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentComponents.map((component) => (
          <Link
            key={component.name}
            href={`/components/${category}/${component.name}`}
            className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-primary-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-primary-700"
          >
            <div className="mb-4 rounded bg-gray-100 p-6 text-center dark:bg-gray-800">
              <span className="text-4xl">⧉</span>
            </div>
            <h3 className="text-xl font-semibold capitalize">{component.name.replace(/_/g, ' ')}</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              A reusable {component.name.replace(/_/g, ' ')} component for your UI.
            </p>
          </Link>
        ))}
      </div>
      
      {/* Pagination */}
      {components.length > componentsPerPage && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button 
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              Previous
            </button>
            
            <div className="flex space-x-1">
              {/* Show limited page numbers with ellipsis */}
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                
                // Show first page, last page, current page, and pages around current
                if (
                  pageNumber === 1 || 
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === pageNumber
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
                  (pageNumber === 2 && currentPage > 3) ||
                  (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return <span key={pageNumber} className="px-2 py-1">...</span>;
                }
                
                return null;
              })}
            </div>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
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
  );
} 