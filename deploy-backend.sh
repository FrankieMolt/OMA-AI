#!/bin/bash
# Deploy OMA-AI Backend to Railway

echo "🚀 Deploying OMA-AI Backend..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Install with: npm install -g @railway/cli"
    exit 1
fi

# Login to Railway
railway login

# Create new project
railway init

# Add PostgreSQL service
railway add postgresql

# Set environment variables
railway variables set DATABASE_URL=$DATABASE_URL
railway variables set SUPABASE_URL=$SUPABASE_URL
railway variables set SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
railway variables set OPENROUTER_API_KEY=$OPENROUTER_API_KEY
railway variables set X402_TREASURY_WALLET=$X402_TREASURY_WALLET

# Deploy
railway up

echo "✅ Backend deployed! Get URL with: railway domain"
