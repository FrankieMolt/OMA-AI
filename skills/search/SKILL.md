# Web Search API Skill

> AI-powered search with summaries

---

## Overview

The Search API provides intelligent web search capabilities with automatic summarization. Perfect for AI agents that need to gather information quickly.

## Endpoint

```
POST https://oma-ai.com/api/search
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | Yes | Search query |
| limit | number | No | Max results (default: 5) |
| summarize | boolean | No | Summarize results (default: true) |

## Response

```json
{
  "success": true,
  "query": "latest AI developments",
  "results": [
    {
      "title": "OpenAI announces GPT-5",
      "url": "https://example.com/article",
      "snippet": "OpenAI has released...",
      "summary": "Key points: 1) GPT-5 launched, 2) 10x improvement..."
    }
  ],
  "summary": "The search results indicate significant progress in AI..."
}
```

## Pricing

| Tier | Price |
|------|-------|
| Standard | $0.005/call |

## Example Usage

```bash
# Basic search
curl -X POST https://oma-ai.com/api/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer oma_your_key" \
  -d '{"query": "Bitcoin price prediction 2026"}'

# With more results
curl -X POST https://oma-ai.com/api/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer oma_your_key" \
  -d '{
    "query": "best restaurants in Tokyo",
    "limit": 10,
    "summarize": false
  }'
```

## Data Sources

- Brave Search API
- DuckDuckGo
- Exa AI Search

---

_Last updated: 2026-02-27_
