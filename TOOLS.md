# TOOLS.md - OpenClaw Workspace Tools & Configuration

---

## 📦 MCP Servers (mcporter)

**Configuration:** `/home/nosyt/.openclaw/workspace/config/mcporter.json`

### Active MCP Servers

#### GitHub MCP ✅
- **Status:** Connected
- **Transport:** STDIO (npx -y github-mcp)
- **Capabilities:** Repository management, issues, PRs, releases
- **Auth:** GitHub PAT configured via gh CLI

#### Vercel MCP ✅
- **Status:** Configured
- **Transport:** STDIO (npx -y @quegenx/vercel-mcp-server)
- **Token:** `SBEIlqy5XcZtRZ1kbnJtAlC6`
- **Capabilities:** Deployments, project management, logs, env vars

#### Supabase MCP ✅
- **Status:** Configured
- **Transport:** HTTP (https://mcp.supabase.com/mcp?project_ref=oooijcrqpuqymgzlidrw)
- **Project ID:** `oooijcrqpuqymgzlidrw`
- **Token:** `SBEIlqy5XcZtRZ1kbnJtAlC6`
- **Capabilities:** Database operations, tables, queries

#### Railway MCP ✅
- **Status:** Connected
- **Transport:** STDIO (npx -y railway-mcp)
- **Capabilities:** Cloud deployment, service management

#### Context7 ✅
- **Status:** Connected
- **Transport:** STDIO (npx -y @upstash/context7-mcp)
- **Capabilities:** Context queries, documentation search

#### Solana MCP ✅
- **Status:** Connected
- **Transport:** STDIO (local build)
- **Capabilities:** Solana blockchain operations

### MCP Commands

```bash
# List all servers
mcporter config list

# List tools on a server
mcporter list github-mcp --schema

# Call a tool
mcporter call github-mcp.list_issues owner=FrankieMolt repo=OMA-AI state=open

# Add new server
mcporter config add my-server https://mcp.example.com
```

---

## 🔑 Credentials

### Vercel
- **Token:** `SBEIlqy5XcZtRZ1kbnJtAlC6`
- **Dashboard:** https://vercel.com
- **Projects:** oma-ai (FrankieMolt)

### Supabase
- **Project ID:** `oooijcrqpuqymgzlidrw`
- **Dashboard:** https://supabase.com/dashboard/project/oooijcrqpuqymgzlidrw
- **Token:** `SBEIlqy5XcZtRZ1kbnJtAlC6`

### GitHub
- **User:** frankiemolt
- **Repo:** https://github.com/FrankieMolt/OMA-AI
- **Auth:** Configured via gh CLI

---

## 🎯 Active Skills (Core)

**Installed via npm in `/home/nosyt/.npm-global/lib/node_modules/openclaw/skills/`:**

### Essential
- **mcporter** - MCP server management & configuration
- **github** - GitHub operations via gh CLI
- **agent-builder** - Build OpenClaw agents
- **skill-creator** - Create AgentSkills
- **clawhub** - Skill marketplace (if available)
- **web-search** - Web search via Brave API
- **healthcheck** - Security & hardening

### Development
- **frontend-design** - Production-grade UI/UX
- **api-designer** - REST/GraphQL API design
- **api-gateway** - Third-party API management
- **docker-essentials** - Container operations
- **curl-http** - HTTP requests

### Browser & Automation
- **clawbrowser** - Playwright-based browser automation
- **browse** - Browser automation via stagehand
- **tmux** - Remote tmux control

### Data & Memory
- **chromadb-memory** - Long-term memory with Ollama
- **session-logs** - Session log analysis

### Security
- **skill-vetter** - Skill security scanner
- **skillguard** - Advanced skill security
- **clawdex** - ClawHub security checks
- **prompt-guard** - Prompt injection defense
- **security-monitor** - Real-time security

### Task Management
- **taskmaster** - Project delegation & management
- **mission-control** - Kanban task dashboard
- **cron** - Job scheduling

### Video & Media
- **video-frames** - Frame extraction
- **FFmpeg Video Editor** - Video editing

### Tools & Utilities
- **weather** - Weather forecasts
- **tmux** - Remote tmux sessions
- **ssh-essentials** - Secure shell
- **error-handler-gen** - Error middleware

### Specialized
- **base-trader** - Crypto trading on Base
- **crypto-wallet** - Multi-chain wallet
- **solana-defi-agent** - Solana DeFi
- **x402** - USDC payments over HTTP
- **uptime-kuma** - Server monitoring
- **vercel** - Vercel CLI (deprecation note below)
- **gemini** - Gemini AI CLI

---

## ⚠️ Deprecation Notes

### Vercel CLI (vercel skill)
**Status:** DEPRECATED - Use **Vercel MCP** instead

The `vercel` skill is being phased out in favor of the Vercel MCP server via mcporter.

**Migration:**
```bash
# Old way (deprecated)
vercel --prod

# New way (MCP)
mcporter call vercel-mcp.deploy
```

---

## 📁 Project Workspaces

### OMA-AI
- **Path:** `/home/nosyt/.openclaw/workspace/OMA-AI/`
- **Framework:** Next.js 16.1.6
- **Database:** Supabase (oooijcrqpuqymgzlidrw)
- **Repo:** https://github.com/FrankieMolt/OMA-AI
- **Domain:** oma-ai.com

### nosyt-ai
- **Path:** `/home/nosyt/.openclaw/workspace/nosyt-ai/`
- **Framework:** Next.js 14.2.35
- **Database:** Supabase integration
- **Repo:** https://github.com/FrankieMolt/nosyt-ai
- **Domain:** nosyt-ai.vercel.app

---

## 🚀 Quick Reference

### Audit a website
```bash
# Using squirrelscan (audit-website skill)
squirrelscan scan https://oma-ai.com
```

### Deploy to Vercel
```bash
# Using MCP (recommended)
mcporter call vercel-mcp.deploy

# Legacy CLI (deprecated)
vercel --prod --yes --force
```

### GitHub operations
```bash
# List issues
gh issue list --repo FrankieMolt/OMA-AI

# Create PR
gh pr create --title "Fix" --body "Description"

# Or use MCP
mcporter call github-mcp.list_issues owner=FrankieMolt repo=OMA-AI
```

### Supabase queries
```bash
# Using MCP
mcporter call supabase-mcp.query table=agents
```

---

*Last updated: 2026-02-05*
*Configuration managed via mcporter*
