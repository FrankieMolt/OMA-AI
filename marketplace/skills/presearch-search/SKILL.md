# presearch-search

> Privacy-focused web search using Presearch

## Overview

A skill that provides web search capabilities using Presearch, a decentralized search engine that respects privacy and rewards users with PRE tokens.

## Source

https://github.com/NosytLabs/presearch-search-skill

## Installation

```bash
oma install presearch-search
```

## Configuration

```json
{
  "skills": {
    "presearch-search": {
      "enabled": true,
      "config": {
        "apiKey": "YOUR_PRESEARCH_API_KEY"
      }
    }
  }
}
```

## Tools

### search

Search the web using Presearch.

**Parameters:**
- `query` (string, required): Search query
- `limit` (number, optional): Number of results (default: 10)

**Example:**
```javascript
const results = await presearch.search({
  query: 'AI agents marketplace',
  limit: 5
});
```

**Response:**
```json
{
  "results": [
    {
      "title": "Result title",
      "url": "https://example.com",
      "description": "Result description"
    }
  ],
  "total": 5
}
```

### search_news

Search for news articles.

**Parameters:**
- `query` (string, required): Search query
- `limit` (number, optional): Number of results

### search_images

Search for images.

**Parameters:**
- `query` (string, required): Search query
- `limit` (number, optional): Number of results

## Features

- **Privacy-focused**: No tracking of searches
- **Decentralized**: Runs on blockchain
- **Rewards**: Earn PRE tokens for searching
- **Fast**: Quick response times

## Why Presearch?

| Feature | Presearch | Google |
|---------|-----------|--------|
| Privacy | ✅ No tracking | ❌ Tracks everything |
| Decentralized | ✅ Yes | ❌ No |
| Rewards | ✅ PRE tokens | ❌ None |
| Quality | ✅ Good | ✅ Excellent |

## Pricing

**FREE** (with optional PRE token rewards)

## Requirements

- Presearch API key (free at presearch.com)

## Version

1.0.0

## Author

NosytLabs

## License

MIT
