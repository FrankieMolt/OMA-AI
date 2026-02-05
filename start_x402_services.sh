#!/bin/bash
"""
OMA-AI x402 Treasury Service Startup Script
"""

# Set environment variables
export TREASURY_PRIVATE_KEY="${TREASURY_PRIVATE_KEY:-$(cat ~/FRANKIE_TREASURY_PRIVATE_KEY.txt 2>/dev/null)}"
export TREASURY_WALLET="${TREASURY_WALLET:-0x590FdA238A52bBA79fD4635e73bDAC1eAe558e784}"

# Check if wallet key exists
if [ -z "$TREASURY_PRIVATE_KEY" ]; then
    echo "❌ Error: Treasury private key not found"
    echo "Please set TREASURY_PRIVATE_KEY environment variable or create ~/FRANKIE_TREASURY_PRIVATE_KEY.txt"
    exit 1
fi

echo "🚀 Starting OMA-AI x402 Treasury Service..."
echo "📊 Treasury Wallet: $TREASURY_WALLET"
echo "🌐 Base Network: https://basescan.org/address/$TREASURY_WALLET"

# Start the service
cd /home/nosyt/.openclaw/workspace
source venv/bin/activate

# Check if dependencies are installed
if [ ! -f "venv/lib/python3.12/site-packages/fastapi" ] || [ ! -f "venv/lib/python3.12/site-packages/httpx" ] || [ ! -f "venv/lib/python3.12/site-packages/web3" ] || [ ! -f "venv/lib/python3.12/site-packages/eth_account" ]; then
    echo "📦 Installing dependencies..."
    pip install fastapi httpx web3 eth-account uvicorn
fi

# Start the service
echo "🔧 Treasury service starting on port 8001..."
python3 x402_treasury_system.py &
TREASURY_PID=$!

echo "🔧 Whitelabel SDK service starting on port 8002..."
python3 whitelabel_sdk.py &
SDK_PID=$!

echo "✅ Services started:"
echo "   Treasury: http://localhost:8001 (PID: $TREASURY_PID)"
echo "   Whitelabel SDK: http://localhost:8002 (PID: $SDK_PID)"
echo "📊 Monitor balances and commissions at:"
echo "   Treasury: http://localhost:8001/balance"
echo "   Commissions: http://localhost:8001/commissions"
echo "   Provider Catalog: http://localhost:8001/providers"
echo ""
echo "🎯 Ready for OMA-AI integration!"
echo "🔄 Use Ctrl+C to stop services"

# Cleanup on exit
cleanup() {
    echo "🛑 Stopping services..."
    kill $TREASURY_PID 2>/dev/null
    kill $SDK_PID 2>/dev/null
    exit 0
}

# Setup cleanup trap
trap cleanup EXIT INT TERM

# Wait for services to initialize
sleep 5

# Keep script running
wait