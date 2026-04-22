'use client';

import React from 'react';

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      {/* Animated spinner */}
      <div className="relative w-16 h-16">
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"
          style={{ animationDuration: '1.5s' }}
        />
        <div
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-cyan-500 border-l-blue-500 animate-spin"
          style={{ animationDuration: '2s', animationDirection: 'reverse' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-primary animate-pulse" />
        </div>
      </div>

      {/* Loading text */}
      <div className="text-center">
        <p className="text-lg font-semibold text-white mb-2">
          Analyzing your symptoms
        </p>
        <p className="text-sm text-gray-400">
          Using AI to predict possible conditions...
        </p>
      </div>

      {/* Pulse indicator */}
      <div className="flex gap-2 mt-4">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-blue-500"
            style={{
              animation: `pulse 1.5s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
