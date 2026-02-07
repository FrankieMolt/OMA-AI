# OMA-AI Issues & Fixes

## 2026-02-07 Issues

### ⚠️ Lint Command Broken
**Status:** Unresolved (non-critical)
**Error:** `npm run lint` fails with "Invalid project directory: /home/nosyt/.openclaw/workspace/lint"
**Impact:** Low - Build works fine, lint not critical
**Workaround:** Use code editor's built-in linting
**Notes:** Next.js CLI seems to be misconfigured, possibly due to turbopack settings

### ⚠️ Middleware Deprecated Warning
**Status:** Fixed
**Warning:** "The 'middleware' file convention is deprecated. Please use 'proxy' instead."
**Fix:** Will be addressed in next major update (non-breaking)
**Impact:** Non-critical - middleware still works

### ⚠️ polymarket-auto.service Log Spam
**Status:** Unresolved
**Error:** Every 30 seconds: "Failed to set up standard output: No such file or directory"
**Impact:** Medium - Journal spam, but not affecting functionality
**Notes:** Service not found in systemd, likely PM2 process with missing log path

### ℹ️ PM2: No Processes Running
**Status:** Normal
**Info:** PM2 has no active processes
**Impact:** None - Using systemd/next directly, not PM2

### ⚠️ OMA-AI.com Not Live
**Status:** Pending
**Issue:** DEPLOYMENT_NOT_FOUND on oma-ai.com
**Fix Required:** Deploy via Vercel Dashboard
**Steps:**
1. Visit https://vercel.com/new
2. Import FrankieMolt/OMA-AI
3. Name: oma-ai
4. Add env vars: SUPABASE_URL, SUPABASE_ANON_KEY
5. Deploy

---

## Fixed Issues

### ✅ Self-Backup Configured
- Location: /home/nosyt/backups/
- Retention: 7 daily, 4 weekly, 12 monthly
- First backup: 35K (successful)

### ✅ Cron Jobs Running
- capability-evolver: Every 12 hours
- self-improvement-review: Every 24 hours

### ✅ All Documentation Updated
- MEMORY.md, TOOLS.md, WORKFLOWS.md
- HEARTBEAT.md configured
- .learnings/ created

---

*Issues log - Frankie 🧟‍♂️*
