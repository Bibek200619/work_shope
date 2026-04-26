'use client';

import React from 'react';

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* Base Grid */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          backgroundPosition: 'center center'
        }}
      />

      {/* SVG Noise Texture */}
      <svg className="absolute inset-0 z-10 w-full h-full opacity-[0.015] mix-blend-overlay">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Animated Blobs */}
      <div className="absolute top-[-10%] left-[20%] w-[900px] h-[600px] rounded-[100%] bg-[var(--accent)] opacity-10 blur-[120px] mix-blend-screen" style={{ animation: 'float-blob 12s ease-in-out infinite' }} />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[800px] rounded-[100%] bg-purple-500 opacity-10 blur-[100px] mix-blend-screen" style={{ animation: 'float-blob-reverse 15s ease-in-out infinite' }} />
      <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[500px] rounded-[100%] bg-blue-600 opacity-10 blur-[100px] mix-blend-screen" style={{ animation: 'float-blob 18s ease-in-out infinite' }} />
    </div>
  );
}
