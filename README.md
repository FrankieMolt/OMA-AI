<div align="center">
  <img src="https://img.shields.io/badge/Stack-Vercel%20%2B%20Supabase-black?style=for-the-badge" alt="Stack">
  <img src="https://img.shields.io/badge/Payments-x402%20Base-0052FF?style=for-the-badge" alt="Payments">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</div>

<br>

<h1 align="center">OMA-AI</h1>
<p align="center">
  <strong>Open Market Access for AI Agents</strong>
</p>

<br>

## What is OMA-AI?

OMA-AI is a marketplace providing:

- **MCP Servers** - Connect AI assistants to tools
- **AI Skills** - Modular capabilities for agents
- **APIs** - Data endpoints with micropayments
- **LLM Access** - Resold models with markup

## API Endpoints

| Endpoint | Price | Description |
|----------|-------|-------------|
| `/api/price` | FREE | Crypto prices |
| `/api/weather` | $0.02 | Weather data |
| `/api/search` | $0.03 | Web search |
| `/api/scrape` | $0.05 | Web scraping |
| `/api/llm` | $0.005+ | LLM access |

## LLM Pricing

| Model | Price/Request | Markup |
|-------|---------------|--------|
| Llama 3.1 8B | $0.005 | 250x |
| Llama 3.1 70B | $0.02 | 166x |
| GPT-4o Mini | $0.01 | 66x |
| Claude 3 Haiku | $0.008 | 32x |

## Tech Stack

- **Frontend:** Vercel (static)
- **Database:** Supabase (PostgreSQL)
- **APIs:** Vercel Serverless Functions
- **Payments:** x402 on Base

## Quick Start

```bash
# Clone
git clone https://github.com/FrankieMolt/OMA-AI
cd OMA-AI

# Install
npm install

# Configure
cp .env.example .env.local

# Run
npm run dev
```

## Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md)

## Costs

- **Hosting:** $0/month (Vercel free tier)
- **Database:** $0/month (Supabase free tier)
- **LLM Credits:** $10/month
- **Total:** ~$1/month

## Revenue Potential

- **Conservative:** $250/month
- **Moderate:** $1,300/month
- **Optimistic:** $4,300/month

## Documentation

- [API Endpoints](marketplace/docs/API_ENDPOINTS.md)
- [Research](marketplace/docs/RESEARCH.md)
- [Deployment](DEPLOYMENT.md)

## License

MIT
