import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({
  variant = 'text', // text, circular, rectangular
  width = 'w-full',
  height = 'h-4',
  className = '',
  lines = 1,
  ...props
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded';
  
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md'
  };

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${width}
    ${height}
    ${className}
  `;

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2" {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${variants[variant]} ${height} ${
              index === lines - 1 ? 'w-3/4' : width
            }`}
          />
        ))}
      </div>
    );
  }

  return <div className={classes} {...props} />;
};

// Card Skeleton
export const CardSkeleton = ({ lines = 3 }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
    <div className="space-y-4">
      <Skeleton variant="circular" width="w-12 h-12" />
      <div className="space-y-2">
        <Skeleton width="w-3/4 h-6" />
        {Array.from({ length: lines - 1 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    </div>
  </div>
);

// Table Skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="px-6 py-4 text-left">
                <Skeleton width="w-24 h-4" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-100 dark:border-gray-700">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <Skeleton width="w-full h-4" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Skeleton;
