import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaExclamation } from 'react-icons/fa';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      message: notification.message,
      type: notification.type || 'info', // success, error, warning, info
      duration: notification.duration || 4000,
      persistent: notification.persistent || false
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-dismiss if not persistent
    if (!newNotification.persistent) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, [removeNotification]);

  // Global notification function
  useEffect(() => {
    window.notify = addNotification;
    window.removeNotification = removeNotification;
    
    return () => {
      delete window.notify;
      delete window.removeNotification;
    };
  }, [addNotification, removeNotification]);

  const getNotificationIcon = (type) => {
    const icons = {
      success: <FaCheckCircle />,
      error: <FaExclamation />,
      warning: <FaExclamationTriangle />,
      info: <FaInfoCircle />
    };
    return icons[type] || icons.info;
  };

  const getNotificationStyles = (type) => {
    const styles = {
      success: 'bg-green-500 border-green-600',
      error: 'bg-red-500 border-red-600',
      warning: 'bg-yellow-500 border-yellow-600',
      info: 'bg-blue-500 border-blue-600'
    };
    return styles[type] || styles.info;
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`
              ${getNotificationStyles(notification.type)}
              text-white px-4 py-3 rounded-lg shadow-lg border
              flex items-start space-x-3 min-w-[300px]
              backdrop-blur-sm
            `}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getNotificationIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-tight">
                {notification.message}
              </p>
            </div>
            
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 ml-2 text-white/80 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <FaTimes className="text-sm" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;
