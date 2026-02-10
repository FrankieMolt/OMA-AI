# SEO Optimization Guide for OMA-AI

This document outlines SEO strategies and implementations for OMA-AI.

## Current SEO Status

### Implemented Features

✅ Metadata API for dynamic meta tags
✅ Open Graph tags for social sharing
✅ Twitter Card support
✅ sitemap.xml generation
✅ robots.txt configuration
✅ Canonical URLs
✅ Semantic HTML structure
✅ ARIA labels for accessibility
✅ Responsive design
✅ Core Web Vitals optimization

## Meta Tags

### Homepage Metadata

Located in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'OMA-AI - Open Market Access for AI Agents',
  description: 'The API marketplace for humans and AI agents...',
  keywords: ['OMA-AI', 'API marketplace', 'AI agents', ...],
  openGraph: { ... },
  twitter: { ... }
}
```

### Dynamic Metadata for Pages

Use `generateMetadata` for dynamic pages:

```typescript
// app/marketplace/page.tsx
export async function generateMetadata({ params }) {
  return {
    title: 'API Marketplace - OMA-AI',
    description: 'Browse and integrate APIs and MCP servers...',
    openGraph: {
      title: 'API Marketplace',
      description: 'Browse 22+ APIs and MCP servers',
      images: ['/og-marketplace.png']
    }
  }
}
```

## Structured Data

### Schema.org Implementation

Add structured data to `app/layout.tsx`:

```typescript
export default function RootLayout({ children }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OMA-AI',
    url: 'https://oma-ai.com',
    logo: 'https://oma-ai.com/logo.png',
    description: 'The API marketplace for humans and AI agents',
    sameAs: [
      'https://twitter.com/oma_ai',
      'https://github.com/FrankieMolt/OMA-AI'
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Product Schema for API Listings

Add to API card components:

```typescript
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: api.name,
  description: api.description,
  offers: {
    '@type': 'Offer',
    price: api.price,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock'
  }
};
```

## Sitemap Generation

Current sitemap in `app/sitemap.ts`:

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://oma-ai.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://oma-ai.com/marketplace',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // Add more URLs...
  ]
}
```

### Enhancing Sitemap

Add dynamic URLs for APIs:

```typescript
async function getAPIUrls() {
  // Fetch from API or database
  const apis = await fetch('/api/marketplace').then(r => r.json());
  return apis.services.map((api) => ({
    url: `https://oma-ai.com/api/${api.id}`,
    lastModified: new Date(api.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}
```

## robots.txt Configuration

Current robots.txt in `app/robots.ts`:

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/', '/private/'],
    },
    sitemap: 'https://oma-ai.com/sitemap.xml',
  }
}
```

## Canonical URLs

Add canonical tags to prevent duplicate content:

```typescript
// In page components
export async function generateMetadata({ params }) {
  return {
    alternates: {
      canonical: `https://oma-ai.com/${params.slug}`
    }
  }
}
```

## Image Optimization

### Using next/image

```typescript
import Image from 'next/image';

<Image
  src="/hero.png"
  alt="OMA-AI Platform"
  width={1200}
  height={600}
  priority // Above the fold
  placeholder="blur"
  blurDataURL="data:image/..." // Base64 placeholder
/>
```

### Benefits

- Automatic WebP/AVIF conversion
- Lazy loading for below-the-fold images
- Responsive images
- Reduced bandwidth (30-50% savings)

## Core Web Vitals Optimization

### LCP (Largest Contentful Paint) < 2.5s

**Optimizations:**
- Font preloading in `app/layout.tsx`
- Image prioritization with `priority` prop
- Minimize main thread work
- Reduce JavaScript bundle size

**Implementation:**
```typescript
// app/layout.tsx
export const fontSans = localFont({
  src: './fonts/Inter.woff2',
  display: 'swap',
  preload: true,
})
```

### FID (First Input Delay) < 100ms

**Optimizations:**
- Code splitting with dynamic imports
- Reduce JavaScript execution time
- Use web workers for heavy computations
- Minimize third-party scripts

**Implementation:**
```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false // Client-side only
});
```

### CLS (Cumulative Layout Shift) < 0.1

**Optimizations:**
- Set image dimensions explicitly
- Reserve space for dynamic content
- Use CSS aspect ratios
- Avoid inserting content above existing content

**Implementation:**
```css
.image-container {
  aspect-ratio: 16/9;
  width: 100%;
  background: #111; /* Placeholder */
}
```

## Open Graph Tags

Enhance social sharing with rich previews:

```typescript
openGraph: {
  title: 'OMA-AI - API Marketplace for AI Agents',
  description: 'Browse 22+ APIs and MCP servers...',
  url: 'https://oma-ai.com',
  siteName: 'OMA-AI',
  locale: 'en_US',
  type: 'website',
  images: [
    {
      url: 'https://oma-ai.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'OMA-AI Platform'
    }
  ]
}
```

### Open Graph Images

Create multiple OG images for different contexts:

- `og-image.png` (1200x630) - Default
- `og-image-square.png` (1200x1200) - Square format
- `og-image-wide.png` (1600x900) - Wide format

## Twitter Cards

Add Twitter Card support:

```typescript
twitter: {
  card: 'summary_large_image',
  title: 'OMA-AI',
  description: 'The API marketplace for humans and AI agents',
  images: ['https://oma-ai.com/og-image.png'],
  creator: '@oma_ai'
}
```

## Breadcrumb Navigation

Implement breadcrumbs for better UX and SEO:

```typescript
import Breadcrumb from '@/components/Breadcrumb';

<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'API Name', href: '/marketplace/api-name' }
  ]}
/>
```

## Page Speed Optimization

### Bundle Size Optimization

```javascript
// next.config.js
experimental: {
  optimizePackageImports: ['lucide-react', 'framer-motion']
}
```

### Code Splitting

```typescript
// Dynamic imports for heavy routes
const Marketplace = dynamic(() => import('@/app/marketplace/page'));
const Dashboard = dynamic(() => import('@/app/dashboard/page'));
```

### Caching Strategy

```typescript
// API route caching
export const revalidate = 3600; // 1 hour

// Static generation
export const dynamic = 'force-static';
```

## Accessibility & SEO Synergy

ARIA labels improve both accessibility and SEO:

```typescript
<button
  aria-label="Search APIs and MCPs"
  role="searchbox"
  id="main-search"
>
  <SearchIcon aria-hidden="true" />
</button>
```

### Heading Hierarchy

Ensure proper heading structure:

```typescript
<h1>OMA-AI - API Marketplace</h1>
<section>
  <h2>Featured APIs</h2>
  <h3>API Name</h3>
</section>
<section>
  <h2>Categories</h2>
  <h3>AI & ML</h3>
  <h3>Blockchain</h3>
</section>
```

## Keyword Strategy

### Primary Keywords

- API marketplace
- AI agents
- MCP servers
- x402 payments
- Crypto payments
- API integration

### Secondary Keywords

- AI tools
- Autonomous agents
- API directory
- DeFi payments
- Web3 APIs
- Smart contract APIs

### Long-tail Keywords

- "API marketplace for AI agents"
- "best MCP servers for autonomous agents"
- "crypto payments for APIs"
- "x402 payment protocol"
- "AI agent commerce platform"

## Content Optimization

### Meta Descriptions

- Length: 150-160 characters
- Include primary keyword
- Compelling call-to-action
- Unique per page

### Title Tags

- Length: 50-60 characters
- Include primary keyword
- Brand name at end
- Unique per page

### Heading Tags

- H1: Page title (one per page)
- H2: Main sections
- H3: Subsections
- H4-H6: Minor divisions

## Internal Linking

### Anchor Text Strategy

Use descriptive anchor text:

```typescript
// Good
<Link href="/marketplace">Browse APIs</Link>

// Bad
<Link href="/marketplace">Click here</Link>
```

### Link Structure

```
Home
├── Marketplace
│   ├── AI & ML APIs
│   ├── Blockchain APIs
│   └── MCP Servers
├── Pricing
├── Documentation
└── About
```

## Mobile Optimization

### Responsive Design

```typescript
// Tailwind breakpoints
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### Mobile Performance

- Touch-friendly buttons (44px min)
- Readable font sizes (16px base)
- Simplified navigation
- Optimized images

## Monitoring & Analytics

### Google Analytics 4

```typescript
// lib/analytics.ts
export function trackEvent(eventName, params) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}
```

### Search Console

Monitor:
- Index coverage
- Mobile usability
- Core Web Vitals
- Manual actions
- Structured data

### Performance Monitoring

Use tools:
- Google PageSpeed Insights
- Lighthouse CI
- Web Vitals library

## Testing SEO

### Validation Tools

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool)
- [PageSpeed Insights](https://pagespeed.web.dev)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse)

### SEO Checklist

- [ ] Meta tags on all pages
- [ ] Open Graph tags configured
- [ ] Twitter Card tags configured
- [ ] sitemap.xml generated
- [ ] robots.txt configured
- [ ] Canonical URLs set
- [ ] Structured data implemented
- [ ] Images optimized with alt text
- [ ] Heading hierarchy correct
- [ ] Internal links working
- [ ] Mobile-friendly design
- [ ] Core Web Vitals passing
- [ ] HTTPS enabled
- [ ] Fast page load times
- [ ] No broken links (404s)
- [ ] No duplicate content

## Ongoing SEO Strategy

### Monthly Tasks

- Monitor Google Search Console
- Review keyword rankings
- Update content based on trends
- Check Core Web Vitals
- Audit for broken links

### Quarterly Tasks

- Update sitemap with new content
- Review and update meta tags
- Analyze competitor strategies
- Optimize underperforming pages
- Update structured data

### Annual Tasks

- Comprehensive SEO audit
- Keyword research and strategy review
- Content gap analysis
- Technical SEO review
- Backlink analysis

## References

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org](https://schema.org)
- [Open Graph Protocol](https://ogp.me)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Web.dev Performance](https://web.dev/performance/)
