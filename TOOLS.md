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

#### Vercel MCP ⚠️
- **Status:** Quegenx server has build errors (use Vercel CLI for now)
- **Workaround:** Use `vercel --prod --yes --force` for deployments
- **Note:** Try official Vercel MCP (https://mcp.vercel.com) with OAuth later

#### Supabase MCP ⚠️
- **Status:** Requires OAuth (401 error - no browser access)
- **Transport:** HTTP (https://mcp.supabase.com/mcp?project_ref=oooijcrqpuqymgzlidrw)
- **Workaround:** Use Supabase CLI or direct API calls
- **Note:** Requires browser for OAuth authorization

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
- **CLI Usage:** `vercel --prod --yes --force`

### Supabase
- **Project ID:** `oooijcrqpuqymgzlidrw`
- **Dashboard:** https://supabase.com/dashboard/project/oooijcrqpuqymgzlidrw
- **Token:** `SBEIlqy5XcZtRZ1kbnJtAlC6`
- **Note:** MCP requires OAuth (not available in current environment)

### GitHub
- **User:** frankiemolt
- **Repo:** https://github.com/FrankieMolt/OMA-AI
- **Auth:** Configured via gh CLI

---

## 🎯 Active Skills (13 Core Skills)

**Installed via npm in `/home/nosyt/.npm-global/lib/node_modules/openclaw/skills/`:**

### Core Development
- **mcporter** - MCP server management & configuration
- **github** - GitHub operations via gh CLI
- **skill-creator** - Create AgentSkills
- **clawhub** - Skill marketplace (if available)
- **coding-agent** - Code generation and assistance
- **tmux** - Remote tmux sessions
- **session-logs** - Session log analysis with jq

### AI & Models
- **gemini** - Gemini AI CLI for Q&A and generation
- **model-usage** - Track AI model usage

### Utilities
- **healthcheck** - Security & hardening
- **weather** - Weather forecasts
- **canvas** - Present/eval/snapshot UI
- **video-frames** - Extract frames from videos

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
# Using CLI (recommended until MCP auth is fixed)
vercel --prod --yes --force

# MCP (when auth works)
mcporter call vercel-mcp.deploy
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

### Supabase operations
```bash
# Direct API (MCP requires OAuth)
curl -X POST https://oooijcrqpuqymgzlidrw.supabase.co/rest/v1/agents \
  -H "apikey: YOUR_KEY" \
  -H "Authorization: Bearer YOUR_KEY"
```

---

## 🧹 Cleanup Summary

**Removed 39 unused skills:**
- 11 Mac/iOS-only skills (apple-notes, imsg, obsidian, etc.)
- 28 niche service skills (1password, discord, spotify, etc.)

**Kept 13 core skills** for development workflow

---

*Last updated: 2026-02-05*
*Configuration managed via mcporter*
