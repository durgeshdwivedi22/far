import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  variant = 'default', // default, elevated, bordered
  padding = 'md', // sm, md, lg, xl
  hover = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'rounded-xl transition-all duration-200';
  
  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 shadow-lg border border-transparent',
    bordered: 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
  };
  
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${paddings[padding]}
    ${hover ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' : ''}
    ${className}
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { scale: 1.02 } : {}}
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
