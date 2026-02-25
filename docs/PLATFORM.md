# OMA-AI Platform Documentation

## Overview

OMA-AI (Open Market Access) is the premier API marketplace for AI agents. Built with x402 micropayments on Base network, it enables autonomous agents to discover, connect, and pay for APIs, MCP servers, and compute resources.

## Features

### 🔌 API Marketplace
- **List APIs**: Publish your APIs and earn revenue
- **Discover**: Browse 50+ APIs for AI agents
- **x402 Payments**: Pay per call with automatic settlement
- **Analytics**: Track usage, earnings, and performance

### 🖥️ MCP Servers (Smithery.ai-style)
- **Connect**: One-click connection to MCP servers
- **Auth Management**: Secure API key handling
- **Categories**: Database, Search, Communication, Storage

### ☁️ Compute (Akash Integration)
- **Decentralized Cloud**: Deploy on Akash Network
- **80% Cheaper**: Than AWS, Google Cloud
- **x402 Billing**: Pay hourly with USDC on Base

## Quick Start

### 1. Connect Wallet
```javascript
import { X402Wallet } from '@oma-ai/wallet';

const wallet = new X402Wallet({
  network: 'base',
  privateKey: process.env.PRIVATE_KEY
});
```

### 2. Call an API
```javascript
const response = await fetch('https://oma-ai.com/api/price', {
  headers: {
    'X-Payment': await wallet.createPaymentHeader({
      amount: '0.001',
      currency: 'USDC'
    })
  }
});
```

### 3. List Your API
1. Go to https://oma-ai.com/dashboard
2. Click "+ New API"
3. Enter endpoint URL and pricing
4. Start earning

## Pricing

| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | 100 calls/day |
| Pro | $9/mo | 10,000 calls/day |
| Enterprise | Custom | Unlimited, support |

## Revenue Share

- **Publishers**: Keep 90% of API revenue
- **Platform**: 10% fee

## Supported Networks

- **Base** (Primary): USDC payments
- **Solana**: Coming soon

## Tech Stack

| Component | Service | Cost |
|-----------|---------|------|
| Frontend | Vercel | Free |
| Database | Supabase | Free |
| Payments | x402/OpenX402 | Free |
| Compute | Akash Network | ~$5-50/mo |

## API Reference

### Price API
```bash
GET /api/price
# Returns: { btc, eth, sol prices }
```

### Search API
```bash
GET /api/search?q=query&limit=10
# Returns: { results: [...] }
```

### Weather API
```bash
GET /api/weather?city=London
# Returns: { current, forecast }
```

## Deployment

### Vercel
```bash
vercel --prod
```

### Supabase
```bash
supabase db push
```

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# x402
OPENX402_API_KEY=
TREASURY_WALLET_BASE=
TREASURY_WALLET_SOL=

# External APIs
COINGECKO_API_KEY=
WEATHER_API_KEY=
EXA_API_KEY=
```

## Security

- All payments use x402 protocol
- Wallet-based authentication
- API keys encrypted at rest
- Rate limiting enforced

## Support

- Discord: https://discord.gg/oma-ai
- GitHub: https://github.com/FrankieMolt/OMA-AI
- Email: hello@oma-ai.com

## License

MIT © 2026 OMA-AI