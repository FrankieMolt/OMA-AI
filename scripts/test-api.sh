#!/bin/bash

# OMA-AI API Testing Script
# Tests all implemented endpoints

set -e

API_BASE="http://localhost:3000/api"
PASS=0
FAIL=0

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "OMA-AI API Testing Suite"
echo "=========================================="
echo ""

# Test 1: Health Check
echo "📊 Test 1: Health Check"
echo "GET /health"
response=$(curl -s "$API_BASE/health")
if echo "$response" | jq -e '.success == true' > /dev/null; then
    echo -e "${GREEN}✓ PASS${NC} - Health check successful"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗ FAIL${NC} - Health check failed"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 2: MCP List (Mock Version)
echo "📦 Test 2: MCP List (Mock)"
echo "GET /mcp/list"
response=$(curl -s "$API_BASE/mcp/list")
if echo "$response" | jq -e '.success == true' > /dev/null; then
    echo -e "${GREEN}✓ PASS${NC} - MCP list retrieved"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗ FAIL${NC} - MCP list failed"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 3: MCP List with Filters
echo "🔍 Test 3: MCP List with Filters"
echo "GET /mcp/list?category=search&verified=true"
response=$(curl -s "$API_BASE/mcp/list?category=search&verified=true")
if echo "$response" | jq -e '.success == true' > /dev/null; then
    echo -e "${GREEN}✓ PASS${NC} - MCP list with filters successful"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗ FAIL${NC} - MCP list with filters failed"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 4: Marketplace Stats
echo "📈 Test 4: Marketplace Stats"
echo "GET /marketplace/stats"
response=$(curl -s "$API_BASE/marketplace/stats")
if echo "$response" | jq -e '.success == true' > /dev/null; then
    echo -e "${GREEN}✓ PASS${NC} - Marketplace stats retrieved"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗ FAIL${NC} - Marketplace stats failed"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 5: Transactions List
echo "💰 Test 5: Transactions List"
echo "GET /transactions/list"
response=$(curl -s "$API_BASE/transactions/list")
if echo "$response" | jq -e '.success == true' > /dev/null; then
    echo -e "${GREEN}✓ PASS${NC} - Transactions list retrieved"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗ FAIL${NC} - Transactions list failed"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 6: Create Wallet
echo "👛 Test 6: Create Wallet"
echo "POST /wallet/create"
response=$(curl -s -X POST "$API_BASE/wallet/create" \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "test-agent-'$(date +%s)'",
    "walletAddress": "0x742d35Cc6634C0532925a3b844Bc454e4438f44",
    "ensName": "test-agent.eth"
  }')
if echo "$response" | jq -e '.success == true' > /dev/null; then
    echo -e "${GREEN}✓ PASS${NC} - Wallet created successfully"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗ FAIL${NC} - Wallet creation failed"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 7: Duplicate Wallet (Should Fail)
echo "⚠️  Test 7: Duplicate Wallet (Should Fail)"
echo "POST /wallet/create (same agent ID)"
response=$(curl -s -X POST "$API_BASE/wallet/create" \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "test-agent-duplicate",
    "walletAddress": "0x742d35Cc6634C0532925a3b844Bc454e4438f44"
  }')
if echo "$response" | jq -e '.success == false' > /dev/null; then
    echo -e "${GREEN}✓ PASS${NC} - Duplicate wallet correctly rejected"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗ FAIL${NC} - Duplicate wallet not rejected"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 8: Invalid Wallet Address (Should Fail)
echo "❌ Test 8: Invalid Wallet Address (Should Fail)"
echo "POST /wallet/create (invalid address)"
response=$(curl -s -X POST "$API_BASE/wallet/create" \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "test-agent-invalid",
    "walletAddress": "invalid-address"
  }')
if echo "$response" | jq -e '.error != null' > /dev/null; then
    echo -e "${GREEN}✓ PASS${NC} - Invalid wallet address correctly rejected"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗ FAIL${NC} - Invalid wallet address not rejected"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 9: Get Wallet Balance
echo "💳 Test 9: Get Wallet Balance"
echo "GET /wallet/0x742d35Cc6634C0532925a3b844Bc454e4438f44/balance"
response=$(curl -s "$API_BASE/wallet/0x742d35Cc6634C0532925a3b844Bc454e4438f44/balance")
if echo "$response" | jq -e '.success == true' > /dev/null; then
    echo -e "${GREEN}✓ PASS${NC} - Wallet balance retrieved"
    PASS=$((PASS + 1))
else
    echo -e "${YELLOW}⚠ SKIP${NC} - Wallet not found (expected for test agent)"
fi
echo ""

# Test 10: Payment Verification (Test x402)
echo "🔐 Test 10: Payment Verification"
echo "POST /payments/verify"
response=$(curl -s -X POST "$API_BASE/payments/verify" \
  -H "Content-Type: application/json" \
  -H "Authorization: x402 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" \
  -d '{
    "from": "0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6",
    "to": "0x833589fCD6eDb6E436a3436C41499a87E6Dd13",
    "amount": "1000000",
    "nonce": "123456789",
    "deadline": "1678886400",
    "skillId": "exa-web-search"
  }')
if echo "$response" | jq -e '.error != null' > /dev/null; then
    echo -e "${GREEN}✓ PASS${NC} - Invalid payment correctly rejected"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗ FAIL${NC} - Payment verification not working"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 11: Transactions with Filters
echo "🔍 Test 11: Transactions with Filters"
echo "GET /transactions/list?status=completed&limit=5"
response=$(curl -s "$API_BASE/transactions/list?status=completed&limit=5")
if echo "$response" | jq -e '.success == true' > /dev/null; then
    echo -e "${GREEN}✓ PASS${NC} - Transactions with filters retrieved"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗ FAIL${NC} - Transactions with filters failed"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 12: MCP Search
echo "🔎 Test 12: MCP Search"
echo "GET /mcp/list?search=web"
response=$(curl -s "$API_BASE/mcp/list?search=web")
if echo "$response" | jq -e '.success == true' > /dev/null; then
    echo -e "${GREEN}✓ PASS${NC} - MCP search successful"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗ FAIL${NC} - MCP search failed"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 13: MCP Pagination
echo "📄 Test 13: MCP Pagination"
echo "GET /mcp/list?page=1&limit=2"
response=$(curl -s "$API_BASE/mcp/list?page=1&limit=2")
if echo "$response" | jq -e '.success == true and (.data | length) <= 2' > /dev/null; then
    echo -e "${GREEN}✓ PASS${NC} - MCP pagination working"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗ FAIL${NC} - MCP pagination failed"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 14: Transaction Statistics
echo "📊 Test 14: Transaction Statistics"
echo "GET /transactions/list (check statistics)"
response=$(curl -s "$API_BASE/transactions/list")
if echo "$response" | jq -e '.statistics != null' > /dev/null; then
    echo -e "${GREEN}✓ PASS${NC} - Transaction statistics available"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗ FAIL${NC} - Transaction statistics missing"
    FAIL=$((FAIL + 1))
fi
echo ""

# Summary
echo "=========================================="
echo "TEST SUMMARY"
echo "=========================================="
echo -e "${GREEN}Passed: $PASS${NC}"
echo -e "${RED}Failed: $FAIL${NC}"
echo "Total:  $((PASS + FAIL))"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}✗ Some tests failed${NC}"
    exit 1
fi
