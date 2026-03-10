# Marketplace API Skill

> Browse and discover APIs and services

---

## Overview

The Marketplace API provides a catalog of all available APIs, MCP servers, and services on OMA-AI.

## Endpoint

```
GET https://oma-ai.com/api/marketplace
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| category | string | No | Filter by category |
| limit | number | No | Max results (default: 50) |

## Response

```json
{
  "success": true,
  "apis": [
    {
      "id": "prices",
      "name": "Crypto Prices",
      "description": "Real-time cryptocurrency prices",
      "category": "finance",
      "price": "$0.001/call",
      "free_tier": "1,000/day"
    },
    {
      "id": "weather",
      "name": "Weather",
      "description": "Current conditions and forecasts",
      "category": "data",
      "price": "$0.002/call",
      "free_tier": "100/day"
    }
  ],
  "total": 39
}
```

## Categories

- `finance` - Crypto, stocks, trading
- `data` - Weather, geolocation, stats
- `ai` - LLMs, embeddings, search
- `scraping` - Web scraping, parsing
- `compute` - GPU, inference
- `utility` - Auth, storage, misc

## Example Usage

```bash
# List all APIs
curl https://oma-ai.com/api/marketplace

# Filter by category
curl "https://oma-ai.com/api/marketplace?category=ai"
```

## Free Tier

This endpoint is free and does not require authentication.

---

_Last updated: 2026-02-27_
