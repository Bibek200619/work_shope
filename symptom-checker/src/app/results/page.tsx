'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar, ResultCard, RiskBadge, Disclaimer, EmergencyModal } from '@/components';
import { useSymptom } from '@/contexts/SymptomContext';

export default function ResultsPage() {
  const router = useRouter();
  const { symptoms, results, riskLevel, reasoning, recommendation, reset } = useSymptom();
  const [showEmergency, setShowEmergency] = useState(false);

  React.useEffect(() => {
    if (!results) {
      router.push('/');
      return;
    }
    if (riskLevel === 'EMERGENCY') {
      setShowEmergency(true);
    }
  }, [results, riskLevel, router]);

  if (!results) {
    return (
      <>
        <Navbar />
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </>
    );
  }

  const handleNewAnalysis = () => {
    reset();
    router.push('/');
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12 fade-in-up">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
            >
              ← Back to Home
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Analysis Results
            </h1>
            <p className="text-lg text-gray-300">
              Based on your symptoms: <span className="text-blue-300 font-semibold">{symptoms.join(', ')}</span>
            </p>
          </div>

          {/* Risk Level Card */}
          <div className="glass-lg p-8 mb-8 fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Risk Assessment</h2>
                <p className="text-gray-300 mb-4">
                  Your symptoms indicate a <strong>{riskLevel?.toLowerCase()}</strong> risk level. Please review the analysis below and take appropriate action.
                </p>
              </div>
              <RiskBadge riskLevel={riskLevel} size="lg" />
            </div>
          </div>

          {/* Recommendation Card */}
          <div className={`
            glass-lg p-8 mb-8 fade-in-up border-l-4
            ${riskLevel === 'EMERGENCY' ? 'border-red-600' : ''}
            ${riskLevel === 'HIGH' ? 'border-orange-600' : ''}
            ${riskLevel === 'MEDIUM' ? 'border-yellow-600' : ''}
            ${riskLevel === 'LOW' ? 'border-green-600' : ''}
          `} style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold text-white mb-4">💡 Recommended Action</h3>
            <p className="text-lg text-gray-200 mb-4 leading-relaxed">{recommendation}</p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-sm text-gray-400">
                Remember: Always consult with a qualified healthcare professional for proper diagnosis and treatment. This AI analysis is for informational purposes only.
              </p>
            </div>
          </div>

          {/* AI Reasoning */}
          <div className="glass-lg p-8 mb-8 fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-2xl font-bold text-white mb-4">🧠 AI Reasoning</h3>
            <p className="text-gray-300 leading-relaxed">{reasoning}</p>
          </div>

          {/* Predicted Diseases */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">🦠 Top Predictions</h2>
            <div className="space-y-4">
              {results.map((result, index) => (
                <ResultCard key={index} result={result} index={index} />
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <Disclaimer />

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4 mt-12 fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={handleNewAnalysis}
              className="px-6 py-4 rounded-lg bg-gradient-primary text-white font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
            >
              📝 New Analysis
            </button>
            <Link
              href="/history"
              className="px-6 py-4 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition-all duration-300 text-center"
            >
              📜 View History
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 px-4 text-center text-gray-400 text-sm mt-12">
          <p>
            © 2024 MediAssist. For emergencies, call 911 or visit the nearest hospital.
          </p>
        </footer>
      </main>

      {/* Emergency Modal */}
      <EmergencyModal
        isOpen={showEmergency && riskLevel === 'EMERGENCY'}
        onClose={() => {
          setShowEmergency(false);
        }}
      />
    </>
  );
}
