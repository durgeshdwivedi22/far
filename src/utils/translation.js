// Multi-language support for Smart Farmer Assistant

export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      dashboard: "Dashboard",
      analytics: "Analytics",
      recordBook: "Record Book",
      market: "Market Prices",
      profile: "Profile",
      logout: "Logout"
    },
    
    // Common
    common: {
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      view: "View",
      close: "Close",
      search: "Search",
      filter: "Filter",
      export: "Export",
      import: "Import",
      refresh: "Refresh",
      settings: "Settings",
      language: "Language",
      darkMode: "Dark Mode",
      lightMode: "Light Mode"
    },
    
    // Auth
    auth: {
      login: "Login",
      signup: "Sign Up",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      fullName: "Full Name",
      welcome: "Welcome",
      welcomeBack: "Welcome back!",
      createAccount: "Create your account",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?",
      signIn: "Sign In",
      createNewAccount: "Create Account"
    },
    
    // Dashboard
    dashboard: {
      title: "Farmer Dashboard",
      totalInvestment: "Total Investment",
      totalProfit: "Total Profit",
      totalLoss: "Total Loss",
      netProfit: "Net Profit",
      cropsAdded: "Crops Added",
      financialOverview: "Financial Overview",
      expenseHistory: "Expense History",
      addExpense: "Add Expense",
      quickStats: "Quick Stats",
      roi: "ROI",
      totalTransactions: "Total Transactions",
      quickActions: "Quick Actions"
    },
    
    // Analytics
    analytics: {
      title: "Analytics Dashboard",
      detailedInsights: "Detailed insights into your farming finances",
      timeRange: "Time Range",
      last7Days: "7 Days",
      last30Days: "30 Days",
      last90Days: "90 Days",
      allTime: "All Time",
      monthlyTrends: "Monthly Trends",
      categoryDistribution: "Category Distribution",
      areaChart: "Area Chart",
      comparisonChart: "Comparison Chart",
      topExpenses: "Top Expenses",
      keyInsights: "Key Insights",
      profitMargin: "Profit Margin",
      investmentEfficiency: "Investment Efficiency",
      riskAssessment: "Risk Assessment",
      exportReport: "Export Report"
    },
    
    // Home
    home: {
      goodMorning: "Good Morning",
      goodAfternoon: "Good Afternoon",
      goodEvening: "Good Evening",
      farmer: "Farmer",
      welcomeTo: "Welcome to Smart Farmer Assistant",
      cropRecommendation: "Crop Recommendation System",
      selectSoilType: "Select soil type",
      selectSeason: "Select season",
      getRecommendations: "Get Recommendations",
      recommendedCrops: "Recommended Crops",
      weather: "Weather",
      currentWeather: "Current Weather",
      forecast: "Forecast",
      farmingTip: "Farming Tip",
      quickActions: "Quick Actions"
    },
    
    // Crop Recommendations
    crops: {
      soilType: "Soil Type",
      season: "Season",
      clay: "Clay",
      sandy: "Sandy",
      loamy: "Loamy",
      black: "Black",
      red: "Red",
      summer: "Summer",
      winter: "Winter",
      rainy: "Rainy",
      temperature: "Temperature",
      rainfall: "Rainfall",
      expectedYield: "Expected Yield",
      whyRecommended: "Why Recommended",
      suitability: "Suitability"
    },
    
    // Weather
    weather: {
      temperature: "Temperature",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      condition: "Condition",
      sunny: "Sunny",
      partlyCloudy: "Partly Cloudy",
      cloudy: "Cloudy",
      rainy: "Rainy",
      stormy: "Stormy",
      enterCity: "Enter your city",
      getWeather: "Get Weather",
      weatherAlert: "Weather Alert",
      highRainChance: "High chance of rain, avoid irrigation",
      lowHumidity: "Low humidity, increase watering",
      highTemperature: "High temperature, provide shade to crops"
    },
    
    // Record Book
    recordBook: {
      title: "Farm Record Book",
      dailyActivities: "Daily Activities",
      addRecord: "Add Record",
      date: "Date",
      activity: "Activity",
      cropPlanted: "Crop Planted",
      fertilizerUsed: "Fertilizer Used",
      waterUsage: "Water Usage",
      notes: "Notes",
      description: "Description",
      amount: "Amount",
      unit: "Unit",
      records: "Records",
      noRecords: "No records yet",
      addFirstRecord: "Add your first farm record"
    },
    
    // Market Prices
    market: {
      title: "Market Prices",
      currentPrices: "Current Market Prices",
      crop: "Crop",
      price: "Price",
      unit: "per quintal",
      lastUpdated: "Last Updated",
      priceIncrease: "Price increased by",
      priceDecrease: "Price decreased by",
      noChange: "No change",
      wheat: "Wheat",
      rice: "Rice",
      cotton: "Cotton",
      sugarcane: "Sugarcane",
      maize: "Maize",
      pulses: "Pulses"
    },
    
    // Profile
    profile: {
      title: "Farmer Profile",
      personalInfo: "Personal Information",
      farmInfo: "Farm Information",
      name: "Name",
      email: "Email",
      phone: "Phone",
      location: "Location",
      farmSize: "Farm Size",
      farmSizeUnit: "acres",
      experience: "Farming Experience",
      years: "years",
      saveProfile: "Save Profile",
      profileUpdated: "Profile updated successfully!"
    },
    
    // Alerts
    alerts: {
      title: "Smart Alerts",
      noExpenseToday: "You have not added any expense today",
      checkCropHealth: "Time to check crop health",
      weatherAlert: "Weather alert for your area",
      irrigationReminder: "Irrigation reminder",
      fertilizationReminder: "Fertilization reminder",
      marketUpdate: "Market prices updated",
      profitTarget: "You're close to your profit target!",
      lossWarning: "Loss detected in recent transactions"
    },
    
    // Profit Prediction
    profitPrediction: {
      title: "Profit Prediction",
      estimatedProfit: "Estimated Profit",
      nextMonth: "Next Month",
      nextQuarter: "Next Quarter",
      nextYear: "Next Year",
      basedOn: "Based on",
      pastData: "past data",
      currentTrends: "current trends",
      prediction: "Prediction",
      confidence: "Confidence Level"
    },
    
    // Expense Types
    expenses: {
      investment: "Investment",
      profit: "Profit",
      loss: "Loss",
      allTypes: "All Types"
    },
    
    // Success/Error Messages
    messages: {
      loginSuccess: "Login successful!",
      logoutSuccess: "Logged out successfully!",
      profileUpdated: "Profile updated successfully!",
      recordAdded: "Record added successfully!",
      recordDeleted: "Record deleted successfully!",
      expenseAdded: "Expense added successfully!",
      expenseDeleted: "Expense deleted successfully!",
      dataExported: "Data exported successfully!",
      fillAllFields: "Please fill all fields",
      invalidEmail: "Invalid email address",
      passwordMismatch: "Passwords do not match",
      networkError: "Network error. Please try again.",
      dataLoaded: "Sample data loaded successfully!"
    }
  },
  
  hi: {
    // Navigation
    nav: {
      home: "होम",
      dashboard: "डैशबोर्ड",
      analytics: "विश्लेषण",
      recordBook: "रिकॉर्ड बुक",
      market: "बाज़ार भाव",
      profile: "प्रोफ़ाइल",
      logout: "लॉगआउट"
    },
    
    // Common
    common: {
      loading: "लोड हो रहा है...",
      save: "सेव करें",
      cancel: "रद्द करें",
      delete: "हटाएं",
      edit: "एडिट करें",
      add: "जोड़ें",
      view: "देखें",
      close: "बंद करें",
      search: "खोजें",
      filter: "फिल्टर",
      export: "एक्सपोर्ट",
      import: "इम्पोर्ट",
      refresh: "रिफ्रेश",
      settings: "सेटिंग्स",
      language: "भाषा",
      darkMode: "डार्क मोड",
      lightMode: "लाइट मोड"
    },
    
    // Auth
    auth: {
      login: "लॉगिन",
      signup: "साइन अप",
      email: "ईमेल",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      fullName: "पूरा नाम",
      welcome: "स्वागत है",
      welcomeBack: "वापसी पर स्वागत है!",
      createAccount: "अपना खाता बनाएं",
      alreadyHaveAccount: "पहले से ही खाता है?",
      dontHaveAccount: "खाता नहीं है?",
      signIn: "साइन इन",
      createNewAccount: "खाता बनाएं"
    },
    
    // Dashboard
    dashboard: {
      title: "किसान डैशबोर्ड",
      totalInvestment: "कुल निवेश",
      totalProfit: "कुल लाभ",
      totalLoss: "कुल हानि",
      netProfit: "शुद्ध लाभ",
      cropsAdded: "जोड़ी गई फसलें",
      financialOverview: "वित्तीय अवलोकन",
      expenseHistory: "खर्च इतिहास",
      addExpense: "खर्च जोड़ें",
      quickStats: "त्वरित आँकड़े",
      roi: "आरओआई",
      totalTransactions: "कुल लेनदेन",
      quickActions: "त्वरित कार्य"
    },
    
    // Analytics
    analytics: {
      title: "विश्लेषण डैशबोर्ड",
      detailedInsights: "आपकी कृषि वित्त में विस्तृत अंतर्दृष्टि",
      timeRange: "समय सीमा",
      last7Days: "7 दिन",
      last30Days: "30 दिन",
      last90Days: "90 दिन",
      allTime: "सभी समय",
      monthlyTrends: "मासिक रुझान",
      categoryDistribution: "श्रेणी वितरण",
      areaChart: "क्षेत्र चार्ट",
      comparisonChart: "तुलना चार्ट",
      topExpenses: "शीर्ष खर्च",
      keyInsights: "मुख्य अंतर्दृष्टि",
      profitMargin: "लाभ मार्जिन",
      investmentEfficiency: "निवेश दक्षता",
      riskAssessment: "जोखिम मूल्यांकन",
      exportReport: "रिपोर्ट निर्यात करें"
    },
    
    // Home
    home: {
      goodMorning: "सुप्रभात",
      goodAfternoon: "शुभ दोपहर",
      goodEvening: "शुभ संध्या",
      farmer: "किसान",
      welcomeTo: "स्मार्ट किसान सहायक में आपका स्वागत है",
      cropRecommendation: "फसल अनुशंसा प्रणाली",
      selectSoilType: "मिट्टी का प्रकार चुनें",
      selectSeason: "मौसम चुनें",
      getRecommendations: "अनुशंसा प्राप्त करें",
      recommendedCrops: "अनुशंसित फसलें",
      weather: "मौसम",
      currentWeather: "वर्तमान मौसम",
      forecast: "पूर्वानुमान",
      farmingTip: "कृषि टिप",
      quickActions: "त्वरित कार्य"
    },
    
    // Crop Recommendations
    crops: {
      soilType: "मिट्टी का प्रकार",
      season: "मौसम",
      clay: "चिकनी मिट्टी",
      sandy: "रेतीली मिट्टी",
      loamy: "दोमट मिट्टी",
      black: "काली मिट्टी",
      red: "लाल मिट्टी",
      summer: "गर्मी",
      winter: "सर्दी",
      rainy: "बरसात",
      temperature: "तापमान",
      rainfall: "वर्षा",
      expectedYield: "अपेक्षित उपज",
      whyRecommended: "अनुशंसित क्यों",
      suitability: "उपयुक्तता"
    },
    
    // Weather
    weather: {
      temperature: "तापमान",
      humidity: "नमी",
      windSpeed: "हवा की गति",
      condition: "स्थिति",
      sunny: "धूप",
      partlyCloudy: "आंशिक बादल",
      cloudy: "बादल",
      rainy: "बारिश",
      stormy: "तूफ़ान",
      enterCity: "अपना शहर दर्ज करें",
      getWeather: "मौसम प्राप्त करें",
      weatherAlert: "मौसम चेतावनी",
      highRainChance: "बारिश की अधिक संभावना, सिंचाई से बचें",
      lowHumidity: "कम नमी, पानी बढ़ाएं",
      highTemperature: "उच्च तापमान, फसलों को छाया प्रदान करें"
    },
    
    // Record Book
    recordBook: {
      title: "खेत रिकॉर्ड बुक",
      dailyActivities: "दैनिक गतिविधियां",
      addRecord: "रिकॉर्ड जोड़ें",
      date: "तारीख",
      activity: "गतिविधि",
      cropPlanted: "बोई गई फसल",
      fertilizerUsed: "उपयुक्त खाद",
      waterUsage: "जल उपयोग",
      notes: "टिप्पणियां",
      description: "विवरण",
      amount: "मात्रा",
      unit: "इकाई",
      records: "रिकॉर्ड",
      noRecords: "अभी तक कोई रिकॉर्ड नहीं",
      addFirstRecord: "अपना पहला खेत रिकॉर्ड जोड़ें"
    },
    
    // Market Prices
    market: {
      title: "बाज़ार भाव",
      currentPrices: "वर्तमान बाज़ार भाव",
      crop: "फसल",
      price: "कीमत",
      unit: "प्रति क्विंटल",
      lastUpdated: "अंतिम अपडेट",
      priceIncrease: "कीमत बढ़ी",
      priceDecrease: "कीमत घटी",
      noChange: "कोई परिवर्तन नहीं",
      wheat: "गेहूं",
      rice: "चावल",
      cotton: "कपास",
      sugarcane: "गन्ना",
      maize: "मक्का",
      pulses: "दालें"
    },
    
    // Profile
    profile: {
      title: "किसान प्रोफ़ाइल",
      personalInfo: "व्यक्तिगत जानकारी",
      farmInfo: "खेत की जानकारी",
      name: "नाम",
      email: "ईमेल",
      phone: "फोन",
      location: "स्थान",
      farmSize: "खेत का आकार",
      farmSizeUnit: "एकड़",
      experience: "कृषि अनुभव",
      years: "साल",
      saveProfile: "प्रोफ़ाइल सेव करें",
      profileUpdated: "प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई!"
    },
    
    // Alerts
    alerts: {
      title: "स्मार्ट अलर्ट",
      noExpenseToday: "आज आपने कोई खर्च नहीं जोड़ा है",
      checkCropHealth: "फसल स्वास्थ्य जांचने का समय",
      weatherAlert: "आपके क्षेत्र के लिए मौसम चेतावनी",
      irrigationReminder: "सिंचाई अनुस्मारक",
      fertilizationReminder: "उर्वरक अनुस्मारक",
      marketUpdate: "बाज़ार भाव अपडेट हुए",
      profitTarget: "आप अपने लाभ लक्ष्य के करीब हैं!",
      lossWarning: "हालिया लेनदेन में हानि का पता चला"
    },
    
    // Profit Prediction
    profitPrediction: {
      title: "लाभ पूर्वानुमान",
      estimatedProfit: "अनुमानित लाभ",
      nextMonth: "अगले महीने",
      nextQuarter: "अगली तिमाही",
      nextYear: "अगले साल",
      basedOn: "आधारित",
      pastData: "अतीत डेटा",
      currentTrends: "वर्तमान रुझान",
      prediction: "पूर्वानुमान",
      confidence: "विश्वास स्तर"
    },
    
    // Expense Types
    expenses: {
      investment: "निवेश",
      profit: "लाभ",
      loss: "हानि",
      allTypes: "सभी प्रकार"
    },
    
    // Success/Error Messages
    messages: {
      loginSuccess: "लॉगिन सफल!",
      logoutSuccess: "सफलतापूर्वक लॉगआउट!",
      profileUpdated: "प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई!",
      recordAdded: "रिकॉर्ड सफलतापूर्वक जोड़ा गया!",
      recordDeleted: "रिकॉर्ड सफलतापूर्वक हटाया गया!",
      expenseAdded: "खर्च सफलतापूर्वक जोड़ा गया!",
      expenseDeleted: "खर्च सफलतापूर्वक हटाया गया!",
      dataExported: "डेटा सफलतापूर्वक निर्यात हुआ!",
      fillAllFields: "कृपया सभी फ़ील्ड भरें",
      invalidEmail: "अमान्य ईमेल पता",
      passwordMismatch: "पासवर्ड मेल नहीं खा रहे",
      networkError: "नेटवर्क त्रुटि। कृपया फिर से कोशिश करें।",
      dataLoaded: "सैंपल डेटा सफलतापूर्वक लोड हुआ!"
    }
  }
};

// Language context hook
export const useTranslation = (language = 'en') => {
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
  
  return { t, language };
};

// Supported languages
export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' }
];
