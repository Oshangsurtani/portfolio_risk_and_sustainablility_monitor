import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Package, 
  Truck, 
  Brain, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
  MapPin,
  Zap
} from 'lucide-react';

interface DashboardProps {
  darkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ darkMode }) => {
  const [realTimeData, setRealTimeData] = useState({
    ordersProcessed: 156420,
    deliveriesInProgress: 2847,
    inventoryTurnover: 12.3,
    forecastAccuracy: 94.2,
    costSavings: 18.5,
    onTimeDelivery: 98.1
  });

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'High demand predicted for Electronics in Store #4721', timestamp: '2 min ago' },
    { id: 2, type: 'success', message: 'Inventory optimization completed for Northeast region', timestamp: '5 min ago' },
    { id: 3, type: 'info', message: 'New delivery route optimized - 15% efficiency gain', timestamp: '8 min ago' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        ordersProcessed: prev.ordersProcessed + Math.floor(Math.random() * 50),
        deliveriesInProgress: prev.deliveriesInProgress + Math.floor(Math.random() * 20) - 10,
        inventoryTurnover: prev.inventoryTurnover + (Math.random() - 0.5) * 0.1,
        forecastAccuracy: Math.max(90, Math.min(99, prev.forecastAccuracy + (Math.random() - 0.5) * 0.5)),
        onTimeDelivery: Math.max(95, Math.min(100, prev.onTimeDelivery + (Math.random() - 0.5) * 0.3))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const modules = [
    {
      title: "Demand Forecasting",
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      description: "AI-powered demand prediction with TFT models",
      link: "/demand-forecasting",
      color: "bg-blue-50 border-blue-200",
      darkColor: "bg-blue-900/20 border-blue-800"
    },
    {
      title: "Inventory Optimization",
      icon: <Package className="h-8 w-8 text-green-600" />,
      description: "Multi-echelon inventory optimization",
      link: "/inventory-optimization",
      color: "bg-green-50 border-green-200",
      darkColor: "bg-green-900/20 border-green-800"
    },
    {
      title: "Route Optimization",
      icon: <Truck className="h-8 w-8 text-purple-600" />,
      description: "Last-mile delivery optimization",
      link: "/route-optimization",
      color: "bg-purple-50 border-purple-200",
      darkColor: "bg-purple-900/20 border-purple-800"
    },
    {
      title: "Real-Time Monitoring",
      icon: <BarChart3 className="h-8 w-8 text-red-600" />,
      description: "Live supply chain monitoring",
      link: "/monitoring",
      color: "bg-red-50 border-red-200",
      darkColor: "bg-red-900/20 border-red-800"
    },
    {
      title: "Driver Interface",
      icon: <MapPin className="h-8 w-8 text-orange-600" />,
      description: "Mobile driver optimization app",
      link: "/driver",
      color: "bg-orange-50 border-orange-200",
      darkColor: "bg-orange-900/20 border-orange-800"
    },
    {
      title: "Analytics & Reporting",
      icon: <TrendingUp className="h-8 w-8 text-indigo-600" />,
      description: "Advanced analytics dashboard",
      link: "/analytics",
      color: "bg-indigo-50 border-indigo-200",
      darkColor: "bg-indigo-900/20 border-indigo-800"
    }
  ];

  const kpiCards = [
    {
      title: "Orders Processed",
      value: realTimeData.ordersProcessed.toLocaleString(),
      change: "+12.5%",
      icon: <Package className="h-6 w-6 text-blue-600" />,
      trend: "up"
    },
    {
      title: "Deliveries in Progress",
      value: realTimeData.deliveriesInProgress.toLocaleString(),
      change: "+3.2%",
      icon: <Truck className="h-6 w-6 text-green-600" />,
      trend: "up"
    },
    {
      title: "Forecast Accuracy",
      value: `${realTimeData.forecastAccuracy.toFixed(1)}%`,
      change: "+0.8%",
      icon: <Brain className="h-6 w-6 text-purple-600" />,
      trend: "up"
    },
    {
      title: "Cost Savings",
      value: `${realTimeData.costSavings.toFixed(1)}%`,
      change: "+2.1%",
      icon: <DollarSign className="h-6 w-6 text-red-600" />,
      trend: "up"
    },
    {
      title: "On-Time Delivery",
      value: `${realTimeData.onTimeDelivery.toFixed(1)}%`,
      change: "+1.2%",
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      trend: "up"
    },
    {
      title: "Inventory Turnover",
      value: realTimeData.inventoryTurnover.toFixed(1),
      change: "+0.3",
      icon: <BarChart3 className="h-6 w-6 text-orange-600" />,
      trend: "up"
    }
  ];

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Supply Chain Control Tower
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Real-time visibility and AI-powered optimization across your entire supply chain
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {kpiCards.map((kpi, index) => (
            <div key={index} className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">{kpi.icon}</div>
                <div className={`text-sm font-medium ${
                  kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {kpi.change}
                </div>
              </div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                {kpi.value}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {kpi.title}
              </div>
            </div>
          ))}
        </div>

        {/* Alerts */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Alerts
            </h2>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`flex items-center p-3 rounded-lg ${
                alert.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-400' :
                alert.type === 'success' ? 'bg-green-50 border-l-4 border-green-400' :
                'bg-blue-50 border-l-4 border-blue-400'
              }`}>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-600 mt-1">{alert.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <Link
              key={index}
              to={module.link}
              className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                darkMode ? module.darkColor : module.color
              }`}
            >
              <div className="flex items-center mb-4">
                {module.icon}
                <h3 className={`text-xl font-semibold ml-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {module.title}
                </h3>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                {module.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                Launch Module
                <Zap className="h-4 w-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;