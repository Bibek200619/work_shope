'use client';

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  delayClass?: string;
}

export function FeatureCard({ title, description, icon, delayClass = '' }: FeatureCardProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div 
      ref={ref}
      className={`group w-full h-[250px] perspective-1000 cursor-pointer reveal ${isVisible ? 'active' : ''} ${delayClass}`}
    >
      <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
        
        {/* Front of Card */}
        <div className="absolute w-full h-full backface-hidden glass flex flex-col items-center justify-center p-6 text-center border-white/10 hover:border-cyan-500/50 transition-colors">
          <div className="text-5xl mb-4">{icon}</div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-gray-400 text-sm mt-2 flex items-center gap-1">
            Hover to view <span className="text-cyan-400">→</span>
          </p>
        </div>

        {/* Back of Card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 glass-sm bg-cyan-900/20 border-cyan-500/50 flex flex-col items-center justify-center p-6 text-center shadow-[0_0_30px_rgba(0,243,255,0.15)]">
          <h3 className="text-xl font-bold text-cyan-300 mb-3">{title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {description}
          </p>
        </div>

      </div>
    </div>
  );
}
