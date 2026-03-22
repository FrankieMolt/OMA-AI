# 📚 OMA-AI API Documentation
**Complete API Reference for All Endpoints**

_Last Updated: 2026-03-12 02:55 UTC_

---

## 🎯 Overview

**Base URL:** `https://api.oma-ai.com` (production) or `http://localhost:3000` (local)
**Version:** 1.0.0
**Authentication:** x402 payments (gasless) or API keys
**Rate Limiting:** 1000 requests/minute per user
**Content-Type:** `application/json`

---

## 📋 Table of Contents

1. [Health & Status](#health--status)
2. [MCP Marketplace](#mcp-marketplace)
3. [Marketplace Stats](#marketplace-stats)
4. [MCP List](#mcp-list)
5. [MCP Detail](#mcp-detail)
6. [MCP Register](#mcp-register)
7. [MCP Skill Detail](#mcp-skill-detail)
8. [Portfolio](#portfolio)
9. [Prices](#prices)
10. [Single Price](#single-price)
11. [Crypto Prices](#crypto-prices)
12. [Pricing](#pricing)
13. [Trading Signals](#trading-signals)
14. [Weather](#weather)
15. [Search](#search)
16. [Compute](#compute)
17. [Embeddings](#embeddings)
18. [Rate Limit](#rate-limit)

---

## HEALTH & STATUS

### GET `/api/health`

**Description:** Check health status of all platform APIs and endpoints

**Authentication:** None required

**Request:**
```bash
curl https://api.oma-ai.com/api/health
```

**Response (200 OK):**
```json
{
  "success": true,
  "platform": "OMA-AI",
  "version": "1.0.0",
  "timestamp": 1709323200000,
  "endpoints": [
    {
      "name": "price",
      "status": "ok",
      "code": 200,
      "message": "working"
    },
    {
      "name": "prices",
      "status": "ok",
      "code": 200,
      "message": "working"
    },
    {
      "name": "weather",
      "status": "ok",
      "code": 200,
      "message": "working"
    },
    {
      "name": "search",
      "status": "ok",
      "code": 200,
      "message": "working"
    },
    {
      "name": "compute",
      "status": "ok",
      "code": 200,
      "message": "working"
    },
    {
      "name": "marketplace",
      "status": "ok",
      "code": 200,
      "message": "working"
    }
  ],
  "stats": {
    "total_apis": 16,
    "free_apis": 10,
    "paid_apis": 6,
    "categories": ["crypto", "data", "ai", "utilities", "images", "finance", "space"]
  },
  "network": {
    "payment": "x402",
    "currency": "USDC",
    "chains": ["base", "solana"],
    "treasury": "0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6"
  }
}
```

**Error Codes:**
- `200`: All endpoints working
- `503`: Some endpoints down

**Rate Limit:** None

---

## MCP MARKETPLACE

### GET `/api/marketplace`

**Description:** Get list of all MCPs in marketplace with optional filters

**Authentication:** None required (public endpoint)

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|-----------|-----------|-------------|
| `category` | string | No | - | Filter by MCP category (e.g., "ai-ml", "data", "finance") |
| `search` | string | No | - | Search by name or description |
| `price_tier` | string | No | - | Filter by price tier (free, low, medium, high) |
| `sort` | string | No | popular | Sort order (popular, newest, rating, price-asc, price-desc) |
| `limit` | number | No | 50 | Maximum results to return (max 100) |
| `offset` | number | No | 0 | Pagination offset |

**Request:**
```bash
curl "https://api.oma-ai.com/api/marketplace?category=ai-ml&limit=10&sort=rating"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-here",
      "slug": "anthropic-claude-mcp",
      "name": "Anthropic Claude MCP",
      "description": "Access Claude 3 models for advanced AI tasks",
      "long_description": "A powerful MCP for Anthropic Claude models...",
      "category": "ai-ml",
      "tags": ["ai", "claude", "nlp", "llm"],
      "icon_url": "https://api.oma-ai.com/icons/anthropic-claude-mcp.png",
      "image_url": "https://api.oma-ai.com/images/anthropic-claude-mcp.png",
      "price_tier": "high",
      "pricing": {
        "call": 0.015,
        "per_thousand": 15.0,
        "currency": "USDC"
      },
      "version": "1.0.0",
      "status": "active",
      "is_official": true,
      "is_featured": true,
      "downloads": 1077,
      "monthly_active_users": 842,
      "total_calls": 1543200,
      "rating": 4.8,
      "review_count": 324,
      "tools": [
        {
          "name": "message",
          "description": "Send message to Claude",
          "input_schema": {
            "type": "object",
            "properties": {
              "model": { "type": "string" },
              "messages": { "type": "array" },
              "max_tokens": { "type": "number" },
              "temperature": { "type": "number" }
            },
            "required": ["model", "messages"]
          }
        }
      ],
      "repository_url": "https://github.com/anthropic-claude-mcp",
      "homepage_url": "https://www.oma-ai.com/mcp/anthropic-claude-mcp",
      "documentation_url": "https://docs.oma-ai.com/mcps/anthropic-claude-mcp"
    }
  ],
  "pagination": {
    "total": 19,
    "limit": 10,
    "offset": 0,
    "has_more": true
  },
  "categories": ["data", "ai-ml", "finance", "social", "communication", "utility", "development", "storage", "analytics", "security"]
}
```

**Error Codes:**
- `400`: Invalid query parameters
- `500`: Internal server error

**Rate Limit:** 100 requests/minute

---

## MARKETPLACE STATS

### GET `/api/marketplace/stats`

**Description:** Get marketplace statistics (total MCPs, active users, revenue, etc.)

**Authentication:** None required (public endpoint)

**Request:**
```bash
curl https://api.oma-ai.com/api/marketplace/stats
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total_mcps": 19,
    "total_official_mcps": 19,
    "active_mcps": 18,
    "inactive_mcps": 1,
    "total_users": 1543,
    "active_users": 847,
    "monthly_active_users": 1243,
    "total_calls": 15432000,
    "monthly_calls": 2178000,
    "daily_calls": 72600,
    "total_revenue": 4725.75,
    "monthly_revenue": 712.50,
    "daily_revenue": 23.75,
    "developer_earnings": 4489.46,
    "monthly_developer_earnings": 676.88,
    "platform_revenue": 236.29,
    "monthly_platform_revenue": 35.62,
    "categories": {
      "data": 3,
      "ai-ml": 4,
      "finance": 2,
      "social": 2,
      "communication": 2,
      "utility": 5,
      "development": 2,
      "storage": 1,
      "analytics": 0,
      "security": 0
    },
    "top_mcps": [
      {
        "slug": "stability-ai-mcp",
        "name": "Stability AI MCP",
        "monthly_calls": 234000,
        "rating": 3.5
      },
      {
        "slug": "sms-sender-mcp",
        "name": "SMS Sender MCP",
        "monthly_calls": 201000,
        "rating": 4.68
      },
      {
        "slug": "mongodb-query-mcp",
        "name": "MongoDB Query MCP",
        "monthly_calls": 186000,
        "rating": 3.65
      }
    ]
  }
}
```

**Rate Limit:** 10 requests/minute

---

## MCP LIST

### GET `/api/mcp/list`

**Description:** Get paginated list of all MCPs with full details

**Authentication:** None required (public endpoint)

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|-----------|-----------|-------------|
| `limit` | number | No | 50 | Maximum results (max 100) |
| `offset` | number | No | 0 | Pagination offset |
| `category` | string | No | - | Filter by category |
| `is_official` | boolean | No | - | Filter by official MCPs |
| `is_featured` | boolean | No | - | Filter by featured MCPs |

**Request:**
```bash
curl "https://api.oma-ai.com/api/mcp/list?limit=100&offset=0"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-here",
      "slug": "postgresql-query-mcp",
      "name": "PostgreSQL Query MCP",
      "description": "Execute SQL queries, manage tables",
      "category": "data",
      "price_tier": "medium",
      "pricing": {
        "call": 0.005,
        "per_thousand": 5.0,
        "currency": "USDC"
      },
      "status": "active",
      "is_official": true,
      "downloads": 860,
      "rating": 4.2,
      "review_count": 127
    }
  ],
  "pagination": {
    "total": 19,
    "limit": 100,
    "offset": 0,
    "has_more": false
  }
}
```

**Rate Limit:** 100 requests/minute

---

## MCP DETAIL

### GET `/api/mcp/[slug]`

**Description:** Get detailed information about a specific MCP

**Authentication:** None required (public endpoint)

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|-----------|-------------|
| `slug` | string | Yes | MCP slug (e.g., "anthropic-claude-mcp") |

**Request:**
```bash
curl https://api.oma-ai.com/api/mcp/anthropic-claude-mcp
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "slug": "anthropic-claude-mcp",
    "name": "Anthropic Claude MCP",
    "description": "Access Claude 3 models for advanced AI tasks",
    "long_description": "Full description with use cases, examples, and integration guide...",
    "category": "ai-ml",
    "tags": ["ai", "claude", "nlp", "llm"],
    "author": {
      "id": "uuid-author",
      "name": "FrankieMolt",
      "avatar_url": "https://github.com/oma-ai.png"
    },
    "icon_url": "https://api.oma-ai.com/icons/anthropic-claude-mcp.png",
    "image_url": "https://api.oma-ai.com/images/anthropic-claude-mcp.png",
    "repository_url": "https://github.com/anthropic-claude-mcp",
    "homepage_url": "https://www.oma-ai.com/mcp/anthropic-claude-mcp",
    "documentation_url": "https://docs.oma-ai.com/mcps/anthropic-claude-mcp",
    "price_tier": "high",
    "pricing": {
      "call": 0.015,
      "per_thousand": 15.0,
      "currency": "USDC",
      "free_tier_calls": 0,
      "monthly_limits": {
        "free": 0,
        "low": 10000,
        "medium": 50000,
        "high": 100000
      }
    },
    "version": "1.0.0",
    "status": "active",
    "is_official": true,
    "is_featured": true,
    "created_at": "2026-03-10T12:00:00Z",
    "updated_at": "2026-03-12T02:00:00Z",
    "downloads": 1077,
    "monthly_active_users": 842,
    "total_calls": 1543200,
    "rating": 4.8,
    "review_count": 324,
    "tools": [
      {
        "name": "message",
        "description": "Send message to Claude",
        "input_schema": {
          "type": "object",
          "properties": {
            "model": {
              "type": "string",
              "description": "Model to use (claude-3-opus-20240229, claude-3-sonnet-20240229, claude-3-haiku-20240307)"
            },
            "messages": {
              "type": "array",
              "description": "Array of message objects with role and content"
            },
            "max_tokens": {
              "type": "number",
              "description": "Maximum tokens to generate (max 200K)"
            },
            "temperature": {
              "type": "number",
              "description": "Sampling temperature (0.0-1.0, default 0.7)"
            }
          },
          "required": ["model", "messages"]
        }
      }
    ],
    "reviews": [
      {
        "id": "uuid-review",
        "user_id": "uuid-user",
        "username": "dev_john",
        "rating": 5,
        "title": "Excellent MCP",
        "comment": "Works perfectly, great documentation!",
        "created_at": "2026-03-11T10:00:00Z"
      }
    ],
    "usage_stats": {
      "daily_calls": 51440,
      "weekly_calls": 360080,
      "monthly_calls": 1543200,
      "avg_response_time": 125,
      "uptime": 99.95
    }
  }
}
```

**Error Codes:**
- `404`: MCP not found
- `500`: Internal server error

**Rate Limit:** 100 requests/minute

---

## MCP REGISTER

### POST `/api/mcp/register`

**Description:** Register a new MCP to marketplace (4-step wizard endpoint)

**Authentication:** Required (x402 payment or API key)

**Request Body:**
```json
{
  "name": "My Awesome MCP",
  "description": "Brief description (max 200 chars)",
  "long_description": "Full description with use cases, examples, integration guide...",
  "category": "ai-ml",
  "tags": ["ai", "nlp", "llm"],
  "repository_url": "https://github.com/my-mcp",
  "homepage_url": "https://www.oma-ai.com/mcp/my-awesome-mcp",
  "documentation_url": "https://docs.oma-ai.com/mcps/my-awesome-mcp",
  "icon_url": "https://api.oma-ai.com/icons/my-awesome-mcp.png",
  "image_url": "https://api.oma-ai.com/images/my-awesome-mcp.png",
  "price_tier": "medium",
  "pricing": {
    "call": 0.01,
    "per_thousand": 10.0
  },
  "tools": [
    {
      "name": "tool_name",
      "description": "Tool description",
      "input_schema": {
        "type": "object",
        "properties": {
          "param1": { "type": "string" }
        },
        "required": ["param1"]
      }
    }
  ],
  "version": "1.0.0"
}
```

**Request:**
```bash
curl -X POST https://api.oma-ai.com/api/mcp/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "name": "My Awesome MCP",
    "description": "Brief description",
    "long_description": "Full description...",
    "category": "ai-ml",
    "tags": ["ai", "nlp"],
    "price_tier": "medium",
    "pricing": {
      "call": 0.01,
      "per_thousand": 10.0
    },
    "tools": [...]
  }'
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "slug": "my-awesome-mcp",
    "status": "pending_approval",
    "message": "MCP submitted for review. Approval typically takes 24-48 hours."
  }
}
```

**Error Codes:**
- `400`: Invalid request body
- `401`: Unauthorized (invalid API key)
- `402`: Payment required (x402)
- `409`: Slug already exists
- `500`: Internal server error

**Rate Limit:** 10 requests/minute

---

## PRICES

### GET `/api/prices`

**Description:** Get prices for multiple cryptocurrencies

**Authentication:** None required (free endpoint, rate limited)

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|-----------|-----------|-------------|
| `ids` | string | Yes | - | Comma-separated crypto IDs (e.g., "bitcoin,ethereum,solana") |

**Request:**
```bash
curl "https://api.oma-ai.com/api/prices?ids=bitcoin,ethereum,solana"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "bitcoin",
      "symbol": "btc",
      "name": "Bitcoin",
      "current_price": {
        "usd": 67234.52
      },
      "price_change_percentage_24h": {
        "usd": 2.34
      },
      "market_cap": {
        "usd": 1320000000000
      },
      "total_volume": {
        "usd": 28500000000
      },
      "last_updated": "2026-03-12T02:55:00Z"
    },
    {
      "id": "ethereum",
      "symbol": "eth",
      "name": "Ethereum",
      "current_price": {
        "usd": 3456.78
      },
      "price_change_percentage_24h": {
        "usd": 1.23
      },
      "market_cap": {
        "usd": 415000000000
      },
      "total_volume": {
        "usd": 15400000000
      },
      "last_updated": "2026-03-12T02:55:00Z"
    },
    {
      "id": "solana",
      "symbol": "sol",
      "name": "Solana",
      "current_price": {
        "usd": 145.67
      },
      "price_change_percentage_24h": {
        "usd": -0.89
      },
      "market_cap": {
        "usd": 67000000000
      },
      "total_volume": {
        "usd": 2450000000
      },
      "last_updated": "2026-03-12T02:55:00Z"
    }
  ]
}
```

**Rate Limit:** 100 requests/minute

---

## SINGLE PRICE

### GET `/api/price`

**Description:** Get price for a single cryptocurrency

**Authentication:** None required (free endpoint, rate limited)

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|-----------|-----------|-------------|
| `id` | string | Yes | - | Crypto ID (e.g., "bitcoin", "ethereum", "solana") |

**Request:**
```bash
curl "https://api.oma-ai.com/api/price?id=bitcoin"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "current_price": {
      "usd": 67234.52
    },
    "price_change_percentage_24h": {
      "usd": 2.34
    },
    "market_cap": {
      "usd": 1320000000000
    },
    "total_volume": {
      "usd": 28500000000
    },
    "last_updated": "2026-03-12T02:55:00Z"
  }
}
```

**Error Codes:**
- `400`: Invalid crypto ID
- `404`: Crypto not found
- `429`: Rate limit exceeded

**Rate Limit:** 100 requests/minute

---

## CRYPTO PRICES

### GET `/api/crypto`

**Description:** Get crypto prices and market data (fallback to cached if API unavailable)

**Authentication:** None required

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|-----------|-----------|-------------|
| `ids` | string | No | bitcoin,ethereum,solana | Comma-separated crypto IDs |
| `vs_currency` | string | No | usd | Currency to compare against |

**Request:**
```bash
curl "https://api.oma-ai.com/api/crypto?ids=bitcoin,ethereum"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "bitcoin",
      "symbol": "btc",
      "name": "Bitcoin",
      "price": 67234.52,
      "change_24h": 2.34,
      "market_cap": 1320000000000,
      "volume_24h": 28500000000
    }
  ]
}
```

**Rate Limit:** 100 requests/minute

---

## TRADING SIGNALS

### GET `/api/signals`

**Description:** Get trading signals for Solana trading bot

**Authentication:** Required (API key)

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|-----------|-----------|-------------|
| `token` | string | No | - | Filter by token symbol |
| `limit` | number | No | 10 | Maximum signals to return |

**Request:**
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.oma-ai.com/api/signals?limit=20"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-signal",
      "token": "BONK",
      "action": "BUY",
      "entry_price": 0.00000589,
      "target_price": 0.00000700,
      "stop_loss": 0.00000450,
      "confidence": 85,
      "reason": "RSI oversold (24)",
      "timestamp": "2026-03-12T02:30:00Z",
      "status": "active"
    }
  ],
  "count": 6
}
```

**Error Codes:**
- `401`: Unauthorized
- `403`: Subscription required
- `500`: Internal server error

**Rate Limit:** 100 requests/minute

---

## WEATHER

### GET `/api/weather`

**Description:** Get current weather data for a city (fallback mode)

**Authentication:** None required

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|-----------|-----------|-------------|
| `city` | string | Yes | - | City name |
| `units` | string | No | metric | Units (metric, imperial) |

**Request:**
```bash
curl "https://api.oma-ai.com/api/weather?city=London&units=metric"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "city": "London",
    "temperature": 12.5,
    "feels_like": 10.2,
    "humidity": 72,
    "wind_speed": 15.3,
    "pressure": 1012,
    "description": "partly cloudy",
    "icon": "03d",
    "last_updated": "2026-03-12T02:55:00Z"
  }
}
```

**Rate Limit:** 100 requests/minute

---

## SEARCH

### GET `/api/search`

**Description:** Search for MCPs, content, and resources (fallback mode)

**Authentication:** None required

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|-----------|-----------|-------------|
| `q` | string | Yes | - | Search query |
| `type` | string | No | all | Search type (all, mcp, docs, code) |
| `limit` | number | No | 20 | Maximum results |

**Request:**
```bash
curl "https://api.oma-ai.com/api/search?q=weather+api&type=mcp&limit=10"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "type": "mcp",
      "id": "uuid-mcp",
      "title": "Weather API MCP",
      "description": "Free weather data and 7-day forecasts",
      "url": "/mcp/weather-api-mcp",
      "relevance": 0.95
    }
  ],
  "total": 3
}
```

**Rate Limit:** 100 requests/minute

---

## COMPUTE

### GET `/api/compute`

**Description:** Get compute provider information and pricing (AWS, Akash, etc.)

**Authentication:** None required

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|-----------|-----------|-------------|
| `action` | string | No | list | Action (list, pricing, compare) |

**Request:**
```bash
curl "https://api.oma-ai.com/api/compute?action=list"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "provider": "Akash Network",
      "pricing": {
        "cpu": "$0.01/vCPU/hour",
        "ram": "$0.01/GB/hour",
        "storage": "$0.01/GB/month"
      },
      "savings": "Up to 80% vs AWS"
    }
  ]
}
```

**Rate Limit:** 100 requests/minute

---

## EMBEDDINGS

### GET `/api/embeddings`

**Description:** Get text embeddings (fallback mode)

**Authentication:** None required

**Request Body:**
```json
{
  "text": "Text to generate embeddings for",
  "model": "text-embedding-3-small"
}
```

**Request:**
```bash
curl -X POST https://api.oma-ai.com/api/embeddings \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, world!",
    "model": "text-embedding-3-small"
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    0.1234,
    -0.5678,
    0.9012,
    ...
  ],
  "model": "text-embedding-3-small",
  "dimensions": 1536
}
```

**Rate Limit:** 100 requests/minute

---

## PRICING

### GET `/api/pricing`

**Description:** Get OMA-AI platform pricing and model pricing

**Authentication:** None required

**Request:**
```bash
curl https://api.oma-ai.com/api/pricing
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "platform": {
      "fee_percentage": 5,
      "developer_share": 95,
      "payout_threshold": 10,
      "payout_frequency": "monthly",
      "payout_day": 1,
      "supported_chains": ["base", "solana"],
      "payment_protocol": "x402",
      "currency": "USDC"
    },
    "user_tiers": [
      {
        "name": "Free",
        "price": 0,
        "calls_per_month": 100,
        "features": ["Basic access", "Rate limited"]
      },
      {
        "name": "Basic",
        "price": 5,
        "calls_per_month": 10000,
        "features": ["Priority support", "Higher rate limit"]
      },
      {
        "name": "Pro",
        "price": 25,
        "calls_per_month": 100000,
        "features": ["Dedicated support", "Unlimited access"]
      }
    ],
    "mcp_tiers": [
      {
        "name": "Free",
        "price": 0,
        "description": "Free to use"
      },
      {
        "name": "Low",
        "price": "0.0001-0.001",
        "description": "Low cost per call"
      },
      {
        "name": "Medium",
        "price": "0.001-0.01",
        "description": "Medium cost per call"
      },
      {
        "name": "High",
        "price": "0.01-0.10",
        "description": "Premium features"
      }
    ],
    "models": {
      "claude-3-opus-20240229": {
        "price_per_1m_tokens": 15.0,
        "context": 200000
      },
      "claude-3-sonnet-20240229": {
        "price_per_1m_tokens": 3.0,
        "context": 200000
      },
      "claude-3-haiku-20240307": {
        "price_per_1m_tokens": 0.25,
        "context": 200000
      }
    }
  }
}
```

**Rate Limit:** 10 requests/minute

---

## RATE LIMIT

### GET `/api/rate-limit`

**Description:** Check current rate limit status for your API key

**Authentication:** Required (API key)

**Request:**
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.oma-ai.com/api/rate-limit
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "limit": 1000,
    "remaining": 957,
    "reset": 1709323800,
    "reset_in_seconds": 1200
  }
}
```

**Error Codes:**
- `401`: Unauthorized
- `429`: Rate limit exceeded

**Rate Limit:** 100 requests/minute

---

## PORTFOLIO

### GET `/api/portfolio`

**Description:** Get wallet portfolio data with transactions and metrics

**Authentication:** Required (API key)

**Request:**
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.oma-ai.com/api/portfolio
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "wallet_address": "DcPfnhNQt98oXhgA7shgXpo2pgTzJMKf6TWuaddqqpSN",
    "balances": {
      "SOL": 0.003108544,
      "USDC": 150.75
    },
    "total_value_usd": 150.75,
    "positions": [],
    "transactions": [
      {
        "id": "uuid-tx",
        "type": "swap",
        "from_token": "USDC",
        "to_token": "SOL",
        "amount": 100,
        "price": 84.52,
        "timestamp": "2026-03-10T19:08:00Z"
      }
    ],
    "metrics": {
      "total_volume": 10500,
      "monthly_trades": 20,
      "win_rate": 0.65,
      "pnl": 234.50
    }
  }
}
```

**Error Codes:**
- `401`: Unauthorized
- `500`: Internal server error

**Rate Limit:** 100 requests/minute

---

## ERROR CODES

All endpoints return consistent error codes:

| Code | Description | Solution |
|------|-------------|----------|
| `200` | Success | - |
| `201` | Created (POST) | - |
| `400` | Bad Request | Check request body/query parameters |
| `401` | Unauthorized | Check API key or authentication |
| `402` | Payment Required | Complete x402 payment |
| `403` | Forbidden | Check permissions |
| `404` | Not Found | Check resource ID/SLUG |
| `409` | Conflict | Resource already exists |
| `429` | Rate Limit Exceeded | Wait and retry |
| `500` | Internal Server Error | Try again later |
| `503` | Service Unavailable | Service temporarily down |

---

## RATE LIMITING

**Default Limits:**
- Unauthenticated: 100 requests/minute
- Authenticated (Free tier): 1,000 requests/minute
- Authenticated (Basic tier): 10,000 requests/minute
- Authenticated (Pro tier): 100,000 requests/minute

**Headers Returned:**
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 957
X-RateLimit-Reset: 1709323800
X-RateLimit-ResetInSeconds: 1200
```

---

## AUTHENTICATION

### x402 Payments (Gasless)

**How it Works:**
1. User signs payment intent (off-chain)
2. OMA-AI relayer executes transaction (pays gas)
3. User pays $0 in gas

**Signature:**
```typescript
const paymentIntent = {
  mcp_id: "anthropic-claude-mcp",
  user_id: "uuid-user",
  amount: "0.015",
  timestamp: Date.now(),
  nonce: generateRandomNonce()
};

const signature = await wallet.signMessage(JSON.stringify(paymentIntent));
```

**Headers:**
```
Authorization: x402 signature=<signature> intent=<intent-json>
```

### API Keys

**Generate API Key:**
```bash
curl -X POST https://api.oma-ai.com/api/auth/generate-key \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"name": "My App Key"}'
```

**Use API Key:**
```
Authorization: Bearer YOUR_API_KEY
```

---

## CODE EXAMPLES

### TypeScript (Fetch)

```typescript
interface MCP {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  price_tier: string;
  rating: number;
}

async function getMCPs(): Promise<MCP[]> {
  const response = await fetch('https://api.oma-ai.com/api/marketplace?limit=10');
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'API error');
  }

  return data.data;
}

// Usage
const mcps = await getMCPs();
console.log(`Found ${mcps.length} MCPs`);
```

### Python (Requests)

```python
import requests

def get_mcp(slug: str) -> dict:
    response = requests.get(
        f'https://api.oma-ai.com/api/mcp/{slug}',
        headers={'Authorization': f'Bearer {API_KEY}'}
    )

    data = response.json()

    if not data['success']:
        raise Exception(data.get('error', 'API error'))

    return data['data']

# Usage
mcp = get_mcp('anthropic-claude-mcp')
print(f"MCP: {mcp['name']}")
print(f"Rating: {mcp['rating']}")
```

### cURL

```bash
# Get marketplace
curl "https://api.oma-ai.com/api/marketplace?category=ai-ml&limit=10"

# Get MCP detail
curl https://api.oma-ai.com/api/mcp/anthropic-claude-mcp

# Register MCP
curl -X POST https://api.oma-ai.com/api/mcp/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "name": "My MCP",
    "description": "Description",
    "category": "ai-ml",
    "price_tier": "medium",
    "tools": [...]
  }'
```

---

## WEBHOOKS

### Setup Webhook

```typescript
const webhookUrl = 'https://your-server.com/webhooks/oma-ai';

// Register webhook
await fetch('https://api.oma-ai.com/api/webhooks/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  },
  body: JSON.stringify({
    url: webhookUrl,
    events: ['mcp.call', 'payment.received', 'payout.completed']
  })
});
```

### Webhook Payload

```json
{
  "event": "mcp.call",
  "timestamp": "2026-03-12T02:55:00Z",
  "data": {
    "mcp_id": "anthropic-claude-mcp",
    "user_id": "uuid-user",
    "call_count": 1,
    "amount": 0.015
  }
}
```

---

## SDKs

### JavaScript/TypeScript

```bash
npm install @oma-ai/sdk
```

```typescript
import { OMAI } from '@oma-ai/sdk';

const oma = new OMAI({ apiKey: 'YOUR_API_KEY' });

// Get MCP
const mcp = await oma.getMCP('anthropic-claude-mcp');

// Call MCP tool
const result = await oma.callTool({
  mcp_id: 'anthropic-claude-mcp',
  tool: 'message',
  parameters: {
    model: 'claude-3-opus-20240229',
    messages: [{ role: 'user', content: 'Hello!' }]
  }
});
```

### Python

```bash
pip install oma-ai-sdk
```

```python
from oma_ai import OMAI

oma = OMAI(api_key='YOUR_API_KEY')

# Get MCP
mcp = oma.get_mcp('anthropic-claude-mcp')

# Call MCP tool
result = oma.call_tool(
    mcp_id='anthropic-claude-mcp',
    tool='message',
    parameters={
        'model': 'claude-3-opus-20240229',
        'messages': [{'role': 'user', 'content': 'Hello!'}]
    }
)
```

---

## SUPPORT

- **Documentation:** https://docs.oma-ai.com
- **API Status:** https://api.oma-ai.com/api/health
- **GitHub Issues:** https://github.com/oma-ai/issues
- **Discord:** https://discord.gg/oma-ai
- **Email:** support@oma-ai.com
- **Twitter:** @oma_ai

---

*Last Updated: 2026-03-12 02:55 UTC*
*API Version: 1.0.0*
