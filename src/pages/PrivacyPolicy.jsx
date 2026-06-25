import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaEye, FaUserCheck, FaCookieBite, FaFileContract } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';

const PrivacyPolicy = () => {
  const { isDarkMode } = useTheme();

  const sections = [
    {
      icon: FaShieldAlt,
      title: 'Information We Collect',
      content: [
        'Personal information you provide (name, email, phone number)',
        'Farm and location data for weather and crop recommendations',
        'Usage data and analytics to improve our services',
        'Device information and IP addresses for security',
        'Payment information for subscription services'
      ]
    },
    {
      icon: FaLock,
      title: 'How We Use Your Information',
      content: [
        'Provide and maintain our farming assistance services',
        'Personalize weather forecasts and crop recommendations',
        'Process payments and manage subscriptions',
        'Send important updates and notifications',
        'Improve our services through analytics and research',
        'Ensure platform security and prevent fraud'
      ]
    },
    {
      icon: FaEye,
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information to third parties',
        'Limited sharing with service providers for essential functions',
        'Legal compliance when required by law',
        'Aggregate, anonymized data for research and analytics',
        'Your explicit consent before sharing sensitive data'
      ]
    },
    {
      icon: FaUserCheck,
      title: 'Your Rights and Choices',
      content: [
        'Access and review your personal information',
        'Correct inaccurate or incomplete data',
        'Delete your account and associated data',
        'Opt-out of marketing communications',
        'Data portability to another service',
        'Control cookie preferences and tracking'
      ]
    },
    {
      icon: FaCookieBite,
      title: 'Cookies and Tracking',
      content: [
        'Essential cookies for website functionality',
        'Analytics cookies to understand usage patterns',
        'Preference cookies to remember your settings',
        'Marketing cookies (with your consent)',
        'Third-party cookies for integrated services',
        'Clear options to manage cookie preferences'
      ]
    },
    {
      icon: FaFileContract,
      title: 'Data Security',
      content: [
        'Industry-standard encryption for data transmission',
        'Secure servers with regular security audits',
        'Access controls and employee training',
        'Regular backups and disaster recovery',
        'Incident response plan for data breaches',
        'Transparent communication about security issues'
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
            🔒 Privacy Policy
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            How we protect and handle your personal information
          </p>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Last updated: January 15, 2024
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card isDarkMode={isDarkMode}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Our Commitment to Privacy
            </h2>
            <p className={`text-base leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              At Smart Farmer Assistant, we are committed to protecting your privacy and ensuring the security of your personal information. This privacy policy explains how we collect, use, and safeguard your data when you use our services.
            </p>
            <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We believe in transparency and giving you control over your data. If you have any questions about this policy or our practices, please contact us using the information provided at the end of this document.
            </p>
          </Card>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-8 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card isDarkMode={isDarkMode}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className={`text-xl ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {section.title}
                      </h3>
                      <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">•</span>
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

        {/* Data Retention */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card isDarkMode={isDarkMode}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Data Retention and Deletion
            </h2>
            <p className={`text-base leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We retain your personal information only as long as necessary to provide our services and fulfill the purposes outlined in this policy. When you delete your account or request data deletion, we will:
            </p>
            <ul className={`space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Delete your personal information within 30 days</li>
              <li>• Anonymize usage data for analytics purposes</li>
              <li>• Maintain required records for legal compliance</li>
              <li>• Notify you when deletion is complete</li>
            </ul>
            <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Some data may be retained in backup systems for up to 90 days for disaster recovery purposes, after which it is permanently deleted.
            </p>
          </Card>
        </motion.div>

        {/* International Data Transfers */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card isDarkMode={isDarkMode}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              International Data Transfers
            </h2>
            <p className={`text-base leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Smart Farmer Assistant operates globally, and your data may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws by:
            </p>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Using standard contractual clauses approved by regulatory authorities</li>
              <li>• Implementing robust security measures for data in transit</li>
              <li>• Conducting regular audits of our data processing partners</li>
              <li>• Obtaining your consent when required by law</li>
            </ul>
          </Card>
        </motion.div>

        {/* Children's Privacy */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card isDarkMode={isDarkMode}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Children's Privacy
            </h2>
            <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Our services are designed for adult farmers and agricultural professionals. We do not knowingly collect personal information from children under 13 years of age. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
            </p>
          </Card>
        </motion.div>

        {/* Changes to Policy */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card isDarkMode={isDarkMode}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Changes to This Policy
            </h2>
            <p className={`text-base leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. When we make material changes, we will:
            </p>
            <ul className={`space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Notify you via email or in-app notification</li>
              <li>• Update the "Last updated" date at the top of this policy</li>
              <li>• Provide a summary of key changes</li>
              <li>• Give you time to review before the changes take effect</li>
            </ul>
            <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your continued use of our services after the effective date of changes constitutes acceptance of the updated policy.
            </p>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div variants={itemVariants}>
          <Card isDarkMode={isDarkMode}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Contact Us About Privacy
            </h2>
            <p className={`text-base leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              If you have any questions about this privacy policy or our data practices, please contact us:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Privacy Officer
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  privacy@smartfarmer.com<br />
                  +1 (555) 123-4567
                </p>
              </div>

              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Data Protection Officer
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  dpo@smartfarmer.com<br />
                  +1 (555) 123-4568
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                <strong>Data Subject Rights:</strong> You have the right to access, correct, delete, or transfer your personal data. Contact us to exercise these rights or if you have concerns about how we handle your information.
              </p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;