import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  TrendingUp, 
  Package, 
  Truck, 
  Brain, 
  Target, 
  Zap, 
  Shield,
  BarChart3,
  Clock,
  DollarSign
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Demand Forecasting",
      description: "Temporal Fusion Transformer models achieve <7% MAPE accuracy across millions of SKUs"
    },
    {
      icon: <Package className="h-8 w-8 text-green-600" />,
      title: "Smart Inventory Optimization",
      description: "Multi-echelon optimization reduces inventory costs by 15% while maintaining 99.5% in-stock levels"
    },
    {
      icon: <Truck className="h-8 w-8 text-purple-600" />,
      title: "Last-Mile Route Optimization",
      description: "Hybrid VRP solver with RL reduces delivery costs by 20% and improves on-time delivery to 98%"
    },
    {
      icon: <Target className="h-8 w-8 text-red-600" />,
      title: "Real-Time Anomaly Detection",
      description: "Graph-based models reduce supply chain disruptions by 45% through proactive intervention"
    }
  ];

  const metrics = [
    { value: "<7%", label: "MAPE Forecast Accuracy", icon: <TrendingUp className="h-6 w-6" /> },
    { value: "15%", label: "Inventory Cost Reduction", icon: <DollarSign className="h-6 w-6" /> },
    { value: "20%", label: "Delivery Cost Savings", icon: <Truck className="h-6 w-6" /> },
    { value: "99.9%", label: "System Uptime", icon: <Shield className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              AI-Optimized Supply Chain
              <span className="block text-yellow-400">for Walmart Scale</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your retail operations with advanced AI, predictive analytics, and real-time optimization. 
              From demand forecasting to last-mile delivery, achieve unprecedented efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg bg-yellow-500 text-blue-900 hover:bg-yellow-400 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Launch Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="https://walmart-supply-chain-api.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-blue-900 transition-all duration-200"
              >
                View API Docs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                    {metric.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-900 mb-2">{metric.value}</div>
                <div className="text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Supply Chain Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every component of your supply chain, powered by cutting-edge AI and optimized for real-world performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Walmart Use Cases Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Walmart's Scale
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Specifically designed to handle 10,000+ stores, millions of SKUs, and complex multi-echelon supply chains
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-800 rounded-xl p-6 hover:bg-blue-700 transition-colors duration-300">
              <BarChart3 className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Demand Forecasting</h3>
              <p className="text-blue-200">
                Predict demand across millions of SKUs with weather, events, and promotional data integration
              </p>
            </div>
            <div className="bg-blue-800 rounded-xl p-6 hover:bg-blue-700 transition-colors duration-300">
              <Package className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Smart Warehouses</h3>
              <p className="text-blue-200">
                Optimize picking routes and inventory placement across distribution centers
              </p>
            </div>
            <div className="bg-blue-800 rounded-xl p-6 hover:bg-blue-700 transition-colors duration-300">
              <Truck className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Last-Mile Delivery</h3>
              <p className="text-blue-200">
                Optimize Walmart+ deliveries and grocery pickup with autonomous and drone solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-xl text-blue-800 mb-8">
            Experience the future of retail operations with our AI-powered platform
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;