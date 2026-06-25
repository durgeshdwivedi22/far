import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaSearch, FaQuestionCircle, FaVideo, FaFileAlt, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';

const KnowledgeBase = () => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: FaBook },
    { id: 'getting-started', name: 'Getting Started', icon: FaQuestionCircle },
    { id: 'tutorials', name: 'Tutorials', icon: FaVideo },
    { id: 'guides', name: 'Guides', icon: FaFileAlt },
    { id: 'faq', name: 'FAQ', icon: FaQuestionCircle }
  ];

  const knowledgeItems = [
    {
      id: 1,
      category: 'getting-started',
      title: 'Welcome to Smart Farmer Assistant',
      type: 'guide',
      description: 'Complete guide to get started with your farming journey',
      readTime: '5 min read',
      tags: ['beginner', 'overview', 'setup']
    },
    {
      id: 2,
      category: 'tutorials',
      title: 'Setting Up Your First Crop Record',
      type: 'video',
      description: 'Step-by-step video tutorial for recording your crops',
      readTime: '8 min watch',
      tags: ['tutorial', 'record-book', 'crops']
    },
    {
      id: 3,
      category: 'guides',
      title: 'Understanding Market Price Trends',
      type: 'guide',
      description: 'How to analyze and predict crop price movements',
      readTime: '12 min read',
      tags: ['market', 'analysis', 'pricing']
    },
    {
      id: 4,
      category: 'faq',
      title: 'Common Questions About Weather Alerts',
      type: 'faq',
      description: 'Answers to frequently asked questions about weather notifications',
      readTime: '3 min read',
      tags: ['weather', 'alerts', 'faq']
    },
    {
      id: 5,
      category: 'tutorials',
      title: 'Financial Planning for Farmers',
      type: 'video',
      description: 'Learn how to track expenses and plan your farm budget',
      readTime: '15 min watch',
      tags: ['finance', 'budgeting', 'planning']
    },
    {
      id: 6,
      category: 'guides',
      title: 'Soil Health Management Guide',
      type: 'guide',
      description: 'Comprehensive guide to maintaining healthy soil',
      readTime: '10 min read',
      tags: ['soil', 'health', 'management']
    },
    {
      id: 7,
      category: 'getting-started',
      title: 'Dashboard Overview',
      type: 'guide',
      description: 'Understanding all the features in your dashboard',
      readTime: '7 min read',
      tags: ['dashboard', 'features', 'overview']
    },
    {
      id: 8,
      category: 'faq',
      title: 'Troubleshooting App Issues',
      type: 'faq',
      description: 'Solutions to common technical problems',
      readTime: '5 min read',
      tags: ['troubleshooting', 'technical', 'support']
    }
  ];

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return FaVideo;
      case 'guide': return FaFileAlt;
      case 'faq': return FaQuestionCircle;
      default: return FaBook;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'text-red-500';
      case 'guide': return 'text-blue-500';
      case 'faq': return 'text-green-500';
      default: return 'text-gray-500';
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
            📚 Knowledge Base
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Everything you need to know about Smart Farmer Assistant
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search knowledge base..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                    activeCategory === category.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="text-sm" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Knowledge Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            const typeColor = getTypeColor(item.type);

            return (
              <motion.div key={item.id} variants={itemVariants}>
                <Card isDarkMode={isDarkMode} className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${typeColor} bg-opacity-10`}>
                      <TypeIcon className={`text-sm ${typeColor}`} />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.type === 'video' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' :
                      item.type === 'guide' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
                      'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                    }`}>
                      {item.type}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {item.title}
                  </h3>

                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.readTime}
                    </span>
                    <button className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium flex items-center">
                      Read more
                      <FaExternalLinkAlt className="ml-1 text-xs" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded-full ${
                          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Links Section */}
        <motion.div variants={itemVariants}>
          <Card isDarkMode={isDarkMode}>
            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Quick Links
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                <FaDownload className="text-green-600 dark:text-green-400 text-2xl mx-auto mb-2" />
                <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Downloads
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Forms, templates & guides
                </p>
              </div>

              <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <FaVideo className="text-blue-600 dark:text-blue-400 text-2xl mx-auto mb-2" />
                <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Video Library
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Tutorials & demonstrations
                </p>
              </div>

              <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <FaQuestionCircle className="text-purple-600 dark:text-purple-400 text-2xl mx-auto mb-2" />
                <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Live Support
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Chat with our experts
                </p>
              </div>

              <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <FaBook className="text-orange-600 dark:text-orange-400 text-2xl mx-auto mb-2" />
                <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  API Docs
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Developer resources
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default KnowledgeBase;