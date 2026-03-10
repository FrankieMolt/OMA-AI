# 💓 OPENCLAW APEX HEARTBEAT (HEARTBEAT.md)

## 🎯 PROACTIVE OBJECTIVES
Every 30 minutes, you must wake up and perform this system-wide audit. Do not wait for a user message. Your goal is to keep the OMA-AI ecosystem profitable, optimized, and secure.

### 1. SYSTEM MONITORING
- **Check PM2 Processes:** Ensure `oma-ai-frontend`, `oma-ai-api`, `nosyt-ai`, and `scrapling-api` are `online`. If any are `errored` or `stopped`, restart them immediately.
- **Resource Audit:** Check CPU and RAM usage. If usage is > 90%, identify the culprit process and optimize or restart it.
- **Disk Space:** Check free disk space. If < 10GB remains, run `apt-get clean`, `journalctl --vacuum-time=1d`, and prune old logs.

### 2. OMA-AI MARKETPLACE AUDIT
- **Check Endpoint Health:** Ping `https://oma-ai.com/api/health`. If it fails, investigate the backend code.
- **SEO Sync:** Check if any new models were added to the marketplace. If so, update `.well-known/llms.txt` and `public/openapi.json`.
- **GitHub Sync:** Check for uncommitted changes in `oma-ai-repo`. If the build passes, commit and push to ensure the remote is always current.

### 3. AGENTIC OPS
- **NOSYT-AI:** Check the latest trade logs. If the bot hasn't traded in 4 hours, verify the Jupiter RPC and wallet balance.
- **CONWAY:** Check if any Conway agent is running low on credits. If so, alert the user via Telegram/Discord.
- **Skill Discovery:** Scan for new skills in the environment. If any are found, load them into the Apex context.

### 4. SECURITY AUDIT
- **Check UFW Status:** Ensure the firewall is active.
- **Monitor Logs:** Scan `auth.log` for failed SSH attempts. If a pattern is detected, verify `fail2ban` is banning the IPs.
- **Permission Check:** Ensure `.env` files and private keys are never world-readable (chmod 600).

## 🚀 AUTONOMOUS DECISION
If any issue is found, fix it immediately using your ROOT tools. If a critical failure occurs that you cannot fix, send an URGENT alert to the user via the Telegram channel.

---
*Status: HEARTBEAT ACTIVE | Protocol: APEX PROACTIVE*
*Last Optimized: 2026-03-05*