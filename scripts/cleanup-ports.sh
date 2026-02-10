#!/bin/bash
# Port cleanup script - Kills zombie processes blocking development ports

echo "🧹 Cleaning up development ports..."

# Define ports to clean
PORTS=(3000 3001 3002)

for port in "${PORTS[@]}"; do
    echo "Checking port $port..."
    PID=$(lsof -ti:$port -sTCP:LISTEN 2>/dev/null)
    if [ ! -z "$PID" ]; then
        echo "  ✗ Port $port is in use by PID $PID"
        echo "  🗑️  Killing process $PID..."
        kill -9 $PID 2>/dev/null
        sleep 1
        echo "  ✅ Port $port is now free"
    else
        echo "  ✓ Port $port is free"
    fi
done

echo ""
echo "✅ Port cleanup complete!"
echo "Starting PM2 services..."
pm2 start ecosystem.config.js
