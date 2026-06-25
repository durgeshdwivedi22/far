import React from 'react';
import { motion } from 'framer-motion';
import { FaSeedling, FaWater, FaSun, FaCloudRain, FaTemperatureHigh, FaBug, FaLeaf, FaFlask } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';

const CropGuide = () => {
  const { isDarkMode } = useTheme();

  const crops = [
    {
      name: 'Wheat',
      icon: FaSeedling,
      season: 'Winter (October-February)',
      soil: 'Well-drained loamy soil',
      water: 'Moderate watering',
      tips: ['Plant in rows 6-8 inches apart', 'Apply nitrogen fertilizer', 'Monitor for rust disease']
    },
    {
      name: 'Rice',
      icon: FaWater,
      season: 'Monsoon (June-October)',
      soil: 'Clayey soil with good water retention',
      water: 'Flood irrigation',
      tips: ['Maintain 2-3 inches water level', 'Apply phosphorus fertilizer', 'Control weeds regularly']
    },
    {
      name: 'Cotton',
      icon: FaLeaf,
      season: 'Summer (March-June)',
      soil: 'Black cotton soil',
      water: 'Regular irrigation',
      tips: ['Plant in well-prepared beds', 'Apply potash fertilizer', 'Monitor for bollworm']
    },
    {
      name: 'Sugarcane',
      icon: FaFlask,
      season: 'Spring/Autumn',
      soil: 'Deep fertile soil',
      water: 'Frequent irrigation',
      tips: ['Use healthy setts for planting', 'Apply organic manure', 'Control sugarcane borer']
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
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            🌾 Crop Guide
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Comprehensive guide for successful crop cultivation
          </p>
        </motion.div>

        {/* Crop Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {crops.map((crop, index) => {
            const Icon = crop.icon;
            return (
              <motion.div key={crop.name} variants={itemVariants}>
                <Card isDarkMode={isDarkMode} className="h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="text-green-600 dark:text-green-400 text-xl" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {crop.name}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {crop.season}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FaSeedling className="text-green-500 mr-2 text-sm" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong>Soil:</strong> {crop.soil}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaWater className="text-blue-500 mr-2 text-sm" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong>Water:</strong> {crop.water}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Key Tips:
                    </h4>
                    <ul className="space-y-1">
                      {crop.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} flex items-start`}>
                          <span className="text-green-500 mr-2 mt-1">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Information */}
        <motion.div variants={itemVariants}>
          <Card isDarkMode={isDarkMode}>
            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              General Farming Tips
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Soil Preparation
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Test soil pH and nutrient levels</li>
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Add organic matter regularly</li>
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Practice crop rotation</li>
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Maintain proper drainage</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Pest Management
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Regular field monitoring</li>
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Use integrated pest management</li>
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Apply organic pesticides when possible</li>
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Maintain field sanitation</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Harvesting
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Harvest at optimal maturity</li>
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Use appropriate harvesting tools</li>
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Store crops in cool, dry place</li>
                  <li className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>• Monitor storage conditions</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CropGuide;