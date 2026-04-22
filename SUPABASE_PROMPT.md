# 🚀 Supabase Backend Integration Prompt

## Quick Start Prompt (Copy & Paste to Claude/ChatGPT)

```
I have a Next.js health symptom checker app. Here's what I need:

## Current Setup
- Frontend: Next.js 16.2.4 + React 19 + TypeScript + Tailwind CSS
- Location: /Users/shinobi/bibek_code/work_shope/symptom-checker/
- Current: Using mock API (mockApi.ts) for disease predictions
- Supabase Project URL: https://<YOUR_PROJECT_ID>.supabase.co
- Supabase Publishable Key: sb_publishable_DFiGbnRmVFZ4lFMb_gWFqA_kFIy8JW_

## What I Need
1. Connect Supabase to frontend
2. Create authentication (email/password signup & login)
3. Store symptom analyses in PostgreSQL database
4. Retrieve analysis history for logged-in users
5. Keep existing mock API as fallback for demo

## Database Tables Needed
- users (extends Supabase auth)
- analyses (symptoms, predictions, risk_level, reasoning, created_at, user_id)

## Files to Create/Modify
1. Create: src/lib/supabase.ts (Supabase client)
2. Create: src/contexts/AuthContext.tsx (auth state management)
3. Create: src/app/auth/login/page.tsx (login page)
4. Create: src/app/auth/signup/page.tsx (signup page)
5. Modify: src/app/layout.tsx (add AuthProvider)
6. Modify: src/lib/mockApi.ts (add save/fetch from database)
7. Modify: src/app/page.tsx (use backend API)
8. Modify: src/app/history/page.tsx (fetch from database)
9. Add: .env.local with Supabase credentials

## Tasks
1. Set up Supabase authentication
2. Create database schema with SQL
3. Enable Row Level Security
4. Install @supabase/supabase-js
5. Create Supabase client utility
6. Create authentication context
7. Create login/signup pages
8. Update existing pages to use backend
9. Test full flow (signup → analyze → view history)
10. Handle errors and loading states

## User Flow
1. User signs up with email/password
2. Redirected to home page
3. User enters symptoms and clicks "Check Symptoms"
4. Analysis is saved to Supabase database
5. Results are displayed
6. User can view history of past analyses
7. Each user only sees their own data (via RLS)

Please help me implement this step by step.
```

---

## Integration Overview

### What Gets Connected
```
Frontend (Next.js)
    ↓
Authentication Context (email/password)
    ↓
Supabase Auth & Database
    ↓
PostgreSQL (analyses table)
    ↓
User History & Profile Data
```

### Data Flow
```
Home Page
  ├→ Input symptoms
  ├→ Call analyzeSymptomWithBackend()
  ├→ Save to supabase.analyses table
  └→ Redirect to results

History Page
  ├→ Get current user ID
  ├→ Query supabase.analyses (filtered by user_id)
  └→ Display results
```

---

## Step-by-Step Implementation Plan

### Phase 1: Setup (15 minutes)
1. Install @supabase/supabase-js
2. Get Supabase project URL
3. Create .env.local
4. Create supabase.ts client

### Phase 2: Database (20 minutes)
1. Create users table
2. Create analyses table
3. Set up indexes
4. Enable RLS
5. Create policies

### Phase 3: Authentication (30 minutes)
1. Create AuthContext.tsx
2. Create signup page
3. Create login page
4. Update layout.tsx

### Phase 4: Integration (45 minutes)
1. Update mockApi.ts
2. Update home page
3. Update results page
4. Update history page
5. Test full flow

### Phase 5: Polish (15 minutes)
1. Error handling
2. Loading states
3. Success messages
4. Edge cases

---

## Key Code Snippets

### Installation
```bash
npm install @supabase/supabase-js
```

### Environment Variables (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_DFiGbnRmVFZ4lFMb_gWFqA_kFIy8JW_
```

### Supabase Client (src/lib/supabase.ts)
```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### Save Analysis
```typescript
await supabase
  .from('analyses')
  .insert([{
    user_id: user.id,
    symptoms,
    predicted_diseases: results,
    risk_level: riskLevel,
    reasoning,
    recommendation,
  }])
  .select()
  .single();
```

### Fetch History
```typescript
await supabase
  .from('analyses')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false });
```

---

## Files Reference

See `/Users/shinobi/bibek_code/work_shope/SUPABASE_INTEGRATION.md` for:
- Complete database schema
- Full AuthContext code
- Auth pages code
- API functions
- Error handling patterns
- Testing instructions
- Troubleshooting guide

---

## Expected Outcome

After integration:
- ✅ User authentication (email/password)
- ✅ Persistent analysis storage
- ✅ User-isolated data (via RLS)
- ✅ Analysis history retrieval
- ✅ Backend API instead of mock
- ✅ Production-ready security

---

## Estimated Time: 2-3 hours

**Difficulty**: Medium
**Pre-requisites**: Supabase account + project created

---

Ready to integrate? Start with the detailed guide in SUPABASE_INTEGRATION.md!
