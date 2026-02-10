# OMA-AI Deployment Guide

This guide covers deploying OMA-AI to production.

## Prerequisites

- Node.js 18+ installed
- Vercel account (free tier works)
- Supabase project configured
- Domain: oma-ai.com

## Environment Variables

### Required Environment Variables

Create these in your `.env.production` file and Vercel project settings:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# API Configuration
NEXT_PUBLIC_API_URL=https://api.oma-ai.com

# Wallet Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-project-id

# Application Configuration
NODE_ENV=production
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://oma-ai.com
```

## Database Setup

### 1. Run Migrations

```bash
# Create tables if not exists
supabase db push

# Seed initial data
supabase db seed
```

### 2. Verify Database Connection

Test connection using the health check endpoint:

```bash
curl https://oma-ai.com/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-02-08T20:00:00.000Z",
  "checks": {
    "database": "operational",
    "api": "operational"
  }
}
```

## Deployment Options

### Option 1: Vercel (Recommended)

#### 1. Install Vercel CLI

```bash
npm i -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

#### 3. Deploy Project

```bash
# First deployment
vercel

# Production deployment
vercel --prod
```

#### 4. Configure Environment Variables

In Vercel Dashboard:
1. Go to Project Settings > Environment Variables
2. Add all required variables from the list above
3. Select Production environment

#### 5. Add Custom Domain

1. Go to Domain Settings in Vercel
2. Add domain: `oma-ai.com`
3. Update DNS records:
   ```
   A     @    76.76.21.21
   CNAME www    cname.vercel-dns.com
   ```

#### 6. Enable HTTPS

Vercel automatically provides free SSL certificates via Let's Encrypt.

### Option 2: Self-Hosted (Docker)

#### 1. Build Docker Image

```bash
docker build -t oma-ai .
```

#### 2. Run Container

```bash
docker run -d \
  --name oma-ai \
  -p 3000:3000 \
  --env-file .env.production \
  oma-ai
```

#### 3. Configure Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name oma-ai.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 4. Enable HTTPS with Certbot

```bash
sudo certbot --nginx -d oma-ai.com
```

## Build Optimization

### Next.js Configuration

The project is already optimized with:

- **Turbopack**: Enabled for faster builds
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Bundle Splitting**: Code splitting enabled
- **Tree Shaking**: Unused code removed
- **Compression**: Gzip/Brotli enabled

### Production Build

```bash
npm run build

# Output will show:
# ✓ Compiled successfully
# ✓ Linting and checking validity of types
# ✓ Collecting page data
# ✓ Generating static pages
```

### Analyze Bundle Size

```bash
npm run build

# Analyze bundle
npx @next/bundle-analyzer
```

## Monitoring & Logging

### Health Check

Monitor application health at:

```
https://oma-ai.com/api/health
```

### Error Tracking (Optional)

For production error tracking, integrate Sentry:

```bash
npm install @sentry/nextjs
```

Create `sentry.client.config.ts`:

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
  tracesSampleRate: 0.1,
});
```

### Analytics

Track user analytics with privacy-compliant tools:

- Google Analytics 4
- Plausible (self-hosted, privacy-focused)
- PostHog (open-source)

## Security Checklist

Before deploying, verify:

- [ ] Environment variables are set in production
- [ ] CSP headers are configured (remove unsafe-inline in production)
- [ ] Rate limiting is enabled on all public API endpoints
- [ ] HTTPS is enforced
- [ ] Security headers are set (X-Frame-Options, X-Content-Type-Options)
- [ ] Database credentials are not exposed
- [ ] API keys are not committed to git
- [ ] Error messages don't expose sensitive information
- [ ] Input validation is enabled on all endpoints
- [ ] CORS is properly configured

## Performance Checklist

Before deploying, verify:

- [ ] Images are optimized with next/image
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Bundle size is optimized (< 200KB)
- [ ] Server response time < 200ms
- [ ] CDN is enabled for static assets
- [ ] Caching is configured for API responses
- [ ] Lazy loading is enabled for images and components

## Post-Deployment Verification

### 1. Test Core Functionality

```bash
# Test homepage
curl -I https://oma-ai.com

# Test health endpoint
curl https://oma-ai.com/api/health

# Test API endpoint
curl https://oma-ai.com/api/marketplace
```

### 2. Test Authentication Flow

- Test login endpoint
- Test signup endpoint
- Test session management
- Test logout functionality

### 3. Test Payment Flow

- Test payment initiation
- Test payment execution
- Test wallet connection
- Test transaction verification

### 4. Test Mobile Responsiveness

Open in various devices:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

### 5. Run Lighthouse Audit

```bash
npm install -g lighthouse
lighthouse https://oma-ai.com --view
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

## Rollback Plan

If issues occur after deployment:

### Vercel Rollback

1. Go to Vercel Dashboard > Deployments
2. Find the previous successful deployment
3. Click "..." menu > "Promote to Production"

### Manual Rollback

```bash
# Revert to previous commit
git revert HEAD

# Redeploy
vercel --prod
```

### Database Rollback

```bash
# Restore from backup
supabase db restore <backup-file>
```

## Maintenance

### Regular Tasks

- **Daily**: Check error logs and health status
- **Weekly**: Review database backups and performance metrics
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Conduct full security audit and performance review

### Dependency Updates

```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Update Next.js
npm install next@latest
```

## Troubleshooting

### Build Failures

**Issue**: Build fails with type errors

**Solution**:
```bash
npm run type-check
# Fix type errors and retry build
```

### Runtime Errors

**Issue**: 500 errors on production

**Solution**:
1. Check Vercel logs
2. Review server console output
3. Test health endpoint
4. Verify environment variables

### Performance Issues

**Issue**: Slow page load times

**Solution**:
1. Run Lighthouse audit
2. Check bundle size
3. Optimize images
4. Enable caching
5. Consider CDN upgrade

### Database Issues

**Issue**: Database connection failures

**Solution**:
1. Verify Supabase credentials
2. Check database status
3. Review connection pool settings
4. Restart application

## Support

For deployment issues:
- Check Vercel status page: https://www.vercel-status.com
- Check Supabase status page: https://status.supabase.com
- Review Next.js documentation: https://nextjs.org/docs
- Contact support: support@oma-ai.com

## References

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Guide](https://supabase.com/docs/guides)
- [Web.dev Performance](https://web.dev/performance/)
