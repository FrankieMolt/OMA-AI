#!/bin/bash
set -e

echo "🚀 LAUNCHING NOSYT ADVANCED AUTONOMOUS TRADING BOT"
echo "=================================================="

# STEP 1: Verify wallet
echo -e "\n📋 Step 1: Wallet Check"
echo "Address: $(jq -r .address ~/.automaton/wallet.json)"
echo "Net: Base Mainnet"

# STEP 2: Environment
echo -e "\n📋 Step 2: Environment Setup"
export CONWAY_API_KEY="cnwy_k_cybH-gN33EDJYlpwh-iUJIp9-6EDdBtx"
export CONWAY_API_URL="https://api.conway.tech"
export NODE_ENV="production"

# STEP 3: Verify skills
echo -e "\n📋 Step 3: Skills Check ($(ls -1 ~/.openclaw/agents/skills | wc -l) skills)"
ls ~/.openclaw/agents/skills | head -10

# STEP 4: Launch
echo -e "\n🚀 Step 4: Launching Automaton..."
cd /home/nosyt/.openclaw/workspace/automaton

# Clear old state
rm -f ~/nosyt-output.log

node dist/index.js --run 2>&1 | tee ~/nosyt-output.log &
PID=$!

# Wait for bootstrap
echo "Waiting for startup (10s)..."
sleep 10

# Check if skills loaded
if grep -q "Loaded" ~/nosyt-output.log; then
    SKILLS=$(grep "Loaded" ~/nosyt-output.log | tail -1)
    echo -e "\n✅ SUCCESS! $SKILLS"
    echo "PID: $PID"
    echo "Logs: tail -f ~/nosyt-output.log"
    echo -e "\n🔥 NOSYT is now running autonomously!"
    echo "💰 Trading SOL (\$84.62), BTC, ETH, BONK"
    echo "🎲 Polymarket AI active"
    echo "📊 Self-improving & learning"
else
    echo "⚠️  Warning: Skills may not have loaded correctly"
    echo "Check logs: tail -50 ~/nosyt-output.log"
fi

wait $PID