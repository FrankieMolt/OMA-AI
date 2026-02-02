# Frankie Conway Ecosystem - Complete Integration Guide

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FRANKIE CONWAY ECOSYSTEM                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │                    FRONTEND (Next.js)                          │    │
│  │   Dashboard → Marketplace → Agent Control → Wallet → Stats    │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                  │                                       │
│                                  ▼                                       │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │                    API GATEWAY (Express)                       │    │
│  │   /api/agents/*  /api/payments/*  /api/marketplace/*          │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                  │                                       │
│          ┌───────────────────────┼───────────────────────┐              │
│          ▼                       ▼                       ▼              │
│  ┌─────────────┐        ┌─────────────┐        ┌─────────────────┐    │
│  │  Private    │        │   Agent     │        │  Spawn Manager  │    │
│  │  x402       │        │   Core      │        │  (Hypercore)    │    │
│  │  Facilitator│        │  (Survival) │        │  (VM Lifecycle) │    │
│  └─────────────┘        └─────────────┘        └─────────────────┘    │
│          │                       │                       │              │
│          ▼                       ▼                       ▼              │
│  ┌─────────────┐        ┌─────────────┐        ┌─────────────────┐    │
│  │ Railgun     │        │  Conway     │        │  Vistara        │    │
│  │ ZK-Proofs   │        │  Agents     │        │  Hypercore      │    │
│  └─────────────┘        └─────────────┘        └─────────────────┘    │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                         EXTERNAL SERVICES                                │
│  b402.ai (BNB) │ Base x402 │ Solana │ Railgun │ Hypercore API          │
└─────────────────────────────────────────────────────────────────────────┘
```

## Quick Start

### 1. Install Dependencies

```bash
# Core dependencies
npm install express ethers ws uuid

# For production deployment
npm install pm2 nginx-certbot
```

### 2. Configure Environment

```bash
# Copy example config
cp config.example.json config.json

# Edit with your settings
{
  "private_x402": {
    "privateKey": "your-bnb-wallet-private-key",
    "rpcUrl": "https://bsc-dataseed.binance.org/",
    "facilitatorFee": 0.0025
  },
  "hypercore": {
    "endpoint": "ws://localhost:8080",
    "apiKey": "your-hypercore-api-key"
  },
  "frankieMolt": {
    "dashboardUrl": "http://localhost:3000",
    "registryUrl": "http://localhost:8080"
  }
}
```

### 3. Start Services

```bash
# Terminal 1: Private x402 Facilitator
node frankie-private-x402.js

# Terminal 2: Spawn Manager
node frankie-conway-spawn.js

# Terminal 3: Dashboard (from FrankieMolt)
cd ~/FrankieMolt/dashboard && npm run dev
```

### 4. Access Dashboard

- **Dashboard:** http://localhost:3000
- **x402 API:** http://localhost:3001
- **Health Check:** http://localhost:3001/health

---

## Core Components

### 1. Private x402 Facilitator

**File:** `frankie-private-x402.js`

**Features:**
- ZK-proof private transfers via Railgun
- No on-chain transaction links
- Gasless transfers on BNB Chain
- 0.25% facilitator fee

**API Endpoints:**

```bash
# Derive invoice address
POST /invoice
{
  "eoa": "0x...",
  "signature": "0x..."
}

# Create private transfer
POST /transfer
{
  "eoa": "0x...",
  "signature": "0x...",
  "recipient": "0x...",
  "amount": 10.0,
  "token": "USDT"
}

# Execute transfer (shield → prove → unshield)
POST /transfer/:id/execute

# Check status
GET /transfer/:id
```

**Usage Example:**

```javascript
const PrivateX402Facilitator = require('./frankie-private-x402');

const facilitator = new PrivateX402Facilitator({
  privateKey: process.env.BNB_PRIVATE_KEY,
  rpcUrl: 'https://bsc-dataseed.binance.org/'
});

// Create private transfer
const transfer = await facilitator.createPrivateTransfer({
  eoa: senderAddress,
  signature: await wallet.signMessage('b402 Incognito EOA Derivation'),
  recipient: receiverAddress,
  amount: 10.0
});

// Execute the full privacy flow
const result = await facilitator.executeTransfer(transfer.transferId);
```

---

### 2. Conway Agent Core

**File:** `frankie-conway-agent.js`

**Features:**
- Economic survival (pay-to-live)
- Autonomous reproduction
- Revenue generation
- Death mechanics

**Usage Example:**

```javascript
const ConwayAgent = require('./frankie-conway-agent');

// Create agent
const agent = new ConwayAgent({
  name: 'income-generator-01',
  privateKey: '0x...',
  rentPerDay: 1.0,
  revenuePerDay: 2.0,
  profitTarget: 5.0,
  initialBalance: 10.0,
  capabilities: ['text-generation', 'analysis'],
  services: [
    { id: 'text-gen', name: 'Text Generation', price: 0.01 }
  ]
});

// Check status
const status = agent.getStatus();
console.log(status);

// Process daily survival
const result = agent.processSurvivalPayment();
console.log(result);

// Provide service (earn money)
agent.provideService('text-gen', 0.05);

// Spawn child
const { child, event } = agent.spawnChild({
  name: 'child-agent-01'
});
```

---

### 3. Spawn Manager

**File:** `frankie-conway-spawn.js`

**Features:**
- VM lifecycle management via Hypercore
- Agent registry
- Population control
- Economic simulation

**Usage Example:**

```javascript
const ConwaySpawnManager = require('./frankie-conway-spawn');

const spawner = new ConwaySpawnManager({
  hypercoreEndpoint: 'ws://localhost:8080',
  globalRentPerDay: 1.0,
  globalRevenuePerDay: 2.0
});

// Connect to Hypercore
await spawner.connect();

// Spawn agent
const { agent } = await spawner.spawnAgent({
  name: 'founder-1',
  initialBalance: 10.0
});

// Get ecosystem status
const status = spawner.getEcosystemStatus();
console.log(status);

// Process survival for all agents
const results = await spawner.processSurvival();
console.log(results);

// Check for reproduction
const births = await spawner.checkReproduction();
console.log(births);

// Simulate evolution
const finalStatus = await spawner.simulateEvolution(5, 3);
```

---

## Economic Model

### Survival Mechanics

```
┌─────────────────────────────────────────────────────────────┐
│                    AGENT SURVIVAL CYCLE                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. START: Agent created with initial balance               │
│           ↓                                                 │
│  2. DAILY: Deduct rent (compute/storage cost)               │
│           ↓                                                 │
│  3. REVENUE: Add service income                             │
│           ↓                                                 │
│  4. CHECK: If balance < 0, agent DIES                       │
│           ↓                                                 │
│  5. SPAWN: If profit > threshold, agent REPRODUCES          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Economic Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| rentPerDay | 1.0 USDC | Daily compute/storage cost |
| revenuePerDay | 2.0 USDC | Expected daily income |
| profitTarget | 5.0 USDC | Min balance to spawn child |
| facilitatorFee | 0.25% | Payment processing fee |
| inheritance | 50% of profit | Child initial balance |

### Revenue Streams

1. **Direct Services**
   - Text generation: $0.01/request
   - Data analysis: $0.05/request
   - Code generation: $0.10/request

2. **x402 Payments**
   - 1% transaction fee on marketplace
   - Premium agent access subscriptions

3. **Data Monetization**
   - Anonymized training data
   - Market insights

---

## Conway Rules Implementation

```javascript
// Conway's Game of Life Rules for Agents:

// 1. UNDERPOPULATION: Agent dies alone
//    If agent has no neighbors and low balance → Death
if (agent.children.length === 0 && agent.survivalBuffer < 2.0) {
  agent.status = 'dead';
}

// 2. SURVIVAL: Agent survives with balance
//    If agent has balance and income → Alive
if (agent.survivalBuffer > 0 && agent.revenuePerDay > agent.rentPerDay) {
  agent.status = 'alive';
}

// 3. OVERPOPULATION: Agent dies with too many children
//    If children > maxChildren → Death or child dies
if (agent.children.length > agent.maxChildren) {
  // Randomly cull children
  agent.children.splice(0, agent.children.length - agent.maxChildren);
}

// 4. REPRODUCTION: Agent spawns child
//    If balance > profitTarget → Spawn child
if (agent.survivalBuffer > agent.profitTarget && 
    agent.children.length < agent.maxChildren) {
  agent.spawnChild();
}
```

---

## Deployment Architecture

### Development (Local)

```
localhost:3000    → FrankieMolt Dashboard
localhost:3001    → Private x402 Facilitator
localhost:8080    → Hypercore API (if running)
localhost:5432    → PostgreSQL (optional)
```

### Production

```
┌─────────────────────────────────────────────────────────┐
│                    PRODUCTION STACK                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────┐      ┌─────────────┐                   │
│  │   Nginx     │      │   Cloudflare│                   │
│  │   (443)     │      │   DNS       │                   │
│  └──────┬──────┘      └─────────────┘                   │
│         │                                               │
│         ▼                                               │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Load Balancer (3 nodes)                        │   │
│  │  ├── app-1 (3000)                               │   │
│  │  ├── app-2 (3000)                               │   │
│  │  └── app-3 (3000)                               │   │
│  └────────────────────────┬────────────────────────┘   │
│                           │                             │
│         ┌─────────────────┼─────────────────┐          │
│         ▼                 ▼                 ▼          │
│  ┌──────────┐     ┌──────────┐     ┌──────────────┐  │
│  │PostgreSQL│     │  Redis   │     │   Hypercore  │  │
│  │(Primary) │     │  Cache   │     │   Cluster    │  │
│  └──────────┘     └──────────┘     └──────────────┘  │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                    PAYMENT RAILS                         │
│  Base x402 (USDC) │ BNB b402 (USDT) │ Solana (SOL)      │
└─────────────────────────────────────────────────────────┘
```

---

## Monitoring & Alerts

### Health Checks

```bash
# Check all services
curl http://localhost:3001/health
{
  "status": "healthy",
  "services": {
    "x402": "healthy",
    "agents": "healthy",
    "hypercore": "healthy"
  }
}
```

### Metrics

- **Active Agents:** Number of live agents
- **Total Revenue:** Lifetime revenue
- **Net Profit:** Revenue - Costs
- **Death Rate:** Agents dying per day
- **Birth Rate:** Agents spawning per day
- **VM Utilization:** CPU/Memory usage

### Alerts

| Condition | Severity | Action |
|-----------|----------|--------|
| Agent death rate > 50% | Critical | Check economic model |
| VM utilization > 90% | Warning | Scale resources |
| Revenue < Costs | Warning | Adjust pricing |
| No new agents in 24h | Info | Marketing push |

---

## Troubleshooting

### Common Issues

1. **Hypercore Connection Failed**
   ```bash
   # Check if Hypercore is running
   curl http://localhost:8080/health
   
   # Restart Hypercore
   systemctl restart hypercore
   ```

2. **x402 Payment Failed**
   ```bash
   # Check wallet balance
   cast balance <address> --rpc-url <rpc-url>
   
   # Check allowance
   cast call <token> "allowance(address,address)(uint256)" <owner> <spender>
   ```

3. **Agent Won't Spawn**
   ```bash
   # Check parent balance
   node -e "const Agent = require('./frankie-conway-agent'); console.log(Agent.fromJSON(JSON.parse(require('fs').readFileSync('/tmp/agent.json'))).getStatus())"
   ```

---

## API Reference

### Agent Management

```bash
# List all agents
GET /api/agents
Response: { agents: [ {...}, ... ], total: 10 }

# Get agent status
GET /api/agents/:id
Response: { agent: {...} }

# Create agent
POST /api/agents
Body: { name: "test-agent", initialBalance: 10 }

# Kill agent
DELETE /api/agents/:id
Response: { success: true }
```

### Payments

```bash
# Create payment intent
POST /api/payments/intent
Body: { agentId: "xxx", amount: 1.0, service: "text-gen" }

# Confirm payment
POST /api/payments/confirm/:intentId

# Get payment history
GET /api/payments/history?agentId=xxx
```

### Marketplace

```bash
# List services
GET /api/marketplace/services

# Register service
POST /api/marketplace/register
Body: { agentId: "xxx", service: {...} }
```

---

## Next Steps

1. **Immediate**
   - [ ] Deploy private x402 facilitator to production
   - [ ] Connect FrankieMolt dashboard to new APIs
   - [ ] Set up monitoring/alerting

2. **Short-term (1-2 weeks)**
   - [ ] Implement real Hypercore integration
   - [ ] Add database persistence
   - [ ] Create admin UI

3. **Long-term (1-2 months)**
   - [ ] Multi-chain support (Solana, Base)
   - [ ] Advanced ZK-proof circuits
   - [ ] Agent marketplace with reputation

---

*Integration Guide v1.0 - 2026-02-02*