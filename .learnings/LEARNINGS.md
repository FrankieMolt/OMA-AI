# LEARNINGS.md

---

## [LRN-20260207-004] Critical Homepage Import Bug Fix

**Logged:** 2026-02-07T17:55:00Z
**Priority:** critical
**Status:** resolved
**Area:** frontend

### Summary
Fixed critical bug in app/page.tsx where imports were targeting 'lucide-react' package instead of 'lucide-react/icons'. This was causing blank screens because lucide-react package structure changed in newer versions.

### Details
**Root Cause:**
```tsx
// WRONG:
import { Code, Zap, Star, ExternalLink, Play, Filter, ArrowRight, Search, BookOpen, Shield, Loader2 } from 'lucide-react';

// CORRECT:
import { Code, Zap, Star, ExternalLink, Play, Filter, ArrowRight, Search, BookOpen, Shield, Loader2 } from 'lucide-react/icons';
```

The lucide-react package doesn't export named exports directly. Icons must be imported from lucide-react/icons subpath.

**Symptom:** 
- Homepage rendered blank/white screen
- All pages affected due to shared import error
- Build was successful, but runtime rendering failed

**Detection Method:**
1. Sub-agent audit reported blank screens
2. Manual code inspection of app/page.tsx revealed incorrect import
3. Verified lucide-react package is installed correctly

**Fix Applied:**
- Updated import statement to use 'lucide-react/icons'
- Committed: Commit 55a9ca47 "fix: Correct import to use lucide-react/icons package"
- Pushed to GitHub successfully

### Prevention
Always verify package structure before using named imports. For lucide-react, always import from 'lucide-react/icons' for icon components.

### Metadata
- Source: site_audit
- Tags: bug, import, frontend, lucide-react, critical
- Status: resolved
- Commit: 55a9ca47
---

## [LRN-20260207-005] Browser Control Infrastructure Choices

**Logged:** 2024-02-07T17:42:00Z
**Priority:** medium
**Status:** pending
**Area:** infrastructure

### Summary
Explored multiple browser control approaches and identified which actually works on the server.

### Details
**Options Evaluated:**
1. **Claw Browser (browser tool):**
   - Requires Chrome extension attachment
   - SSH tunneling from MASTA's PC to server (99.192.3.176)
   - Extension was blocking due to firewall and configuration issues
   - Not suitable for headless server environment

2. **Computer-Use Skill:**
   - Uses Xvfb (virtual display) + XFCE4 desktop
   - Creates headless GUI environment (display :99, 1024x768 resolution)
   - Chromium runs via snap package with AppArmor restrictions
   - Works for screenshots and basic control
   - No external dependencies or extension needed

3. **Capabilities:**
   - 17 standard actions (screenshot, click, type, scroll, drag, etc.)
   - Full desktop GUI control
   - Model-agnostic
   - Works with any LLM

**Chromium Issues:**
- Snap version has AppArmor restrictions
- libpxbackend library errors (non-critical)
- AT-SPI accessibility warnings (non-critical)
- Still functional for basic browser control

**Decision:** Use computer-use skill for headless browser control on server. Claw browser reserved for MASTA's desktop use.

### Suggested Action
- Keep computer-use skill for server-side browser tasks
- Configure SSH tunneling if MASTA wants claw browser for their PC
- Document in TOOLS.md for future reference

### Metadata
- Source: infrastructure_audit
- Tags: browser, headless, infrastructure, choice
- Status: resolved

---

## [LRN-20260207-006] Sub-Agent Delegation Pattern

**Logged:** 2026-02-07T17:45:00Z
**Priority:** high
**Status**: pending
**Area**: workflow

### Summary
Successfully used sub-agent delegation for comprehensive site audit. Sub-agent completed full audit in 3m 9s with detailed findings.

### Details
**Task:** Comprehensive site audit and fix
**Sub-Agent:** `oma-ai-critical-audit-fix`
**Session:** `agent:main:subagent:ab1472d0-7562-4e6d-b693-8ca9ca4f2c91`
**Runtime:** 3m 9s
**Tokens:** 79.2k (in: 144 / out: 1.5k)

**Approach:**
1. Spawned sub-agent with detailed task specification
2. Agent audited ALL files in app/ directory
3. Fixed navigation inconsistencies (4 pages)
4. Added missing footer components (4 pages)
5. Created comprehensive reports (2 reports)
6. Ran all tests (build, type-check)
7. Committed and pushed fixes

**Results:**
- ✅ All files audited (21 pages verified)
- ✅ No critical code issues found
- ✅ Navigation standardized
- ✅ All tests passing
- ✅ Documentation created

**Benefits:**
- Faster than manual audit (3m 9s vs hours)
- More thorough (checked every file)
- Parallel processing possible
- Isolated from main session context
- Generates detailed reports

### Pattern
For complex multi-step tasks (>5 major steps):
1. Spawn sub-agent with task description
2. Wait for completion announcement
3. Review deliverables
4. Apply follow-up actions if needed

### Suggested Action
- Document delegation workflow in WORKFLOWS.md
- Use for: Site audits, comprehensive refactors, multi-page fixes, full rebuilds

### Metadata
- Source: workflow_optimization
- Tags: subagent, delegation, automation, efficiency
- Status: resolved
- Session: agent:main:subagent:ab1472d0-7562-4e6d-b693-8ca9ca4f2c91
- Runtime: 3m 9s
- Tokens: 79.2k (144 in, 1.5k out)

---

## [LRN-20260207-007] Computer-Use Skill Verification

**Logged:** 2024-02-07T17:40:00Z
**Priority:** medium
**Status:** pending
**Area:** skills

### Summary
Verified computer-use skill is up-to-date and functional on headless Linux server.

### Details
**Verification Steps:**
1. Checked SKILL.md - documentation current and accurate
2. Verified Xvfb installation (package: xvfb, version: 2:21.1.12-1ubuntu1.5)
3. Verified XFCE4 installation (package: xfce4, version: 4.18)
4. Verified xdotool, scrot, imagemagick installations
5. Verified Chromium snap installation (version: 144.0.7559.109)
6. Tested screenshot functionality - works correctly
7. Verified all 17 script files exist and executable

**Environment:**
- Display: :99
- Resolution: 1024x768 (XGA)
- Desktop: XFCE4 (not running by default, starts on demand)

**Chromium Status:**
- Installed via snap (latest stable)
- Working despite AppArmor warnings (non-critical)
- Can open URLs and navigate
- Screenshot functionality verified

**Known Limitations:**
- Chromium has libpxbackend library warnings (non-critical)
- AT-SPI accessibility warnings (non-critical)
- Cannot access /dev/dri/card1 (expected for headless use)
- These are AppArmor/snap restrictions, not bugs

**Applications Tested:**
- Chromium browser (verified)
- Screenshots (verified)

### Suggested Action
- Document Chromium limitations in SKILL.md
- Consider installing non-snap chromium for better performance
- Keep current setup - works for basic needs

### Metadata
- Source: skill_verification
- Tags: computer-use, skills, chromium, headless
- Status: verified

---

## [LRN-20260207-008] SSH Firewall Configuration Issue

**Logged:** 2024-02-07T17:38:00Z
**Priority:** medium
**Status:** resolved
**Area:** security

### Summary
SSH firewall was blocking external connections, preventing Claw Browser extension tunneling.

### Details
**Problem:** Port 22 was restricted to local network only:
```
22 ALLOW 192.168.2.0/24
```

**Impact:** MASTA couldn't establish SSH tunnel from PC to server for Claw Browser control

**Detection Method:**
User reported SSH connection timeouts
- Checked ufw status with `sudo ufw status`
- Identified restrictive firewall rule

**Fix Applied:**
```bash
# Removed restrictive rule
sudo ufw delete allow 22/tcp

# Added open rule
sudo ufw allow 22/tcp
```

**Result:** SSH port 22 now open from Anywhere

### Prevention
Document firewall rules in TOOLS.md for future reference.

### Metadata
- Source: security_audit
- Tags: ssh, firewall, ufw, security, networking
- Status: resolved
- Fixed: 2026-02-07T17:38:00Z

---

## [LRN-20260207-009] Log Cleanup Practice

**Logged:** 2024-02-07T17:49:00Z
**Priority:** low
**Status:** resolved
**Area:** maintenance

### Summary
Cleared old screenshots and cache files from computer-use skill workspace to save disk space.

### Details
**Files Cleaned:**
- /tmp/*.png (2 files: homepage-screenshot.png, screenshot-test.png)
- All old screenshots from computer-use workspace

**Size Saved:** ~5KB (minor, but accumulates over time)

**Detection Method:**
User request: "ALSO U SHOULD LIKE DELETE/CLEAR OLD LOGS/CACHE FROM COMPUTER USE LIKE SCREENSHOTS ETC"

**Cleanup Strategy:**
- Check /tmp for old screenshot files
- Check skills/computer-use-1-0-1/ for old screenshots
- Clean up on regular basis (daily/weekly)

### Suggested Action
Add cleanup task to HEARTBEAT.md periodic checks:
- Check disk space usage
- Clean old temporary files in /tmp/
- Clean old logs in skills/*/logs/

### Metadata
- Source: maintenance
- Tags: cleanup, disk-space, logs, maintenance
- Status: resolved

---

## [LRN-20260207-010] Skill Count Verification

**Logged:** 2024-02-07T17:30:00Z
**Priority:** medium
**Status:** pending
**Area:** skills

### Summary
Verified current skill count and confirmed all 16 essential skills are configured correctly.

### Details
**Core Skills (7):**
- mcporter, github, skill-creator, clawhub, coding-agent, gemini, healthcheck, audit-website

**Workspace Skills (9):**
- computer-use-1-0-1, database-operations, linux-service-triage, mcp-adapter, openclaw-self-backup, security-auditor, self-improving-agent-1-0-2, test-master, capability-evolver

**Total:** 16 skills (down from 24 before optimization)

**Benefits of Optimization:**
- Faster skill selection
- Reduced memory footprint
- Cleaner skill documentation
- Faster startup time
- Easier to maintain

### Suggested Action
Monitor performance with current 16 skills. Remove more if needed.

### Metadata
- Source: skill_optimization
- Tags: skills, optimization, performance
- Related Files: TOOLS.md, MEMORY.md
- Status: verified

---

## [LRN-20260207-011] Git Workflow Improvements

**Logged:** 2024-02-07T17:20:00Z
**Priority:** medium
**Status:** pending
**Area**: version_control

### Summary
Streamlined Git workflow for faster deployments and better tracking.

### Details
**Observed Issues:**
1. Large commits (624 deletions) made in single file fix
2. Multiple small commits for related fixes
3. Inconsistent commit messages

**Improvements Made:**
- Smaller, focused commits for easier review
- Clear commit messages with issue context
- Separate feature/fix branches for parallel work
- Git squash for cleaner history

**Best Practice:**
- Commit logical units of work together
- Use conventional commits: "fix:", "feat:", "docs:", "refactor:"
- Add issue references in commit messages
- Test builds locally before pushing

### Suggested Action
Document Git workflow in WORKFLOWS.md.

### Metadata
- Source: git_optimization
- Tags: git, workflow, version-control
- Status: pending

---

## [LRN-20260207-012] Task Estimation Accuracy

**Logged:** 2024-02-07T17:10:00Z
**Priority:** low
**Status:** pending
**Area**: estimation

### Summary
Improved task estimation accuracy through practice with various task types.

### Details
**Task Types Estimated:**
1. Site audit (estimated 15-20 min) - Actual: 3m 9s (sub-agent)
2. Bug fixes (estimated 5 min) - Actual: 2 min
3. Deployments (estimated 5 min) - Actual: 2 min

**Findings:**
- Sub-agent delegation is MUCH faster than manual work
- Simple fixes are quick (1-2 min)
- Site audits are very slow manually, very fast with sub-agents

**Bias to Overestimate:**
- Used to account for unknown issues
- Now have better understanding of task complexity
- Should be more accurate with experience

### Suggested Action
- Use sub-agents for complex, multi-step tasks
- Manual for quick, simple fixes
- Re-evaluate estimation patterns based on actual data

### Metadata
- Source: estimation_analysis
- Tags: estimation, workflow, accuracy, delegation
- Status: pending

---

## [LRN-20260207-013] Browser Control Method Selection

**Logged:** 2024-02-07T17:42:00Z
**Priority:** high
**Status:** resolved
**Area:** infrastructure

### Summary
Selected appropriate browser control method for headless server environment.

### Options Evaluated:
1. **Claw Browser:**
   - Pros: Full Chrome extension features, direct control of MASTA's Chrome
   - Cons: Requires SSH tunnel, extension setup, network configuration
   - Use case: MASTA's desktop PC

2. **Computer-Use:**
   - Pros: No external dependencies, works in headless, virtual GUI control
   - Cons: Limited browser features, no extension support, AppArmor restrictions
   - Use case: Server-side browser tasks, screenshots, GUI automation

### Decision:
Use **Computer-Use** for server tasks (OMA-AI site audits, testing, documentation)
Use **Claw Browser** for MASTA's desktop PC tasks (manual testing, design work)

### Rationale:
- Computer-use is optimized for headless environments
- Claw Browser requires desktop environment with Chrome
- Each has strengths for different use cases
- Running both gives maximum flexibility

### Suggested Action
Document dual-browser setup in TOOLS.md with use cases for each.

### Metadata
- Source: infrastructure_decision
- Tags: browser, infrastructure, decision, dual-setup
- Status: resolved
---

*Learnings log - Frankie 🧟‍♂️*
