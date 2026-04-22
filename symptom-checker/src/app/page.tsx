'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar, SymptomInput, Loader, Disclaimer, EmergencyModal } from '@/components';
import { useSymptom } from '@/contexts/SymptomContext';
import { analyzeSymptoms } from '@/lib/mockApi';

export default function Home() {
  const router = useRouter();
  const { symptoms, setLoading, setResults, isLoading, riskLevel } = useSymptom();
  const [showEmergency, setShowEmergency] = useState(false);

  const handleCheckSymptoms = async () => {
    if (symptoms.length === 0) {
      alert('Please enter at least one symptom');
      return;
    }

    setLoading(true);
    try {
      const { results, riskLevel, reasoning, recommendation } = await analyzeSymptoms(symptoms);
      setResults(results, riskLevel, reasoning, recommendation);

      if (riskLevel === 'EMERGENCY') {
        setShowEmergency(true);
      } else {
        // Navigate to results page
        setTimeout(() => {
          router.push('/results');
        }, 500);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-auto">
        {/* Hero Section */}
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="text-center mb-12 fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Your AI Health
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Companion
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-xl mx-auto">
                Describe your symptoms and get instant AI-powered insights. Fast, smart, and trustworthy health screening.
              </p>
            </div>

            {/* Main Card */}
            <div className="glass-lg p-8 md:p-12 mb-8">
              <SymptomInput />

              {/* Check Symptoms Button */}
              <button
                onClick={handleCheckSymptoms}
                disabled={symptoms.length === 0 || isLoading}
                className={`
                  w-full mt-8 py-4 px-6 rounded-xl font-bold text-lg
                  transition-all duration-300 transform
                  flex items-center justify-center gap-2
                  ${
                    symptoms.length === 0 || isLoading
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-gradient-primary text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95'
                  }
                `}
              >
                {isLoading ? (
                  <>
                    <span className="inline-block animate-spin">⏳</span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    👉 Check Symptoms
                  </>
                )}
              </button>

              {/* Loading State */}
              {isLoading && <Loader />}
            </div>

            {/* Disclaimer */}
            <Disclaimer />

            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-4 mt-12">
              {[
                {
                  icon: '⚡',
                  title: 'Instant Results',
                  description: 'Get AI analysis in seconds',
                },
                {
                  icon: '🔍',
                  title: 'Accurate Screening',
                  description: 'Advanced prediction algorithms',
                },
                {
                  icon: '🛡️',
                  title: 'Safe & Secure',
                  description: 'Your privacy is protected',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="glass-sm p-6 text-center hover:border-blue-500/50 transition-all duration-300 fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 px-4 text-center text-gray-400 text-sm">
          <p>
            © 2024 MediAssist. This tool is for informational purposes only. Always consult a healthcare professional.
          </p>
        </footer>
      </main>

      {/* Emergency Modal */}
      <EmergencyModal
        isOpen={showEmergency && riskLevel === 'EMERGENCY'}
        onClose={() => {
          setShowEmergency(false);
          setTimeout(() => {
            router.push('/results');
          }, 500);
        }}
      />
    </>
  );
}
