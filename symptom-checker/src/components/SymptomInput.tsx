'use client';

import React, { useState } from 'react';
import { useSymptom } from '@/contexts/SymptomContext';

export function SymptomInput() {
  const { symptoms, addSymptom, removeSymptom } = useSymptom();
  const [input, setInput] = useState('');

  const handleAddSymptom = () => {
    if (input.trim()) {
      addSymptom(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddSymptom();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    const items = text.split(/[,;]/).map(s => s.trim()).filter(Boolean);
    items.forEach(item => addSymptom(item));
  };

  // Suggested symptoms
  const suggestedSymptoms = [
    'Fever',
    'Cough',
    'Headache',
    'Sore Throat',
    'Fatigue',
    'Nausea',
  ];

  return (
    <div className="w-full">
      {/* Input Field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Enter Your Symptoms
        </label>
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            onPaste={handlePaste}
            placeholder="Type symptoms (e.g., fever, cough, headache) and press Enter"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 outline-none"
          />
          <button
            onClick={handleAddSymptom}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors duration-300"
          >
            Add
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Separate multiple symptoms with commas. Paste a list to add all at once.
        </p>
      </div>

      {/* Symptoms Chips */}
      {symptoms.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Selected Symptoms ({symptoms.length})
          </label>
          <div className="flex flex-wrap gap-2">
            {symptoms.map((symptom) => (
              <div
                key={symptom}
                className="glass-sm inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 rounded-full fade-in-up"
              >
                <span className="text-sm text-white capitalize">
                  {symptom.replace(/_/g, ' ')}
                </span>
                <button
                  onClick={() => removeSymptom(symptom)}
                  className="ml-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
                  aria-label={`Remove ${symptom}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Symptoms */}
      <div className="glass-sm p-4">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Quick Add (Common Symptoms)
        </label>
        <div className="flex flex-wrap gap-2">
          {suggestedSymptoms.map((symptom) => {
            const isAdded = symptoms.includes(symptom.toLowerCase());
            return (
              <button
                key={symptom}
                onClick={() => !isAdded && addSymptom(symptom)}
                disabled={isAdded}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${
                    isAdded
                      ? 'bg-green-500/30 border border-green-500/50 text-green-300 cursor-default'
                      : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 cursor-pointer'
                  }
                `}
              >
                {isAdded ? '✓ ' : '+ '}
                {symptom}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
