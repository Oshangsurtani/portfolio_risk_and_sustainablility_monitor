import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Package, CheckCircle, AlertTriangle } from 'lucide-react';

interface DriverInterfaceProps {
  darkMode: boolean;
}

const DriverInterface: React.FC<DriverInterfaceProps> = ({ darkMode }) => {
  const [driverInfo, setDriverInfo] = useState({
    name: 'John Smith',
    vehicleId: 'Truck-001',
    routeId: 'RT-4721-001',
    completedDeliveries: 8,
    remainingDeliveries: 4,
    efficiency: 94,
    estimatedCompletion: '3:45 PM'
  });

  const [currentRoute, setCurrentRoute] = useState([
    { id: 1, address: '1234 Elm St, Dallas, TX', status: 'completed', priority: 'high', timeWindow: '2:00-2:30 PM' },
    { id: 2, address: '5678 Oak Ave, Dallas, TX', status: 'completed', priority: 'medium', timeWindow: '2:30-3:00 PM' },
    { id: 3, address: '9012 Pine Rd, Dallas, TX', status: 'in_progress', priority: 'high', timeWindow: '3:00-3:30 PM' },
    { id: 4, address: '3456 Maple St, Dallas, TX', status: 'pending', priority: 'low', timeWindow: '3:30-4:00 PM' },
    { id: 5, address: '7890 Cedar Ln, Dallas, TX', status: 'pending', priority: 'medium', timeWindow: '4:00-4:30 PM' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'Traffic delay detected on your route. ETA updated.', timestamp: '2:45 PM' },
    { id: 2, type: 'success', message: 'Delivery at 5678 Oak Ave completed successfully.', timestamp: '2:32 PM' },
    { id: 3, type: 'warning', message: 'Customer at 9012 Pine Rd requested delivery time change.', timestamp: '2:15 PM' }
  ]);

  const [vehicleStatus, setVehicleStatus] = useState({
    fuelLevel: 78,
    temperature: 72,
    mileage: 245.7,
    nextMaintenance: '1,200 mi'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDriverInfo(prev => ({
        ...prev,
        efficiency: Math.max(85, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 2))
      }));

      setVehicleStatus(prev => ({
        ...prev,
        fuelLevel: Math.max(20, Math.min(100, prev.fuelLevel + (Math.random() - 0.5) * 3)),
        temperature: Math.max(65, Math.min(80, prev.temperature + (Math.random() - 0.5) * 2)),
        mileage: prev.mileage + Math.random() * 0.5
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Navigation className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
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

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'info': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const handleCompleteDelivery = (deliveryId: number) => {
    setCurrentRoute(prev => prev.map(delivery => 
      delivery.id === deliveryId ? { ...delivery, status: 'completed' } : delivery
    ));
    setDriverInfo(prev => ({
      ...prev,
      completedDeliveries: prev.completedDeliveries + 1,
      remainingDeliveries: prev.remainingDeliveries - 1
    }));
  };

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Navigation className="h-8 w-8 text-orange-600 mr-3" />
            <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Driver Interface
            </h1>
          </div>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Optimized routes and real-time delivery tracking
          </p>
        </div>

        {/* Driver Status */}
        <div className={`mb-6 p-6 rounded-xl shadow-lg ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {driverInfo.name}
              </h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {driverInfo.vehicleId} • Route {driverInfo.routeId}
              </p>
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              driverInfo.efficiency >= 95 ? 'text-green-600 bg-green-100' :
              driverInfo.efficiency >= 90 ? 'text-blue-600 bg-blue-100' :
              'text-yellow-600 bg-yellow-100'
            }`}>
              {driverInfo.efficiency}% Efficiency
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {driverInfo.completedDeliveries}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Completed
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {driverInfo.remainingDeliveries}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Remaining
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {driverInfo.estimatedCompletion}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                ETA
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {vehicleStatus.mileage.toFixed(1)}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Miles
              </div>
            </div>
          </div>
        </div>

        {/* Current Route */}
        <div className={`mb-6 p-6 rounded-xl shadow-lg ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Today's Route
          </h3>
          <div className="space-y-3">
            {currentRoute.map((delivery) => (
              <div key={delivery.id} className={`p-4 rounded-lg border ${
                delivery.status === 'completed' ? 'bg-green-50 border-green-200' :
                delivery.status === 'in_progress' ? 'bg-blue-50 border-blue-200' :
                'bg-gray-50 border-gray-200'
              } ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${getStatusColor(delivery.status)}`}>
                      {getStatusIcon(delivery.status)}
                    </div>
                    <div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {delivery.address}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {delivery.timeWindow}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(delivery.priority)}`}>
                      {delivery.priority.toUpperCase()}
                    </div>
                    {delivery.status === 'in_progress' && (
                      <button
                        onClick={() => handleCompleteDelivery(delivery.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Vehicle Status */}
          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Vehicle Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Fuel Level</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        vehicleStatus.fuelLevel > 50 ? 'bg-green-600' :
                        vehicleStatus.fuelLevel > 25 ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${vehicleStatus.fuelLevel}%` }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {vehicleStatus.fuelLevel}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Temperature</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {vehicleStatus.temperature}°F
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Next Maintenance</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {vehicleStatus.nextMaintenance}
                </span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Notifications
            </h3>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-3 rounded-lg border-l-4 ${getNotificationColor(notification.type)}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {notification.message}
                  </p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {notification.timestamp}
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

export default DriverInterface;