import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaComments, FaQuestionCircle, FaLightbulb, FaTrophy, FaCalendarAlt, FaUser, FaThumbsUp, FaReply, FaShare } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';

const Community = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'discussions', name: 'Discussions', icon: FaComments },
    { id: 'questions', name: 'Q&A', icon: FaQuestionCircle },
    { id: 'ideas', name: 'Ideas', icon: FaLightbulb },
    { id: 'events', name: 'Events', icon: FaCalendarAlt }
  ];

  const discussions = [
    {
      id: 1,
      title: 'Best practices for organic pest control in wheat fields',
      author: 'Rajesh Kumar',
      avatar: 'RK',
      timestamp: '2 hours ago',
      replies: 12,
      likes: 24,
      tags: ['organic', 'pest-control', 'wheat'],
      excerpt: 'I\'ve been trying different organic methods for pest control in my wheat fields. Neem oil seems promising, but I\'d love to hear about other farmers\' experiences...',
      isHot: true
    },
    {
      id: 2,
      title: 'Water conservation techniques for drought-prone areas',
      author: 'Priya Sharma',
      avatar: 'PS',
      timestamp: '5 hours ago',
      replies: 8,
      likes: 31,
      tags: ['water-conservation', 'drought', 'sustainable'],
      excerpt: 'With the changing climate patterns, water conservation has become crucial. What techniques are you using to maximize water efficiency?',
      isHot: false
    },
    {
      id: 3,
      title: 'Success story: From traditional to smart farming',
      author: 'Amit Patel',
      avatar: 'AP',
      timestamp: '1 day ago',
      replies: 15,
      likes: 45,
      tags: ['success-story', 'technology', 'transformation'],
      excerpt: 'After implementing smart farming techniques, my yields increased by 40% and costs reduced by 25%. Here\'s my journey...',
      isHot: true
    }
  ];

  const questions = [
    {
      id: 1,
      title: 'How to identify and treat fungal diseases in tomato plants?',
      author: 'Sunita Verma',
      avatar: 'SV',
      timestamp: '3 hours ago',
      answers: 5,
      tags: ['disease', 'tomato', 'fungal'],
      status: 'answered'
    },
    {
      id: 2,
      title: 'What\'s the best time to harvest sugarcane?',
      author: 'Vikram Singh',
      avatar: 'VS',
      timestamp: '6 hours ago',
      answers: 0,
      tags: ['harvest', 'sugarcane', 'timing'],
      status: 'unanswered'
    },
    {
      id: 3,
      title: 'Recommended fertilizer ratio for cotton crops?',
      author: 'Meera Joshi',
      avatar: 'MJ',
      timestamp: '1 day ago',
      answers: 3,
      tags: ['fertilizer', 'cotton', 'nutrition'],
      status: 'answered'
    }
  ];

  const ideas = [
    {
      id: 1,
      title: 'Mobile app for crop disease detection using AI',
      author: 'Dr. Karan Gupta',
      avatar: 'KG',
      timestamp: '2 days ago',
      votes: 67,
      status: 'under-review',
      description: 'An AI-powered mobile app that can identify crop diseases from photos and provide treatment recommendations.'
    },
    {
      id: 2,
      title: 'Community seed bank for local varieties',
      author: 'Ravi Kumar',
      avatar: 'RK',
      timestamp: '3 days ago',
      votes: 42,
      status: 'planned',
      description: 'Create a community seed bank to preserve and share traditional, climate-resilient crop varieties.'
    },
    {
      id: 3,
      title: 'Weather-based irrigation scheduling system',
      author: 'Anjali Desai',
      avatar: 'AD',
      timestamp: '1 week ago',
      votes: 89,
      status: 'in-development',
      description: 'Automated irrigation system that adjusts watering based on real-time weather data and soil moisture levels.'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Organic Farming Workshop',
      date: 'March 15, 2024',
      time: '10:00 AM - 4:00 PM',
      location: 'Virtual Event',
      attendees: 156,
      description: 'Learn organic farming techniques from certified experts. Topics include composting, natural pest control, and soil health management.'
    },
    {
      id: 2,
      title: 'Smart Agriculture Technology Demo',
      date: 'March 22, 2024',
      time: '2:00 PM - 5:00 PM',
      location: 'Krishi Vigyan Kendra, Pune',
      attendees: 89,
      description: 'Demonstration of latest smart farming technologies including IoT sensors, drone technology, and precision agriculture tools.'
    },
    {
      id: 3,
      title: 'Farmers\' Cooperative Meeting',
      date: 'March 28, 2024',
      time: '11:00 AM - 2:00 PM',
      location: 'Community Center, Ahmedabad',
      attendees: 234,
      description: 'Monthly meeting for farmers\' cooperative members. Discuss market trends, share experiences, and plan collaborative initiatives.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'unanswered': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'under-review': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'planned': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'in-development': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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

  const renderContent = () => {
    switch (activeTab) {
      case 'discussions':
        return (
          <div className="space-y-6">
            {discussions.map((discussion) => (
              <Card key={discussion.id} isDarkMode={isDarkMode} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className={`text-sm font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {discussion.avatar}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {discussion.title}
                        {discussion.isHot && (
                          <span className="ml-2 text-xs bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400 px-2 py-1 rounded-full">
                            HOT
                          </span>
                        )}
                      </h3>
                    </div>
                    <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {discussion.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{discussion.author}</span>
                        <span>•</span>
                        <span>{discussion.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <FaThumbsUp className="text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">{discussion.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaReply className="text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">{discussion.replies}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {discussion.tags.map((tag, index) => (
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
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'questions':
        return (
          <div className="space-y-6">
            {questions.map((question) => (
              <Card key={question.id} isDarkMode={isDarkMode} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className={`text-sm font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {question.avatar}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {question.title}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{question.author}</span>
                        <span>•</span>
                        <span>{question.timestamp}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(question.status)}`}>
                        {question.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <FaReply className="text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {question.answers} answers
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {question.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={`text-xs px-2 py-1 rounded ${
                              isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'ideas':
        return (
          <div className="space-y-6">
            {ideas.map((idea) => (
              <Card key={idea.id} isDarkMode={isDarkMode} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className={`text-sm font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                      {idea.avatar}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {idea.title}
                    </h3>
                    <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {idea.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{idea.author}</span>
                        <span>•</span>
                        <span>{idea.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <FaThumbsUp className="text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">{idea.votes}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(idea.status)}`}>
                          {idea.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'events':
        return (
          <div className="space-y-6">
            {events.map((event) => (
              <Card key={event.id} isDarkMode={isDarkMode} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaCalendarAlt className={`text-xl ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {event.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <FaCalendarAlt className="text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaClock className="text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{event.location}</span>
                      </div>
                    </div>
                    <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <FaUsers className="text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {event.attendees} attending
                        </span>
                      </div>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Join Event
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      default:
        return null;
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
            🌱 Community
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Connect, learn, and grow with fellow farmers
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card isDarkMode={isDarkMode} className="text-center">
              <FaUsers className={`text-3xl mx-auto mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                12,847
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Active Members
              </div>
            </Card>
            <Card isDarkMode={isDarkMode} className="text-center">
              <FaComments className={`text-3xl mx-auto mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                8,932
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Discussions
              </div>
            </Card>
            <Card isDarkMode={isDarkMode} className="text-center">
              <FaQuestionCircle className={`text-3xl mx-auto mb-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                3,421
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Questions Answered
              </div>
            </Card>
            <Card isDarkMode={isDarkMode} className="text-center">
              <FaTrophy className={`text-3xl mx-auto mb-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                156
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Events This Month
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="text-sm" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants}>
          {renderContent()}
        </motion.div>

        {/* Join Community CTA */}
        <motion.div variants={itemVariants} className="mt-12">
          <Card isDarkMode={isDarkMode}>
            <div className="text-center py-8">
              <FaUsers className={`text-5xl mx-auto mb-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Join Our Growing Community
              </h2>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Connect with farmers from around the world, share your experiences, and learn from the best in agriculture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Join Community
                </button>
                <button className="border-2 border-green-600 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Start Discussion
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Community;