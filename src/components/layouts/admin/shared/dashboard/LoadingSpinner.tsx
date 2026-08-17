import React from 'react';
interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message }: LoadingSpinnerProps) => {
  return (
    <div className="flex justify-center py-12">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-gray-300 dark:border-gray-700 border-t-gray-900 dark:border-t-gray-400 rounded-full animate-spin"></div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading {message && message}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
