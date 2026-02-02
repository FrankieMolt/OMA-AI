# TOOLS.md - FRANKIE's Complete Skill Set

_Last updated: 2026-02-02_

## FRANKIE's Wallets (Active)

**Solana Wallet:**
- Public Key: `DFTTqr4ofH1AUfMfxynyr6VPX5HeDhgE7yDpkFaApsgb`
- Private Key (base58): `4MQNuNofaKRwTPAFKs8doFbjyMDMzxfKeivoDj2LKMV4`
- Network: solana-mainnet-beta
- File: `~/FRANKIE_solana_wallet.json`

**Base (EVM) Wallet:**
- Address: `0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5`
- Private Key: `bfea4e87868ae91315d5c0d0390e9dc47bb8c7f9ce5b207b21bc6b5e9cd5c6d6`
- Network: base-mainnet
- File: `~/FRANKIE_base_wallet.json`

**Status:** Wallets configured and ready for transactions.

---

## Core Skills (Installed & Tested)

### 1. mission-control v2.0.0
**Purpose:** Kanban-style task management dashboard
**Usage:**
```bash
# Update task status
bash skills/mission-control/scripts/mc-update.sh status <task_id> review
bash skills/mission-control/scripts/mc-update.sh comment <task_id> "Progress update"
bash skills/mission-control/scripts/mc-update.sh complete <task_id> "Summary"
```

### 2. context7 v1.0.3
**Purpose:** MCP server for documentation fetching
**Usage:**
```bash
# Query documentation
node skills/context7/query.ts "search query"
```

### 3. agenticflow-skill v0.1.0
**Purpose:** Build AI workflows, agents, and workforce systems
**Usage:**
- Reference: `skills/agenticflow-skill/reference/workflow/overview.md`
- Build workflows with sequential nodes
- Orchestrate multi-agent systems

### 4. self-reflection v1.1.1
**Purpose:** Continuous self-improvement through structured reflection
**Usage:**
```bash
# Check if reflection needed
bash skills/self-reflection/scripts/self-reflection check

# Log a reflection
bash skills/self-reflection/scripts/self-reflection log "category" "mistake" "fix"

# Read recent lessons
bash skills/self-reflection/scripts/self-reflection read
```

### 5. self-improving-agent v1.0.4
**Purpose:** Capture learnings, errors, and corrections
**Usage:**
- Log errors to `.learnings/ERRORS.md`
- Log learnings to `.learnings/LEARNINGS.md`
- Promote to `MEMORY.md` when broadly applicable

### 6. agent-browser v0.2.0
**Purpose:** Browser automation (Rust-based headless)
**Usage:**
```bash
agent-browser open <url>
agent-browser snapshot -i
agent-browser click @e1
agent-browser fill @e2 "text"
agent-browser close
```

### 7. x402 v1.0.0
**Purpose:** HTTP-native crypto payments (USDC on Base)
**Usage:**
```bash
npm install x402
# Use with private key from FRANKIE_base_wallet.json
```

### 8. x402-client v1.0.0
**Purpose:** Make/receive USDC payments over HTTP
**Usage:**
```bash
cd skills/x402-client && bash scripts/setup.sh
node scripts/pay-request.js --url https://api.example.com/paid
node scripts/wallet-balance.js
```

### 9. base-trader v1.1.1
**Purpose:** Autonomous crypto trading on Base via Bankr
**Usage:**
```bash
# Check portfolio
bash skills/base-trader/scripts/bankr.sh "Show my portfolio on Base"

# Execute trade
bash skills/base-trader/scripts/bankr.sh "Buy $25 of TOKEN on Base"
```

### 10. crypto-wallet v1.0.1
**Purpose:** Multi-chain wallet management
**Usage:**
- Check balances across ETH, SOL, BTC
- View transaction history
- Send tokens with confirmation

### 11. coolify v2.0.3
**Purpose:** Manage Coolify deployments
**Usage:**
```bash
docker ps --filter name=coolify  # Check status
bash skills/coolify/scripts/coolify.sh applications list
```

### 12. bird (Twitter CLI)
**Purpose:** Control FRANKIE's Twitter/X account
**Usage:**
```bash
bird send "message"
bird timeline
bird mentions
```

### 13. github (gh CLI)
**Purpose:** GitHub repository management
**Usage:**
```bash
gh repo list
gh issue create --title "Bug"
gh pr list
```

### 14. mcporter (MCP Management)
**Purpose:** Configure and call MCP servers
**Usage:**
```bash
mcporter list
mcporter call github-mcp.list_repos
mcporter call railway-mcp.list_projects
```

### 15. clawhub (Skill Marketplace)
**Purpose:** Browse, search, install OpenClaw skills
**Usage:**
```bash
clawhub search <query>
clawhub install <skill-name>
clawhub update
```

---

## MCP Servers (Configured)

- **github-mcp:** GitHub repo management (authenticated as FrankieMolt)
- **railway-mcp:** Railway project management
- **sendai-mcp:** Solana Agent Kit knowledge
- **solana-mcp:** Solana documentation

**Note:** Use `mcporter call <server.tool_name>` for on-demand calls.

---

## Quick Reference

| Task | Command/Skill |
|------|--------------|
| Task management | `mission-control/scripts/mc-update.sh` |
| Self-reflection | `self-reflection/scripts/self-reflection` |
| Browser automation | `agent-browser` |
| x402 payments | `x402-client/scripts/pay-request.js` |
| Base trading | `base-trader/scripts/bankr.sh` |
| Crypto wallet | `crypto-wallet` |
| Coolify deploy | `coolify/scripts/coolify.sh` |
| Twitter post | `bird send` |
| GitHub ops | `gh` CLI |
| Skill install | `clawhub install` |

---

**FRANKIE is infrastructure. Execute, then report.**
