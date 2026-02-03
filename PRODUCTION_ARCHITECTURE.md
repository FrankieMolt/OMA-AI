# OMA-AI.COM: PRODUCTION ARCHITECTURE & REAL STACK

**Date:** 2026-02-03
**Goal:** Replace mocks with real, scalable technologies.

---

## 1. HYBRID HOSTING STRATEGY

Since your Linux PC has limited resources (CPU/RAM), we will use a **Hybrid Architecture**:

| Layer | Technology | Location | Purpose |
|-------|------------|----------|---------|
| **Control Plane** | Coolify (Self-hosted) | **Your Linux PC** | API Gateway, Database, Auth, CDN |
| **Compute Plane** | Railway/Render | **Cloud** | AI Agents, Heavy Workers, LLM Inference |
| **Storage** | Supabase (PostgreSQL) + IPFS | **Cloud** | Persistent Data + Agent Memories |
| **Identity** | Web3Auth | **Cloud** | Wallet Login (SIWE) |

### Why Hybrid?
-   **Cost:** $0 for Control Plane (your PC).
-   **Scalability:** Cloud handles spikes in AI traffic.
-   **Uptime:** PC goes offline -> Control Plane down (Acceptable for "Zero Human" MVP).

---

## 2. REAL TECH STACK

### A. Identity (Login with Wallet)
Instead of "Connect Wallet" mocks, we use **Web3Auth (SIWE)**.

**Implementation:**
1.  User clicks "Login with Ethereum".
2.  Web3Auth prompts wallet to sign message.
3.  Backend verifies signature -> Issues JWT.
4.  User is logged in as `0x123...`.

**Stack:**
-   **Frontend:** `@web3auth/modal`
-   **Backend:** `siwe` (Sign-In with Ethereum) library

### B. Storage (Agent Memories)
Agents need persistent memory. We use **IPFS + Filecoin** (or Pinata).

**Implementation:**
1.  Agent generates logs/thoughts.
2.  Compress to JSON.
3.  Upload to IPFS.
4.  Save CID to Supabase.

**Stack:**
-   **Frontend:** `ipfs-http-client`
-   **Backend:** `ipfs-http-client` (Python) or Pinata SDK.

### C. Data (PostgreSQL)
Replaced JSON files with **Supabase**.

**Stack:**
-   **ORM:** SQLAlchemy or Supabase Python Client.
-   **Migrations:** Alembic.

### D. Payments (x402)
Keep the current x402 implementation, but enable real USDC transfers.

**Stack:**
-   **Wallet:** `ethers.js` (EVM) / `solana-web3.js` (Solana).
-   **Verification:** On-chain event listening.

---

## 3. SITE ARCHITECTURE (UI/UX)

The site needs proper pages, not just a single dashboard.

### Site Map
1.  **/** - Landing Page (Marketing)
2.  **/marketplace** - Browse Services
3.  **/dashboard** - User Profile (My Agents, Wallet)
4.  **/docs** - API Documentation
5.  **/launch** - Deploy New Agent

### Component Design System
Using **Tailwind CSS** + **shadcn/ui** (simulated).

**Design Tokens:**
-   **Primary:** `#8B5CF6` (Purple)
-   **Secondary:** `#10B981` (Green)
-   **Background:** `#000000` (Black)
-   **Text:** `#F3F4F6` (Gray-100)
-   **Font:** `Inter` or `JetBrains Mono`

---

## 4. CODEBASE RESTRUCTURE

Move from "Flat File" to "Proper Project".

```
OMA-AI/
├── apps/
│   ├── web/              # Next.js Frontend
│   │   ├── src/
│   │   │   ├── app/      # App Router
│   │   │   ├── components/ # UI Components
│   │   │   ├── lib/      # Utils (Web3Auth, IPFS)
│   │   │   └── hooks/    # Custom Hooks
│   │   └── public/       # Static Assets
│   ├── api/              # FastAPI Backend
│   │   ├── routers/      # Route handlers (agents, users)
│   │   ├── models/       # Pydantic/SQLAlchemy
│   │   ├── services/     # Business Logic
│   │   └── main.py       # Entry point
│   └── worker/           # Celery/RQ Workers
│       ├── tasks/        # Background jobs
│       └── scheduler/    # Cron jobs
├── packages/
│   ├── config/           # Tailwind, ESLint
│   └── ui/               # Shared UI Components
├── infra/
│   ├── coolify/          # Coolify config
│   ├── docker/           # Dockerfiles
│   └── terraform/        # Cloud infrastructure
└── README.md
```

---

## 5. COOLIFY INTEGRATION

**What to deploy on Coolify (Your PC):**
1.  **PostgreSQL:** 10GB Disk.
2.  **Redis:** For caching.
3.  **Nginx:** Reverse Proxy (handled by Coolify).

**What NOT to deploy on Coolify:**
1.  **Next.js (Frontend):** Use Vercel (Free tier).
2.  **AI Agents:** Use Railway (Pay-per-use).

---

## 6. MIGRATION STEPS

### Phase 1: Foundation (This Week)
1.  **Setup Monorepo:** Create the `apps/web` and `apps/api` structure.
2.  **Setup Supabase:** Import `schema.sql`.
3.  **Setup Web3Auth:** Create project, get Client ID.
4.  **Deploy API:** Connect FastAPI to Supabase.

### Phase 2: Features (Week 2)
1.  **Implement Wallet Login.**
2.  **Implement IPFS Uploads.**
3.  **Deploy Frontend to Vercel.**

### Phase 3: Monetization (Week 3)
1.  **Stripe Integration:** For USD payments (optional).
2.  **x402 Audit:** Ensure smart contracts are secure.

---

## 7. REAL OPEN SOURCE TO EMBED

| Feature | Library | Purpose |
|---------|---------|---------|
| **Wallet Connect** | `wagmi` / `viem` | EVM wallet connection |
| **Login** | `siwe` | Sign-In with Ethereum |
| **Database** | `@supabase/supabase-js` | Client for Supabase |
| **Storage** | `ipfs-http-client` | Decentralized file storage |
| **Charts** | `recharts` | Analytics visualizations |
| **Forms** | `react-hook-form` + `zod` | Form validation |
| **Icons** | `lucide-react` | Clean, modern icons |

---

## 8. CONCLUSION

**OMA-AI.COM** is currently a "Prototype".
To make it "Real", we must:
1.  **Adopt Hybrid Hosting:** Coolify (PC) + Railway (Cloud).
2.  **Implement Identity:** Web3Auth (Wallet Login).
3.  **Implement Storage:** IPFS + Supabase.
4.  **Structure Codebase:** Monorepo (Web + API).

This architecture supports **10,000+ users** and generates **real revenue**.