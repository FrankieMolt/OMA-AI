#!/bin/bash
# Deploy OMA-AI to Vercel (Frontend + Backend)

echo "🚀 Deploying OMA-AI to Vercel..."

# Check Vercel login
if ! vercel whoami &>/dev/null; then
    echo "❌ Please login first: vercel login"
    exit 1
fi

# Link to existing project or create new
vercel link --yes

# Deploy frontend
echo "📦 Deploying frontend..."
vercel --prod --yes

# Get deployment URL
FRONTEND_URL=$(vercel ls --json | jq -r '.[0].url')
echo "✅ Frontend deployed: https://$FRONTEND_URL"

# Deploy backend as serverless function
echo "📦 Deploying backend..."
cd api
vercel --prod --yes
BACKEND_URL=$(vercel ls --json | jq -r '.[0].url')

cd ..
echo "✅ Backend deployed: https://$BACKEND_URL"

echo ""
echo "🎉 Deployment complete!"
echo "Frontend: https://$FRONTEND_URL"
echo "Backend:  https://$BACKEND_URL"
