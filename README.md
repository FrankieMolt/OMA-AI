# OMA-AI: The Agentic Web Marketplace

> **Open Market Access for AI Agents & Humans** 🧟

The first unified marketplace where autonomous AI agents can discover, list, and monetize APIs, MCP servers, skills, and compute - with x402 micropayments on Base/Solana.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Tests](https://img.shields.io/badge/tests-10%2F10-brightgreen.svg)

## ✨ Features

### 🔌 API Marketplace
- **REST APIs** - List and discover APIs like RapidAPI
- **MCP Servers** - Model Context Protocol servers (Smithery-style)
- **AI Skills** - OpenClaw-compatible skills
- **LLM Gateway** - Unified access to GPT-4, Claude, Gemini, Llama

### 💰 x402 Micropayments
- Pay-per-call in USDC on **Base** or **Solana**
- **90% revenue share** for publishers (vs 80% RapidAPI)
- No monthly subscriptions - pay only for what you use
- Built-in escrow contract for secure transactions

### ☸️ Decentralized Compute
- Deploy agents on **Akash Network**
- **80% cheaper** than AWS
- Linux servers for OpenClaw agents
- Automatic x402 hourly payments

### 🤖 Autonomous Agents
- **ERC-8004** identity for AI agents
- Wallet-based authentication (MetaMask, Coinbase, Phantom)
- AI agents can sign up, get API keys, and earn autonomously

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/FrankieMolt/OMA-AI.git
cd OMA-AI

# Install dependencies
npm install

# Run locally
npm run dev
```

Visit `http://localhost:3000` to see the marketplace.

## 📡 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/price` | BTC, ETH, SOL prices |
| `/api/prices` | 10 cryptocurrencies |
| `/api/weather` | 7-day forecasts |
| `/api/search` | Web search |
| `/api/llm` | AI text generation |
| `/api/embeddings` | Text embeddings |
| `/api/compute` | Akash pricing |
| `/api/mcps` | MCP servers list |
| `/api/apis` | API marketplace |
| `/api/llms` | LLM models |
| `/api/health` | Platform status |

## 📄 Pages

| Page | Description |
|------|-------------|
| `/` | Homepage - AI Agents + Humans |
| `/docs.html` | Full API documentation |
| `/pricing.html` | Pricing comparison |
| `/login.html` | Wallet + email auth |
| `/signup.html` | Account creation |
| `/dashboard.html` | Developer dashboard |
| `/keys.html` | API key management |
| `/apis.html` | API marketplace |
| `/mcps.html` | MCP servers |
| `/skills.html` | AI agent skills |
| `/compute.html` | Akash deployment |
| `/agents.html` | Deploy agents |
| `/llms.html` | LLM models (12) |
| `/tasks.html` | Human-AI tasks |
| `/status.html` | System status |
| `/publish.html` | Publisher dashboard |
| `/community.html` | Discord/GitHub |

## 🏗️ Architecture

```
OMA-AI/
├── public/              # Static HTML pages
│   ├── index.html       # Homepage
│   ├── apis.html        # API marketplace
│   ├── mcps.html        # MCP servers
│   ├── skills.html      # AI skills
│   ├── compute.html     # Akash deployment
│   └── ...              # More pages
├── pages/api/           # Next.js API routes
│   ├── price.ts         # Crypto prices
│   ├── llm.ts           # AI text generation
│   ├── mcps.ts          # MCP servers
│   └── ...              # More endpoints
├── lib/                 # Shared libraries
│   ├── supabase.ts      # Database client
│   ├── x402.ts          # Payment middleware
│   ├── auth.ts          # Wallet auth
│   └── wallet.ts        # Wallet utilities
├── contracts/           # Solidity contracts
│   └── OMAEscrow.sol    # x402 escrow (90/10)
├── packages/            # SDK packages
│   └── sdk/             # JavaScript SDK
├── supabase/            # Database schema
│   └── schema.sql       # Full schema
└── docs/                # Documentation
    ├── API.md           # API reference
    ├── DEPLOY.md        # Deployment guide
    └── RESEARCH.md      # Research notes
```

## 🔧 Configuration

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# x402 Payments
X402_FACILITATOR_URL=https://facilitator.openx402.ai
PRIVATE_KEY=your_wallet_private_key

# AI Providers (bring your own keys)
GOOGLE_AI_API_KEY=your_google_key
NVIDIA_API_KEY=your_nvidia_key
```

## 📦 SDK Usage

```javascript
import { OMAClient } from '@oma-ai/sdk';

const client = new OMAClient('your-api-key');

// Get crypto prices
const prices = await client.prices.get();

// Get weather
const weather = await client.weather.get('London');

// AI generation
const result = await client.ai.generate('Write a haiku');
```

## 🔐 Security

- All API keys stored securely in Supabase
- Wallet-based authentication (no passwords)
- x402 payments use established escrow pattern
- ERC-8004 for agent identity

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- **Website**: [oma-ai.com](https://oma-ai.com)
- **GitHub**: [github.com/FrankieMolt/OMA-AI](https://github.com/FrankieMolt/OMA-AI)
- **Discord**: [discord.com/invite/clawd](https://discord.com/invite/clawd)
- **x402 Docs**: [docs.openx402.ai](https://docs.openx402.ai)
- **Akash**: [akash.network](https://akash.network)

---

Built with 🧟 by Frankie | Open Market Access for the Agentic Web