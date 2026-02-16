#!/bin/bash
# Frankie's Boot Recovery Script
# Ensures all services start on boot

LOG="/home/nosyt/.openclaw/workspace/logs/boot-recovery.log"
echo "$(date) - Boot recovery started" >> $LOG

# Wait for network
sleep 10

# Check PM2 status
if ! pgrep -f "PM2" > /dev/null; then
    echo "$(date) - PM2 not running, starting..." >> $LOG
    pm2 resurrect >> $LOG 2>&1
fi

# Ensure all services are running
cd /home/nosyt/.openclaw/workspace

# Start LobsterBoard if not running
if ! pm2 list | grep -q "lobsterboard.*online"; then
    echo "$(date) - Starting LobsterBoard..." >> $LOG
    cd lobsterboard && pm2 start server.cjs --name lobsterboard
fi

# Check all sites
for site in oma-ai spendthrone lethometry; do
    if ! pm2 list | grep -q "$site.*online"; then
        echo "$(date) - Starting $site..." >> $LOG
        pm2 start $site 2>> $LOG || echo "Failed to start $site" >> $LOG
    fi
done

# Start OpenClaw gateway if not running
if ! pgrep -f "openclaw gateway" > /dev/null; then
    echo "$(date) - Starting OpenClaw gateway..." >> $LOG
    cd /home/nosyt/.openclaw
    nohup openclaw gateway > logs/gateway.log 2>&1 &
fi

echo "$(date) - Boot recovery complete" >> $LOG
