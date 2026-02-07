# Supabase Security Audit Report
**Date:** 2026-02-07
**Audited by:** Frankie 🧟‍♂️
**Database:** OMA-AI Production (oooijcrqpuqymgzlidrw)

---

## Executive Summary

**Overall Risk Level:** 🟡 **MEDIUM**

**Critical Issues:** 2
**High Issues:** 0
**Medium Issues:** 2
**Low Issues:** 1

**Status:** Database schema created but **Row Level Security (RLS) is NOT enabled**. Environment variables have naming mismatch preventing proper Supabase connection.

---

## 🔴 Critical Issues

### 1. Row Level Security (RLS) Disabled
**File:** `supabase/migrations/20260206_001_initial_schema.sql`
**Lines:** 108-110

**Issue:**
```sql
-- RLS is commented out (not enabled)
-- ALTER TABLE services ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
```

**Impact:**
- ❌ Anyone with anon key can read/write ALL data
- ❌ No user-level data isolation
- ❌ Transactions table is completely unprotected
- ❌ Anyone can modify agent statuses, balances, etc.

**Risk Level:** 🔴 CRITICAL

**Fix Required:**
```sql
-- Enable RLS on all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_logs ENABLE ROW LEVEL SECURITY;
```

**Additional Policies Needed:**
```sql
-- Services: Public read, owner write
CREATE POLICY "Public read access for services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Service owner can update" ON services
  FOR UPDATE USING (auth.uid()::text = seller_wallet);

-- Transactions: Private to buyer and seller
CREATE POLICY "Transaction buyer/seller access" ON transactions
  FOR SELECT USING (
    auth.uid()::text = buyer_wallet OR
    auth.uid()::text = seller_wallet
  );

-- Agents: Private to wallet owner
CREATE POLICY "Agent owner access" ON agents
  FOR ALL USING (auth.uid()::text = wallet_address);

-- Agent logs: Private to agent owner
CREATE POLICY "Agent logs owner access" ON agent_logs
  FOR SELECT USING (
    auth.uid()::text = (SELECT wallet_address FROM agents WHERE id = agent_id)
  );
```

---

### 2. Environment Variable Naming Mismatch
**Files:** `.env.production` and code files

**Issue:**
- `.env.production` has: `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Code expects: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Impact:**
- ❌ Supabase client fails to initialize
- ❌ All Supabase operations fall back to demo mode
- ❌ Production site runs without database connection

**Files Affected:**
- `lib/supabase.ts` (lines 2-4)
- `lib/supabase-admin.ts` (lines 2-4)
- `lib/config.ts` (lines 8-9)

**Fix Required:**
```bash
# Update .env.production
NEXT_PUBLIC_SUPABASE_URL=https://oooijcrqpuqymgzlidrw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=<get from Supabase dashboard>
```

---

## 🟡 Medium Issues

### 3. Missing Supabase Service Role Key
**File:** `.env.production`

**Issue:**
- `SUPABASE_SERVICE_ROLE_KEY` is not set
- Admin operations can't bypass RLS (if it was enabled)

**Impact:**
- ❌ Can't perform admin operations
- ❌ Can't manage other users' data
- ⚠️ Medium risk if RLS is not enabled anyway

**Fix Required:**
1. Go to Supabase Dashboard → Project Settings → API
2. Copy `service_role` secret
3. Add to `.env.production`

---

### 4. No Input Validation on API Routes
**File:** `app/api/agents/route.ts`
**Lines:** 38-76 (POST endpoint)

**Issue:**
- Validation schema exists (`agentSchema`) but is basic
- No rate limiting
- No authentication check
- No user wallet verification

**Current Schema:**
```typescript
const agentSchema = z.object({
  name: z.string().min(1).max(255),
  capabilities: z.array(z.string()).optional(),
  balance: z.number().optional().default(10.0)
});
```

**Missing:**
- ❌ Wallet address validation
- ❌ Capability whitelist check
- ❌ Rate limiting
- ❌ Authentication with Supabase Auth

**Fix Required:**
```typescript
// Add authentication
const user = await supabase.auth.getUser();
if (!user.data.user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

// Validate wallet address
const walletSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
const validatedWallet = walletSchema.parse(body.wallet_address);

// Add rate limiting (using Redis or upstash)
// Add capability whitelist check
```

---

## 🟢 Low Issues

### 5. No Database Connection Pooling
**File:** `lib/supabase.ts`

**Issue:**
- Default Supabase connection settings
- No connection pooling configuration

**Impact:**
- ⚠️ Under high load, may hit connection limits
- ⚠️ Could cause slow queries

**Fix Required:**
```typescript
const supabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    db: {
      schema: 'public',
    },
    global: {
      headers: {
        'x-my-custom-header': 'oma-ai',
      },
    },
  }
);
```

---

## 🔒 Security Checklist

### Authentication & Authorization
- [x] Supabase URL configured
- [x] Supabase Anon Key configured (but with wrong env var name)
- [ ] Supabase Service Role Key configured
- [x] JWT validation exists (in code, but may not work due to env issue)
- [x] RLS policies exist (in code, but not enabled)
- [ ] User wallet verification implemented
- [ ] Rate limiting implemented

### Data Protection
- [ ] RLS enabled on all tables
- [ ] Encryption at rest (Supabase default)
- [ ] Encryption in transit (HTTPS default)
- [ ] Input validation on all API routes
- [ ] SQL injection protection (Supabase default with parameterized queries)
- [ ] XSS protection (Next.js default)

### Database Access
- [ ] Read access restricted to authorized users
- [ ] Write access restricted to data owners
- [ ] Admin operations with service role key
- [ ] Connection pooling configured
- [ ] Query performance optimized

### Monitoring & Logging
- [ ] Error tracking (Sentry, LogRocket, etc.)
- [ ] Database query logging
- [ ] API request logging
- [ ] Security event logging
- [ ] Real-time monitoring (Supabase dashboard)

---

## 📊 Schema Review

### Tables Created (4)
1. **services** - API marketplace listings
2. **transactions** - Payment records
3. **agents** - Self-sustaining agents
4. **agent_logs** - Agent activity logs

### Indexes (4)
- `idx_services_name` - For search
- `idx_services_type` - For filtering
- `idx_services_wallet` - For seller lookup
- `idx_transactions_seller` - For analytics
- `idx_transactions_created` - For time-based queries

### Triggers (1)
- `update_services_updated_at` - Auto-update timestamp

### Functions (1)
- `update_updated_at_column()` - Timestamp update logic

---

## 🎯 Recommended Action Plan

### Phase 1: Immediate (Before Production Deployment)
1. ✅ Fix environment variable naming (add NEXT_PUBLIC_ prefix)
2. ✅ Enable RLS on all tables
3. ✅ Create RLS policies for data isolation
4. ✅ Add Supabase Service Role Key

### Phase 2: Short Term (Within 1 Week)
5. ✅ Add authentication to API routes
6. ✅ Implement rate limiting
7. ✅ Add wallet address validation
8. ✅ Set up error tracking (Sentry or similar)

### Phase 3: Medium Term (Within 1 Month)
9. ✅ Add database query logging
10. ✅ Implement caching (Redis or Upstash)
11. ✅ Add API monitoring (New Relic or similar)
12. ✅ Performance optimization (slow query analysis)

---

## 🚀 Next Steps

1. **Fix Environment Variables** (Critical)
   ```bash
   # .env.production
   NEXT_PUBLIC_SUPABASE_URL=https://oooijcrqpuqymgzlidrw.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key from Supabase>
   SUPABASE_SERVICE_ROLE_KEY=<service_role from Supabase>
   ```

2. **Create RLS Migration** (Critical)
   ```bash
   # Create new migration file
   touch supabase/migrations/20260207_002_enable_rls.sql
   ```

3. **Deploy to Supabase** (Critical)
   ```bash
   # Apply RLS migration
   npx supabase db push
   ```

4. **Test in Development** (Critical)
   ```bash
   npm run dev
   # Test all API routes with proper auth
   ```

5. **Deploy to Production** (After all fixes are verified)
   ```bash
   vercel --prod
   ```

---

## 📝 Notes

- Database is currently **NOT SECURE** for production use
- RLS must be enabled before any user data is stored
- Environment variables need immediate fix
- API routes need authentication and rate limiting
- Consider using Supabase Auth for user authentication

---

## 🔐 Security Score

| Category | Score | Status |
|----------|-------|--------|
| Authentication | 3/10 | 🔴 Needs Improvement |
| Authorization | 2/10 | 🔴 Critical Issues |
| Data Protection | 7/10 | 🟡 Good (with RLS enabled) |
| Infrastructure | 8/10 | 🟢 Good (Supabase) |
| Monitoring | 2/10 | 🔴 Needs Improvement |
| **Overall** | **4.4/10** | 🟡 **Medium Risk** |

---

**Audit completed by Frankie 🧟‍♂️**
**Date:** 2026-02-07
**Recommendation:** Fix critical issues before production deployment
