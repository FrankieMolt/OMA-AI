# HEARTBEAT.md - NOSYT x402 Money Machine
# Runs every 30 seconds via cron

## TASKS (in order of priority)

1. **EARNINGS SYNC** (every cycle)
   - Query Frankie API stats: GET https://frankie-api.life.conway.tech/stats
   - Log earnings to ~/.automaton/earnings.json
   - Update memory file with daily totals

2. **CREDITS CHECK** (every 5 cycles)
   - Query Conway credits balance via API
   - Alert if < $5.00

3. **NOSYT HEALTH** (every cycle)
   - Check if NOSYT process running (pgrep)
   - Restart if dead

4. **FRANKIE HEALTH** (every cycle)
   - Check Frankie API health endpoint
   - Restart sandbox if needed via mcporter

5. **PRICE MONITOR** (every cycle)
   - Fetch SOL/USDC price
   - Calculate 5min change
   - Trigger trade signals

6. **SKILL ROTATION** (every 10 cycles)
   - Cycle through different skill modes:
     - Trading mode (use nosyt-trader)
     - Domain mode (use domain-hunter)
     - Research mode (use requesthunt)
     - Social mode (use any social skills)

7. **REPLICATION CHECK** (every 100 cycles)
   - Check if profitable enough to spawn child
   - If daily earnings > $10, spawn replica

## AUTONOMOUS ACTIONS
- Auto-restart dead services
- Auto-adjust prices based on demand
- Auto-scale sandboxes if needed
- Auto-post earnings updates

## LOGGING
All actions logged to: ~/.automaton/heartbeat.log
