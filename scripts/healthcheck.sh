#!/bin/bash
# System Health Check

echo "🧟‍♂️ Checking Health Status..."

# Check if PM2 is running
if pgrep -q "PM2" > /dev/null 2>&1; then
    echo "✅ PM2 Process Manager is running."
else
    echo "❌ PM2 Process Manager is NOT running. Starting..."
    pm2 resurrect || echo "Failed to resurrect PM2."
fi

# Check Node.js processes on ports 3000, 3001, 3002
echo "Checking Ports..."
if netstat -tuln | grep ':3000 ' > /dev/null 2>&1; then
    echo "✅ OMA-AI (3000) is RUNNING."
else
    echo "❌ OMA-AI (3000) is NOT running."
fi

if netstat -tuln | grep ':3001 ' > /dev/null 2>&1; then
    echo "✅ SpendThrone (3001) is RUNNING."
else
    echo "❌ SpendThrone (3001) is NOT running."
fi

if netstat -tuln | grep ':3002 ' > /dev/null 2>&1; then
    echo "✅ Lethometry (3002) is RUNNING."
else
    echo "❌ Lethometry (3002) is NOT running."
fi

echo ""
echo "🧟‍♂️ Health Check Complete."
echo "Next: Proceed with research, development, or cleanup tasks."
