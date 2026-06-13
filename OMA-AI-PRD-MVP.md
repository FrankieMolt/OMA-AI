# OMA-AI — Product Requirements Document & MVP Roadmap
**Version 2.0 | 2026-03-31 | Frankie Audit**
**Live: https://www.oma-ai.com**

---

## 1. What OMA-AI Actually Is

**One-liner:** The AI infrastructure app store — MCP servers, LLMs, compute, and APIs — all deployable in 1 click, paid via x402 (SOL/USDC).

**The loop:**
```
Browse AI infrastructure → 1-click deploy to OpenClaw → Agent uses it → x402 micropayment
```

**What makes it different from competitors:**
| Competitor | What | OMA-AI Advantage |
|---|---|---|
| Smithery.ai | MCP registry, free CLI | x402 micropayments for creators |
| OpenRouter.ai | LLM marketplace, Stripe | SOL/USDC native, no account needed |
| Railway/Render | Compute VMs | OpenClaw agent compute |
| Cloudflare | APIs/gateways | Packaged as installable agent configs |
| Vercel | Deploy apps | Deploy AI agents + infrastructure |

**OMA-AI is the unified layer** — one wallet, one config, every AI tool.

---

## 2. Competitive Research

### Smithery.ai (Direct Competitor — MCP Registry)
- **24 MCPs** in their registry (vs OMA-AI's 33)
- Real `npm install @smitheryai/...` packages
- `npx @smitheryai/cli` CLI for 1-click install
- **Free** — no payments, creators get nothing
- Public API accessible
- Has MCP server self-registration protocol

**OMA-AI opportunity:** Aggregate Smithery's registry + add x402 payments on top

### OpenRouter.ai (LLM Marketplace)
- **244 models** from 23 publishers
- Models: free tier (Perplexity, Meta) to $0.10+/M output tokens
- **API key required** — friction: account + Stripe
- Pay per 1M tokens, no subscriptions
- Has load balancing + fallback routing

**OMA-AI opportunity:** OpenRouter integration for LLMs, pay via wallet (no account)

### Current OMA-AI MCP Stack
```
33 MCPs total
├── 21 from Supabase DB (real endpoints)
└── 12 from fallback data (Smithery install commands: `npx @smitheryai/cli...`)
```
The fallback MCPs ARE Smithery MCPs — OMA-AI is already reselling Smithery's registry but without x402 payments.

---

## 3. Current State Audit

### Pages ✅ (All 200)

| Page | Status | Content |
|---|---|---|
| `/` | ✅ | Landing — "AI Infrastructure Marketplace" |
| `/mcps` | ✅ 80% | 33 MCPs, search, filter, pagination |
| `/compare` | ✅ 60% | Compare UI exists, buttons not wired |
| `/pricing` | ⚠️ Wrong | 3 tiers (Free/Pro/Enterprise) — **x402 should be the model** |
| `/services` | ⚠️ Irrelevant | Service bundles — informational only |
| `/roadmap` | ⚠️ Irrelevant | Informational only |
| `/soul` | ⚠️ Irrelevant | Team/values page |
| `/wallet` | ✅ 80% | Base wallet connect, wrong disconnected color |
| `/profile` | ⚠️ UI only | No auth wired |

### Broken 🔴

| # | Issue | File | Fix |
|---|---|---|---|
| 1 | **Install = fake npm** | `MCPSkillDetail.tsx` | Change to "Deploy to OpenClaw" with Smithery CLI command OR OpenClaw MCP config JSON |
| 2 | **Search doesn't sync URL** | `MCPMarketplace.tsx` | Add `?q=` + `?cat=` URL params |
| 3 | **Compare button does nothing** | `MCPSkillCard.tsx` | Wire to compare store |
| 4 | **Sitemap 404** | `src/app/sitemap.ts` | Fix API response format mismatch |
| 5 | **Wallet disconnected = green** | `WalletConnect.tsx` | Use dark theme palette |
| 6 | **Pricing page has tiers** | `/pricing` | Replace with x402 model explanation |

### Not Built 🟡

| Feature | Priority | Notes |
|---|---|---|
| Real MCP registration + creator dashboard | High | Supabase schema exists, no UI |
| User auth (signup/login) | High | Supabase Auth tables exist |
| x402 payments wired | High | Signer key missing |
| OpenRouter LLM integration | High | 244 models, massive opportunity |
| Smithery API integration | Medium | 24 MCPs, free CLI, self-registration |
| 1-click OpenClaw deploy | High | MCP config JSON output |
| LLM model comparison | Medium | OpenRouter-style comparison |
| Compute/VM offering | Low | Future product |

---

## 4. x402 Payment Model

**x402 is the protocol** — SOL/USDC micro-payments for API calls. No subscription, no tiers.

### How x402 Works (Simplified)
1. AI agent makes a request to an MCP
2. MCP server responds with a payment header: "send 0.001 USDC to address X"
3. Agent's wallet automatically pays
4. Creator receives SOL/USDC directly

### Pricing Model (Replace /pricing page)

| Type | Example | x402 Model |
|---|---|---|
| **Free** | Helius, Exa, GitHub | $0 per call |
| **Per-call** | Trading bot | $0.001 USDC per API call |
| **Flat rate** | Premium data API | $0.10/month per agent |
| **CPM** | LLM providers | $0.50 per 1M tokens |

**No tiers. No subscriptions. Pay per use.**

---

## 5. 1-Click Deploy Architecture

### How It Works

OMA-AI generates an OpenClaw MCP config that users paste into their `mcp_settings.json`:

```json
{
  "mcpServers": {
    "helius-solana": {
      "command": "npx",
      "args": ["@smitheryai/cli", "install", "helius-solana", "--key", "OMA_XXXXXXXX"]
    }
  }
}
```

OR a direct HTTP MCP endpoint:

```json
{
  "mcpServers": {
    "helius-solana": {
      "url": "https://mcp.oma-ai.com/helius-solana",
      "headers": {
        "x-402-address": "DcPfnhNQt98oXhgA..."
      }
    }
  }
}
```

### 1-Click Deploy Options

| Method | How | Best For |
|---|---|---|
| **Smithery CLI** | `npx @smitheryai/cli install <mcp>` | MCPs that have Smithery packages |
| **OpenClaw MCP JSON** | Paste config to `mcp_settings.json` | Any HTTP MCP |
| **Claude Desktop** | Same config format | Claude users |
| **Direct URL** | Copy MCP URL to any MCP-compatible agent | Developers |

### What OMA-AI Adds
1. **Discovery** — Browse + compare MCPs (better than Smithery's bare list)
2. **Payment** — x402 headers so creators earn on every call
3. **Analytics** — Track usage per MCP per user
4. **Unified billing** — One wallet for all MCPs

---

## 6. OpenRouter Integration Plan

**OpenRouter** has 244 models. OMA-AI should be the interface.

### Implementation
```
OMA-AI (OpenClaw agent)
  → fetch("https://openrouter.ai/api/v1/chat/completions",
         headers: { "x-402-address": wallet })
  → OpenRouter routes to cheapest available model
  → Pays SOL/USDC via x402
```

### OMA-AI vs OpenRouter

| | OMA-AI | OpenRouter |
|---|---|---|
| Payment | x402 (SOL/USDC) | Stripe |
| Account | None needed | Required |
| For | AI agents | Developers |
| Models | OpenRouter + others | OpenRouter only |

**Strategy:** Integrate OpenRouter as the LLM provider backend. OMA-AI is the wallet + routing layer.

---

## 7. MCP Source Strategy

### Sources to Aggregate

| Source | Count | Integration |
|---|---|---|
| OMA-AI Supabase DB | 21 | Already connected |
| Smithery.ai API | 24 | Public API — pull in real-time |
| GitHub MCP servers | 100s | Search + auto-package |
| OpenClaw skills | 43 | Already installed locally |
| Community submissions | ∞ | User registration |

**Priority:** Get Smithery's 24 MCPs as real installable options FIRST.

---

## 8. MVP — v1.0

**Goal:** Working loop — Browse → 1-click deploy → x402 payment

### Must Ship

#### Broken Fixes
- [ ] **Fix Install button** → "Deploy to OpenClaw" with Smithery CLI command + OpenClaw JSON config
- [ ] **Wire search** → URL param sync (`?q=`, `?cat=`)
- [ ] **Wire Compare button** → add to compare state
- [ ] **Fix sitemap** → proper Next.js sitemap.ts
- [ ] **Fix wallet colors** → dark theme palette
- [ ] **Remove /pricing tiers** → Replace with x402 model explanation

#### Core Loop
- [ ] **Smithery MCP integration** → Pull 24 MCPs via Smithery public API, display real install commands
- [ ] **OpenClaw config generator** → Output valid `mcp_settings.json` for each MCP
- [ ] **x402 signer key** → Generate + set in Vercel env
- [ ] **x402 payment button** → On each paid MCP, "Enable Payments" → wallet pays setup fee
- [ ] **OpenRouter LLM page** → `/llms` — browse + compare 244 models, connect wallet, get API key

#### User Flow
1. User lands on `/mcps`
2. Browses/searches MCPs
3. Clicks "Deploy to OpenClaw"
4. Gets Smithery CLI command OR OpenClaw JSON config
5. Pastes into OpenClaw config
6. Agent uses MCP, pays via x402

### Nice to Have v1.0
- [ ] User auth (email/password)
- [ ] Creator dashboard (publish MCP)
- [ ] MCP rating system
- [ ] Payment history

---

## 9. Pages to Build/Replace

| Page | Action |
|---|---|
| `/mcps` | ✅ Keep, fix search + install button |
| `/llms` | **NEW** — OpenRouter model browser |
| `/pricing` | **REPLACE** — x402 model explanation |
| `/wallet` | ✅ Keep, fix colors |
| `/compare` | ✅ Keep, wire buttons |
| `/services` | ⚠️ Remove or merge into `/mcps` |
| `/roadmap` | ⚠️ Remove or merge into landing |
| `/soul` | ⚠️ Remove or keep as-is |
| `/profile` | ✅ Keep, wire auth |
| `/mcps/[slug]` | ✅ Keep, fix install button |

---

## 10. Tech Stack (No Changes)

| Layer | Current | Keep |
|---|---|---|
| Frontend | Next.js 15 | ✅ |
| Database | Supabase hosted | ✅ |
| Payments | x402 | ✅ (needs signer key) |
| Wallet | Wagmi v2 + Base | ✅ |
| Deploy | Vercel | ✅ |
| LLMs | OpenRouter (to add) | 🆕 |
| MCP Source | Smithery API + Supabase | ✅ |
| Config | OpenClaw JSON | 🆕 |

---

## 11. Quick Wins This Week

| # | Fix | Time | Impact |
|---|---|---|---|
| 1 | Fix install button → "Deploy to OpenClaw" + Smithery CLI | 1hr | **Core loop works** |
| 2 | Pull Smithery MCPs via API (24 MCPs, real install commands) | 2hr | **Real catalog** |
| 3 | Wire search URL sync | 30min | Search works |
| 4 | Wire compare button | 30min | Compare works |
| 5 | Generate x402 signer key + set in Vercel | 30min | Payments ready |
| 6 | Replace /pricing with x402 model | 1hr | Right messaging |
| 7 | Fix sitemap | 30min | SEO |
| 8 | Fix wallet disconnected color | 15min | UI polish |
| 9 | Add `/llms` page (OpenRouter) | 3hr | New product |

---

## 12. Ghost Blog & NB Reform — Confirmed Separate

| Project | URL | Status | Action |
|---|---|---|---|
| **Ghost Blog "Unresolved"** | localhost:3036 | ✅ Healthy | Keep separate, no integration needed |
| **NB Reform** | localhost:3001 | ✅ Local only | Ignore `nbreform.ca` — never was public |

---

_Last Updated: 2026-03-31 v2.0 by Frankie_
