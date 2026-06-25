import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCloud, FaCloudRain, FaSun, FaCloudSun, FaBolt, FaMapMarkerAlt, FaTemperatureHigh, FaTint, FaWind } from 'react-icons/fa';
import axios from 'axios';
import { useTranslation } from '../utils/translation';
import { storage } from '../utils/storage';
import toast from 'react-hot-toast';

const Weather = ({ isDarkMode = false }) => {
  const [weather, setWeather] = useState({
    temperature: 28,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 12,
    forecast: [],
    city: 'Delhi',
    loading: false,
    error: null
  });
  const [cityInput, setCityInput] = useState('');
  const [language, setLanguage] = useState('en');
  const { t } = useTranslation(language);

  useEffect(() => {
    // Load settings and saved city
    const settings = storage.getSettings();
    setLanguage(settings.language || 'en');
    
    const savedCity = localStorage.getItem('weather_city') || 'Delhi';
    setWeather(prev => ({ ...prev, city: savedCity }));
    
    // Load weather data
    loadWeatherData(savedCity);
    
    // Update weather every 30 minutes
    const interval = setInterval(() => {
      loadWeatherData(weather.city);
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [language]);

  const loadWeatherData = async (city) => {
    setWeather(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Try to get real weather data (mock for demo - replace with real API key)
      const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Replace with actual API key
      
      if (API_KEY === 'YOUR_OPENWEATHER_API_KEY') {
        // Use mock data for demo
        const mockData = generateMockWeatherData(city);
        setWeather(prev => ({
          ...prev,
          ...mockData,
          loading: false,
          error: null
        }));
      } else {
        // Real API call
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        const weatherData = {
          temperature: Math.round(response.data.main.temp),
          condition: mapWeatherCondition(response.data.weather[0].main),
          humidity: response.data.main.humidity,
          windSpeed: Math.round(response.data.wind.speed * 3.6), // Convert m/s to km/h
          city: response.data.name,
          forecast: processForecastData(forecastResponse.data.list),
          loading: false,
          error: null
        };
        
        setWeather(prev => ({ ...prev, ...weatherData }));
      }
    } catch (error) {
      console.error('Weather API error:', error);
      // Fallback to mock data
      const mockData = generateMockWeatherData(city);
      setWeather(prev => ({
        ...prev,
        ...mockData,
        loading: false,
        error: 'Using demo data - API key required for real weather'
      }));
    }
  };

  const generateMockWeatherData = (city) => {
    const conditions = [
      { condition: 'Sunny', icon: FaSun, temp: 32, humidity: 45 },
      { condition: 'Partly Cloudy', icon: FaCloudSun, temp: 28, humidity: 60 },
      { condition: 'Cloudy', icon: FaCloud, temp: 25, humidity: 70 },
      { condition: 'Rainy', icon: FaCloudRain, temp: 22, humidity: 85 },
      { condition: 'Stormy', icon: FaBolt, temp: 20, humidity: 90 }
    ];
    
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      temperature: randomCondition.temp + Math.floor(Math.random() * 5) - 2,
      condition: randomCondition.condition,
      humidity: randomCondition.humidity + Math.floor(Math.random() * 10) - 5,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      city,
      forecast: generateForecast(),
      icon: randomCondition.icon
    };
  };

  const generateForecast = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const conditions = [
      { condition: 'Sunny', icon: FaSun },
      { condition: 'Partly Cloudy', icon: FaCloudSun },
      { condition: 'Cloudy', icon: FaCloud },
      { condition: 'Rainy', icon: FaCloudRain },
      { condition: 'Stormy', icon: FaBolt }
    ];
    
    return days.map(day => {
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      return {
        day,
        temp: randomCondition.condition === 'Sunny' ? 32 + Math.floor(Math.random() * 5) :
              randomCondition.condition === 'Rainy' ? 20 + Math.floor(Math.random() * 5) :
              25 + Math.floor(Math.random() * 5),
        condition: randomCondition.condition,
        icon: randomCondition.icon
      };
    });
  };

  const mapWeatherCondition = (apiCondition) => {
    const mapping = {
      'Clear': 'Sunny',
      'Clouds': 'Cloudy',
      'Rain': 'Rainy',
      'Drizzle': 'Rainy',
      'Thunderstorm': 'Stormy',
      'Mist': 'Partly Cloudy',
      'Fog': 'Partly Cloudy',
      'Haze': 'Partly Cloudy'
    };
    return mapping[apiCondition] || 'Partly Cloudy';
  };

  const processForecastData = (forecastList) => {
    // Process 5-day forecast (take one reading per day)
    const dailyData = [];
    const processedDays = new Set();
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();
      
      if (!processedDays.has(dayKey) && dailyData.length < 5) {
        processedDays.add(dayKey);
        dailyData.push({
          day: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          temp: Math.round(item.main.temp),
          condition: mapWeatherCondition(item.weather[0].main),
          icon: getWeatherIcon(mapWeatherCondition(item.weather[0].main))
        });
      }
    });
    
    return dailyData;
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      'Sunny': FaSun,
      'Partly Cloudy': FaCloudSun,
      'Cloudy': FaCloud,
      'Rainy': FaCloudRain,
      'Stormy': FaBolt
    };
    return icons[condition] || FaSun;
  };

  const getBackgroundGradient = (condition) => {
    const gradients = {
      'Sunny': 'from-yellow-400 to-orange-500',
      'Partly Cloudy': 'from-blue-400 to-blue-600',
      'Cloudy': 'from-gray-400 to-gray-600',
      'Rainy': 'from-blue-600 to-blue-800',
      'Stormy': 'from-gray-600 to-gray-800'
    };
    return gradients[condition] || 'from-blue-400 to-blue-600';
  };

  const getWeatherAlert = () => {
    if (weather.condition === 'Rainy') {
      return t('weather.highRainChance');
    } else if (weather.humidity < 30) {
      return t('weather.lowHumidity');
    } else if (weather.temperature > 35) {
      return t('weather.highTemperature');
    }
    return null;
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      localStorage.setItem('weather_city', cityInput.trim());
      loadWeatherData(cityInput.trim());
      setCityInput('');
      toast.success(`Weather updated for ${cityInput.trim()}`);
    }
  };

  const WeatherIcon = weather.icon || getWeatherIcon(weather.condition);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${
        isDarkMode ? 'glass-card-dark' : 'glass-card'
      } p-6 h-full`}
    >
      {/* City Input */}
      <form onSubmit={handleCitySubmit} className="mb-4">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <FaMapMarkerAlt className={`absolute left-3 top-3 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder={t('weather.enterCity')}
              className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm`}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium"
          >
            {t('weather.getWeather')}
          </motion.button>
        </div>
      </form>

      {/* Loading State */}
      {weather.loading && (
        <div className="flex items-center justify-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* Weather Content */}
      {!weather.loading && (
        <>
          {/* Current Weather */}
          <div className={`bg-gradient-to-br ${getBackgroundGradient(weather.condition)} rounded-xl p-6 text-white mb-6`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-sm" />
                  {weather.city}
                </h3>
                <div className="flex items-center space-x-4">
                  <WeatherIcon className="text-4xl" />
                  <div>
                    <p className="text-3xl font-bold">{weather.temperature}°C</p>
                    <p className="text-lg">{weather.condition}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <FaTemperatureHigh />
                  <span className="font-medium">Temp</span>
                </div>
                <p className="text-xl font-bold">{weather.temperature}°C</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <FaTint />
                  <span className="font-medium">Humidity</span>
                </div>
                <p className="text-xl font-bold">{weather.humidity}%</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <FaWind />
                  <span className="font-medium">Wind</span>
                </div>
                <p className="text-xl font-bold">{weather.windSpeed} km/h</p>
              </div>
            </div>
          </div>

          {/* Weather Alert */}
          {getWeatherAlert() && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg ${
                weather.condition === 'Rainy' 
                  ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700'
                  : weather.temperature > 35
                  ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700'
                  : 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700'
              } border`}
            >
              <div className="flex items-start space-x-2">
                <FaBolt className={`mt-1 ${
                  weather.condition === 'Rainy' 
                    ? 'text-blue-600 dark:text-blue-400'
                    : weather.temperature > 35
                    ? 'text-orange-600 dark:text-orange-400'
                    : 'text-yellow-600 dark:text-yellow-400'
                }`} />
                <div>
                  <h4 className={`font-semibold mb-1 ${
                    weather.condition === 'Rainy' 
                      ? 'text-blue-800 dark:text-blue-300'
                      : weather.temperature > 35
                      ? 'text-orange-800 dark:text-orange-300'
                      : 'text-yellow-800 dark:text-yellow-300'
                  }`}>
                    {t('weather.weatherAlert')}
                  </h4>
                  <p className={`text-sm ${
                    weather.condition === 'Rainy' 
                      ? 'text-blue-700 dark:text-blue-400'
                      : weather.temperature > 35
                      ? 'text-orange-700 dark:text-orange-400'
                      : 'text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {getWeatherAlert()}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* 5-Day Forecast */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              5-Day Forecast
            </h3>
            <div className="space-y-3">
              {weather.forecast.map((day, index) => {
                const DayIcon = day.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <DayIcon className="text-2xl" />
                      <div>
                        <p className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {day.day}
                        </p>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {day.condition}
                        </p>
                      </div>
                    </div>
                    <div className={`text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {day.temp}°C
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Farming Tips based on weather */}
          <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
              🌱 Farming Tip
            </h4>
            <p className="text-sm text-green-700 dark:text-green-400">
              {weather.condition === 'Sunny' && 'Great day for harvesting! Make sure to irrigate crops in the morning or evening.'}
              {weather.condition === 'Partly Cloudy' && 'Good weather for field work. Check soil moisture before irrigation.'}
              {weather.condition === 'Cloudy' && 'Perfect conditions for transplanting seedlings. Reduced stress on plants.'}
              {weather.condition === 'Rainy' && 'Avoid field activities. Check drainage systems to prevent waterlogging.'}
              {weather.condition === 'Stormy' && 'Secure farming equipment. Protect crops from potential damage.'}
            </p>
          </div>

          {/* Error Message */}
          {weather.error && (
            <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                ⚠️ {weather.error}
              </p>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default Weather;
