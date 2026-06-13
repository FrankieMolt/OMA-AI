# Web Scraping API Skill

> Adaptive parsing with Cloudflare bypass

---

## Overview

The Scraping API provides powerful web scraping capabilities powered by Scrapling. Features adaptive parsing that survives website changes and automatic Cloudflare bypass.

## Endpoint

```
POST https://oma-ai.com/api/scrape
```

**Note:** For full functionality, use local endpoint:
```
POST http://localhost:3004/scrape
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| url | string | Yes | URL to scrape |
| selector | string | No | CSS selector (default: "body") |
| extract | string | No | "text", "html", "links", "markdown" |
| stealth | boolean | No | Enable Cloudflare bypass (default: false) |

## Response

```json
{
  "success": true,
  "data": {
    "url": "https://example.com",
    "title": "Example Domain",
    "content": ["Quote 1...", "Quote 2...", "Quote 3..."],
    "metadata": {
      "description": "Example domain for testing",
      "og:title": "Example"
    }
  }
}
```

## Pricing

| Tier | Price |
|------|-------|
| Standard | $0.01/call |
| Stealth mode | $0.02/call |

## Example Usage

```bash
# Basic scraping
curl -X POST https://oma-ai.com/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "extract": "text"}'

# With CSS selector
curl -X POST https://oma-ai.com/api/scrape \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://news.ycombinator.com",
    "selector": ".titleline > a",
    "extract": "text"
  }'

# Stealth mode for Cloudflare-protected sites
curl -X POST http://localhost:3004/scrape \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://cloudflare-protected-site.com",
    "extract": "markdown",
    "stealth": true
  }'
```

## Features

- **Adaptive Parsing** - Survives website layout changes
- **Cloudflare Bypass** - Stealth mode with browser fingerprinting
- **Multiple Extract Modes** - Text, HTML, links, or markdown
- **Metadata Extraction** - Open Graph, Twitter Cards, meta tags
- **Concurrent Crawling** - Scale to full site crawls

## Technology

Powered by [Scrapling](https://github.com/D4Vinci/Scrapling) - The ultimate scraping library.

## Best Practices

1. Always set a descriptive `selector` for cleaner results
2. Use `stealth: true` only when needed (costs 2x)
3. Cache results when possible to minimize calls
4. Respect robots.txt and rate limits

---

_Last updated: 2026-02-27_
