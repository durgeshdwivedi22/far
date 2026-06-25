// Profit Prediction System for Smart Farmer Assistant

export class ProfitPredictor {
  constructor(expenses = []) {
    this.expenses = expenses;
    this.profitData = this.calculateProfitMetrics();
  }

  // Calculate profit metrics from expenses
  calculateProfitMetrics() {
    const monthlyData = {};
    const quarterlyData = {};
    const yearlyData = {};

    this.expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const quarterKey = `${date.getFullYear()}-Q${Math.ceil((date.getMonth() + 1) / 3)}`;
      const yearKey = date.getFullYear().toString();

      // Initialize data structures
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { investment: 0, profit: 0, loss: 0 };
      }
      if (!quarterlyData[quarterKey]) {
        quarterlyData[quarterKey] = { investment: 0, profit: 0, loss: 0 };
      }
      if (!yearlyData[yearKey]) {
        yearlyData[yearKey] = { investment: 0, profit: 0, loss: 0 };
      }

      // Add amounts
      const amount = parseFloat(expense.amount);
      if (expense.type === 'investment') {
        monthlyData[monthKey].investment += amount;
        quarterlyData[quarterKey].investment += amount;
        yearlyData[yearKey].investment += amount;
      } else if (expense.type === 'profit') {
        monthlyData[monthKey].profit += amount;
        quarterlyData[quarterKey].profit += amount;
        yearlyData[yearKey].profit += amount;
      } else if (expense.type === 'loss') {
        monthlyData[monthKey].loss += amount;
        quarterlyData[quarterKey].loss += amount;
        yearlyData[yearKey].loss += amount;
      }
    });

    return {
      monthly: monthlyData,
      quarterly: quarterlyData,
      yearly: yearlyData
    };
  }

  // Calculate average profit metrics
  getAverageMetrics(period = 'monthly') {
    const data = this.profitData[period];
    const values = Object.values(data);
    
    if (values.length === 0) {
      return { avgInvestment: 0, avgProfit: 0, avgLoss: 0, avgNetProfit: 0 };
    }

    const totals = values.reduce((acc, curr) => ({
      investment: acc.investment + curr.investment,
      profit: acc.profit + curr.profit,
      loss: acc.loss + curr.loss
    }), { investment: 0, profit: 0, loss: 0 });

    const count = values.length;
    return {
      avgInvestment: totals.investment / count,
      avgProfit: totals.profit / count,
      avgLoss: totals.loss / count,
      avgNetProfit: (totals.profit - totals.investment - totals.loss) / count
    };
  }

  // Get growth rate
  getGrowthRate(period = 'monthly') {
    const data = this.profitData[period];
    const sortedKeys = Object.keys(data).sort();
    
    if (sortedKeys.length < 2) {
      return 0;
    }

    const recent = sortedKeys.slice(-3); // Last 3 periods
    const profits = recent.map(key => {
      const period = data[key];
      return period.profit - period.investment - period.loss;
    });

    if (profits.length < 2) {
      return 0;
    }

    // Simple growth rate calculation
    const firstProfit = profits[0] || 0;
    const lastProfit = profits[profits.length - 1] || 0;
    
    if (firstProfit === 0) {
      return lastProfit > 0 ? 100 : 0;
    }

    return ((lastProfit - firstProfit) / Math.abs(firstProfit)) * 100;
  }

  // Predict profit for next period
  predictNextPeriod(period = 'monthly', confidence = 0.8) {
    const metrics = this.getAverageMetrics(period);
    const growthRate = this.getGrowthRate(period) / 100;
    
    // Apply growth rate to average profit
    const predictedNetProfit = metrics.avgNetProfit * (1 + growthRate);
    
    // Adjust based on confidence level
    const adjustedProfit = predictedNetProfit * confidence;
    
    // Calculate predicted investment and profit separately
    const predictedInvestment = metrics.avgInvestment * (1 + growthRate * 0.5);
    const predictedProfit = metrics.avgProfit * (1 + growthRate);
    const predictedLoss = metrics.avgLoss * (1 - growthRate * 0.2); // Loss should decrease with growth
    
    return {
      investment: Math.max(0, predictedInvestment),
      profit: Math.max(0, predictedProfit),
      loss: Math.max(0, predictedLoss),
      netProfit: adjustedProfit,
      confidence: confidence * 100,
      growthRate: growthRate * 100,
      basedOn: `Based on ${Object.keys(this.profitData[period]).length} periods of data`
    };
  }

  // Predict profit for multiple periods
  predictMultiplePeriods(periods = ['monthly', 'quarterly', 'yearly']) {
    const predictions = {};
    
    periods.forEach(period => {
      predictions[period] = this.predictNextPeriod(period);
    });
    
    return predictions;
  }

  // Get risk assessment
  getRiskAssessment() {
    const metrics = this.getAverageMetrics();
    const growthRate = this.getGrowthRate() / 100;
    
    let riskLevel = 'Low';
    let riskScore = 0;
    let recommendations = [];

    // Calculate risk score (0-100)
    if (metrics.avgNetProfit < 0) {
      riskScore += 30;
      recommendations.push('Focus on reducing losses and increasing profits');
    }
    
    if (growthRate < -0.1) {
      riskScore += 25;
      recommendations.push('Negative growth detected - review farming practices');
    }
    
    if (metrics.avgLoss > metrics.avgProfit * 0.3) {
      riskScore += 20;
      recommendations.push('Loss ratio is high - implement better risk management');
    }
    
    if (Object.keys(this.profitData.monthly).length < 3) {
      riskScore += 15;
      recommendations.push('Insufficient data - maintain detailed records');
    }
    
    if (metrics.avgInvestment === 0) {
      riskScore += 10;
      recommendations.push('No investment data - track all farming expenses');
    }

    // Determine risk level
    if (riskScore >= 60) {
      riskLevel = 'High';
    } else if (riskScore >= 30) {
      riskLevel = 'Medium';
    }

    return {
      score: Math.min(riskScore, 100),
      level: riskLevel,
      recommendations: recommendations
    };
  }

  // Get seasonal trends
  getSeasonalTrends() {
    const seasonalData = {
      spring: { investment: 0, profit: 0, loss: 0, count: 0 },
      summer: { investment: 0, profit: 0, loss: 0, count: 0 },
      autumn: { investment: 0, profit: 0, loss: 0, count: 0 },
      winter: { investment: 0, profit: 0, loss: 0, count: 0 }
    };

    this.expenses.forEach(expense => {
      const date = new Date(expense.date);
      const month = date.getMonth();
      let season;

      if (month >= 2 && month <= 4) season = 'spring';
      else if (month >= 5 && month <= 7) season = 'summer';
      else if (month >= 8 && month <= 10) season = 'autumn';
      else season = 'winter';

      const amount = parseFloat(expense.amount);
      if (expense.type === 'investment') {
        seasonalData[season].investment += amount;
      } else if (expense.type === 'profit') {
        seasonalData[season].profit += amount;
      } else if (expense.type === 'loss') {
        seasonalData[season].loss += amount;
      }
      seasonalData[season].count++;
    });

    // Calculate averages and find best season
    Object.keys(seasonalData).forEach(season => {
      const data = seasonalData[season];
      data.netProfit = data.profit - data.investment - data.loss;
      data.avgProfit = data.count > 0 ? data.netProfit / data.count : 0;
    });

    const bestSeason = Object.keys(seasonalData).reduce((best, season) => {
      return seasonalData[season].avgProfit > seasonalData[best].avgProfit ? season : best;
    }, 'spring');

    return {
      data: seasonalData,
      bestSeason,
      recommendations: this.getSeasonalRecommendations(seasonalData, bestSeason)
    };
  }

  // Get seasonal recommendations
  getSeasonalRecommendations(seasonalData, bestSeason) {
    const recommendations = [];
    
    if (seasonalData[bestSeason].avgProfit > 0) {
      recommendations.push(`${bestSeason.charAt(0).toUpperCase() + bestSeason.slice(1)} is your most profitable season`);
    }

    const worstSeason = Object.keys(seasonalData).reduce((worst, season) => {
      return seasonalData[season].avgProfit < seasonalData[worst].avgProfit ? season : worst;
    }, 'spring');

    if (seasonalData[worstSeason].avgProfit < 0) {
      recommendations.push(`Consider changing farming practices in ${worstSeason}`);
    }

    return recommendations;
  }

  // Generate comprehensive report
  generateReport() {
    const predictions = this.predictMultiplePeriods();
    const riskAssessment = this.getRiskAssessment();
    const seasonalTrends = this.getSeasonalTrends();
    const metrics = this.getAverageMetrics();

    return {
      summary: {
        totalInvestment: this.expenses
          .filter(e => e.type === 'investment')
          .reduce((sum, e) => sum + parseFloat(e.amount), 0),
        totalProfit: this.expenses
          .filter(e => e.type === 'profit')
          .reduce((sum, e) => sum + parseFloat(e.amount), 0),
        totalLoss: this.expenses
          .filter(e => e.type === 'loss')
          .reduce((sum, e) => sum + parseFloat(e.amount), 0),
        totalTransactions: this.expenses.length,
        dataPeriods: Object.keys(this.profitData.monthly).length
      },
      predictions,
      riskAssessment,
      seasonalTrends,
      metrics,
      recommendations: this.getOverallRecommendations(riskAssessment, seasonalTrends, predictions)
    };
  }

  // Get overall recommendations
  getOverallRecommendations(riskAssessment, seasonalTrends, predictions) {
    const recommendations = [];

    // Risk-based recommendations
    recommendations.push(...riskAssessment.recommendations);

    // Seasonal recommendations
    recommendations.push(...seasonalTrends.recommendations);

    // Prediction-based recommendations
    if (predictions.monthly.growthRate > 10) {
      recommendations.push('Excellent growth! Consider expanding operations');
    } else if (predictions.monthly.growthRate < -10) {
      recommendations.push('Declining performance - review all farming practices');
    }

    // Investment recommendations
    const avgROI = this.getAverageMetrics().avgInvestment > 0 
      ? (this.getAverageMetrics().avgNetProfit / this.getAverageMetrics().avgInvestment) * 100 
      : 0;

    if (avgROI < 10) {
      recommendations.push('ROI is low - optimize investment strategies');
    }

    return recommendations;
  }
}

// Helper function to format predictions for display
export const formatPrediction = (prediction, period) => {
  const periodLabels = {
    monthly: 'Next Month',
    quarterly: 'Next Quarter',
    yearly: 'Next Year'
  };

  return {
    period: periodLabels[period] || period,
    investment: `₹${prediction.investment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
    profit: `₹${prediction.profit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
    loss: `₹${prediction.loss.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
    netProfit: `₹${prediction.netProfit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
    confidence: `${prediction.confidence.toFixed(1)}%`,
    growthRate: `${prediction.growthRate > 0 ? '+' : ''}${prediction.growthRate.toFixed(1)}%`,
    basedOn: prediction.basedOn
  };
};
