import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaClock, FaServer, FaDatabase, FaCloud, FaGlobe, FaMobileAlt, FaShieldAlt } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';

const SystemStatus = () => {
  const { isDarkMode } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      name: 'Web Application',
      status: 'operational',
      uptime: '99.9%',
      icon: FaGlobe,
      lastIncident: null,
      responseTime: '< 200ms'
    },
    {
      name: 'API Services',
      status: 'operational',
      uptime: '99.8%',
      icon: FaServer,
      lastIncident: '2 days ago',
      responseTime: '< 150ms'
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.9%',
      icon: FaDatabase,
      lastIncident: null,
      responseTime: '< 50ms'
    },
    {
      name: 'Weather API',
      status: 'operational',
      uptime: '99.7%',
      icon: FaCloud,
      lastIncident: '1 week ago',
      responseTime: '< 300ms'
    },
    {
      name: 'Mobile App',
      status: 'operational',
      uptime: '99.5%',
      icon: FaMobileAlt,
      lastIncident: '3 days ago',
      responseTime: '< 250ms'
    },
    {
      name: 'Security Systems',
      status: 'operational',
      uptime: '100%',
      icon: FaShieldAlt,
      lastIncident: null,
      responseTime: '< 10ms'
    }
  ];

  const incidents = [
    {
      id: 1,
      title: 'Scheduled Maintenance - Weather API',
      status: 'resolved',
      date: '2026-04-10',
      duration: '2 hours',
      description: 'Routine maintenance to update weather data sources and improve accuracy.',
      impact: 'Minor delays in weather updates during maintenance window.'
    },
    {
      id: 2,
      title: 'API Rate Limiting Issue',
      status: 'resolved',
      date: '2026-04-05',
      duration: '45 minutes',
      description: 'Temporary rate limiting issue affecting a small percentage of API requests.',
      impact: 'Some users experienced slower response times during the incident.'
    },
    {
      id: 3,
      title: 'Database Optimization',
      status: 'resolved',
      date: '2026-03-28',
      duration: '30 minutes',
      description: 'Performance optimization of database queries to improve response times.',
      impact: 'No user-facing impact during the maintenance.'
    }
  ];

  const upcomingMaintenance = [
    {
      id: 1,
      title: 'Security Updates',
      date: 'April 20, 2026',
      time: '02:00 - 04:00 UTC',
      services: ['Web Application', 'API Services', 'Security Systems'],
      description: 'Applying critical security patches and updates.'
    },
    {
      id: 2,
      title: 'Database Maintenance',
      date: 'April 25, 2026',
      time: '01:00 - 03:00 UTC',
      services: ['Database'],
      description: 'Routine database maintenance and optimization.'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <FaCheckCircle className="text-green-500" />;
      case 'degraded':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'outage':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 dark:text-green-400';
      case 'degraded':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'outage':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getIncidentStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'identified':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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
            🖥️ System Status
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Real-time status of all Smart Farmer Assistant services
          </p>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Last updated: {currentTime.toLocaleString()}
          </p>
        </motion.div>

        {/* Overall Status */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card isDarkMode={isDarkMode}>
            <div className="text-center py-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <FaCheckCircle className="text-4xl text-green-500" />
                <div>
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    All Systems Operational
                  </h2>
                  <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Smart Farmer Assistant is running smoothly
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    99.8%
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Average Uptime (30 days)
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    &lt; 200ms
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Average Response Time
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    0
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                   
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Service Status */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Service Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} isDarkMode={isDarkMode}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <Icon className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {service.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(service.status)}
                          <span className={`text-sm capitalize ${getStatusColor(service.status)}`}>
                            {service.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Uptime:
                      </span>
                      <span className={`ml-2 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {service.uptime}
                      </span>
                    </div>
                    <div>
                      <span className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Response:
                      </span>
                      <span className={`ml-2 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {service.responseTime}
                      </span>
                    </div>
                  </div>

                  {service.lastIncident && (
                    <div className="mt-3 text-sm">
                      <span className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Last incident:
                      </span>
                      <span className={`ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {service.lastIncident}
                      </span>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming Maintenance */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Upcoming Maintenance
          </h2>

          <div className="space-y-4">
            {upcomingMaintenance.map((maintenance) => (
              <Card key={maintenance.id} isDarkMode={isDarkMode}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {maintenance.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{maintenance.date}</span>
                      <span>{maintenance.time}</span>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                    Scheduled
                  </span>
                </div>

                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {maintenance.description}
                </p>

                <div>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Affected services:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {maintenance.services.map((service, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded ${
                          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Recent Incidents */}
        <motion.div variants={itemVariants}>
          <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Recent Incidents
          </h2>

          <div className="space-y-4">
            {incidents.map((incident) => (
              <Card key={incident.id} isDarkMode={isDarkMode}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {incident.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span>{incident.date}</span>
                      <span>Duration: {incident.duration}</span>
                    </div>
                    <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {incident.description}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <strong>Impact:</strong> {incident.impact}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ml-4 ${getIncidentStatusColor(incident.status)}`}>
                    {incident.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Status Page Info */}
        <motion.div variants={itemVariants} className="mt-12">
          <Card isDarkMode={isDarkMode}>
            <div className="text-center py-6">
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Stay Informed
              </h3>
              <p className={`text-base mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Subscribe to our status page to receive real-time updates about service availability and maintenance schedules.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Subscribe to Updates
                </button>
                <button className="border-2 border-green-600 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  RSS Feed
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SystemStatus;