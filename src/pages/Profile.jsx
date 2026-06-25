import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaRuler, FaAward, FaSave } from 'react-icons/fa';
import { useTranslation } from '../utils/translation';
import { storage } from '../utils/storage';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';
import toast from 'react-hot-toast';

const Profile = () => {
  const { isDarkMode, settings } = useTheme();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    farmSize: '',
    experience: '',
    bio: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [language, setLanguage] = useState('en');
  const { t } = useTranslation(language);

  useEffect(() => {
    // Load user data
    const user = storage.getUser();
    setLanguage(settings.language || 'en');

    // Load profile data
    const savedProfile = JSON.parse(localStorage.getItem('farmer_profile') || '{}');
    const defaultProfile = {
      name: user?.name || user?.fullName || '',
      email: user?.email || '',
      phone: '',
      location: '',
      farmSize: '',
      experience: '',
      bio: ''
    };
    
    setProfileData({ ...defaultProfile, ...savedProfile });
  }, [settings.language]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!profileData.name || !profileData.email) {
      toast.error(t('messages.fillAllFields'));
      return;
    }

    // Validate email
    if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      toast.error(t('messages.invalidEmail'));
      return;
    }

    // Save profile data
    localStorage.setItem('farmer_profile', JSON.stringify(profileData));
    
    // Update user data if name changed
    const user = storage.getUser();
    if (user && (user.name !== profileData.name || user.fullName !== profileData.name)) {
      storage.saveUser({ ...user, name: profileData.name, fullName: profileData.name });
    }
    
    setIsEditing(false);
    toast.success(t('messages.profileUpdated'));
  };

  const handleCancel = () => {
    // Reset to saved data
    const savedProfile = JSON.parse(localStorage.getItem('farmer_profile') || '{}');
    const user = storage.getUser();
    const defaultProfile = {
      name: user?.name || user?.fullName || '',
      email: user?.email || '',
      phone: '',
      location: '',
      farmSize: '',
      experience: '',
      bio: ''
    };
    
    setProfileData({ ...defaultProfile, ...savedProfile });
    setIsEditing(false);
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
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            👨‍🌾 {t('profile.title')}
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your farm and personal information
          </p>
        </motion.div>

        {/* Profile Overview Card */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card isDarkMode={isDarkMode}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl ${
                  isDarkMode ? 'bg-gray-700' : 'bg-green-100'
                }`}>
                  <FaUser className={isDarkMode ? 'text-gray-300' : 'text-green-600'} />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {profileData.name || 'Farmer Name'}
                  </h2>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {profileData.email || 'farmer@example.com'}
                  </p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  isEditing
                    ? 'bg-gray-500 text-white'
                    : 'btn-primary'
                }`}
              >
                {isEditing ? t('common.cancel') : t('common.edit')}
              </motion.button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('profile.location')}
                    </p>
                    <p className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {profileData.location || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <FaRuler className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('profile.farmSize')}
                    </p>
                    <p className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {profileData.farmSize ? `${profileData.farmSize} ${t('profile.farmSizeUnit')}` : 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <FaAward className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('profile.experience')}
                    </p>
                    <p className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {profileData.experience ? `${profileData.experience} ${t('profile.years')}` : 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Edit Form */}
        {isEditing && (
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card isDarkMode={isDarkMode}>
              <h3 className={`text-xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {t('profile.personalInfo')}
              </h3>
              
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <FaUser className="inline mr-2" />
                      {t('profile.name')} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <FaEnvelope className="inline mr-2" />
                      {t('profile.email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <FaPhone className="inline mr-2" />
                      {t('profile.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <FaMapMarkerAlt className="inline mr-2" />
                      {t('profile.location')}
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                      placeholder="City, State"
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    />
                  </div>
                </div>

                {/* Farm Information */}
                <h3 className={`text-xl font-bold mb-4 mt-8 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {t('profile.farmInfo')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Farm Size */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <FaRuler className="inline mr-2" />
                      {t('profile.farmSize')}
                    </label>
                    <input
                      type="number"
                      name="farmSize"
                      value={profileData.farmSize}
                      onChange={handleInputChange}
                      placeholder="5"
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    />
                    <p className={`text-sm mt-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {t('profile.farmSizeUnit')}
                    </p>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <FaAward className="inline mr-2" />
                      {t('profile.experience')}
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={profileData.experience}
                      onChange={handleInputChange}
                      placeholder="10"
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    />
                    <p className={`text-sm mt-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {t('profile.years')}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    About Your Farm
                  </label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about your farm, crops you grow, and farming practices..."
                    rows={4}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                </div>

                {/* Form Actions */}
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn-primary"
                  >
                    <FaSave className="inline mr-2" />
                    {t('profile.saveProfile')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleCancel}
                    className={`px-6 py-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-700'
                    }`}
                  >
                    {t('common.cancel')}
                  </motion.button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Achievement Badges */}
        {!isEditing && (
          <motion.div variants={itemVariants}>
            <Card isDarkMode={isDarkMode}>
              <h3 className={`text-xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                🏆 Farming Achievements
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Smart Farmer', icon: '🧠', earned: true, description: 'Using smart farming tools' },
                  { name: 'Data Pro', icon: '📊', earned: true, description: 'Tracking farm data regularly' },
                  { name: 'Crop Expert', icon: '🌾', earned: false, description: 'Added 10+ crop records' },
                  { name: 'Profit Master', icon: '💰', earned: false, description: 'Achieved profit targets' }
                ].map((achievement, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`p-4 rounded-lg text-center ${
                      achievement.earned
                        ? isDarkMode ? 'bg-green-900/30' : 'bg-green-50'
                        : isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                    }`}
                  >
                    <div className={`text-3xl mb-2 ${!achievement.earned && 'opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <p className={`font-semibold text-sm ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    } ${!achievement.earned && 'opacity-50'}`}>
                      {achievement.name}
                    </p>
                    <p className={`text-xs mt-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    } ${!achievement.earned && 'opacity-50'}`}>
                      {achievement.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
