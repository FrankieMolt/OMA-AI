# OMA-AI Deployment Guide

## Prerequisites

1. Node.js 18+
2. Vercel account
3. Supabase project (free tier)
4. Base wallet with USDC (for testing)

---

## Step 1: Clone & Install

```bash
git clone https://github.com/FrankieMolt/OMA-AI.git
cd OMA-AI
npm install
```

## Step 2: Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Supabase (create at supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# x402 (optional - dev mode works without)
# PRIVATE_KEY=0x...
# TREASURY_WALLET_BASE=0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6
```

## Step 3: Deploy to Vercel

```bash
# Login
vercel login

# Deploy
vercel --prod
```

**Or connect GitHub:** https://vercel.com/new/import/github/FrankieMolt/OMA-AI

## Step 4: Setup Supabase

1. Create project at https://supabase.com
2. Get URL and anon key
3. Add to Vercel project settings
4. Push schema:

```bash
npx supabase db push
```

## Step 5: Test Locally

```bash
npm run dev
# Visit http://localhost:3000
```

## Step 6: Run Tests

```bash
npx playwright test
# 10 tests should pass
```

---

## Network Configuration

### Base Mainnet
- Chain ID: 8453
- RPC: https://mainnet.base.org
- USDC: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

### Testnet (Sepolia)
- Chain ID: 84532
- RPC: https://sepolia.base.org
- USDC: 0x... (get from faucet)

---

## Cost Optimization

| Service | Free Tier | Notes |
|---------|-----------|-------|
| Vercel | 100 deploys/day | 100GB bandwidth |
| Supabase | 500MB DB, 5GB storage | Unlimited users |
| CoinGecko | 10-30 calls/min | No key needed |
| WeatherAPI | 1M calls/month | Free tier |
| Exa | 1000 searches/month | Free tier |

---

## Troubleshooting

### "Address already in use"
```bash
lsof -i :3000
kill -9 <PID>
```

### Build errors
```bash
rm -rf .next
npm run dev
```

### Wallet not connecting
- Install MetaMask or Coinbase Wallet
- Switch to Base network