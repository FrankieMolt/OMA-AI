# OMA Pricing API

> Real-time marketplace pricing for MCP servers, skills, and LLMs

## Overview

This API provides pricing information for the OMA marketplace.

**Base URL:** `https://api.oma-ai.com/v1`

## Authentication

Use API key in header:
```
Authorization: Bearer oma_xxxxx
```

## Endpoints

### GET /pricing/servers

List MCP server pricing.

```bash
curl https://api.oma-ai.com/v1/pricing/servers
```

Response:
```json
{
  "servers": [
    {
      "id": "@mcp/server-filesystem",
      "price": "FREE",
      "license": "MIT"
    },
    {
      "id": "@mcp/server-postgres", 
      "price": "FREE",
      "license": "MIT"
    }
  ]
}
```

### GET /pricing/skills

List skill pricing.

```bash
curl https://api.oma-ai.com/v1/pricing/skills
```

Response:
```json
{
  "skills": [
    {
      "id": "proactive-agent",
      "price": "FREE",
      "installs": 5200
    },
    {
      "id": "advanced-trading",
      "price": "$9.99/month",
      "installs": 150
    }
  ]
}
```

### GET /pricing/llm

List LLM API pricing.

```bash
curl https://api.oma-ai.com/v1/pricing/llm
```

Response:
```json
{
  "models": [
    {
      "id": "gpt-4o",
      "price_per_1k_tokens": "0.01",
      "provider": "OpenAI"
    },
    {
      "id": "claude-3.5-sonnet",
      "price_per_1k_tokens": "0.008",
      "provider": "Anthropic"
    }
  ]
}
```

## Pricing

- **Free tier:** 100 requests/month
- **Pro:** $9/month for unlimited
