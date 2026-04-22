'use client';

import React from 'react';
import { SymptomCheckerState } from '@/contexts/SymptomContext';

interface RiskBadgeProps {
  riskLevel: SymptomCheckerState['riskLevel'];
  size?: 'sm' | 'md' | 'lg';
}

export function RiskBadge({ riskLevel, size = 'md' }: RiskBadgeProps) {
  if (!riskLevel) return null;

  const getRiskStyles = () => {
    switch (riskLevel) {
      case 'LOW':
        return {
          bg: 'bg-emerald-500/20',
          border: 'border-emerald-500/50',
          text: 'text-emerald-300',
          icon: '🟢',
          label: 'Low Risk',
        };
      case 'MEDIUM':
        return {
          bg: 'bg-yellow-500/20',
          border: 'border-yellow-500/50',
          text: 'text-yellow-300',
          icon: '🟡',
          label: 'Medium Risk',
        };
      case 'HIGH':
        return {
          bg: 'bg-red-500/20',
          border: 'border-red-500/50',
          text: 'text-red-300',
          icon: '🔴',
          label: 'High Risk',
        };
      case 'EMERGENCY':
        return {
          bg: 'bg-red-900/40',
          border: 'border-red-600/70',
          text: 'text-red-200',
          icon: '🚨',
          label: 'Emergency',
        };
      default:
        return {
          bg: 'bg-gray-500/20',
          border: 'border-gray-500/50',
          text: 'text-gray-300',
          icon: '❓',
          label: 'Unknown',
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  const styles = getRiskStyles();

  return (
    <div
      className={`
        inline-flex items-center gap-2
        ${getSizeClasses()}
        ${styles.bg} ${styles.border}
        border rounded-full
        ${styles.text} font-semibold
        backdrop-blur-sm
        transition-all duration-300
        ${riskLevel === 'EMERGENCY' ? 'pulse-glow animate-pulse' : ''}
      `}
    >
      <span className="text-xl">{styles.icon}</span>
      <span>{styles.label}</span>
    </div>
  );
}
