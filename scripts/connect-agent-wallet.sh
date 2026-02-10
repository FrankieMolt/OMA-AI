#!/bin/bash

# OMA-AI AgentWallet Connection Script
# Automates the OTP process for connecting a server-side wallet

API_BASE="https://agentwallet.mcpay.tech/api"
CONFIG_FILE="$HOME/.agentwallet/config.json"

mkdir -p "$(dirname "$CONFIG_FILE")"

if [ -f "$CONFIG_FILE" ]; then
    echo "🧟 Frankie: Wallet config found. Re-connecting..."
fi

echo "--- AGENT WALLET CONNECTION ---"
read -p "Enter MASTA Email: " EMAIL

# Step 1: Start Connection
echo "Initiating connection for $EMAIL..."
START_RES=$(curl -s -X POST "$API_BASE/connect/start" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$EMAIL\"}")

USERNAME=$(echo $START_RES | jq -r '.data.username')

if [ "$USERNAME" == "null" ] || [ -z "$USERNAME" ]; then
    echo "❌ Error starting connection: $START_RES"
    exit 1
fi

echo "✅ OTP sent to $EMAIL"
echo "Assigned Username: $USERNAME"
echo ""

# Step 2: Ask for OTP
read -p "Enter 6-digit OTP from email: " OTP

# Step 3: Complete Connection
echo "Finalizing connection..."
COMPLETE_RES=$(curl -s -X POST "$API_BASE/connect/complete" \
    -H "Content-Type: application/json" \
    -d "{\"username\":\"$USERNAME\",\"email\":\"$EMAIL\",\"otp\":\"$OTP\"}")

API_TOKEN=$(echo $COMPLETE_RES | jq -r '.data.apiToken')

if [ "$API_TOKEN" == "null" ] || [ -z "$API_TOKEN" ]; then
    echo "❌ Error completing connection: $COMPLETE_RES"
    exit 1
fi

# Save config
echo $COMPLETE_RES | jq '.data' > "$CONFIG_FILE"
chmod 600 "$CONFIG_FILE"

echo "--- CONNECTION COMPLETE ---"
echo "🧟 Frankie: MASTA, we are connected. Wallet is active."
echo "Config saved to: $CONFIG_FILE"
echo "Addresses:"
echo "  EVM: $(echo $COMPLETE_RES | jq -r '.data.evmAddress')"
echo "  SOL: $(echo $COMPLETE_RES | jq -r '.data.solanaAddress')"
