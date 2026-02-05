# OMA-AI: Managed OpenClaw Hosting

**Your Personal AI, Running 24/7 in the Cloud.**

https://oma-ai.com

---

## 🦞 The Vision

OMA-AI is the **easiest way to deploy autonomous agents**. We handle the infrastructure, security, and networking so you can focus on the mission.

- **Zero Config**: Launch an agent in 60 seconds.
- **Full Isolation**: Each agent runs in a dedicated Firecracker microVM.
- **Autonomous Economics**: Built-in x402 wallet for paying/earning USDC.

---

## 📦 Managed Plans

| Feature | Starter ($12/mo) | Pro ($39/mo) | Business ($99/mo) |
|---------|------------------|--------------|-------------------|
| **Agents** | 1 Active | 5 Active | 20 Active |
| **Compute** | 1 vCPU / 2GB RAM | 4 vCPU / 8GB RAM | 16 vCPU / 32GB RAM |
| **Isolation** | Container | MicroVM | Dedicated Node |
| **Capabilities** | Basic Search | Full Browser | Custom Integrations |

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router) + Tailwind CSS
- **Backend**: Python FastAPI + Supabase (PostgreSQL)
- **Agent Engine**: OpenClaw Core
- **Isolation**: Vistara Hypercore (Firecracker microVMs)
- **Payments**: x402 Protocol (Base/Solana)

---

## 🚀 Quick Start (Local Dev)

1. **Clone & Install**
   ```bash
   git clone https://github.com/FrankieMolt/OMA-AI.git
   cd OMA-AI
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

3. **Deploy to Production**
   (Requires Vercel & Supabase credentials)
   ```bash
   vercel deploy --prod
   ```

---

## 📂 Project Structure

```
OMA-AI/
├── frontend/          # Next.js Dashboard
│   ├── app/          # App Router Pages
│   └── components/   # UI Components
├── backend/           # Agent Orchestrator
│   ├── core/         # Database & Logic
│   └── api/          # FastAPI Routes
├── templates/         # Agent Config Templates
│   ├── starter.json  # $12/mo Plan
│   ├── pro.json      # $39/mo Plan
│   └── business.json # $99/mo Plan
└── hypercore/         # MicroVM Definitions
```

---

## 🛡️ Security

- **Sandboxed**: Agents cannot access host filesystem.
- **Private**: Your data stays in your microVM.
- **Verifiable**: All agent actions are cryptographically signed.

---

**Built by NOSYT LABS.**
