# STATIC SITE EXPORT PLAN

## Goal
Export Lethometry and SpendThrone as static sites (no Next.js server required) for deployment to Coolify on Linux PC.

## Static Export Requirements

### Next.js Static Export Configuration
Add to next.config.js:
```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}
```

### Changes Required

**Lethometry (port 3002):**
- Remove all server-side features (API routes, server components)
- Convert to client-side only
- Add `output: 'export'` to next.config.js
- Add `trailingSlash: true`
- Remove dynamic routes that require server
- Remove database connections (Supabase)
- Use static data instead

**SpendThrone (port 3000):**
- Remove all server-side features
- Convert to client-side only
- Add `output: 'export'` to next.config.js
- Add `trailingSlash: true`
- Remove database connections
- Use static data (60 products already have all data)

## What Works in Static Export
✅ Static pages
✅ Client-side routing
✅ Tailwind CSS (generated at build time)
✅ Static images (use unoptimized)
✅ Client-side components (useState, useEffect)
✅ Link navigation
✅ Static data imports

## What Doesn't Work in Static Export
❌ API routes (/api/*)
❌ Server components (getStaticProps, getServerSideProps)
❌ Database connections
❌ Dynamic routes with data fetching
❌ Server-side rendering
❌ Middleware
❌ Image optimization

## Coolify Deployment
1. Export static sites to `out/` directory
2. Compress: `tar -czf lethometry.tar.gz out/`
3. Upload to Coolify via Git or S3
4. Configure Nginx to serve static files
5. Add SSL certificates

## Priority
1. SpendThrone (simpler, already has static data)
2. Lethometry (more complex, has dynamic features)

---

*Plan created: 2026-02-10 06:55 UTC*
*Frankie 🧟‍♂️*