#!/bin/bash
# NOSYT Overnight Automation Script
# Run this to keep everything improving overnight

WORKSPACE="$HOME/.openclaw/workspace"
NOSYT_DIR="$WORKSPACE/nosyt-automaton"
LOG_DIR="$NOSYT_DIR/logs"
DATE=$(date +%Y%m%d_%H%M%S)

echo "=== NOSYT OVERNIGHT MODE: $DATE ==="
cd "$NOSYT_DIR"

# 1. Ensure bot is running
if ! pgrep -f "node dist/index.js" > /dev/null; then
    echo "[$(date)] Starting NOSYT..." >> "$LOG_DIR/overnight.log"
    ./start.sh >> "$LOG_DIR/nosyt.log" 2>&1 &
    sleep 5
fi

# 2. Run monitor script
./monitor.sh >> "$LOG_DIR/monitor.log" 2>&1 &
MONITOR_PID=$!

# 3. Every 30 mins: report status
while true; do
    sleep 1800
    
    # Read state
    if [ -f state.json ]; then
        TRADES=$(cat state.json | grep -o '"totalTrades":[0-9]*' | cut -d: -f2 || echo "0")
        PROFIT=$(cat state.json | grep -o '"totalProfit":[0-9.\-]*' | cut -d: -f2 || echo "0")
        EARNINGS=$(cat state.json | grep -o '"earnings":[0-9.\-]*' | cut -d: -f2 || echo "0")
        
        echo "[$(date)] NOSYT STATUS: Trades=$TRADES PnL=\$$PROFIT Work=\$$EARNINGS" >> "$LOG_DIR/overnight.log"
        
        # Send notification if significant profit
        if (( $(echo "$PROFIT > 1" | bc -l) )); then
            echo "🚀 PROFIT ALERT: NOSYT earned \$$PROFIT" >> "$LOG_DIR/overnight.log"
        fi
    fi
    
    # Check git for updates from subagents
    cd "$WORKSPACE"
    git add -A 2>/dev/null
    git commit -m "NOSYT auto-update: $DATE" 2>/dev/null
done
