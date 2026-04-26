'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/Button';

export function Navbar() {
  const pathname = usePathname();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--border-default)] bg-[var(--bg-base)]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--border-default)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
              <span className="text-[var(--accent)] font-mono">⌘</span>
            </div>
            <span className="font-semibold tracking-tight text-[var(--fg-primary)] group-hover:text-white transition-colors">
              MediAssist
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!isAuthPage && (
            <>
              {session ? (
                <>
                  <Link href="/dashboard" className="text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors">Dashboard</Link>
                  <Link href="/history" className="text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors mr-2">Logs</Link>
                  <Button variant="secondary" onClick={handleLogout} className="py-1.5 px-4 text-xs">
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors mr-2">Sign In</Link>
                  <Link href="/register">
                    <Button variant="primary" className="py-1.5 px-4 text-xs">
                      Initialize
                    </Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
