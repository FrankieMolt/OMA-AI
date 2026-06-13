#!/bin/bash
# OMA-AI COMPLETE SETUP SCRIPT
# Run this after configuring .env.local

echo "🚀 OMA-AI Complete Setup"
echo "========================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local not found!"
    echo "Copy .env.example to .env.local and fill in your keys"
    exit 1
fi

# Load environment
source .env.local

echo "Step 1: Installing dependencies..."
npm install

echo ""
echo "Step 2: Building project..."
npm run build

echo ""
echo "Step 3: Running tests..."
npx playwright test tests/oma-ai-full.spec.ts --reporter=line

echo ""
echo "Step 4: Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Setup Complete!"
echo "Site: https://oma-ai.com"
echo ""