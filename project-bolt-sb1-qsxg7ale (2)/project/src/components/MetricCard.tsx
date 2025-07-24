import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  format?: 'currency' | 'percent' | 'number';
  className?: string;
  icon?: React.ReactNode;
}

export default function MetricCard({
  title,
  value,
  change,
  changeLabel,
  format = 'number',
  className = '',
  icon
}: MetricCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case 'percent':
        return `${val}%`;
      default:
        return val.toLocaleString();
    }
  };

  const getTrendIcon = () => {
    if (change === undefined) return null;
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getTrendColor = () => {
    if (change === undefined) return 'text-gray-600';
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      
      <div className="flex items-baseline space-x-2">
        <p className="text-2xl font-semibold text-white">{formatValue(value)}</p>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-medium">
              {Math.abs(change).toFixed(2)}%
              {changeLabel && ` ${changeLabel}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}