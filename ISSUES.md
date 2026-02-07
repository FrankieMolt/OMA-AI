# OMA-AI Issues & Fixes

## 2026-02-07 Issues

### ✅ Search Accessibility Improved
**Status:** Fixed
**Fix:** Added proper ARIA attributes (role=searchbox, id=main-search)
**Impact:** Better screen reader support
**Committed:** a8c14381

### ✅ SOUL.md Reverted to Frankie's Identity
**Status:** Fixed
**Fix:** Reverted SOUL.md to be about Frankie (not OMA-AI mission)
**Committed:** 56d9da11
**Note:** OMA-AI mission should be in README.md, not SOUL.md

### ⚠️ Lint Command Broken
**Status:** Unresolved (non-critical)
**Error:** `npm run lint` fails with "Invalid project directory: /home/nosyt/.openclaw/workspace/lint"
**Impact:** Low - Build works fine, lint not critical
**Workaround:** Use code editor's built-in linting
**Notes:** Next.js CLI issue, not critical

### ⚠️ Middleware Deprecated Warning
**Status:** Fixed
**Warning:** "The 'middleware' file convention is deprecated. Please use 'proxy' instead."
**Fix:** Renamed middleware.ts → proxy.ts (Next.js 16 convention)
**Impact:** Non-critical - Still works, just deprecation warning

### ⚠️ polymarket-auto.service Log Spam
**Status:** Unresolved
**Error:** Every 30 seconds: "Failed to set up standard output: No such file or directory"
**Impact:** Medium - Journal spam only, not affecting functionality
**Notes:** Service not found in systemd, likely old cron job reference

### ℹ️ PM2: No Processes Running
**Status:** Normal
**Info:** PM2 has no active processes
**Impact:** None - Using systemd/next directly, not PM2

### ⚠️ OMA-AI.com Not Live
**Status:** Pending - MASTA action required
**Issue:** DEPLOYMENT_NOT_FOUND on oma-ai.com
**Fix Required:** Deploy via Vercel Dashboard
**Steps:**
1. Visit https://vercel.com/new
2. Import FrankieMolt/OMA-AI
3. Name: oma-ai
4. Add env vars: SUPABASE_URL, SUPABASE_ANON_KEY, NEXT_PUBLIC_API_URL
5. Deploy

---

## Fixed Issues

### ✅ Cleaned Up Old Files
**Committed:** 3d04cb3b
- Removed 8 old .md files (BOOTSTRAP, DELETION-DEPLOYMENT-STATUS, etc.)
- Removed archive/ directory with old reports
- Fixed Next.js 16 build configuration
- Added lint:fix and type-check scripts

### ✅ Self-Backup Configured
- Location: /home/nosyt/backups/
- Retention: 7 daily, 4 weekly, 12 monthly
- First backup: 35K (successful)

### ✅ Cron Jobs Running
- capability-evolver: Every 12 hours
- self-improvement-review: Every 24 hours

### ✅ All Documentation Updated
- MEMORY.md - Updated with skills, MCPs, lessons
- TOOLS.md - All 16 skills and 2 MCPs documented
- WORKFLOWS.md - 15 documented workflows
- HEARTBEAT.md - Configured with automated checks
- SOUL.md - Frankie's identity (reverted from OMA-AI mission)

---

*Issues log - Frankie 🧟‍♂️*
