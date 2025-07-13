import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Calendar, Target, AlertCircle } from 'lucide-react';

interface DemandForecastingProps {
  darkMode: boolean;
}

const DemandForecasting: React.FC<DemandForecastingProps> = ({ darkMode }) => {
  const [selectedStore, setSelectedStore] = useState('Store #4721');
  const [selectedCategory, setSelectedCategory] = useState('Electronics');
  const [forecastData, setForecastData] = useState({
    accuracy: 94.2,
    trend: 'increasing',
    nextWeekDemand: 12500,
    confidence: 89.3,
    anomalies: 2
  });

  const [chartData, setChartData] = useState([
    { day: 'Mon', historical: 2100, predicted: 2200, actual: 2150 },
    { day: 'Tue', historical: 2300, predicted: 2400, actual: 2380 },
    { day: 'Wed', historical: 2000, predicted: 2100, actual: 2090 },
    { day: 'Thu', historical: 2400, predicted: 2500, actual: 2470 },
    { day: 'Fri', historical: 2800, predicted: 2900, actual: 2850 },
    { day: 'Sat', historical: 3200, predicted: 3300, actual: 3280 },
    { day: 'Sun', historical: 2900, predicted: 3000, actual: 2980 }
  ]);

  const topProducts = [
    { name: 'iPhone 15 Pro', demand: 450, trend: 'up', accuracy: 96.1 },
    { name: 'Samsung Galaxy S24', demand: 380, trend: 'up', accuracy: 93.7 },
    { name: 'MacBook Air M3', demand: 220, trend: 'down', accuracy: 91.4 },
    { name: 'Dell XPS 13', demand: 180, trend: 'stable', accuracy: 94.8 },
    { name: 'iPad Pro', demand: 340, trend: 'up', accuracy: 92.3 }
  ];

  const forecasts = [
    { period: 'Next 7 Days', demand: 12500, confidence: 89.3, change: '+12%' },
    { period: 'Next 14 Days', demand: 26800, confidence: 85.7, change: '+8%' },
    { period: 'Next 30 Days', demand: 58400, confidence: 81.2, change: '+15%' },
    { period: 'Next Quarter', demand: 185000, confidence: 76.8, change: '+18%' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setForecastData(prev => ({
        ...prev,
        accuracy: Math.max(90, Math.min(99, prev.accuracy + (Math.random() - 0.5) * 0.5)),
        confidence: Math.max(80, Math.min(95, prev.confidence + (Math.random() - 0.5) * 0.8)),
        nextWeekDemand: prev.nextWeekDemand + Math.floor((Math.random() - 0.5) * 100)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Brain className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              AI-Powered Demand Forecasting
            </h1>
          </div>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Temporal Fusion Transformer models predicting demand across millions of SKUs
          </p>
        </div>

        {/* Controls */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Store Location
              </label>
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className={`w-full p-3 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="Store #4721">Store #4721 - Dallas, TX</option>
                <option value="Store #1234">Store #1234 - New York, NY</option>
                <option value="Store #5678">Store #5678 - Los Angeles, CA</option>
                <option value="Store #9012">Store #9012 - Chicago, IL</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Product Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full p-3 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="Electronics">Electronics</option>
                <option value="Grocery">Grocery</option>
                <option value="Clothing">Clothing</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Health & Beauty">Health & Beauty</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <Target className="h-6 w-6 text-blue-600" />
              <div className="text-sm font-medium text-green-500">+0.8%</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {forecastData.accuracy.toFixed(1)}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Forecast Accuracy
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <div className="text-sm font-medium text-green-500">+12%</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {forecastData.nextWeekDemand.toLocaleString()}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Next Week Demand
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-6 w-6 text-purple-600" />
              <div className="text-sm font-medium text-blue-500">High</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {forecastData.confidence.toFixed(1)}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Confidence Level
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <div className="text-sm font-medium text-red-500">Monitor</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {forecastData.anomalies}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Anomalies Detected
            </div>
          </div>
        </div>

        {/* Forecast Chart */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            7-Day Demand Forecast vs Actual
          </h3>
          <div className="h-80 flex items-end justify-between space-x-4">
            {chartData.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full max-w-20 h-64 flex items-end justify-center space-x-1">
                  <div
                    className="bg-gray-400 w-4 rounded-t"
                    style={{ height: `${(day.historical / 3500) * 100}%` }}
                    title={`Historical: ${day.historical}`}
                  />
                  <div
                    className="bg-blue-500 w-4 rounded-t"
                    style={{ height: `${(day.predicted / 3500) * 100}%` }}
                    title={`Predicted: ${day.predicted}`}
                  />
                  <div
                    className="bg-green-500 w-4 rounded-t"
                    style={{ height: `${(day.actual / 3500) * 100}%` }}
                    title={`Actual: ${day.actual}`}
                  />
                </div>
                <div className={`text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {day.day}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Historical</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Predicted</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actual</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Top Products by Demand
            </h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {product.name}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {product.accuracy}% accuracy
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {product.demand}
                    </span>
                    <TrendingUp className={`h-4 w-4 ${
                      product.trend === 'up' ? 'text-green-500' : 
                      product.trend === 'down' ? 'text-red-500' : 
                      'text-gray-500'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Forecast Periods */}
          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Multi-Horizon Forecasts
            </h3>
            <div className="space-y-4">
              {forecasts.map((forecast, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {forecast.period}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {forecast.confidence}% confidence
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {forecast.demand.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-500">
                      {forecast.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandForecasting;