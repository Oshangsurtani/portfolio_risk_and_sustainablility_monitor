export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  volume: number;
  sector: string;
  weight: number;
}

export interface ESGScore {
  environmental: number;
  social: number;
  governance: number;
  overall: number;
  rating: 'A' | 'B' | 'C' | 'D' | 'F';
}

export interface RiskMetrics {
  var95: number;
  var99: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
  beta: number;
}

export interface SmartBetaFactors {
  size: number;
  value: number;
  quality: number;
  momentum: number;
  lowVolatility: number;
}

export interface PortfolioHolding {
  stock: Stock;
  quantity: number;
  value: number;
  weight: number;
  esgScore: ESGScore;
  riskMetrics: RiskMetrics;
  smartBetaFactors: SmartBetaFactors;
}

export interface PortfolioData {
  totalValue: number;
  totalReturn: number;
  totalReturnPercent: number;
  holdings: PortfolioHolding[];
  overallESG: ESGScore;
  overallRisk: RiskMetrics;
  factorExposure: SmartBetaFactors;
}