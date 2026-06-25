import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  delay = 0,
  isDarkMode = false 
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay
      }
    }
  };

  const motionProps = hover ? {
    whileHover: { 
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
    },
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      {...motionProps}
      className={`${
        isDarkMode ? 'glass-card-dark' : 'glass-card'
      } p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
