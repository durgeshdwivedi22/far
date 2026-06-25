import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { storage } from './utils/storage';
import { useTranslation } from './utils/translation';
import Header from './components/Header';
import Footer from './components/Footer';
import NotificationSystem from './components/NotificationSystem';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Login from './pages/Login-Improved';
import Register from './pages/Register';
import RecordBook from './pages/RecordBook';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Market from './pages/Market';
import Weather from './pages/Weather';
import CropGuide from './pages/CropGuide';
import FarmingTips from './pages/FarmingTips';
import KnowledgeBase from './pages/KnowledgeBase';
import ApiDocs from './pages/ApiDocs';
import HelpCenter from './pages/HelpCenter';
import ContactUs from './pages/ContactUs';
import Community from './pages/Community';
import SystemStatus from './pages/SystemStatus';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import Assistant from './pages/Assistant';
import ChatBot from './components/ChatBot';
import { ThemeProvider } from './contexts/ThemeContext';

// Loading component
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
    <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const { t } = useTranslation(language);
  const location = useLocation();

  useEffect(() => {
    // Initialize app
    const initializeApp = () => {
      try {
        // Load user data
        const userData = storage.getUser();
        setUser(userData);

        // Load settings
        const settings = storage.getSettings();
        setIsDarkMode(settings.darkMode);
        setLanguage(settings.language || 'en');
        
        // Apply dark mode
        if (settings.darkMode) {
          document.documentElement.classList.add('dark');
        }

        // Create demo user if no users exist
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.length === 0) {
          const demoUser = {
            id: 'demo',
            name: 'Demo Farmer',
            email: 'demo@farmer.com',
            password: 'demo123',
            createdAt: new Date().toISOString()
          };
          users.push(demoUser);
          localStorage.setItem('users', JSON.stringify(users));
        }

        // Add sample data if no expenses exist
        const expenses = storage.getExpenses();
        if (expenses.length === 0) {
          const sampleExpenses = [
            {
              type: 'investment',
              amount: 5000,
              description: 'Seeds and fertilizers',
              date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              type: 'investment',
              amount: 3000,
              description: 'Farm equipment',
              date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              type: 'profit',
              amount: 12000,
              description: 'Wheat harvest sale',
              date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              type: 'investment',
              amount: 2000,
              description: 'Irrigation system',
              date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              type: 'profit',
              amount: 8000,
              description: 'Rice harvest sale',
              date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              type: 'loss',
              amount: 1500,
              description: 'Pest control treatment',
              date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              type: 'profit',
              amount: 15000,
              description: 'Cotton harvest sale',
              date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            }
          ];

          sampleExpenses.forEach(expense => {
            storage.addExpense(expense);
          });

          // Add sample crops
          const sampleCrops = [
            { name: 'Wheat', area: '2.5 acres', season: 'Winter', soilType: 'Loamy' },
            { name: 'Rice', area: '3 acres', season: 'Rainy', soilType: 'Clay' },
            { name: 'Cotton', area: '1.5 acres', season: 'Summer', soilType: 'Black' }
          ];

          sampleCrops.forEach(crop => {
            storage.addCrop(crop);
          });

          // Add sample farm records
          const sampleRecords = [
            {
              date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              activity: 'crop_planted',
              cropName: 'Wheat',
              description: 'Planted wheat seeds in field A',
              amount: '50',
              unit: 'kg',
              notes: 'Used high-quality seeds'
            },
            {
              date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              activity: 'fertilizer_used',
              description: 'Applied NPK fertilizer',
              amount: '100',
              unit: 'kg',
              notes: 'Field A - before sowing'
            },
            {
              date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              activity: 'water_usage',
              description: 'Irrigation through sprinkler system',
              amount: '2000',
              unit: 'liters',
              notes: 'Morning irrigation'
            }
          ];

          localStorage.setItem('farmer_records', JSON.stringify(sampleRecords));

          if (window.notify) {
            window.notify('Sample data loaded for demo! 🌾', 'success');
          }
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        if (window.notify) {
          window.notify('Error initializing app', 'error');
        }
      } finally {
        // Simulate loading time for better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    initializeApp();
  }, []); // Empty dependency array to prevent infinite re-renders

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NotificationSystem />
        <Header />
        <ChatBot />
        
        <main className="flex-1">
          <Routes>
              {/* Public Routes */}
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              
              <Route path="/register" element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />
              
              <Route path="/market" element={
                <PublicRoute>
                  <Market />
                </PublicRoute>
              } />
              
              <Route path="/weather" element={
                <PublicRoute>
                  <Weather />
                </PublicRoute>
              } />

              <Route path="/assistant" element={
                <PublicRoute>
                  <Assistant />
                </PublicRoute>
              } />

              {/* Content Pages */}
              <Route path="/crop-guide" element={<CropGuide />} />
              <Route path="/farming-tips" element={<FarmingTips />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/api-docs" element={<ApiDocs />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/community" element={<Community />} />
              <Route path="/system-status" element={<SystemStatus />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />

              {/* Main public home route */}
              <Route path="/" element={<Home />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } />
              
              <Route path="/record-book" element={
                <ProtectedRoute>
                  <RecordBook />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </main>
        
        <Footer />
      </div>
  );
};

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
};

export default App;
