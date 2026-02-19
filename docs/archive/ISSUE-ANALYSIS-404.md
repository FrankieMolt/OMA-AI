# ROOT CAUSE ANALYSIS - SpendThrone 404s

## Problem
Product pages return 404 on production

## Root Cause
With `trailingSlash: true`, Next.js export creates:
- Directories: `out/product/slug/` (empty, only metadata)
- HTML files: `out/product/slug.html` (actual content)

But the directories do NOT contain `index.html`, so clean URLs fail.

## Solution Applied
Created `vercel.json` with rewrite rules:
```json
{
  "src": "/product/(.*)",
  "dest": "/product/$1.html"
}
```

This rewrites `/product/slug` → `/product/slug.html`

## Status
✅ Fix created locally
❌ Need deployment to apply

## To Complete
Run: vercel login && ./DEPLOY.sh
