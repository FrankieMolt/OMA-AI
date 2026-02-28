# OMA-AI - Sovereign AI API Marketplace

> Private, uncensored AI inference. Zero data retention. Powered by Venice.

## 🎯 Project Overview

OMA-AI is a privacy-first AI API marketplace that resells Venice AI and OpenRouter models with markup pricing. Key differentiators:

- **Privacy-first**: Zero data retention on private models
- **Uncensored options**: Venice Uncensored for unrestricted generation
- **Simplified pricing**: 3 tiers instead of 300+ models
- **Aggregated billing**: One provider for multiple backends

## 📁 Project Structure

```
oma-ai-repo/
├── pages/
│   ├── api/           # API endpoints
│   │   ├── llm.ts            # Main LLM gateway (Venice)
│   │   ├── llm-unified.ts    # Dual-provider (Venice + OpenRouter)
│   │   ├── auth/             # Authentication
│   │   ├── crypto.ts         # Crypto prices
│   │   ├── health.ts         # Health check
│   │   └── ...
│   ├── _app.tsx
│   └── _document.tsx
├── public/
│   ├── index.html       # Homepage
│   ├── models.html      # All 38 models
│   ├── pricing.html     # Pricing + calculator
│   ├── docs.html        # API documentation
│   ├── privacy.html     # Privacy architecture
│   └── ...
├── docs/               # Documentation
└── supabase/           # Database config
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Deploy to Vercel
vercel --prod
```

## 🔑 Environment Variables

```env
# Required for LLM API
VENICE_API_KEY=your_venice_key
OPENROUTER_API_KEY=your_openrouter_key  # Optional fallback

# Database (Supabase)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

## 💰 Revenue Model

### Pricing Tiers

| Tier | Monthly | Rate Limit | Tokens/Day | Margin |
|------|---------|------------|------------|--------|
| Free | $0 | 5/min, 50/day | 100K | - |
| Starter | $10 | 20/min, 500/day | 1M | 50% |
| Pro | $50 | 60/min, 5K/day | 10M | 50% |
| Enterprise | Custom | Unlimited | 100M+ | 40% |

### Model Pricing (with markup)

**Budget (50-60% markup)**
- GLM 4.7 Flash: $0.20/$0.80 per 1M tokens
- Venice Uncensored: $0.35/$1.50 per 1M tokens

**Standard (40-50% markup)**
- DeepSeek V3.2: $0.60/$1.50 per 1M tokens
- Llama 3.3 70B: $1.00/$4.00 per 1M tokens
- Kimi K2.5: $1.10/$5.50 per 1M tokens

**Premium (30-40% markup)**
- GPT-5.2: $3.00/$24.00 per 1M tokens
- Claude Sonnet 4.6: $5.00/$25.00 per 1M tokens
- Claude Opus 4.6: $8.00/$42.00 per 1M tokens

## 🏗️ Architecture

```
User Request
     ↓
OMA-AI API Gateway
     ↓
┌─────────────────────────────────────┐
│ Rate Limiting (Upstash Redis)       │
│ Token Accounting (Supabase)         │
│ Billing Calculation                 │
└─────────────────────────────────────┘
     ↓
┌─────────┬─────────┐
│ Venice  │ OpenRouter │  (Provider Selection)
└─────────┴─────────┘
     ↓
Response + Cost Tracking
```

## 📊 Hosting Costs (Vercel)

| Plan | Cost | Includes |
|------|------|----------|
| Hobby | Free | 100GB bandwidth, 100K serverless invocations |
| Pro | $20/mo | 1TB bandwidth, 1M serverless, team features |
| Enterprise | Custom | Unlimited, SLAs, dedicated support |

**Estimated costs at scale:**
- 10K requests/day: ~$20-50/mo
- 100K requests/day: ~$100-300/mo
- 1M requests/day: ~$500-1500/mo

## 🔌 API Endpoints

### LLM Chat Completion
```
POST /api/llm
Authorization: Bearer oma_your_key

{
  "model": "deepseek-v3.2",
  "prompt": "Hello!",
  "max_tokens": 500,
  "web_search": false,
  "uncensored": false
}
```

### List Models
```
GET /api/llm
```

### Crypto Prices
```
GET /api/prices
```

### Health Check
```
GET /api/health
```

## 🛡️ Privacy Architecture

**Venice Private Models:**
- Zero data retention
- Decentralized GPU providers
- End-to-end SSL encryption
- No training on your data

**Anonymized Models (GPT, Claude):**
- Proxied through Venice
- Identity hidden from provider
- Provider still sees prompt content

## 📈 Roadmap

### Phase 1: Foundation ✅
- [x] Venice AI integration
- [x] 38 models with pricing
- [x] Basic rate limiting
- [x] Privacy documentation

### Phase 2: Monetization (Current)
- [ ] Stripe billing integration
- [ ] User accounts (Supabase Auth)
- [ ] Usage analytics dashboard
- [ ] OpenRouter fallback

### Phase 3: Scale
- [ ] MCP server integration (Smithery)
- [ ] Free API marketplace
- [ ] SDK (Python, Node, Go)
- [ ] Enterprise features

## 🔗 Links

- **Live Site**: https://oma-ai.com
- **GitHub**: https://github.com/FrankieMolt/OMA-AI
- **Venice Docs**: https://docs.venice.ai
- **Smithery MCP**: https://smithery.ai

## 📝 License

MIT
