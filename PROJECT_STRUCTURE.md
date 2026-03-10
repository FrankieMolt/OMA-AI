# OMA-AI Platform - Project Structure

> Last Updated: 2026-03-03

## 🎯 What is OMA-AI?

OMA-AI is an **API marketplace for autonomous AI agents** with built-in x402 micropayments. It provides:

- **LLM Gateway** - Unified API for 14+ AI models (Venice + OpenRouter)
- **x402 Payments** - Pay-per-call with USDC on Base network
- **MCP Registry** - Model Context Protocol servers for AI integration
- **Mining/Workers** - Compute nodes that earn revenue
- **Privacy-First** - Zero data retention on private models

---

## 📁 Directory Structure

```
workspace/
├── 📄 AGENTS.md              # Agent rules and guidelines
├── 📄 MEMORY.md              # System state and portfolio
├── 📄 README.md              # Project overview
├── 📄 STATUS.md             # Live status dashboard
├── 📄 COMPREHENSIVE_AUDIT_REPORT.md  # Full codebase audit
│
├── 📁 app/                   # Next.js App Router (minimal usage)
├── 📁 pages/                 # Next.js Pages Router (21 API routes)
│   └── api/                  # API endpoints
│
├── 📁 public/                # Static assets (17 HTML pages)
│   ├── index.html           # Homepage
│   ├── models.html          # Model catalog
│   ├── pricing.html         # Pricing + mining CTA
│   └── ...                  # Other pages
│
├── 📁 oma-ai-repo/           # ⚠️ DUPLICATE main project
│   └── app/
│
├── 📁 oma-ai-api/            # API service (59MB)
│   └── server.js            # Express server
│
├── 📁 oma-ai-miner/          # Mining service (53MB)
│   └── worker.js            # Worker node
│
├── 📁 oma-ai-contracts/      # Smart contracts (443MB)
│   └── contracts/           # Solidity contracts
│
├── 📁 lethometry/            # Built Next.js app (857MB)
│   └── (app built to static)
│
├── 📁 canclaw/               # Tool framework (572KB)
│
├── 📁 automaton/             # Autonomous agent (1.4MB)
│   └── apis/                # API integrations
│       └── nosyt-ai/         # Trading bot
│
├── 📁 nosyt-finance/         # Trading bot scripts
│
├── 📁 openmarketaccess/      # MCP-focused project (388KB)
│
├── 📁 scrapling-env/         # Python virtual environment
│
├── 📁 skills/                # Agent skills (17MB)
│   ├── audit-website/        # Website auditing
│   ├── bsv-wallet/          # BSV wallet
│   ├── browser/            # Browser automation
│   ├── discord/             # Discord bot
│   ├── github/              # GitHub operations
│   ├── healthcheck/         # Security audits
│   ├── here-now/            # File publishing
│   ├── mcp-builder/         # MCP server builder
│   ├── nosyt-trader/        # Crypto trading
│   ├── presearch/           # Decentralized search
│   ├── session-logs/        # Log analysis
│   ├── skill-creator/       # Skill creation
│   ├── tmux/                # Tmux control
│   ├── video-frames/        # Video processing
│   └── weather/             # Weather data
│
├── 📁 docs/                  # Documentation
├── 📁 tests/                 # E2E tests (2 Playwright)
├── 📁 scripts/               # Utility scripts
├── 📁 lib/                   # Shared libraries
├── 📁 supabase/              # Database schema
├── 📁 components/            # React components
├── 📁 .archive/              # Archived old files (628KB)
├── 📁 archive/               # Logs and old MD files
├── 📁 memory/                # Daily memory files
│
└── 📄 package.json           # Main project dependencies
```

---

## 🚀 Services Status

| Service | Port | Path | Status |
|---------|------|------|--------|
| oma-ai-static | 3000 | public/ (Next.js) | ✅ Running |
| lethometry | 3002 | lethometry/ | ✅ Running |
| scrapling-api | 3004 | scrapling-env/ | ✅ Running |
| nosyt-ai | 3006 | automaton/apis/nosyt-ai/ | ✅ Running |
| oma-ai-api | 3007 | oma-ai-api/ | ✅ Running |

---

## 🔧 Tech Stack

### Frontend
- **Framework**: Next.js 16.1.6 (App Router + Pages Router)
- **UI**: React 18.2.0 + Tailwind CSS 3.4.0
- **Components**: Radix UI, Framer Motion 11.0.0
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes + Express (oma-ai-api)
- **Database**: Supabase (PostgreSQL) + SQLite (better-sqlite3)
- **Testing**: Playwright 1.58.2 + Jest 25.0.0

### Web3 & Payments
- **Payments**: x402 protocol (@x402/core, @x402/evm, @x402/svm)
- **Networks**: Ethereum (wagmi 2.19.5, viem 2.46.2), Solana (@solana/web3.js)
- **Wallet**: RainbowKit, Solana Wallet Adapter

### AI & Inference
- **LLM Gateway**: Venice AI (private, uncensored)
- **Fallback**: OpenRouter
- **Local**: @google/generative-ai

---

## 🎨 Key Features

### 1. API Marketplace
- 14+ LLM models available
- 3-tier pricing (Free, Starter, Pro, Enterprise)
- Pay-per-call with x402 micropayments
- 1000 free credits for new users

### 2. Mining/Workers
- Deploy compute nodes and earn revenue
- 90% revenue share for miners
- Real-time stats dashboard

### 3. Privacy-First
- Zero data retention on Venice private models
- End-to-end SSL encryption
- Decentralized GPU providers

### 4. Trading Bot (NOSYT)
- Solana-based trading
- Automated signals
- Portfolio management

---

## 📊 API Endpoints

### LLM Gateway
```
GET  /v1/models                          # List all models
POST /v1/chat/completions               # Chat completion
POST /v1/images/generations             # Image generation
GET  /v1/credits                        # Check credit balance
```

### Platform APIs
```
GET  /api/health                         # Health check
POST /api/miners/register               # Register miner
GET  /api/miners/stats                   # Miner statistics
GET  /api/prices                         # Crypto prices
POST /api/llm                           # LLM gateway
```

---

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev                  # Next.js on port 3000

# Build
npm run build
npm run start                # Production

# Testing
npm run test                 # Jest unit tests
npm run test:e2e            # Playwright E2E
npm run test:all            # All tests

# Linting
npm run lint
npm run type-check
```

---

## 🚦 Current Issues

### Critical
- ⚠️ Duplicate codebase (root + oma-ai-repo/)
- ⚠️ Mixed routing (App Router + Pages Router)
- ⚠️ Monolithic API files (900+ lines)

### High Priority
- ⚠️ Venice API key missing (demo mode only)
- ⚠️ SOL funding needed for trading (need 0.5 SOL)

### Medium Priority
- ⚠️ Limited test coverage (only 2 E2E tests)
- ⚠️ CSS and asset duplication

---

## 🎯 Roadmap

### Phase 1: Foundation ✅
- [x] Venice AI integration
- [x] 14 models with pricing
- [x] Basic rate limiting
- [x] Privacy documentation

### Phase 2: Monetization (Current)
- [ ] Stripe billing integration
- [ ] User accounts (Supabase Auth)
- [ ] Usage analytics dashboard
- [ ] OpenRouter fallback fully implemented

### Phase 3: Scale
- [ ] MCP server integration
- [ ] Free API marketplace
- [ ] SDK (Python, Node, Go)
- [ ] Enterprise features

---

## 📝 Documentation

- **Live Site**: https://oma-ai.com
- **GitHub**: https://github.com/FrankieMolt/OMA-AI
- **Venice Docs**: https://docs.venice.ai
- **x402 Protocol**: https://www.x402.org

---

## 💰 Revenue Model

| Tier | Monthly | Rate Limit | Tokens/Day | Margin |
|------|---------|------------|------------|--------|
| Free | $0 | 5/min, 50/day | 100K | - |
| Starter | $10 | 20/min, 500/day | 1M | 50% |
| Pro | $50 | 60/min, 5K/day | 10M | 50% |
| Enterprise | Custom | Unlimited | 100M+ | 40% |

### Model Pricing (with markup)
- **Budget (50-60% markup)**: GLM 4.7 Flash, Venice Uncensored
- **Standard (40-50% markup)**: DeepSeek V3.2, Llama 3.3 70B, Kimi K2.5
- **Premium (30-40% markup)**: GPT-5.2, Claude Sonnet 4.6, Claude Opus 4.6

---

## 🔗 Links

- **Portfolio**: $22.50 (JUP $15+, MSOL $6, RAY $3.36, SOL $0.08)
- **Wallet**: `DcPfnhNQt98oXhgA7shgXpo2pgTzJMKf6TWuaddqqpSN`
- **Test Coverage**: 30/30 tests passing
- **Services**: 5/5 online

---

*This structure needs refactoring to eliminate duplicates and unify the codebase.*
