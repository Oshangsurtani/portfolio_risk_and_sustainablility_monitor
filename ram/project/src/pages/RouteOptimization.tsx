import React, { useState, useEffect } from 'react';
import { Truck, MapPin, Clock, DollarSign, Zap, Navigation } from 'lucide-react';

interface RouteOptimizationProps {
  darkMode: boolean;
}

const RouteOptimization: React.FC<RouteOptimizationProps> = ({ darkMode }) => {
  const [optimizationMetrics, setOptimizationMetrics] = useState({
    costReduction: 20.3,
    timeReduction: 28.7,
    fuelSavings: 15.2,
    onTimeDelivery: 98.4,
    activeRoutes: 1247,
    completedDeliveries: 8934
  });

  const [activeRoutes, setActiveRoutes] = useState([
    { id: 1, driver: 'John Smith', vehicle: 'Truck-001', stops: 12, progress: 75, eta: '2:30 PM', efficiency: 94 },
    { id: 2, driver: 'Sarah Johnson', vehicle: 'Van-045', stops: 8, progress: 60, eta: '3:15 PM', efficiency: 88 },
    { id: 3, driver: 'Mike Wilson', vehicle: 'Truck-023', stops: 15, progress: 40, eta: '4:00 PM', efficiency: 92 },
    { id: 4, driver: 'Emma Davis', vehicle: 'Van-067', stops: 10, progress: 85, eta: '2:45 PM', efficiency: 96 }
  ]);

  const [deliveryZones, setDeliveryZones] = useState([
    { zone: 'North Dallas', routes: 45, avgTime: 32, efficiency: 94, status: 'optimal' },
    { zone: 'South Dallas', routes: 38, avgTime: 28, efficiency: 91, status: 'good' },
    { zone: 'East Dallas', routes: 42, avgTime: 35, efficiency: 87, status: 'needs_optimization' },
    { zone: 'West Dallas', routes: 51, avgTime: 30, efficiency: 96, status: 'optimal' }
  ]);

  const [droneDeliveries, setDroneDeliveries] = useState([
    { id: 1, destination: '1234 Elm St', distance: 2.3, eta: '14:25', status: 'in_transit', battery: 78 },
    { id: 2, destination: '5678 Oak Ave', distance: 1.8, eta: '14:30', status: 'preparing', battery: 92 },
    { id: 3, destination: '9012 Pine Rd', distance: 3.1, eta: '14:45', status: 'returning', battery: 45 },
    { id: 4, destination: '3456 Maple St', distance: 2.7, eta: '14:38', status: 'in_transit', battery: 67 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOptimizationMetrics(prev => ({
        ...prev,
        costReduction: Math.max(18, Math.min(25, prev.costReduction + (Math.random() - 0.5) * 0.3)),
        timeReduction: Math.max(25, Math.min(35, prev.timeReduction + (Math.random() - 0.5) * 0.5)),
        activeRoutes: prev.activeRoutes + Math.floor((Math.random() - 0.5) * 10),
        completedDeliveries: prev.completedDeliveries + Math.floor(Math.random() * 5)
      }));

      setActiveRoutes(prev => prev.map(route => ({
        ...route,
        progress: Math.min(100, route.progress + Math.floor(Math.random() * 5))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'needs_optimization': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDroneStatusColor = (status: string) => {
    switch (status) {
      case 'in_transit': return 'text-blue-600 bg-blue-100';
      case 'preparing': return 'text-yellow-600 bg-yellow-100';
      case 'returning': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Truck className="h-8 w-8 text-purple-600 mr-3" />
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Route Optimization
            </h1>
          </div>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Hybrid VRP solver with reinforcement learning for last-mile delivery
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-6 gap-6 mb-8">
          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-6 w-6 text-green-600" />
              <div className="text-sm font-medium text-green-500">+2.3%</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {optimizationMetrics.costReduction.toFixed(1)}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Cost Reduction
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
              <div className="text-sm font-medium text-green-500">+1.8%</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {optimizationMetrics.timeReduction.toFixed(1)}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Time Reduction
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <Zap className="h-6 w-6 text-yellow-600" />
              <div className="text-sm font-medium text-green-500">+0.9%</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {optimizationMetrics.fuelSavings.toFixed(1)}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Fuel Savings
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <Navigation className="h-6 w-6 text-purple-600" />
              <div className="text-sm font-medium text-green-500">+0.5%</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {optimizationMetrics.onTimeDelivery.toFixed(1)}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              On-Time Delivery
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <Truck className="h-6 w-6 text-red-600" />
              <div className="text-sm font-medium text-blue-500">Live</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {optimizationMetrics.activeRoutes}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Active Routes
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <MapPin className="h-6 w-6 text-indigo-600" />
              <div className="text-sm font-medium text-green-500">+47</div>
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {optimizationMetrics.completedDeliveries}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Completed Today
            </div>
          </div>
        </div>

        {/* Active Routes */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Active Routes
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Driver</th>
                  <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Vehicle</th>
                  <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Stops</th>
                  <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Progress</th>
                  <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>ETA</th>
                  <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {activeRoutes.map((route) => (
                  <tr key={route.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className={`py-4 px-4 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {route.driver}
                    </td>
                    <td className={`py-4 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {route.vehicle}
                    </td>
                    <td className={`py-4 px-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {route.stops}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${route.progress}%` }}
                          />
                        </div>
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {route.progress}%
                        </span>
                      </div>
                    </td>
                    <td className={`py-4 px-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {route.eta}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        route.efficiency >= 95 ? 'text-green-600 bg-green-100' :
                        route.efficiency >= 90 ? 'text-blue-600 bg-blue-100' :
                        'text-yellow-600 bg-yellow-100'
                      }`}>
                        {route.efficiency}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Delivery Zones */}
          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Delivery Zone Performance
            </h3>
            <div className="space-y-4">
              {deliveryZones.map((zone, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {zone.zone}
                    </h4>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(zone.status)}`}>
                      {zone.status.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Routes</div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{zone.routes}</div>
                    </div>
                    <div>
                      <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Time</div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{zone.avgTime}m</div>
                    </div>
                    <div>
                      <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Efficiency</div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{zone.efficiency}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drone Deliveries */}
          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Autonomous Drone Deliveries
            </h3>
            <div className="space-y-4">
              {droneDeliveries.map((drone) => (
                <div key={drone.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {drone.destination}
                    </div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDroneStatusColor(drone.status)}`}>
                      {drone.status.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Distance</div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{drone.distance} mi</div>
                    </div>
                    <div>
                      <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ETA</div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{drone.eta}</div>
                    </div>
                    <div>
                      <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Battery</div>
                      <div className={`font-medium ${
                        drone.battery > 60 ? 'text-green-600' : 
                        drone.battery > 30 ? 'text-yellow-600' : 'text-red-600'
                      }`}>{drone.battery}%</div>
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

export default RouteOptimization;