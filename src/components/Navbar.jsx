import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaChartBar, FaChartLine, FaBook, FaStore, FaUser, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { storage } from '../utils/storage';
import Alert from './Alert';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const userName = user?.name || user?.fullName || 'User';

  useEffect(() => {
    // Load settings and user data
    const settings = storage.getSettings();
    setIsDarkMode(settings.darkMode);
    setUser(storage.getUser());
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    storage.saveSettings({ darkMode: newDarkMode });
    
    // Apply dark mode to document
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    storage.removeUser();
    setUser(null);
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Dashboard', path: '/dashboard', icon: FaChartBar },
    { name: 'Analytics', path: '/analytics', icon: FaChartLine },
    { name: 'Record Book', path: '/record-book', icon: FaBook },
    { name: 'Market', path: '/market', icon: FaStore },
    { name: 'Profile', path: '/profile', icon: FaUser }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isDarkMode ? 'glass-card-dark' : 'glass-card'
      } backdrop-blur-lg border-b border-white/20`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <span className="text-2xl">🌾</span>
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Smart Farmer
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive(item.path)
                        ? isDarkMode
                          ? 'bg-green-900/50 text-green-400'
                          : 'bg-green-100 text-green-700'
                        : isDarkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span className="font-medium">{item.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-3">
            {/* Alert System */}
            <Alert isDarkMode={isDarkMode} />
            
            {/* Language Toggle */}
            <LanguageToggle 
              isDarkMode={isDarkMode} 
              onLanguageChange={(lang) => {
                // Force re-render on language change
                window.location.reload();
              }} 
            />

            {/* Dark mode toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } shadow-md border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}
            >
              {isDarkMode ? '🌙' : '☀️'}
            </motion.button>

            {/* User menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`hidden sm:flex px-3 py-1 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-green-100 text-green-700'
                  }`}
                >
                  <span className="text-sm font-medium">{userName}</span>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Login
                </motion.button>
              </Link>
            )}

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${
                isDarkMode ? 'text-white' : 'text-gray-700'
              }`}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t border-white/20"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${
                        isActive(item.path)
                          ? isDarkMode
                            ? 'bg-green-900/50 text-green-400'
                            : 'bg-green-100 text-green-700'
                          : isDarkMode
                          ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="text-xl" />
                      <span className="font-medium">{item.name}</span>
                    </motion.div>
                  </Link>
                );
              })}
              
              {/* Mobile user menu */}
              {user && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={handleLogout}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${
                    isDarkMode
                      ? 'text-red-400 hover:bg-gray-700'
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  <FaSignOutAlt />
                  <span className="font-medium">Logout</span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
