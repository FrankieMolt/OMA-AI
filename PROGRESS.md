# OMA-AI Credits Page + Roadmap + CubeSandbox MCP Changes

**Date:** 2026-04-21  
**Branch:** main (pushed to origin/main)

---

## Task 1: Credits Page Rewrite ✅

**File:** `src/app/credits/page.tsx`

**Changes:**
- Replaced old "buy credits packages" model (Starter/Basic/Pro/Business/Enterprise) with x402 pay-per-call model
- New hero: "Pay per call. No subscriptions." with x402 badge
- Removed all credit package tiers
- Added MCP pricing table:
  - **Free MCPs:** Helius Solana RPC, GitHub, SearXNG Search, Web Fetch, Filesystem, Docker, Memory MCP, Sequential Thinking, Alpha Vantage
  - **Paid MCPs:** Ethereum RPC at $0.001/call
- Added "How x402 Works" section with 3-step explanation (Connect Wallet → AI Agents Pay → Per-Call Billing)
- Added wallet connection CTA
- Added "Want to build your own MCP? → /publish" link

**Validation:** `npx tsc --noEmit` — passed (exit code 0)

---

## Task 2: Roadmap Status Updates ✅

**File:** `src/app/roadmap/RoadmapClient.tsx`

**Changes:**
| Item | Old Status | New Status | Reason |
|------|-----------|-----------|--------|
| x402 Payment Signing | in-progress | **in-progress** | Kept (verification not done) |
| Base Wallet + AAWP | completed | **completed** | Already correct |
| Cross-Platform Plugins | in-progress | **completed** | Done (Q2 shipped) |
| Publisher Dashboard | in-progress | **completed** | Done (Q2 shipped) |
| Micro-Payment Channels | planned | **in-progress** | In development |
| Programmable Guardrails | planned | **in-progress** | In development |
| Treasury Management | in-progress | **in-progress** | Correct (Q2) |
| Portable Agents | in-progress | **in-progress** | Correct (Q2) |

**Validation:** `npx tsc --noEmit` — passed (exit code 0)

---

## Task 3: CubeSandbox MCP ✅

**File:** `src/lib/mcp-data.ts`

**Research:** TencentCloud/CubeSandbox on GitHub
- High-performance sandbox for AI agents
- Sub-60ms startup time, <5MB memory overhead
- Built on RustVMM + KVM
- E2B SDK compatible
- Supports single-node and multi-node cluster deployment

**Added to MARKETPLACE_MCPS:**
- ID: `cube-sandbox`
- Name: CubeSandbox
- Category: Infrastructure
- Price: $0 USDC (free)
- Tools: create_sandbox, execute_code, get_sandbox_status, destroy_sandbox, list_sandboxes
- Author: TencentCloud
- Color: #ff6b35

**Validation:** `npx tsc --noEmit` — passed (exit code 0)

---

## Final Build ✅

**Command:** `npm run build`  
**Result:** Build successful — 90 pages generated, no errors

---

## Commits Pushed

1. `6cf9a2bd` — fix: rewrite credits page for x402 pay-per-call model
2. `3709a74d` — fix: roadmap status accuracy
3. `e81346c8` — feat: add CubeSandbox MCP to marketplace

**Pushed to:** origin/main
