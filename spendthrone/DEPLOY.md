# SpendThrone - Static Export Deployment Guide

This guide covers deploying SpendThrone as a static site to Coolify (or any static hosting provider).

## Overview

SpendThrone is now configured for **static export** - meaning:
- No Next.js server required
- All pages pre-rendered at build time
- Can be served by any static web server (nginx, Apache, Vercel, Netlify, etc.)

## Requirements

- Node.js 18.x or later
- npm 9.x or later
- Git

## Project Structure

```
spendthrone/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── data/                   # Static data (products, gift guides)
├── public/                 # Static assets
├── out/                    # Build output (generated)
├── next.config.js          # Static export configuration
└── package.json
```

## Build Process

### 1. Install Dependencies

```bash
npm install
```

### 2. Build for Static Export

```bash
npm run build
```

This creates an `out/` directory with:
- 78 static HTML files
- All JavaScript bundles
- CSS files
- Static assets (images, fonts, etc.)

### 3. Test Locally

```bash
npx serve out
```

Visit `http://localhost:3000` to verify.

## Coolify Deployment

### Option 1: Git-based Deployment (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, etc.)

2. In Coolify:
   - Create a new **Static Site** resource
   - Connect your Git repository
   - Set build command: `npm run build`
   - Set publish directory: `out`

3. Deploy!

### Option 2: Docker Deployment

Create a `Dockerfile` in your project root:

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # Handle trailing slashes
    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Option 3: Manual Upload

1. Run `npm run build` locally
2. Upload the `out/` directory contents to your server
3. Configure your web server to serve the files

## Environment Variables

No environment variables are required for the static build. All data is compiled at build time from:
- `data/real-products.ts` - Product catalog
- `data/gift-guides.ts` - Gift guide content

## Features

### Static Export Compatibility

✅ All 62 product pages pre-rendered
✅ All 15 static pages (home, about, etc.)
✅ Client-side search and filtering
✅ Client-side cart, wishlist, compare
✅ Responsive design
✅ SEO optimized (sitemap.xml, robots.txt)

### What's Pre-rendered

| Route | Count | Type |
|-------|-------|------|
| `/` | 1 | Static |
| `/about` | 1 | Static |
| `/marketplace` | 1 | Static |
| `/product/[slug]` | 62 | Dynamic (SSG) |
| `/blog`, `/faq`, `/contact`, etc. | 13 | Static |

### Client-Side Features

All interactive features work client-side:
- Product search (debounced)
- Category filtering
- Sorting
- Cart management (localStorage)
- Wishlist (localStorage)
- Compare list (localStorage)
- Recently viewed (localStorage)
- Product modals
- Checkout flow (UI only)

## Verification Checklist

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] Navigation works (all links)
- [ ] Product pages load (e.g., `/product/pura-smart-scent-diffuser/`)
- [ ] Search filters products
- [ ] Category filter works
- [ ] Cart can add/remove items
- [ ] Wishlist works
- [ ] sitemap.xml is accessible
- [ ] robots.txt is accessible
- [ ] No console errors

## Troubleshooting

### Build Errors

If you see `Error: Cannot find module`:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 Errors on Subpages

Ensure your web server is configured to serve `index.html` for directory requests or use trailing slashes:
- `/about/` should serve `out/about/index.html`
- `/product/slug/` should serve `out/product/slug/index.html`

### Images Not Loading

Images in `public/` are copied to `out/`. Verify:
- Image files exist in `public/images/`
- References use `/images/filename.jpg` (leading slash)

## Performance

Expected performance with static export:
- **First Contentful Paint**: < 1s
- **Lighthouse Score**: 90+ (Performance)
- **Bundle Size**: ~200KB gzipped (JS)

## Updating Content

To update products or content:

1. Edit files in `data/` directory
2. Run `npm run build`
3. Redeploy

No database or server restart required!

## Support

For issues with:
- **Build process**: Check Node.js version (18+)
- **Deployment**: Verify web server configuration
- **Content updates**: Rebuild and redeploy

---

**Ready to deploy!** 🚀
