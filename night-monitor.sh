#!/bin/bash
# Night Monitor Script for All Sites
# Runs every 2 hours overnight

DATE=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="/home/nosyt/.openclaw/workspace/logs/night-monitor.log"

# Create logs directory if not exists
mkdir -p /home/nosyt/.openclaw/workspace/logs

echo "[$DATE] Night Monitor Starting..." >> $LOG_FILE

# Check SpendThrone (port 3000)
echo "Checking SpendThrone (3000)..." >> $LOG_FILE
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✅ SpendThrone OK" >> $LOG_FILE
else
    echo "❌ SpendThrone DOWN (HTTP $HTTP_CODE)" >> $LOG_FILE
fi

# Check OMA-AI (port 3001)
echo "Checking OMA-AI (3001)..." >> $LOG_FILE
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001)
if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✅ OMA-AI OK" >> $LOG_FILE
else
    echo "❌ OMA-AI DOWN (HTTP $HTTP_CODE)" >> $LOG_FILE
fi

# Check Lethometry (port 3002)
echo "Checking Lethometry (3002)..." >> $LOG_FILE
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002)
if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✅ Lethometry OK" >> $LOG_FILE
else
    echo "❌ Lethometry DOWN (HTTP $HTTP_CODE)"" >> $LOG_FILE
fi

# Check disk space
DISK_USAGE=$(df /home/nosyt | tail -1 | awk '{print $5}' | cut -d'%' -f1)
echo "Disk Usage: $DISK_USAGE%" >> $LOG_FILE
if [ ${DISK_USAGE%.*} -gt 80 ]; then
    echo "⚠️  WARNING: Disk space high ($DISK_USAGE%)" >> $LOG_FILE
fi

# Check memory usage
MEM_USAGE=$(free | grep Mem | awk '{printf "%.1f", ($3/$2) * 100}')
echo "Memory Usage: $MEM_USAGE%" >> $LOG_FILE
if [ ${MEM_USAGE%.*} -gt 90 ]; then
    echo "⚠️  WARNING: Memory usage high ($MEM_USAGE%)" >> $LOG_FILE
fi

echo "[$DATE] Night Monitor Complete" >> $LOG_FILE
echo "---" >> $LOG_FILE
