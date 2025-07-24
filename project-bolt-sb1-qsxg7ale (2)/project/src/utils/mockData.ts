import { Stock, ESGScore, RiskMetrics, SmartBetaFactors, PortfolioHolding, PortfolioData } from '../types/portfolio';

const SECTORS = ['Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer', 'Industrial', 'Materials', 'Utilities'];

const STOCK_NAMES = [
  { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer' },
  { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Technology' },
  { symbol: 'META', name: 'Meta Platforms Inc.', sector: 'Technology' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Technology' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', sector: 'Finance' },
  { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Finance' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare' },
  { symbol: 'V', name: 'Visa Inc.', sector: 'Finance' },
  { symbol: 'PG', name: 'Procter & Gamble', sector: 'Consumer' },
  { symbol: 'UNH', name: 'UnitedHealth Group', sector: 'Healthcare' },
  { symbol: 'HD', name: 'Home Depot Inc.', sector: 'Consumer' },
  { symbol: 'MA', name: 'Mastercard Inc.', sector: 'Finance' },
  { symbol: 'DIS', name: 'Walt Disney Company', sector: 'Consumer' },
  { symbol: 'ADBE', name: 'Adobe Inc.', sector: 'Technology' },
  { symbol: 'NFLX', name: 'Netflix Inc.', sector: 'Consumer' },
  { symbol: 'CRM', name: 'Salesforce Inc.', sector: 'Technology' },
  { symbol: 'XOM', name: 'Exxon Mobil Corp.', sector: 'Energy' },
];

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number): number {
  return Math.floor(random(min, max));
}

function generateStock(stockInfo: typeof STOCK_NAMES[0]): Stock {
  const price = random(50, 500);
  const change = random(-10, 10);
  
  return {
    symbol: stockInfo.symbol,
    name: stockInfo.name,
    price: Number(price.toFixed(2)),
    change: Number(change.toFixed(2)),
    changePercent: Number((change / price * 100).toFixed(2)),
    marketCap: random(50e9, 3000e9),
    volume: randomInt(1000000, 50000000),
    sector: stockInfo.sector,
    weight: 0, // Will be calculated later
  };
}

function generateESGScore(): ESGScore {
  const environmental = randomInt(60, 95);
  const social = randomInt(60, 95);
  const governance = randomInt(65, 95);
  const overall = Math.round((environmental + social + governance) / 3);
  
  let rating: ESGScore['rating'] = 'F';
  if (overall >= 90) rating = 'A';
  else if (overall >= 80) rating = 'B';
  else if (overall >= 70) rating = 'C';
  else if (overall >= 60) rating = 'D';
  
  return { environmental, social, governance, overall, rating };
}

function generateRiskMetrics(): RiskMetrics {
  return {
    var95: Number(random(0.02, 0.08).toFixed(4)),
    var99: Number(random(0.04, 0.12).toFixed(4)),
    volatility: Number(random(0.15, 0.45).toFixed(3)),
    sharpeRatio: Number(random(0.8, 2.5).toFixed(2)),
    maxDrawdown: Number(random(0.05, 0.25).toFixed(3)),
    beta: Number(random(0.6, 1.4).toFixed(2)),
  };
}

function generateSmartBetaFactors(): SmartBetaFactors {
  return {
    size: Number(random(-0.3, 0.3).toFixed(3)),
    value: Number(random(-0.2, 0.4).toFixed(3)),
    quality: Number(random(-0.1, 0.5).toFixed(3)),
    momentum: Number(random(-0.4, 0.4).toFixed(3)),
    lowVolatility: Number(random(-0.2, 0.3).toFixed(3)),
  };
}

export function generateMockPortfolio(): PortfolioData {
  const holdings: PortfolioHolding[] = [];
  let totalValue = 0;
  
  // Generate holdings for top 20 stocks
  for (let i = 0; i < 20; i++) {
    const stock = generateStock(STOCK_NAMES[i]);
    const quantity = randomInt(10, 1000);
    const value = stock.price * quantity;
    
    holdings.push({
      stock,
      quantity,
      value,
      weight: 0, // Will be calculated after we know total value
      esgScore: generateESGScore(),
      riskMetrics: generateRiskMetrics(),
      smartBetaFactors: generateSmartBetaFactors(),
    });
    
    totalValue += value;
  }
  
  // Calculate weights
  holdings.forEach(holding => {
    holding.weight = Number((holding.value / totalValue * 100).toFixed(2));
    holding.stock.weight = holding.weight;
  });
  
  // Sort by weight (largest holdings first)
  holdings.sort((a, b) => b.weight - a.weight);
  
  // Calculate overall metrics
  const overallESG: ESGScore = {
    environmental: Math.round(holdings.reduce((sum, h) => sum + h.esgScore.environmental * h.weight / 100, 0)),
    social: Math.round(holdings.reduce((sum, h) => sum + h.esgScore.social * h.weight / 100, 0)),
    governance: Math.round(holdings.reduce((sum, h) => sum + h.esgScore.governance * h.weight / 100, 0)),
    overall: 0,
    rating: 'B',
  };
  overallESG.overall = Math.round((overallESG.environmental + overallESG.social + overallESG.governance) / 3);
  
  const overallRisk: RiskMetrics = {
    var95: Number(holdings.reduce((sum, h) => sum + h.riskMetrics.var95 * h.weight / 100, 0).toFixed(4)),
    var99: Number(holdings.reduce((sum, h) => sum + h.riskMetrics.var99 * h.weight / 100, 0).toFixed(4)),
    volatility: Number(holdings.reduce((sum, h) => sum + h.riskMetrics.volatility * h.weight / 100, 0).toFixed(3)),
    sharpeRatio: Number(holdings.reduce((sum, h) => sum + h.riskMetrics.sharpeRatio * h.weight / 100, 0).toFixed(2)),
    maxDrawdown: Number(holdings.reduce((sum, h) => sum + h.riskMetrics.maxDrawdown * h.weight / 100, 0).toFixed(3)),
    beta: Number(holdings.reduce((sum, h) => sum + h.riskMetrics.beta * h.weight / 100, 0).toFixed(2)),
  };
  
  const factorExposure: SmartBetaFactors = {
    size: Number(holdings.reduce((sum, h) => sum + h.smartBetaFactors.size * h.weight / 100, 0).toFixed(3)),
    value: Number(holdings.reduce((sum, h) => sum + h.smartBetaFactors.value * h.weight / 100, 0).toFixed(3)),
    quality: Number(holdings.reduce((sum, h) => sum + h.smartBetaFactors.quality * h.weight / 100, 0).toFixed(3)),
    momentum: Number(holdings.reduce((sum, h) => sum + h.smartBetaFactors.momentum * h.weight / 100, 0).toFixed(3)),
    lowVolatility: Number(holdings.reduce((sum, h) => sum + h.smartBetaFactors.lowVolatility * h.weight / 100, 0).toFixed(3)),
  };
  
  return {
    totalValue,
    totalReturn: random(-50000, 200000),
    totalReturnPercent: random(-5, 15),
    holdings,
    overallESG,
    overallRisk,
    factorExposure,
  };
}

export function generateHistoricalData(days: number = 365) {
  const data = [];
  let value = 1000000; // Start with $1M portfolio
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Random walk with slight upward bias
    const dailyReturn = random(-0.03, 0.035);
    value *= (1 + dailyReturn);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value),
      return: dailyReturn,
    });
  }
  
  return data;
}