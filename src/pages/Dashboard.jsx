import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { storage } from '../utils/storage';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';
import Chart from '../components/Chart';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const [user, setUser] = useState(null);
  const userName = user?.name || user?.fullName || 'Farmer';
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({
    totalInvestment: 0,
    totalProfit: 0,
    totalLoss: 0,
    netProfit: 0,
    totalCrops: 0
  });
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    type: 'investment',
    amount: '',
    description: ''
  });

  useEffect(() => {
    // Load user data
    const userData = storage.getUser();
    setUser(userData);

    // Load expenses and calculate summary
    loadExpenses();
  }, []);

  const loadExpenses = () => {
    const expenseData = storage.getExpenses();
    const summaryData = storage.getFinancialSummary();
    setExpenses(expenseData);
    setSummary(summaryData);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    
    if (!newExpense.amount || !newExpense.description) {
      toast.error('Please fill all fields');
      return;
    }

    const expense = {
      type: newExpense.type,
      amount: parseFloat(newExpense.amount),
      description: newExpense.description,
      date: new Date().toISOString()
    };

    const addedExpense = storage.addExpense(expense);
    if (addedExpense) {
      toast.success(`${newExpense.type} added successfully!`);
      setNewExpense({ type: 'investment', amount: '', description: '' });
      setShowAddExpense(false);
      loadExpenses();
    } else {
      toast.error('Failed to add expense');
    }
  };

  const handleDeleteExpense = (id) => {
    if (storage.deleteExpense(id)) {
      toast.success('Expense deleted successfully!');
      loadExpenses();
    } else {
      toast.error('Failed to delete expense');
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

  // Prepare chart data
  const chartData = [
    {
      name: 'Financial Overview',
      labels: ['Investment', 'Profit', 'Loss'],
      values: [summary.totalInvestment, summary.totalProfit, summary.totalLoss]
    }
  ];

  const pieChartData = [
    { name: 'Investment', value: summary.totalInvestment },
    { name: 'Profit', value: summary.totalProfit },
    { name: 'Loss', value: summary.totalLoss }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            📊 Farmer Dashboard
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {user ? `Welcome back, ${userName}!` : 'Welcome to your dashboard'}
          </p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'Total Investment', 
              value: `₹${summary.totalInvestment.toLocaleString()}`, 
              icon: '💰', 
              color: 'text-blue-600',
              bgColor: isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100'
            },
            { 
              label: 'Total Profit', 
              value: `₹${summary.totalProfit.toLocaleString()}`, 
              icon: '📈', 
              color: 'text-green-600',
              bgColor: isDarkMode ? 'bg-green-900/20' : 'bg-green-100'
            },
            { 
              label: 'Total Loss', 
              value: `₹${summary.totalLoss.toLocaleString()}`, 
              icon: '📉', 
              color: 'text-red-600',
              bgColor: isDarkMode ? 'bg-red-900/20' : 'bg-red-100'
            },
            { 
              label: 'Net Profit', 
              value: `₹${summary.netProfit.toLocaleString()}`, 
              icon: '💎', 
              color: summary.netProfit >= 0 ? 'text-green-600' : 'text-red-600',
              bgColor: summary.netProfit >= 0 
                ? (isDarkMode ? 'bg-green-900/20' : 'bg-green-100')
                : (isDarkMode ? 'bg-red-900/20' : 'bg-red-100')
            }
          ].map((stat, index) => (
            <Card key={index} delay={index * 0.1} isDarkMode={isDarkMode}>
              <div className="text-center">
                <div className={`text-3xl mb-2 ${stat.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto`}>
                  {stat.icon}
                </div>
                <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card isDarkMode={isDarkMode}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              📊 Financial Overview
            </h3>
            <Chart type="bar" data={chartData} height={300} />
          </Card>

          <Card isDarkMode={isDarkMode}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              🥧 Financial Distribution
            </h3>
            <Chart type="pie" data={pieChartData} height={300} />
          </Card>
        </motion.div>

        {/* Expense Management */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card isDarkMode={isDarkMode}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  💰 Expense History
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddExpense(!showAddExpense)}
                  className="btn-primary"
                >
                  + Add Expense
                </motion.button>
              </div>

              {/* Add Expense Form */}
              {showAddExpense && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-4 rounded-lg mb-6 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <form onSubmit={handleAddExpense} className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Type
                      </label>
                      <select
                        value={newExpense.type}
                        onChange={(e) => setNewExpense({...newExpense, type: e.target.value})}
                        className={`w-full p-3 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-600 border-gray-500 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="investment">Investment</option>
                        <option value="profit">Profit</option>
                        <option value="loss">Loss</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                        placeholder="Enter amount"
                        className={`w-full p-3 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-600 border-gray-500 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        required
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Description
                      </label>
                      <input
                        type="text"
                        value={newExpense.description}
                        onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                        placeholder="Enter description"
                        className={`w-full p-3 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-600 border-gray-500 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        required
                      />
                    </div>

                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="flex-1 btn-primary"
                      >
                        Add
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setShowAddExpense(false)}
                        className={`flex-1 px-4 py-2 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-600 border-gray-500 text-white'
                            : 'bg-white border-gray-300 text-gray-700'
                        }`}
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Expense List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {expenses.length === 0 ? (
                  <div className={`text-center py-8 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <p>No expenses recorded yet.</p>
                    <p className="text-sm mt-2">Add your first expense to get started!</p>
                  </div>
                ) : (
                  expenses.map((expense) => (
                    <motion.div
                      key={expense.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              expense.type === 'investment' 
                                ? 'bg-blue-100 text-blue-800'
                                : expense.type === 'profit'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {expense.type}
                            </span>
                            <span className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {new Date(expense.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className={`font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            ₹{expense.amount.toLocaleString()}
                          </p>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {expense.description}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          🗑️
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card isDarkMode={isDarkMode}>
              <h3 className={`text-lg font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                📈 Quick Stats
              </h3>
              <div className="space-y-4">
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      ROI
                    </span>
                    <span className={`font-bold ${
                      summary.totalInvestment > 0 
                        ? (summary.netProfit / summary.totalInvestment * 100 >= 0 ? 'text-green-600' : 'text-red-600')
                        : 'text-gray-600'
                    }`}>
                      {summary.totalInvestment > 0 
                        ? `${((summary.netProfit / summary.totalInvestment) * 100).toFixed(1)}%`
                        : 'N/A'
                      }
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total Transactions
                    </span>
                    <span className={`font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {expenses.length}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card isDarkMode={isDarkMode}>
              <h3 className={`text-lg font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                🚀 Quick Actions
              </h3>
              <div className="space-y-3">
                <Link to="/analytics">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary"
                  >
                    📊 View Analytics
                  </motion.button>
                </Link>
                <Link to="/">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full btn-secondary ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    🏠 Back to Home
                  </motion.button>
                </Link>
              </div>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
