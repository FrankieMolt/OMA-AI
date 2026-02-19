# og:url Fix Guide

## Issue: og:url does not match canonical URL

### Affected Pages:
- /api-docs
- /blog
- /forgot-password
- /frankie-os
- /how-it-works

### Fix:
Add og:url to metadata that matches the page URL

Example:
```tsx
export const metadata: Metadata = {
  openGraph: {
    url: 'https://oma-ai.com/api-docs',
  },
};
```

### Status:
Manual fix required for each page's metadata
