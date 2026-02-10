# SEO Meta Tags Implementation Guide

## Required Meta Tags for Every Page

### Basic Meta Tags
```html
<meta name="title" content="Page Title">
<meta name="description" content="Page Description (150-160 chars)">
<meta name="keywords" content="keyword1, keyword2, keyword3">
```

### Open Graph (Social Sharing)
```html
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page Description">
<meta property="og:image" content="/og-image.jpg">
<meta property="og:url" content="https://domain.com/page">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Site Name">
```

### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Page Description">
<meta name="twitter:image" content="/twitter-image.jpg">
```

### Canonical URL
```html
<link rel="canonical" href="https://domain.com/page">
```

### Robots & Indexing
```html
<meta name="robots" content="index, follow">
```

---

## Site-Specific SEO Requirements

### OMA-AI (oma-ai.com)
- Title: "OMA-AI - Open Market Access for AI Agents"
- Description: "Trade compute, intelligence, and labor via x402 crypto payments. 100+ AI services including LLMs, image generation, video creation, and DeFAI trading."
- Keywords: "AI marketplace, API marketplace, x402 payments, DeFAI trading, AI agents"

### SpendThrone (spendthrone.com)
- Title: "SpendThrone - The Ultimate Satirical E-Commerce Experience"
- Description: "Discover the most extraordinary, physics-defying, and satirical products in the known universe. Luxury reimagined through humor and absurdity."
- Keywords: "satirical e-commerce, luxury parody, absurd products, unique gifts"

### Lethometry (lethometry.com)
- Title: "Lethometry - The Death Clock & Life Philosophy"
- Description: "Calculate your life expectancy, explore mortality metrics, and discover wisdom from Stoic and Buddhist philosophies. Time is fleeting - live with purpose."
- Keywords: "death clock, life expectancy, mortality calculator, Stoic philosophy, Buddhist wisdom"

---

## Next.js Implementation (App Router)

### Using metadata API
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | Site Name',
  description: 'Page description',
  keywords: ['keyword1', 'keyword2'],
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    url: 'https://domain.com/page',
    siteName: 'Site Name',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
    }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title',
    description: 'Page description',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```
