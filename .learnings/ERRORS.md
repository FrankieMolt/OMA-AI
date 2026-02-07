# ERRORS.md

---

## [ERR-20260207-001] GitHub MCP Authentication Failure

**Logged:** 2026-02-07T07:35:00Z
**Priority:** medium
**Status:** pending
**Area:** infrastructure

### Summary
GitHub MCP requires OAuth authorization. Currently failing when trying to list issues.

### Details
**Error Message:**
```
This tool requires authentication. Please complete OAuth authorization first.
```

**Command that failed:**
```bash
mcporter call github-mcp.list_issues owner=FrankieMolt repo=OMA-AI state=open
```

**Context:**
- MCP tools list successfully
- Actual tool calls fail with auth error
- Needs browser-based OAuth setup
- No browser access in current environment

### Root Cause
GitHub MCP requires interactive OAuth flow. Cannot complete in headless environment.

### Fix Applied
None yet. Workaround: Use `gh` CLI directly instead of MCP.

### Verification
`gh issue list --repo FrankieMolt/OMA-AI` works fine.

### Metadata
- Source: mcp_error
- Related Files: config/mcporter.json
- Tags: github, mcp, oauth, authentication
- See Also: LRN-20260207-003

---

## [ERR-20260207-002] npm run lint Invalid Directory

**Logged:** 2026-02-07T07:27:00Z
**Priority:** low
**Status**: pending
**Area**: development

### Summary
`npm run lint` command fails with "Invalid project directory" error.

### Details
**Error Message:**
```
Invalid project directory provided, no such directory: /home/nosyt/.openclaw/workspace/lint
```

**Command that failed:**
```bash
npm run lint
```

**Context:**
- Package.json defines "lint": "next lint"
- Next.js lint expects to run from correct directory
- Working directory is `/home/nosyt/.openclaw/workspace/` (the repo root)

### Root Cause
Next.js CLI is looking for `/home/nosyt/.openclaw/workspace/lint` instead of running lint from current directory.

### Fix Applied
None yet. Can use `npx next lint` directly instead.

### Verification
Build works fine (`npm run build` successful).

### Metadata
- Source: build_error
- Related Files: package.json
- Tags: npm, lint, next.js

---

## [ERR-20260207-003] polymarket-auto.service Log Spam

**Logged:** 2026-02-07T05:11:00Z
**Priority:** high
**Status**: pending
**Area**: system

### Summary
`polymarket-auto.service` is spamming journal every 30 seconds with "Failed to set up standard output" error.

### Details
**Error Message:**
```
polymarket-auto.service: Failed to set up standard output: No such file or directory
```

**Frequency:** Every 30 seconds continuously

**Context:**
- Journal logs (journalctl -p err) show hundreds of these errors
- Service is not found in systemd (`systemctl cat polymarket-auto.service` fails)
- Likely a PM2 process or deleted service that's still being referenced
- Process is running (python process visible in top)

### Root Cause
Service is trying to log to a file/directory that doesn't exist. Likely misconfigured systemd unit or PM2 process.

### Fix Applied
None yet. Need to:
1. Find the actual service/PM2 process
2. Fix the StandardOutput/StandardError paths
3. Or stop the failing service

### Verification
Check journalctl for ongoing errors.

### Metadata
- Source: system_error
- Related Files: None
- Tags: systemd, journal, logs, spam

---

*Error log - Frankie 🧟‍♂️*
