# OMA-AI PRDMVP.md — Phase 1-3

## What is OMA-AI?
OMA-AI is a MCP marketplace where users discover, connect, and pay for MCP servers.
- Free MCPs: indexed from Smithery + Official Registry (BYOK = bring your own API key)
- Premium MCPs: paid per-call via x402 USDC micropayments
- Managed VMs: on-demand compute for resource-intensive MCPs

## Why MCPs Will Be Huge (2026)
- Every AI app needs context/tools → MCP is the standard
- MCPs are just HTTP endpoints → scalable, monetizable
- x402 makes per-call payments work → new business model
- Remote MCP = any AI client can use any MCP server

## Competitive Positioning
| Platform | MCPs | Payments | VMs |
|----------|------|----------|-----|
| Smithery | 4,251 | ❌ | ❌ |
| MCP.so | 19,206 | ❌ | ❌ |
| Official Registry | ~100 | ❌ | ❌ |
| OMA-AI | 15+ | ✅ x402 | ✅ on-demand |

OMA-AI is the ONLY marketplace with x402 per-call payments + on-demand compute.

## Revenue Model

### Tier 1: Directory (Free tier, $0 revenue)
- Index Smithery + official registry MCPs
- Show tool listings, stats, ratings
- Revenue: $0, value = SEO traffic + user trust

### Tier 2: MCP Gateway (15-30% fee)
- OMA-AI proxies MCP calls for users without API keys
- User pays USDC per call via x402
- OMA-AI routes to underlying MCP server with user's key
- Cost: ~$0.001/call, charge $0.0015/call = 50% margin
- MCPs: Solana RPC, Jupiter DEX, GitHub, Web Search

### Tier 3: On-Demand VMs (subscription)
- Spin up a microVM on Fly.io per user/session
- Run resource-intensive MCPs (browser automation, AI inference, etc.)
- Charge per-second of VM time via x402
- Fly.io: $1.89/month per 256MB VM, charge $3-5/month
- Margin: ~60-70%

## Fly.io + x402 Integration

### Why Fly.io?
- Native x402 support (their own protocol!)
- Per-second VM billing
- Docker + source deploy
- Persistent storage, IPs
- 100+ regions

### How it works:
1. User requests managed MCP (e.g. browser automation)
2. OMA-AI spins up Fly.io microVM via API
3. VM runs the MCP Docker container
4. Fly.io meters x402 payment
5. OMA-AI bills user via x402 or subscription

### Fly.io Costs (March 2026)
- VM (256MB RAM, 0.1 vCPU): ~$1.89/month
- VM (512MB RAM, 0.2 vCPU): ~$3.78/month
- VM (1GB RAM, 0.5 vCPU): ~$7.56/month
- Persistent storage: $0.05/GB/month
- Outbound bandwidth: $0.10/GB

### OMA-AI Pricing
| Plan | Compute | Storage | Bandwidth | Price |
|------|---------|---------|-----------|-------|
| Free | 1M requests/mo | 1GB | 10GB/mo | $0 |
| Hobby | 10M requests | 10GB | 100GB/mo | $5/mo |
| Pro | 100M requests | 100GB | 1TB/mo | $25/mo |
| Business | Unlimited | Unlimited | Unlimited | $100/mo |

## Phase 1 (NOW — 1-2 weeks)
- [x] MCP marketplace frontend ✅ (mostly done)
- [ ] Fix skills page (literally "test")
- [ ] Fix mcps page (thin)
- [ ] Add MCPInstallCard (copy config buttons)
- [ ] Wire up Supabase for real MCP listings
- [ ] Deploy all 8 MCP servers publicly
- [ ] Get mcp.oma-ai.com domain or subdomain working

## Phase 2 (2-4 weeks)
- [ ] Fly.io x402 account setup
- [ ] On-demand VM MCP: browser-automation (headless Chrome)
- [ ] MCP Gateway: proxy calls with x402
- [ ] User wallet: USDC balance top-up
- [ ] Usage dashboard: calls made, costs, history

## Phase 3 (1-2 months)
- [ ] Smithery registry integration (index their MCPs)
- [ ] Official registry integration
- [ ] Subscription tiers (Free/Hobby/Pro/Business)
- [ ] Affiliate program (Smithery, MCP.so)
- [ ] White-label MCP hosting for MCP developers

## MCP Server Inventory

### Live on MiniPC (localhost:3030-3038)
| Server | Port | Tools | x402 | Status |
|--------|------|-------|------|--------|
| helius-mcp | 3030 | 8 Solana | ❌ | ✅ Live |
| jupiter-mcp | 3031 | DEX | ❌ | 🔄 |
| github-mcp | 3032 | 4 GitHub | ❌ | 🔄 |
| searxng-mcp | 3033 | 2 Web | ❌ | 🔄 |
| ethereum-mcp | 3034 | ETH | ✅ | 🔄 |
| alpha-vantage | 3035 | Finance | ✅ | 🔄 |
| pumpfun-mcp | 3037 | Memecoin | ❌ | 🔄 |
| filesystem-mcp | 3038 | Files | ❌ | 🔄 |

### To Deploy
- vercel-mcp: Vercel API integration
- coolify-mcp: Coolify API integration
- browser-automation: Headless Chrome
- docker-mcp: Docker API
- memory-mcp: Persistent memory
- sequential-thinking-mcp: Reasoning chains

## Infrastructure

### MiniPC (nosytlabs)
- Docker on MiniPC, ports 3030-3038 exposed on LAN
- Need: public tunnel or Fly.io deployment for public access

### Fly.io
- OMA-AI has no Fly.io account yet
- `flyctl auth login` needed
- App name: oma-ai-mcp

### Coolify
- Running at http://10.0.1.1:8000
- Already hosts ghost-blog (port 3036)
- Can host MCP containers too

## Affiliate / Partnership Research

### Smithery.ai
- 4,251 MCPs indexed
- API: https://smithery.ai/docs
- Affiliate program: NOT FOUND (2026-03-31)
- Contact: needs research

### MCP.so
- 19,206 MCPs
- Submit via GitHub issue
- Affiliate program: NOT FOUND (2026-03-31)

## Technical Architecture

```
User (Claude/Cursor/OpenClaw)
    |
    | streamable-http
    v
mcp.oma-ai.com (Fly.io)
    |
    ├── Free MCPs (helius, jupiter, github, searxng)
    |   └── Direct to underlying API (no billing)
    |
    ├── Proxied MCPs (x402)
    |   └── Verify x402 payment → route with user API key
    |
    └── Managed VMs (on-demand Fly.io microVMs)
        └── Spin up container → route → destroy after idle
```

## Open Questions
1. Fly.io x402: how does Coinbase facilitator work? Is it instant?
2. Smithery/MCP.so affiliate: do they have programs? Need to email/cold outreach
3. Branding: is "OMA-AI" clear enough? Should it be "MCP.market" or "MCPPay"?
4. Supabase: still not connected — is this needed for MVP or can static data work?

## Success Metrics (90 days)
- [ ] 100 registered users
- [ ] 10 MCPs with real traffic
- [ ] $100 MRR (~$5/user from 20 paying users)
- [ ] 1k API calls/day on average
