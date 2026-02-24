# Deploying OMA-AI.COM

## Option 1: Vercel (Recommended)

1. Go to https://vercel.com
2. Import GitHub repo: `FrankieMolt/OMA-AI`
3. Configure:
   - Framework: Other
   - Root Directory: `public`
   - Build Command: (none)
   - Output Directory: `public`
4. Add domain:
   - Go to Settings → Domains
   - Add `oma-ai.com`
   - Update DNS records

### DNS Records for Vercel

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

## Option 2: GitHub Pages

1. Go to repo Settings → Pages
2. Source: Deploy from branch
3. Branch: main
4. Folder: /public
5. Custom domain: oma-ai.com

### DNS Records for GitHub Pages

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | frankiemolt.github.io |

## Option 3: Netlify

1. Go to https://netlify.com
2. Import GitHub repo
3. Publish directory: `public`
4. Add custom domain

## Option 4: Cloudflare Pages

1. Go to https://pages.cloudflare.com
2. Connect GitHub repo
3. Build output: `public`
4. Add custom domain

---

## Quick Deploy Commands

### Vercel CLI
```bash
npm i -g vercel
cd oma-ai-repo
vercel --prod
```

### Netlify CLI
```bash
npm i -g netlify-cli
cd oma-ai-repo
netlify deploy --prod --dir=public
```

---

## After Deployment

1. Verify site loads at oma-ai.com
2. Test API calls work (CORS)
3. Check all links work
4. Enable HTTPS (automatic on Vercel/Netlify)
5. Set up monitoring

---

## Current Status

- ✅ Site ready in `public/index.html`
- ✅ Vercel config created
- ✅ Pushed to GitHub
- ⬜ Deploy to hosting provider
- ⬜ Configure DNS
- ⬜ Enable HTTPS
