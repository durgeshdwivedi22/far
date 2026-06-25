import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tips = ({ isDarkMode = false }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const farmingTips = [
    {
      category: '🌱 Soil Health',
      tip: 'Rotate crops every season to maintain soil fertility and prevent pest buildup.',
      detailed: 'Crop rotation helps break pest cycles, improves soil structure, and balances nutrients. Try legumes after cereals to naturally fix nitrogen.',
      icon: '🌾'
    },
    {
      category: '💧 Water Management',
      tip: 'Water your plants early in the morning or late in the evening to reduce evaporation.',
      detailed: 'Morning watering allows plants to absorb moisture before the heat of the day. Evening watering gives roots time to absorb overnight.',
      icon: '💧'
    },
    {
      category: '🐛 Pest Control',
      tip: 'Use neem oil spray as a natural pesticide to control common garden pests.',
      detailed: 'Mix 2 teaspoons of neem oil with 1 liter of water and a few drops of dish soap. Spray in the evening for best results.',
      icon: '🐛'
    },
    {
      category: '📈 Crop Selection',
      tip: 'Choose crops based on your soil type and local climate for better yields.',
      detailed: 'Test your soil pH and nutrient levels. Match crops to your growing season length and temperature patterns.',
      icon: '🌻'
    },
    {
      category: '🌿 Organic Farming',
      tip: 'Use compost and organic fertilizers to improve soil health naturally.',
      detailed: 'Compost adds essential nutrients and beneficial microorganisms. Apply 2-3 inches of compost annually for best results.',
      icon: '🌿'
    },
    {
      category: '📅 Planning',
      tip: 'Plan your planting schedule based on local frost dates and growing seasons.',
      detailed: 'Start seeds indoors 6-8 weeks before last frost. Use a planting calendar specific to your region.',
      icon: '📅'
    },
    {
      category: '🔧 Tools & Equipment',
      tip: 'Clean and maintain your farming tools regularly to prevent disease spread.',
      detailed: 'Disinfect tools with 10% bleach solution between uses. Keep tools sharp and oiled for efficient operation.',
      icon: '🔧'
    },
    {
      category: '🌡️ Weather Monitoring',
      tip: 'Track weather patterns to plan irrigation and harvesting schedules.',
      detailed: 'Use weather apps and local forecasts. Plan irrigation before predicted dry spells and harvest before heavy rains.',
      icon: '🌡️'
    },
    {
      category: '💰 Financial Planning',
      tip: 'Keep detailed records of expenses and income to track farm profitability.',
      detailed: 'Use spreadsheets or farm management software. Track costs per crop and calculate profit margins.',
      icon: '💰'
    },
    {
      category: '🔄 Crop Rotation',
      tip: 'Follow a 4-year crop rotation plan to maximize soil health.',
      detailed: 'Year 1: Legumes, Year 2: Leafy greens, Year 3: Fruits, Year 4: Roots. Repeat the cycle.',
      icon: '🔄'
    }
  ];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentTipIndex((prevIndex) => (prevIndex + 1) % farmingTips.length);
      }, 5000); // Change tip every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isPaused, farmingTips.length]);

  const nextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % farmingTips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prevIndex) => 
      prevIndex === 0 ? farmingTips.length - 1 : prevIndex - 1
    );
  };

  const currentTip = farmingTips[currentTipIndex];

  const tipVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${
        isDarkMode ? 'glass-card-dark' : 'glass-card'
      } p-6 h-full`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          💡 Farming Tips
        </h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPaused(!isPaused)}
          className={`p-2 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
              : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
        >
          {isPaused ? '▶️' : '⏸️'}
        </motion.button>
      </div>

      {/* Tip Display */}
      <div className="relative h-64 mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTipIndex}
            variants={tipVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <div className="text-center mb-4">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl block mb-3"
              >
                {currentTip.icon}
              </motion.span>
              <h4 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-green-400' : 'text-green-700'
              }`}>
                {currentTip.category}
              </h4>
            </div>
            
            <div className="space-y-4">
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {currentTip.tip}
              </p>
              
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-green-50'
                }`}
              >
                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {currentTip.detailed}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevTip}
          className={`p-2 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          ← Previous
        </motion.button>

        {/* Progress Indicators */}
        <div className="flex space-x-2">
          {farmingTips.map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8 }}
              animate={{
                scale: index === currentTipIndex ? 1.2 : 0.8,
                backgroundColor: index === currentTipIndex 
                  ? (isDarkMode ? '#10b981' : '#059669')
                  : (isDarkMode ? '#4b5563' : '#d1d5db')
              }}
              className="w-2 h-2 rounded-full"
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextTip}
          className={`p-2 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Next →
        </motion.button>
      </div>

      {/* Tip Counter */}
      <div className={`text-center mt-4 text-sm ${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        Tip {currentTipIndex + 1} of {farmingTips.length}
      </div>
    </motion.div>
  );
};

export default Tips;
