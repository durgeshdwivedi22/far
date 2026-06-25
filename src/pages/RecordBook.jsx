import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaSeedling, FaFlask, FaTint } from 'react-icons/fa';
import { format } from 'date-fns';
import { useTranslation } from '../utils/translation';
import { storage, generateId } from '../utils/storage';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';
import toast from 'react-hot-toast';

const RecordBook = () => {
  const { isDarkMode, settings } = useTheme();
  const [records, setRecords] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [language, setLanguage] = useState('en');
  const { t } = useTranslation(language);

  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    activity: 'crop_planted',
    cropName: '',
    description: '',
    amount: '',
    unit: 'kg',
    notes: ''
  });

  const activities = [
    { value: 'crop_planted', label: t('recordBook.cropPlanted'), icon: FaSeedling, color: 'green' },
    { value: 'fertilizer_used', label: t('recordBook.fertilizerUsed'), icon: FaFlask, color: 'blue' },
    { value: 'water_usage', label: t('recordBook.waterUsage'), icon: FaTint, color: 'cyan' }
  ];

  const units = {
    crop_planted: ['kg', 'seeds', 'acres'],
    fertilizer_used: ['kg', 'liters', 'bags'],
    water_usage: ['liters', 'gallons', 'cubic meters']
  };

  useEffect(() => {
    // Load language from settings
    setLanguage(settings.language || 'en');

    // Load records
    loadRecords();
  }, [settings.language]);

  const loadRecords = () => {
    const savedRecords = JSON.parse(localStorage.getItem('farmer_records') || '[]');
    setRecords(savedRecords.sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount) {
      toast.error(t('messages.fillAllFields'));
      return;
    }

    const recordData = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: editingRecord ? editingRecord.id : generateId(),
      createdAt: editingRecord ? editingRecord.createdAt : new Date().toISOString()
    };

    let updatedRecords;
    if (editingRecord) {
      updatedRecords = records.map(record => 
        record.id === editingRecord.id ? recordData : record
      );
      toast.success(t('messages.recordAdded'));
    } else {
      updatedRecords = [...records, recordData];
      toast.success(t('messages.recordAdded'));
    }

    localStorage.setItem('farmer_records', JSON.stringify(updatedRecords));
    setRecords(updatedRecords.sort((a, b) => new Date(b.date) - new Date(a.date)));
    
    // Reset form
    setFormData({
      date: format(new Date(), 'yyyy-MM-dd'),
      activity: 'crop_planted',
      cropName: '',
      description: '',
      amount: '',
      unit: 'kg',
      notes: ''
    });
    setShowAddForm(false);
    setEditingRecord(null);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      date: record.date,
      activity: record.activity,
      cropName: record.cropName || '',
      description: record.description,
      amount: record.amount.toString(),
      unit: record.unit,
      notes: record.notes || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = (recordId) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const updatedRecords = records.filter(record => record.id !== recordId);
      localStorage.setItem('farmer_records', JSON.stringify(updatedRecords));
      setRecords(updatedRecords);
      toast.success(t('messages.recordDeleted'));
    }
  };

  const getActivityInfo = (activityValue) => {
    return activities.find(a => a.value === activityValue) || activities[0];
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
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            📖 {t('recordBook.title')}
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('recordBook.dailyActivities')}
          </p>
        </motion.div>

        {/* Add Record Button */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary"
          >
            <FaPlus className="inline mr-2" />
            {t('recordBook.addRecord')}
          </motion.button>
        </motion.div>

        {/* Add/Edit Record Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <Card isDarkMode={isDarkMode}>
                <h3 className={`text-xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {editingRecord ? 'Edit Record' : t('recordBook.addRecord')}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <FaCalendarAlt className="inline mr-2" />
                        {t('recordBook.date')}
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className={`w-full p-3 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        required
                      />
                    </div>

                    {/* Activity Type */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {t('recordBook.activity')}
                      </label>
                      <select
                        value={formData.activity}
                        onChange={(e) => setFormData({...formData, activity: e.target.value, unit: units[e.target.value][0]})}
                        className={`w-full p-3 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      >
                        {activities.map(activity => (
                          <option key={activity.value} value={activity.value}>
                            {activity.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Crop Name (for crop planting) */}
                    {formData.activity === 'crop_planted' && (
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {t('crops.expectedYield')}
                        </label>
                        <input
                          type="text"
                          value={formData.cropName}
                          onChange={(e) => setFormData({...formData, cropName: e.target.value})}
                          placeholder="e.g., Wheat, Rice, Cotton"
                          className={`w-full p-3 rounded-lg border ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        />
                      </div>
                    )}

                    {/* Description */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {t('recordBook.description')}
                      </label>
                      <input
                        type="text"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Enter description"
                        className={`w-full p-3 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        required
                      />
                    </div>

                    {/* Amount */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {t('recordBook.amount')}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        placeholder="Enter amount"
                        className={`w-full p-3 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        required
                      />
                    </div>

                    {/* Unit */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {t('recordBook.unit')}
                      </label>
                      <select
                        value={formData.unit}
                        onChange={(e) => setFormData({...formData, unit: e.target.value})}
                        className={`w-full p-3 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      >
                        {units[formData.activity].map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {t('recordBook.notes')}
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Additional notes (optional)"
                      rows={3}
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
                      {editingRecord ? 'Update Record' : t('recordBook.addRecord')}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingRecord(null);
                        setFormData({
                          date: format(new Date(), 'yyyy-MM-dd'),
                          activity: 'crop_planted',
                          cropName: '',
                          description: '',
                          amount: '',
                          unit: 'kg',
                          notes: ''
                        });
                      }}
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
        </AnimatePresence>

        {/* Records List */}
        <motion.div variants={itemVariants}>
          <Card isDarkMode={isDarkMode}>
            <h3 className={`text-xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {t('recordBook.records')}
            </h3>

            {records.length === 0 ? (
              <div className={`text-center py-12 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <FaSeedling className="text-6xl mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">{t('recordBook.noRecords')}</p>
                <p className="text-sm">{t('recordBook.addFirstRecord')}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <th className={`text-left py-3 px-4 font-semibold ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {t('recordBook.date')}
                      </th>
                      <th className={`text-left py-3 px-4 font-semibold ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {t('recordBook.activity')}
                      </th>
                      <th className={`text-left py-3 px-4 font-semibold ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {t('recordBook.description')}
                      </th>
                      <th className={`text-left py-3 px-4 font-semibold ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {t('recordBook.amount')}
                      </th>
                      <th className={`text-left py-3 px-4 font-semibold ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {t('recordBook.notes')}
                      </th>
                      <th className={`text-left py-3 px-4 font-semibold ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {t('common.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, index) => {
                      const activityInfo = getActivityInfo(record.activity);
                      const Icon = activityInfo.icon;
                      
                      return (
                        <motion.tr
                          key={record.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`border-b ${
                            isDarkMode ? 'border-gray-700' : 'border-gray-100'
                          }`}
                        >
                          <td className={`py-3 px-4 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {format(new Date(record.date), 'MMM dd, yyyy')}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <div className={`p-2 rounded-lg bg-${activityInfo.color}-100 text-${activityInfo.color}-600`}>
                                <Icon className="text-sm" />
                              </div>
                              <span className={`font-medium ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {activityInfo.label}
                              </span>
                            </div>
                          </td>
                          <td className={`py-3 px-4 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {record.description}
                            {record.cropName && (
                              <span className={`block text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                ({record.cropName})
                              </span>
                            )}
                          </td>
                          <td className={`py-3 px-4 font-medium ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {record.amount} {record.unit}
                          </td>
                          <td className={`py-3 px-4 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {record.notes ? (
                              <span className="text-sm">{record.notes}</span>
                            ) : (
                              <span className={`text-sm italic ${
                                isDarkMode ? 'text-gray-500' : 'text-gray-400'
                              }`}>
                                No notes
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEdit(record)}
                                className={`p-2 rounded ${
                                  isDarkMode 
                                    ? 'text-blue-400 hover:bg-gray-700'
                                    : 'text-blue-600 hover:bg-blue-50'
                                }`}
                              >
                                <FaEdit className="text-sm" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDelete(record.id)}
                                className={`p-2 rounded ${
                                  isDarkMode 
                                    ? 'text-red-400 hover:bg-gray-700'
                                    : 'text-red-600 hover:bg-red-50'
                                }`}
                              >
                                <FaTrash className="text-sm" />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RecordBook;
