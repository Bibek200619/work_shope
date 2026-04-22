'use client';

import React from 'react';

export function Disclaimer() {
  return (
    <div className="glass-sm bg-blue-950/30 border-blue-600/30 p-4 rounded-lg">
      <div className="flex gap-3 items-start">
        <span className="text-2xl flex-shrink-0 mt-1">⚖️</span>
        <div>
          <p className="font-semibold text-blue-200 mb-1">Medical Disclaimer</p>
          <p className="text-sm text-blue-200/80 leading-relaxed">
            This is an AI-powered health screening tool and is <strong>NOT a substitute for professional medical diagnosis, treatment, or advice</strong>. The results are generated for informational purposes only based on the symptoms you provide. Always consult with a qualified healthcare professional for proper diagnosis and treatment. In case of emergency, call 911 or your local emergency number immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
