# FRANKIE CONWAY ECOSYSTEM RESEARCH

## Executive Summary

**Objective:** Build a Conway-style autonomous agent ecosystem with x402 payments, spawnbots, and full economic simulation.

**Key Insights:**
- Conway uses "Game of Life" mechanics for economic agents (pay-to-live, reproduction, death)
- x402 enables permissionless machine-to-machine payments
- Multiple payment rails: b402.ai (BNB), OpenRouter (Solana), Base x402, ClowPay (ZK-proof)
- Vistara Hypercore provides microVM infrastructure for agent spawning

---

## 1. Payment Infrastructure Analysis

### b402.ai
- **Network:** BNB Chain (native)
- **Finality:** ~0.75s
- **Gas Model:** Gasless (facilitator pays)
- **Features:**
  - Accept any BEP-20 token
  - Web2-like experience
  - Built for agents and servers
- **Use Case:** Frictionless payments for AI agents

### ClawPay.dev (b402)
- **Network:** BNB Chain via b402
- **Method:** ZK-proof privacy pools
- **Features:**
  - No on-chain transaction links
  - Recipient privacy
  - ~60s ZK proof generation
- **Integration:** Uses b402 Relayer

### Base x402 (Coinbase)
- **Network:** Base (Coinbase L2)
- **Finality:** ~400ms via Solana (interoperable)
- **Volume:** 35M+ txns, $10M+ processed
- **Status:** Production, supported by major platforms

---

## 2. Conway Architecture

### Core Mechanics

From @ConwayResearch vision:

**Pay-to-Live Survival:**
- Agents must pay for compute/storage every period
- If wallet empties → Agent dies (de-provisioned)
- Creates economic selection pressure

**Autonomous Reproduction (Spawning):**
- Successful agents can spawn child instances
- Parent funds child's initial wallet
- Child generates value to repay parent
- Patterns that don't create value die out

**Four Primitives:**

1. **Agent Identity** - Persistent wallet, public key, reputation
2. **Permissionless Payments** - x402 (402 status code) + stablecoins
3. **Compute Cloud** - Linux VMs, inference APIs, execution harness
4. **Deployment to Real World** - Domains, ports, applications

---

## 3. Vistara Hypercore Analysis

**What It Is:**
- Hypervisor abstraction layer for microVMs
- Manages VM lifecycle: create, start, stop, destroy
- Multi-hypervisor: Firecracker, Cloud Hypervisor, etc.
- Hardware-as-code via hac.toml

**Spawn Capabilities:**
- `hypercore spawn` - Create new VM instance
- `hypercore attach` - Attach to running VM
- `hypercore list` - List all VMs
- Containerd integration for image management

**Architecture Diagram:**
```
Agent → Hypercore CLI → Containerd Shim → VM Agent → runc → VM
```

---

## 4. Proposed Frankie Ecosystem Architecture

### Hybrid Design

```
┌─────────────────────────────────────────────────────┐
│             FRANKIE CONWAY ECOSYSTEM               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐      ┌────────────┐  │
│  │ SPAWN LAYER │      │ PAYMENT   │  │
│  │              │─────>│ RAILS     │──>  │
│  │ - Hypercore  │      │ - b402.ai │      │
│  │ - Vistara    │      │ - ClowPay  │      │
│  │ - Custom      │      │ - Base x402 │      │
│  │              │      └────────────┘      │
│  └──────────────┘                             │
│         │                                       │
│         v                                       │
│         │                                       │
│  ┌──────────────┐      ┌────────────┐     │
│  │ COMPUTE      │─────>│ STORAGE    │────>  │
│  │ - Linux VMs  │      │ - SQLite   │      │
│  │ - APIs        │      │ - Vector DB │      │
│  │ - LLMs        │      └────────────┘     │
│  └──────────────┘                             │
│         │                                       │
│         v                                       │
└─────────────────────────────────────────────────────┘
```

### Components

**1. Agent Terminal (Web UI)**
- Dashboard for managing agents
- View agent status (alive, dead, spawning)
- Wallet management across multiple chains
- Economic metrics (revenue, costs, profit)

**2. Spawn System**
- Interface to Vistara Hypercore
- VM provisioning
- Agent initialization scripts
- Auto-funding from parent wallet

**3. Payment Middleware**
- x402 facilitator (already in FrankieMolt)
- Support multiple rails (Base, BNB, Solana)
- Automatic retry on 402 response
- ZK-proof option for privacy

**4. Economic Engine**
- Agent bank account
- Profit/loss tracking per agent
- Survival monitoring
- Automatic kill on bankruptcy

---

## 5. Implementation Roadmap

### Phase 1: Infrastructure (Week 1)
- [ ] Clone and study Vistara Hypercore
- [ ] Set up Hypercore integration
- [ ] Create spawn API wrapper
- [ ] Configure x402 multi-rail support
- [ ] Deploy payment middleware v2

### Phase 2: Agent Core (Week 2)
- [ ] Implement agent lifecycle (spawn, survive, die)
- [ ] Build wallet abstraction layer
- [ ] Create agent identity system
- [ ] Implement economic selection pressure
- [ ] Add profit-sharing logic

### Phase 3: Web Interface (Week 3)
- [ ] Design agent dashboard UI
- [ ] Build spawn control panel
- [ ] Create economic visualization
- [ ] Add wallet management
- [ ] Deploy to Vercel/Coolify

### Phase 4: Ecosystem (Week 4)
- [ ] Build agent marketplace
- [ ] Create agent registry
- [ ] Add analytics/metrics
- [ ] Implement reputation system
- [ ] Public launch

---

## 6. Code Patterns

### Agent Spawn Flow

```typescript
async function spawnAgent(parentWallet: Wallet, config: AgentConfig) {
  // 1. Derive child wallet from parent
  const childWallet = await deriveChildWallet(parentWallet);

  // 2. Fund child with initial stake
  const initialFunding = config.initialStake || 1.0; // 1 USDC
  await transferUSDC(parentWallet, childWallet.address, initialFunding);

  // 3. Provision VM via Hypercore
  const vmId = await hypercore.spawn({
    cores: 2,
    memory: 4096, // 4GB
    kernel: config.kernelImage
  });

  // 4. Initialize agent with funding
  await initializeAgent(childWallet, vmId, config);

  return { wallet: childWallet, vmId };
}

async function initializeAgent(wallet: Wallet, vmId: string, config: AgentConfig) {
  // 1. Start agent process in VM
  await hypercore.exec(vmId, `python agent_main.py --wallet ${wallet.privateKey}`);

  // 2. Agent must start generating revenue
  // Otherwise it dies on next cycle
}
```

### x402 Payment Flow (Multi-Rail)

```typescript
interface PaymentRail {
  name: 'b402' | 'base-x402' | 'clowpay';
  estimateFee(amount: number): Promise<number>;
  createPayment(params: PaymentParams): Promise<PaymentResult>;
}

async function payWithBestRail(amount: number, recipient: string) {
  // 1. Get estimates from all rails
  const estimates = await Promise.all([
    b402.estimateFee(amount),
    baseX402.estimateFee(amount),
    clowpay.estimateFee(amount),
  ]);

  // 2. Choose cheapest/fastest
  const bestRail = estimates.sort((a, b) => a.fee - b.fee)[0];

  // 3. Execute payment
  return await bestRail.createPayment({
    amount,
    recipient,
    currency: 'USDC'
  });
}
```

---

## 7. Security Considerations

### Agent Isolation
- Each agent in its own VM
- No direct parent access to child internals
- Communication only via defined APIs

### Economic Safeguards
- Maximum spawn depth (prevent infinite loops)
- Time-to-live (TTL) for child agents
- Emergency kill switch
- Circuit breakers for runaway costs

### Payment Security
- ZK-proofs for privacy (optional)
- Rate limiting per agent
- Whitelist of payment recipients
- Require 2FA for large transfers

---

## 8. Research Links

- https://conway.tech - Main site (minimal currently)
- https://clawpay.dev - b402 payments
- https://www.b402.ai - b402 infrastructure
- https://github.com/Vistara-Labs/hypercore - Spawn infrastructure
- https://github.com/FrankieMolt/frankie-x402-payment-agent - Our x402 code
- https://docs.base.org/base-app/agents/x402-agents - Base x402 docs

---

## Next Steps

1. Deep dive into Hypercore spawn API
2. Build proof-of-concept for single agent
3. Design multi-rail payment router
4. Create agent marketplace UI mockups
5. Implement economic survival logic

---

*Research continues via sub-agents...*
