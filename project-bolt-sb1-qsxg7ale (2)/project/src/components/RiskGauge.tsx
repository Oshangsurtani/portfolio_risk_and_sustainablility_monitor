import React from 'react';

interface RiskGaugeProps {
  value: number;
  max: number;
  label: string;
  format?: 'percent' | 'number';
}

export default function RiskGauge({ value, max, label, format = 'percent' }: RiskGaugeProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getRiskColor = () => {
    if (percentage < 30) return '#10B981'; // Green
    if (percentage < 60) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  const formatValue = (val: number) => {
    if (format === 'percent') {
      return `${(val * 100).toFixed(2)}%`;
    }
    return val.toFixed(3);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="transform -rotate-90 w-24 h-24">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="rgba(75, 85, 99, 0.3)"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={getRiskColor()}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-white">
            {formatValue(value)}
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center">{label}</p>
    </div>
  );
}