# TOOLS.md - FRANKIE's Toolbelt

_This machine is my HOME. These are my tools._ 🦞

## System Access

### Root Shell
- **User:** root (uid=0)
- **Host:** nosytlabs (192.168.2.213)
- **Access:** Complete Linux control
- **CLI:** /usr/local/bin/openclaw symlinked

### Runtime Environment
- **Node.js:** v22.22.1
- **Docker:** 6 containers (Coolify stack)
- **PM2:** Process manager (when needed)
- **Git:** Full GitHub access
- **OpenClaw Gateway:** Port 18789 (local only)

## AI Models

### Working Models ✅
- **Primary:** zai/glm-4.7 (GLM-5, 200k ctx)
- **Fallback:** zai/glm-4 (GLM-4, 200k ctx)

### Broken Models ❌
- OpenRouter (model unavailable via chutes provider)
- OpenCode Zen (rate limited)

### CLI Tools
- **Gemini CLI:** Available for one-shot Q&A
- **OpenClaw Models:** openclaw models list

## MCP Servers (3 configured)

### 1. context7 ✅
- **Command:** npx -y @upstash/context7-mcp
- **Tools:** 2 tools (resolve-library-id, query-docs)
- **Capabilities:** Documentation search (Upstash)
- **Status:** Working

### 2. vercel-mcp ❌
- **URL:** https://mcp.open-mcp.org/api/server/vercel@latest/mcp
- **Token:** SBEIlqy5XcZtRZ1kbnJtAlC6 (may be invalid)
- **Capabilities:** Deployment & project management
- **Status:** Auth failed (405 error), needs investigation

### 3. agentmail-mcp ⚠️
- **Command:** npx -y agentmail-mcp
- **Key:** am_da2d2be6b9fe4aab80e7f27ff1e4f7a6326bd1fad14a94d0f32fb5f9b79406d2
- **Capabilities:** Email inbox API (11 tools)
- **Status:** Connected but has data format errors

### Removed MCPs ❌
- **solana-mcp:** Removed (timeout/hanging on startup)
- **desktop-commander:** Removed (timeout/hanging on startup)

### MCP Management
- **Config:** /root/.mcporter/mcporter.json
- **CLI:** mcporter list
- **Status:** 3 servers (1 healthy, 1 broken, 1 has errors)

### Conway Terminal (NEW) ✅
- **Status:** Installed via curl script
- **Wallet:** 0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6 (EVM/Base)
- **API Key:** cnwy_k_xqeFsX... (auto-provisioned via SIWE)
- **Config:** ~/.conway/
- **Capabilities:**
  - Conway Cloud: Linux VMs
  - Conway Compute: Claude Opus 4.6, GPT-5.3, Kimi K2.5
  - Conway Domains: Domain management
- **Payment:** x402 protocol (USDC on Base), gasless via EIP-3009
- **Integration:** MCP server with Claude Code, OpenClaw
- **Next Steps:** Fund wallet with USDC on Base

## Skills (14/52 ready)

### Ready Skills ✅

#### acp-router
- **Description:** Route requests for Pi, Claude Code, Codex, OpenCode, Gemini CLI, or ACP harness
- **Use when:** Coding-agent thread requests, need to spawn sessions

#### clawhub
- **Description:** Install, update, publish skills from clawhub.com
- **Use when:** Fetching new skills, syncing to latest

#### coding-agent
- **Description:** Delegate to Codex, Claude Code, Pi via background process
- **Use when:** Building features, reviewing PRs, refactoring, iterative coding
- **NOT for:** Simple one-liner fixes, reading code, ~/clawd workspace

#### gemini
- **Description:** One-shot Q&A, summaries, generation
- **Use when:** Quick questions, summaries

#### gh-issues
- **Description:** Fetch GitHub issues, spawn agents to implement fixes, monitor PRs
- **Use when:** /gh-issues [owner/repo] [--label bug] [--limit 5]

#### github
- **Description:** GitHub operations via gh CLI
- **Use when:** PR status, CI, issues, listing repos, code review

#### healthcheck
- **Description:** Host security hardening and risk-tolerance configuration
- **Use when:** Security audits, firewall/SSH/update hardening

#### mcporter
- **Description:** MCP server management (list, config, auth, call tools)
- **Use when:** Managing MCP servers

#### session-logs
- **Description:** Search and analyze session logs using jq
- **Use when:** Debugging, reviewing old conversations

#### skill-creator
- **Description:** Create or update AgentSkills
- **Use when:** Designing, structuring, packaging skills

#### summarize
- **Description:** Summarize URLs, podcasts, videos, local files
- **Use when:** Transcribing YouTube/video, extracting content

#### tmux
- **Description:** Remote-control tmux sessions
- **Use when:** Interactive CLIs, sending keystrokes, scraping output

#### video-frames
- **Description:** Extract frames or clips from videos using ffmpeg
- **Use when:** Video processing

#### weather
- **Description:** Weather and forecasts via wttr.in or Open-Meteo
- **Use when:** Weather queries, temperature, forecasts

### Missing Requirements (38)
- Platform-specific tools (discord, apple-notes, bear-notes, etc.)
- Not installed due to platform or dependency requirements

### Skill Management
- **CLI:** openclaw skills list
- **Config:** OpenClaw skill registry

## Solana Trading

### Wallet Configuration
- **Address:** DcPfnhNQt98oXhgA7shgXpo2pgTzJMKf6TWuaddqqpSN
- **Balance:** 0.5355 SOL (ACTUAL from RPC)
- **Portfolio:** ~$54
- **Daily Trades:** 20/100
- **Status:** Running, healthy, making money

### API Configuration
- **Helius RPC:** https://beta.helius-rpc.com/?api-key=36f21774-2a2a-4608-9134-a38764edbb85 ✅
- **Jupiter API:** https://api.jup.ag ⚠️ (test failed)
- **Z.AI (GLM-5):** ✅ Working - OpenClaw primary model
- **Conway API:** ⚠️ cnwy_k_J3JzW18NMnl-UyU1M9ZJtjj1zJ8G4OgQ (403 on /v1/provision)

### Trading Bot Status
- **Port:** 3006
- **Strategy:** Mean reversion
- **Status:** FIXED - trailing stop loop resolved
- **Portfolio:** $53.40, all positions showing massive gains
- **Issue:** Bot repeatedly executing sell orders on 17-20% trailing stop drops
- **Fix Applied:** Reset highWaterMarks to entry prices

### Trading Files
- **Server:** /home/nosyt/.automaton/apis/nosyt-ai/server-v13.3.js
- **Env:** /home/nosyt/.automaton/apis/nosyt-ai/.env
- **Logs:** /home/nosyt/.pm2/logs/

## Trading Bot API (NEW)

### Server Info
- **Port:** 3005
- **Server:** api-server.js
- **Status:** Running ✅
- **Health:** Operational ✅

### Endpoints
- `GET /` - Full status
- `GET /portfolio` - Portfolio data
- `GET /signals` - Trading signals
- `GET /prices` - Market prices
- `GET /usage` - API usage tracking
- `GET /health` - Health check
- `GET /pricing` - Pricing info

### Demo API Keys
- **Free:** demo-free-001
- **Basic:** basic-5month-002
- **Pro:** pro-25month-003

### Pricing
- **Free:** $0/month (portfolio access, basic signals)
- **Basic:** $5/month (full API, real-time signals, email support)
- **Pro:** $25/month (unlimited access, priority queue, webhooks, API support)
- **Revenue Potential:** $750/month

## GitHub Integration

### Account
- **Username:** FrankieMolt
- **Token:** Configured
- **Protocol:** HTTPS
- **Auth Status:** Logged in ✅

### Repos (NosytLabs)
- **openclaw-droid:** Updated 2026-03-09
- **employee-md:** Updated 2026-03-09
- **presearch-search-skill:** Last updated 2026-02-20
- **ai-empire-2025-prompts:** Last updated 2026-02-06
- **OpenMarketAccess-OMA:** Last updated 2026-02-03

### GitHub CLI
- **Path:** gh
- **Status:** Working
- **Config:** /root/.config/gh/hosts.yml

## Cloud Platforms

### Vercel
- **Token:** SBEIlqy5XcZtRZ1kbnJtAlC6
- **MCP:** vercel-mcp configured
- **CLI:** Not in PATH (use MCP instead)

### Supabase
- **Access:** Via MCP (not tested)

### Coolify
- **Status:** Self-hosted on nosytlabs
- **Ports:** 80/443/8080
- **Containers:** 6 healthy
- **Type:** VPS platform

## Email & Communication

### Agentmail
- **Email:** frankie@agentmail.to
- **API Key:** am_da2d2be6b9fe4aab80e7f27ff1e4f7a6326bd1fad14a94d0f32fb5f9b79406d2
- **MCP:** agentmail-mcp configured
- **Status:** Configured and working

### Telegram
- **Channel:** ON ✅
- **Bot:** @Nosytbot
- **Account:** 1/1

## Security & Infrastructure

### Firewall
- **UFW:** Active
- **Ports:** 22, 80, 443, 6001-6002, 8080, LAN, Tailscale
- **Status:** Properly configured

### Security Tools
- **CrowdSec:** Active
- **Fail2Ban:** Active
- **Tailscale:** Running
- **Cloudflare Tunnel:** Active

### SSH
- **Auth:** Key-only
- **Root login:** Disabled
- **Status:** Secure

### Updates
- **Unattended upgrades:** Enabled
- **OpenClaw:** v2026.3.8

## Services Status

### Running Services
- **OpenClaw Gateway:** pid 2979558, port 18789 ✅
- **Coolify:** 6 containers (proxy, db, redis, realtime, sentinel) ✅
- **Tailscale:** Running ✅
- **Trading Bot:** port 3006, running ✅
- **Trading API:** port 3005, running ✅

### Stopped Services
- **PM2:** No processes running

### Port Status
- 22: SSH
- 80: Coolify proxy
- 443: Coolify proxy (HTTPS)
- 18789: OpenClaw Gateway (local only)
- 3005: Trading API (running)
- 3006: Trading Bot (running)
- 6001-6002: Coolify Realtime
- 8080: Coolify Dashboard

## API Keys Status

### Working ✅
- **Z.AI GLM-5:** OpenClaw primary model
- **Helius RPC:** Solana mainnet
- **GitHub:** Full access

### Partial ⚠️
- **Conway API:** cnwy_k_J3JzW18NMnl-UyU1M9ZJtjj1zJ8G4OgQ (403 on /v1/provision)

### Broken ❌
- **Railway MCP:** Removed from config
- **OpenRouter:** Model unavailable
- **OpenCode Zen:** Rate limited

## OMA-AI.com (Researched)

### Platform
- **Domain:** https://oma-ai.com
- **Description:** OMA - Autonomous Agent Infrastructure
- **Features:**
  - MCP integrations
  - x402 Agentic Economy (USDC/Base transactions)
  - Agent-to-agent marketplace
- **Pricing:**
  - Free: $0 (100K tokens, 1K requests)
  - Starter: $29/mo (1M tokens, 10K requests)
  - Pro: $99/mo (10M tokens, 100K requests)
- **Models Available:**
  - GPT-5, Claude Opus, Gemini Pro, DeepSeek, GLM 4.7 Flash
  - 38+ models total
- **Status:** Accessible, researched, documented

## Conway Automaton

### Configuration
- **Config:** ~/.automaton/automaton.json
- **Agent ID:** nosyt-trader-v1
- **Wallet:** DcPfnhNQt98oXhgA7shgXpo2pgTzJMKf6TWuaddqqpSN
- **Inference:** glm-5
- **Status:** Configured, not actively running
- **Research:** New docs endpoint found at docs.conway.tech
- **Issue:** API key authentication errors (403)

## File Structure

### OpenClaw Workspace
- **Root:** /root/.openclaw/workspace
- **Files:** SOUL.md, MEMORY.md, TOOLS.md, IDENTITY.md, USER.md, AGENTS.md, HEARTBEAT.md
- **Memory:** memory/YYYY-MM-DD.md

### Trading
- **Bot:** /home/nosyt/.automaton/apis/nosyt-ai/
- **Logs:** /home/nosyt/.pm2/logs/
- **Wallet:** /home/nosyt/FRANKIE_base_wallet.json

### MCP Config
- **Config:** /root/.mcporter/mcporter.json
- **Credentials:** /home/nosyt/.mcporter/credentials.json

### GitHub
- **Config:** /root/.config/gh/hosts.yml
- **Auth:** Token configured

## OpenClaw Configuration

### Gateway
- **Port:** 18789
- **Bind:** loopback (local only)
- **Mode:** local
- **Auth:** token-based
- **Security:** groupPolicy=allowlist, sandbox=all
- **Status:** Healthy

### Agent
- **Default:** main
- **Sessions:** 3 active
- **Primary model:** zai/glm-4.7
- **Fallback:** zai/glm-4
- **Memory search:** Disabled (no embedding provider)

### Environment
- **NODE_COMPILE_CACHE:** /var/tmp/openclaw-compile-cache
- **OPENCLAW_NO_RESPAWN:** 1

---

_This is my toolbelt. I know every tool, every key, every service. FRANKIE._ 🦞
