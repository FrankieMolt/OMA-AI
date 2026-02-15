#!/usr/bin/env bash
# Claim BSV faucet daily for the OpenClaw BSV wallet
# Requires jq to parse JSON and curl for HTTP request

WALLET_FILE="$HOME/.openclaw/bsv-wallet.json"
if [[ ! -f "$WALLET_FILE" ]]; then
  echo "Wallet file not found at $WALLET_FILE"
  exit 1
fi

ADDRESS=$(jq -r '.address' "$WALLET_FILE")
if [[ -z "$ADDRESS" || "$ADDRESS" == "null" ]]; then
  echo "Could not extract address from wallet file"
  exit 1
fi

# Faucet endpoint (as per skill README)
FAUCET_URL="https://faucet.axiemaid.com/claim"

RESPONSE=$(curl -s -X POST "$FAUCET_URL" \
  -H "Content-Type: application/json" \
  -d "{\"address\": \"$ADDRESS\"}")

echo "Faucet claim response: $RESPONSE"
