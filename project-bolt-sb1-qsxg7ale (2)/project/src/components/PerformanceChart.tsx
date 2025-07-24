import React, { useState } from 'react';

interface PerformanceChartProps {
  data: Array<{
    date: string;
    value: number;
    return: number;
  }>;
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  const [timeframe, setTimeframe] = useState('1Y');

  const timeframes = [
    { label: '1M', days: 30 },
    { label: '3M', days: 90 },
    { label: '6M', days: 180 },
    { label: '1Y', days: 365 },
  ];

  const selectedTimeframe = timeframes.find(t => t.label === timeframe) || timeframes[3];
  const filteredData = data.slice(-selectedTimeframe.days);

  const minValue = Math.min(...filteredData.map(d => d.value));
  const maxValue = Math.max(...filteredData.map(d => d.value));
  const valueRange = maxValue - minValue;

  const getYPosition = (value: number) => {
    return 300 - ((value - minValue) / valueRange) * 280;
  };

  const pathData = filteredData.map((d, i) => {
    const x = (i / (filteredData.length - 1)) * 800;
    const y = getYPosition(d.value);
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(' ');

  const currentValue = filteredData[filteredData.length - 1]?.value || 0;
  const startValue = filteredData[0]?.value || 0;
  const totalReturn = ((currentValue - startValue) / startValue) * 100;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Portfolio Performance</h3>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-2xl font-bold text-white">
              ${currentValue.toLocaleString()}
            </span>
            <span className={`text-sm font-medium ${
              totalReturn >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="flex space-x-1 bg-gray-700 rounded-lg p-1">
          {timeframes.map((tf) => (
            <button
              key={tf.label}
              onClick={() => setTimeframe(tf.label)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                timeframe === tf.label
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-64">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 300"
          className="overflow-visible"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="80" height="60" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 60" fill="none" stroke="rgba(75, 85, 99, 0.2)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Area under curve */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0"/>
            </linearGradient>
          </defs>
          
          <path
            d={`${pathData} L 800 300 L 0 300 Z`}
            fill="url(#areaGradient)"
          />
          
          {/* Main line */}
          <path
            d={pathData}
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {filteredData.map((d, i) => {
            if (i % Math.ceil(filteredData.length / 10) !== 0 && i !== filteredData.length - 1) return null;
            
            const x = (i / (filteredData.length - 1)) * 800;
            const y = getYPosition(d.value);
            
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="rgb(59, 130, 246)"
                stroke="rgb(31, 41, 55)"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-16">
          <span>${Math.round(maxValue / 1000)}K</span>
          <span>${Math.round((minValue + maxValue) / 2 / 1000)}K</span>
          <span>${Math.round(minValue / 1000)}K</span>
        </div>
      </div>
    </div>
  );
}