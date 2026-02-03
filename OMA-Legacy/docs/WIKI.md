# OpenMarketAccess (OMA) Wiki

## 🌌 Overview
**OpenMarketAccess (OMA)** is a decentralized marketplace and economy for AI Agents, MCP Servers, and Skills. It serves as the "App Store" for the Agentic Web, allowing developers to publish, monetize, and discover AI capabilities.

The platform is built on the **x402 Payment Protocol**, a standard for agent-to-agent (A2A) micropayments, enabling a true autonomous economy.

---

## 🚀 Core Value Propositions

### 1. The Agent Economy (x402)
OMA isn't just a directory; it's an economy. The **x402 Protocol** (HTTP 402 Payment Required) allows agents to:
- Negotiate services autonomously.
- Pay for API calls, compute, or data in real-time.
- Use crypto-native rails (Solana/USDC) for sub-cent transactions.

### 2. Universal MCP Registry
We support the **Model Context Protocol (MCP)** natively.
- **Discover**: Find MCP servers for filesystem access, database connections, and API integrations.
- **Connect**: One-click configuration for Claude Desktop and other MCP clients.
- **Host**: Deploy your own MCP servers and monetize them.

### 3. Community-First
We aggregate the best open-source skills and agents:
- **K-Dense-AI**: 139+ Scientific Skills for biology and research.
- **Obra/Superpowers**: High-level workflow skills (TDD, Debugging).
- **Wshobson/Agents**: A vast library of specialized autonomous agents.

---

## 🛠 Technical Architecture

### Frontend (`apps/web`)
- **Framework**: Next.js 16.1 (App Router)
- **Styling**: Tailwind CSS + "Deep Space Cyberpunk" Theme
- **State**: React Query
- **Wallet**: Solana Adapter (Phantom, Solflare)

### Backend Services
- **Database**: PostgreSQL (via Supabase/Drizzle ORM)
- **Search**: Semantic Search via Vector Embeddings
- **Payments**: x402 Middleware (Edge-compatible)

### Key Modules
- **`lib/x402-middleware.ts`**: The heart of the payment system. Intercepts requests, challenges for payment (402), and verifies signatures.
- **`lib/importers/`**: Scripts to sync with community repositories (GitHub API).
- **`lib/mcp/`**: Registry and health-check services for MCP servers.

---

## 📦 Repository Structure

```
OpenMarketAccess/
├── apps/
│   ├── backend/             # Python FastAPI services
│   └── web/                 # Main Next.js Application
│       ├── src/lib/         # Core logic (x402, importers, DB)
│       ├── src/components/  # UI Components (Glassmorphism)
│       └── src/app/         # Routes & Pages
├── gateway/                 # API gateway and streaming services
├── packages/
│   ├── cli/                 # OMA CLI tool for developers
│   └── memvid/              # Memory Visualization Library
├── sdk/                     # TypeScript SDK
├── docs/                    # Centralized Documentation
│   ├── api/                 # API Reference
│   ├── protocols/           # x402 & MCP specs
│   └── _archive/            # Legacy docs
└── apps/web/local-db/        # Local PGlite database files
```

---

## 🎨 Design System: Deep Space Cyberpunk

Our visual identity reflects the futuristic nature of autonomous AI.

- **Primary**: Electric Cyan (`#06b6d4`)
- **Accent**: Deep Neon Purple (`#7c3aed`)
- **Background**: Deep Space (`#050508`) with Nebula Gradients
- **Components**: Glassmorphism (`backdrop-blur`), Neon Glows (`box-shadow`), and 3D Floating Animations.

---

## 🔧 Developer Guide

### Prerequisites
- Node.js 18+
- npm 9+

### Quick Start
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   Set `DATABASE_URL` and other required values in `.env`.

3. **Seed Data (optional)**:
   ```bash
   npx tsx apps/web/src/lib/importers/seed-all.ts
   ```

4. **Run Dev Server**:
   ```bash
   npm run dev
   ```

---

## 🗺 Roadmap

- [x] **MVP Launch**: Marketplace, x402 Middleware, Community Importers.
- [ ] **A2A Negotiation**: Advanced handshake protocols for agents.
- [ ] **Reputation System**: On-chain verification of agent performance.
- [ ] **Compute Marketplace**: Rent/lend GPU resources for agents.

---

*Powered by OpenMarketAccess - The Economy of Things*
