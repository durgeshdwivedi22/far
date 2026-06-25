// Enhanced Crop Recommendation System Logic
export const cropRecommendations = {
  // [soilType][season][temperature][rainfall] = [crops]
  clay: {
    summer: {
      normal: { normal: ['Rice', 'Sugarcane', 'Wheat', 'Cotton'] },
      high: { normal: ['Rice', 'Jute', 'Sugarcane'], high: ['Rice', 'Jute'] },
      low: { normal: ['Wheat', 'Cotton'], high: ['Wheat'] }
    },
    winter: {
      normal: { normal: ['Wheat', 'Mustard', 'Peas', 'Gram'] },
      high: { normal: ['Mustard', 'Peas'], high: ['Mustard'] },
      low: { normal: ['Wheat', 'Gram'], high: ['Wheat'] }
    },
    rainy: {
      normal: { normal: ['Rice', 'Jute', 'Sugarcane', 'Cotton'] },
      high: { normal: ['Rice', 'Jute'], high: ['Rice'] },
      low: { normal: ['Sugarcane', 'Cotton'], high: ['Sugarcane'] }
    }
  },
  sandy: {
    summer: {
      normal: { normal: ['Groundnut', 'Millet', 'Watermelon', 'Cucumber'] },
      high: { normal: ['Watermelon', 'Cucumber'], high: ['Watermelon'] },
      low: { normal: ['Groundnut', 'Millet'], high: ['Groundnut'] }
    },
    winter: {
      normal: { normal: ['Mustard', 'Gram', 'Peas', 'Barley'] },
      high: { normal: ['Peas', 'Barley'], high: ['Peas'] },
      low: { normal: ['Mustard', 'Gram'], high: ['Mustard'] }
    },
    rainy: {
      normal: { normal: ['Groundnut', 'Millet', 'Sorghum', 'Cowpea'] },
      high: { normal: ['Groundnut', 'Cowpea'], high: ['Groundnut'] },
      low: { normal: ['Millet', 'Sorghum'], high: ['Millet'] }
    }
  },
  loamy: {
    summer: {
      normal: { normal: ['Maize', 'Soybean', 'Cotton', 'Sugarcane'] },
      high: { normal: ['Maize', 'Soybean'], high: ['Maize'] },
      low: { normal: ['Cotton', 'Sugarcane'], high: ['Cotton'] }
    },
    winter: {
      normal: { normal: ['Wheat', 'Mustard', 'Gram', 'Peas'] },
      high: { normal: ['Wheat', 'Peas'], high: ['Wheat'] },
      low: { normal: ['Mustard', 'Gram'], high: ['Mustard'] }
    },
    rainy: {
      normal: { normal: ['Rice', 'Maize', 'Soybean', 'Cotton'] },
      high: { normal: ['Rice', 'Maize'], high: ['Rice'] },
      low: { normal: ['Soybean', 'Cotton'], high: ['Soybean'] }
    }
  },
  black: {
    summer: {
      normal: { normal: ['Cotton', 'Sugarcane', 'Wheat', 'Maize'] },
      high: { normal: ['Cotton', 'Sugarcane'], high: ['Cotton'] },
      low: { normal: ['Wheat', 'Maize'], high: ['Wheat'] }
    },
    winter: {
      normal: { normal: ['Wheat', 'Gram', 'Mustard', 'Peas'] },
      high: { normal: ['Wheat', 'Mustard'], high: ['Wheat'] },
      low: { normal: ['Gram', 'Peas'], high: ['Gram'] }
    },
    rainy: {
      normal: { normal: ['Cotton', 'Sugarcane', 'Rice', 'Maize'] },
      high: { normal: ['Cotton', 'Sugarcane'], high: ['Cotton'] },
      low: { normal: ['Rice', 'Maize'], high: ['Rice'] }
    }
  },
  red: {
    summer: {
      normal: { normal: ['Groundnut', 'Millet', 'Sorghum', 'Cotton'] },
      high: { normal: ['Groundnut', 'Millet'], high: ['Groundnut'] },
      low: { normal: ['Sorghum', 'Cotton'], high: ['Sorghum'] }
    },
    winter: {
      normal: { normal: ['Wheat', 'Gram', 'Mustard', 'Barley'] },
      high: { normal: ['Wheat', 'Mustard'], high: ['Wheat'] },
      low: { normal: ['Gram', 'Barley'], high: ['Gram'] }
    },
    rainy: {
      normal: { normal: ['Groundnut', 'Millet', 'Sorghum', 'Cowpea'] },
      high: { normal: ['Groundnut', 'Millet'], high: ['Groundnut'] },
      low: { normal: ['Sorghum', 'Cowpea'], high: ['Sorghum'] }
    }
  }
};

// Expected yield data (quintals per acre)
export const expectedYields = {
  'Rice': { min: 25, max: 35, average: 30 },
  'Wheat': { min: 20, max: 30, average: 25 },
  'Cotton': { min: 8, max: 15, average: 12 },
  'Sugarcane': { min: 60, max: 80, average: 70 },
  'Maize': { min: 15, max: 25, average: 20 },
  'Groundnut': { min: 8, max: 15, average: 12 },
  'Millet': { min: 5, max: 10, average: 8 },
  'Sorghum': { min: 6, max: 12, average: 9 },
  'Soybean': { min: 10, max: 20, average: 15 },
  'Mustard': { min: 8, max: 15, average: 12 },
  'Gram': { min: 5, max: 10, average: 8 },
  'Peas': { min: 6, max: 12, average: 9 },
  'Barley': { min: 12, max: 20, average: 16 },
  'Jute': { min: 15, max: 25, average: 20 },
  'Cowpea': { min: 4, max: 8, average: 6 },
  'Watermelon': { min: 20, max: 40, average: 30 },
  'Cucumber': { min: 15, max: 30, average: 22 },
  'Pulses': { min: 6, max: 12, average: 9 }
};

export const getCropRecommendations = (soilType, season, temperature = 'normal', rainfall = 'normal') => {
  if (!soilType || !season) return [];
  
  const crops = cropRecommendations[soilType.toLowerCase()]?.[season.toLowerCase()]?.[temperature.toLowerCase()]?.[rainfall.toLowerCase()] || [];
  
  return crops.map(crop => ({
    name: crop,
    reason: getCropReason(crop, soilType, season, temperature, rainfall),
    suitability: getSuitabilityScore(crop, soilType, season, temperature, rainfall),
    expectedYield: expectedYields[crop] || { min: 0, max: 0, average: 0 },
    growingSeason: getGrowingSeason(crop),
    waterRequirement: getWaterRequirement(crop),
    fertilizer: getFertilizerNeeds(crop)
  })).sort((a, b) => b.suitability - a.suitability);
};

function getCropReason(crop, soilType, season, temperature, rainfall) {
  const baseReasons = {
    'Rice': 'Thrives in waterlogged conditions and clay soils',
    'Wheat': 'Well-suited for loamy and black soils in winter',
    'Cotton': 'Perfect for black and red soils with good drainage',
    'Sugarcane': 'Requires deep, well-drained soils and plenty of water',
    'Groundnut': 'Ideal for sandy soils with good drainage',
    'Maize': 'Grows best in loamy soils with good fertility',
    'Soybean': 'Excellent for loamy soils with moderate rainfall',
    'Mustard': 'Perfect winter crop for most soil types',
    'Gram': 'Great for nitrogen fixation in soil',
    'Millet': 'Drought-resistant and perfect for sandy soils',
    'Sorghum': 'Hardy crop suitable for dry conditions',
    'Jute': 'Requires high humidity and rainfall',
    'Peas': 'Cool season crop for winter cultivation',
    'Barley': 'Drought-tolerant winter crop',
    'Cowpea': 'Heat-tolerant and soil-improving crop',
    'Watermelon': 'Perfect for sandy soils in summer',
    'Cucumber': 'Thrives in warm, well-drained soils',
    'Pulses': 'Good for soil health and multiple harvests'
  };
  
  let reason = baseReasons[crop] || 'Suitable for the given conditions';
  
  // Add temperature and rainfall specific reasons
  if (temperature === 'high') {
    if (['Rice', 'Sugarcane', 'Maize'].includes(crop)) {
      reason += '. High temperatures favor growth and yield.';
    } else if (['Wheat', 'Gram', 'Peas'].includes(crop)) {
      reason += '. May require additional irrigation in high temperatures.';
    }
  } else if (temperature === 'low') {
    if (['Wheat', 'Gram', 'Peas', 'Barley'].includes(crop)) {
      reason += '. Cool temperatures are ideal for this crop.';
    } else if (['Rice', 'Cotton'].includes(crop)) {
      reason += '. Low temperatures may slow growth - consider protective measures.';
    }
  }
  
  if (rainfall === 'high') {
    if (['Rice', 'Jute', 'Sugarcane'].includes(crop)) {
      reason += '. High rainfall supports excellent growth.';
    } else if (['Groundnut', 'Millet'].includes(crop)) {
      reason += '. Ensure proper drainage to prevent waterlogging.';
    }
  } else if (rainfall === 'low') {
    if (['Groundnut', 'Millet', 'Sorghum'].includes(crop)) {
      reason += '. Drought-tolerant - perfect for low rainfall areas.';
    } else if (['Rice', 'Sugarcane'].includes(crop)) {
      reason += '. Requires additional irrigation in low rainfall conditions.';
    }
  }
  
  return reason;
}

function getSuitabilityScore(crop, soilType, season, temperature, rainfall) {
  // Enhanced scoring system (1-10)
  const baseScores = {
    'Rice': { clay: 9, loamy: 7, black: 8 },
    'Wheat': { loamy: 9, black: 8, clay: 7 },
    'Cotton': { black: 9, red: 8, loamy: 7 },
    'Sugarcane': { clay: 8, loamy: 9, black: 8 },
    'Groundnut': { sandy: 9, red: 8, loamy: 6 },
    'Maize': { loamy: 9, sandy: 6, black: 7 },
    'Soybean': { loamy: 9, sandy: 7, clay: 6 },
    'Mustard': { loamy: 8, clay: 7, black: 7 },
    'Gram': { loamy: 8, black: 7, sandy: 6 },
    'Millet': { sandy: 9, red: 8, loamy: 6 },
    'Sorghum': { sandy: 8, red: 8, loamy: 6 },
    'Jute': { clay: 9, loamy: 7, sandy: 5 },
    'Peas': { loamy: 8, clay: 7, black: 7 },
    'Barley': { sandy: 7, loamy: 8, black: 7 },
    'Cowpea': { sandy: 8, red: 8, loamy: 7 },
    'Watermelon': { sandy: 9, loamy: 7, clay: 5 },
    'Cucumber': { loamy: 8, sandy: 8, clay: 6 },
    'Pulses': { loamy: 7, sandy: 7, clay: 6 }
  };
  
  let score = baseScores[crop]?.[soilType.toLowerCase()] || 5;
  
  // Adjust score based on temperature
  if (temperature === 'high') {
    if (['Rice', 'Sugarcane', 'Maize', 'Cotton'].includes(crop)) {
      score += 1;
    } else if (['Wheat', 'Gram', 'Peas'].includes(crop)) {
      score -= 1;
    }
  } else if (temperature === 'low') {
    if (['Wheat', 'Gram', 'Peas', 'Barley'].includes(crop)) {
      score += 1;
    } else if (['Rice', 'Cotton', 'Sugarcane'].includes(crop)) {
      score -= 1;
    }
  }
  
  // Adjust score based on rainfall
  if (rainfall === 'high') {
    if (['Rice', 'Jute', 'Sugarcane'].includes(crop)) {
      score += 1;
    } else if (['Groundnut', 'Millet'].includes(crop)) {
      score -= 0.5;
    }
  } else if (rainfall === 'low') {
    if (['Groundnut', 'Millet', 'Sorghum'].includes(crop)) {
      score += 1;
    } else if (['Rice', 'Sugarcane'].includes(crop)) {
      score -= 1;
    }
  }
  
  return Math.max(1, Math.min(10, score));
}

function getGrowingSeason(crop) {
  const seasons = {
    'Rice': '3-4 months (Kharif)',
    'Wheat': '3-4 months (Rabi)',
    'Cotton': '5-6 months (Kharif)',
    'Sugarcane': '10-12 months',
    'Maize': '3-4 months',
    'Groundnut': '3-4 months',
    'Millet': '3-4 months',
    'Sorghum': '3-4 months',
    'Soybean': '3-4 months',
    'Mustard': '3-4 months (Rabi)',
    'Gram': '3-4 months (Rabi)',
    'Peas': '2-3 months (Rabi)',
    'Barley': '3-4 months (Rabi)',
    'Jute': '4-5 months (Kharif)',
    'Cowpea': '2-3 months',
    'Watermelon': '2-3 months',
    'Cucumber': '2-3 months',
    'Pulses': '3-4 months'
  };
  
  return seasons[crop] || '3-4 months';
}

function getWaterRequirement(crop) {
  const requirements = {
    'Rice': 'High (1500-2000 mm)',
    'Wheat': 'Medium (400-600 mm)',
    'Cotton': 'High (700-1300 mm)',
    'Sugarcane': 'Very High (1500-2500 mm)',
    'Maize': 'Medium (500-800 mm)',
    'Groundnut': 'Medium (400-600 mm)',
    'Millet': 'Low (300-500 mm)',
    'Sorghum': 'Low (300-500 mm)',
    'Soybean': 'Medium (400-600 mm)',
    'Mustard': 'Low (300-400 mm)',
    'Gram': 'Low (300-400 mm)',
    'Peas': 'Medium (400-500 mm)',
    'Barley': 'Low (300-450 mm)',
    'Jute': 'High (1000-1200 mm)',
    'Cowpea': 'Low (300-500 mm)',
    'Watermelon': 'Medium (400-600 mm)',
    'Cucumber': 'Medium (400-600 mm)',
    'Pulses': 'Medium (400-600 mm)'
  };
  
  return requirements[crop] || 'Medium (400-600 mm)';
}

function getFertilizerNeeds(crop) {
  const fertilizers = {
    'Rice': 'NPK 120:60:40 kg/ha + 20-25 tons/ha FYM',
    'Wheat': 'NPK 150:60:40 kg/ha + 25-30 tons/ha FYM',
    'Cotton': 'NPK 100:50:50 kg/ha + 20-25 tons/ha FYM',
    'Sugarcane': 'NPK 150:60:60 kg/ha + 50-75 tons/ha FYM',
    'Maize': 'NPK 120:60:40 kg/ha + 20-25 tons/ha FYM',
    'Groundnut': 'NPK 20:60:40 kg/ha + 15-20 tons/ha FYM',
    'Millet': 'NPK 40:20:20 kg/ha + 10-15 tons/ha FYM',
    'Sorghum': 'NPK 60:30:30 kg/ha + 15-20 tons/ha FYM',
    'Soybean': 'NPK 20:60:40 kg/ha + 15-20 tons/ha FYM',
    'Mustard': 'NPK 80:40:20 kg/ha + 15-20 tons/ha FYM',
    'Gram': 'NPK 20:40:20 kg/ha + 10-15 tons/ha FYM',
    'Peas': 'NPK 30:40:20 kg/ha + 15-20 tons/ha FYM',
    'Barley': 'NPK 60:30:20 kg/ha + 20-25 tons/ha FYM',
    'Jute': 'NPK 40:20:20 kg/ha + 15-20 tons/ha FYM',
    'Cowpea': 'NPK 20:30:20 kg/ha + 10-15 tons/ha FYM',
    'Watermelon': 'NPK 80:60:40 kg/ha + 20-25 tons/ha FYM',
    'Cucumber': 'NPK 60:40:30 kg/ha + 20-25 tons/ha FYM',
    'Pulses': 'NPK 25:40:20 kg/ha + 15-20 tons/ha FYM'
  };
  
  return fertilizers[crop] || 'NPK 60:40:30 kg/ha + 20 tons/ha FYM';
}
