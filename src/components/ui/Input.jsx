import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationCircle } from 'react-icons/fa';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  loading = false,
  icon: Icon,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const baseClasses = 'w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0';
  
  const stateClasses = error
    ? 'border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/20'
    : 'border-gray-300 dark:border-gray-600 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white';

  const classes = `
    ${baseClasses}
    ${stateClasses}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${Icon ? 'pl-12' : ''}
    ${className}
  `;

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        )}
        
        <motion.input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={classes}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
        
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className="flex items-start space-x-2 text-sm">
          {error && <FaExclamationCircle className="text-red-500 mt-0.5 flex-shrink-0" />}
          <span className={error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}>
            {error || helperText}
          </span>
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
