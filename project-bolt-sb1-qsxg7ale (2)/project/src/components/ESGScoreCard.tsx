import React from 'react';
import { Leaf, Users, Shield } from 'lucide-react';

interface ESGScoreCardProps {
  esg: {
    environmental: number;
    social: number;
    governance: number;
    overall: number;
    rating: 'A' | 'B' | 'C' | 'D' | 'F';
  };
}

export default function ESGScoreCard({ esg }: ESGScoreCardProps) {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-blue-500';
      case 'C': return 'bg-yellow-500';
      case 'D': return 'bg-orange-500';
      case 'F': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">ESG Score</h3>
        <div className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getRatingColor(esg.rating)}`}>
          {esg.rating}
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-white mb-1">{esg.overall}</div>
        <div className="text-sm text-gray-400">Overall Score</div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">Environmental</span>
          </div>
          <span className={`font-semibold ${getScoreColor(esg.environmental)}`}>
            {esg.environmental}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Social</span>
          </div>
          <span className={`font-semibold ${getScoreColor(esg.social)}`}>
            {esg.social}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Governance</span>
          </div>
          <span className={`font-semibold ${getScoreColor(esg.governance)}`}>
            {esg.governance}
          </span>
        </div>
      </div>
    </div>
  );
}