import React, { useState, useEffect } from 'react';
import { BarChart3, AlertTriangle, CheckCircle, Clock, Activity, MapPin } from 'lucide-react';

interface RealtimeMonitoringProps {
  darkMode: boolean;
}

const RealtimeMonitoring: React.FC<RealtimeMonitoringProps> = ({ darkMode }) => {
  const [systemMetrics, setSystemMetrics] = useState({
    totalOrders: 45678,
    processingRate: 1247,
    systemUptime: 99.94,
    alertsActive: 3,
    regionsMonitored: 127,
    dataPointsPerSecond: 15420
  });

  const [supplyChainHealth, setSupplyChainHealth] = useState([
    { component: 'Demand Forecasting', status: 'healthy', uptime: 99.8, latency: 45 },
    { component: 'Inventory Management', status: 'healthy', uptime: 99.9, latency: 32 },
    { component: 'Route Optimization', status: 'warning', uptime: 97.2, latency: 78 },
    { component: 'Warehouse Operations', status: 'healthy', uptime: 99.7, latency: 28 },
    { component: 'Last-Mile Delivery', status: 'healthy', uptime: 98.9, latency: 55 },
    { component: 'Drone Operations', status: 'maintenance', uptime: 95.4, latency: 95 }
  ]);

  const [realtimeAlerts, setRealtimeAlerts] = useState([
    { 
      id: 1, 
      type: 'critical', 
      message: 'High latency detected in Route Optimization service', 
      timestamp: new Date(Date.now() - 120000),
      location: 'Dallas Distribution Center',
      impact: 'Medium'
    },
    { 
      id: 2, 
      type: 'warning', 
      message: 'Drone fleet maintenance scheduled in 30 minutes', 
      timestamp: new Date(Date.now() - 300000),
      location: 'North Texas Operations',
      impact: 'Low'
    },
    { 
      id: 3, 
      type: 'info', 
      message: 'Inventory optimization completed for Electronics category', 
      timestamp: new Date(Date.now() - 600000),
      location: 'All Regions',
      impact: 'Positive'
    }
  ]);

  const [regionMetrics, setRegionMetrics] = useState([
    { region: 'North Texas', orders: 12340, efficiency: 96.2, issues: 1 },
    { region: 'South Texas', orders: 8950, efficiency: 94.7, issues: 0 },
    { region: 'East Texas', orders: 7680, efficiency: 91.3, issues: 2 },
    { region: 'West Texas', orders: 9430, efficiency: 97.8, issues: 0 },
    { region: 'Central Texas', orders: 11250, efficiency: 95.1, issues: 1 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        totalOrders: prev.totalOrders + Math.floor(Math.random() * 20),
        processingRate: prev.processingRate + Math.floor((Math.random() - 0.5) * 100),
        dataPointsPerSecond: prev.dataPointsPerSecond + Math.floor((Math.random() - 0.5) * 1000)
      }));

      setSupplyChainHealth(prev => prev.map(component => ({
        ...component,
        latency: Math.max(20, Math.min(100, component.latency + (Math.random() - 0.5) * 10))
      })));

      // Occasionally add new alerts
      if (Math.random() < 0.1) {
        const newAlert = {
          id: Date.now(),
          type: ['info', 'warning', 'critical'][Math.floor(Math.random() * 3)],
          message: 'System optimization completed successfully',
          timestamp: new Date(),
          location: 'System Wide',
          impact: 'Positive'
        };
        setRealtimeAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      case 'maintenance': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'maintenance': return <Clock className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'info': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <BarChart3 className="h-8 w-8 text-red-600 mr-3" />
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Real-Time Supply Chain Monitoring
            </h1>
          </div>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            24/7 visibility with graph-based anomaly detection across your entire supply chain
          </p>
        </div>

        {/* System Overview */}
        <div className="grid md:grid-cols-6 gap-6 mb-8">
          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <Activity className="h-6 w-6 text-blue-600" />
              <div className="text-sm font-medium text-green-500">Live</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {systemMetrics.totalOrders.toLocaleString()}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Orders Processed
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-6 w-6 text-green-600" />
              <div className="text-sm font-medium text-blue-500">Real-time</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {systemMetrics.processingRate}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Orders/Hour
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div className="text-sm font-medium text-green-500">Excellent</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {systemMetrics.systemUptime}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              System Uptime
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <div className="text-sm font-medium text-yellow-500">Monitor</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {systemMetrics.alertsActive}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Active Alerts
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <MapPin className="h-6 w-6 text-purple-600" />
              <div className="text-sm font-medium text-blue-500">Global</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {systemMetrics.regionsMonitored}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Regions Monitored
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
              <div className="text-sm font-medium text-green-500">Streaming</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {systemMetrics.dataPointsPerSecond.toLocaleString()}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Data Points/Sec
            </div>
          </div>
        </div>

        {/* Supply Chain Health */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Supply Chain Component Health
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supplyChainHealth.map((component, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {component.component}
                  </h4>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(component.status)}`}>
                    {getStatusIcon(component.status)}
                    <span className="ml-1 capitalize">{component.status}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Uptime</div>
                    <div className={`font-medium ${
                      component.uptime >= 99 ? 'text-green-600' : 
                      component.uptime >= 95 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {component.uptime}%
                    </div>
                  </div>
                  <div>
                    <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Latency</div>
                    <div className={`font-medium ${
                      component.latency <= 50 ? 'text-green-600' : 
                      component.latency <= 80 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {component.latency}ms
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Real-time Alerts */}
          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Real-Time Alerts
            </h3>
            <div className="space-y-4">
              {realtimeAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {alert.message}
                      </p>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {alert.location} • {formatTimestamp(alert.timestamp)}
                      </p>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      alert.impact === 'Positive' ? 'bg-green-100 text-green-800' :
                      alert.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {alert.impact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Performance */}
          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Regional Performance
            </h3>
            <div className="space-y-4">
              {regionMetrics.map((region, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {region.region}
                    </h4>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      region.issues === 0 ? 'text-green-600 bg-green-100' :
                      region.issues === 1 ? 'text-yellow-600 bg-yellow-100' :
                      'text-red-600 bg-red-100'
                    }`}>
                      {region.issues === 0 ? 'Healthy' : `${region.issues} Issue${region.issues > 1 ? 's' : ''}`}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Orders</div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {region.orders.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Efficiency</div>
                      <div className={`font-medium ${
                        region.efficiency >= 95 ? 'text-green-600' : 
                        region.efficiency >= 90 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {region.efficiency}%
                      </div>
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

export default RealtimeMonitoring;