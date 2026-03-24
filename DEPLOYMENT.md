# OMA-AI Platform - Deployment Guide

## What's Been Built

### ✅ Core Platform
- **Next.js 15** frontend with 34 routes
- **MCP Marketplace** with 19 pre-configured MCPs
- **x402 Payment Integration** (Base/Solana USDC)
- **Database Schema** (PostgreSQL via Supabase)
- **Wallet Connection** UI

### ✅ API Integrations (Working)
- `/api/crypto` → CoinGecko (real prices)
- `/api/weather` → wttr.in (real data)
- `/api/embeddings` → HuggingFace API

### ✅ x402 Payments
- Payment library at `src/lib/x402/`
- Public widget at `public/x402-widget/`
- Multi-network support (Base, Solana)

### ✅ Database Schema
- Full schema at `database/schema-updated.sql`
- Supports credits, agent resale, payouts
- 15 tables with RLS policies

---

## Quick Start

### 1. Environment Variables
```bash
cd /home/nosyt/oma-ai-repo
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Supabase (Required for full functionality)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Payment Wallets (for receiving USDC)
OMA_AI_PAYMENT_WALLET=0xYOUR_BASE_WALLET

# RPC URLs (optional, defaults provided)
BASE_RPC_URL=https://mainnet.base.org
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

### 2. Database Setup
1. Create Supabase project
2. Run `database/schema-updated.sql`
3. Configure environment variables

### 3. Build & Deploy
```bash
npm run build
# Output: .next/
```

### 4. Start Production
```bash
npm start
# Runs on port 3000
```

---

## Features

### For Users
- Browse/search MCP marketplace
- Connect wallet (Base/Solana)
- Purchase credits with USDC
- Use MCPs locally (free) or via API (paid)

### For MCP Creators
- Submit MCPs via `/publish` page
- Set pricing (free, per-call, subscription)
- Earn 85% revenue share
- Track usage in dashboard

### For AI Agents
- Query MCPs via API
- Pay per-call via x402
- Resell MCPs with markup

---

## Revenue Models

| Model | OMA-AI Earns | Seller Earns |
|-------|--------------|--------------|
| Credit purchases | 100% | - |
| MCP sales | 15% | 85% |
| Per-call API | 15% | 85% |

---

## API Endpoints

### MCPs
- `GET /api/mcp/list` - List all MCPs
- `GET /api/mcp/[slug]` - Get MCP details
- `POST /api/mcp/register` - Submit new MCP

### Payments
- `POST /api/x402/sign` - Sign payment

### Data
- `GET /api/crypto` - Real-time prices
- `GET /api/weather` - Real weather data

---

## Production Checklist

- [ ] Set up Supabase project
- [ ] Configure environment variables
- [ ] Add payment wallet addresses
- [ ] Set up domain/SSL
- [ ] Configure build/deploy pipeline

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 15, React 19, Tailwind |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Payments | x402 (USDC on Base/Solana) |
| Hosting | Vercel / Railway / Self-hosted |

---

## Support

- Website: https://oma-ai.com
- Documentation: https://oma-ai.com/docs
