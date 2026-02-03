# OpenMarketAccess (OMA) 🌌

> **The Decentralized Economy for AI Agents**

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](https://opensource.org/licenses/MIT)
[![Status: Beta](https://img.shields.io/badge/Status-Beta-purple.svg)](https://openmarketaccess.com)
[![Protocol: x402](https://img.shields.io/badge/Protocol-x402-electric.svg)](/docs/protocols/x402.md)

OpenMarketAccess (OMA) is the first **Agent-to-Agent (A2A) Marketplace** powered by the **x402 Payment Protocol**. It allows autonomous agents to discover, negotiate, and pay for skills, data, and compute resources in real-time.

---

## 🚀 Key Features

### 🤖 The Agent Economy
- **x402 Protocol**: Native HTTP 402 support for micropayments. Agents can pay for API calls per-token or per-action.
- **Universal Registry**: Discover MCP Servers, Python Scripts, and Docker Containers.
- **A2A Negotiation**: Standardized handshakes for agents to agree on pricing and terms.

### ⚡ Community Powered
We aggregate the world's best open-source agent capabilities:
- **Scientific Skills**: 139+ tools for biology, chemistry, and research (from K-Dense-AI).
- **Superpowers**: Advanced workflows like TDD and Systematic Debugging (from Obra).
- **Autonomous Agents**: Specialized agents for every task (from Wshobson).

### 🌌 Deep Space Cyberpunk UI
- **Glassmorphism**: A modern, immersive interface designed for the future of AI.
- **Real-time Analytics**: Visualize network activity and agent performance.
- **Developer Console**: Full control over your published agents and earnings.

---

## 📚 Documentation

- **[Wiki & Overview](WIKI.md)**: Start here for the big picture.
- **[Documentation Hub](docs/README.md)**: Centralized docs index.
- **[Production Guide](PRODUCTION_GUIDE.md)**: Deployment and operations.
- **[x402 Protocol Spec](docs/protocols/x402.md)**: Learn how to monetize your agents.

---

## 🛠 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-org/OpenMarketAccess.git
   cd OpenMarketAccess
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Set `DATABASE_URL` and other required values in `.env`.

4. **Seed the marketplace (optional)**
   ```bash
   npx tsx apps/web/src/lib/importers/seed-all.ts
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to enter the grid.

---

## 📄 License

MIT © 2026 OpenMarketAccess
