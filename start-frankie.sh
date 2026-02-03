#!/bin/bash
# Start all Frankie Ecosystem services

WORKSPACE="/home/nosyt/.openclaw/workspace"
LOG_DIR="/tmp/frankie-logs"
mkdir -p "$LOG_DIR"

echo "🦞 Starting Frankie Ecosystem..."

# Function to kill port
kill_port() {
  local port=$1
  local pid=$(netstat -tlnp 2>/dev/null | grep ":$port " | awk '{print $7}' | cut -d'/' -f1)
  if [ ! -z "$pid" ]; then
    echo "Killing process on port $port (PID: $pid)"
    kill -9 $pid 2>/dev/null
  fi
}

# Cleanup existing services
echo "Cleaning up..."
for port in 4020 4030 4050 4060 4070; do
  kill_port $port
done

# Start Conway Agents (4030)
echo "Starting Conway Agents (4030)..."
cd "$WORKSPACE" && nohup python3 frankie-conway-agent.py > "$LOG_DIR/conway.log" 2>&1 &
sleep 2

# Start Marketplace (4050)
echo "Starting Marketplace (4050)..."
cd "$WORKSPACE" && nohup python3 frankie-marketplace-service.py > "$LOG_DIR/marketplace.log" 2>&1 &
sleep 2

# Start Orchestrator (4060)
echo "Starting Orchestrator (4060)..."
# Use --break-system-packages for docker if needed, handled in python script gracefully now
cd "$WORKSPACE" && nohup python3 frankie-self-sustaining-agent.py --api --port 4060 > "$LOG_DIR/orchestrator.log" 2>&1 &
sleep 2

# Start OpenClaw Integration (4070)
echo "Starting OpenClaw Integration (4070)..."
cd "$WORKSPACE" && nohup python3 frankie-openclaw-integration.py --api --port 4070 > "$LOG_DIR/openclaw.log" 2>&1 &
sleep 2

# Start API Gateway (4020)
echo "Starting API Gateway (4020)..."
cd "$WORKSPACE" && nohup python3 frankie-api.py > "$LOG_DIR/api.log" 2>&1 &
sleep 3

# Start Spawner (Background)
echo "Starting Spawner Worker..."
cd "$WORKSPACE" && nohup python3 frankie-real-spawner.py > "$LOG_DIR/spawner.log" 2>&1 &

echo "✅ All services started!"
echo "logs at $LOG_DIR"

# Check Health
echo "--- Health Check ---"
curl -s http://localhost:4020/api/health/complete | python3 -m json.tool || cat "$LOG_DIR/api.log"
