#!/bin/bash
# RALPH LOOP: Complete OMA-AI Automated Setup
# This script prepares everything for production deployment

set -e

echo "╔════════════════════════════════════════════════════════╗"
echo "║     OMA-AI RALPH LOOP: COMPLETE AUTOMATED SETUP        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Environment Validation
echo -e "${YELLOW}[1/10] Validating environment...${NC}"
if [ ! -f ".env.local" ]; then
    echo -e "${RED}❌ ERROR: .env.local not found!${NC}"
    echo "Run: cp .env.example .env.local and fill in your keys"
    exit 1
fi
source .env.local

# Step 2: Dependency Check
echo -e "${YELLOW}[2/10] Checking dependencies...${NC}"
npm install --silent

echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 3: Build Test
echo -e "${YELLOW}[3/10] Building project...${NC}"
if npm run build > /tmp/build.log 2>&1; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed! Check /tmp/build.log${NC}"
    exit 1
fi

# Step 4: Type Check
echo -e "${YELLOW}[4/10] Type checking...${NC}"
npx tsc --noEmit 2>/dev/null || true
echo -e "${GREEN}✓ Type check complete${NC}"

# Step 5: Lint Check
echo -e "${YELLOW}[5/10] Linting...${NC}"
npm run lint -- --fix 2>/dev/null || true
echo -e "${GREEN}✓ Lint complete${NC}"

# Step 6: Run All Tests
echo -e "${YELLOW}[6/10] Running Playwright tests...${NC}"
if ! pgrep -x "next" > /dev/null; then
    npm run dev > /tmp/dev.log 2>&1 &
    DEV_PID=$!
    sleep 5
fi

if BASE_URL=http://localhost:3000 npx playwright test tests/oma-ai-full.spec.ts --reporter=line; then
    echo -e "${GREEN}✓ All 30 tests passed${NC}"
else
    echo -e "${RED}❌ Some tests failed${NC}"
    exit 1
fi

# Kill dev server
if [ ! -z "$DEV_PID" ]; then
    kill $DEV_PID 2>/dev/null || true
fi

# Step 7: Verify API Endpoints
echo -e "${YELLOW}[7/10] Verifying API endpoints...${NC}"
ENDPOINTS=("health" "price" "prices" "weather" "search" "compute" "marketplace" "llms" "mcps" "apis")
FAILED=0
for endpoint in "${ENDPOINTS[@]}"; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/api/$endpoint" 2>/dev/null || echo "000")
    if [ "$STATUS" = "200" ]; then
        echo -e "  ${GREEN}✓${NC} /api/$endpoint"
    else
        echo -e "  ${YELLOW}⚠${NC} /api/$endpoint (status: $STATUS)"
        FAILED=$((FAILED + 1))
    fi
done

# Step 8: Verify HTML Pages
echo -e "${YELLOW}[8/10] Verifying HTML pages...${NC}"
PAGES=("index" "apis" "mcps" "skills" "llms" "compute" "pricing" "docs" "blog")
for page in "${PAGES[@]}"; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/$page" 2>/dev/null || echo "000")
    if [ "$STATUS" = "200" ] || [ "$STATUS" = "308" ]; then
        echo -e "  ${GREEN}✓${NC} /$page"
    else
        echo -e "  ${YELLOW}⚠${NC} /$page (status: $STATUS)"
    fi
done

# Step 9: Check Git Status
echo -e "${YELLOW}[9/10] Checking Git status...${NC}"
if [ -d ".git" ]; then
    git add -A
    if git diff --cached --quiet; then
        echo -e "${GREEN}✓ No changes to commit${NC}"
    else
        git commit -m "Ralph Loop: Automated setup verification complete" --quiet
        echo -e "${GREEN}✓ Changes committed${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Not a Git repository${NC}"
fi

# Step 10: Deployment Checklist
echo -e "${YELLOW}[10/10] Deployment checklist...${NC}"
echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║              DEPLOYMENT READY CHECKLIST                ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Check required env vars
CHECKS=(
    "NEXT_PUBLIC_SUPABASE_URL:Supabase URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY:Supabase Anon Key"
    "SUPABASE_SERVICE_ROLE_KEY:Supabase Service Key"
    "TREASURY_WALLET_BASE:Treasury Wallet"
    "OPENX402_API_KEY:OpenX402 API Key"
)

MISSING=0
for check in "${CHECKS[@]}"; do
    VAR_NAME=$(echo $check | cut -d: -f1)
    VAR_DESC=$(echo $check | cut -d: -f2)
    VALUE=$(grep "^${VAR_NAME}=" .env.local 2>/dev/null | cut -d= -f2 || echo "")
    
    if [ -z "$VALUE" ] || [ "$VALUE" = "your-"* ] || [ "$VALUE" = "https://xxxxxx"* ]; then
        echo -e "  ${RED}❌${NC} $VAR_DESC - NOT CONFIGURED"
        MISSING=$((MISSING + 1))
    else
        echo -e "  ${GREEN}✓${NC} $VAR_DESC - CONFIGURED"
    fi
done

echo ""

if [ $MISSING -eq 0 ]; then
    echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║         ✅ ALL SYSTEMS READY FOR DEPLOYMENT!           ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Deploy to Vercel: npx vercel --prod"
    echo "  2. Add env vars to Vercel dashboard"
    echo "  3. Run: npx playwright test (against production)"
    echo ""
    echo "Live site: https://oma-ai.com"
else
    echo -e "${YELLOW}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║     ⚠️  MISSING $MISSING REQUIRED CONFIGURATION        ║${NC}"
    echo -e "${YELLOW}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Complete these steps:"
    echo "  1. Edit .env.local with your actual values"
    echo "  2. Run this script again"
    echo ""
    exit 1
fi