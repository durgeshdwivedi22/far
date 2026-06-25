import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobe, FaCheck } from 'react-icons/fa';
import { supportedLanguages } from '../utils/translation';
import { storage } from '../utils/storage';

const LanguageToggle = ({ isDarkMode = false, onLanguageChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load saved language preference
    const settings = storage.getSettings();
    const savedLanguage = settings.language || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    setIsOpen(false);
    
    // Save language preference
    const settings = storage.getSettings();
    storage.saveSettings({ ...settings, language: languageCode });
    
    // Notify parent component
    if (onLanguageChange) {
      onLanguageChange(languageCode);
    }
  };

  const getCurrentLanguageInfo = () => {
    return supportedLanguages.find(lang => lang.code === currentLanguage) || supportedLanguages[0];
  };

  return (
    <div className="relative">
      {/* Language Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
          isDarkMode
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        } shadow-md border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}
      >
        <FaGlobe className="text-sm" />
        <span className="text-sm font-medium">
          {getCurrentLanguageInfo().nativeName}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      {/* Language Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } z-50`}
          >
            <div className={`p-2`}>
              {supportedLanguages.map((language) => (
                <motion.button
                  key={language.code}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    currentLanguage === language.code
                      ? isDarkMode
                        ? 'bg-green-900/30 text-green-400'
                        : 'bg-green-50 text-green-700'
                      : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {language.code === 'en' ? '🇺🇸' : '🇮🇳'}
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {language.nativeName}
                      </div>
                      <div className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {language.name}
                      </div>
                    </div>
                  </div>
                  {currentLanguage === language.code && (
                    <FaCheck className="text-sm" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Language Info Footer */}
            <div className={`p-3 border-t text-xs ${
              isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'
            }`}>
              <div className="flex items-center justify-center space-x-2">
                <FaGlobe className="text-xs" />
                <span>Choose your preferred language</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageToggle;
