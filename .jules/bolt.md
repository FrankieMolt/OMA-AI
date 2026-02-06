# Bolt's Journal - OMA-AI Performance Optimizations

⚡ CRITICAL LEARNINGS ONLY - Not a log, but key insights for future optimization.

---

## 2026-02-06 - Enable Next.js Image Optimization

**Learning:** 
- `images: { unoptimized: true }` in next.config.js was disabling critical performance feature
- This is a severe anti-pattern in modern Next.js apps
- Image optimization provides 30-50% size reduction, better Core Web Vitals

**Action:**
- Remove `unoptimized: true` from next.config.js
- Add remotePatterns for flexibility (allow all domains)
- Configure formats: ['image/avif', 'image/webp'] for modern formats
- Set deviceSizes and imageSizes for responsive images

**Expected Impact:**
- 30-50% reduction in image sizes
- Better LCP (Largest Contentful Paint)
- Better CLS (Cumulative Layout Shift)
- Automatic WebP/AVIF conversion
- Improved Core Web Vitals scores

**Why this matters:**
- Images are typically 50-70% of page weight
- Next.js Image Optimization is free (no dependencies)
- No code changes needed - config only
- Immediate performance improvement

---