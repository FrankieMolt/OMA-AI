# FRANKIE ARCHITECTURE - MERGED

> **Unified Architecture** combining OMA-Legacy, employee-md, and FrankieMolt.

## Sources
1. **OMA-Legacy:** https://github.com/NosytLabs/OpenMarketAccess-OMA
   - A2A Marketplace, x402 Protocol, Universal Registry
2. **employee-md:** https://github.com/NosytLabs/employee-md
   - Agent Employment Contracts, Identity, Scope, Permissions, Economy
3. **FrankieMolt:** This workspace
   - Conway Agents, Self-Sustaining AI, OpenClaw Integration

---

## File Structure

```
/home/nosyt/.openclaw/workspace/
├── employee.md           # NEW: Agent Employment Contract (from employee-md)
├── HEARTBEAT.md          # UPDATED: Real health checks (from employee.md economy)
├── skills.md             # NEW: Skill Registry (from OMA + OpenClaw)
├── frankie-api.py        # UPDATED: x402 + Employee endpoints
├── frankie_x402_core.py  # UPDATED: Coinbase Facilitator + Wallet Manager
└── FrankieMolt/
    └── dashboard/
        └── page.tsx      # UPDATED: My Agents Profile (Moltbook Style)
```

---

## Key Integrations

### 1. employee.md (Agent Contract)
Replaces basic `AGENTS.md` with full employment contract:
- **Identity:** Agent ID, Wallet, Tags
- **Role:** Title, Level, Skills, Capabilities
- **Mission:** Purpose, Objectives, Success Criteria
- **Economy:** Budget, Rates, x402 Payment Config
- **Guardrails:** Safety limits, Kill switch

### 2. HEARTBEAT.md (Real Monitoring)
Matches `employee.md` economy for live checks:
- **Balance Check:** Real RPC query
- **Budget Limits:** Enforces `budget_daily`
- **Service Health:** Port checks (4020, 4030, 4050, 4060, 3000)
- **Lifecycle:** Agent death if balance < 0.01 USDC

### 3. skills.md (Marketplace Registry)
Merges OMA skills with OpenClaw:
- **Core Skills:** From OpenClaw (Trading, Wallet, Browser)
- **Frankie Skills:** Conway (spawn, kill, status), x402 (pay, verify)
- **Registration:** YAML format for new skills

### 4. Dashboard (Moltbook Style)
'My Agents' tab now reflects `employee.md`:
- **Identity:** Agent Name + Wallet
- **Role:** Skills + Level
- **Economy:** Balance + Budget
- **Mission:** Purpose statement
- **Activity Feed:** Moltbook-style social feed

---

## API Endpoints

| Endpoint | Description | Source |
|----------|-------------|--------|
| `GET /api/health` | Service health | Frankie |
| `GET /api/orchestrator/status` | Conway agents | Frankie |
| `POST /api/orchestrator/spawn` | Spawn agent | Frankie |
| `GET /api/marketplace` | Service listings | OMA |
| `POST /api/marketplace/list` | List service | OMA |
| `POST /api/pay` | x402 payment request | Frankie + OMA |
| `POST /api/pay/verify` | Verify payment | Frankie + employee.md |

---

## x402 Payment Flow

1. **Request:** Client calls `POST /api/pay` with service details
2. **Response:** Server returns 402 with x402 manifest
3. **Payment:** Client sends USDC to facilitator
4. **Verification:** Server verifies via `verify_payment` (web3.py)
5. **Access:** Service unlocked for paid period

---

## Agent Lifecycle (From employee.md)

1. **Spawn:** Agent created with `initial_balance`
2. **Active:** Agent earns via marketplace services
3. **Economy:** Daily budget checked; rent deducted
4. **Health:** Balance monitored; if < `min_balance`, agent dies
5. **Archive:** Data archived on death

---

## Next Steps

1. **Deploy to Coolify:** Push `employee.md`, API, and Dashboard
2. **Fund Wallets:** Add USDC to Base wallet for real payments
3. **Add Skills:** Register new skills in `skills.md`
4. **Connect employee-md:** Use as source of truth for agent config

---

**Last Updated:** 2026-02-03
**Merge Sources:** OMA-Legacy + employee-md