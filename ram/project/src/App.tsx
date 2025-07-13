import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DeployButton from './components/DeployButton';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DemandForecasting from './pages/DemandForecasting';
import InventoryOptimization from './pages/InventoryOptimization';
import RouteOptimization from './pages/RouteOptimization';
import RealtimeMonitoring from './pages/RealtimeMonitoring';
import DriverInterface from './pages/DriverInterface';
import Analytics from './pages/Analytics';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <DeployButton />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
          <Route path="/demand-forecasting" element={<DemandForecasting darkMode={darkMode} />} />
          <Route path="/inventory-optimization" element={<InventoryOptimization darkMode={darkMode} />} />
          <Route path="/route-optimization" element={<RouteOptimization darkMode={darkMode} />} />
          <Route path="/monitoring" element={<RealtimeMonitoring darkMode={darkMode} />} />
          <Route path="/driver" element={<DriverInterface darkMode={darkMode} />} />
          <Route path="/analytics" element={<Analytics darkMode={darkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;