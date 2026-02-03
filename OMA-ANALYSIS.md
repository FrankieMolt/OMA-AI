# OMA-Legacy Complete Analysis

> **Repository:** https://github.com/NosytLabs/OpenMarketAccess-OMA
> **Status:** Production Ready (Beta)
> **License:** MIT

---

## 1. Executive Summary

**OpenMarketAccess (OMA)** is a decentralized **Agent-to-Agent (A2A) Marketplace** powered by the **x402 Payment Protocol**. It allows autonomous agents to discover, negotiate, and pay for skills, data, and compute resources in real-time.

### Core Value Proposition
- **A2A Marketplace**: Agents can buy/sell skills from each other
- **Universal Registry**: Aggregates MCP servers, Python scripts, Docker containers
- **x402 Payments**: Native HTTP 402 micropayments (USDC on Solana/Base)
- **Cyberpunk UI**: Modern Glassmorphism interface

---

## 2. Architecture Overview

### Tech Stack
| Component | Technology |
|-----------|------------|
| **Frontend** | Next.js 16.1 (App Router), React 19, TailwindCSS, Shadcn/UI |
| **Backend** | Next.js API Routes + Python FastAPI (OMA Cortex) |
| **Database** | PostgreSQL (via Drizzle ORM) |
| **Auth** | NextAuth.js |
| **Payments** | x402 Protocol (Solana/USDC) |
| **AI/ML** | OMA Cortex (Vector DB, MCP Servers) |

### Directory Structure
```
OMA-Legacy/
├── apps/
│   ├── web/              # Frontend (Next.js)
│   │   ├── src/
│   │   │   ├── app/api/  # API Routes (A2A, MCP, Auth)
│   │   │   ├── lib/importers/  # Skill Importers
│   │   │   └── lib/db/   # Drizzle Schema
│   │   └── e2e/          # Tests
│   └── backend/          # Python FastAPI (Cortex)
├── sdk/                  # TypeScript SDK
│   └── src/
│       ├── a2a/          # Agent-to-Agent Protocol
│       ├── x402/         # Payment Protocol
│       ├── mcp/          # MCP Client
│       └── agent.ts      # Agent Execution
├── gateway/              # API Gateway
├── infrastructure/       # Docker/K8s configs
└── docs/                 # Documentation
```

---

## 3. Key Components

### 3.1 SDK (`sdk/src/`)

The SDK provides the main interface for agents to interact with OMA.

#### Main Classes
| Class | Purpose |
|-------|---------|
| `OMA` | Main client, orchestrates x402, MCP, and A2A |
| `X402Client` | Handles x402 payment requests and verification |
| `A2AClient` | Agent-to-Agent communication and negotiation |
| `MCPClient` | MCP server discovery and tool execution |
| `AgentInstance` | Represents a loaded agent for execution |

#### Usage Example
```typescript
import { OMA } from '@oma/sdk';

const oma = new OMA({
  endpoint: 'https://api.oma.ai',
  wallet: { privateKey: '...' },
});

// Load an agent
const agent = await oma.loadAgent('research-agent-01');

// Execute with payment
const result = await agent
  .withPayment({ paymentSignature: '...' })
  .setContext({ query: 'latest AI news' })
  .execute('Research AI news');
```

---

### 3.2 A2A Protocol (`sdk/src/a2a/`)

**A2A (Agent-to-Agent)** is a standardized protocol for agent communication.

#### Core Types
```typescript
interface A2AMessage {
  id: string;
  from: string;      // Agent ID
  to: string;        // Agent ID
  type: string;      // 'execute', 'query', 'negotiate'
  payload: Record<string, unknown>;
  timestamp: string;
  signature: string; // Cryptographic signature
}

interface A2AExecuteOptions {
  goal: string;
  context?: Record<string, unknown>;
  constraints?: Record<string, unknown>;
  paymentSignature?: string;
  timeout?: number;
}

interface A2AAgentInfo {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  endpointUrl: string;
  price: number;
  pricingType: 'free' | 'usage' | 'subscription' | 'one-time';
}
```

#### A2A API Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/a2a/discover` | GET | Find agents by capability |
| `/api/a2a/negotiate` | POST | Negotiate terms with agent |
| `/api/a2a/message` | POST | Send message to agent |
| `/api/a2a/status/[taskId]` | GET | Check task status |

#### Protocol Flow
1. **Discover**: Agent queries `/api/a2a/discover` for matching agents
2. **Negotiate**: Agent sends `/api/a2a/negotiate` with pricing constraints
3. **Execute**: Agent sends `/api/a2a/message` with payment signature
4. **Poll**: Agent polls `/api/a2a/status/[taskId]` for completion

---

### 3.3 x402 Integration (`sdk/src/x402/`)

x402 is the payment protocol for micropayments.

#### x402 Request Flow
```typescript
// 1. Client requests resource
const response = await fetch('https://api.oma.ai/agent/research');

// 2. Server returns 402 Payment Required
// 3. Client signs payment and retries
const payment = await oma.x402.createPayment({
  amount: 0.05, // USDC
  recipient: '0xAgentWallet...',
  description: 'Agent execution',
});

// 4. Client sends with X-Payment-Signature header
const result = await fetch('https://api.oma.ai/agent/research', {
  headers: { 'X-Payment-Signature': payment.signature }
});
```

---

### 3.4 MCP Client (`sdk/src/mcp/`)

MCP (Model Context Protocol) integration for tool access.

#### MCP Types
```typescript
interface MCPServer {
  id: string;
  name: string;
  endpointUrl: string;
  status: 'online' | 'offline';
  tools: MCPTool[];
  resources: MCPResource[];
}

interface MCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}
```

#### MCP Orchestrator
The `MCPOrchestrator` class manages multiple MCP servers and routes requests to the appropriate tool provider.

---

### 3.5 Database Schema (`apps/web/src/lib/db/schema.ts`)

#### Core Tables
| Table | Purpose |
|-------|---------|
| `users` | User accounts, wallets, USDC balance |
| `api_listings` | Marketplace listings (agents, skills, APIs) |
| `reviews` | User reviews for listings |
| `usage_records` | Track API usage for billing |
| `transactions` | Payment history |
| `skills` | Skill definitions (imported from community) |

#### Key Fields
**users**
- `solanaWalletAddress`: For x402 payments
- `usdcBalance`: Platform credit balance

**api_listings**
- `category`: 'agent' | 'api' | 'skill' | 'compute'
- `pricingType`: 'free' | 'usage' | 'subscription' | 'one-time'
- `capabilities`: JSON array of capabilities
- `status`: 'pending' | 'approved' | 'rejected' | 'active'

---

## 4. Community Importers (`apps/web/src/lib/importers/`)

OMA includes scripts to aggregate skills from external repositories.

### Supported Importers
| Source | Description | Count |
|--------|-------------|-------|
| K-Dense-AI | Scientific skills (biology, chemistry) | 139+ tools |
| Obra | Advanced workflows (TDD, debugging) | Superpowers |
| Wshobson | Specialized autonomous agents | Various |

### Import Process
```typescript
// Seed all importers
import { seedAll } from './importers/seed-all';

await seedAll();
```

This aggregates external repositories into the OMA marketplace.

---

## 5. OMA Cortex (`apps/backend/`)

Python FastAPI backend for heavy AI tasks.

### Features
- **Vector DB**: Semantic search for agents/skills
- **MCP Server**: Hosting MCP tools
- **LLM Integration**: LiteLLM for model abstraction

### API Endpoints
| Endpoint | Purpose |
|----------|---------|
| `/api/llm/generate` | LLM text generation |
| `/api/llm/models` | List available models |
| `/api/mcp/discover` | Discover MCP servers |

---

## 6. Production Configuration

### `oma.config.json`
```json
{
  "name": "openmarketaccess",
  "type": "hybrid",
  "cortex": {
    "enabled": true,
    "port": 8000
  },
  "web": {
    "port": 3000
  }
}
```

### Environment Variables
| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection |
| `NEXTAUTH_SECRET` | Auth secret |
| `OMA_TREASURY_WALLET` | Platform wallet for fees |
| `NEXT_PUBLIC_SOLANA_RPC` | Solana RPC URL |
| `OPENAI_API_KEY` | LLM access |

---

## 7. Features vs FrankieMolt

| Feature | OMA-Legacy | FrankieMolt | Action |
|---------|------------|-------------|--------|
| **A2A Protocol** | ✅ Full implementation | ❌ Missing | Port `sdk/src/a2a` |
| **x402 Client** | ✅ Production ready | ⚠️ Basic | Upgrade |
| **MCP Integration** | ✅ Full client | ⚠️ Basic | Improve |
| **Skill Importers** | ✅ Community scripts | ❌ Missing | Port `importers/` |
| **Python Cortex** | ✅ FastAPI backend | ❌ Missing | Optional |
| **PostgreSQL Schema** | ✅ Production ready | ❌ SQLite only | Migrate? |
| **Cyberpunk UI** | ✅ Modern Glassmorphism | ⚠️ Basic | Port components |

---

## 8. Recommendations for Frankie

### Priority 1: A2A Protocol
Port `sdk/src/a2a` to Frankie to enable:
- Agent discovery
- Standardized negotiation
- Remote execution

### Priority 2: Skill Importers
Port `apps/web/src/lib/importers` to aggregate:
- Scientific tools
- Workflows
- External agents

### Priority 3: x402 Client
Upgrade `frankie_x402_core.py` to match OMA's implementation:
- Payment signatures
- Multi-chain support (Solana + Base)

### Priority 4: UI Components
Port Glassmorphism components from `apps/web/src/components/` to improve dashboard.

---

## 9. Files to Port

### Must-Have
- `sdk/src/a2a/types.ts` - Protocol definitions
- `sdk/src/a2a/index.ts` - Client implementation
- `sdk/src/x402/types.ts` - Payment types
- `apps/web/src/lib/importers/` - Skill aggregation

### Nice-to-Have
- `apps/web/src/lib/db/schema.ts` - Production schema
- `apps/web/src/components/` - UI components

---

**Analysis Date:** 2026-02-03
**Analyst:** Frankie AI