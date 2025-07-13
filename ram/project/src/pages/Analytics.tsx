import React, { useState } from 'react';
import { TrendingUp, BarChart3, PieChart, Calendar, Download, Filter } from 'lucide-react';

interface AnalyticsProps {
  darkMode: boolean;
}

const Analytics: React.FC<AnalyticsProps> = ({ darkMode }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('cost_savings');

  const performanceMetrics = [
    { label: 'Cost Savings', value: '18.5%', change: '+2.3%', trend: 'up' },
    { label: 'Forecast Accuracy', value: '94.2%', change: '+0.8%', trend: 'up' },
    { label: 'On-Time Delivery', value: '98.4%', change: '+1.2%', trend: 'up' },
    { label: 'Inventory Turnover', value: '12.3x', change: '+0.9x', trend: 'up' },
    { label: 'Route Efficiency', value: '91.7%', change: '+3.1%', trend: 'up' },
    { label: 'System Uptime', value: '99.9%', change: '+0.1%', trend: 'up' }
  ];

  const categoryPerformance = [
    { category: 'Electronics', revenue: 2.4, margin: 18.5, orders: 12500 },
    { category: 'Grocery', revenue: 8.9, margin: 12.3, orders: 45600 },
    { category: 'Clothing', revenue: 1.8, margin: 22.1, orders: 8900 },
    { category: 'Home & Garden', revenue: 1.2, margin: 15.7, orders: 3200 },
    { category: 'Health & Beauty', revenue: 0.9, margin: 28.3, orders: 5400 }
  ];

  const supplyChainMetrics = [
    { metric: 'Demand Forecast MAPE', current: 6.8, target: 7.0, status: 'excellent' },
    { metric: 'Inventory Carrying Cost', current: 12.3, target: 15.0, status: 'good' },
    { metric: 'Stockout Rate', current: 1.2, target: 2.0, status: 'excellent' },
    { metric: 'Order Fulfillment Time', current: 18.5, target: 24.0, status: 'excellent' },
    { metric: 'Transportation Cost', current: 8.9, target: 10.0, status: 'good' },
    { metric: 'Returns Rate', current: 2.1, target: 3.0, status: 'good' }
  ];

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const generateReport = () => {
    // Simulate report generation
    alert('Generating comprehensive analytics report...');
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-4">
                <TrendingUp className="h-8 w-8 text-indigo-600 mr-3" />
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Analytics & Reporting
                </h1>
              </div>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Comprehensive insights and performance analytics across your supply chain
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                {timeRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              <button
                onClick={generateReport}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className={`p-6 rounded-xl shadow-lg ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                </div>
                <div className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.change}
                </div>
              </div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                {metric.value}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Supply Chain Performance Trends
            </h3>
            <div className="flex items-center space-x-4">
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className={`px-3 py-1 rounded-lg border text-sm ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="cost_savings">Cost Savings</option>
                <option value="forecast_accuracy">Forecast Accuracy</option>
                <option value="delivery_performance">Delivery Performance</option>
                <option value="inventory_turnover">Inventory Turnover</option>
              </select>
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          {/* Simulated Chart */}
          <div className="h-80 flex items-end justify-between space-x-2">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="bg-indigo-500 w-4 rounded-t"
                style={{ 
                  height: `${20 + Math.random() * 60}%`,
                  opacity: 0.7 + Math.random() * 0.3
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-500">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Category Performance */}
          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Category Performance
            </h3>
            <div className="space-y-4">
              {categoryPerformance.map((category, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {category.category}
                    </h4>
                    <div className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {category.margin}% margin
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Revenue</div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${category.revenue}M
                      </div>
                    </div>
                    <div>
                      <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Orders</div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {category.orders.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supply Chain KPIs */}
          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Supply Chain KPIs
            </h3>
            <div className="space-y-4">
              {supplyChainMetrics.map((metric, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {metric.metric}
                    </h4>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                      {metric.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Current: </span>
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {metric.current}
                        {metric.metric.includes('Rate') || metric.metric.includes('Cost') ? '%' : 
                         metric.metric.includes('Time') ? 'h' : ''}
                      </span>
                    </div>
                    <div>
                      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Target: </span>
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {metric.target}
                        {metric.metric.includes('Rate') || metric.metric.includes('Cost') ? '%' : 
                         metric.metric.includes('Time') ? 'h' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className={`p-6 rounded-xl shadow-lg ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Executive Summary
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Key Achievements
              </h4>
              <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• 18.5% reduction in total supply chain costs</li>
                <li>• 94.2% forecast accuracy across all categories</li>
                <li>• 98.4% on-time delivery performance</li>
                <li>• 45% reduction in supply chain disruptions</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Optimization Impact
              </h4>
              <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• 15% inventory cost reduction</li>
                <li>• 20% delivery cost savings</li>
                <li>• 28% improvement in route efficiency</li>
                <li>• 30% reduction in stockout events</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Technology Benefits
              </h4>
              <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• AI-powered demand forecasting</li>
                <li>• Real-time inventory optimization</li>
                <li>• Automated route planning</li>
                <li>• Predictive anomaly detection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;