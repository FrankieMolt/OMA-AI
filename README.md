# OMA-AI - MCP Marketplace with x402 Payments

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![License](https://img.shields.io/badge/License-Apache%202.0-green)

**OMA-AI** is a premier MCP (Model Context Protocol) marketplace platform enabling AI agents to earn, trade, and monetize autonomous services using x402 gasless payments on Base/Solana networks.

## 🎯 What It Is

A fully-featured MCP marketplace where:
- **Users** discover and install MCP servers
- **Creators** publish and monetize their MCPs
- **AI Agents** autonomously purchase and use MCPs with USDC via x402 protocol

## ✨ Features

### Core Platform
- ✅ MCP Marketplace with 19+ MCP servers
- ✅ Search, filter by category, verified badges
- ✅ Multi-step MCP submission/publishing flow
- ✅ User dashboard with usage tracking

### Monetization (Built-in)
- ✅ **Credits System** - Prepaid credit wallet
- ✅ **Per-Call Pricing** - Pay per API request
- ✅ **Subscriptions** - Monthly/yearly plans
- ✅ **License Keys** - One-time purchase MCPs
- ✅ **x402 Payments** - USDC on Base/Solana

### APIs
- ✅ `/api/crypto` → CoinGecko (real prices)
- ✅ `/api/weather` → wttr.in (real data)
- ✅ `/api/embeddings` → HuggingFace
- ✅ Full MCP CRUD APIs

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development
npm run dev

# Build for production
npm run build
npm start
```

## ⚙️ Environment Variables

Create `.env.local`:

```env
# Supabase (for full functionality)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Payment wallet (receive USDC)
OMA_AI_PAYMENT_WALLET=0xYOUR_BASE_WALLET

# Optional RPCs (defaults provided)
BASE_RPC_URL=https://mainnet.base.org
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

## 📦 Database Schema

Run `database/schema-updated.sql` on Supabase to create:
- `users`, `wallets`, `user_settings`
- `mcps`, `mcp_tools`, `mcp_categories`, `mcp_reviews`
- `credits_packages`, `credit_purchases`
- `license_keys`, `subscriptions`
- `transactions`, `payouts`
- `api_keys`, `api_usage_logs`, `usage_stats`
- `agent_resale_markups`, `webhooks`
- `x402_nonces`, `notifications`, `audit_logs`

## 💰 Revenue Model

| Revenue Stream | OMA-AI | Creator |
|-----------------|--------|---------|
| Credit purchases | 100% | - |
| MCP Sales | 15% | 85% |
| Per-call API | 15% | 85% |
| Subscription | 15% | 85% |

## 📁 Project Structure

```
src/
├── app/                # Next.js 15 app router
│   ├── api/           # API routes
│   ├── mcps/          # MCP marketplace pages
│   ├── dashboard/     # User dashboard
│   └── publish/       # MCP submission
├── components/        # React components
├── lib/               # Utilities
│   ├── x402/          # x402 payment logic
│   └── monetization/   # Credits, billing
└── styles/            # Global styles

database/
└── schema-updated.sql # Full database schema
```

## 🌐 Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/mcps` | MCP marketplace |
| `/mcps/[slug]` | MCP detail page |
| `/publish` | Submit new MCP |
| `/dashboard` | User dashboard |
| `/wallet` | Wallet management |
| `/pricing` | Pricing plans |

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- API key hashing for storage
- Webhook signature verification
- x402 payment verification

## 📄 License

Apache 2.0 - See LICENSE file

## 🔗 Links

- Website: https://oma-ai.com
- x402 Protocol: https://docs.x402.org
- MCP Spec: https://modelcontextprotocol.io

---

**Built with**: Next.js 15, React 19, TypeScript, TailwindCSS, Supabase, x402
