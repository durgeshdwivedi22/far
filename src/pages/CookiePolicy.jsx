import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCookieBite, FaToggleOn, FaToggleOff, FaInfoCircle, FaShieldAlt, FaChartLine } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';

const CookiePolicy = () => {
  const { isDarkMode } = useTheme();
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: true,
    marketing: false,
    functional: true
  });

  const handlePreferenceChange = (cookieType, value) => {
    if (cookieType === 'essential') return; // Essential cookies cannot be disabled
    setCookiePreferences(prev => ({
      ...prev,
      [cookieType]: value
    }));
  };

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      icon: FaShieldAlt,
      required: true,
      description: 'These cookies are necessary for the website to function and cannot be switched off in our systems.',
      purpose: 'Enable core functionality like security, network management, and accessibility.',
      duration: 'Session or persistent (varies)',
      examples: ['Authentication tokens', 'Security cookies', 'Load balancing cookies']
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      icon: FaToggleOn,
      required: false,
      description: 'These cookies enable the website to provide enhanced functionality and personalization.',
      purpose: 'Remember your preferences, language settings, and theme choices.',
      duration: '1 year',
      examples: ['Theme preferences', 'Language settings', 'Form data preservation']
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      icon: FaChartLine,
      required: false,
      description: 'These cookies help us understand how visitors interact with our website.',
      purpose: 'Collect information about website usage to improve our services.',
      duration: '2 years',
      examples: ['Page views', 'Click patterns', 'Session duration', 'Device information']
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      icon: FaCookieBite,
      required: false,
      description: 'These cookies are used to track visitors across websites to display relevant advertisements.',
      purpose: 'Deliver personalized advertisements and measure campaign effectiveness.',
      duration: '1 year',
      examples: ['Advertising targeting', 'Campaign tracking', 'Retargeting cookies']
    }
  ];

  const thirdPartyServices = [
    {
      name: 'Google Analytics',
      purpose: 'Website analytics and performance monitoring',
      cookies: ['_ga', '_gid', '_gat', 'AMP_TOKEN'],
      duration: '2 years',
      privacy: 'https://policies.google.com/privacy'
    },
    {
      name: 'Google Tag Manager',
      purpose: 'Tag management for analytics and marketing tools',
      cookies: ['_dc_gtm_', 'gtm_'],
      duration: 'Session',
      privacy: 'https://policies.google.com/privacy'
    },
    {
      name: 'Stripe',
      purpose: 'Payment processing (when applicable)',
      cookies: ['__stripe_mid', '__stripe_sid'],
      duration: '1 year',
      privacy: 'https://stripe.com/privacy'
    }
  ];

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

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            🍪 Cookie Policy
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            How we use cookies and how to manage your preferences
          </p>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Last updated: January 15, 2024
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card isDarkMode={isDarkMode}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              What Are Cookies?
            </h2>
            <p className={`text-base leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better browsing experience by remembering your preferences and understanding how you use our site.
            </p>
            <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              This policy explains what cookies we use, why we use them, and how you can control your cookie preferences. You can manage your cookie settings at any time using the controls below.
            </p>
          </Card>
        </motion.div>

        {/* Cookie Preferences */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card isDarkMode={isDarkMode}>
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Your Cookie Preferences
            </h2>

            <div className="space-y-6">
              {cookieTypes.map((cookieType) => {
                const Icon = cookieType.icon;
                const isEnabled = cookiePreferences[cookieType.id];

                return (
                  <div key={cookieType.id} className="flex items-start justify-between p-4 border rounded-lg border-gray-200 dark:border-gray-600">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        cookieType.required ? 'bg-red-100 dark:bg-red-900/20' : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <Icon className={`text-lg ${
                          cookieType.required
                            ? (isDarkMode ? 'text-red-400' : 'text-red-600')
                            : (isDarkMode ? 'text-gray-300' : 'text-gray-600')
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {cookieType.name}
                          </h3>
                          {cookieType.required && (
                            <span className="text-xs bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400 px-2 py-1 rounded-full">
                              Required
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {cookieType.description}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Duration: {cookieType.duration}
                        </p>
                      </div>
                    </div>

                    <div className="ml-4">
                      {cookieType.required ? (
                        <div className="flex items-center space-x-2">
                          <FaToggleOn className="text-green-500 text-xl" />
                          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                            Always On
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePreferenceChange(cookieType.id, !isEnabled)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                            isEnabled
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                              : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                          }`}
                        >
                          {isEnabled ? (
                            <FaToggleOn className="text-green-500" />
                          ) : (
                            <FaToggleOff className="text-gray-400" />
                          )}
                          <span className="text-sm font-medium">
                            {isEnabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Save Preferences
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Detailed Cookie Information */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Detailed Cookie Information
          </h2>

          <div className="space-y-6">
            {cookieTypes.map((cookieType) => {
              const Icon = cookieType.icon;
              return (
                <Card key={cookieType.id} isDarkMode={isDarkMode}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className={`text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {cookieType.name}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            Purpose
                          </h4>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {cookieType.purpose}
                          </p>
                        </div>

                        <div>
                          <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            Duration
                          </h4>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {cookieType.duration}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          Examples
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {cookieType.examples.map((example, index) => (
                            <span
                              key={index}
                              className={`text-xs px-2 py-1 rounded ${
                                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Third-Party Cookies */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card isDarkMode={isDarkMode}>
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Third-Party Services
            </h2>

            <div className="space-y-4">
              {thirdPartyServices.map((service, index) => (
                <div key={index} className="p-4 border rounded-lg border-gray-200 dark:border-gray-600">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {service.name}
                    </h3>
                    <a
                      href={service.privacy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                    >
                      Privacy Policy →
                    </a>
                  </div>

                  <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {service.purpose}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Cookies:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {service.cookies.map((cookie, cookieIndex) => (
                          <code key={cookieIndex} className={`px-2 py-1 rounded text-xs ${
                            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {cookie}
                          </code>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Duration:
                      </span>
                      <span className={`ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {service.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Managing Cookies */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card isDarkMode={isDarkMode}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Managing Your Cookies
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Browser Settings
                </h3>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  You can control cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• View what cookies are stored and delete them individually</li>
                  <li>• Block third-party cookies</li>
                  <li>• Block cookies from specific sites</li>
                  <li>• Clear all cookies when you close the browser</li>
                </ul>
              </div>

              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Opt-Out Links
                </h3>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  For specific opt-out options:
                </p>
                <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics Opt-out</a></li>
                  <li>• <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ads Settings</a></li>
                  <li>• Network Advertising Initiative: <a href="http://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">optout.aboutads.info</a></li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div variants={itemVariants}>
          <Card isDarkMode={isDarkMode}>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaInfoCircle className={`text-xl ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Questions About Cookies?
                </h2>
                <p className={`text-base leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  If you have any questions about our use of cookies or need help managing your preferences, please contact us:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Privacy Team
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      privacy@smartfarmer.com
                    </p>
                  </div>

                  <div>
                    <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Support
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      support@smartfarmer.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CookiePolicy;