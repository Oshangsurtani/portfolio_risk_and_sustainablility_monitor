import React from 'react';

interface FactorExposureChartProps {
  factors: {
    size: number;
    value: number;
    quality: number;
    momentum: number;
    lowVolatility: number;
  };
}

export default function FactorExposureChart({ factors }: FactorExposureChartProps) {
  const factorData = [
    { name: 'Size', value: factors.size, color: 'bg-blue-500' },
    { name: 'Value', value: factors.value, color: 'bg-green-500' },
    { name: 'Quality', value: factors.quality, color: 'bg-purple-500' },
    { name: 'Momentum', value: factors.momentum, color: 'bg-orange-500' },
    { name: 'Low Vol', value: factors.lowVolatility, color: 'bg-cyan-500' },
  ];

  const maxAbsValue = Math.max(...factorData.map(f => Math.abs(f.value)));
  const scale = maxAbsValue > 0 ? 100 / maxAbsValue : 1;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Smart Beta Factor Exposure</h3>
      
      <div className="space-y-4">
        {factorData.map((factor) => {
          const barWidth = Math.abs(factor.value) * scale;
          const isNegative = factor.value < 0;
          
          return (
            <div key={factor.name} className="flex items-center">
              <div className="w-16 text-sm text-gray-300 text-right mr-4">
                {factor.name}
              </div>
              
              <div className="flex-1 relative">
                <div className="h-6 bg-gray-700 rounded relative overflow-hidden">
                  <div 
                    className={`h-full ${factor.color} transition-all duration-1000 ease-out ${
                      isNegative ? 'ml-auto' : ''
                    }`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-white">
                    {factor.value > 0 ? '+' : ''}{factor.value.toFixed(3)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        Positive values indicate overweight exposure, negative values indicate underweight
      </div>
    </div>
  );
}