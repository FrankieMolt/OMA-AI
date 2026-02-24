# OMA-AI API Endpoints

## Base URL

```
https://oma-ai.com/api
```

## Authentication

All endpoints support x402 payments:

```bash
curl -H "X-Payment: <proof>" https://oma-ai.com/api/endpoint
```

---

## LLM API

### POST /llm

Access LLMs with markup pricing.

**Request:**
```json
{
  "model": "llama-3.1-8b",
  "messages": [
    {"role": "user", "content": "Hello!"}
  ]
}
```

**Available Models:**

| Model | Price/Request | Markup |
|-------|---------------|--------|
| llama-3.1-8b | $0.005 | 250x |
| llama-3.1-70b | $0.02 | 166x |
| llama-3.1-405b | $0.05 | 25x |
| gpt-4o-mini | $0.01 | 66x |
| gpt-4o | $0.03 | 12x |
| claude-3.5-sonnet | $0.025 | 8x |
| claude-3-haiku | $0.008 | 32x |
| mistral-large | $0.02 | 10x |
| deepseek-v3 | $0.015 | 55x |
| qwen-2.5-72b | $0.018 | 51x |

**Response:**
```json
{
  "choices": [{"message": {"content": "..."}}],
  "payment": {"charged": 0.005}
}
```

---

## Price API

### GET /price

Get cryptocurrency prices.

**Free endpoint**

```bash
curl https://oma-ai.com/api/price
```

**Response:**
```json
{
  "data": {
    "btc": {"price": 67234.50, "change_24h": 1.2},
    "eth": {"price": 3456.78, "change_24h": -0.5},
    "sol": {"price": 176.42, "change_24h": 2.4}
  },
  "source": "coingecko"
}
```

---

## Weather API

### GET /weather

Get weather data.

**Price:** $0.02

```bash
curl "https://oma-ai.com/api/weather?city=London"
```

**Response:**
```json
{
  "location": "London",
  "temp": 15.2,
  "feels_like": 14.8,
  "humidity": 72,
  "description": "scattered clouds",
  "wind": 5.1
}
```

---

## Search API

### GET /search

Search the web.

**Price:** $0.03

```bash
curl "https://oma-ai.com/api/search?q=crypto+news"
```

**Response:**
```json
{
  "query": "crypto news",
  "abstract": "...",
  "related": [...]
}
```

---

## Scrape API

### GET /scrape

Scrape web pages.

**Price:** $0.05

```bash
curl "https://oma-ai.com/api/scrape?url=https://example.com"
```

**Response:**
```json
{
  "url": "https://example.com",
  "title": "Example",
  "text": "...",
  "length": 5000
}
```

---

## Pricing Summary

| Endpoint | Price | Free Tier |
|----------|-------|-----------|
| /price | FREE | Unlimited |
| /weather | $0.02 | 100/month |
| /search | $0.03 | 50/month |
| /scrape | $0.05 | 20/month |
| /llm | varies | 10/month |

---

## Rate Limits

| Tier | Requests/min | Requests/month |
|------|--------------|----------------|
| Free | 10 | 1,000 |
| Pro ($9/mo) | 100 | 50,000 |
| Enterprise | Unlimited | Unlimited |
