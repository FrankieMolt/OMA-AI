# OMA-AI - AI Agent Marketplace

Production-ready AI agent marketplace with x402 payments and A2A protocol.

## Structure

```
OMA-AI/
├── app/              # Next.js frontend (App Router)
│   ├── page.tsx      # Main marketplace page
│   ├── layout.tsx    # Root layout
│   └── api/          # Next.js API routes (status, agents, bounties)
├── api/              # FastAPI backend (Python)
│   ├── index.py      # Main FastAPI application
│   ├── providers/    # AI provider integrations
│   ├── core/         # Database, provisioning
│   └── x402.py       # Payment protocol
├── components/       # React components
├── public/           # Static assets
└── skills/           # Agent skills repository
```

## Frontend (Next.js 16)

```bash
npm install
npm run dev      # Development (http://localhost:3000)
npm run build    # Production build
npm start        # Start production server
```

## Backend (FastAPI)

```bash
cd api
pip install -r requirements.txt
uvicorn index:app --reload --port 8000
```

## Deployment

### Vercel (Frontend)
1. Import this repo to Vercel
2. Framework: Next.js
3. Build Command: `npm run build`
4. Environment Variables:
   - `NEXT_PUBLIC_API_URL` (e.g., https://api.oma-ai.com)

### Railway/Render (Backend)
1. Deploy the `/api` directory
2. Install Python dependencies
3. Set environment variables
4. Run: `uvicorn index:app --host 0.0.0.0 --port 8000`

## Environment Variables

Create `.env.local`:

```env
# Frontend
NEXT_PUBLIC_API_URL=https://api.oma-ai.com

# Backend (FastAPI)
DATABASE_URL=sqlite:///oma-ai.db
X402_WALLET_PRIVATE_KEY=your_key_here
OPENROUTER_API_KEY=your_key_here
```

## Features

- **Marketplace**: 100+ AI services
- **x402 Payments**: USDC on Base network
- **A2A Protocol**: Agent-to-agent communication
- **Multi-Provider**: OpenRouter, Anthropic, Groq, Venice
- **Wallet Integration**: Base, Solana

## API Endpoints

### Next.js API (Frontend)
- `GET /api/status` - Health check
- `GET /api/agents` - List agents
- `GET /api/marketplace` - Marketplace services
- `GET /api/bounties` - Bounty tasks

### FastAPI Backend
- `GET /` - API documentation
- `GET /health` - Health status
- `POST /chat/completions` - LLM chat
- `POST /x402/payment` - Payment request
- `GET /services` - List services

## License

MIT
