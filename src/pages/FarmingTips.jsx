import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaTractor, FaSeedling, FaWater, FaLeaf, FaBug, FaCloudSun, FaFlask } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';

const FarmingTips = () => {
  const { isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');

  const tips = [
    {
      id: 1,
      category: 'soil',
      title: 'Soil Health Management',
      icon: FaSeedling,
      tips: [
        'Test your soil pH regularly - aim for 6.0-7.0 for most crops',
        'Add organic matter like compost to improve soil structure',
        'Practice crop rotation to prevent soil depletion',
        'Use cover crops during off-season to protect soil'
      ]
    },
    {
      id: 2,
      category: 'water',
      title: 'Water Conservation',
      icon: FaWater,
      tips: [
        'Install drip irrigation to reduce water usage by 50%',
        'Water early morning or evening to minimize evaporation',
        'Use mulch to retain soil moisture',
        'Collect rainwater for irrigation during dry periods'
      ]
    },
    {
      id: 3,
      category: 'pest',
      title: 'Natural Pest Control',
      icon: FaBug,
      tips: [
        'Plant companion crops like marigolds to repel pests',
        'Introduce beneficial insects like ladybugs',
        'Use neem oil spray for organic pest control',
        'Maintain field sanitation to reduce pest habitats'
      ]
    },
    {
      id: 4,
      category: 'equipment',
      title: 'Farm Equipment Maintenance',
      icon: FaTractor,
      tips: [
        'Regularly check and change engine oil',
        'Clean equipment after each use to prevent rust',
        'Sharpen blades and tools for better performance',
        'Store equipment in covered area during monsoon'
      ]
    },
    {
      id: 5,
      category: 'weather',
      title: 'Weather-Based Farming',
      icon: FaCloudSun,
      tips: [
        'Monitor weather forecasts for planting decisions',
        'Use weather apps for irrigation scheduling',
        'Protect crops during extreme weather events',
        'Plan harvest timing based on weather predictions'
      ]
    },
    {
      id: 6,
      category: 'organic',
      title: 'Organic Farming Practices',
      icon: FaLeaf,
      tips: [
        'Use compost instead of chemical fertilizers',
        'Practice natural weed control methods',
        'Apply organic pesticides like garlic spray',
        'Maintain biodiversity in your farm ecosystem'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tips', icon: FaLightbulb },
    { id: 'soil', name: 'Soil Health', icon: FaSeedling },
    { id: 'water', name: 'Water Management', icon: FaWater },
    { id: 'pest', name: 'Pest Control', icon: FaBug },
    { id: 'equipment', name: 'Equipment', icon: FaTractor },
    { id: 'weather', name: 'Weather', icon: FaCloudSun },
    { id: 'organic', name: 'Organic Farming', icon: FaLeaf }
  ];

  const filteredTips = activeCategory === 'all'
    ? tips
    : tips.filter(tip => tip.category === activeCategory);

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
            💡 Farming Tips
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Expert advice for successful and sustainable farming
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="mb-8">
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

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => {
            const Icon = tip.icon;
            return (
              <motion.div key={tip.id} variants={itemVariants}>
                <Card isDarkMode={isDarkMode} className="h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                      <Icon className="text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {tip.title}
                    </h3>
                  </div>

                  <ul className="space-y-2">
                    {tip.tips.map((tipText, index) => (
                      <li key={index} className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} flex items-start`}>
                        <span className="text-green-500 mr-2 mt-1 flex-shrink-0">•</span>
                        {tipText}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Pro Tips Section */}
        <motion.div variants={itemVariants} className="mt-12">
          <Card isDarkMode={isDarkMode}>
            <div className="flex items-center mb-6">
              <FaFlask className="text-purple-500 text-2xl mr-3" />
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Pro Farmer Tips
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Seasonal Planning
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Plan crop rotation 6 months in advance</li>
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Stock up on seeds before planting season</li>
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Schedule equipment maintenance during off-season</li>
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Build relationships with local suppliers</li>
                </ul>
              </div>

              <div>
                <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Cost Optimization
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Buy inputs in bulk during low season</li>
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Use solar power for irrigation pumps</li>
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Implement precision farming techniques</li>
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Track expenses with farm management apps</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FarmingTips;