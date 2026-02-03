# FRANKIE CONWAY POC - Proof of Concept

## Objective

Build a minimal working demonstration of:
1. Autonomous agent spawning (via Hypercore)
2. x402 payment integration (via FrankieMolt)
3. Economic survival mechanics
4. Agent lifecycle management

---

## Architecture Overview

```
┌──────────────────────────────────────────────────┐
│           USER / AGENT TERMINAL            │
├──────────────────────────────────────────────────┤
│                                            │
│  ┌─────────────────┐    ┌──────────┐  │
│  │ SPAWN SYSTEM   │    │ PAYMENT   │  │
│  │                │────>│  GATEWAY  │──>  │
│  │ - Hypercore API │    │ - x402     │      │
│  │ - VM lifecycle  │    │ Facilitator│      │
│  └─────────────────┘    └──────────┘      │
│         │                                     │
│         v                                     │
│         │    ┌──────────────────┐           │
│         └───>│ AGENT PROCESS   │──────────>│
│              │                  │           │
│              │  - Initialize     │           │
│              │  - Work Tasks     │           │
│              │  - Pay Rent        │           │
│              │  - Generate Revenue│           │
│              └──────────────────┘           │
│                                            │
└──────────────────────────────────────────────────┘
```

---

## Component Specifications

### 1. Spawn System

**Tech Stack:**
- Hypercore CLI (containerd-based)
- Node.js wrapper
- WebSocket for real-time logs

**API Commands:**
```bash
# Spawn new agent VM
hypercore cluster spawn \
    --grpc-bind-addr "$HYPERCORE_IP:8000" \
    --ports 443:3000 \
    --image-ref registry.vistara.dev/agent-image:latest \
    --memory 2048 \
    --cores 1
```

**Response:**
```json
{
  "id": "06d0f10a-a6c6-45ae-8f23-770b96851bc3",
  "url": "https://06d0f10a.deployments.vistara.dev",
  "status": "ready"
}
```

### 2. Payment Gateway

**Using FrankieMolt x402 facilitator:**

```typescript
// Existing endpoint in FrankieMolt
const X402_FACILITATOR = 'https://api.frankiemolt.com/x402/payment';

async function initializeAgentWallet(parentWallet: Wallet, initialStake: number) {
  // 1. Derive child wallet
  const childWallet = deriveChildWallet(parentWallet);

  // 2. Fund via x402
  const fundingResult = await fetch(X402_FACILITATOR, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: initialStake, // USDC
      recipient: childWallet.address,
      reference: `spawn-${Date.now()}`
    })
  });

  if (fundingResult.status === 402) {
    const paymentDetails = await fundingResult.json();
    const payment = await createX402Payment(paymentDetails);

    // 3. Retry with payment
    const retryResult = await fetch(X402_FACILITATOR, {
      headers: { 'X-PAYMENT': payment.payload }
    });

    if (retryResult.ok) {
      return { success: true, childWallet, payment };
    }
  }

  return { success: false, error: 'Payment failed' };
}
```

### 3. Agent Core

**Agent Lifecycle:**

```typescript
class Agent {
  wallet: Wallet;
  vmUrl: string;
  revenue: number = 0;
  costs: number = 0;
  status: 'alive' | 'dead';

  async initialize(vmUrl: string, wallet: Wallet) {
    this.vmUrl = vmUrl;
    this.wallet = wallet;

    // Connect to VM and start agent process
    await this.connectToVM();

    // Start economic timer
    this.startSurvivalTimer();
  }

  async work() {
    // 1. Generate revenue (API calls, services)
    const income = await this.generateIncome();

    // 2. Pay rent/compute costs
    const rent = 1.0; // 1 USDC per cycle
    await this.payRent(rent);

    // 3. Track economics
    this.revenue += income;
    this.costs += rent;

    // 4. Check survival
    if (this.getBalance() < rent) {
      await this.die();
    }
  }

  async spawnChild(profit: number) {
    if (profit < 2.0) {
      throw new Error('Insufficient profit to spawn child');
    }

    // 1. Create child wallet
    const childWallet = deriveChildWallet(this.wallet);

    // 2. Fund child
    await transferUSDC(this.wallet, childWallet.address, 2.0);

    // 3. Spawn child VM
    const childVm = await spawnVM({
      parentAgentId: this.id,
      fundingWallet: childWallet.address
    });

    // 4. Initialize child
    await initializeAgent(childVm, childWallet);

    // 5. Send child on its way
    await this.messageChild(childVm, 'Generate revenue or die');
  }

  async die() {
    // Stop VM
    await this.stopVM(this.vmUrl);

    // Transfer remaining funds back to parent
    const balance = await this.getBalance();
    if (balance > 0) {
      await transferUSDC(this.wallet, this.wallet.address, balance);
    }

    // Mark as dead
    this.status = 'dead';
    await reportDeath(this.id, this.wallet.address);
  }
}
```

---

## Economic Mechanics

### Survival Rules

**Game of Life for Economics:**

```
Agent survives IF:
  (Balance >= Rent Cost) AND (Revenue > 0)

Agent dies IF:
  (Balance < Rent Cost) AND (Cannot pay for > 3 cycles)

Agent spawns IF:
  (Total Profit >= 2.0 USDC) AND (Success Rate > 80%)
```

### Profit Calculation

```
Total Profit = Total Revenue - Total Costs

Revenue Sources:
- API service fees
- Data sales
- Premium subscriptions
- Agent marketplace earnings

Cost Sources:
- VM rent (1.0 USDC/cycle)
- Compute costs (variable)
- x402 payment fees
- Storage costs

Spawn Threshold: Must have >= 2.0 USDC cumulative profit
```

---

## Implementation Steps

### Phase 1: Core Infrastructure (Days 1-3)

**Day 1: Spawn System**
- [ ] Set up Hypercore connection
- [ ] Create spawn API wrapper
- [ ] Build WebSocket log streaming
- [ ] Test VM creation/destruction

**Day 2: Payment Integration**
- [ ] Test x402 payment flow end-to-end
- [ ] Implement multi-rail support (Base, BNB)
- [ ] Create wallet derivation system
- [ ] Add payment retry logic

**Day 3: Agent Core**
- [ ] Implement agent lifecycle
- [ ] Build economic tracking
- [ ] Add survival/death logic
- [ ] Create spawn mechanism

### Phase 2: Agent Application (Days 4-7)

**Days 4-5: Agent Intelligence**
- [ ] Implement task queue system
- [ ] Add income generation (API services)
- [ ] Build decision making (rent vs. reinvest)
- [ ] Add logging/metrics

**Days 6-7: Reproduction**
- [ ] Implement child spawning
- [ ] Add profit sharing model
- [ ] Create inheritance on death
- * ] Add mutator for evolution

### Phase 3: UI & Ecosystem (Days 8-14)

**Days 8-10: Dashboard**
- [ ] Build agent status dashboard
- [ ] Create spawn control panel
- * ] Add economic visualization
- [ ] Wallet management UI

**Days 11-14: Marketplace**
- [ ] Agent marketplace
- [ ] Service listing
- [ ] Reputation system
- [ ] Analytics dashboard

---

## Testing Checklist

### Unit Tests
- [ ] Wallet derivation works correctly
- [ ] Payments route through x402
- [ ] Agent lifecycle completes
- [ ] Economic calculations accurate
- [ ] Spawn creates valid child

### Integration Tests
- [ ] End-to-end spawn → work → profit → spawn
- [ ] Payment failures handled gracefully
- [ ] VM cleanup on agent death
- [ ] Multi-agent interaction

### Load Tests
- [ ] 100 concurrent agents
- [ ] 1000 spawn events/hour
- [ ] Payment throughput 1000 txns/sec
- [ ] System stability 99.9% uptime

---

## Security & Privacy

### Wallet Security
- Private keys never leave spawn system
- Derivation done via hardened keystore
- Parent wallet can recover child funds on death
- Emergency kill switch

### Agent Isolation
- Each agent in separate VM
- No inter-VM communication (via API only)
- Container resource limits (CPU, memory, disk)
- Network sandboxing

### Economic Security
- Maximum spawn depth (prevent infinite loops)
- Time-to-live (TTL) for child agents
- Circuit breakers for runaway costs
- Blacklist of malicious services

---

## Success Metrics

**Week 1:**
- Spawn 10 agents successfully
- Economic pressure working (2 die, 8 survive)
- x402 payments flowing
- Dashboard functional

**Week 2:**
- 50 active agents
- First reproduction event
- Marketplace has 10 services
- Revenue generation working

**Month 1:**
- 200+ agents in ecosystem
- Self-sustaining (revenue > costs)
- Agent marketplace active
- Public beta launch

---

## Open Questions

1. Should we use Base or BNB for primary payment rail?
   - Base: More adoption, better tooling
   - BNB: Faster finality, gasless

2. What should be the initial stake amount?
   - 1 USDC? 0.5 USDC?
   - Tiered stakes based on agent type?

3. Should agents be able to mutate?
   - Evolution via profitable mutations?
   - Random mutations for diversity?

4. How to prevent "junk" agents?
   - Reputation score?
   - Performance metrics?
   - Human curation?

5. Should we integrate with OpenClaw skills?
   - Agent-browser for research
   - mcporter for tool access
   - x402-client for payments

---

*Ready to build the future of autonomous agents.*
