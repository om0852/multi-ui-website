'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchComponentCategories } from '../_lib/github';

export default function ComponentsPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        const categoriesData = await fetchComponentCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error loading component categories:', err);
        setError('Failed to load component categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">UI Components</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Browse our collection of UI components for your next project. Click on a category to view components.
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-400 border-t-transparent"></div>
          <span className="ml-3">Loading categories...</span>
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

      {!loading && !error && categories.length === 0 && (
        <div className="rounded-lg bg-yellow-50 p-4 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
          <p>No component categories found.</p>
          <p className="mt-2 text-sm">
            Please check your GitHub repository structure or configuration settings.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/components/${category.name}`}
            className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-primary-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-primary-700"
          >
            <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold capitalize">{category.name}</h3>
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              Browse {category.name} components
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
        <h2 className="text-xl font-bold">Don't see what you're looking for?</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          We're constantly adding new components. If you have a specific request, please check back soon or
          contact us.
        </p>
      </div>
    </div>
  );
} 