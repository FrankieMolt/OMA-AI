# web-research

> Deep web research and information gathering

## Overview

Comprehensive web research capabilities:
- Search multiple sources
- Summarize findings
- Extract key information
- Cite sources

## Installation

```bash
oma install web-research
```

## Tools

### search

Search the web for information.

```javascript
const results = await research.search({
  query: 'latest AI developments 2026',
  sources: ['web', 'news', 'academic']
});
```

### summarize

Summarize multiple sources.

```javascript
const summary = await research.summarize({
  urls: ['https://...', 'https://...'],
  format: 'bullet-points'
});
```

### extract

Extract specific data from pages.

```javascript
const data = await research.extract({
  url: 'https://...',
  selectors: { title: 'h1', price: '.price' }
});
```

## Pricing

- **FREE** (100 searches/day)

## Version

1.0.0
