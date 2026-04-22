'use client';

import React from 'react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 fade-in-up"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="glass-lg bg-red-950/40 border-red-600/70 max-w-md w-full pointer-events-auto fade-in-up transform transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-8 text-center border-b border-red-600/30">
            <div className="text-6xl mb-4 animate-pulse">🚨</div>
            <h2 className="text-3xl font-bold text-red-200 mb-2">
              EMERGENCY
            </h2>
            <p className="text-red-300/80 text-sm">
              Based on your symptoms, this may be a medical emergency
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-200 font-semibold mb-2">
                ⚠️ Important:
              </p>
              <p className="text-red-200/90 text-sm leading-relaxed">
                This is an AI-based screening tool and is not a substitute for professional medical diagnosis. If you are experiencing any of the concerning symptoms, please:
              </p>
            </div>

            {/* Action items */}
            <div className="space-y-3 mb-6">
              <div className="flex gap-3 items-start">
                <span className="text-2xl flex-shrink-0">📞</span>
                <div>
                  <p className="font-semibold text-white mb-1">Call Emergency Services</p>
                  <p className="text-sm text-gray-300">Dial 911 (US) or your local emergency number</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl flex-shrink-0">🏥</span>
                <div>
                  <p className="font-semibold text-white mb-1">Go to the ER</p>
                  <p className="text-sm text-gray-300">Visit the nearest emergency room immediately</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl flex-shrink-0">👨‍⚕️</span>
                <div>
                  <p className="font-semibold text-white mb-1">Contact Your Doctor</p>
                  <p className="text-sm text-gray-300">Call your healthcare provider right away</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-6">
              <p className="text-yellow-200/80 text-xs leading-relaxed">
                <strong>Disclaimer:</strong> Do not delay emergency care to wait for medical AI analysis. This tool provides general information only and cannot diagnose medical conditions.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => window.open('tel:911')}
                className="flex-1 gradient-danger text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105"
              >
                🚑 Call 911
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
