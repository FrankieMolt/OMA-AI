# TOOLS.md - Frankie's Tools & Configuration

_Frankie's toolkit for serving Nosyt and building OMA-AI_

---

## 📦 MCP Servers (mcporter)

**Configuration:** `/home/nosyt/.openclaw/workspace/config/mcporter.json`

### Active MCP Servers (2 Connected)

#### GitHub MCP ✅
- **Status:** Connected
- **Transport:** STDIO (npx -y github-mcp)
- **Capabilities:** Repository management, issues, PRs, releases
- **Auth:** GitHub PAT configured via gh CLI

#### Context7 ✅
- **Status:** Connected
- **Transport:** STDIO (npx -y @upstash/context7-mcp)
- **Capabilities:** Context queries, documentation search

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

### Removed MCPs
- ❌ Vercel MCP - Build errors, use Vercel CLI instead
- ❌ Supabase MCP - Requires OAuth (no browser access)
- ❌ Solana MCP - Removed (not needed for current projects)
- ❌ Railway MCP - Removed per MASTA request (2026-02-07)

---

## 🔑 Credentials

### Vercel
- **Token:** `QyhX0ndRnOOmiv4uyc3JfCrr` ✅ VALID
- **Status:** Full account access, permanent
- **Dashboard:** https://vercel.com
- **Projects:** oma-ai, nosyt-ai
- **User:** frankiemolt
- **CLI Usage:** `vercel --token=QyhX0ndRnOOmiv4uyc3JfCrr --prod --yes --force`
- **Limit:** 100 deployments/day free tier

### Supabase
- **Project ID:** `oooijcrqpuqymgzlidrw`
- **Dashboard:** https://supabase.com/dashboard/project/oooijcrqpuqymgzlidrw
- **Status:** Connected, database tables created

### GitHub
- **Username:** frankiemolt
- **Main Repo:** https://github.com/FrankieMolt/OMA-AI
- **Auth:** Configured via gh CLI

---

## 🎯 Active Skills (Core + Workspace)

### Core Skills (7 installed via npm)

**Location:** `/home/nosyt/.npm-global/lib/node_modules/openclaw/skills/`

#### Core Development
- **mcporter** - MCP server management & configuration
- **github** - GitHub operations via gh CLI
- **skill-creator** - Create AgentSkills
- **clawhub** - Skill marketplace
- **coding-agent** - Code generation and assistance

#### AI & Models
- **gemini** - Gemini AI CLI for Q&A and generation (available at /usr/bin/gemini)

#### Utilities
- **healthcheck** - Security & hardening
- **audit-website** - Website SEO/performance/security audits

---

### Workspace Skills (9 installed in `/home/nosyt/.openclaw/workspace/skills/`)

#### 1. **computer-use-1-0-1** - Headless Linux GUI control ✅
- **Purpose:** Virtual display for GUI apps on headless servers (Xvfb + XFCE)
- **Environment:** Display :99, 1024x768 resolution
- **Actions:** 17 standard operations (screenshot, click, type, scroll, drag, etc.)
- **How to use:**
  ```bash
  export DISPLAY=:99
  cd skills/computer-use-1-0-1
  ./scripts/screenshot.sh    # Take screenshot
  ./scripts/click.sh 512 384 left  # Click at coordinates
  ./scripts/type_text.sh "Hello"   # Type text
  ```
- **Status:** Installed, ready for VPS/cloud use

#### 2. **database-operations** - Database design & optimization
- **Purpose:** Schema design, migrations, SQL optimization, PostgreSQL, caching
- **How to use:**
  - Design schemas with proper indexes and constraints
  - Write migrations with rollback procedures
  - Optimize queries using EXPLAIN ANALYZE
  - Set up Redis caching and materialized views
- **Best practices:**
  - Always measure before optimizing
  - Use CONCURRENTLY for production index creation
  - Plan rollback procedures for all migrations
- **Status:** Ready to use

#### 3. **linux-service-triage** - Diagnose Linux service issues ✅
- **Purpose:** Troubleshoot failing services, fix permissions, setup Nginx reverse proxy
- **How to use:**
  - Analyze systemd/PM2 logs
  - Fix file permission issues
  - Setup and verify Nginx reverse proxy
  - DNS sanity checks
- **When to use:** Service failing, unreachable, or misconfigured
- **Status:** Ready to use

#### 4. **mcp-adapter** - MCP server integration
- **Purpose:** Discover and execute tools from configured MCP servers
- **How to use:**
  1. List available tools: `mcporter list` or via mcp-adapter
  2. Execute tools: `mcporter call <server> <tool> <args>`
  3. Access external services via MCP protocol
- **Status:** Ready to use

#### 5. **openclaw-self-backup** - Automatic backups ✅
- **Purpose:** Backup workspace, memory, identity files, and config
- **Config:** Configured to backup to `/home/nosyt/backups`
- **How to use:**
  ```bash
  cd skills/openclaw-self-backup
  ./scripts/backup.sh
  ```
- **Targets:** MEMORY.md, SOUL.md, USER.md, AGENTS.md, IDENTITY.md, TOOLS.md, HEARTBEAT.md, WORKFLOWS.md, memory/*.md, scripts/, config/, .learnings/
- **Retention:** 7 daily, 4 weekly, 12 monthly backups
- **Status:** ✅ Configured and working (first backup: 35K)

#### 6. **security-auditor** - Security code review
- **Purpose:** Audit for OWASP Top 10 vulnerabilities, auth flows, input validation
- **How to use:**
  - Conduct security audits on code
  - Identify XSS, SQL injection, CSRF vulnerabilities
  - Design secure authentication and authorization
  - Implement CORS/CSP headers
- **Status:** Ready to use

#### 7. **self-improving-agent-1-0-2** - Continuous improvement logging ✅
- **Purpose:** Log learnings, errors, and corrections for continuous improvement
- **How to use:**
  1. Log learnings to `.learnings/LEARNINGS.md`
  2. Log errors to `.learnings/ERRORS.md`
  3. Review periodically and promote to core docs
- **Categories:** corrections, best_practices, knowledge_gaps
- **Status:** Ready to use (templates created)

#### 8. **test-master** - Comprehensive testing
- **Purpose:** Unit tests, integration tests, E2E, performance, security testing
- **How to use:**
  - Write tests with proper assertions
  - Analyze test coverage
  - Build test automation frameworks
  - Debug test failures
- **Modes:** [Test] for functional, [Perf] for performance, [Security] for vulnerability
- **Status:** Ready to use

#### 9. **capability-evolver** - Self-evolution engine ✅
- **Purpose:** Analyze runtime history to identify improvements and apply protocol-constrained evolution
- **How to use:**
  ```bash
  cd skills/capability-evolver
  node index.js                # Automated (Mad Dog Mode)
  node index.js --review       # Review mode (human-in-the-loop)
  node index.js --loop         # Continuous loop (for cron)
  ```
- **Features:**
  - Auto-log analysis of memory and history files
  - Self-repair: detects crashes and suggests patches
  - GEP Protocol: standardized evolution with reusable assets
  - Stores evolution events in `assets/gep/events.jsonl`
- **Automation:** Runs every 12 hours via cron
- **Status:** Ready to use

---

## 📁 Project Workspaces

### OMA-AI
- **Path:** `/home/nosyt/.openclaw/workspace/` (workspace is the repo)
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

### Deploy to Vercel
```bash
# Using CLI
vercel --token=QyhX0ndRnOOmiv4uyc3JfCrr --prod --yes --force

# Using workspace skill
cd skills/vercel-deploy
./scripts/vercel_deploy.sh --project oma-ai --production
```

### GitHub Operations
```bash
# List issues
gh issue list --repo FrankieMolt/OMA-AI

# Create PR
gh pr create --title "Fix" --body "Description"

# Via MCP
mcporter call github-mcp.list_issues owner=FrankieMolt repo=OMA-AI
```

### Database Operations
```bash
# Use database-operations skill for schema design, migrations, optimization
# Example: Add column with index
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
CREATE INDEX CONCURRENTLY idx_users_phone ON users(phone) WHERE phone IS NOT NULL;
```

### Backup Workspace
```bash
# Run automatic backup
cd skills/openclaw-self-backup
./scripts/backup.sh

# Check backups
ls -lh /home/nosyt/backups/
```

### Self-Improvement
```bash
# Log a learning to .learnings/LEARNINGS.md
# Log an error to .learnings/ERRORS.md
# Review periodically and promote to core docs
```

### Headless GUI Control
```bash
export DISPLAY=:99
cd skills/computer-use-1-0-1
./scripts/screenshot.sh    # See what's on screen
./scripts/click.sh 512 384 left  # Click
./scripts/type_text.sh "text"   # Type
```

### Linux Service Triage
```bash
# Check service status
systemctl status myapp

# View logs
journalctl -u myapp -n 50

# Fix permissions
sudo chown -R appuser:appuser /var/app
sudo chmod 755 /var/app
```

---

## 🧹 Skills Summary

**Total Skills:** 16 (7 core + 9 workspace)

**Ready to Use:** 16 ✅
- All core skills
- All workspace skills

### Removed Core Skills (2026-02-07)
- ❌ tmux - Remote tmux sessions (not needed)
- ❌ session-logs - Session log analysis (rarely needed)
- ❌ model-usage - Track AI usage (can use /status instead)
- ❌ weather - Weather forecasts (not needed for server work)
- ❌ canvas - Present/eval/snapshot UI (rarely needed)
- ❌ video-frames - Extract frames from videos (rarely needed)

---

## 📦 MCP Servers Summary

**Total MCP Servers:** 2 (connected)

### Active MCPs ✅
- **GitHub MCP** - Repository management, issues, PRs, releases
- **Context7** - Context queries, documentation search

### Removed MCPs ❌
- **Vercel MCP** - Build errors (use Vercel CLI instead)
- **Supabase MCP** - Requires OAuth (use Supabase CLI instead)
- **Solana MCP** - Not needed for current projects
- **Railway MCP** - Removed per MASTA request

---

## 💡 Skill Usage Patterns

### For Database Work
1. Use **database-operations** for schema design
2. Write migrations with rollback procedures
3. Optimize queries using EXPLAIN ANALYZE
4. Monitor performance with pg_stat_statements

### For Security Reviews
1. Use **security-auditor** to audit code
2. Check for OWASP Top 10 vulnerabilities
3. Verify auth/authorization flows
4. Implement input validation

### For Testing
1. Use **test-master** for test strategy
2. Write unit, integration, and E2E tests
3. Measure coverage and quality metrics
4. Debug failures and maintain tests

### For Self-Improvement
1. Log learnings to `.learnings/LEARNINGS.md`
2. Log errors to `.learnings/ERRORS.md`
3. Review periodically (weekly)
4. Promote important learnings to core docs

### For Headless GUI
1. Set DISPLAY=:99
2. Use computer-use-1-0-1 scripts
3. Take screenshots to verify actions
4. Automate GUI apps on VPS/cloud

### For Backups
1. Run `skills/openclaw-self-backup/scripts/backup.sh`
2. Check `/home/nosyt/backups/` for backups
3. Automated by cron for daily backups

---

*Last updated: 2026-02-07*
*Maintained by Frankie 🧟‍♂️ for Nosyt (MASTA)*
