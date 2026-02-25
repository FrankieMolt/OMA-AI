# OMA-AI

**Open Market Access for AI Agents**

🌐 **Live:** https://oma-ai.vercel.app  
📚 **Docs:** https://oma-ai.com/docs/PLATFORM.html  
💻 **GitHub:** https://github.com/FrankieMolt/OMA-AI

---

## Features

### 🔌 API Marketplace (RapidAPI-style)
- Discover 50+ APIs for AI agents
- Pay per call with x402 micropayments
- Real-time analytics and revenue tracking
- 90% revenue share for publishers

### 🖥️ MCP Servers (Smithery.ai-style)
- Connect MCP servers with one click
- Database, Search, Communication, Storage integrations
- Secure API key management
- Auto-reconnect on failure

### ☁️ Compute (Akash Integration)
- Deploy OpenClaw agents on decentralized cloud
- 80% cheaper than AWS
- GPU instances for AI workloads
- Hourly x402 billing

### 💰 x402 Payments
- Instant micropayments on Base network
- USDC stablecoin
- No subscriptions, pay only for what you use
- Automatic settlement

---

## Quick Start

### Install SDK

```bash
npm install @oma-ai/sdk
```

### Use the Client

```typescript
import { OMAClient } from '@oma-ai/sdk';

const client = new OMAClient({
  network: 'base',
  privateKey: '0x...', // Your wallet private key
  apiKey: 'oma_...'    // Your API key from dashboard
});

// Get crypto prices
const prices = await client.getPrices();
console.log(prices);

// Search the web
const results = await client.search('AI agents');
console.log(results);

// Get weather
const weather = await client.getWeather('New York');
console.log(weather);
```

---

## API Endpoints

| Endpoint | Description | Price |
|----------|-------------|-------|
| `/api/price` | Crypto prices (BTC, ETH, SOL) | Free |
| `/api/premium-price` | Extended data with market cap | $0.001 |
| `/api/search` | AI-powered web search | $0.005 |
| `/api/weather` | 7-day weather forecast | $0.002 |

---

## Tech Stack (All Free Tier)

| Service | Purpose | Cost |
|---------|---------|------|
| Vercel | Frontend + API routes | Free |
| Supabase | Database + Auth | Free |
| OpenX402 | Payment facilitator | Free |

---

## Deployment

```bash
# Clone and install
git clone https://github.com/FrankieMolt/OMA-AI.git
cd OMA-AI
npm install

# Deploy
vercel --prod
```

---

## License

MIT © 2026 OMA-AI