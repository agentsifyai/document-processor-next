'use client';

import { useState, useEffect } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error('Caught in error boundary:', error);
      setError(error.error);
      setHasError(true);
    };
    
    // Add event listener for unhandled errors
    window.addEventListener('error', errorHandler);
    
    // Clean up
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);
  
  // Reset the error state
  const resetError = () => {
    setHasError(false);
    setError(null);
  };
  
  // If there's an error, render an error message
  if (hasError) {
    return (
      <div className="p-4 border border-red-300 rounded bg-red-50 text-red-800 mb-4">
        <h3 className="text-lg font-medium mb-2">Something went wrong</h3>
        <p className="mb-3">
          An error occurred while processing the files. This could be due to a file format issue 
          or a problem with the analysis libraries.
        </p>
        {error && (
          <div className="p-2 bg-red-100 rounded mb-4 text-sm font-mono overflow-auto">
            {error.toString()}
          </div>
        )}
        <button 
          onClick={resetError}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Dismiss Error
        </button>
      </div>
    );
  }
  
  // Otherwise, render the children
  return <>{children}</>;
}