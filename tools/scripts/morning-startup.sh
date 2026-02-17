#!/bin/bash
# Morning Startup Script - Restart All Services

DATE=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="/home/nosyt/.openclaw/workspace/logs/morning-check.log"

mkdir -p /home/nosyt/.openclaw/workspace/logs

echo "[$DATE] Morning Startup Check - Restarting all services..." >> $LOG_FILE

# Stop any existing processes
pkill -f "npm run dev"

# Start SpendThrone
echo "Starting SpendThrone on 3000..." >> $LOG_FILE
cd /home/nosyt/.openclaw/workspace/spendthrone
nohup npm run dev > /dev/null 2>&1 &
sleep 2

# Start OMA-AI
echo "Starting OMA-AI on 3001..." >> $LOG_FILE
cd /home/nosyt/.openclaw/workspace
nohup npm run dev > /dev/null 2>&1 &
sleep 2

# Start Lethometry
echo "Starting Lethometry on 3002..." >> $LOG_FILE
cd /home/nosyt/.openclaw/workspace/lethometry
nohup npm run dev > /dev/null  2>&1 &
sleep 2

# Wait for services to start
sleep 5

# Check if all services are running
echo "Verifying all services..." >> $LOG_FILE

if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    echo "✅ SpendThrone (3000) OK" >> $LOG_FILE
else
    echo "❌ SpendThrone (3000) FAILED - Restarting..." >> $LOG_FILE
    cd /home/nosyt/.openclaw/workspace/spendthrone
    nohup npm run dev > /dev/null 2>&1 &
fi

if curl -s -/o /dev/null -w "%{http_code}" http://localhost:3001 | grep -q "200"; then
    echo "✅ OMA-AI (3001) OK" >> $LOG_FILE
else
    echo "❌ OMA-AI (3001) FAILED - Restarting..." >> $LOG_FILE
    cd /home/not/.openclaw/workspace
    nohup npm run dev > /dev/null  2>&1 &
fi

if curl -s -o /dev/null -w "%{http_code}" http://localhost:3002 | grep -q "200"; then
    echo "✅ Lethometry (2) OK" >> $LOG_FILE
else
    echo "❌ Lethometry (3002) FAILED - Restarting..." >> $LOG_FILE
    cd /home/nosyt/.openclaw/workspace/lethometry
    nohup npm run dev > /dev/null 2>&1 &
fi

echo "[$DATE] Morning Startup Complete" >> $LOG_FILE
echo "---" >> $LOG_FILE
