import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaUser, FaArrowRight } from 'react-icons/fa';
import { storage } from '../utils/storage';
import { navigateToRoute } from '../utils/router';

const ProtectedRoute = ({ children, requiredAuth = true }) => {
  const user = storage.getUser();

  // If authentication is required and user is not logged in
  if (requiredAuth && !user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4"
      >
        <div className="max-w-md w-full">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaLock className="text-3xl text-green-600 dark:text-green-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Login Required
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Please login to access this page. This area contains your personal farming data, analytics, and management tools.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => navigateToRoute('/login')}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                <FaUser className="text-sm" />
                <span>Login to Continue</span>
                <FaArrowRight className="text-sm" />
              </button>
              
              <button
                onClick={() => navigateToRoute('/market')}
                className="w-full px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
              >
                Browse Public Features
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{' '}
                <button
                  onClick={() => navigateToRoute('/register')}
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
                >
                  Sign up for free
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // If authentication is NOT required and user IS logged in (for login/register pages)
  if (!requiredAuth && user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
