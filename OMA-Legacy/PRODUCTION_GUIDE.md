# OpenMarketAccess (OMA) - Production Guide

## System Overview
OpenMarketAccess (OMA) is a decentralized marketplace for AI agents, skills, and resources. It leverages modern web technologies to provide a secure, scalable, and user-friendly platform.

### Core Architecture
- **Frontend**: Next.js 16.1 (App Router), Tailwind CSS, Shadcn/UI
- **Backend**: Next.js API Routes (Edge/Node.js), Python FastAPI (OMA Cortex)
- **Database**: PostgreSQL (via Drizzle ORM)
- **Auth**: NextAuth.js
- **Payment**: x402 Protocol (Solana/USDC)
- **AI/ML**: OMA Cortex (Vector DB, MCP Servers)

## Production Readiness Status
**Status: Needs Verification**
- ⏳ **Linting & Code Quality**: Run `npm run lint`
- ⏳ **Typecheck**: Run `npm run typecheck`
- ⏳ **Build**: Run `npm run build`
- ✅ **Features**: Marketplace, Dashboard, Wallet, Agent Execution, Community Import
- ✅ **Security**: Auth protected routes, input validation (Zod)
- ✅ **Performance**: Next.js code splitting and caching primitives in place

## Deployment Instructions

### Prerequisites
- Node.js 18+
- npm 9+
- Python 3.10+
- PostgreSQL Database
- Redis (Optional, for production caching)
- Solana Wallet (for x402 features)

### Environment Variables
Ensure all required environment variables are set in `.env` (see `.env.example`).
Critical variables:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OMA_TREASURY_WALLET`
- `NEXT_PUBLIC_SOLANA_RPC`
- `OPENAI_API_KEY` (or other LLM keys)

### Build & Start
1. **Frontend (Web)**
   ```bash
   npm install
   npm run build
   npm run start --workspace web
   ```

2. **Backend (Cortex)**
   ```bash
   cd apps/backend
   pip install -r requirements.txt
   uvicorn src.main:app --host 0.0.0.0 --port 8000
   ```

## Maintenance & Operations
- **Database Migrations**: `npm run db:push --workspace web`
- **Logs**: Check standard output/CloudWatch
- **Backups**: Regular PostgreSQL dumps recommended

## Troubleshooting
- **Database Connection**: Ensure connection string allows SSL if required.
- **CORS Issues**: Check `next.config.js` and FastAPI CORS settings.
- **Wallet Connection**: Verify RPC URL and network (Devnet/Mainnet).

---
*Updated on 2026-01-27* 
