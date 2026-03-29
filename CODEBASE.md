# OMA-AI — Codebase

> MCP Marketplace powered by Next.js 14 App Router, TypeScript, Supabase, and x402 payments.

## Quick Links

- [Live Site](https://www.oma-ai.com)
- [GitHub](https://github.com/FrankieMolt/OMA-AI)
- [Discord](https://discord.gg/oma-ai)
- [Deploy Guide](./SUPABASE_SETUP.md)

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | Supabase (PostgreSQL) |
| Payments | x402 Protocol (Base + Solana USDC) |
| Auth | Supabase Auth |
| Hosting | Vercel (auto-deploy on main push) |
| Database (local dev) | Supabase via Docker/Coolify |

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── mcps/[slug]/       # MCP marketplace
│   │   └── route.ts       # Real MCP server (JSON-RPC 2.0 over SSE)
│   ├── api/               # API routes
│   │   ├── mcp/
│   │   │   ├── list/       # GET — marketplace listing (Supabase → static fallback)
│   │   │   ├── skill/[slug]/ # GET — MCP detail (Supabase → static fallback)
│   │   │   ├── paid/[slug]/ # POST — x402 paid MCP access
│   │   │   └── register/   # POST — submit new MCP to marketplace
│   │   ├── marketplace/    # GET — combined marketplace data
│   │   ├── credits/        # GET/POST — user credit balance
│   │   └── x402/sign/      # POST — x402 nonce signing
│   ├── login/              # Supabase Auth
│   ├── signup/             # Supabase Auth
│   └── mcp/                # MCP server endpoints (real JSON-RPC)
├── components/             # React components (see components/README.md)
├── hooks/                 # Custom React hooks
├── lib/                   # Shared libraries
│   ├── mcp-data.ts         # Static MCP marketplace data (fallback)
│   ├── supabase/client.ts  # Supabase client factory
│   ├── x402/               # x402 payment server + client
│   │   ├── server.ts       # Payment creation, 402 responses, verification
│   │   └── index.ts        # x402 client hooks
│   ├── category-icons.ts   # Category → icon mapping
│   └── types.ts            # Shared TypeScript types
└── styles/                # Global CSS
```

## Key Systems

### MCP Marketplace
- **Static fallback**: `src/lib/mcp-data.ts` — 28 MCPs (used when Supabase unavailable)
- **Live data**: Supabase `mcp_servers` table
- **List endpoint**: `/api/mcp/list` — paginated, filterable, sortable
- **Detail endpoint**: `/api/mcp/skill/[slug]` — full MCP info + x402 payment header

### MCP Server (Real Protocol)
- **Path**: `src/app/mcp/[slug]/route.ts`
- **Protocol**: JSON-RPC 2.0 over SSE (Server-Sent Events)
- **Tools**: hello, echo, time, health, list_mcps, search_mcp, mcp_info, solana_price, price_check, trending_tokens, market_stats, trading_quote, price_alert
- **MCP clients**: OpenClaw, Claude Desktop, Cursor, Windsurf, etc.
- **Install**: `openclaw mcp add oma-ai https://www.oma-ai.com/mcp/{slug}`

### x402 Payments
- **Protocol**: x402 (Coinbase CDP + x402.org facilitators)
- **Chains**: Base (mainnet + sepolia), Solana (mainnet + devnet)
- **Token**: USDC
- **Treasury**: `OMA_AI_PAYMENT_WALLET` env var
- **Pricing**: Per-call micro-units ($0.001–$0.05 per call)

### Authentication
- **Provider**: Supabase Auth
- **Flow**: Email/password (magic link optional)
- **RLS**: Row Level Security on Supabase tables
- **Session**: PKCE flow, auto-refresh

## Environment Variables

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for full setup guide.

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (prod) | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes (prod) | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (prod) | Supabase service role key |
| `OMA_AI_PAYMENT_WALLET` | Yes (prod) | Base treasury wallet |
| `BASE_RPC_URL` | Recommended | Base blockchain RPC |
| `SOLANA_RPC_URL` | Recommended | Solana blockchain RPC |

## Deployment

### Vercel (Production)
- Auto-deploys on push to `main` branch
- Requires `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` in GitHub Actions secrets
- If deploy fails: check [Vercel Dashboard](https://vercel.com/dashboard)

### Local Development
```bash
npm install
npm run dev        # Dev server on :3000
npm run build      # Production build
npm run lint       # ESLint
```

### Supabase Local
```bash
npx supabase start    # Start local Supabase
npx supabase db push  # Push schema
npx supabase studio    # Open admin UI
npx supabase stop      # Stop
```

## Known Issues

1. **Vercel GH Actions token** — may need refresh if deploys fail
   → [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. **Supabase not connected** — site runs on static fallback (19 MCPs visible)
   → Follow [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
3. **MCP backend tools** — built-in demo tools (price_check, trending_tokens) work.
   Real API integrations (Helius, Jupiter) need their API keys configured.

## Database Schema

Core tables (see `supabase-migration.sql` for full schema):
- `mcp_servers` — MCP marketplace listings
- `mcp_tools` — Individual tools per MCP
- `mcp_usage` — Call tracking
- `mcp_reviews` — User reviews
- `transactions` — Payment transactions
- `x402_nonces` — Payment nonces
- `wallets` — User wallet addresses
- `api_keys` — Developer API keys
- `payouts` — MCP author payouts
- `users` — User profiles
- `user_settings` — User preferences
- `notifications` — In-app notifications
- `audit_logs` — Security audit trail
- `usage_stats` — Daily usage aggregates
- `mcp_categories` — Category taxonomy
