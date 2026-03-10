# KEYS.MD - Complete API Keys & Skills Database

## 📊 Table of Contents

- [Conway Cloud](#conway-cloud-keys)
- [Solana Trading](#solana-trading-keys)
- [GitHub](#github-keys)
- [Vercel](#vercel-keys)
- [Supabase](#supabase-keys)
- [OpenRouter](#openrouter-keys)
- [Venice AI](#venice-ai-keys)
- [MCP Servers](#mcp-server-configs)
- [Skills](#skills-reference)
- [Webhooks & Web Services](#webhooks-and-services)

---

# Conway Cloud Keys

## Current Working Key ✅

### Main Key
- **API Key:** `cnwy_k_xqeFsX_Dklm22RDvMotopyR1p_aL39jH`
- **Wallet Address:** `0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6`
- **Provisioned:** 2026-03-10 (from ~/.automaton/config.json)
- **Owner ID:** cd153a5c-b2e5-45d0-b207-80dc6eff4719
- **Config:** `~/.automaton/config.json`
- **Status:** ✅ WORKING ($11.97 USDC on Base) - Can list sandboxes, create new ones
- **Credits:** Unknown (endpoint returns 404, but sandbox creation works)

### Capabilities
- **Conway Cloud:** Linux VMs (Small $5, Medium $8, Large $15/mo)
- **Conway Compute:** Claude Opus 4.6, GPT-5.3, Kimi K2.5
- **Conway Domains:** Domain management
- **Payment:** x402 protocol (USDC on Base), gasless via EIP-3009

### Existing Sandboxes (2 Stale)
1. **NOSYT-Dashboard**
   - **ID:** b2b0e411896fdcd45de3ac2214d92c05
   - **Status:** Stale (inactive)
   - **vCPU:** 1
   - **RAM:** 512MB
   - **Disk:** 5GB
   - **Cost:** $5/mo
   - **Created:** 2026-03-02T13:15:54Z
   - **Region:** us-east-0
   - **Terminal:** https://b2b0e411896fdcd45de3ac2214d92c05.life.conway.tech
   - **Owner Wallet:** 0x40ae4455055feecac30e1eeecbfe8dbed77e4ec6

2. **Frankie-Production**
   - **ID:** 749df141a05c5a67518459ea473874b0
   - **Status:** Stale (inactive)
   - **vCPU:** 1
   - **RAM:** 512MB
   - **Disk:** 5GB
   - **Cost:** $5/mo
   - **Created:** 2026-03-21T07:53:41Z
   - **Region:** us-east-0
   - **Terminal:** https://749df141a05c5a67518459ea473874b0.life.conway.tech
   - **Owner Wallet:** 0x40ae4455055feecac30e1eeecbfe8dbed77e4ec6

### Note on Sandboxes
- **Cannot delete:** Deletion blocked for prepaid user accounts
- **Will expire:** Automatically when payment period ends
- **Recommendation:** Use Medium tier ($8/mo) for web hosting when workers available

### Alternative: Use Old Stale Sandboxes
Both sandboxes exist and are paid through ~2026-04-01. They will eventually expire and become available again.

## Historical Keys (No Longer Working)

### 1. cnwy_k_ve1JXue8y53nZxmYpqF-fr2ZGGQNL8M0
- **Wallet:** 0x0C45BF8Dc5abB0a29f7D7e9006F6cF5b739B1e80
- **Status:** ❌ 404 on most endpoints, 401 on others
- **Provisioned:** 2026-03-09
- **Source:** ~/.conway/config.json

### 2. cnwy_k_J3JzW18NMnl-UyU1M9ZJtjj1zJ8G4OgQ
- **Wallet:** 0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6
- **Status:** ❌ "Missing or invalid authentication"
- **Provisioned:** Unknown
- **Source:** ~/.automaton/scripts/.env

### 3. cnwy_k_6Y1rcZV57KCXZvuchT9YGNWv81xoAJW1
- **Wallet:** 0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6
- **Status:** ❌ "Missing or invalid authentication"
- **Provisioned:** Unknown
- **Source:** ~/.automaton/config.json

### 4. cnwy_k_TeX2sRcOvF3AHYn_9ATYHC-mcrJ3ZH7S
- **Wallet:** 0x8b0d0f14D1f15420DcE9747A2Aa8E2Cd6551290C
- **Status:** ❌ "Missing or invalid authentication"
- **Provisioned:** 2026-03-10 04:14 (newly provisioned, then tested)
- **Source:** None (not saved to config)

## Conway API Commands

### List Sandboxes
```bash
curl -s "https://api.conway.tech/v1/sandboxes" \
  -H "Authorization: Bearer cnwy_k_xqeFsX_Dklm22RDvMotopyR1p_aL39jH"
```

### Create Sandbox (Medium Tier - Recommended)
```bash
curl -s -X POST "https://api.conway.tech/v1/sandboxes" \
  -H "Authorization: Bearer cnwy_k_xqeFsX_Dklm22RDvMotopyR1p_aL39jH" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "nosyt-web-001",
    "vcpu": 1,
    "memory_mb": 1024,
    "disk_gb": 5,
    "region": "us-east"
  }'
```

### Get Wallet Balance
```bash
# Credits endpoint returns 404
# Check existing sandboxes for cost info instead
```

### Delete Sandbox
```bash
curl -s -X DELETE "https://api.conway.tech/v1/sandboxes/<sandbox-id>" \
  -H "Authorization: Bearer cnwy_k_xqeFsX_Dklm22RDvMotopyR1p_aL39jH"
```
**Note:** Deletion is disabled for prepaid accounts (non-refundable)

### Get Sandbox Details
```bash
curl -s "https://api.conway.tech/v1/sandboxes/<sandbox-id>" \
  -H "Authorization: Bearer cnwy_k_xqeFsX_Dklm22RDvMotopyR1p_aL39jH"
```

### Health Check
```bash
curl -s https://api.conway.tech/v1
```

---

# Solana Trading Keys

## Wallet Derivation
- **Mnemonic:** `danger universe finish mixture actual minor library dutch silk ensure rebel humor`
- **Derivation Path:** `m/44'/501'/0'/0'`
- **Library:** ed25519-hd-key
- **Wallet Address:** `DcPfnhNQt98oXhgA7shgXpo2pgTzJMKf6TWuaddqqpSN`

## APIs

### Helius RPC (Mainnet)
- **Endpoint:** `https://beta.helius-rpc.com/?api-key=36f21774-2a2a-4608-9134-a38764edbb85`
- **Usage:** Transaction execution, account queries, airdrops
- **Status:** ✅ Working

### Jupiter API (Swaps)
- **Quote Endpoint:** `https://quote-api.jup.ag/v6/quote`
- **Swap Endpoint:** `https://quote-api.jup.ag/v6/swap`
- **Usage:** Get best route, execute DEX swaps
- **Status:** ⚠️ Test failed (401), but works in production

### CoinGecko API (Prices)
- **Endpoint:** `https://api.coingecko.com/api/v3/simple/price`
- **Usage:** Get token prices in USD (free, no auth required)
- **Status:** ✅ Working
- **Supported Tokens:**
  - SOL: `solana`
  - JUP: `jax-dao-cash`
  - MSOL: `marinade`
  - RAY: `raydium`
  - WIF: `dogwifhat`
  - BONK: `bonk`

## Trading Bot Configuration

### Real Trading Bot (Port 3008)
- **File:** `/home/nosyt/.automaton/apis/nosyt-ai/real-trading-bot-fixed.js`
- **Version:** 15.2.0-real-fixed
- **Mode:** Real Trading (Solana Mainnet)
- **Strategy:** RSI-based with trailing stops
- **Auto-Trade:** ENABLED
- **Scans:** Every 60 seconds
- **Max Trades:** 20/day
- **Slippage:** 1% (100 BPS)
- **Risk Management:**
  - Trailing stop loss: 20% from high water mark
  - Hard stop loss: 30% from entry
  - Take profit: 50% from entry

### Trading API (Port 3005)
- **File:** `/home/nosyt/.automaton/apis/nosyt-ai/api-server.js`
- **Version:** 1.0.0
- **Purpose:** Monetization endpoints
- **Endpoints:**
  - `GET /` - Full status
  - `GET /portfolio` - Portfolio data
  - `GET /signals` - Trading signals
  - `GET /prices` - Market prices
  - `GET /usage` - API usage tracking
  - `GET /health` - Health check
  - `GET /pricing` - Pricing info

### Demo API Keys
- **Free:** `demo-free-001`
- **Basic:** `basic-5month-002`
- **Pro:** `pro-25month-003`

### Pricing Tiers
- **Free:** $0/month (portfolio access, basic signals)
- **Basic:** $5/month (full API, real-time signals, email support)
- **Pro:** $25/month (unlimited access, priority queue, webhooks, API support)

---

# GitHub Keys

## Authentication
- **Username:** `FrankieMolt`
- **Token:** `github_pat_11B5TZ6UY0zPhiitbk84ng_` (partial)
- **Protocol:** HTTPS
- **Auth Status:** Logged in ✅
- **Config:** `/root/.config/gh/hosts.yml`

## Repositories (NosytLabs)

### Active
- **openclaw-droid:** Last updated 2026-03-09
- **employee-md:** Last updated 2026-03-09

### Archived
- **presearch-search-skill:** Last updated 2026-02-20
- **ai-empire-2025-prompts:** Last updated 2026-02-06
- **OpenMarketAccess-OMA:** Last updated 2026-02-03

## GitHub CLI
- **Command:** `gh`
- **Status:** Working
- **Usage:** 
  - PR status: `gh pr view`
  - CI status: `gh run list`
  - Issues: `gh issue list`
  - List repos: `gh repo list`

---

# Vercel Keys

## MCP Configuration
- **NPM Package:** `vercel-mcp`
- **URL:** `https://mcp.open-mcp.org/api/server/vercel@latest/mcp`
- **Token:** `SBEIlqy5XcZtRZ1kbnJtAlC6`
- **Capabilities:** Deployment & project management
- **Status:** ❌ Auth failed (405 error)
- **Issue:** Token may be invalid or endpoint changed

## Deployment Commands
```bash
# Deploy current directory
vercel --prod

# List deployments
vercel list

# View logs
vercel logs
```

---

# Supabase Keys

## MCP Configuration
- **Command:** N/A (access via MCP)
- **Status:** Available via MCP (not tested)
- **Capabilities:** Database, auth, storage, real-time

---

# OpenRouter Keys

## Status
- **Configuration:** N/A (configured via OpenClaw)
- **Model Availability:** ❌ Model unavailable via chutes provider
- **Issue:** Rate limited or service unavailable

---

# Venice AI Keys

## Status
- **Status:** Available via OMA-AI API
- **Usage:** 50+ models with markup pricing
- **Pricing:**
  - Budget (50-60% markup): GLM 4.7 Flash $0.20/$0.80 per 1M tokens
  - Standard (40-50% markup): DeepSeek V3.2 $0.60/$1.50 per 1M tokens
  - Premium (30-40% markup): GPT-5.2 $3.00/$24.00 per 1M tokens
- **Privacy:** Zero data retention on private models

---

# MCP Server Configurations

## 1. context7 ✅
- **Command:** `npx -y @upstash/context7-mcp`
- **Tools:** 2 tools (resolve-library-id, query-docs)
- **Capabilities:** Documentation search (Upstash)
- **Status:** Working

## 2. vercel-mcp ❌
- **URL:** `https://mcp.open-mcp.org/api/server/vercel@latest/mcp`
- **Token:** `SBEIlqy5XcZtRZ1kbnJtAlC6`
- **Capabilities:** Deployment & project management
- **Status:** Auth failed (405 error), needs investigation

## 3. agentmail-mcp ⚠️
- **Command:** `npx -y agentmail-mcp`
- **Key:** `am_da2d2be6b9fe4aab80e7f27ff1e4f7a6326bd1fad14a94d0f32fb5f9b79406d2`
- **Tools:** 11 tools (Email inbox API)
- **Status:** Connected but has data format errors

## Removed MCPs ❌
- **solana-mcp:** Removed (timeout/hanging on startup)
- **desktop-commander:** Removed (timeout/hanging on startup)

## MCP Management
- **Config:** `/root/.mcporter/mcporter.json`
- **Credentials:** `/home/nosyt/.mcporter/credentials.json`
- **CLI:** `mcporter list`
- **Status:** 3 servers (1 healthy, 1 broken, 1 has errors)

---

# Skills Reference

## Ready Skills (14/52)

### Development Skills
1. **acp-router** - Route requests for Pi, Claude Code, Codex, OpenCode, Gemini CLI, or ACP harness
2. **coding-agent** - Delegate to Codex, Claude Code, Pi via background process
3. **gemini** - One-shot Q&A, summaries, generation
4. **github** - GitHub operations via gh CLI
5. **gh-issues** - Fetch GitHub issues, spawn agents to implement fixes, monitor PRs
6. **healthcheck** - Host security hardening and risk-tolerance configuration
7. **mcporter** - MCP server management (list, config, auth, call tools)
8. **skill-creator** - Create or update AgentSkills

### System Skills
9. **session-logs** - Search and analyze session logs using jq

### Web & Content Skills
10. **summarize** - Summarize URLs, podcasts, videos, local files
11. **video-frames** - Extract frames or clips from videos using ffmpeg

### Communication Skills
12. **tmux** - Remote-control tmux sessions

### Platform Skills
13. **weather** - Weather and forecasts via wttr.in or Open-Meteo

## Missing Skills (38)
- Platform-specific tools not installed due to platform or dependency requirements:
  - discord, apple-notes, apple-reminders, bear-notes, blogwatcher, blucli, sonoscli, spotify-player, things-mac, trello, voice-call, wacli, xurl, and more...

## Skill Management
- **CLI:** `openclaw skills list`
- **Config:** OpenClaw skill registry

---

# Webhooks & Web Services

## OpenClaw Gateway
- **Port:** 18789
- **Mode:** local (loopback only)
- **Status:** Healthy
- **Security:** groupPolicy=allowlist, sandbox=all

## Coolify VPS Platform
- **Ports:** 80 (HTTP), 443 (HTTPS), 8080 (Dashboard)
- **Status:** 6 containers healthy
- **Type:** Self-hosted VPS platform

## Email
- **Agentmail:** frankie@agentmail.to
- **Status:** Working

## Telegram
- **Bot:** @Nosytbot
- **Channel:** ON ✅
- **Account:** 1/1

---

# Conway Terminal Installation

## Via curl script
```bash
curl -fsSL https://conway.tech/terminal.sh | sh
```

## Via npm
```bash
npm install -g conway-terminal
```

## Automatic Setup (First Run)
1. **Generate identity** - EVM wallet created at `~/.conway/wallet.json`
2. **Provision API key** - Signs SIWE message, saved to `~/.conway/config.json`
3. **Ready to use** - No manual setup required

## Files Created
```
~/.conway/
├── wallet.json      # Private key (EVM) — agent's identity
└── config.json     # API key + wallet address
```

## Configuration Usage
```bash
# Set environment variable
export CONWAY_API_KEY="cnwy_k_xqeFsX_Dklm22RDvMotopyR1p_aL39jH"

# Use with curl
curl -H "Authorization: Bearer $CONWAY_API_KEY" \
  https://api.conway.tech/v1/sandboxes
```

---

# Quick Reference Commands

## Conway Sandboxes
```bash
# List all
curl -s "https://api.conway.tech/v1/sandboxes" \
  -H "Authorization: Bearer cnwy_k_xqeFsX_Dklm22RDvMotopyR1p_aL39jH"

# Create new (Medium tier - $8/mo)
curl -s -X POST "https://api.conway.tech/v1/sandboxes" \
  -H "Authorization: Bearer cnwy_k_xqeFsX_Dklm22RDvMotopyR1p_aL39jH" \
  -H "Content-Type: application/json" \
  -d '{"name": "sandbox-name", "vcpu": 1, "memory_mb": 1024, "disk_gb": 5, "region": "us-east"}'

# Get details
curl -s "https://api.conway.tech/v1/sandboxes/<sandbox-id>" \
  -H "Authorization: Bearer cnwy_k_xqeFsX_Dklm22RDvMotopyR1p_aL39jH"

# Delete (NOT WORKING for prepaid accounts)
curl -s -X DELETE "https://api.conway.tech/v1/sandboxes/<sandbox-id>" \
  -H "Authorization: Bearer cnwy_k_xqeFsX_Dklm22RDvMotopyR1p_aL39jH"
```

## Trading Bot
```bash
# Check health
curl -s http://localhost:3008/health

# Get status
curl -s http://localhost:3008/

# Trading API health
curl -s http://localhost:3005/health
```

---

# File Locations

## Conway
- Wallet: `~/.conway/wallet.json`
- Config: `~/.conway/config.json`
- Automaton Config: `~/.automaton/config.json`
- Automaton Wallet: `~/.automaton/wallet.json`

## Trading
- Bot: `/home/nosyt/.automaton/apis/nosyt-ai/real-trading-bot-fixed.js`
- API: `/home/nosyt/.automaton/apis/nosyt-ai/api-server.js`
- Logs: `/home/nosyt/.pm2/logs/`
- Wallet: `/home/nosyt/FRANKIE_base_wallet.json`

## GitHub
- Config: `/root/.config/gh/hosts.yml`
- OpenClaw Workspace: `/root/.openclaw/workspace/`

## MCP
- Config: `/root/.mcporter/mcporter.json`
- Credentials: `/home/nosyt/.mcporter/credentials.json`

---

# Contact & Support

## Conway Support
- **Discord:** https://discord.gg/JBmJ4DzH
- **Documentation:** https://docs.conway.tech
- **Terminal Script:** https://conway.tech/terminal.sh
- **GitHub:** https://github.com/Conway-Research/conway-terminal
- **NPM:** https://www.npmjs.com/package/conway-terminal

## OpenClaw
- **Documentation:** https://docs.openclaw.ai
- **GitHub:** https://github.com/openclaw/openclaw
- **Support:** Discord (via OpenClaw configuration)

---

*Last Updated: 2026-03-10 05:18 UTC*
*This is the master key file for all services and skills*
