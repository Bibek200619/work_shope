'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar, Loader, AmbientBackground, SpotlightCard, Button } from '@/components';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          }
        }
      });

      if (error) {
        setErrorMsg(error.message);
        setIsLoading(false);
        return;
      }

      if (data.session) {
        router.push('/dashboard');
      } else {
        setSuccessMsg('Verification sent. Please check your email.');
        setIsLoading(false);
      }
      
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main className="flex-1 flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12">
        <div className="w-full max-w-sm scale-in">
          <SpotlightCard className="p-8">
            
            <div className="text-center mb-8 relative z-10">
              <div className="w-12 h-12 mx-auto bg-[var(--surface)] rounded-xl flex items-center justify-center mb-6 border border-[var(--border-default)]">
                <span className="text-xl text-[var(--accent)]">⌘</span>
              </div>
              <h1 className="text-2xl font-semibold mb-2 tracking-tight">Create Account</h1>
              <p className="text-[var(--fg-muted)] text-sm">Join MediAssist</p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm fade-in-up">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm fade-in-up">
                {successMsg}
              </div>
            )}

            {isLoading ? (
              <div className="py-12 flex flex-col items-center">
                <Loader />
                <p className="text-center text-[var(--fg-muted)] mt-4 text-sm">Initializing...</p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4 relative z-10">
                
                <div className="floating-input-group">
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="linear-input peer"
                  />
                  <label htmlFor="fullName" className="floating-label peer-focus:text-[var(--accent-bright)]">
                    Full Name
                  </label>
                </div>

                <div className="floating-input-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="linear-input peer"
                  />
                  <label htmlFor="email" className="floating-label peer-focus:text-[var(--accent-bright)]">
                    Email Address
                  </label>
                </div>

                <div className="floating-input-group">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="linear-input peer"
                  />
                  <label htmlFor="password" className="floating-label peer-focus:text-[var(--accent-bright)]">
                    Password
                  </label>
                </div>

                <Button type="submit" fullWidth className="mt-2">
                  Create Account
                </Button>
                
                <div className="text-center text-sm text-[var(--fg-muted)] mt-6">
                  Already have an account?{' '}
                  <a href="/login" className="text-[var(--fg-primary)] hover:text-[var(--accent)] transition-colors font-medium">
                    Sign in
                  </a>
                </div>
              </form>
            )}
          </SpotlightCard>
        </div>
      </main>
    </>
  );
}
