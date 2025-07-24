import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, Shield, BarChart3, RefreshCw as Refresh } from 'lucide-react';
import MetricCard from './components/MetricCard';
import RiskGauge from './components/RiskGauge';
import ESGScoreCard from './components/ESGScoreCard';
import FactorExposureChart from './components/FactorExposureChart';
import HoldingsTable from './components/HoldingsTable';
import PerformanceChart from './components/PerformanceChart';
import { generateMockPortfolio, generateHistoricalData } from './utils/mockData';
import { PortfolioData } from './types/portfolio';

function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refreshData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPortfolio(generateMockPortfolio());
    setHistoricalData(generateHistoricalData());
    setLastUpdated(new Date());
    setLoading(false);
  };

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold">Portfolio Risk & Sustainability Monitor</h1>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
              <span>•</span>
              <span>200+ Equities Tracked</span>
              <span>•</span>
              <span>Real-time Analytics</span>
              <span>•</span>
              <span>AWS Mumbai (99.9% Uptime)</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right text-sm text-gray-400">
              <div>Last Updated</div>
              <div>{lastUpdated.toLocaleTimeString()}</div>
            </div>
            <button
              onClick={refreshData}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors"
            >
              <Refresh className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Portfolio Value"
            value={portfolio.totalValue}
            change={portfolio.totalReturnPercent}
            format="currency"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <MetricCard
            title="Total Return"
            value={portfolio.totalReturn}
            format="currency"
            icon={<BarChart3 className="w-5 h-5" />}
          />
          <MetricCard
            title="Risk Score"
            value={(portfolio.overallRisk.var95 * 1000).toFixed(0)}
            change={-2.3}
            changeLabel="vs benchmark"
            icon={<Shield className="w-5 h-5" />}
          />
          <MetricCard
            title="ESG Rating"
            value={portfolio.overallESG.rating}
            change={portfolio.overallESG.overall - 75}
            changeLabel="vs S&P 500"
          />
        </div>

        {/* Performance Chart */}
        <div className="mb-8">
          <PerformanceChart data={historicalData} />
        </div>

        {/* Risk & ESG Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Risk Gauges */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-6">Risk Metrics</h3>
            <div className="grid grid-cols-2 gap-6">
              <RiskGauge
                value={portfolio.overallRisk.var95}
                max={0.1}
                label="VaR 95%"
                format="percent"
              />
              <RiskGauge
                value={portfolio.overallRisk.var99}
                max={0.15}
                label="VaR 99%"
                format="percent"
              />
              <RiskGauge
                value={portfolio.overallRisk.volatility}
                max={0.5}
                label="Volatility"
                format="percent"
              />
              <RiskGauge
                value={portfolio.overallRisk.maxDrawdown}
                max={0.3}
                label="Max Drawdown"
                format="percent"
              />
            </div>
          </div>

          {/* ESG Score */}
          <ESGScoreCard esg={portfolio.overallESG} />

          {/* Additional Risk Metrics */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-6">Additional Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Sharpe Ratio</span>
                <span className="text-white font-semibold">{portfolio.overallRisk.sharpeRatio}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Beta</span>
                <span className="text-white font-semibold">{portfolio.overallRisk.beta}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Holdings Count</span>
                <span className="text-white font-semibold">{portfolio.holdings.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Diversification Score</span>
                <span className="text-green-400 font-semibold">85/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Factor Exposure */}
        <div className="mb-8">
          <FactorExposureChart factors={portfolio.factorExposure} />
        </div>

        {/* Holdings Table */}
        <HoldingsTable holdings={portfolio.holdings} />
      </main>
    </div>
  );
}

export default App;