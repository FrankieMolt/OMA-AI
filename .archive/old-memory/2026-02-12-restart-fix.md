# Restart Issue Fix - 2026-02-12

## Problem
oma-ai had 40,448 restarts in 5 hours - caused by port collision (EADDRINUSE: address already in use :::3000)

## Root Cause
- Orphaned Node.js process (PID 587146) was holding port 3000
- PM2 kept trying to start oma-ai, failing, and restarting in a loop
- No max_restarts limit was set, allowing infinite restarts

## Fix Applied
1. Killed orphaned process: `kill -9 587146`
2. Deleted all PM2 processes: `pm2 delete all`
3. Killed any remaining Next.js processes
4. Created new ecosystem.config.js with:
   - max_restarts: 10 (prevents infinite loops)
   - restart_delay: 4000ms (4 seconds between restarts)
   - min_uptime: 10s (app must run 10s before counting as stable)
   - max_memory_restart: 1G (restart if memory exceeds 1GB)
5. Started all 3 apps with new config
6. Saved PM2 config: `pm2 save`

## Current Status
All 3 apps stable with 0 restarts after 85 seconds:
- oma-ai: Online (port 3000) ✅
- spendthrone: Online (port 3001) ✅
- lethometry: Online (port 3002) ✅

## Remaining Action (requires sudo)
Run this to enable PM2 to start on boot:
```
sudo env PATH=$PATH:/usr/bin /home/nosyt/.npm-global/lib/node_modules/pm2/bin/pm2 startup systemd -u nosyt --hp /home/nosyt
```

## Monitoring
Check status: `pm2 list`
Check logs: `pm2 logs [app-name]`
Monitor: `pm2 monit`
