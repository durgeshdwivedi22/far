import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaMoon,
  FaSun,
  FaBell,
  FaShieldAlt,
  FaUser,
  FaGlobe,
  FaSave,
  FaToggleOn,
  FaToggleOff,
  FaLanguage,
  FaLock,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import { storage } from '../utils/storage';
import { useTranslation } from '../utils/translation';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';
import toast from 'react-hot-toast';

const Settings = () => {
  const { isDarkMode, settings, updateSettings } = useTheme();
  const [localSettings, setLocalSettings] = useState(settings);
  const [language, setLanguage] = useState('en');
  const { t } = useTranslation(language);

  useEffect(() => {
    // Sync local settings with global settings
    setLocalSettings(settings);
    setLanguage(settings.language || 'en');
  }, [settings]);

  const handleSettingChange = (category, key, value) => {
    const updated =
      category === 'darkMode' || category === 'language'
        ? { ...localSettings, [category]: value }
        : {
            ...localSettings,
            [category]: {
              ...localSettings[category],
              [key]: value,
            },
          };

    setLocalSettings(updated);
    updateSettings(updated);

    if (category === 'language') {
      setLanguage(value);
    }
  };

  const handleSaveSettings = () => {
    try {
      // Update all settings globally
      updateSettings(localSettings);
      toast.success('Settings saved successfully!');

      // Update language if changed
      if (localSettings.language !== language) {
        setLanguage(localSettings.language);
        window.location.reload(); // Reload to apply language changes
      }
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const currentSettings = localSettings || settings || {};
  const notificationState = currentSettings.notifications || {};
  const privacyState = currentSettings.privacy || { profileVisibility: 'public', dataSharing: false };
  const preferencesState = currentSettings.preferences || {
    currency: 'INR',
    units: 'metric',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            ⚙️ Settings
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Customize your Smart Farmer Assistant experience
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Appearance Settings */}
          <motion.div variants={itemVariants}>
            <Card isDarkMode={isDarkMode}>
              <div className="flex items-center mb-6">
                {currentSettings.darkMode ? (
                  <FaMoon className="text-2xl mr-3 text-blue-400" />
                ) : (
                  <FaSun className="text-2xl mr-3 text-yellow-500" />
                )}
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Appearance
                </h2>
              </div>

              <div className="space-y-6">
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaMoon className={`text-xl mr-3 ${isDarkMode ? 'text-blue-400' : 'text-gray-600'}`} />
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Dark Mode
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Toggle between light and dark themes
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('darkMode', null, !currentSettings.darkMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      currentSettings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        currentSettings.darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Language Selection */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaGlobe className={`text-xl mr-3 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Language
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Choose your preferred language
                      </p>
                    </div>
                  </div>
                  <select
                    value={currentSettings.language}
                    onChange={(e) => handleSettingChange('language', null, e.target.value)}
                    className={`p-2 rounded-lg border ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="te">తెలుగు</option>
                    <option value="ta">தமிழ்</option>
                    <option value="kn">ಕನ್ನಡ</option>
                  </select>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div variants={itemVariants}>
            <Card isDarkMode={isDarkMode}>
              <div className="flex items-center mb-6">
                <FaBell className="text-2xl mr-3 text-orange-500" />
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Notifications
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'weatherAlerts', label: 'Weather Alerts', desc: 'Get notified about weather changes' },
                  { key: 'marketUpdates', label: 'Market Updates', desc: 'Receive crop price updates' },
                  { key: 'cropReminders', label: 'Crop Reminders', desc: 'Reminders for planting and harvesting' },
                  { key: 'expenseAlerts', label: 'Expense Alerts', desc: 'Notifications for expense tracking' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {item.label}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('notifications', item.key, !notificationState[item.key])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notificationState[item.key] ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationState[item.key] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div variants={itemVariants}>
            <Card isDarkMode={isDarkMode}>
              <div className="flex items-center mb-6">
                <FaShieldAlt className="text-2xl mr-3 text-red-500" />
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Privacy & Security
                </h2>
              </div>

              <div className="space-y-6">
                {/* Profile Visibility */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaEye className={`text-xl mr-3 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Profile Visibility
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Control who can see your profile
                      </p>
                    </div>
                  </div>
                  <select
                    value={privacyState.profileVisibility}
                    onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                    className={`p-2 rounded-lg border ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                {/* Data Sharing */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaLock className={`text-xl mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Data Sharing
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Allow sharing anonymized data for improvements
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('privacy', 'dataSharing', !privacyState.dataSharing)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      privacyState.dataSharing ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        privacyState.dataSharing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Preferences */}
          <motion.div variants={itemVariants}>
            <Card isDarkMode={isDarkMode}>
              <div className="flex items-center mb-6">
                <FaUser className="text-2xl mr-3 text-teal-500" />
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Preferences
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Currency */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Currency
                  </label>
                  <select
                    value={preferencesState.currency}
                    onChange={(e) => handleSettingChange('preferences', 'currency', e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>

                {/* Units */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Units
                  </label>
                  <select
                    value={preferencesState.units}
                    onChange={(e) => handleSettingChange('preferences', 'units', e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="metric">Metric</option>
                    <option value="imperial">Imperial</option>
                  </select>
                </div>

                {/* Date Format */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Date Format
                  </label>
                  <select
                    value={preferencesState.dateFormat}
                    onChange={(e) => handleSettingChange('preferences', 'dateFormat', e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                {/* Time Format */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Time Format
                  </label>
                  <select
                    value={preferencesState.timeFormat}
                    onChange={(e) => handleSettingChange('preferences', 'timeFormat', e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="12h">12 Hour</option>
                    <option value="24h">24 Hour</option>
                  </select>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Save Button */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveSettings}
              className="flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg"
            >
              <FaSave className="mr-2" />
              Save Settings
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;