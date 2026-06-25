import React from 'react';
import { motion } from 'framer-motion';
import { FaFileContract, FaUser, FaShieldAlt, FaExclamationTriangle, FaBalanceScale, FaGavel } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';

const TermsOfService = () => {
  const { isDarkMode } = useTheme();

  const sections = [
    {
      icon: FaUser,
      title: 'User Accounts and Eligibility',
      content: [
        'You must be at least 18 years old to use our services',
        'You must provide accurate and complete registration information',
        'You are responsible for maintaining account security',
        'One account per user; sharing accounts is prohibited',
        'You must notify us immediately of any security breaches',
        'We reserve the right to suspend or terminate accounts'
      ]
    },
    {
      icon: FaShieldAlt,
      title: 'Acceptable Use and Prohibited Activities',
      content: [
        'Use services only for lawful agricultural and farming purposes',
        'Do not share false or misleading information',
        'Respect intellectual property rights of all content',
        'Do not attempt to reverse engineer or hack our systems',
        'Do not use automated tools to access our services',
        'Do not distribute malware or harmful code',
        'Do not harass or abuse other users or our staff'
      ]
    },
    {
      icon: FaExclamationTriangle,
      title: 'Service Availability and Limitations',
      content: [
        'Services are provided "as is" without warranties',
        'We strive for high availability but cannot guarantee uptime',
        'Weather and crop data is for informational purposes only',
        'We are not liable for farming decisions based on our data',
        'Service interruptions may occur for maintenance',
        'We may modify or discontinue features with notice',
        'Your use of recommendations is at your own risk'
      ]
    },
    {
      icon: FaBalanceScale,
      title: 'Intellectual Property and Content',
      content: [
        'All platform content is owned by Smart Farmer Assistant',
        'You retain ownership of your uploaded data and content',
        'You grant us license to use your content for service provision',
        'Do not copy, distribute, or create derivative works',
        'Respect copyright and trademark laws',
        'Report any infringements to our designated contact'
      ]
    },
    {
      icon: FaGavel,
      title: 'Disclaimers and Limitation of Liability',
      content: [
        'Services provided without warranty of any kind',
        'We are not liable for indirect, incidental, or consequential damages',
        'Maximum liability limited to amount paid in past 12 months',
        'We do not guarantee accuracy of weather or crop data',
        'Agricultural advice is for informational purposes only',
        'You assume all risks associated with farming decisions',
        'Force majeure events may affect service availability'
      ]
    },
    {
      icon: FaFileContract,
      title: 'Payment Terms and Billing',
      content: [
        'Subscription fees are billed in advance',
        'Payments are non-refundable except as required by law',
        'We may change pricing with 30 days notice',
        'Late payments may result in service suspension',
        'Taxes are your responsibility',
        'Billing disputes must be raised within 60 days',
        'Automatic renewal unless cancelled before renewal date'
      ]
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
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            📋 Terms of Service
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Rules and guidelines for using Smart Farmer Assistant
          </p>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Effective Date: January 1, 2024
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card isDarkMode={isDarkMode}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Agreement to Terms
            </h2>
            <p className={`text-base leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              By accessing or using Smart Farmer Assistant, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
            </p>
            <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              These terms constitute a legally binding agreement between you and Smart Farmer Assistant. Please read them carefully before using our platform.
            </p>
          </Card>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-8 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card isDarkMode={isDarkMode}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className={`text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {section.title}
                      </h3>
                      <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="text-blue-500 mr-2 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Termination */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card isDarkMode={isDarkMode}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Account Termination and Suspension
            </h2>
            <p className={`text-base leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We reserve the right to suspend or terminate your account at any time for violations of these terms, illegal activity, or other conduct that we determine to be harmful to our service or other users.
            </p>
            <ul className={`space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Immediate suspension for serious violations</li>
              <li>• Written notice for most terminations</li>
              <li>• Appeal process available for disputed terminations</li>
              <li>• Data export available before account deletion</li>
              <li>• Refund eligibility determined case-by-case</li>
            </ul>
            <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Upon termination, your right to use our services ceases immediately, and we may delete your account and data in accordance with our privacy policy.
            </p>
          </Card>
        </motion.div>

        {/* Governing Law */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card isDarkMode={isDarkMode}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Governing Law and Dispute Resolution
            </h2>
            <p className={`text-base leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              These terms are governed by the laws of the jurisdiction where Smart Farmer Assistant is incorporated. Any disputes arising from these terms or your use of our services will be resolved through:
            </p>
            <ul className={`space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Good faith negotiations between parties</li>
              <li>• Mediation as a first step in dispute resolution</li>
              <li>• Binding arbitration in accordance with applicable rules</li>
              <li>• Class action waivers for individual disputes</li>
              <li>• Local court jurisdiction for injunctive relief</li>
            </ul>
            <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We encourage users to contact us first to resolve any concerns before pursuing formal dispute resolution.
            </p>
          </Card>
        </motion.div>

        {/* Changes to Terms */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card isDarkMode={isDarkMode}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Changes to Terms
            </h2>
            <p className={`text-base leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We may modify these terms at any time. When we make material changes, we will:
            </p>
            <ul className={`space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Provide reasonable notice of changes</li>
              <li>• Update the effective date at the top of this document</li>
              <li>• Send email notifications to registered users</li>
              <li>• Post prominent notices in our application</li>
              <li>• Allow time for review before changes take effect</li>
            </ul>
            <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your continued use of our services after the effective date constitutes acceptance of the modified terms.
            </p>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div variants={itemVariants}>
          <Card isDarkMode={isDarkMode}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Contact Information
            </h2>
            <p className={`text-base leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              If you have questions about these Terms of Service, please contact us:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Legal Department
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  legal@smartfarmer.com<br />
                  +1 (555) 123-4567
                </p>
              </div>

              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  General Support
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  support@smartfarmer.com<br />
                  +1 (555) 123-4568
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className={`text-sm ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                <strong>Important:</strong> These terms apply to all users of Smart Farmer Assistant. By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TermsOfService;