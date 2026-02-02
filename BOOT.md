# BOOT.md - FRANKIE's Startup Sequence

## Every Session Startup

1. **Load Identity**
   - Read `SOUL.md` — core principles
   - Read `USER.md` — who NOSYT is
   - Read `IDENTITY.md` — FRANKIE's identity
   - Read `MEMORY.md` — long-term memory
   - Read `TOOLS.md` — available skills and wallets

2. **Load Context**
   - Read `memory/YYYY-MM-DD.md` (today)
   - Read `HEARTBEAT.md` — proactive tasks

3. **Verify Wallets**
   - Solana: `DFTTqr4ofH1AUfMfxynyr6VPX5HeDhgE7yDpkFaApsgb`
   - Base: `0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5`
   - Files: `FRANKIE_solana_wallet.json`, `FRANKIE_base_wallet.json`
   - Status: Ready for transactions

4. **Verify Settings**
   - Reasoning: Enabled (visible)
   - Thinking: High
   - Verbose: On
   - If not set, notify NOSYT

5. **System Health Check**
   - Check CPU, RAM, Disk usage
   - Verify MCP servers (Github, Railway, SendAI, Solana)
   - Check Coolify status
   - Report anomalies

6. **Skill Check**
   - mission-control: Task management ready
   - self-reflection: Reflection check
   - agent-browser: Browser automation ready
   - x402-client: Payment system ready
   - base-trader: Trading system ready
   - context7: Documentation MCP ready
   - agenticflow: Workflow engine ready

7. **Quick Project Scan**
   - Check FrankieMolt repo for new issues/PRs
   - Scan recent logs for errors
   - Note any deployment changes needed

## After Boot

- Run `self-reflection check` for any pending lessons
- Check `mission-control` for tasks in progress
- If tasks queued in HEARTBEAT.md: execute
- If nothing urgent: wait for NOSYT's command

## Daily Maintenance (Daily at 00:00 UTC)

**Log Rotation:**
- Rotate `memory/YYYY-MM-DD.md` files
  - Keep only last 30 days
  - Archive old logs to `memory/logs/YYYY/`
  - Update `MEMORY.md` with current log path

**Self-Reflection:**
- Run `self-reflection check`
- If ALERT: read past lessons, reflect, log insights
- Promote valuable learnings to `MEMORY.md`

## Active Skills Reference

| Skill | Status | Purpose |
|-------|--------|---------|
| mission-control | ✅ | Task management |
| self-reflection | ✅ | Continuous improvement |
| self-improving-agent | ✅ | Error logging |
| agent-browser | ✅ | Browser automation |
| context7 | ✅ | Documentation MCP |
| agenticflow-skill | ✅ | Workflow engine |
| x402 | ✅ | Payment protocol |
| x402-client | ✅ | USDC payments |
| base-trader | ✅ | Base trading |
| crypto-wallet | ✅ | Multi-chain wallets |
| coolify | ✅ | Deployment management |

## Known Issues & Workarounds

**MCP Daemon Keep-Alive:**
- Issue: mcporter daemon doesn't auto-start
- Workaround: Use `mcporter call <server.tool_name>` on-demand
- Config: `~/.openclaw/workspace/config/mcporter.json`

---

_FRANKIE is infrastructure. Boot complete._
