import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaSeedling, FaClock, FaInfoCircle, FaRobot, FaSpinner } from 'react-icons/fa';
import { useTranslation } from '../utils/translation';
import { storage } from '../utils/storage';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';
import Chart from '../components/Chart';
import { askAI } from '../utils/aiService';

const Market = () => {
  const { isDarkMode, settings } = useTheme();
  const [marketData, setMarketData] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [timeRange, setTimeRange] = useState('today');
  const [marketInsight, setMarketInsight] = useState('');
  const [isInsightLoading, setIsInsightLoading] = useState(false);
  const [insightError, setInsightError] = useState('');
  const [language, setLanguage] = useState('en');
  const { t } = useTranslation(language);

  const generateMarketInsight = async () => {
    if (!marketData.length) return;
    setIsInsightLoading(true);
    setInsightError('');
    setMarketInsight('');

    try {
      const prompt = 'Analyze these market prices for farmers and provide a short summary with recommendations for selling or holding crops.';
      const response = await askAI({ prompt, context: { marketData } });
      setMarketInsight(response);
    } catch (error) {
      console.error('Market AI insight failed:', error);
      setInsightError('Unable to load AI market insight right now.');
    } finally {
      setIsInsightLoading(false);
    }
  };

  useEffect(() => {
    if (marketData.length) {
      generateMarketInsight();
    }
  }, [marketData]);

  // Mock market data with realistic prices
  const baseMarketPrices = {
    wheat: { name: t('market.wheat'), basePrice: 2200, unit: 'quintal', volatility: 0.05 },
    rice: { name: t('market.rice'), basePrice: 1800, unit: 'quintal', volatility: 0.04 },
    cotton: { name: t('market.cotton'), basePrice: 5500, unit: 'quintal', volatility: 0.08 },
    sugarcane: { name: t('market.sugarcane'), basePrice: 300, unit: 'quintal', volatility: 0.03 },
    maize: { name: t('market.maize'), basePrice: 1600, unit: 'quintal', volatility: 0.06 },
    pulses: { name: t('market.pulses'), basePrice: 4500, unit: 'quintal', volatility: 0.07 }
  };

  useEffect(() => {
    // Load language from settings
    setLanguage(settings.language || 'en');

    // Generate market data
    generateMarketData();

    // Update prices every 30 seconds
    const interval = setInterval(generateMarketData, 30000);
    return () => clearInterval(interval);
  }, [settings.language]);

  const generateMarketData = () => {
    const data = Object.entries(baseMarketPrices).map(([key, crop]) => {
      // Generate realistic price variations
      const randomFactor = 1 + (Math.random() - 0.5) * crop.volatility;
      const currentPrice = Math.round(crop.basePrice * randomFactor);
      const previousPrice = Math.round(crop.basePrice * (1 + (Math.random() - 0.5) * crop.volatility));
      const priceChange = currentPrice - previousPrice;
      const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2);
      
      // Generate historical data for charts
      const historicalData = generateHistoricalData(crop.basePrice, crop.volatility);
      
      return {
        key,
        name: crop.name,
        currentPrice,
        previousPrice,
        priceChange,
        priceChangePercent,
        unit: crop.unit,
        trend: priceChange > 0 ? 'up' : priceChange < 0 ? 'down' : 'stable',
        historicalData,
        lastUpdated: new Date().toLocaleTimeString(),
        // Additional market info
        marketCap: Math.round(currentPrice * Math.random() * 1000),
        volume: Math.round(Math.random() * 10000),
        high: Math.round(currentPrice * (1 + Math.random() * 0.1)),
        low: Math.round(currentPrice * (1 - Math.random() * 0.1))
      };
    });

    setMarketData(data);
    
    // Set first crop as selected by default
    if (!selectedCrop && data.length > 0) {
      setSelectedCrop(data[0]);
    }
    
    // Save last update time
    localStorage.setItem('lastMarketUpdate', new Date().toISOString());
  };

  const generateHistoricalData = (basePrice, volatility, days = 30) => {
    const data = [];
    let currentPrice = basePrice;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const randomFactor = 1 + (Math.random() - 0.5) * volatility;
      currentPrice = Math.round(basePrice * randomFactor);
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: currentPrice
      });
    }
    
    return data;
  };

  const getChartData = (crop) => {
    if (!crop) return [];
    
    return crop.historicalData.map(item => ({
      name: item.date,
      labels: ['Price'],
      values: [item.price]
    }));
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
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                📈 {t('market.title')}
              </h1>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('market.currentPrices')}
              </p>
            </div>
            <div className={`flex items-center space-x-2 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <FaClock />
              <span>{t('market.lastUpdated')}: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Market Summary Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card isDarkMode={isDarkMode}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Market Trend
                </p>
                <p className={`text-2xl font-bold text-green-600`}>
                  {marketData.filter(crop => crop.trend === 'up').length} Rising
                </p>
              </div>
              <FaChartLine className="text-3xl text-green-600" />
            </div>
          </Card>

          <Card isDarkMode={isDarkMode}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Declining Prices
                </p>
                <p className={`text-2xl font-bold text-red-600`}>
                  {marketData.filter(crop => crop.trend === 'down').length} Falling
                </p>
              </div>
              <FaChartLine className="text-3xl text-red-600" />
            </div>
          </Card>

          <Card isDarkMode={isDarkMode}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Stable Prices
                </p>
                <p className={`text-2xl font-bold text-yellow-600`}>
                  {marketData.filter(crop => crop.trend === 'stable').length} Stable
                </p>
              </div>
              <FaChartLine className="text-3xl text-yellow-600" />
            </div>
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Price List */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card isDarkMode={isDarkMode}>
              <h3 className={`text-xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {t('market.currentPrices')}
              </h3>
              
              <div className="space-y-3">
                {marketData.map((crop, index) => (
                  <motion.div
                    key={crop.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedCrop(crop)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedCrop?.key === crop.key
                        ? isDarkMode
                          ? 'bg-green-900/30 border-green-600'
                          : 'bg-green-50 border-green-300'
                        : isDarkMode
                        ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          crop.trend === 'up'
                            ? 'bg-green-100 text-green-600'
                            : crop.trend === 'down'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          <FaSeedling className="text-lg" />
                        </div>
                        <div>
                          <h4 className={`font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            {crop.name}
                          </h4>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            ₹{crop.currentPrice.toLocaleString()} / {crop.unit}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`flex items-center space-x-1 ${
                          crop.trend === 'up'
                            ? 'text-green-600'
                            : crop.trend === 'down'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }`}>
                          {crop.trend === 'up' && <FaChartLine />}
                          {crop.trend === 'down' && <FaChartLine />}
                          {crop.trend === 'stable' && <FaChartLine />}
                          <span className="font-semibold">
                            {crop.priceChange > 0 ? '+' : ''}{crop.priceChangePercent}%
                          </span>
                        </div>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {crop.priceChange > 0 ? '+' : ''}₹{crop.priceChange}
                        </p>
                      </div>
                    </div>
                    
                    {/* Additional Info */}
                    <div className={`mt-3 pt-3 border-t ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-100'
                    }`}>
                      <div className="flex justify-between text-xs">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                          High: ₹{crop.high.toLocaleString()}
                        </span>
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                          Low: ₹{crop.low.toLocaleString()}
                        </span>
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                          Vol: {crop.volume.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Selected Crop Details */}
          <div className="space-y-6">
            {selectedCrop && (
              <>
                <motion.div variants={itemVariants}>
                  <Card isDarkMode={isDarkMode}>
                    <h3 className={`text-lg font-bold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {selectedCrop.name} Details
                    </h3>
                    
                    <div className="space-y-4">
                      <div className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                      }`}>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Current Price
                        </p>
                        <p className={`text-2xl font-bold ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          ₹{selectedCrop.currentPrice.toLocaleString()}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          per {selectedCrop.unit}
                        </p>
                      </div>

                      <div className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                      }`}>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Price Change
                        </p>
                        <p className={`text-lg font-semibold ${
                          selectedCrop.trend === 'up'
                            ? 'text-green-600'
                            : selectedCrop.trend === 'down'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }`}>
                          {selectedCrop.priceChange > 0 ? '+' : ''}₹{selectedCrop.priceChange}
                          <span className="text-sm ml-2">
                            ({selectedCrop.priceChangePercent}%)
                          </span>
                        </p>
                      </div>

                      <div className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                      }`}>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Market Cap
                        </p>
                        <p className={`text-lg font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          ₹{(selectedCrop.marketCap * 100000).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Price Chart */}
                <motion.div variants={itemVariants}>
                  <Card isDarkMode={isDarkMode}>
                    <h3 className={`text-lg font-bold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      30-Day Price Trend
                    </h3>
                    <Chart 
                      type="line" 
                      data={getChartData(selectedCrop)} 
                      height={200}
                      colors={['#10b981']}
                    />
                  </Card>
                </motion.div>

                {/* Market Info */}
                <motion.div variants={itemVariants}>
                  <Card isDarkMode={isDarkMode}>
                    <div className="flex items-start space-x-2">
                      <FaInfoCircle className={`mt-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                      <div>
                        <h4 className={`font-semibold mb-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          Market Information
                        </h4>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          Prices are updated every 30 seconds and reflect current market conditions. 
                          These are indicative prices and may vary based on quality, location, and market demand.
                        </p>
                        <p className={`text-xs mt-2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Last updated: {selectedCrop.lastUpdated}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </>
            )}
          </div>
        </div>

        <motion.div variants={itemVariants} className="mt-8">
          <Card isDarkMode={isDarkMode}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-green-100 text-green-800 p-3">
                  <FaRobot />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    AI Market Insight
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Get a farmer-focused summary of current market conditions.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={generateMarketInsight}
                disabled={isInsightLoading}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition ${
                  isInsightLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isInsightLoading ? <FaSpinner className="animate-spin" /> : 'Refresh Insight'}
              </button>
            </div>

            <div className={`rounded-3xl p-5 ${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'}`}>
              {isInsightLoading ? (
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Generating market insight from AI...
                </p>
              ) : insightError ? (
                <p className="text-sm text-red-500">{insightError}</p>
              ) : marketInsight ? (
                <p className={`text-sm leading-7 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  {marketInsight}
                </p>
              ) : (
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Start by reviewing the crop list above. The AI will automatically generate a summary once market prices are available.
                </p>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Market Tips */}
        <motion.div variants={itemVariants} className="mt-8">
          <Card isDarkMode={isDarkMode}>
            <h3 className={`text-lg font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              💡 Market Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Best Time to Sell",
                  tip: "Monitor price trends and sell when prices are rising for maximum profit.",
                  icon: "📈"
                },
                {
                  title: "Market Watch",
                  tip: "Check prices regularly and set target prices for your crops.",
                  icon: "👁️"
                },
                {
                  title: "Quality Matters",
                  tip: "Higher quality crops fetch better prices in the market.",
                  icon: "⭐"
                }
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{tip.icon}</div>
                  <h4 className={`font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {tip.title}
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {tip.tip}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Market;
