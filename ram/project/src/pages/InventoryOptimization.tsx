import React, { useState, useEffect } from 'react';
import { Package, TrendingDown, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

interface InventoryOptimizationProps {
  darkMode: boolean;
}

const InventoryOptimization: React.FC<InventoryOptimizationProps> = ({ darkMode }) => {
  const [optimizationData, setOptimizationData] = useState({
    totalSavings: 18.5,
    stockoutReduction: 45,
    turnoverImprovement: 23,
    excessInventory: 12.3,
    serviceLevelAchievement: 99.5
  });

  const [stores, setStores] = useState([
    { id: 1, name: 'Store #4721', location: 'Dallas, TX', currentStock: 12500, optimalStock: 11200, status: 'optimized' },
    { id: 2, name: 'Store #1234', location: 'New York, NY', currentStock: 18900, optimalStock: 17500, status: 'needs_adjustment' },
    { id: 3, name: 'Store #5678', location: 'Los Angeles, CA', currentStock: 15600, optimalStock: 16800, status: 'understock' },
    { id: 4, name: 'Store #9012', location: 'Chicago, IL', currentStock: 13400, optimalStock: 13200, status: 'optimized' }
  ]);

  const [categories, setCategories] = useState([
    { name: 'Electronics', currentValue: 2.4, optimalValue: 2.1, variance: -12.5, trend: 'down' },
    { name: 'Grocery', currentValue: 8.9, optimalValue: 9.2, variance: 3.4, trend: 'up' },
    { name: 'Clothing', currentValue: 1.8, optimalValue: 1.6, variance: -11.1, trend: 'down' },
    { name: 'Home & Garden', currentValue: 1.2, optimalValue: 1.3, variance: 8.3, trend: 'up' },
    { name: 'Health & Beauty', currentValue: 0.9, optimalValue: 0.8, variance: -11.1, trend: 'down' }
  ]);

  const recommendations = [
    { id: 1, type: 'transfer', message: 'Transfer 200 units of iPhone 15 from Store #1234 to Store #5678', priority: 'high', savings: '$12,400' },
    { id: 2, type: 'reorder', message: 'Reorder Samsung Galaxy S24 for Store #4721 (current: 45, optimal: 120)', priority: 'medium', savings: '$8,200' },
    { id: 3, type: 'excess', message: 'Excess inventory detected: MacBook Air M3 in Store #9012', priority: 'low', savings: '$15,600' },
    { id: 4, type: 'stockout', message: 'Prevent stockout: iPad Pro in Store #5678 (projected in 3 days)', priority: 'high', savings: '$18,900' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setOptimizationData(prev => ({
        ...prev,
        totalSavings: Math.max(15, Math.min(25, prev.totalSavings + (Math.random() - 0.5) * 0.5)),
        stockoutReduction: Math.max(40, Math.min(50, prev.stockoutReduction + (Math.random() - 0.5) * 2)),
        turnoverImprovement: Math.max(20, Math.min(30, prev.turnoverImprovement + (Math.random() - 0.5) * 1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimized': return 'text-green-600 bg-green-100';
      case 'needs_adjustment': return 'text-yellow-600 bg-yellow-100';
      case 'understock': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimized': return <CheckCircle className="h-4 w-4" />;
      case 'needs_adjustment': return <AlertTriangle className="h-4 w-4" />;
      case 'understock': return <RefreshCw className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Package className="h-8 w-8 text-green-600 mr-3" />
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Inventory Optimization
            </h1>
          </div>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Multi-echelon inventory optimization with reinforcement learning
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <TrendingDown className="h-6 w-6 text-green-600" />
              <div className="text-sm font-medium text-green-500">+2.1%</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {optimizationData.totalSavings.toFixed(1)}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Cost Savings
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div className="text-sm font-medium text-green-500">-15%</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {optimizationData.stockoutReduction}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Stockout Reduction
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <RefreshCw className="h-6 w-6 text-blue-600" />
              <div className="text-sm font-medium text-green-500">+5.2%</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {optimizationData.turnoverImprovement}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Turnover Improvement
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <Package className="h-6 w-6 text-purple-600" />
              <div className="text-sm font-medium text-red-500">-2.3%</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {optimizationData.excessInventory.toFixed(1)}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Excess Inventory
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div className="text-sm font-medium text-green-500">+0.2%</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {optimizationData.serviceLevelAchievement}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Service Level
            </div>
          </div>
        </div>

        {/* Store Optimization Status */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Store Optimization Status
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Store</th>
                  <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Current Stock</th>
                  <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Optimal Stock</th>
                  <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Variance</th>
                  <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store) => (
                  <tr key={store.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className={`py-4 px-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      <div>
                        <div className="font-medium">{store.name}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{store.location}</div>
                      </div>
                    </td>
                    <td className={`py-4 px-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {store.currentStock.toLocaleString()}
                    </td>
                    <td className={`py-4 px-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {store.optimalStock.toLocaleString()}
                    </td>
                    <td className={`py-4 px-4`}>
                      <span className={`${
                        store.currentStock > store.optimalStock ? 'text-red-600' : 
                        store.currentStock < store.optimalStock ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {((store.currentStock - store.optimalStock) / store.optimalStock * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(store.status)}`}>
                        {getStatusIcon(store.status)}
                        <span className="ml-1 capitalize">{store.status.replace('_', ' ')}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Category Analysis */}
          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Category Inventory Analysis
            </h3>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {category.name}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Current: ${category.currentValue}M | Optimal: ${category.optimalValue}M
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      category.variance > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {category.variance > 0 ? '+' : ''}{category.variance.toFixed(1)}%
                    </div>
                    <TrendingDown className={`h-4 w-4 ${
                      category.trend === 'up' ? 'text-green-500 transform rotate-180' : 'text-red-500'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              AI Recommendations
            </h3>
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                      {rec.priority.toUpperCase()}
                    </div>
                    <div className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {rec.savings}
                    </div>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {rec.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryOptimization;