// Local Storage Management for Farmer Data

const STORAGE_KEYS = {
  USER: 'currentUser',
  EXPENSES: 'farmer_expenses',
  CROPS: 'farmer_crops',
  SETTINGS: 'farmer_settings'
};

// Generates a stable unique ID for records.
// Uses crypto.randomUUID when available, otherwise falls back to a timestamp + random suffix.
export const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

// User Management
export const storage = {
  // User operations
  saveUser: (user) => {
    try {
      const userWithId = { ...user, id: user.id || generateId() };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userWithId));
      localStorage.setItem('farmer_session', JSON.stringify({
        userId: userWithId.id,
        loginTime: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      }));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('authChange', { detail: { user: userWithId } }));
      }
      return true;
    } catch (error) {
      console.error('Error saving user:', error);
      return false;
    }
  },

  getUser: () => {
    try {
      if (!storage.isSessionValid()) {
        return null;
      }

      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || 'null');
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  removeUser: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem('farmer_session');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('authChange', { detail: { user: null } }));
      }
      return true;
    } catch (error) {
      console.error('Error removing user:', error);
      return false;
    }
  },

  isSessionValid: () => {
    try {
      const session = JSON.parse(localStorage.getItem('farmer_session') || '{}');
      const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || 'null');
      
      if (!user || !session.userId) {
        return false;
      }

      if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
        storage.removeUser();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking session:', error);
      return false;
    }
  },

  // Expense operations
  saveExpenses: (expenses) => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
      return true;
    } catch (error) {
      console.error('Error saving expenses:', error);
      return false;
    }
  },

  getExpenses: () => {
    try {
      const expenses = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      return expenses ? JSON.parse(expenses) : [];
    } catch (error) {
      console.error('Error getting expenses:', error);
      return [];
    }
  },

  addExpense: (expense) => {
    try {
      const expenses = storage.getExpenses();
      const newExpense = {
        ...expense,
        id: generateId(),
        date: new Date().toISOString()
      };
      expenses.push(newExpense);
      storage.saveExpenses(expenses);
      return newExpense;
    } catch (error) {
      console.error('Error adding expense:', error);
      return null;
    }
  },

  updateExpense: (id, updatedExpense) => {
    try {
      const expenses = storage.getExpenses();
      const index = expenses.findIndex(exp => exp.id === id);
      if (index !== -1) {
        expenses[index] = { ...expenses[index], ...updatedExpense };
        storage.saveExpenses(expenses);
        return expenses[index];
      }
      return null;
    } catch (error) {
      console.error('Error updating expense:', error);
      return null;
    }
  },

  deleteExpense: (id) => {
    try {
      const expenses = storage.getExpenses();
      const filteredExpenses = expenses.filter(exp => exp.id !== id);
      storage.saveExpenses(filteredExpenses);
      return true;
    } catch (error) {
      console.error('Error deleting expense:', error);
      return false;
    }
  },

  // Crops operations
  saveCrops: (crops) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CROPS, JSON.stringify(crops));
      return true;
    } catch (error) {
      console.error('Error saving crops:', error);
      return false;
    }
  },

  getCrops: () => {
    try {
      const crops = localStorage.getItem(STORAGE_KEYS.CROPS);
      return crops ? JSON.parse(crops) : [];
    } catch (error) {
      console.error('Error getting crops:', error);
      return [];
    }
  },

  addCrop: (crop) => {
    try {
      const crops = storage.getCrops();
      const newCrop = {
        ...crop,
        id: generateId(),
        date: new Date().toISOString()
      };
      crops.push(newCrop);
      storage.saveCrops(crops);
      return newCrop;
    } catch (error) {
      console.error('Error adding crop:', error);
      return null;
    }
  },

  // Settings operations
  saveSettings: (settings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  },

  getSettings: () => {
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      const defaultSettings = {
        darkMode: false,
        language: 'en',
        notifications: {
          weatherAlerts: true,
          marketUpdates: true,
          cropReminders: false,
          expenseAlerts: true
        },
        privacy: {
          profileVisibility: 'public',
          dataSharing: false,
          analytics: true
        },
        preferences: {
          currency: 'INR',
          units: 'metric',
          dateFormat: 'DD/MM/YYYY',
          timeFormat: '12h'
        }
      };
      return settings ? { ...defaultSettings, ...JSON.parse(settings) } : defaultSettings;
    } catch (error) {
      console.error('Error getting settings:', error);
      return {
        darkMode: false,
        language: 'en',
        notifications: {
          weatherAlerts: true,
          marketUpdates: true,
          cropReminders: false,
          expenseAlerts: true
        },
        privacy: {
          profileVisibility: 'public',
          dataSharing: false,
          analytics: true
        },
        preferences: {
          currency: 'INR',
          units: 'metric',
          dateFormat: 'DD/MM/YYYY',
          timeFormat: '12h'
        }
      };
    }
  },

  // Analytics helpers
  getFinancialSummary: () => {
    try {
      const expenses = storage.getExpenses();
      const summary = {
        totalInvestment: 0,
        totalProfit: 0,
        totalLoss: 0,
        netProfit: 0,
        totalCrops: storage.getCrops().length
      };

      expenses.forEach(expense => {
        if (expense.type === 'investment') {
          summary.totalInvestment += parseFloat(expense.amount);
        } else if (expense.type === 'profit') {
          summary.totalProfit += parseFloat(expense.amount);
        } else if (expense.type === 'loss') {
          summary.totalLoss += parseFloat(expense.amount);
        }
      });

      summary.netProfit = summary.totalProfit - summary.totalInvestment - summary.totalLoss;

      return summary;
    } catch (error) {
      console.error('Error calculating summary:', error);
      return {
        totalInvestment: 0,
        totalProfit: 0,
        totalLoss: 0,
        netProfit: 0,
        totalCrops: 0
      };
    }
  },

  // Export data to CSV
  exportToCSV: (dataType = 'expenses') => {
    try {
      let data = [];
      let filename = '';
      let headers = [];

      switch (dataType) {
        case 'expenses':
          data = storage.getExpenses();
          filename = 'expenses.csv';
          headers = ['Date', 'Type', 'Amount', 'Description'];
          break;
        case 'crops':
          data = storage.getCrops();
          filename = 'crops.csv';
          headers = ['Date', 'Name', 'Area', 'Season', 'Soil Type'];
          break;
        case 'records':
          data = JSON.parse(localStorage.getItem('farmer_records') || '[]');
          filename = 'farm_records.csv';
          headers = ['Date', 'Activity', 'Crop', 'Description', 'Amount', 'Unit', 'Notes'];
          break;
        case 'all':
          // Create a comprehensive report
          const expenses = storage.getExpenses();
          const crops = storage.getCrops();
          const records = JSON.parse(localStorage.getItem('farmer_records') || '[]');
          const summary = storage.getFinancialSummary();
          
          filename = 'farm_complete_report.csv';
          
          // Create summary section
          data = [
            ['FARM SUMMARY REPORT'],
            ['Generated on', new Date().toLocaleDateString()],
            [''],
            ['FINANCIAL SUMMARY'],
            ['Total Investment', summary.totalInvestment],
            ['Total Profit', summary.totalProfit],
            ['Total Loss', summary.totalLoss],
            ['Net Profit', summary.netProfit],
            ['Total Crops', summary.totalCrops],
            [''],
            ['EXPENSES'],
            ['Date', 'Type', 'Amount', 'Description'],
            ...expenses.map(exp => [
              new Date(exp.date).toLocaleDateString(),
              exp.type,
              exp.amount,
              exp.description
            ]),
            [''],
            ['CROPS'],
            ['Date', 'Name', 'Area', 'Season', 'Soil Type'],
            ...crops.map(crop => [
              new Date(crop.date).toLocaleDateString(),
              crop.name,
              crop.area,
              crop.season,
              crop.soilType
            ]),
            [''],
            ['FARM RECORDS'],
            ['Date', 'Activity', 'Crop', 'Description', 'Amount', 'Unit', 'Notes'],
            ...records.map(record => [
              new Date(record.date).toLocaleDateString(),
              record.activity,
              record.cropName || '',
              record.description,
              record.amount,
              record.unit,
              record.notes || ''
            ])
          ];
          break;
        default:
          throw new Error('Invalid data type for export');
      }

      if (dataType !== 'all') {
        // Convert data to CSV format
        const csvContent = [
          headers.join(','),
          ...data.map(item => {
            if (dataType === 'expenses') {
              return [
                new Date(item.date).toLocaleDateString(),
                item.type,
                item.amount,
                `"${item.description}"`
              ].join(',');
            } else if (dataType === 'crops') {
              return [
                new Date(item.date).toLocaleDateString(),
                item.name,
                item.area,
                item.season,
                item.soilType
              ].join(',');
            } else if (dataType === 'records') {
              return [
                new Date(item.date).toLocaleDateString(),
                item.activity,
                item.cropName || '',
                `"${item.description}"`,
                item.amount,
                item.unit,
                `"${item.notes || ''}"`
              ].join(',');
            }
          })
        ].join('\n');
        
        // Create and download CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        return true;
      } else {
        // Handle the 'all' case separately
        const csvContent = data.map(row => 
          row.map(cell => typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell).join(',')
        ).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        return true;
      }
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      return false;
    }
  },

  // Import data from CSV (basic implementation)
  importFromCSV: (file, dataType = 'expenses') => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const text = e.target.result;
          const lines = text.split('\n');
          const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
          
          const data = [];
          for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
              const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
              const item = {};
              
              headers.forEach((header, index) => {
                item[header.toLowerCase().replace(/\s+/g, '_')] = values[index];
              });
              
              data.push(item);
            }
          }
          
          // Save imported data
          if (dataType === 'expenses') {
            const expenses = data.map(item => ({
              type: item.type || 'investment',
              amount: parseFloat(item.amount) || 0,
              description: item.description || '',
              date: new Date(item.date).toISOString() || new Date().toISOString(),
              id: Date.now().toString() + Math.random()
            }));
            
            expenses.forEach(expense => storage.addExpense(expense));
          }
          
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }
};
