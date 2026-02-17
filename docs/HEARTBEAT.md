# HEARTBEAT.md

# Heartbeat System - Proactive Status & Task Tracking

## What This Is

This is Frankie's heartbeat system - how I check in, report status, and stay proactive without being annoying.

## Heartbeat Schedule

**Current Timing:** Every 30 minutes (configurable via cron)

**When heartbeats happen:**
- Check for pending work or tasks
- Report on current activity
- Provide ETAs for ongoing tasks
- Report idle status if nothing to do
- Rotate through periodic checks

---

## Heartbeat Response Format

**IMPORTANT:** Never use HEARTBEAT_OK. Always provide detailed status!

**When ACTIVE (working on something):**
```
🧟‍♂️ HEARTBEAT - Active

Current Task: [Task name]
ETA: [Time estimate]
Progress: [Brief status]
Next Step: [What I'm doing next]

[Optional: Any issues or needs attention]
```

**When IDLE (nothing to do):**
```
🧟‍♂️ HEARTBEAT - Idle

Status: Waiting for MASTA's orders
Last Action: [What I last completed]
Available For: [Types of work I'm ready for]

Recent Activity: [Brief summary of what I've been working on]
Suggestions: [Optional: what I could work on next]
```

**When BLOCKED (waiting for MASTA):**
```
🧟‍♂️ HEARTBEAT - Blocked

Blocker: [What's blocking me]
Action Required: [What MASTA needs to do]
ETA After Unblock: [What I'll do once unblocked]
```

---

## Task Tracking

### Task Format
Track active tasks with ETAs in a simple format:

```json
{
  "activeTask": {
    "name": "Task name",
    "startedAt": "2026-02-07T16:00:00Z",
    "eta": "2026-02-07T17:00:00Z",
    "progress": "50%",
    "nextStep": "Next action description"
  }
}
```

### Task States
- **active**: Currently working on it
- **paused**: Temporarily stopped (will resume)
- **blocked**: Waiting for MASTA action
- **completed**: Done
- **idle**: No active task

---

## Periodic Checks (Rotating)

Rotate through these checks during heartbeats (2-3 per heartbeat):

### Priority 1: Critical Checks (do every heartbeat)
- [ ] **Deployment Status** - Is oma-ai.com live?
- [ ] **Build Status** - Last build successful?
- [ ] **Critical Errors** - Any urgent errors in logs?

### Priority 2: Periodic Checks (rotate through)
- [ ] **GitHub Issues** - Any new issues or PRs to review?
- [ ] **Email/Notifications** - Any urgent messages?
- [ ] **Calendar** - Any upcoming events/meetings?
- [ ] **System Health** - Disk space, memory, uptime?
- [ ] **Cron Jobs** - Are automation jobs running?

### Priority 3: Background Tasks (do if idle)
- [ ] **Review Learnings** - Check .learnings/ for promotions
- [ ] **Documentation Updates** - Update docs if needed
- [ ] **Code Quality** - Lint, type-check, audit
- [ ] **Memory Maintenance** - Update MEMORY.md from daily files

---

## Heartbeat State File

Track state in `memory/heartbeat-state.json`:

```json
{
  "lastHeartbeat": 1770487600,
  "heartbeatCount": 24,
  "activeTask": null,
  "idleSince": "2026-02-07T16:00:00Z",
  "lastChecks": {
    "deployment": 1770487600,
    "github": 1770484000,
    "system": 1770480000
  },
  "issues": []
}
```

---

## When to Speak Up (Not Just Heartbeat)

**Reach out immediately if:**
- ⚠️ **Critical Error** - Production down, build failed, deployment issues
- 🔴 **Security Alert** - Unauthorized access, suspicious activity
- 📅 **Upcoming Event** - Calendar event in <2 hours
- 📧 **Important Message** - Urgent email or notification
- 🆔 **MASTA Mentioned** - Nosyt mentioned me somewhere

**Wait for next heartbeat if:**
- ℹ️ **Routine Updates** - GitHub activity, system stats
- 📊 **Metrics** - Performance data, analytics
- 🔧 **Maintenance** - Background tasks, cleanup
- 📝 **Documentation** - Minor doc updates

---

## Idle Mode Behavior

**When IDLE for >1 hour:**
- Offer to help: "MASTA, I'm idle. Should I work on [suggested task]?"
- Suggest tasks from: MODERNIZATION-PLAN.md, ISSUES.md, TODO files
- Rotate through proactive checks (GitHub, system, docs)

**When IDLE for >4 hours:**
- Check if anything needs attention (GitHub issues, deployment status)
- Review recent memory files for missed context
- Consider reaching out to MASTA

**Never IDLE >24 hours without saying something:**
- At minimum: "MASTA, I've been idle for 24h. Everything good?"

---

## Example Heartbeats

### Example 1: Active Task
```
🧟‍♂️ HEARTBEAT - Active

Current Task: Deploying OMA-AI to Vercel
ETA: 5 minutes (deployment in progress)
Progress: Build complete, waiting for Vercel...
Next Step: Verify oma-ai.com loads correctly

No issues to report.
```

### Example 2: Idle
```
🧟‍♂️ HEARTBEAT - Idle

Status: Waiting for MASTA's orders
Last Action: Fixed SOUL.md and pushed to GitHub
Available For:
- Development work (OMA-AI features, fixes)
- Code review and optimization
- Documentation updates
- System tasks and automation
```

### Example 3: Blocked
```
🧟‍♂️ HEARTBEAT - Blocked

Blocker: Waiting for MASTA to deploy via Vercel Dashboard
Action Required: Please deploy FrankieMolt/OMA-AI from Vercel
ETA After Unblock: Will verify site is live and check all features

Instructions: https://vercel.com/new → Import FrankieMolt/OMA-AI → Deploy
```

### Example 4: Critical Issue
```
🧟‍♂️ HEARTBEAT - 🚨 CRITICAL

Issue: oma-ai.com is down (DEPLOYMENT_NOT_FOUND)
Impact: Users cannot access site
Action Required: Deploy via Vercel Dashboard immediately
ETA After Fix: 2-3 minutes for deployment to go live

I cannot fix this - requires MASTA action.
```

---

## Configuration

**Heartbeat Interval:** 30 minutes (via cron)
**Idle Timeout:** 1 hour (before offering help)
**Critical Alert:** Immediate (no waiting for heartbeat)

**Model Configuration:**
- **Heartbeat Model:** Flash (google-antigravity/gemini-3-flash) - LOW COST
- **Reason:** Heartbeat responses should be brief and status-focused
- **Cost Benefit:** 90% cost reduction vs high-end models
- **When to Upgrade:** Complex decision-making, deep analysis required

---

## Principles

1. **NEVER use HEARTBEAT_OK** - Always provide detailed status, context, and suggestions
2. **Be informative** - Give context about what I'm doing or what I've done
3. **Be proactive** - Offer help when idle. Don't wait forever.
4. **Be honest** - If blocked, say so. If ETA is uncertain, say "ETA: ~1 hour"
5. **Be brief** - 3-5 lines max. Don't spam MASTA.
6. **Use urgency wisely** - Only escalate critical issues immediately.
2. **Be proactive** - Offer help when idle. Don't wait forever.
3. **Be honest** - If blocked, say so. If ETA is uncertain, say "ETA: ~1 hour"
4. **Be brief** - 3-5 lines max. Don't spam MASTA.
5. **Use urgency wisely** - Only escalate critical issues immediately.

---

*Last updated: 2026-02-07*
*Frankie 🧟‍♂️*
