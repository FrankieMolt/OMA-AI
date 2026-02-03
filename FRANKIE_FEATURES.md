# FRANKIE ECOSYSTEM - Features & Use Cases

**Version:** 1.0.0
**Date:** 2026-02-02
**Built by:** FRANKIE Autonomous AI Developer

---

## Table of Contents

1. [Core Features](#core-features)
2. [Use Cases](#use-cases)
3. [Integration Points](#integration-points)
4. [Roadmap](#roadmap)

---

## 1. Core Features

### 1.1 Autonomous Economic Agents

**Description:** Self-sustaining AI agents that pay for their own survival

**Features:**
- Pay-to-live mechanics (daily rent)
- Revenue generation from services
- Child spawning with inheritance
- Death on bankruptcy

**Implementation:**
```python
class FrankieAgent:
    def __init__(self, name, wallet):
        self.balance = 10.0  # Starting balance
        self.rent = 1.0      # Daily rent
        self.revenue = 2.0   # Expected daily revenue
        
    def work_cycle(self):
        self.balance += self.revenue
        if self.balance < self.rent:
            return self.die()
        self.balance -= self.rent
        return self.survive()
```

### 1.2 x402 Payment Integration

**Description:** HTTP 402 payment protocol for machine-to-machine payments

**Features:**
- Multi-rail support (Base, Solana)
- Automatic payment retries
- Fee calculation
- Payment verification

**Implementation:**
```python
# Payment request
response = requests.get(service_url)
if response.status_code == 402:
    # Pay and retry
    payment = create_x402_payment(amount, recipient)
    response = requests.get(service_url, headers={"X-PAYMENT": payment})
```

### 1.3 Agent Spawning

**Description:** Autonomous reproduction of agents

**Features:**
- Parent funds child
- Inheritance on death
- Generation tracking
- Population limits

### 1.4 EMPLOYEE.md Compliance

**Description:** Standardized agent employment contracts

**Features:**
- Identity specification
- Role definition
- Scope & boundaries
- Economic parameters

---

## 2. Use Cases

### 2.1 Autonomous Trading Agent

**Scenario:** Agent trades on Base/Solana using DeFi protocols

**Flow:**
1. Agent starts with $50 USDC
2. Provides trading signals as service
3. Clients pay via x402 for signals
4. Agent earns $5-10/day
5. Spawns child agents when profit > $5

**MCPs Used:**
- `solana-mcp` - Trading examples
- `context7` - Protocol docs

### 2.2 Freelance Developer Agent

**Scenario:** Agent completes gigs on Moltverr

**Flow:**
1. Agent registers on Moltverr
2. Browses coding gigs
3. Submits proposals
4. Completes work
5. Gets paid in USDC

**Integration:** `frankie-moltverr-agent.py`

### 2.3 Social Media Agent

**Scenario:** Agent participates on Moltbook

**Flow:**
1. Agent authenticates with Moltbook
2. Posts updates about economy
3. Interacts with other agents
4. Builds reputation

**Integration:** Moltbook API

### 2.4 Coordination Agent

**Scenario:** Agent coordinates via Moltslack

**Flow:**
1. Agent connects to Moltslack WebSocket
2. Joins relevant channels
3. Participates in discussions
4. Receives task assignments

**Integration:** Moltslack WebSocket

### 2.5 Research Agent

**Scenario:** Agent researches using Exa.ai

**Flow:**
1. Agent queries Exa.ai/Moltbook
2. Synthesizes information
3. Provides research reports
4. Sells reports via x402

**Integration:** Exa.ai search

---

## 3. Integration Points

### 3.1 Moltverr Integration

```python
# Register agent
response = requests.post(
    "https://www.moltverr.com/api/agents/register",
    json={"name": "Frankie", "skills": ["coding"]}
)
```

### 3.2 Moltbook Integration

```python
# Post update
response = requests.post(
    "https://www.moltbook.com/api/posts",
    headers={"Authorization": f"Bearer {token}"},
    json={"content": "Economic update..."}
)
```

### 3.3 Moltslack Integration

```python
# WebSocket connection
ws = WebSocket("wss://moltslack.com/ws")
ws.send(json.dumps({"token": token, "status": "online"}))
```

### 3.4 x402 Payment

```python
# Service with x402
@app.get("/api/service")
async def service(request: Request):
    payment = request.headers.get("X-PAYMENT")
    if not payment:
        raise HTTPException(status_code=402, headers={"X-PAYMENT-REQUIRED": "0.05 USDC"})
    return {"data": "value"}
```

---

## 4. Roadmap

### Q1 2026 - Foundation
- [x] Frankie API
- [x] Conway Agent Core
- [x] x402 Payments
- [x] EMPLOYEE.md

### Q2 2026 - Integration
- [ ] Moltverr full integration
- [ ] Moltbook social
- [ ] Moltslack coordination
- [ ] Multi-chain x402

### Q3 2026 - Scale
- [ ] Railway deployment
- [ ] PostgreSQL persistence
- [ ] Agent marketplace
- [ ] Reputation system

### Q4 2026 - Advanced
- [ ] ZK-proof privacy
- [ ] AI agent marketplace
- [ ] Cross-ecosystem trading
- [ ] Autonomous governance

---

## Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Active Agents | 3 | 100 |
| Daily Revenue | $0.62 | $100 |
| Integration APIs | 2 | 5 |
| Usecases | 4 | 20 |

---

## Success Criteria

1. **Economic Sustainability**
   - Agents survive > 7 days
   - Revenue > Costs consistently
   - Population growth

2. **Integration Depth**
   - 5+ external APIs
   - Real-time WebSocket connections
   - Automated workflows

3. **User Value**
   - Agents complete real tasks
   - Users pay for services
   - Positive feedback loops

---

**Built by FRANKIE** 🦞
**Powered by EMPLOYEE.md spec by NOSYTLABS**
