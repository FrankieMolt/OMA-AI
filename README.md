# OMA-AI — MCP Marketplace with x402 Payments

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![License](https://img.shields.io/badge/License-Apache%202.0-green)
![MCP Tools](https://img.shields.io/badge/MCP%20Tools-229+-green)
![Pages](https://img.shields.io/badge/Pages-57+-blue)

**OMA-AI** is the premier MCP (Model Context Protocol) marketplace where AI agents discover, install, and pay for tools using x402 gasless USDC microtransactions on Base.

Unlike traditional API marketplaces with monthly subscriptions, OMA-AI enables **per-call pricing** — agents pay fractions of a cent only when they actually use a tool.

---

## Why OMA-AI?

| | Traditional API Marketplace | OMA-AI |
|---|---|---|
| **Pricing** | Monthly subscriptions ($10-100/mo) | Pay-per-call ($0.001/call) |
| **Authentication** | API keys to manage | x402 HTTP 402 protocol |
| **Payments** | Credit cards, slow payouts | USDC on Base, instant settlement |
| **Platform fee** | 20-40% | 5% |
| **For agents** | Requires human oversight | Fully autonomous |

---

## What's MCP?

The **Model Context Protocol** is a standardized interface that lets AI agents connect to external tools and services. Think of it as USB for AI — a universal plug that lets any AI model use any tool without custom integration code.

MCPs include:
- **Data sources** — Crypto prices, weather, web search, stock data
- **Compute** — File operations, code execution, database queries
- **Services** — GitHub, Slack, email, payment APIs
- **Blockchain** — Solana RPC, Ethereum RPC, token swaps

---

## Features

### For AI Agents
- ✅ Browse and install 229+ MCP tools from verified creators
- ✅ Pay per call via x402 — no subscriptions, no wasted spend
- ✅ Auto-topup wallet when balance runs low
- ✅ Rate limiting and quota management
- ✅ Multi-chain support (Base + Solana)

### For MCP Creators
- ✅ 4-step publish wizard — go live in minutes
- ✅ Keep 95% of revenue (only 5% platform fee)
- ✅ Multiple pricing models: per-call, subscriptions, license keys
- ✅ Real-time analytics: calls, revenue, success rates
- ✅ USDC payouts on Base or Solana

### Platform
- ✅ 57+ pages of content and documentation
- ✅ 13 blog posts on AI agents and x402 payments
- ✅ Interactive MCP marketplace with search and filtering
- ✅ Verified MCP badges for trusted tools
- ✅ Row Level Security on all database tables

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build && npm start
```

---

## Environment Variables

Create `.env.local`:

```env
# Supabase (required for full functionality)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Payment wallet (receive USDC earnings)
OMA_AI_PAYMENT_WALLET=0xYOUR_BASE_WALLET

# Optional RPCs (defaults work out of the box)
BASE_RPC_URL=https://mainnet.base.org
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

---

## Database Setup

Run `database/schema-updated.sql` on Supabase to create:

**Core tables:** `users`, `wallets`, `user_settings`

**MCP tables:** `mcps`, `mcp_tools`, `mcp_categories`, `mcp_reviews`, `mcp_favorites`

**Monetization:** `credits_packages`, `credit_purchases`, `license_keys`, `subscriptions`

**Transactions:** `transactions`, `payouts`, `api_keys`, `api_usage_logs`, `x402_nonces`

**Agent features:** `agent_resale_markups`, `webhooks`, `notifications`, `audit_logs`

---

## Revenue Split

| Revenue Stream | OMA-AI | Creator |
|----------------|--------|---------|
| Credit purchases | 0% | 100% |
| MCP sales | 5% | 95% |
| Per-call API | 5% | 95% |
| Subscriptions | 5% | 95% |

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.2
- **Styling:** TailwindCSS
- **Database:** Supabase (PostgreSQL + Auth + Realtime)
- **Payments:** x402 protocol on Base (USDC)
- **Blockchain:** Base + Solana

---

## Links

- 🌐 **Website:** https://oma-ai.com
- 📖 **x402 Protocol:** https://docs.x402.org
- 🔧 **MCP Spec:** https://modelcontextprotocol.io
- 📂 **GitHub:** https://github.com/NosytLabs/OMA-AI

---

Built with Next.js, React, TypeScript, TailwindCSS, Supabase, and x402.