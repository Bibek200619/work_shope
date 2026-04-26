'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar, AmbientBackground, SpotlightCard, Button } from '@/components';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function LandingPage() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  // Parallax Hero Effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroScale = Math.max(0.95, 1 - scrollY / 3000);
  const heroTranslateY = scrollY * 0.3;

  const { ref: featuresRef, isVisible: isFeaturesVisible } = useScrollReveal();
  const { ref: stepsRef, isVisible: isStepsVisible } = useScrollReveal(0.2);

  return (
    <>
      <AmbientBackground />
      <Navbar />
      
      <main className="overflow-x-hidden text-[var(--fg-primary)] selection:bg-[var(--accent)]/30">
        
        {/* --- CINEMATIC HERO SECTION --- */}
        <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6 pt-20 pb-32">
          <div 
            className="flex flex-col items-center text-center max-w-5xl z-10 fade-in-up"
            style={{ 
              opacity: heroOpacity, 
              transform: `scale(${heroScale}) translateY(${heroTranslateY}px)`,
              willChange: 'opacity, transform'
            }}
          >
            <div className="inline-flex items-center px-3 py-1 mb-10 rounded-full border border-[var(--border-default)] bg-[var(--surface)] text-[var(--fg-muted)] text-xs font-mono tracking-widest uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] mr-3 animate-pulse" />
              MediAssist Engine v2.0
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold mb-8 leading-[1.1] tracking-[-0.03em]">
              The intelligent OS for <br className="hidden md:block" />
              <span className="text-gradient-accent">personal health.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--fg-muted)] mb-12 max-w-2xl mx-auto leading-relaxed">
              Describe your symptoms. Let our advanced neural networks provide instant, accurate, and trustworthy health insights in milliseconds.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button onClick={() => router.push('/register')} className="w-full sm:w-auto px-8 py-3 text-base">
                Start Free Analysis
              </Button>
              <Button variant="secondary" onClick={() => router.push('/login')} className="w-full sm:w-auto px-8 py-3 text-base">
                Sign In
              </Button>
            </div>
          </div>
        </section>

        {/* --- ASYMMETRIC BENTO GRID (FEATURES) --- */}
        <section id="features" className="py-24 md:py-32 px-6 relative z-10 border-t border-[var(--border-default)] bg-[var(--bg-base)]">
          <div className="max-w-7xl mx-auto" ref={featuresRef}>
            <div className={`mb-16 md:mb-20 reveal ${isFeaturesVisible ? 'active' : ''}`}>
              <h2 className="text-3xl md:text-5xl font-semibold mb-4 tracking-tight">Engineered for accuracy.</h2>
              <p className="text-xl text-[var(--fg-muted)] max-w-2xl">Discover the powerful infrastructure that makes our AI health screening the best in class.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              
              {/* Feature 1: Hero Span */}
              <SpotlightCard className={`md:col-span-4 min-h-[280px] p-8 md:p-10 flex flex-col justify-end reveal delay-100 ${isFeaturesVisible ? 'active' : ''}`}>
                <div className="absolute top-8 right-8 text-4xl text-[var(--accent)]/40">⚡</div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">Instant Neural Analysis</h3>
                <p className="text-[var(--fg-muted)] max-w-md text-base md:text-lg">
                  Our custom infrastructure processes your symptoms in milliseconds, providing you with immediate, actionable health insights without the wait.
                </p>
              </SpotlightCard>

              {/* Feature 2: High Accuracy */}
              <SpotlightCard className={`md:col-span-2 min-h-[220px] p-8 flex flex-col justify-end reveal delay-200 ${isFeaturesVisible ? 'active' : ''}`}>
                <h3 className="text-xl font-semibold mb-2">High Accuracy</h3>
                <p className="text-[var(--fg-subtle)] text-sm">
                  Trained on millions of verified medical data points for precise predictions.
                </p>
              </SpotlightCard>

              {/* Feature 3: Enterprise Security */}
              <SpotlightCard className={`md:col-span-2 md:col-start-5 min-h-[220px] p-8 flex flex-col justify-end reveal delay-300 ${isFeaturesVisible ? 'active' : ''}`}>
                <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
                <p className="text-[var(--fg-subtle)] text-sm">
                  End-to-end encryption ensures your health data remains strictly confidential.
                </p>
              </SpotlightCard>

            </div>
          </div>
        </section>

        {/* --- WORKFLOW TIMELINE --- */}
        <section id="how-it-works" className="py-24 md:py-32 px-6 relative z-10 border-t border-[var(--border-default)] bg-[var(--bg-elevated)]/30">
          <div className="max-w-5xl mx-auto" ref={stepsRef}>
            <div className={`text-center mb-16 md:mb-24 reveal ${isStepsVisible ? 'active' : ''}`}>
              <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight text-gradient">How the system works</h2>
              <p className="text-lg text-[var(--fg-muted)] max-w-2xl mx-auto">Three precise steps to understand your health better.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Data Ingestion', desc: 'Type or select your current symptoms using our smart, intuitive command interface.' },
                { step: '02', title: 'LLM Processing', desc: 'Our AI analyzes the exact combination of symptoms against thousands of documented conditions.' },
                { step: '03', title: 'Insight Generation', desc: 'Receive instant risk assessments, disease predictions, and clear recommended actions.' }
              ].map((item, idx) => (
                <div key={idx} className={`relative reveal ${isStepsVisible ? 'active' : ''}`} style={{ transitionDelay: `${idx * 150}ms` }}>
                  <div className="border border-[var(--border-default)] p-8 rounded-2xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors h-full flex flex-col">
                    <span className="text-sm font-mono text-[var(--accent)] tracking-widest block mb-6 border border-[var(--accent)]/30 w-fit px-3 py-1 rounded-full">{item.step}</span>
                    <h3 className="text-xl font-semibold text-[var(--fg-primary)] mb-3">{item.title}</h3>
                    <p className="text-[var(--fg-muted)] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-32 md:py-40 px-6 relative z-10 border-t border-[var(--border-default)] text-center bg-[var(--bg-base)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,106,210,0.05)_0%,transparent_50%)] pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-semibold mb-8 tracking-tight text-gradient">Ready to initialize?</h2>
          <p className="text-xl text-[var(--fg-muted)] mb-12 max-w-xl mx-auto">Join thousands of users who trust MediAssist for fast, reliable health insights.</p>
          <Button onClick={() => router.push('/register')} className="px-10 py-4 text-lg">
            Create Free Account
          </Button>
        </section>

      </main>
      
      <footer className="border-t border-[var(--border-default)] py-12 px-6 text-center text-[var(--fg-subtle)] text-sm bg-[var(--bg-deep)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent)] text-xl">⌘</span>
            <span className="font-semibold text-[var(--fg-primary)] tracking-tight">MediAssist</span>
          </div>
          <p>© 2024 MediAssist Systems. For informational purposes only.</p>
        </div>
      </footer>
    </>
  );
}
