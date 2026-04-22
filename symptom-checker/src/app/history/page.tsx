'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components';

export default function HistoryPage() {
  // This is a placeholder page. In a real app, this would fetch history from localStorage or a database
  const mockHistory = [
    {
      id: 1,
      symptoms: ['fever', 'cough', 'sore throat'],
      riskLevel: 'MEDIUM',
      date: new Date(Date.now() - 86400000),
      topDisease: 'Flu',
    },
    {
      id: 2,
      symptoms: ['headache', 'dizziness'],
      riskLevel: 'LOW',
      date: new Date(Date.now() - 172800000),
      topDisease: 'Tension Headache',
    },
  ];

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW':
        return 'border-emerald-500/50 bg-emerald-500/10';
      case 'MEDIUM':
        return 'border-yellow-500/50 bg-yellow-500/10';
      case 'HIGH':
        return 'border-red-500/50 bg-red-500/10';
      case 'EMERGENCY':
        return 'border-red-600/50 bg-red-600/10';
      default:
        return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW':
        return '🟢';
      case 'MEDIUM':
        return '🟡';
      case 'HIGH':
        return '🔴';
      case 'EMERGENCY':
        return '🚨';
      default:
        return '❓';
    }
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
              Analysis History
            </h1>
            <p className="text-lg text-gray-300">
              View your previous health screenings and analyses.
            </p>
          </div>

          {/* History Cards */}
          {mockHistory.length > 0 ? (
            <div className="space-y-4 mb-12">
              {mockHistory.map((item, index) => (
                <div
                  key={item.id}
                  className="glass fade-in-up p-6 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`px-3 py-1 rounded-full border text-sm font-semibold ${getRiskColor(item.riskLevel)}`}>
                          <span>{getRiskIcon(item.riskLevel)} {item.riskLevel}</span>
                        </div>
                        <span className="text-sm text-gray-400">{formatDate(item.date)}</span>
                      </div>

                      <p className="text-white font-semibold mb-2">
                        Top Prediction: <span className="text-blue-300">{item.topDisease}</span>
                      </p>

                      <p className="text-sm text-gray-400">
                        Symptoms: <span className="text-gray-300">{item.symptoms.join(', ')}</span>
                      </p>
                    </div>

                    <button className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/50 text-blue-300 hover:bg-blue-500/30 transition-all duration-300 whitespace-nowrap">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass p-12 text-center fade-in-up">
              <div className="text-5xl mb-4">📋</div>
              <h2 className="text-2xl font-bold text-white mb-2">No History Yet</h2>
              <p className="text-gray-400 mb-6">
                Start by analyzing your symptoms to build your health screening history.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 rounded-lg bg-gradient-primary text-white font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              >
                Start New Analysis
              </Link>
            </div>
          )}

          {/* Info Section */}
          <div className="glass p-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold text-white mb-4">📌 About Your History</h3>
            <p className="text-gray-300 mb-4">
              Your analysis history helps you track health patterns over time. Each analysis includes:
            </p>
            <ul className="space-y-2 text-gray-300 ml-4">
              <li>✓ Symptoms entered</li>
              <li>✓ Risk level assessment</li>
              <li>✓ Top disease predictions</li>
              <li>✓ Date and time of analysis</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 px-4 text-center text-gray-400 text-sm mt-12">
          <p>
            © 2024 MediAssist. This tool is for informational purposes only.
          </p>
        </footer>
      </main>
    </>
  );
}
