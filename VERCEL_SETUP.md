#!/bin/bash
# Vercel Deployment Helper
# Add these secrets to https://github.com/NosytLabs/OMA-AI/settings/secrets/actions
#
# 1. VERCEL_TOKEN   → vercel.com/account/tokens (format: ncp_...)
# 2. VERCEL_ORG_ID  → team_o2xBKRJm2RldM5qyhnW2NNAt
# 3. VERCEL_PROJECT_ID → prj_9B9CcPuYXD7HLIAiTHnKbejQlIvM

echo "⚠️  Vercel deploy not configured — secrets needed"
echo ""
echo "Go to: https://github.com/NosytLabs/OMA-AI/settings/secrets/actions"
echo "Add these repository secrets:"
echo ""
echo "  VERCEL_TOKEN       = ncp_...    (from vercel.com/account/tokens)"
echo "  VERCEL_ORG_ID     = team_o2xBKRJm2RldM5qyhnW2NNAt"
echo "  VERCEL_PROJECT_ID = prj_9B9CcPuYXD7HLIAiTHnKbejQlIvM"
echo ""
echo "To create Vercel token:"
echo "  vercel.com/account/tokens → Create Token → name it 'GitHub-Actions' → copy the ncp_... value"
echo ""
echo "After adding secrets, push any commit to trigger auto-deploy."
