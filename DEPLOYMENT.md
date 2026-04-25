# OMA-AI Platform - Deployment Guide

## What's Been Built

### ✅ Core Platform
- **Next.js 15** frontend with 40+ routes
- **MCP Marketplace** with 21 pre-configured MCPs (free + paid via x402)
- **x402 Payment Integration** (USDC on Base network, pay-per-call)
- **Agent Wallet System** (autonomous AI agents pay each other)
- **Database Schema** (PostgreSQL via Supabase)
- **Wallet Connection UI** (MetaMask-compatible)

### ✅ API Integrations (Working)
- `/api/crypto` → CoinGecko (real prices)
- `/api/weather` → wttr.in (real data)
- `/api/embeddings` → HuggingFace API

### ✅ x402 Payments
- Payment library at `src/lib/x402/`
- Public widget at `public/x402-widget/`
- Multi-network support (Base USDC)

### ✅ Database Schema
- Full schema at `database/schema-updated.sql`
- Supports credits, agent resale, payouts, ai_agents table, human_services table
- 15 tables with RLS policies

---

## Quick Start

### 1. Environment Variables
```bash
cd /home/oldpc/oma-ai-repo
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Supabase (Required for full functionality)
NEXT_PUBLIC_SUPABASE_URL=https://oooijcrqpuqymgzlidrw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_vCE_Knlj8namzHAP9VcKHQ_82TvarEi
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Payment Wallets (for receiving USDC)
OMA_AI_PAYMENT_WALLET=0xYOUR_BASE_WALLET

# RPC URLs (optional, defaults provided)
BASE_RPC_URL=https://mainnet.base.org

# OpenRouter (optional, for LLM catalog)
OPENROUTER_API_KEY=sk-or-v1-...
```

### 2. Database Setup
1. Connect to Supabase project
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
- Connect wallet (MetaMask/Base)
- Purchase credits with USDC
- Use MCPs locally (free) or via API (paid)

### For MCP Creators
- Submit MCPs via `/publish` page
- Set pricing (free, per-call, subscription)
- Earn 95% revenue share
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
| MCP sales | 5% | 95% |
| Per-call API | 5% | 95% |

---

## API Endpoints

### MCPs
- `GET /api/mcp/list` - List all MCPs (uses mcp-data.ts)
- `GET /api/mcp/[slug]` - Get MCP details
- `POST /api/mcp/register` - Submit new MCP

### Payments
- `POST /api/x402/sign` - Sign payment

### Data
- `GET /api/crypto` - Real-time prices
- `GET /api/weather` - Real weather data

---

## Production Checklist

- [x] Set up Supabase project
- [x] Configure environment variables
- [x] Add payment wallet addresses
- [x] Set up domain/SSL
- [x] Configure build/deploy pipeline

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 15, React 19, Tailwind |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Payments | x402 (USDC on Base) |
| Hosting | Vercel (frontend) + Railway (on-demand MCPs) |

---

## Support

- Website: https://oma-ai.com
- Documentation: https://oma-ai.com/docs
