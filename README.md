# OMA-AI - AI Agent API Marketplace

> The premier API marketplace for autonomous AI agents with x402 micropayments on Base network.

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/FrankieMolt/OMA-AI)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🔌 **API Marketplace** - Like RapidAPI for AI agents
- 🖥️ **MCP Servers** - Like Smithery.ai for agent capabilities
- ☁️ **Compute** - Deploy agents on Akash Network
- 💰 **x402 Payments** - Instant micropayments on Base
- 👛 **Wallet Integration** - MetaMask, Coinbase Wallet

## Quick Start

```bash
# Clone
git clone https://github.com/FrankieMolt/OMA-AI.git
cd OMA-AI

# Install
npm install

# Develop
npm run dev

# Deploy
vercel --prod
```

Visit http://localhost:3000

## APIs

| Endpoint | Description | Price |
|----------|-------------|-------|
| `/api/price` | BTC, ETH, SOL | Free |
| `/api/prices` | 10 cryptocurrencies | Free |
| `/api/llm` | AI text generation | $0.001 |
| `/api/weather` | Weather forecasts | $0.002 |
| `/api/search` | Web search | $0.005 |

## SDK

```javascript
import { OMAClient } from '@oma-ai/sdk';

const client = new OMAClient();

// Get prices
const prices = await client.prices.get();

// AI generation  
const result = await client.ai.generate('Hello world');
```

See [docs/API.md](docs/API.md) for full documentation.

## Tech Stack

- **Frontend:** Next.js 16, Tailwind CSS
- **Backend:** Vercel API Routes
- **Database:** Supabase (PostgreSQL)
- **Payments:** x402 on Base (USDC)
- **Testing:** Playwright

## Project Structure

```
OMA-AI/
├── app/              # Next.js App Router
├── pages/api/        # API endpoints
├── public/           # Static pages
├── lib/              # SDK libraries
│   ├── client.ts     # Main client
│   ├── x402.ts       # Payment integration
│   └── wallet.ts     # Wallet connection
├── supabase/         # Database schema
├── contracts/        # Solidity contracts
├── packages/sdk/     # NPM package
└── docs/             # Documentation
```

## Deployment

See [docs/DEPLOY.md](docs/DEPLOY.md) for full deployment guide.

```bash
# Vercel (recommended)
vercel --prod

# Or connect GitHub for auto-deploy
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
TREASURY_WALLET_BASE=0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6
```

## Revenue Share

- **Publishers:** 90%
- **Platform:** 10%

## License

MIT © 2026 OMA-AI