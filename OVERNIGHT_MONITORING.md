# OVERNIGHT MONITORING SETUP

## What's Configured

### Night Monitoring (Every 2 Hours: 00:00-08:00 UTC)
- ✅ Checks all 3 sites (SpendThrone 3000, OMA-AI 3001, Lethometry 3002)
- ✅ Sends Telegram alerts if any site goes down
- ✅ Monitors disk space (alert if >80%)
- ✅ Monitors memory usage (alert if >90%)
- ✅ Logs all checks to `/home/nosyt/.openclaw/workspace/logs/night-monitor.log`

### Morning Startup (08:00 UTC)
- ✅ Restarts all dev servers
- ✅ Verifies all sites are running
- ✅ Sends "Morning Check" status to Telegram
- ✅ Logs to `/home/`nosyt/.openclaw/workspace/logs/morning-check.log`

### Alert System
- **Down sites:** Immediate Telegram alert with HTTP code
- **High disk (>80%): Warning alert
- **High memory (>90%): Warning alert
- **Morning summary:** "🌅 Morning Check: All 3 sites online. Ready for the day!"

## Crontab Jobs Added
```
0 */2 * * * /home/nosyt/.openclaw/workspace/night-monitor.sh
0 8 * * * /home/nosyt/.openclaw/workspace/morning-startup.sh
```

## Log Files
- `/home/nosyt/.openclaw/workspace/logs/night-monitor.log` - Night monitoring logs
- `/home/nosyt/.openclaw/workspace/logs/morning-check.log` - Morning startup logs

## Scripts
- `/home/nosyt/.openclaw/workspace/night-monitor.sh` - Check site health
- `/home/nosyt/.openclaw/workspace/mointing-startup.sh` - Restart all services

---

*Setup completed: 2026-02-10*
*Frankie 🧟‍♂️*