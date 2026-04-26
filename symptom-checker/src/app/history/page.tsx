'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar, Loader, AmbientBackground, SpotlightCard, Button } from '@/components';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface Prediction {
  id: string;
  created_at: string;
  symptoms: string[];
  predicted_diseases: Array<{ name: string; probability: number; description: string }>;
  risk_level: string;
  risk_score: number;
}

export default function HistoryPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [history, setHistory] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (!user) return;
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('predictions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setHistory(data || []);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--bg-base)]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <AmbientBackground />
      <Navbar />

      <main className="flex-1 overflow-auto relative z-10 py-10 fade-in-up">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="mb-10 border-b border-[var(--border-default)] pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold mb-2 tracking-tight">System Logs</h1>
              <p className="text-[var(--fg-muted)] text-sm">Historical symptom analysis and predictions.</p>
            </div>
            <Button variant="secondary" onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center">
              <Loader />
            </div>
          ) : history.length === 0 ? (
            <SpotlightCard className="p-12 text-center border-dashed">
              <div className="text-4xl mb-4 opacity-50">📭</div>
              <h3 className="text-xl font-semibold mb-2">No Records Found</h3>
              <p className="text-[var(--fg-muted)] mb-6 text-sm">You haven't initialized any symptom checks yet.</p>
              <Button onClick={() => router.push('/dashboard')}>
                Start Analysis
              </Button>
            </SpotlightCard>
          ) : (
            <div className="space-y-6">
              {history.map((record) => {
                const date = new Date(record.created_at).toLocaleDateString(undefined, {
                  year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                });

                const isEmergency = record.risk_level === 'EMERGENCY';
                const colorVar = isEmergency ? 'var(--risk-emergency)' :
                                 record.risk_level === 'HIGH' ? 'var(--risk-high)' :
                                 record.risk_level === 'MEDIUM' ? 'var(--risk-medium)' :
                                 'var(--risk-low)';

                return (
                  <SpotlightCard key={record.id} className="p-6">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                      <div>
                        <span className="text-xs text-[var(--fg-subtle)] font-mono tracking-widest uppercase mb-3 block">
                          {date}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {record.symptoms?.map((s, idx) => (
                            <span key={idx} className="px-3 py-1 rounded-md bg-[#0F0F12] border border-[var(--border-default)] text-sm text-[var(--fg-primary)] shadow-inner">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 border border-[var(--border-default)] bg-[var(--surface)] px-3 py-1.5 rounded-full">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colorVar, boxShadow: `0 0 10px ${colorVar}` }} />
                        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: colorVar }}>
                          {record.risk_level}
                        </span>
                      </div>
                    </div>

                    {record.predicted_diseases && record.predicted_diseases.length > 0 && (
                      <div className="pt-6 border-t border-[var(--border-default)]">
                        <h4 className="text-xs font-mono text-[var(--fg-muted)] mb-4 uppercase tracking-widest">Neural Predictions</h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {record.predicted_diseases.map((disease, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-[#0F0F12] border border-[var(--border-default)] flex justify-between items-center transition-colors hover:border-[var(--border-hover)]">
                              <span className="text-sm font-medium">{disease.name}</span>
                              <span className="text-[var(--accent)] text-sm font-mono tracking-widest">
                                {Math.round(disease.probability * 100)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </SpotlightCard>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
