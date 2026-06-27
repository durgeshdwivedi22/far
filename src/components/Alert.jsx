import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaTimes, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaExclamation } from 'react-icons/fa';
import { useTranslation } from '../utils/translation';
import { storage } from '../utils/storage';
import { navigateToRoute } from '../utils/router';
import toast from 'react-hot-toast';

const Alert = ({ isDarkMode = false }) => {
  const [alerts, setAlerts] = useState([]);
  const [showAlerts, setShowAlerts] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    generateAlerts();
    // Check for alerts every 5 minutes
    const interval = setInterval(generateAlerts, 300000);
    return () => clearInterval(interval);
  }, []);

  const generateAlerts = () => {
    const newAlerts = [];
    const expenses = storage.getExpenses();
    const user = storage.getUser();
    const today = new Date().toDateString();

    // Check if no expense added today
    const todayExpenses = expenses.filter(expense => 
      new Date(expense.date).toDateString() === today
    );

    if (todayExpenses.length === 0 && expenses.length > 0) {
      newAlerts.push({
        id: 'no-expense-today',
        type: 'warning',
        title: t('alerts.noExpenseToday'),
        message: 'Track your daily expenses for better financial management.',
        icon: FaExclamationTriangle,
        action: 'add-expense'
      });
    }

    // Check crop health reminder (every 3 days)
    const lastCropCheck = localStorage.getItem('lastCropCheck');
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    
    if (!lastCropCheck || new Date(lastCropCheck) < threeDaysAgo) {
      newAlerts.push({
        id: 'crop-health-check',
        type: 'info',
        title: t('alerts.checkCropHealth'),
        message: 'Regular health checks help prevent diseases and improve yield.',
        icon: FaCheckCircle,
        action: 'crop-health'
      });
    }

    // Weather alerts (mock)
    const weatherCondition = Math.random();
    if (weatherCondition > 0.8) {
      newAlerts.push({
        id: 'weather-alert',
        type: 'warning',
        title: t('alerts.weatherAlert'),
        message: 'Heavy rainfall expected in your area. Take necessary precautions.',
        icon: FaExclamation,
        action: 'weather'
      });
    }

    // Irrigation reminder
    const lastIrrigation = localStorage.getItem('lastIrrigation');
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    
    if (!lastIrrigation || new Date(lastIrrigation) < twoDaysAgo) {
      newAlerts.push({
        id: 'irrigation-reminder',
        type: 'info',
        title: t('alerts.irrigationReminder'),
        message: 'Check soil moisture and irrigate if needed.',
        icon: FaInfoCircle,
        action: 'irrigation'
      });
    }

    // Fertilization reminder (every 30 days)
    const lastFertilization = localStorage.getItem('lastFertilization');
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    if (!lastFertilization || new Date(lastFertilization) < thirtyDaysAgo) {
      newAlerts.push({
        id: 'fertilization-reminder',
        type: 'info',
        title: t('alerts.fertilizationReminder'),
        message: 'Consider fertilizing your crops for better growth.',
        icon: FaInfoCircle,
        action: 'fertilization'
      });
    }

    // Market price update notification
    const lastMarketUpdate = localStorage.getItem('lastMarketUpdate');
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    if (!lastMarketUpdate || new Date(lastMarketUpdate) < oneDayAgo) {
      newAlerts.push({
        id: 'market-update',
        type: 'success',
        title: t('alerts.marketUpdate'),
        message: 'Market prices have been updated. Check current rates.',
        icon: FaCheckCircle,
        action: 'market'
      });
    }

    // Profit target achievement
    const summary = storage.getFinancialSummary();
    const profitTarget = 50000; // Mock target
    
    if (summary.totalProfit > 0 && summary.totalProfit >= profitTarget * 0.9) {
      newAlerts.push({
        id: 'profit-target',
        type: 'success',
        title: t('alerts.profitTarget'),
        message: `You've achieved ${((summary.totalProfit / profitTarget) * 100).toFixed(1)}% of your profit target!`,
        icon: FaCheckCircle,
        action: 'analytics'
      });
    }

    // Loss warning
    const recentLosses = expenses.filter(e => 
      e.type === 'loss' && 
      (Date.now() - new Date(e.date).getTime()) < 7 * 24 * 60 * 60 * 1000
    );

    if (recentLosses.length > 0) {
      const totalRecentLoss = recentLosses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
      if (totalRecentLoss > 5000) {
        newAlerts.push({
          id: 'loss-warning',
          type: 'error',
          title: t('alerts.lossWarning'),
          message: `Recent losses of ₹${totalRecentLoss.toLocaleString()} detected. Review your farming practices.`,
          icon: FaExclamationTriangle,
          action: 'analytics'
        });
      }
    }

    setAlerts(newAlerts);
  };

  const handleAlertAction = (alert) => {
    switch (alert.action) {
      case 'add-expense':
        // Navigate to dashboard and open expense form
        navigateToRoute('/dashboard');
        toast.info('Add your daily expense to track finances better.');
        break;
      case 'crop-health':
        localStorage.setItem('lastCropCheck', new Date().toISOString());
        toast.success('Crop health check recorded!');
        break;
      case 'weather':
        navigateToRoute('/weather');
        break;
      case 'irrigation':
        localStorage.setItem('lastIrrigation', new Date().toISOString());
        toast.success('Irrigation reminder acknowledged!');
        break;
      case 'fertilization':
        localStorage.setItem('lastFertilization', new Date().toISOString());
        toast.success('Fertilization reminder acknowledged!');
        break;
      case 'market':
        localStorage.setItem('lastMarketUpdate', new Date().toISOString());
        navigateToRoute('/market');
        break;
      case 'analytics':
        navigateToRoute('/analytics');
        break;
      default:
        break;
    }
    
    // Remove the alert after action
    setAlerts(prev => prev.filter(a => a.id !== alert.id));
  };

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'success':
        return 'bg-green-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getAlertBgColor = (type) => {
    switch (type) {
      case 'error':
        return isDarkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200';
      case 'warning':
        return isDarkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200';
      case 'success':
        return isDarkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200';
      case 'info':
        return isDarkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200';
      default:
        return isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="relative">
      {/* Alert Bell */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowAlerts(!showAlerts)}
        className={`relative p-2 rounded-lg ${
          isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        <FaBell className="text-xl" />
        {alerts.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
          >
            {alerts.length}
          </motion.div>
        )}
      </motion.button>

      {/* Alerts Dropdown */}
      <AnimatePresence>
        {showAlerts && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-lg shadow-xl border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } z-50`}
          >
            <div className={`p-4 border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex justify-between items-center">
                <h3 className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {t('alerts.title')}
                </h3>
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {alerts.length} {alerts.length === 1 ? 'alert' : 'alerts'}
                </span>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {alerts.length === 0 ? (
                <div className={`p-8 text-center ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <FaCheckCircle className="text-4xl mx-auto mb-2 opacity-50" />
                  <p>All caught up! No new alerts.</p>
                </div>
              ) : (
                alerts.map((alert) => {
                  const Icon = alert.icon;
                  return (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 border-b last:border-b-0 ${
                        isDarkMode ? 'border-gray-700' : 'border-gray-100'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${getAlertColor(alert.type)} text-white`}>
                          <Icon className="text-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-semibold text-sm ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            {alert.title}
                          </h4>
                          <p className={`text-xs mt-1 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {alert.message}
                          </p>
                          <div className="flex space-x-2 mt-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAlertAction(alert)}
                              className={`text-xs px-2 py-1 rounded ${
                                isDarkMode
                                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              Take Action
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => dismissAlert(alert.id)}
                              className={`text-xs px-2 py-1 rounded ${
                                isDarkMode
                                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              Dismiss
                            </motion.button>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => dismissAlert(alert.id)}
                          className={`p-1 rounded ${
                            isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <FaTimes className="text-xs" />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {alerts.length > 0 && (
              <div className={`p-3 border-t ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAlerts([])}
                  className={`w-full py-2 rounded text-sm font-medium ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Clear All Alerts
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Alert;
