'use client';

import { useState } from 'react';

export default function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-400">
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <p className="mt-2">{error.message || 'An unexpected error occurred'}</p>
        <button
          onClick={() => setError(null)}
          className="mt-4 rounded-md bg-red-100 px-4 py-2 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div
      onError={(e) => {
        console.error('Error caught by error boundary:', e);
        setError(e);
      }}
    >
      {children}
    </div>
  );
} 