# LEARNINGS.md

---

## [LRN-20260207-001] Skill Optimization

**Logged:** 2026-02-07T07:50:00Z
**Priority:** medium
**Status:** pending
**Area:** workspace

### Summary
Optimized Frankie's skill toolkit by removing 6 unused core skills and keeping only 16 essential skills.

### Details
**Skills Removed:**
- tmux - Not needed, use screen instead
- session-logs - Rarely needed, can use journalctl
- model-usage - Can get usage from /status instead
- weather - Not needed for server work
- canvas - Rarely needed
- video-frames - Rarely needed

**Skills Kept (16 total):**
- 7 Core: mcporter, github, skill-creator, clawhub, coding-agent, gemini, healthcheck, audit-website
- 9 Workspace: computer-use-1-0-1, database-operations, linux-service-triage, mcp-adapter, openclaw-self-backup, security-auditor, self-improving-agent-1-0-2, test-master, capability-evolver

**MCP Servers (2 remaining):**
- GitHub MCP (needs OAuth setup)
- Context7 (working)

### Suggested Action
Monitor performance with reduced skill count. Remove more if needed.

### Metadata
- Source: manual_cleanup
- Tags: skills, optimization, cleanup
- Related Files: TOOLS.md, MEMORY.md

---

## [LRN-20260207-002] Automation Setup

**Logged:** 2026-02-07T07:35:00Z
**Priority:** high
**Status:** pending
**Area:** automation

### Summary
Set up cron jobs for self-improvement and capability evolution. Configured automatic backups.

### Details
**Cron Jobs Created:**
1. capability-evolver - Every 12 hours (ID: 4227cbed-f55f-449c-9d54-bb79335cfafb)
2. self-improvement-review - Every 24 hours (ID: 6bffed47-c08e-4373-9351-a0cbc8385f4b)

**Backup System:**
- Location: /home/nosyt/backups/
- Config: /home/nosyt/.openclaw/workspace/skills/openclaw-self-backup/config/backup.json
- Retention: 7 daily, 4 weekly, 12 monthly
- First backup: 35K compressed (successful)

### Suggested Action
Monitor cron job execution. Verify backups are running daily.

### Metadata
- Source: automation_setup
- Tags: cron, backup, automation
- Related Files: HEARTBEAT.md, memory/heartbeat-state.json

---

## [LRN-20260207-003] MCP Server Selection

**Logged:** 2026-02-07T07:33:00Z
**Priority:** low
**Status:** pending
**Area:** infrastructure

### Summary
Optimized MCP servers by removing non-functional and unused ones.

### Details
**MCPs Removed:**
- Vercel MCP - Build errors, use CLI instead
- Supabase MCP - Requires OAuth (no browser access)
- Solana MCP - Not needed for current projects
- Railway MCP - Removed per MASTA request

**MCPs Kept:**
- GitHub MCP - Repository management (needs OAuth setup)
- Context7 - Documentation search (working)

### Suggested Action
Set up GitHub MCP OAuth when possible.

### Metadata
- Source: mcp_optimization
- Tags: mcp, infrastructure
- Related Files: config/mcporter.json

---

*Learnings log - Frankie 🧟‍♂️*
