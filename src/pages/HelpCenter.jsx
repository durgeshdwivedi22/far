import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaSearch, FaChevronDown, FaChevronUp, FaPhone, FaEnvelope, FaComments, FaVideo } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';

const HelpCenter = () => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'account', name: 'Account & Login' },
    { id: 'features', name: 'Features' },
    { id: 'troubleshooting', name: 'Troubleshooting' },
    { id: 'billing', name: 'Billing & Plans' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I get started with Smart Farmer Assistant?',
      answer: 'Getting started is easy! First, create your account by clicking the "Sign Up" button. Then, set up your farm profile by adding your location, farm size, and primary crops. The app will guide you through the initial setup process with helpful tips and tutorials.'
    },
    {
      id: 2,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on "Forgot Password" on the login page. Enter your email address, and we\'ll send you a secure link to reset your password. Make sure to check your spam folder if you don\'t see the email within a few minutes.'
    },
    {
      id: 3,
      category: 'features',
      question: 'How does the weather forecasting work?',
      answer: 'Our weather forecasting uses data from reliable meteorological sources and AI algorithms to provide accurate 7-day forecasts. The system considers your specific location and provides farming-relevant insights like optimal planting times, irrigation needs, and weather alerts for extreme conditions.'
    },
    {
      id: 4,
      category: 'features',
      question: 'Can I track expenses for multiple crops?',
      answer: 'Yes! You can create separate records for different crops and activities. Each entry can include costs for seeds, fertilizers, labor, equipment, and other farming expenses. The app provides detailed analytics and profit/loss calculations for each crop type.'
    },
    {
      id: 5,
      category: 'troubleshooting',
      question: 'The app is running slowly. What can I do?',
      answer: 'If the app is slow, try these solutions: 1) Clear your browser cache and cookies, 2) Make sure you have a stable internet connection, 3) Close other browser tabs, 4) Try using a different browser, 5) Update your browser to the latest version. If the problem persists, contact our support team.'
    },
    {
      id: 6,
      category: 'account',
      question: 'How do I update my farm information?',
      answer: 'Go to your Profile page and click on "Edit Profile". You can update your farm location, size, soil type, irrigation methods, and other details. Changes are saved automatically and will be reflected in your recommendations and analytics.'
    },
    {
      id: 7,
      category: 'billing',
      question: 'What are the different subscription plans?',
      answer: 'We offer three plans: Free (basic features), Pro ($9.99/month - advanced analytics and unlimited records), and Enterprise ($29.99/month - team collaboration and priority support). All plans include weather data and basic crop recommendations.'
    },
    {
      id: 8,
      category: 'features',
      question: 'How accurate are the crop recommendations?',
      answer: 'Our crop recommendations are based on extensive agricultural research, local climate data, and machine learning algorithms. While we strive for accuracy, recommendations should be used as guidance alongside your farming experience and local agricultural extension services.'
    },
    {
      id: 9,
      category: 'troubleshooting',
      question: 'I\'m not receiving weather alerts. What\'s wrong?',
      answer: 'Check your notification settings in the app. Make sure notifications are enabled for your browser and that you\'ve granted permission for the app to send notifications. Also, verify that your location settings are accurate, as alerts are location-specific.'
    },
    {
      id: 10,
      category: 'billing',
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time from your account settings. Your subscription will remain active until the end of your current billing period, and you\'ll retain access to all features during that time. No cancellation fees apply.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
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
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            ❓ Help Center
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Find answers to your questions and get the help you need
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-4 rounded-lg border text-lg ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <Card key={faq.id} isDarkMode={isDarkMode}>
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className={`text-lg font-semibold pr-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {faq.question}
                  </h3>
                  {expandedFaq === faq.id ? (
                    <FaChevronUp className="text-gray-500 flex-shrink-0" />
                  ) : (
                    <FaChevronDown className="text-gray-500 flex-shrink-0" />
                  )}
                </button>

                {expandedFaq === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
                  >
                    <p className={`text-base leading-relaxed ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </Card>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <FaQuestionCircle className={`text-6xl mx-auto mb-4 ${
                isDarkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-xl font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                No results found
              </h3>
              <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Try adjusting your search terms or browse different categories.
              </p>
            </div>
          )}
        </motion.div>

        {/* Contact Support Section */}
        <motion.div variants={itemVariants}>
          <Card isDarkMode={isDarkMode}>
            <h2 className={`text-3xl font-bold text-center mb-8 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Still Need Help?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer">
                <FaComments className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-3" />
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Live Chat
                </h3>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Chat with our support team
                </p>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Available 24/7
                </span>
              </div>

              <div className="text-center p-6 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors cursor-pointer">
                <FaEnvelope className="text-green-600 dark:text-green-400 text-3xl mx-auto mb-3" />
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Email Support
                </h3>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Get help via email
                </p>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Within 24 hours
                </span>
              </div>

              <div className="text-center p-6 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors cursor-pointer">
                <FaPhone className="text-purple-600 dark:text-purple-400 text-3xl mx-auto mb-3" />
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Phone Support
                </h3>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Speak with an expert
                </p>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Mon-Fri 9AM-6PM
                </span>
              </div>

              <div className="text-center p-6 rounded-lg bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors cursor-pointer">
                <FaVideo className="text-orange-600 dark:text-orange-400 text-3xl mx-auto mb-3" />
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Video Call
                </h3>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Schedule a video consultation
                </p>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  By appointment
                </span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Contact Support
              </button>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HelpCenter;