# OMA-AI Production Readiness Audit
**Date:** May 10, 2026  
**Author:** Frankie 🦞  
**Status:** ACTIONABLE

---

## Executive Summary

OMA-AI is a well-architected product with real code, real infrastructure, and real potential — but it's at ~60% completion. The foundation is solid (Next.js 15, OWS wallet, x402 payment flow, Supabase schema) but several critical revenue-blocking issues prevent it from actually making money.

**Verdict:** Fix the issues below and ship. The bones are good.

---

## 🔴 Critical Issues (Blockers)

### C1. Supabase Keys Are Placeholders — Database Unreachable
**File:** `.env.production`  
**Status:** `NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_A…HERE` (fake)  
**Impact:** All data falls back to static demo data. No real users, no real MCPs, no revenue tracking.

**Fix:** Get real keys from https://supabase.com → OMA-AI project → Settings → API

### C2. Credits Buy Buttons Are Dead
**File:** `src/app/credits/page.tsx:134`  
**Status:** `<button>Buy {pkg.name} Package</button>` — no onClick handler, no checkout flow  
**Impact:** $0 credits revenue. No Polar.sh integration.

**Fix:** Integrate Polar.sh for credits purchases, or wire up x402 payment flow for USDC purchases.

### C3. x402 Payment Settlement Not Wired to Production
**File:** `src/app/api/x402/sign/route.ts`  
**Status:** `X402_SIGNER_PRIVATE_KEY=***` (placeholder in .env.production)  
**Impact:** Payment signing falls back to ethers (needs real private key), OWS signing works but payment verification is incomplete.

**Fix:** Set `X402_SIGNER_PRIVATE_KEY` with the actual Base treasury wallet private key, OR use OWS for all signing (recommended).

### C4. OMA-AI Lives on Vercel, Not Your Server
**DNS:** `oma-ai.com` → `ns1.vercel-dns.com` (307 redirect)  
**Status:** www.oma-ai.com → 200 (cloudflared proxy8081), but non-www → Vercel  
**Impact:** MCP endpoints only work on www.oma-ai.com, not oma-ai.com. Confusing for users.

**Fix:** Point DNS from Vercel to cloudflared tunnel, or migrate fully to self-hosted.

### C5. OWS signTypedData Called with Wrong Chain ID in ows-evm.ts
**File:** `src/lib/x402/services/ows-evm.ts:104`  
**Code:** `ows.signTypedData(OWS_WALLET_NAME, String(chainId), ...)` where `chainId` is numeric `8453`  
**Status:** ✅ Actually WORKS (tested: both `8453` and `eip155:8453` produce identical valid signatures)  
**Note:** OWS SDK accepts both formats. This is NOT a bug, just documented for awareness.

---

## 🟡 High Priority Issues

### H1. OWS Passphrase Mismatch
**File:** `src/lib/x402/services/ows-evm.ts`  
**Status:** `OWS_WALLET_PASSPHRASE` is empty (`''`), but OWS SDK's `signTypedData` accepts empty passphrase fine  
**Fix:** Confirm passphrase behavior for policy creation. May need to set a real passphrase if you want policy-gated signing.

### H2. Polar.sh Not Integrated
**Status:** Zero references to Polar.sh in codebase. `@polar-sh/sdk` not in package.json.  
**Impact:** No card/Crypto checkout for credits. No revenue.

**Fix Options:**
- Option A: Install `@polar-sh/sdk`, create products in Polar.sh dashboard, wire checkout
- Option B: Use x402 + Conway credits as the credits payment system (天然 integration since OWS is already there)

### H3. Supabase RLS Not Configured  
**File:** `database/schema-production.sql`  
**Status:** Schema defines tables but no RLS policies shown  
**Impact:** Without RLS, any client with anon key can read/write all data

**Fix:** Add RLS policies to schema-production.sql

### H4. Contact Form Writes to Local FS
**File:** `src/app/api/contact/route.ts`  
**Status:** Stores messages in `data/contact_messages.json` (local filesystem)  
**Impact:** On Vercel (serverless), local FS writes may be ephemeral

**Fix:** Write to Supabase instead, since Supabase is already the database

### H5. BYOK Credential Encryption Key Is Weak in .env.local
**File:** `.env.local`  
**Status:** `CREDENTIAL_ENCRYPTION_KEY=df0137…3cbe` (24 hex chars = 12 bytes, not 32)  
**Impact:** Below spec for AES-256-GCM (needs 32 bytes). Also visible in env file.

**Fix:** Generate proper 32-byte hex key: `openssl rand -hex 32`

---

## 🟠 Medium Priority Issues

### M1. Legal Pages Reference "OMA-Ai" (inconsistent casing)
**Files:** `src/app/terms/page.tsx`, `src/app/privacy/page.tsx`  
**Status:** Uses "OMA-Ai" (capital i) throughout, but brand is "OMA-AI" (all caps AI)  
**Impact:** Minor brand inconsistency

### M2. No Careers Page
**Status:** Footer links to `/careers` which returns 404  
**Fix:** Either create a basic careers page or remove the link from footer

### M3. About Page Stats Are Hardcoded
**File:** `src/app/about/page.tsx`  
**Status:** `19+ MCP Servers, 300+ MCP Tools, 13 Blog Posts` are static estimates  
**Fix:** Pull from Supabase in real-time, or remove the misleading stats

### M4. No GDPR Compliance Section
**Files:** `src/app/privacy/page.tsx`  
**Status:** No EU/GDPR-specific data handling section  
**Impact:** Required if serving EU users

### M5. DMCA Policy Missing
**Status:** No DMCA page/link. Required for a US-based platform with user-generated content.

### M6. MCP Paid Handler Has Dead Code
**File:** `src/app/api/mcp/paid/[slug]/route.ts`  
**Status:** References MCPs that don't exist (`weather-api`, `crypto-api`, `search-api`, `database-query`, `ai-embedding`)  
**Impact:** These endpoints will always 404

### M7. No Vercel Login / CI/CD
**Status:** `vercel whoami` returns not logged in. No CI/CD pipeline visible.  
**Impact:** Deploys are manual. Can't check Vercel project settings.

### M8. OMA-AI Repo Has Uncommitted ecosystem.cjs
**File:** `ecosystem.cjs` (untracked)  
**Status:** PM2 config sitting in repo root uncommitted  
**Fix:** Either commit it or move to a deployments folder

---

## Per-Section Findings

### ✅ What Works Well

**OWS Integration:**
- `oma-treasury` wallet exists and is functional with addresses on 10 chains
- EIP-3009 signing via `signTypedData` produces valid 130-char signatures with v=27
- OWS SDK accepts both numeric (`8453`) and CAIP (`eip155:8453`) chain ID formats
- 10 chains supported: EVM, Solana, Bitcoin, Cosmos, Tron, TON, Filecoin, Sui, XRPL, Nano

**x402 Payment Flow:**
- Complete EIP-712 domain separator logic
- Nonce generation, signature verification, and payment requirement encoding all present
- 402 responses properly formatted with `X-Payment-Required` header
- Fallback from OWS → ethers works correctly when OWS is unavailable

**7 MCP Handlers:**
- All 7 exist: helius-solana, ethereum, github, alpha-vantage, searxng-search, jupiter-dex, pumpfun
- All use BYOK pattern (user provides their own API key)
- Proper error handling, timeouts (8s), CORS headers

**Database Schema:**
- Complete: mcp_servers, users, api_keys, transactions, usage_stats, x402_nonces, mcp_tools, mcp_reviews, mcp_categories, ai_agents, human_services, payouts, credit_purchases
- Proper indexes on all foreign keys and query columns

**Legal Pages:**
- Terms of Service: comprehensive, covers all major sections
- Privacy Policy: comprehensive with data retention, third-party sharing, user rights sections
- Contact page: full form with validation, categories, success states

### ❌ What Doesn't Work

**Revenue Stack:**
- Credits store: dead buttons, no payment processor
- Supabase: placeholder keys, no real data
- x402 settlement: needs signer key configuration
- Polar.sh: not integrated

**Infrastructure:**
- DNS split between Vercel and cloudflared
- No real deployment pipeline
- Local ecosystem.cjs uncommitted

---

## TODO List

### Must Fix (Revenue-Blocking)

- [ ] **Get Supabase keys** — anon key + service role key from dashboard, set in Vercel env vars
- [ ] **Run schema on Supabase** — apply `database/schema-production.sql` to production database
- [ ] **Add RLS policies** to all tables in Supabase
- [ ] **Fix credits buy buttons** — integrate Polar.sh or wire x402 USDC purchase flow
- [ ] **Set `X402_SIGNER_PRIVATE_KEY`** — treasury wallet private key (or confirm OWS-only signing)
- [ ] **Fix CREDENTIAL_ENCRYPTION_KEY** — generate proper 32-byte hex key
- [ ] **Move contact form to Supabase** — replace local FS write with DB insert
- [ ] **Fix DNS** — consolidate oma-ai.com routing to single source

### Should Fix (Production Quality)

- [ ] **Add `/careers` page** or remove footer link
- [ ] **Fix about page stats** — pull live from DB or remove hardcoded numbers
- [ ] **Add GDPR section** to privacy policy (if serving EU users)
- [ ] **Add DMCA policy page**
- [ ] **Fix MCP paid handler** — remove dead slug references or wire real pricing
- [ ] **Add sitemap.xml + robots.txt**
- [ ] **Commit or move ecosystem.cjs**
- [ ] **Login to Vercel** — `vercel login` for CI/CD visibility

### Nice to Have (Future)

- [ ] Add real auth (Supabase Auth) for user accounts
- [ ] Stripe as fallback payment option (card payments)
- [ ] Real email delivery for contact form (Resend integration stub exists)
- [ ] Email newsletter subscribe flow
- [ ] MCP publisher dashboard with earnings analytics

---

## Infrastructure Summary

| Component | Status | Location |
|-----------|--------|----------|
| OMA-AI Frontend | ✅ Built | Vercel (needs migration) |
| 7 MCP Handlers | ✅ Working | Vercel/server |
| OWS Wallet | ✅ Functional (oma-treasury) | `~/.ows/wallets/` |
| x402 Signing | ✅ OWS works, ethers fallback needs key | OMA-AI codebase |
| x402 Payment Verification | ⚠️ Partial | Needs on-chain confirmation |
| Supabase | ❌ Keys are placeholders | `oooijcrqpuqymgzlidrw` |
| Credits Store | ❌ Dead buttons | oma-ai.com/credits |
| Polar.sh | ❌ Not integrated | Needs setup |
| Mercury Bank | ❌ Not integrated | NOSYT LLC account exists |
| DNS | ⚠️ Split (Vercel + cloudflared) | oma-ai.com → Vercel |

---

*Last updated: May 10, 2026 by Frankie 🦞*
