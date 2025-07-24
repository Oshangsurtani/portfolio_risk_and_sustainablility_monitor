import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { PortfolioHolding } from '../types/portfolio';

interface HoldingsTableProps {
  holdings: PortfolioHolding[];
}

export default function HoldingsTable({ holdings }: HoldingsTableProps) {
  const [sortField, setSortField] = useState<keyof PortfolioHolding | 'symbol'>('weight');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof PortfolioHolding | 'symbol') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedHoldings = [...holdings].sort((a, b) => {
    let aValue: any, bValue: any;
    
    if (sortField === 'symbol') {
      aValue = a.stock.symbol;
      bValue = b.stock.symbol;
    } else if (sortField === 'weight') {
      aValue = a.weight;
      bValue = b.weight;
    } else if (sortField === 'value') {
      aValue = a.value;
      bValue = b.value;
    } else {
      return 0;
    }

    if (typeof aValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });

  const SortButton = ({ field, children }: { field: keyof PortfolioHolding | 'symbol', children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-left text-xs font-medium text-gray-400 hover:text-white transition-colors"
    >
      <span>{children}</span>
      {sortField === field && (
        sortDirection === 'asc' ? 
          <ChevronUp className="w-3 h-3" /> : 
          <ChevronDown className="w-3 h-3" />
      )}
    </button>
  );

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Portfolio Holdings</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th className="px-4 py-3 text-left">
                <SortButton field="symbol">Symbol</SortButton>
              </th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">Change</th>
              <th className="px-4 py-3 text-right">
                <SortButton field="weight">Weight</SortButton>
              </th>
              <th className="px-4 py-3 text-right">
                <SortButton field="value">Value</SortButton>
              </th>
              <th className="px-4 py-3 text-center">ESG</th>
              <th className="px-4 py-3 text-right">VaR 95%</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sortedHoldings.map((holding) => (
              <tr key={holding.stock.symbol} className="hover:bg-gray-750 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{holding.stock.symbol}</span>
                    <span className="text-xs text-gray-400">{holding.stock.sector}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-300">{holding.stock.name}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-white">${holding.stock.price.toFixed(2)}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex flex-col items-end">
                    <span className={`text-sm ${
                      holding.stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {holding.stock.change >= 0 ? '+' : ''}${holding.stock.change.toFixed(2)}
                    </span>
                    <span className={`text-xs ${
                      holding.stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {holding.stock.changePercent >= 0 ? '+' : ''}{holding.stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-white">{holding.weight.toFixed(2)}%</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-white">
                    ${holding.value.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    holding.esgScore.rating === 'A' ? 'bg-green-900 text-green-300' :
                    holding.esgScore.rating === 'B' ? 'bg-blue-900 text-blue-300' :
                    holding.esgScore.rating === 'C' ? 'bg-yellow-900 text-yellow-300' :
                    holding.esgScore.rating === 'D' ? 'bg-orange-900 text-orange-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {holding.esgScore.rating}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-white">
                    {(holding.riskMetrics.var95 * 100).toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}