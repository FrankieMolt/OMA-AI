# Comprehensive Debug & Audit Report

**Date:** 2026-02-10  
**Audited Sites:**
1. SpendThrone (http://localhost:3000)
2. OMA-AI (http://localhost:3001)
3. Lethometry (http://localhost:3002)

---

## Executive Summary

| Site | Status | Critical Issues | High | Medium | Low |
|------|--------|-----------------|------|--------|-----|
| SpendThrone | ✅ Operational | 0 | 1 | 1 | 2 |
| OMA-AI | ⚠️ Issues | 0 | 2 | 1 | 2 |
| Lethometry | ⚠️ Issues | 1 | 1 | 1 | 1 |

---

## 1. SPENDTHRONE (Port 3000)

### 🔴 High Severity

#### Issue ST-H1: Cart Functionality Not Visible
- **Description:** The cart button activates but no cart drawer/modal appears in the DOM
- **Impact:** Users cannot view or manage cart items
- **Reproduction:** Click the cart icon in the header
- **Root Cause:** Likely a state/UI rendering issue with the cart drawer component
- **Fix Location:** `components/cart/CartDrawer.tsx` or related cart state management
- **Recommended Fix:** 
  ```tsx
  // Ensure cart drawer is rendered in the DOM and visibility is controlled via CSS
  // Check that the cart provider properly manages open/close state
  ```

### 🟡 Medium Severity

#### Issue ST-M1: Missing Image Alt Tags on Product Images
- **Description:** Product card images lack descriptive alt attributes
- **Impact:** Accessibility issues for screen readers
- **Fix Location:** `components/products/ProductCard.tsx`
- **Recommended Fix:** Add meaningful alt text: `alt={product.name}`

### 🟢 Low Severity

#### Issue ST-L1: Product Description Text Truncation
- **Description:** Long product descriptions are truncated without "Read more" option
- **Impact:** Users may miss important product information
- **Fix Location:** Product card component CSS

#### Issue ST-L2: Footer "Made with" Icon Missing Alt Text
- **Description:** Heart icon in footer lacks alt attribute
- **Fix Location:** `components/layout/Footer.tsx`

---

## 2. OMA-AI (Port 3001)

### 🔴 High Severity

#### Issue OA-H1: CSP Blocking Google Fonts
- **Description:** Content Security Policy prevents loading Google Fonts stylesheet
- **Console Error:** 
  ```
  Loading the stylesheet 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans...' 
  violates the following Content Security Policy directive: "style-src 'self' 'unsafe-inline' https://*.vercel.app"
  ```
- **Impact:** Site uses fallback fonts instead of intended typography
- **Fix Location:** `/home/nosyt/.openclaw/workspace/next.config.js`
- **Recommended Fix:**
  ```javascript
  // In headers() function, update the CSP value:
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel.app; style-src 'self' 'unsafe-inline' https://*.vercel.app https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https:*.vercel.app blob:; connect-src 'self' https://*.vercel.app https://api.oma-ai.com; frame-ancestors 'self';"
  }
  ```

#### Issue OA-H2: Missing Favicon Manifest Icon
- **Description:** favicon-192x192.png referenced in manifest is missing or invalid
- **Console Error:** 
  ```
  Error while trying to use the following icon from the Manifest: http://localhost:3001/favicon-192x192.png (Download error or resource isn't a valid image)
  ```
- **Impact:** PWA install prompt may not work correctly
- **Fix Location:** `public/favicon-192x192.png`
- **Recommended Fix:** Generate and add proper favicon files:
  ```bash
  # Use a favicon generator to create all required sizes
  # Place in public/ folder:
  # - favicon.ico (16x16, 32x32)
  # - favicon-192x192.png
  # - favicon-512x512.png
  # - apple-touch-icon.png
  ```

### 🟡 Medium Severity

#### Issue OA-M1: Inconsistent API Data Between Trending and All APIs Sections
- **Description:** Trending APIs section shows 6 APIs but "All APIs" section only shows 2 results
- **Impact:** User confusion about available APIs
- **Possible Causes:** 
  - Different data sources for trending vs all APIs
  - Filtering logic error
  - Static vs dynamic data mismatch
- **Fix Location:** `app/page.tsx` - verify data fetching for both sections

### 🟢 Low Severity

#### Issue OA-L1: Duplicate Skip to Main Content Link
- **Description:** Two "Skip to main content" links exist in the DOM
- **Impact:** Minor accessibility redundancy
- **Fix Location:** Check layout.tsx for duplicate skip links

#### Issue OA-L2: Featured APIs Section Empty State
- **Description:** "No featured services yet. Check back soon!" message displayed
- **Impact:** Empty state may appear unprofessional
- **Recommendation:** Either populate with featured APIs or remove section until ready

---

## 3. LETHOMETRY (Port 3002)

### 🔴 Critical Severity

#### Issue LT-C1: Experiment Detail Pages Return 404 in Development
- **Description:** All experiment detail pages (trolley problem, memory, etc.) return 404 errors
- **Affected URLs:**
  - `/experiments/moral-trolley-problem/`
  - `/experiments/memory-ebbinghaus/`
  - `/experiments/risk-assessment/`
  - `/experiments/cognitive-bias-detector/`
  - `/experiments/ethical-alignment-test/`
- **Impact:** Users cannot access experiment details or participate
- **Root Cause:** 
  - Static export (`output: 'export'`) is configured
  - Dev server may not be properly handling dynamic routes
  - OR: File path mismatch between static export and dev server
- **Verification:** Static export files DO exist in `dist/experiments/`
- **Fix Location:** `next.config.js` or dev server configuration
- **Recommended Fix Options:**
  1. **For Development:** Use `next dev` without static export config
  2. **For Production:** Ensure static export is built and served correctly
  3. **Add rewrites:** Configure dev server to handle dynamic routes:
  ```javascript
  // next.config.js
  async rewrites() {
    return [
      {
        source: '/experiments/:slug',
        destination: '/experiments/[slug]',
      },
    ];
  },
  ```

### 🔴 High Severity

#### Issue LT-H1: Inconsistent Experiment Link URLs
- **Description:** Publications page links to `/experiments/exp-001/` but experiments list links to `/experiments/moral-trolley-problem/`
- **Impact:** Broken navigation - one set of links will always fail
- **Fix Location:** 
  - `app/publications/page.tsx` - Line 85: `href="/experiments/exp-001/"`
  - Should be: `href="/experiments/moral-trolley-problem/"`
- **Recommended Fix:** Use the slug-based URLs consistently:
  ```tsx
  // In publications/page.tsx
  href={`/experiments/${experiment.slug}/`}
  ```

### 🟡 Medium Severity

#### Issue LT-M1: No Console Errors but Fast Refresh Rebuilding Frequently
- **Description:** Multiple "Fast Refresh rebuilding" messages in console
- **Impact:** May indicate file watching issues or unnecessary re-renders
- **Recommendation:** Check for circular dependencies or frequently changing files

### 🟢 Low Severity

#### Issue LT-L1: Missing Methodology Page Content
- **Description:** Methodology link exists in navigation but content needs verification
- **Recommendation:** Ensure all navigation links have corresponding content

---

## Cross-Site Issues

### 🟡 Medium Severity

#### Issue CS-M1: Google Fonts CSP Issues Across Multiple Sites
- **Affected Sites:** OMA-AI, potentially others
- **Fix:** Update CSP headers to allow fonts.googleapis.com and fonts.gstatic.com

### 🟢 Low Severity

#### Issue CS-L1: Development-Only Console Messages
- **Description:** React DevTools, Fast Refresh, and HMR messages appear in console
- **Impact:** None - these are expected in development
- **Note:** Will not appear in production builds

---

## Detailed Technical Findings

### HTML/CSS Validation

| Site | Semantic HTML | ARIA Labels | Alt Tags | Valid Structure |
|------|---------------|-------------|----------|-----------------|
| SpendThrone | ✅ Good | ⚠️ Partial | ⚠️ Some missing | ✅ Valid |
| OMA-AI | ✅ Good | ✅ Good | ✅ Good | ✅ Valid |
| Lethometry | ✅ Excellent | ✅ Good | ✅ Good | ✅ Valid |

### Performance Observations

1. **Image Optimization:**
   - SpendThrone: Uses unoptimized images (set in next.config.js)
   - OMA-AI: Uses Next.js Image optimization
   - Lethometry: Uses unoptimized images for static export

2. **Bundle Size:**
   - All sites use code splitting effectively
   - No significant bundle bloat observed

### Accessibility Audit

| Check | SpendThrone | OMA-AI | Lethometry |
|-------|-------------|--------|------------|
| Skip to content | ✅ | ⚠️ Duplicate | ✅ |
| Heading hierarchy | ✅ | ✅ | ✅ |
| Color contrast | ✅ | ✅ | ✅ |
| Focus indicators | ✅ | ✅ | ✅ |
| Form labels | ✅ | ✅ | ✅ |
| Alt text | ⚠️ Partial | ✅ | ✅ |

---

## Recommended Priority Fixes

### Immediate (Fix Today)
1. **LT-C1:** Fix Lethometry experiment page 404s
2. **LT-H1:** Fix inconsistent experiment URLs in Lethometry
3. **OA-H1:** Update CSP to allow Google Fonts
4. **ST-H1:** Fix cart drawer visibility

### Short Term (This Week)
5. **OA-H2:** Add missing favicon files
6. **OA-M1:** Fix API data inconsistency
7. **ST-M1:** Add missing alt tags
8. **CS-M1:** Standardize CSP headers across sites

### Long Term (Ongoing)
9. **LT-L1:** Complete methodology page content
10. **OA-L2:** Populate featured APIs or remove section
11. **ST-L1:** Improve product description UX
12. General accessibility improvements

---

## File Paths for Quick Reference

### SpendThrone
- `/home/nosyt/.openclaw/workspace/spendthrone/app/layout.tsx`
- `/home/nosyt/.openclaw/workspace/spendthrone/components/cart/CartDrawer.tsx`
- `/home/nosyt/.openclaw/workspace/spendthrone/components/products/ProductCard.tsx`
- `/home/nosyt/.openclaw/workspace/spendthrone/components/layout/Footer.tsx`

### OMA-AI
- `/home/nosyt/.openclaw/workspace/next.config.js` (CSP headers)
- `/home/nosyt/.openclaw/workspace/app/page.tsx` (API data)
- `/home/nosyt/.openclaw/workspace/public/favicon-192x192.png` (missing)

### Lethometry
- `/home/nosyt/.openclaw/workspace/lethometry/next.config.js`
- `/home/nosyt/.openclaw/workspace/lethometry/app/experiments/[slug]/page.tsx`
- `/home/nosyt/.openclaw/workspace/lethometry/app/publications/page.tsx`
- `/home/nosyt/.openclaw/workspace/lethometry/lib/data.ts`

---

## Screenshots of Issues

1. **Lethometry 404 Error:** `/home/nosyt/.openclaw/media/browser/c1361ae2-019e-4e61-897f-948ceaa3d3b1.png`
2. **SpendThrone Homepage:** `/home/nosyt/.openclaw/media/browser/048cbba2-2e71-46ab-9566-c7adb4137a38.jpg`
3. **OMA-AI Homepage:** `/home/nosyt/.openclaw/media/browser/6f4c152a-ecc9-42f1-97da-dafcbc033c5c.jpg`
4. **Lethometry Homepage:** `/home/nosyt/.openclaw/media/browser/6ac0f4e1-be06-4dc0-be17-470ba8a84acd.jpg`

---

*Report generated by automated browser audit and code analysis*
