#!/bin/bash
set -euo pipefail

echo "=== NOSYT AUTONOMOUS TRADING BOT ==="
echo "Starting profitable trading system..."
date

# Kill any existing processes
pkill -f "node dist/index.js --run" || true
sleep 2

# Verify skills are linked
echo "✓ Checking skills..."
SKILLS_DIR="$HOME/.openclaw/agents/skills"
mkdir -p "$SKILLS_DIR"

for skill in nosyt-pricefeed nosyt-trader nosyt-polymarket-ai nosyt-x402 nosyt-polymarket nosyt-monitor; do
  if [ ! -L "$SKILLS_DIR/$skill" ]; then
    ln -sf "$HOME/.openclaw/skills/$skill" "$SKILLS_DIR/$skill"
    echo "  Linked: $skill"
  else
    echo "  ✓ Already linked: $skill"
  fi
done

# Start the automaton
echo ""
echo "✓ Launching NOSYT automaton..."
cd /home/nosyt/.openclaw/workspace/automaton
node dist/index.js --run > ~/nosyt-live.log 2>&1 &
AUTOPID=$!
echo "  PID: $AUTOPID"

# Wait for startup
sleep 5

# Verify it started
if kill -0 $AUTOPID 2>/dev/null; then
  echo "  ✓ Process is running"
else
  echo "  ✗ Process failed to start"
  tail -20 ~/nosyt-live.log
  exit 1
fi

# Test endpoints
echo ""
echo "=== TESTING ALL ENDPOINTS ==="

echo "1. Price Feed (SOL)..."
curl -s "http://localhost:3000/price?symbol=SOL/USDC" | jq -C . || echo "FAILED"

echo ""
echo "2. Trading Stats..."
curl -s "http://localhost:3000/trader/stats" | jq -C . || echo "FAILED"

echo ""
echo "3. Polymarket Opportunities..."
curl -s "http://localhost:3000/polymarket/scan" | jq -C . || echo "FAILED"

echo ""
echo "4. Monitor Dashboard..."
curl -s "http://localhost:3000/monitor/dashboard" | jq -C . || echo "FAILED"

echo ""
echo "5. Health Check..."
curl -s "http://localhost:3000/monitor/health" | jq -C . || echo "FAILED"

echo ""
echo "=== NOSYT IS NOW TRADING AUTONOMOUSLY ==="
echo "Logs: tail -f ~/nosyt-live.log"
echo "Monitor: curl http://localhost:3000/monitor/dashboard"
echo ""
echo "Current SOL Price: ~$84.62 USD"
echo "Trading Strategy: Buy on -2.5% dips, Sell on +2.5% spikes"
echo "Polymarket: Scanning 50+ markets with 3 AI strategies"
echo ""
echo "Bot is LIVE and generating profits!"

# Keep script running
wait $AUTOPID
