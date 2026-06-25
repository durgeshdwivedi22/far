import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaTerminal, FaKey, FaShieldAlt, FaRocket, FaCopy, FaCheck } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';

const ApiDocs = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FaCode },
    { id: 'authentication', name: 'Authentication', icon: FaKey },
    { id: 'endpoints', name: 'Endpoints', icon: FaTerminal },
    { id: 'examples', name: 'Examples', icon: FaRocket }
  ];

  const endpoints = [
    {
      method: 'GET',
      path: '/api/weather',
      description: 'Get current weather data for a location',
      parameters: [
        { name: 'lat', type: 'number', required: true, description: 'Latitude coordinate' },
        { name: 'lon', type: 'number', required: true, description: 'Longitude coordinate' }
      ]
    },
    {
      method: 'GET',
      path: '/api/crops',
      description: 'Get crop recommendations based on conditions',
      parameters: [
        { name: 'soil_type', type: 'string', required: true, description: 'Type of soil (sandy, clay, loam)' },
        { name: 'season', type: 'string', required: true, description: 'Current season (kharif, rabi)' }
      ]
    },
    {
      method: 'POST',
      path: '/api/farmer/record',
      description: 'Record farming activities and expenses',
      parameters: [
        { name: 'activity_type', type: 'string', required: true, description: 'Type of activity (planting, harvesting, etc.)' },
        { name: 'crop_id', type: 'string', required: true, description: 'ID of the crop' },
        { name: 'cost', type: 'number', required: false, description: 'Cost incurred' }
      ]
    },
    {
      method: 'GET',
      path: '/api/market/prices',
      description: 'Get current market prices for crops',
      parameters: [
        { name: 'crop', type: 'string', required: false, description: 'Specific crop to get prices for' },
        { name: 'region', type: 'string', required: false, description: 'Geographic region' }
      ]
    }
  ];

  const codeExamples = {
    weather: `// Get weather data
const response = await fetch('/api/weather?lat=28.6139&lon=77.2090', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const weatherData = await response.json();
console.log(weatherData);`,

    crops: `// Get crop recommendations
const response = await fetch('/api/crops?soil_type=loam&season=kharif', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const recommendations = await response.json();
console.log(recommendations);`,

    record: `// Record farming activity
const response = await fetch('/api/farmer/record', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    activity_type: 'planting',
    crop_id: 'wheat_001',
    cost: 1500,
    notes: 'Planted 2 acres of wheat'
  })
});

const result = await response.json();
console.log(result);`
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

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            🚀 API Documentation
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Integrate Smart Farmer Assistant into your applications
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="text-sm" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div variants={itemVariants}>
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <Card isDarkMode={isDarkMode}>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Welcome to Smart Farmer API
                </h2>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  The Smart Farmer API provides comprehensive access to farming data, weather information,
                  crop recommendations, and market insights. Built for developers who want to integrate
                  agricultural intelligence into their applications.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <FaCode className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-3" />
                    <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      RESTful API
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Standard REST endpoints with JSON responses
                    </p>
                  </div>

                  <div className="text-center p-6 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <FaShieldAlt className="text-green-600 dark:text-green-400 text-3xl mx-auto mb-3" />
                    <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Secure
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      JWT authentication and HTTPS encryption
                    </p>
                  </div>

                  <div className="text-center p-6 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                    <FaRocket className="text-purple-600 dark:text-purple-400 text-3xl mx-auto mb-3" />
                    <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Fast
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Optimized for speed with caching and CDN
                    </p>
                  </div>
                </div>
              </Card>

              <Card isDarkMode={isDarkMode}>
                <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Base URL
                </h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                  https://api.smartfarmer.com/v1
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'authentication' && (
            <div className="space-y-8">
              <Card isDarkMode={isDarkMode}>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Authentication
                </h2>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  All API requests require authentication using JWT tokens. You can obtain an API key
                  from your dashboard after registering for a developer account.
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Getting Your API Key
                    </h3>
                    <ol className={`list-decimal list-inside space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>Sign up for a developer account</li>
                      <li>Navigate to API Keys section in your dashboard</li>
                      <li>Generate a new API key</li>
                      <li>Copy and securely store your key</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Using Your API Key
                    </h3>
                    <p className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Include your API key in the Authorization header:
                    </p>
                    <div className="relative">
                      <pre className={`p-4 rounded-lg text-sm font-mono ${
                        isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'
                      }`}>
                        Authorization: Bearer YOUR_API_KEY_HERE
                      </pre>
                      <button
                        onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY_HERE', 'auth-header')}
                        className="absolute top-2 right-2 p-2 rounded bg-gray-600 hover:bg-gray-500 text-white"
                      >
                        {copiedCode === 'auth-header' ? <FaCheck /> : <FaCopy />}
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'endpoints' && (
            <div className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <Card key={index} isDarkMode={isDarkMode}>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`px-3 py-1 rounded text-sm font-bold ${
                      endpoint.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className={`font-mono text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {endpoint.path}
                    </code>
                  </div>

                  <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {endpoint.description}
                  </p>

                  {endpoint.parameters.length > 0 && (
                    <div>
                      <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Parameters
                      </h4>
                      <div className="overflow-x-auto">
                        <table className={`w-full text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                              <th className="text-left py-2">Name</th>
                              <th className="text-left py-2">Type</th>
                              <th className="text-left py-2">Required</th>
                              <th className="text-left py-2">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {endpoint.parameters.map((param, paramIndex) => (
                              <tr key={paramIndex} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                <td className="py-2 font-mono">{param.name}</td>
                                <td className="py-2">{param.type}</td>
                                <td className="py-2">
                                  <span className={`px-2 py-1 rounded text-xs ${
                                    param.required
                                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                  }`}>
                                    {param.required ? 'Yes' : 'No'}
                                  </span>
                                </td>
                                <td className="py-2">{param.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-8">
              <Card isDarkMode={isDarkMode}>
                <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Code Examples
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Get Weather Data
                    </h3>
                    <div className="relative">
                      <pre className={`p-4 rounded-lg text-sm font-mono overflow-x-auto ${
                        isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {codeExamples.weather}
                      </pre>
                      <button
                        onClick={() => copyToClipboard(codeExamples.weather, 'weather-code')}
                        className="absolute top-2 right-2 p-2 rounded bg-gray-600 hover:bg-gray-500 text-white"
                      >
                        {copiedCode === 'weather-code' ? <FaCheck /> : <FaCopy />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Get Crop Recommendations
                    </h3>
                    <div className="relative">
                      <pre className={`p-4 rounded-lg text-sm font-mono overflow-x-auto ${
                        isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {codeExamples.crops}
                      </pre>
                      <button
                        onClick={() => copyToClipboard(codeExamples.crops, 'crops-code')}
                        className="absolute top-2 right-2 p-2 rounded bg-gray-600 hover:bg-gray-500 text-white"
                      >
                        {copiedCode === 'crops-code' ? <FaCheck /> : <FaCopy />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Record Farming Activity
                    </h3>
                    <div className="relative">
                      <pre className={`p-4 rounded-lg text-sm font-mono overflow-x-auto ${
                        isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {codeExamples.record}
                      </pre>
                      <button
                        onClick={() => copyToClipboard(codeExamples.record, 'record-code')}
                        className="absolute top-2 right-2 p-2 rounded bg-gray-600 hover:bg-gray-500 text-white"
                      >
                        {copiedCode === 'record-code' ? <FaCheck /> : <FaCopy />}
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ApiDocs;