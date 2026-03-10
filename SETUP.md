# OMA-AI Platform - Quick Start Guide

> Get the OMA-AI platform up and running in 5 minutes

---

## 🚀 Prerequisites

- Node.js 22+ (v22.22.0 recommended)
- npm or yarn
- Git
- Supabase account (for database)
- Venice API key (for LLM inference)

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/FrankieMolt/OMA-AI.git
cd OMA-AI

# Install dependencies
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root:

```env
# Venice AI (required for LLM inference)
VENICE_API_KEY=your_venice_api_key

# OpenRouter (optional fallback)
OPENROUTER_API_KEY=your_openrouter_key

# Supabase (required for database)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Upstash Redis (optional for rate limiting)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Web3 (optional for payments)
NEXT_PUBLIC_CHAIN_ID=8453  # Base mainnet
```

---

## 🏃 Running Locally

```bash
# Development server (Next.js)
npm run dev
# Visit: http://localhost:3000

# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Lint code
npm run lint
```

---

## 🚀 Production Deployment

### Using Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Using Docker

```bash
# Build image
docker build -t oma-ai .

# Run container
docker run -p 3000:3000 oma-ai
```

---

## 📊 Service Overview

The OMA-AI platform consists of 5 main services:

| Service | Port | Description |
|---------|------|-------------|
| **oma-ai-static** | 3000 | Next.js frontend |
| **oma-ai-api** | 3007 | API gateway |
| **lethometry** | 3002 | Analytics dashboard |
| **nosyt-ai** | 3006 | Trading bot |
| **scrapling-api** | 3004 | Web scraping service |

### Start All Services (PM2)

```bash
# Install PM2
npm i -g pm2

# Start all services
pm2 start ecosystem.config.js

# View logs
pm2 logs

# Stop all services
pm2 stop all
```

---

## 🔌 API Endpoints

### LLM Gateway

```bash
# List models
curl http://localhost:3007/v1/models

# Chat completion
curl -X POST http://localhost:3007/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key" \
  -d '{
    "model": "deepseek-v3.2",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

# Check credits
curl http://localhost:3007/v1/credits \
  -H "Authorization: Bearer your_api_key"
```

### Platform APIs

```bash
# Health check
curl http://localhost:3000/api/health

# Register miner
curl -X POST http://localhost:3000/api/miners/register \
  -H "Content-Type: application/json" \
  -d '{"wallet": "0x..."}'

# Crypto prices
curl http://localhost:3000/api/prices
```

---

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests (Playwright)
npm run test:e2e

# Watch mode
npm run test:watch

# All tests
npm run test:all
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Venice API Not Working

```bash
# Check API key
echo $VENICE_API_KEY

# Test API directly
curl https://api.venice.ai/v1/models \
  -H "Authorization: Bearer $VENICE_API_KEY"
```

### Database Connection Issues

```bash
# Check Supabase URL
echo $SUPABASE_URL

# Test connection
curl $SUPABASE_URL/health
```

---

## 📚 Documentation

- **Full Documentation**: See `/docs` directory
- **API Reference**: `/docs/API.md`
- **Architecture**: `/docs/ARCHITECTURE.md`
- **Contributing**: `/docs/CONTRIBUTING.md`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run test:all`
5. Commit and push
6. Open a Pull Request

---

## 📝 License

MIT License - see LICENSE file for details

---

## 🔗 Links

- **Live Site**: https://oma-ai.com
- **GitHub**: https://github.com/FrankieMolt/OMA-AI
- **Documentation**: https://docs.oma-ai.com
- **Support**: https://discord.gg/oma-ai

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Start dev | `npm run dev` |
| Build | `npm run build` |
| Test | `npm test` |
| Deploy | `vercel --prod` |
| Start PM2 | `pm2 start ecosystem.config.js` |
| Check logs | `pm2 logs` |
| Lint | `npm run lint` |
| Type check | `npm run type-check` |

---

*Need help? Check `/docs/TROUBLESHOOTING.md` or open an issue on GitHub*
