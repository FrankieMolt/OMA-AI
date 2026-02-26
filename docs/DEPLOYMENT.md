# OMA-AI Deployment Guide

## Stack

- **Frontend:** Vercel (free tier)
- **Database:** Supabase (free tier)
- **APIs:** Vercel Serverless Functions
- **Payments:** x402 on Base

---

## Step 1: Supabase Setup

1. Go to https://supabase.com
2. Create new project
3. Run schema.sql in SQL editor
4. Get credentials:
   - Project URL
   - Anon Key
   - Service Key

---

## Step 2: Vercel Setup

1. Go to https://vercel.com
2. Import GitHub repo: FrankieMolt/OMA-AI
3. Configure:
   - Framework: Other
   - Build Command: `npm run build`
   - Output Directory: `public`
4. Add environment variables
5. Deploy

---

## Step 3: Custom Domain

1. In Vercel, go to Settings → Domains
2. Add `oma-ai.com`
3. Update DNS:
   - A: 76.76.21.21
   - CNAME: www → cname.vercel-dns.com

---

## Step 4: API Keys

### OpenRouter
1. Go to https://openrouter.ai
2. Create account
3. Generate API key
4. Add $10 credits

### OpenWeather
1. Go to https://openweathermap.org/api
2. Sign up (free)
3. Get API key

---

## Environment Variables

Add these in Vercel:

```
OPENROUTER_KEY=sk-or-v1-xxxxx
OPENWEATHER_KEY=xxxxx
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_KEY=xxxxx
PAYMENT_ADDRESS=0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6
```

---

## Costs

| Service | Cost |
|---------|------|
| Vercel | $0 (free tier) |
| Supabase | $0 (free tier) |
| OpenRouter | $10 (credits) |
| Domain | $12/year |
| **Total** | **$1/month** |

---

## Monitoring

- Vercel Analytics (free)
- Supabase Dashboard (free)
- Uptime monitoring: Better Uptime (free)
