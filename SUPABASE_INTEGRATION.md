# 🔧 Supabase Integration Guide - MediAssist Backend Setup

## Overview
This guide connects your MediAssist frontend to a Supabase backend for:
- ✅ User authentication (email/password, social login)
- ✅ Persistent storage of symptom analyses
- ✅ Analysis history retrieval
- ✅ User profiles and preferences
- ✅ Real database instead of mock API

---

## 📋 Table of Contents
1. [Supabase Project Setup](#supabase-project-setup)
2. [Database Schema](#database-schema)
3. [Frontend Integration](#frontend-integration)
4. [API Endpoints](#api-endpoints)
5. [Authentication Setup](#authentication-setup)
6. [Error Handling](#error-handling)
7. [Testing](#testing)

---

## 🚀 Supabase Project Setup

### Your Credentials
```
Publishable API Key: sb_publishable_DFiGbnRmVFZ4lFMb_gWFqA_kFIy8JW_
Project URL: https://<your-project-id>.supabase.co
```

### Step 1: Get Your Project URL
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings > API**
4. Copy your **Project URL** (looks like: `https://xxxxx.supabase.co`)

### Step 2: Install Supabase Client
```bash
cd /Users/shinobi/bibek_code/work_shope/symptom-checker
npm install @supabase/supabase-js
```

### Step 3: Create Environment Variables
Create `.env.local` in project root:

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://<YOUR_PROJECT_ID>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_DFiGbnRmVFZ4lFMb_gWFqA_kFIy8JW_
```

⚠️ **IMPORTANT**: 
- `NEXT_PUBLIC_*` variables are safe to expose (public key only)
- Never commit `.env.local` to git
- Add to `.gitignore`

---

## 🗄️ Database Schema

### Create Tables in Supabase SQL Editor

Go to **SQL Editor** in Supabase dashboard and run:

```sql
-- 1. Users table (extends Supabase auth)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Symptom analyses table
CREATE TABLE analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  symptoms TEXT[] NOT NULL,
  predicted_diseases JSONB NOT NULL,
  risk_level TEXT NOT NULL, -- 'LOW', 'MEDIUM', 'HIGH', 'EMERGENCY'
  reasoning TEXT NOT NULL,
  recommendation TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Create indexes for better query performance
CREATE INDEX idx_analyses_user_id ON analyses(user_id);
CREATE INDEX idx_analyses_created_at ON analyses(created_at DESC);

-- 4. Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for users table
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- 6. RLS Policies for analyses table
CREATE POLICY "Users can view their own analyses"
  ON analyses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analyses"
  ON analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analyses"
  ON analyses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analyses"
  ON analyses FOR DELETE
  USING (auth.uid() = user_id);
```

---

## 💻 Frontend Integration

### Step 1: Create Supabase Client Utility

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### Step 2: Update Mock API to Use Supabase

Modify `src/lib/mockApi.ts`:

```typescript
import { supabase } from './supabase';
import { PredictionResult, SymptomCheckerState } from '@/contexts/SymptomContext';

// Keep existing functions for demo purposes
// Add new functions for real API

export async function analyzeSymptomWithBackend(symptoms: string[]) {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Call your backend API or use the mock analysis
    const { results, riskLevel, reasoning, recommendation } = await analyzeSymptoms(symptoms);

    // Save analysis to database
    const { data, error } = await supabase
      .from('analyses')
      .insert([
        {
          user_id: user.id,
          symptoms,
          predicted_diseases: results,
          risk_level: riskLevel,
          reasoning,
          recommendation,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return { results, riskLevel, reasoning, recommendation, analysisId: data.id };
  } catch (error) {
    console.error('Error saving analysis:', error);
    throw error;
  }
}

export async function getUserAnalysisHistory(userId: string) {
  try {
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
}

export async function deleteAnalysis(analysisId: string) {
  try {
    const { error } = await supabase
      .from('analyses')
      .delete()
      .eq('id', analysisId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting analysis:', error);
    throw error;
  }
}
```

### Step 3: Create Auth Context

Create `src/contexts/AuthContext.tsx`:

```typescript
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  session: Session | null;
  user: any;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{ session, user, isLoading, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### Step 4: Update Layout to Include Auth Provider

Modify `src/app/layout.tsx`:

```typescript
import { SymptomProvider } from '@/contexts/SymptomContext';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-full flex flex-col bg-gradient-to-br from-black via-slate-900 to-black">
        <AuthProvider>
          <SymptomProvider>
            {children}
          </SymptomProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

---

## 🔌 API Endpoints

### Save Analysis
```typescript
POST /api/analyses
Body: {
  symptoms: string[],
  results: PredictionResult[],
  riskLevel: string,
  reasoning: string,
  recommendation: string
}
Response: {
  id: string,
  created_at: timestamp
}
```

### Get User History
```typescript
GET /api/analyses?user_id=<uuid>
Response: {
  analyses: Array<{
    id: string,
    symptoms: string[],
    risk_level: string,
    created_at: timestamp
  }>
}
```

### Delete Analysis
```typescript
DELETE /api/analyses/<id>
Response: { success: boolean }
```

---

## 🔐 Authentication Setup

### Enable Email Authentication
1. Go to **Authentication > Providers**
2. Enable **Email** provider
3. Configure email confirmation (optional)

### Enable Social Login (Optional)
1. Go to **Authentication > Providers**
2. Click on desired provider (Google, GitHub, etc.)
3. Add your OAuth credentials

### Create Auth Pages

Create `src/app/auth/signup/page.tsx`:

```typescript
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(email, password);
      router.push('/');
    } catch (error) {
      alert('Sign up failed: ' + (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSignUp} className="glass p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6">Sign Up</h1>
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
          required
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
          required
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-gradient-primary text-white rounded-lg font-bold"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
```

---

## 🛡️ Error Handling

Add error handling to your API calls:

```typescript
import { useCallback } from 'react';

export function useAnalysisAPI() {
  const saveAnalysis = useCallback(async (analysisData: any) => {
    try {
      const result = await analyzeSymptomWithBackend(analysisData.symptoms);
      return { success: true, data: result };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('Analysis error:', message);
      return { success: false, error: message };
    }
  }, []);

  return { saveAnalysis };
}
```

---

## 🧪 Testing

### Test Connection
```typescript
// Add to your home page temporarily
import { supabase } from '@/lib/supabase';

useEffect(() => {
  supabase.auth.getSession().then((session) => {
    console.log('Current session:', session);
  });
}, []);
```

### Test Database Insert
```typescript
const { data, error } = await supabase
  .from('analyses')
  .insert([{
    user_id: 'test-user-id',
    symptoms: ['fever', 'cough'],
    predicted_diseases: [],
    risk_level: 'LOW',
    reasoning: 'Test',
    recommendation: 'Test'
  }])
  .select();

console.log('Insert result:', { data, error });
```

---

## 📊 Implementation Checklist

- [ ] Install `@supabase/supabase-js`
- [ ] Add environment variables to `.env.local`
- [ ] Create database schema in Supabase
- [ ] Enable RLS policies
- [ ] Create `src/lib/supabase.ts`
- [ ] Update `mockApi.ts` with backend functions
- [ ] Create `AuthContext.tsx`
- [ ] Update `layout.tsx` with AuthProvider
- [ ] Create auth pages (signup/login)
- [ ] Update home page to use backend API
- [ ] Update history page to fetch from database
- [ ] Test authentication flow
- [ ] Test analysis saving to database
- [ ] Test history retrieval

---

## 🚀 Next Steps After Integration

1. **Real Disease Database**: Replace mock with real medical data
2. **AI API**: Connect to real ML model for predictions
3. **User Dashboard**: Add user profile and settings
4. **Notifications**: Email notifications for high-risk results
5. **Export**: PDF export of analysis reports
6. **Doctor Integration**: Share results with healthcare providers

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/installing)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## 🆘 Troubleshooting

### Issue: CORS error
**Solution**: Enable CORS in Supabase project settings

### Issue: Authentication not working
**Solution**: Check environment variables are set correctly

### Issue: Database queries failing
**Solution**: Verify RLS policies allow the operation

### Issue: Session not persisting
**Solution**: Check browser localStorage is enabled

---

**Status**: Ready for implementation
**Effort**: ~2-3 hours
**Complexity**: Medium

Next: Start with Step 1 of Frontend Integration
