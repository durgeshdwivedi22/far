import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSeedling, FaChartLine, FaCloudSun, FaTractor, FaUsers, FaNewspaper, FaCalendarAlt, FaStar } from 'react-icons/fa';
import { storage } from '../utils/storage';
import { getCropRecommendations } from '../utils/cropLogic';
import { useTheme } from '../contexts/ThemeContext';
import Weather from '../components/Weather';
import Tips from '../components/Tips';
import Card from '../components/Card';

const Home = () => {
  const { isDarkMode } = useTheme();
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [cropForm, setCropForm] = useState({
    soilType: '',
    season: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Load user data
    const userData = storage.getUser();
    setUser(userData);

    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleCropRecommendation = (e) => {
    e.preventDefault();
    if (cropForm.soilType && cropForm.season) {
      const recs = getCropRecommendations(cropForm.soilType, cropForm.season);
      setRecommendations(recs);
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

  const userName = user?.name || user?.fullName || 'Farmer';

  // Mock data for enhanced features
  const recentActivities = [
    { id: 1, type: 'crop_planted', crop: 'Wheat', date: '2 days ago', icon: FaSeedling },
    { id: 2, type: 'expense', amount: '₹500', description: 'Fertilizer purchase', date: '1 day ago', icon: FaChartLine },
    { id: 3, type: 'weather_check', location: 'Delhi', date: 'Today', icon: FaCloudSun }
  ];

  const marketPrices = [
    { crop: 'Wheat', price: '₹2,200/quintal', trend: 'up', change: '+5%' },
    { crop: 'Rice', price: '₹3,100/quintal', trend: 'down', change: '-2%' },
    { crop: 'Cotton', price: '₹6,500/quintal', trend: 'up', change: '+8%' }
  ];

  const featuredCrops = [
    { name: 'Organic Tomatoes', image: '🍅', rating: 4.8, reviews: 124 },
    { name: 'Premium Wheat', image: '🌾', rating: 4.9, reviews: 89 },
    { name: 'Fresh Vegetables', image: '🥕', rating: 4.7, reviews: 156 }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Width Below Header */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {greeting} {userName}! 🌾
                </h1>
                <p className="text-xl opacity-90 mb-6">
                  Your smart farming companion for better yields and profits
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <span>📅 {currentTime.toLocaleDateString()}</span>
                  <span>🕐 {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
              <div className="hidden md:block">
                <FaTractor className="text-6xl opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto -mt-8 relative z-20"
        >

        {/* Quick Stats */}
        {user && (
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Investment', value: '₹25,000', icon: '💰', color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Total Profit', value: '₹45,000', icon: '📈', color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Total Loss', value: '₹8,000', icon: '📉', color: 'text-red-600', bg: 'bg-red-50' },
              { label: 'Crops Added', value: '12', icon: '🌾', color: 'text-yellow-600', bg: 'bg-yellow-50' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-xl ${stat.bg} border border-gray-200 dark:border-gray-700`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className={`text-lg font-bold mb-1 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Crop Recommendation & Recent Activities */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            {/* Crop Recommendation */}
            <Card isDarkMode={isDarkMode}>
              <div className="flex items-center mb-6">
                <FaSeedling className={`text-2xl mr-3 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Crop Recommendation System
                </h2>
              </div>

              <form onSubmit={handleCropRecommendation} className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Soil Type
                    </label>
                    <select
                      value={cropForm.soilType}
                      onChange={(e) => setCropForm({...cropForm, soilType: e.target.value})}
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      required
                    >
                      <option value="">Select soil type</option>
                      <option value="clay">Clay</option>
                      <option value="sandy">Sandy</option>
                      <option value="loamy">Loamy</option>
                      <option value="black">Black</option>
                      <option value="red">Red</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Season
                    </label>
                    <select
                      value={cropForm.season}
                      onChange={(e) => setCropForm({...cropForm, season: e.target.value})}
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      required
                    >
                      <option value="">Select season</option>
                      <option value="summer">Summer</option>
                      <option value="winter">Winter</option>
                      <option value="rainy">Rainy</option>
                    </select>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full btn-primary"
                >
                  Get Recommendations
                </motion.button>
              </form>

              {/* Recommendations Results */}
              {recommendations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <h3 className={`font-semibold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Recommended Crops:
                  </h3>
                  {recommendations.map((crop, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600'
                          : 'bg-green-50 border-green-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {crop.name}
                        </h4>
                        <span className="text-sm text-green-600 font-medium">
                          {crop.suitability}/10
                        </span>
                      </div>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {crop.reason}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </Card>

            {/* Recent Activities */}
            <Card isDarkMode={isDarkMode}>
              <div className="flex items-center mb-6">
                <FaCalendarAlt className={`text-2xl mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Recent Activities
                </h2>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <activity.icon className={`text-xl mr-3 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                    <div className="flex-1">
                      <p className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {activity.type === 'crop_planted' && `Planted ${activity.crop}`}
                        {activity.type === 'expense' && `${activity.description} - ${activity.amount}`}
                        {activity.type === 'weather_check' && `Checked weather in ${activity.location}`}
                      </p>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {activity.date}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Featured Crops */}
            <Card isDarkMode={isDarkMode}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <FaStar className={`text-2xl mr-3 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  <h2 className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Featured Crops
                  </h2>
                </div>
                <Link to="/market">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    View All →
                  </motion.button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredCrops.map((crop, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`p-4 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">{crop.image}</div>
                      <h3 className={`font-semibold mb-1 ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {crop.name}
                      </h3>
                      <div className="flex items-center justify-center mb-2">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{crop.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({crop.reviews})</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Weather Widget */}
            <motion.div variants={itemVariants}>
              <Weather isDarkMode={isDarkMode} />
            </motion.div>

            {/* Market Prices */}
            <motion.div variants={itemVariants}>
              <Card isDarkMode={isDarkMode}>
                <div className="flex items-center mb-4">
                  <FaNewspaper className={`text-2xl mr-3 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`text-lg font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Market Prices
                  </h3>
                </div>
                <div className="space-y-3">
                  {marketPrices.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {item.crop}
                      </span>
                      <div className="text-right">
                        <div className={`text-sm font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {item.price}
                        </div>
                        <div className={`text-xs ${
                          item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <Card isDarkMode={isDarkMode}>
                <h3 className={`text-lg font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  ⚡ Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link to="/dashboard">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-primary text-left"
                    >
                      📊 View Dashboard
                    </motion.button>
                  </Link>
                  <Link to="/analytics">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full btn-secondary text-left ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      📈 Analytics
                    </motion.button>
                  </Link>
                  <Link to="/record-book">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full btn-secondary text-left ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      📝 Record Book
                    </motion.button>
                  </Link>
                  <Link to="/profile">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full btn-secondary text-left ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      👤 Profile
                    </motion.button>
                  </Link>
                  <Link to="/settings">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full btn-secondary text-left ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      ⚙️ Settings
                    </motion.button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Community */}
            <motion.div variants={itemVariants}>
              <Card isDarkMode={isDarkMode}>
                <div className="flex items-center mb-4">
                  <FaUsers className={`text-2xl mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  <h3 className={`text-lg font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Community
                  </h3>
                </div>
                <div className="text-center">
                  <p className={`text-sm mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Connect with fellow farmers
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium"
                  >
                    Join Community
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Tips Section */}
        <motion.div variants={itemVariants} className="mt-8">
          <Tips isDarkMode={isDarkMode} />
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
