# OMA-AI Complete Setup Guide

This guide walks you through setting up OMA-AI from scratch with all features enabled.

## 📋 Prerequisites

- Node.js 18+
- Git
- A code editor (VS Code recommended)
- ~$20-50 for initial setup (gas fees, test credits)

---

## Step 1: Clone & Install

```bash
git clone https://github.com/FrankieMolt/OMA-AI.git
cd OMA-AI
npm install
```

---

## Step 2: Create Supabase Project

1. Go to https://supabase.com
2. Sign up with GitHub
3. Create new project called "oma-ai"
4. Choose "US East" region
5. Wait for project to be ready (~2 minutes)

### Get Your Keys:
1. In Supabase Dashboard → Settings → API
2. Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
3. Copy `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Copy `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

### Run Database Schema:
1. Go to SQL Editor in Supabase dashboard
2. Copy contents from `scripts/setup-supabase.sql`
3. Click "Run"
4. Verify tables are created

---

## Step 3: Create Platform Wallet

This wallet receives the 10% platform fee from every API call.

### Option A: MetaMask
1. Install MetaMask extension
2. Click account dropdown → "Create Account"
3. Name it "OMA-AI Treasury"
4. Copy the address → `TREASURY_WALLET_BASE`

### Option B: Coinbase Wallet
1. Get Coinbase Wallet app
2. Create new wallet
3. Copy address → `TREASURY_WALLET_BASE`

### Fund with ETH on Base:
1. Bridge ETH to Base: https://bridge.base.org (need ~0.05 ETH)
2. Or buy directly on Base via Coinbase (no bridge needed)

---

## Step 4: Create Deployer Wallet

This wallet deploys the smart contract.

**IMPORTANT: Create a NEW wallet, don't use your personal one!**

```bash
# Generate new wallet
npx ethers@5 wallet.createRandom

# Save output:
# Address: 0x... (this is TREASURY_WALLET_BASE if same as Step 3)
# Private Key: 0x... (this goes in PRIVATE_KEY)
```

### Fund with ETH on Base:
- Need ~0.01 ETH for gas (~$20-30)
- Bridge from Ethereum mainnet or buy on Coinbase

---

## Step 5: Get API Keys

### OpenX402 (Required for x402 payments)
1. Go to https://openx402.ai
2. Sign up with email
3. Create new project "OMA-AI"
4. Copy API key → `OPENX402_API_KEY`

### Google AI (For LLM API)
1. Go to https://aistudio.google.com/app/apikey
2. Create new API key
3. Copy → `GOOGLE_AI_KEY`

### NVIDIA (Optional, for AI models)
1. Go to https://build.nvidia.com/
2. Sign up, generate API key
3. Copy → `NVIDIA_API_KEY`

### CoinGecko (Free, no signup needed)
- https://www.coingecko.com/en/api
- Free tier: 10-30 calls/minute

### WeatherAPI
1. https://www.weatherapi.com/signup.aspx
2. Free tier: 1M calls/month

---

## Step 6: Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your keys:

```bash
# Supabase (from Step 2)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ey...
SUPABASE_SERVICE_ROLE_KEY=ey...

# Wallet (from Step 4)
PRIVATE_KEY=0xabc123... (your NEW deployer wallet)
TREASURY_WALLET_BASE=0x... (your treasury wallet)

# OpenX402 (from Step 5)
OPENX402_API_KEY=oxa_live_...

# AI APIs (from Step 5)
GOOGLE_AI_KEY=AI...
NVIDIA_API_KEY=nvapi-...

# Everything else can stay default
```

---

## Step 7: Deploy Smart Contract (Optional)

If you want on-chain escrow instead of OpenX402 facilitator:

```bash
# Install Hardhat
npm install --save-dev hardhat @nomiclabs/hardhat-ethers

# Initialize Hardhat
npx hardhat init
# Choose "Create an empty hardhat.config.js"

# Compile contract
npx hardhat compile

# Update deploy script with your values
# Then deploy:
node scripts/deploy-contract.js
```

**Save the contract address from output and add to .env.local:**
```bash
CONTRACT_ADDRESS=0x...
```

---

## Step 8: Test Locally

```bash
# Start dev server
npm run dev

# In another terminal, run tests
npx playwright test tests/oma-ai-full.spec.ts

# All 30 tests should pass
```

---

## Step 9: Deploy to Production

```bash
# Make sure vercel CLI is installed
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Or use the setup script:
bash scripts/setup-complete.sh
```

**Set environment variables in Vercel Dashboard:**
1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add ALL variables from .env.local

---

## Step 10: Configure Custom Domain

### Add Domain in Vercel:
1. Vercel Dashboard → Project → Settings → Domains
2. Add "oma-ai.com"
3. Follow DNS instructions (add A record)

### Update Supabase:
1. Supabase Dashboard → Authentication → URL Configuration
2. Set Site URL: https://oma-ai.com
3. Add Redirect URLs: https://oma-ai.com/auth/callback

---

## 🎯 How It All Works Now

### For AI Agents:
```javascript
// 1. Agent connects wallet
const wallet = await connectWallet();

// 2. Browse compute on OMA-AI
const compute = await fetch('https://oma-ai.com/api/compute');

// 3. Deploy via Akash MCP
const deployment = await akash.deploy({ gpu: 'h100', hours: 24 });

// 4. Pay with x402
const payment = await createPaymentHeader({ amount: '0.001' });

// 5. Get SSH access
ssh user@deployment-ip
```

### For Publishers (Listing APIs):
1. Connect wallet to https://oma-ai.com
2. Go to /publish
3. Fill in API details:
   - Endpoint URL
   - Price per call (e.g., $0.001)
   - Documentation
4. Click "Publish"
5. Start earning 90% on every call

### For Users (Calling APIs):
```bash
# Get API key from dashboard
curl -H "Authorization: Bearer oma_live_xxx" \
  https://oma-ai.com/api/price

# Or with x402 payment
curl -H "X-Payment: base64payment" \
  https://oma-ai.com/api/premium-data
```

---

## 💰 Revenue Flow

```
User calls API ($0.001)
    ↓
90% → Publisher Wallet ($0.0009)
10% → Treasury Wallet ($0.0001)
    ↓
Platform uses 10% for:
- Server costs
- Development
- Marketing
- Community rewards
```

---

## 🔒 Security Checklist

- [ ] Private keys stored ONLY in .env.local (never committed)
- [ ] .env.local in .gitignore
- [ ] Treasury wallet is separate from deployer wallet
- [ ] Supabase RLS enabled
- [ ] API keys hashed in database
- [ ] Rate limiting configured

---

## 📞 Support

- GitHub Issues: https://github.com/FrankieMolt/OMA-AI/issues
- Discord: https://discord.gg/oma-ai
- Email: support@oma-ai.com

---

## Next Steps After Setup

1. **Add more APIs** - List your first API
2. **Enable x402** - Set up pay-per-call
3. **Deploy agents** - Use Akash compute
4. **Market** - Share on Twitter, Discord
5. **Monitor** - Check analytics dashboard

**You're ready to revolutionize the AI economy!** 🚀