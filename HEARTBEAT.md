## OMA-AI Deployment Status

### ✅ COMPLETED
- [x] Repo structure cleaned (removed duplicate frontend/backend)
- [x] API routing fixed (Next.js now proxies to FastAPI with fallback)
- [x] Backend requirements.txt created
- [x] Environment variables configured
- [x] Next.js build successful
- [x] Pushed to GitHub: https://github.com/FrankieMolt/OMA-AI
- [x] ❌ Cron job removed (was using invalid model)
- [x] Supabase linked (project: oooijcrqpuqymgzlidrw)
- [x] Vercel configured for frontend + backend (single deployment)

### ⏳ PENDING - CRITICAL
1. [ ] Import repo to Vercel (vercel.com/new)
2. [ ] Add environment variables in Vercel:
   - NEXT_PUBLIC_API_URL=https://oma-ai.com
   - NEXT_PUBLIC_SITE_URL=https://oma-ai.com
   - OPENROUTER_API_KEY=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
   - SUPABASE_URL=https://oooijcrqpuqymgzlidrw.supabase.co
   - SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   - DATABASE_URL=postgresql://postgres:[PASSWORD]@oooijcrqpuqymgzlidrw.supabase.co:5432/postgres
3. [ ] Create Supabase tables (run schema.sql in SQL Editor)
4. [ ] Add oma-ai.com custom domain
5. [ ] Test all API endpoints

### 🚀 DEPLOYMENT CHECKLIST

#### Vercel (Frontend + Backend)
```bash
# 1. Import repo at vercel.com/new
# 2. Set these env vars:
NEXT_PUBLIC_API_URL=https://oma-ai.com
NEXT_PUBLIC_SITE_URL=https://oma-ai.com
OPENROUTER_API_KEY=sk-or-v1-...
SUPABASE_URL=https://oooijcrqpuqymgzlidrw.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:[PASSWORD]@oooijcrqpuqymgzlidrw.supabase.co:5432/postgres
X402_TREASURY_WALLET=0x590FdA238A52bBA79fD4635e73bDAC1eAe558e784
```

#### Supabase Setup
Run schema.sql in Supabase SQL Editor or:
```bash
psql "$DATABASE_URL" < schema.sql
```

---

## HEARTBEAT CHECKS
- [x] Cron job removed
- [x] Supabase linked
- [x] Vercel configured
- [ ] Frontend deployed (vercel)
- [ ] Backend deployed (vercel functions)
- [ ] API endpoints responding
- [ ] Database connected
- [ ] Environment variables verified
- [ ] Custom domain added
