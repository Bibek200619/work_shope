'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar, SymptomInput, Loader, Disclaimer, EmergencyModal, AmbientBackground, SpotlightCard, Button } from '@/components';
import { useSymptom } from '@/contexts/SymptomContext';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export default function DashboardPage() {
  const router = useRouter();
  const { symptoms, setLoading, setResults, isLoading, riskLevel } = useSymptom();
  const [showEmergency, setShowEmergency] = useState(false);
  
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
      } else {
        setUser(session.user);
        setAuthLoading(false);
      }
    };
    checkUser();
  }, [router]);

  const handleCheckSymptoms = async () => {
    if (symptoms.length === 0) {
      alert('Please enter at least one symptom');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze symptoms');
      }

      const data = await response.json();
      setResults(data.predicted_diseases, data.risk_level, data.reasoning, data.recommendation);

      if (user) {
        const { error: dbError } = await supabase
          .from('predictions')
          .insert({
            user_id: user.id,
            symptoms: symptoms,
            predicted_diseases: data.predicted_diseases,
            risk_score: data.risk_score,
            risk_level: data.risk_level,
            reasoning: data.reasoning
          });

        if (dbError) console.error("Error saving prediction:", dbError);

        if (data.risk_level === 'EMERGENCY') {
          await supabase.from('emergency_logs').insert({
            user_id: user.id,
            symptoms: symptoms,
            risk_score: data.risk_score,
            action_taken: 'Triggered Emergency Modal Warning'
          });
          setShowEmergency(true);
        } else {
          setTimeout(() => router.push('/results'), 500);
        }
      }

    } catch (error: any) {
      console.error(error);
      alert(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--bg-base)]">
        <Loader />
      </div>
    );
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <>
      <AmbientBackground />
      <Navbar />
      
      <main className="flex-1 overflow-auto relative z-10 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-10 fade-in-up border-b border-[var(--border-default)] pb-8">
            <h1 className="text-3xl font-semibold mb-2 tracking-tight">
              Welcome back, {displayName}
            </h1>
            <p className="text-[var(--fg-muted)]">
              Enter your symptoms below to initialize the AI analysis sequence.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-8 space-y-8 fade-in-up delay-100">
              <SpotlightCard className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8 border-b border-[var(--border-default)] pb-4">
                  <span className="text-xl text-[var(--accent)] font-mono">⌘</span>
                  <h2 className="text-xl font-semibold tracking-tight">New Symptom Check</h2>
                </div>
                
                <div className="bg-[#0F0F12] rounded-xl p-6 border border-[var(--border-default)] mb-8">
                  <SymptomInput />
                </div>

                <Button
                  onClick={handleCheckSymptoms}
                  disabled={symptoms.length === 0 || isLoading}
                  fullWidth
                  className="py-4 text-base"
                >
                  {isLoading ? 'Analyzing Data...' : 'Execute Analysis'}
                </Button>

                {isLoading && <div className="mt-8 flex justify-center"><Loader /></div>}
              </SpotlightCard>
              
              <Disclaimer />
            </div>

            <div className="lg:col-span-4 space-y-8 fade-in-up delay-200">
              
              <SpotlightCard className="p-8 text-center" glowColor="rgba(255,255,255,0.05)">
                <div className="w-16 h-16 rounded-full bg-[var(--surface)] mx-auto flex items-center justify-center mb-4 text-xl font-semibold border border-[var(--border-default)] text-[var(--fg-primary)]">
                  {initial}
                </div>
                <h4 className="font-semibold mb-1 tracking-tight">{displayName}</h4>
                <p className="text-sm text-[var(--fg-muted)] mb-6">{user?.email}</p>
                
                <div className="grid grid-cols-2 gap-4 border-t border-[var(--border-default)] pt-6">
                  <div>
                    <div className="text-2xl font-semibold text-[var(--fg-primary)] mb-1">12</div>
                    <div className="text-xs text-[var(--fg-muted)] font-mono uppercase tracking-widest">Checks</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-[var(--accent)] mb-1">3</div>
                    <div className="text-xs text-[var(--fg-muted)] font-mono uppercase tracking-widest">This Month</div>
                  </div>
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-8" glowColor="rgba(255,255,255,0.05)">
                <h3 className="text-base font-semibold mb-6 flex items-center justify-between">
                  Activity Log
                  <span className="text-[var(--accent)] text-xs font-mono uppercase tracking-widest">Live</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border-default)] hover:border-[var(--border-hover)] transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-[var(--fg-primary)]">Headache, fever</span>
                      <span className="text-xs font-mono text-[var(--fg-muted)]">2d</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--risk-medium)]" />
                      <span className="text-xs text-[var(--fg-subtle)] font-mono uppercase">Medium</span>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border-default)] hover:border-[var(--border-hover)] transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-[var(--fg-primary)]">Sore throat</span>
                      <span className="text-xs font-mono text-[var(--fg-muted)]">1w</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--risk-low)]" />
                      <span className="text-xs text-[var(--fg-subtle)] font-mono uppercase">Low</span>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="secondary"
                  fullWidth
                  className="mt-6 text-xs"
                  onClick={() => router.push('/history')}
                >
                  View Full Logs
                </Button>
              </SpotlightCard>

            </div>
          </div>
        </div>
      </main>

      <EmergencyModal
        isOpen={showEmergency && riskLevel === 'EMERGENCY'}
        onClose={() => {
          setShowEmergency(false);
          setTimeout(() => router.push('/results'), 500);
        }}
      />
    </>
  );
}
