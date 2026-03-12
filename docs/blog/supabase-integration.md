---
title: Supabase Integration with OMA-Ai
description: Complete guide to integrating Supabase database, auth, and real-time features with OMA-Ai platform.
date:2026-03-12
author: OMA-Ai Team
tags: [supabase, database, auth, integration, OMA-Ai]
---

# Supabase Integration with OMA-Ai

Supabase is the backbone of OMA-Ai, providing database, authentication, real-time subscriptions, and storage. In this guide, we'll show you how to integrate Supabase with OMA-Ai and use these features in your MCPs.

## Table of Contents
1. [Supabase Overview](#supabase-overview)
2. [Database Setup](#database-setup)
3. [Authentication](#authentication)
4. [Row Level Security (RLS)](#row-level-security)
5. [Real-Time Subscriptions](#real-time-subscriptions)
6. [Storage](#storage)
7. [MCP Integration Examples](#mcp-integration-examples)
8. [Cost Analysis](#cost-analysis)

---

## Supabase Overview

### What is Supabase?

Supabase is an open source Firebase alternative that provides:

- **PostgreSQL Database:** Full SQL database
- **Authentication:** OAuth, email/password, phone auth
- **Real-Time:** Subscriptions and presence
- **Storage:** File storage (S3-compatible)
- **Edge Functions:** Serverless compute
- **Dashboard:** Visual management interface

### Why Supabase for OMA-Ai?

1. **Open Source:** Self-hostable, transparent
2. **PostgreSQL:** Most powerful open source database
3. **Row Level Security:** Fine-grained access control
4. **Built-in Auth:** No need to build auth from scratch
5. **Real-Time:** Live updates for dashboard
6. **Cost-Effective:** Free tier is generous

---

## Database Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Enter project name: `oma-ai-mcp-marketplace`
4. Set database password (save it!)
5. Choose region (closest to your users)
6. Click "Create new project"

### 2. Configure Database

```sql
-- Run in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgcrypto for hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

### 3. Run Migrations

```bash
# Using Supabase CLI
npx supabase init
npx supabase db push

# Or run SQL in Supabase Dashboard
```

### 4. Configure Connection

```bash
# Get connection string from Supabase Dashboard
# Project Settings > Database > Connection String

# .env.local
SUPABASE_URL=postgresql://postgres.[project-ref]:[password]@db.[project-ref].supabase.co:5432/postgres
```

---

## Authentication

### 1. Supabase Auth Configuration

```typescript
// src/lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

### 2. User Registration

```typescript
// Register new user
async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Registration failed:', error.message);
    throw error;
  }

  console.log('User registered:', data.user);
  return data.user;
}
```

### 3. User Login

```typescript
// Login existing user
async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login failed:', error.message);
    throw error;
  }

  console.log('User logged in:', data.user);
  return data.user;
}
```

### 4. Social Auth (OAuth)

```typescript
// Login with GitHub
async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });

  if (error) {
    console.error('GitHub auth failed:', error.message);
    throw error;
  }

  return data;
}

// Login with Google
async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });

  if (error) {
    console.error('Google auth failed:', error.message);
    throw error;
  }

  return data;
}
```

### 5. Get Current User

```typescript
// Get currently authenticated user
async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Get user failed:', error.message);
    return null;
  }

  return user;
}

### 6. Sign Out

```typescript
// Sign out current user
async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sign out failed:', error.message);
    throw error;
  }

  console.log('User signed out');
}
```

---

## Row Level Security (RLS)

### What is RLS?

Row Level Security (RLS) is PostgreSQL's built-in access control that restricts which rows users can see/modify.

### Why RLS?

- **Security:** Users can only access their own data
- **Multi-Tenancy:** Single database, multiple users
- **Compliance:** Meet privacy regulations (GDPR, CCPA)
- **Simplicity:** No application-level filtering

### Enable RLS on Tables

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can read own data
CREATE POLICY "Users can view own data"
ON users
FOR SELECT
USING (auth.uid()::text = id::text);

-- Create policy: Users can update own data
CREATE POLICY "Users can update own data"
ON users
FOR UPDATE
USING (auth.uid()::text = id::text);

-- Create policy: Users can insert own data
CREATE POLICY "Users can insert own data"
ON users
FOR INSERT
WITH CHECK (auth.uid()::text = id::text);
```

### MCP-Specific RLS Policies

```sql
-- MCPs: Public read, author write
ALTER TABLE mcps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "MCPs are public read"
ON mcps
FOR SELECT
USING (true);

CREATE POLICY "Authors can update own MCPs"
ON mcps
FOR UPDATE
USING (auth.uid()::text = author_id::text);

-- Reviews: Public read, user write own
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are public read"
ON reviews
FOR SELECT
USING (true);

CREATE POLICY "Users can create own reviews"
ON reviews
FOR INSERT
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own reviews"
ON reviews
FOR UPDATE
USING (auth.uid()::text = user_id::text);

-- Transactions: User can read own transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
ON transactions
FOR SELECT
USING (auth.uid()::text = user_id::text);
```

---

## Real-Time Subscriptions

### Subscribe to MCP Updates

```typescript
// Subscribe to MCP usage updates
function subscribeToMCPUpdates(mcpId: string) {
  const channel = supabase
    .channel('mcp-updates')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'usage_stats',
        filter: `mcp_id=eq.${mcpId}`
      },
      (payload) => {
        console.log('MCP update:', payload);
        // Update UI with new usage data
      }
    )
    .subscribe();

  return channel;
}
```

### Subscribe to Wallet Balance

```typescript
// Subscribe to wallet balance changes
function subscribeToWalletBalance(userId: string) {
  const channel = supabase
    .channel('wallet-balance')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'wallets',
        filter: `user_id=eq.${userId}`
      },
      (payload) => {
        console.log('Wallet balance update:', payload);
        // Update UI with new balance
      }
    )
    .subscribe();

  return channel;
}
```

### Subscribe to Payment Events

```typescript
// Subscribe to payment confirmations
function subscribeToPayments(userId: string) {
  const channel = supabase
    .channel('payments')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'transactions',
        filter: `user_id=eq.${userId}`
      },
      (payload) => {
        console.log('New payment:', payload);
        // Show notification
        // Update transaction history
      }
    )
    .subscribe();

  return channel;
}
```

---

## Storage

### 1. Create Storage Bucket

```sql
-- In Supabase Dashboard > Storage
-- Create bucket: "mcp-icons"
-- Make public for icon access
```

### 2. Upload Files

```typescript
// Upload MCP icon
async function uploadMCPIcon(file: File, mcpId: string) {
  const fileName = `${mcpId}/${file.name}`;

  const { data, error } = await supabase.storage
    .from('mcp-icons')
    .upload(fileName, file);

  if (error) {
    console.error('Upload failed:', error.message);
    throw error;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('mcp-icons')
    .getPublicUrl(fileName);

  return publicUrl;
}
```

### 3. Download Files

```typescript
// Download MCP icon
async function downloadMCPIcon(mcpId: string, fileName: string) {
  const { data, error } = await supabase.storage
    .from('mcp-icons')
    .download(`${mcpId}/${fileName}`);

  if (error) {
    console.error('Download failed:', error.message);
    throw error;
  }

  return data;
}
```

### 4. List Files

```typescript
// List all MCP icons
async function listMCPIcons(mcpId: string) {
  const { data, error } = await supabase.storage
    .from('mcp-icons')
    .list(`${mcpId}/`, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' }
    });

  if (error) {
    console.error('List failed:', error.message);
    throw error;
  }

  return data;
}
```

---

## MCP Integration Examples

### Example 1: Weather MCP with Database

```typescript
// weather-mcp/src/index.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Cache weather results in database
export async function getWeather(city: string) {
  // Check cache first
  const { data: cache } = await supabase
    .from('weather_cache')
    .select('*')
    .eq('city', city)
    .gt('created_at', new Date(Date.now() - 10 * 60 * 1000).toISOString())
    .single();

  if (cache) {
    console.log('Cache hit');
    return JSON.parse(cache.data);
  }

  // Fetch from API if no cache
  const weather = await fetchWeatherFromAPI(city);

  // Save to cache
  const { error } = await supabase
    .from('weather_cache')
    .insert({
      city,
      data: JSON.stringify(weather),
      created_at: new Date().toISOString()
    });

  if (error) {
    console.error('Cache save failed:', error.message);
  }

  return weather;
}
```

### Example 2: PostgreSQL Query MCP with Auth

```typescript
// postgresql-mcp/src/index.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // Use service key for admin operations
);

// Get user's database connections
export async function getUserConnections(userId: string) {
  const { data, error } = await supabase
    .from('database_connections')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Fetch failed:', error.message);
    throw error;
  }

  return data;
}

// Execute query on user's behalf
export async function executeQuery(
  userId: string,
  connectionId: string,
  query: string,
  params: any[]
) {
  // Get connection details
  const { data: connections } = await supabase
    .from('database_connections')
    .select('*')
    .eq('id', connectionId)
    .single();

  if (!connections) {
    throw new Error('Connection not found');
  }

  // Check user owns connection
  if (connections.user_id !== userId) {
    throw new Error('Unauthorized');
  }

  // Execute query
  const result = await executePostgreSQLQuery(
    connections.connection_string,
    query,
    params
  );

  // Log usage
  await supabase
    .from('usage_stats')
    .insert({
      user_id: userId,
      mcp_id: 'postgresql-query-mcp',
      endpoint: 'execute_query',
      call_count: 1,
      last_called_at: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0]
    });

  return result;
}
```

### Example 3: Email Sender MCP with Logs

```typescript
// email-sender-mcp/src/index.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Log email sends
export async function logEmailSend(
  userId: string,
  to: string,
  subject: string,
  status: 'sent' | 'failed'
) {
  const { error } = await supabase
    .from('email_logs')
    .insert({
      user_id: userId,
      to,
      subject,
      status,
      created_at: new Date().toISOString()
    });

  if (error) {
    console.error('Log failed:', error.message);
  }
}

// Send email and log
export async function sendEmail(
  userId: string,
  to: string,
  subject: string,
  body: string
) {
  try {
    await sendEmailViaAPI(to, subject, body);
    await logEmailSend(userId, to, subject, 'sent');
    return { success: true };
  } catch (error) {
    await logEmailSend(userId, to, subject, 'failed');
    return { success: false, error };
  }
}
```

---

## Cost Analysis

### Supabase Pricing (2026)

| Tier | Database | Auth | Storage | Edge Functions | Total/mo |
|------|----------|------|---------|----------------|-----------|
| **Free** | 500 MB | 50,000 MAUs | 1 GB | 500K requests | $0 |
| **Pro** | 8 GB | 100,000 MAUs | 100 GB | 2M requests | $25 |
| **Team** | 50 GB | 300,000 MAUs | 500 GB | 10M requests | $599 |

### OMA-Ai Usage Estimate

| Resource | Usage | Free Tier | Pro Tier | Recommendation |
|---------|-------|-----------|----------|----------------|
| **Database** | ~2 GB | 500 MB (0.1mo) | 8 GB (4mo) | **Pro** |
| **Auth** | ~80K MAUs | 50K (0.6mo) | 100K (1.3mo) | **Pro** |
| **Storage** | ~50 GB | 1 GB (0.02mo) | 100 GB (2mo) | **Team** |
| **API Calls** | ~10M | 500K (0.05mo) | 2M (0.2mo) | **Pro** |
| **Total Cost** | - | **$0** | **$25/mo** | **$599/mo** |

### Recommendation

**For OMA-Ai:**
- **Start:** Free tier for development
- **Launch:** Pro tier for production ($25/mo)
- **Growth:** Team tier when >100K users ($599/mo)

**Cost Savings:**
- Free tier saves $25/mo (dev/testing)
- Pro tier saves $574/mo vs Team
- Pay only for what you use

---

## Performance Tips

### 1. Use Connection Pooling

```typescript
// Configure connection pool
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});
```

### 2. Add Indexes

```sql
-- Add indexes for common queries
CREATE INDEX idx_mcps_slug ON mcps(slug);
CREATE INDEX idx_mcps_category ON mcps(category);
CREATE INDEX idx_mcps_author ON mcps(author_id);
CREATE INDEX idx_reviews_mcp ON reviews(mcp_id);
CREATE INDEX idx_usage_stats_user ON usage_stats(user_id);
CREATE INDEX idx_usage_stats_mcp ON usage_stats(mcp_id);
CREATE INDEX idx_usage_stats_date ON usage_stats(date);
```

### 3. Use Prepared Statements

```typescript
// Prepared statements prevent SQL injection
const query = 'SELECT * FROM mcps WHERE slug = $1';
const result = await pool.query(query, [slug]);
```

### 4. Cache Frequent Queries

```typescript
// Use Redis or in-memory cache
const cache = new Map();

async function getCachedMCP(slug: string) {
  const cached = cache.get(slug);
  if (cached) {
    return cached;
  }

  const mcp = await fetchMCPFromDatabase(slug);
  cache.set(slug, mcp, 60000); // Cache for 1 minute

  return mcp;
}
```

### 5. Use Real-Time for Live Data

```typescript
// Subscribe to live updates instead of polling
function subscribeToLiveMCPUpdates() {
  const channel = supabase
    .channel('mcp-live-updates')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'mcps'
    }, (payload) => {
        console.log('MCP updated:', payload);
        // Update UI in real-time
      })
    .subscribe();

  return channel;
}
```

---

## Next Steps

### Immediate (Today)
1. Create Supabase project
2. Configure database
3. Run migrations
4. Set up authentication
5. Test integration

### Short Term (This Week)
6. Implement RLS policies
7. Add indexes to tables
8. Set up real-time subscriptions
9. Configure storage
10. Test with real users

### Medium Term (This Month)
11. Optimize database queries
12. Add connection pooling
13. Implement caching
14. Monitor performance
15. Scale to Pro/Team tier

---

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Dashboard](https://app.supabase.com)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [OMA-Ai Code](https://github.com/FrankieMolt/OMA-Ai)
- [OMA-Ai API](https://docs.oma-ai.com/api)

---

*Published: March 12, 2026*
*Updated: March 12, 2026*
*Author: OMA-Ai Team*
