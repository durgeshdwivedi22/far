import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { storage } from '../utils/storage';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';
import Chart from '../components/Chart';

const Analytics = () => {
  const { isDarkMode } = useTheme();
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({
    totalInvestment: 0,
    totalProfit: 0,
    totalLoss: 0,
    netProfit: 0,
    totalCrops: 0
  });
  const [timeRange, setTimeRange] = useState('all');

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

  const getFilteredExpenses = () => {
    const now = new Date();
    const filteredExpenses = [...expenses];

    switch (timeRange) {
      case '7days':
        return filteredExpenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          return (now - expenseDate) <= (7 * 24 * 60 * 60 * 1000);
        });
      case '30days':
        return filteredExpenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          return (now - expenseDate) <= (30 * 24 * 60 * 60 * 1000);
        });
      case '90days':
        return filteredExpenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          return (now - expenseDate) <= (90 * 24 * 60 * 60 * 1000);
        });
      default:
        return filteredExpenses;
    }
  };

  const getMonthlyData = () => {
    const filteredExpenses = getFilteredExpenses();
    const monthlyData = {};
    
    filteredExpenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { investment: 0, profit: 0, loss: 0 };
      }
      
      monthlyData[monthKey][expense.type] += parseFloat(expense.amount);
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      name: month,
      labels: ['Investment', 'Profit', 'Loss'],
      values: [data.investment, data.profit, data.loss]
    }));
  };

  const getCategoryData = () => {
    const filteredExpenses = getFilteredExpenses();
    const categoryData = { investment: 0, profit: 0, loss: 0 };
    
    filteredExpenses.forEach(expense => {
      categoryData[expense.type] += parseFloat(expense.amount);
    });

    return [
      { name: 'Investment', value: categoryData.investment },
      { name: 'Profit', value: categoryData.profit },
      { name: 'Loss', value: categoryData.loss }
    ];
  };

  const getTopExpenses = () => {
    const filteredExpenses = getFilteredExpenses();
    return filteredExpenses
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
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

  const monthlyData = getMonthlyData();
  const categoryData = getCategoryData();
  const topExpenses = getTopExpenses();

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            📈 Analytics Dashboard
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Detailed insights into your farming finances
          </p>
        </motion.div>

        {/* Time Range Selector */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card isDarkMode={isDarkMode}>
            <div className="flex flex-wrap items-center justify-between">
              <h3 className={`text-lg font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                📅 Time Range
              </h3>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                {['7days', '30days', '90days', 'all'].map((range) => (
                  <motion.button
                    key={range}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      timeRange === range
                        ? 'bg-green-500 text-white'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {range === '7days' && '7 Days'}
                    {range === '30days' && '30 Days'}
                    {range === '90days' && '90 Days'}
                    {range === 'all' && 'All Time'}
                  </motion.button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Summary Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'Total Investment', 
              value: `₹${summary.totalInvestment.toLocaleString()}`, 
              icon: '💰', 
              color: 'text-blue-600',
              change: '+12%',
              changeColor: 'text-green-600'
            },
            { 
              label: 'Total Profit', 
              value: `₹${summary.totalProfit.toLocaleString()}`, 
              icon: '📈', 
              color: 'text-green-600',
              change: '+18%',
              changeColor: 'text-green-600'
            },
            { 
              label: 'Total Loss', 
              value: `₹${summary.totalLoss.toLocaleString()}`, 
              icon: '📉', 
              color: 'text-red-600',
              change: '-5%',
              changeColor: 'text-green-600'
            },
            { 
              label: 'Net Profit', 
              value: `₹${summary.netProfit.toLocaleString()}`, 
              icon: '💎', 
              color: summary.netProfit >= 0 ? 'text-green-600' : 'text-red-600',
              change: '+15%',
              changeColor: 'text-green-600'
            }
          ].map((stat, index) => (
            <Card key={index} delay={index * 0.1} isDarkMode={isDarkMode}>
              <div className="text-center">
                <div className={`text-3xl mb-2 ${
                  isDarkMode ? 'text-gray-600' : 'text-gray-200'
                } rounded-full w-16 h-16 flex items-center justify-center mx-auto`}>
                  {stat.icon}
                </div>
                <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
                <div className={`text-sm mt-1 ${stat.changeColor}`}>
                  {stat.change}
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div variants={itemVariants}>
            <Card isDarkMode={isDarkMode}>
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                📊 Monthly Trends
              </h3>
              {monthlyData.length > 0 ? (
                <Chart type="line" data={monthlyData} height={300} />
              ) : (
                <div className={`text-center py-8 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <p>No data available for the selected time range</p>
                </div>
              )}
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card isDarkMode={isDarkMode}>
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                🥧 Category Distribution
              </h3>
              {categoryData.some(item => item.value > 0) ? (
                <Chart type="pie" data={categoryData} height={300} />
              ) : (
                <div className={`text-center py-8 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <p>No data available for the selected time range</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Additional Charts */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card isDarkMode={isDarkMode}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              📈 Area Chart
            </h3>
            {monthlyData.length > 0 ? (
              <Chart type="area" data={monthlyData} height={300} />
            ) : (
              <div className={`text-center py-8 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <p>No data available for the selected time range</p>
              </div>
            )}
          </Card>

          <Card isDarkMode={isDarkMode}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              📊 Comparison Chart
            </h3>
            {monthlyData.length > 0 ? (
              <Chart type="bar" data={monthlyData} height={300} />
            ) : (
              <div className={`text-center py-8 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <p>No data available for the selected time range</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Top Expenses */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card isDarkMode={isDarkMode}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              💰 Top Expenses
            </h3>
            <div className="space-y-3">
              {topExpenses.length > 0 ? (
                topExpenses.map((expense, index) => (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`text-lg font-bold ${
                            index === 0 ? 'text-yellow-500' :
                            index === 1 ? 'text-gray-400' :
                            index === 2 ? 'text-orange-600' : 'text-gray-600'
                          }`}>
                            #{index + 1}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            expense.type === 'investment' 
                              ? 'bg-blue-100 text-blue-800'
                              : expense.type === 'profit'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {expense.type}
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
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className={`text-center py-8 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <p>No expenses recorded yet</p>
                </div>
              )}
            </div>
          </Card>

          {/* Key Insights */}
          <Card isDarkMode={isDarkMode}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              🔍 Key Insights
            </h3>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-green-900/30' : 'bg-green-50'
              }`}>
                <h4 className={`font-semibold text-green-800 dark:text-green-300 mb-2`}>
                  📈 Profit Margin
                </h4>
                <p className={`text-green-700 dark:text-green-400`}>
                  {summary.totalInvestment > 0 
                    ? `Your profit margin is ${((summary.netProfit / summary.totalInvestment) * 100).toFixed(1)}%`
                    : 'Add investments to calculate profit margin'
                  }
                </p>
              </div>

              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'
              }`}>
                <h4 className={`font-semibold text-blue-800 dark:text-blue-300 mb-2`}>
                  💡 Investment Efficiency
                </h4>
                <p className={`text-blue-700 dark:text-blue-400`}>
                  {summary.totalInvestment > 0 
                    ? `For every ₹100 invested, you're making ₹${((summary.totalProfit / summary.totalInvestment) * 100).toFixed(0)} in profit`
                    : 'Start tracking investments to see efficiency metrics'
                  }
                </p>
              </div>

              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'
              }`}>
                <h4 className={`font-semibold text-yellow-800 dark:text-yellow-300 mb-2`}>
                  ⚠️ Risk Assessment
                </h4>
                <p className={`text-yellow-700 dark:text-yellow-400`}>
                  {summary.totalLoss > 0 
                    ? `Your loss ratio is ${((summary.totalLoss / (summary.totalInvestment + summary.totalProfit)) * 100).toFixed(1)}%`
                    : 'No losses recorded - great job!'
                  }
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="mt-8">
          <Card isDarkMode={isDarkMode}>
            <h3 className={`text-lg font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              🚀 Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                >
                  📊 Add More Data
                </motion.button>
              </Link>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`btn-secondary ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  🏠 Back to Home
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.print()}
                className={`px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                  📄 Export Report
              </motion.button>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Analytics;
