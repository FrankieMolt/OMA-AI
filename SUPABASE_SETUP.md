# Supabase Cloud Setup Guide

**Goal:** Connect OMA-AI.com to a real Supabase database so the MCP marketplace has live data, user auth works, and x402 payments track properly.

---

## Step 1: Create Supabase Cloud Project

1. Go to **[supabase.com](https://supabase.com)** → Sign in → **New Project**
2. Give it a name: `oma-ai`
3. Choose a region closest to your users
4. Save the **Database Password** somewhere safe (you'll need it)

> ⏱️ Project creation takes ~2 minutes.

---

## Step 2: Get Your Project Credentials

Once created, go to **Settings → API** in the Supabase dashboard. You'll see:

```
Project URL:       https://xxxxxxxxxxxx.supabase.co
anon/public key:   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...
service_role key:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...
```

---

## Step 3: Run the SQL Migration

1. In Supabase dashboard → **SQL Editor**
2. Paste the contents of `supabase-migration.sql` (in the repo root)
3. Click **Run** → Should say "Success: 28 rows inserted"

---

## Step 4: Add Environment Variables to Vercel

Go to **[vercel.com/dashboard](https://vercel.com)** → `oma-ai-repo` project → **Settings → Environment Variables**

| Name | Value | Notes |
|------|-------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxxxxxxxxx.supabase.co` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOi...` (anon key) | Safe to expose in browser |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOi...` (service_role key) | **Secret** — never expose |
| `OMA_AI_PAYMENT_WALLET` | `0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6` | Base network treasury wallet |
| `BASE_RPC_URL` | `https://mainnet.base.org` | Base blockchain RPC |
| `SOLANA_RPC_URL` | `https://mainnet.helius-rpc.com/?api_key=YOUR_KEY` | Solana RPC (get free Helius key) |

> All vars → **Production** and **Preview** (not Development unless testing)

---

## Step 5: Fix the Vercel Deploy Token

The GH Actions `VERCEL_TOKEN` expired. Fix it:

1. Go to **[vercel.com/account/tokens](https://vercel.com/account/tokens)**
2. Create new token: `oma-ai-deploy` | Scope: **Full Account**
3. Copy the token
4. Go to **GitHub → FrankieMolt/OMA-AI → Settings → Secrets → Actions**
5. Update `VERCEL_TOKEN` with the new value

---

## Step 6: Trigger a Deploy

```bash
# Push to main to trigger auto-deploy, or:
gh workflow run deploy-vercel.yml --repo FrankieMolt/OMA-AI
```

Once deployed, verify Supabase is connected:
```bash
curl https://www.oma-ai.com/api/mcp/list | python3 -c "import sys,json; d=json.load(sys.stdin); print('Source:', d.get('source'), '| Total:', d['pagination']['total'])"
```

Expected: `"source": "supabase"` and `"total": 28`

---

## What's Still Needed for Full Production

- [ ] **x402 payments** — requires Coinbase CDP account for facilitator (x402.org/dev)
- [ ] **User auth flow** — Supabase Auth is configured but needs email templates + OAuth
- [ ] **MCP backend endpoints** — `/mcp/{slug}` routes work with demo tools. Real API integrations (Helius, Jupiter) need API keys
- [ ] **Publish flow** — `/api/mcp/register` needs a real review/approval workflow

---

## Rollback Plan (Keep Static Fallback)

If Supabase Cloud setup fails, the site **keeps working** with the static fallback. The MCP marketplace shows 19 MCPs from `src/lib/mcp-data.ts`. No data is lost.
