'use client';

import React from 'react';
import { PredictionResult } from '@/contexts/SymptomContext';

interface ResultCardProps {
  result: PredictionResult;
  index: number;
}

export function ResultCard({ result, index }: ResultCardProps) {
  // Calculate color based on percentage
  const getColor = (percentage: number) => {
    if (percentage >= 70) return 'from-red-500 to-orange-500';
    if (percentage >= 50) return 'from-orange-500 to-yellow-500';
    if (percentage >= 30) return 'from-yellow-500 to-green-500';
    return 'from-green-500 to-emerald-500';
  };

  // Get confidence level text
  const getConfidenceLabel = (percentage: number) => {
    if (percentage >= 70) return 'High Confidence';
    if (percentage >= 50) return 'Moderate Confidence';
    if (percentage >= 30) return 'Low Confidence';
    return 'Very Low Confidence';
  };

  return (
    <div
      className="glass fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">
              {result.disease}
            </h3>
            <p className="text-sm text-gray-400">
              {getConfidenceLabel(result.percentage)}
            </p>
          </div>
          <div className="text-right ml-4">
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {result.percentage}%
            </div>
          </div>
        </div>

        {/* Percentage bar */}
        <div className="mb-4 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getColor(result.percentage)} transition-all duration-500`}
            style={{ width: `${result.percentage}%` }}
          />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 leading-relaxed">
          {result.description}
        </p>

        {/* Footer info */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-gray-500">
            🔍 This is an AI analysis. Always consult with a healthcare professional for diagnosis.
          </p>
        </div>
      </div>

      {/* Hover effect background */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
