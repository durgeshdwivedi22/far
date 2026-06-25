import React from 'react';
import { motion } from 'framer-motion';
import { FaSeedling, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Analytics', href: '/analytics' },
      { name: 'Market Prices', href: '/market' },
      { name: 'Weather', href: '/weather' }
    ],
    resources: [
      { name: 'Crop Guide', href: '/crop-guide' },
      { name: 'Farming Tips', href: '/farming-tips' },
      { name: 'Knowledge Base', href: '/knowledge-base' },
      { name: 'API Docs', href: '/api-docs' }
    ],
    support: [
      { name: 'Help Center', href: '/help-center' },
      { name: 'Contact Us', href: '/contact-us' },
      { name: 'Community', href: '/community' },
      { name: 'System Status', href: '/system-status' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Cookie Policy', href: '/cookie-policy' }
    ]
  };

  const socialLinks = [
    { icon: FaFacebook, href: '#facebook', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: FaTwitter, href: '#twitter', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: FaInstagram, href: '#instagram', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: FaYoutube, href: '#youtube', label: 'YouTube', color: 'hover:bg-red-600' },
    { icon: FaLinkedin, href: '#linkedin', label: 'LinkedIn', color: 'hover:bg-blue-700' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <FaSeedling className="text-lg text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Smart Farmer</h2>
                  <p className="text-sm text-green-400">Assistant</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-sm">
                Empowering farmers with AI-driven insights and smart agricultural solutions for sustainable farming.
              </p>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-400">
                  <FaEnvelope className="text-green-400 text-xs" />
                  <span className="text-xs">support@smartfarmer.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <FaPhone className="text-green-400 text-xs" />
                  <span className="text-xs">+91 1800-FARM-HELP</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <FaMapMarkerAlt className="text-green-400 text-xs" />
                  <span className="text-xs">New Delhi, India</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="space-y-3"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-sm text-center md:text-left"
            >
              © {currentYear} Smart Farmer Assistant. All rights reserved.
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center space-x-3"
            >
              <span className="text-gray-400 text-sm">Follow us:</span>
              <div className="flex space-x-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className={`w-8 h-8 bg-gray-800 ${social.color} rounded-md flex items-center justify-center transition-all duration-300 hover:scale-110`}
                    >
                      <Icon className="text-xs" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-6 pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <span>🌾 Serving farmers worldwide</span>
                <span>•</span>
                <span>Version 2.1.0</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>System Status:</span>
                <span className="text-green-400">● Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
