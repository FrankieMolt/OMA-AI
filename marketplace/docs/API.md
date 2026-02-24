# Open Market Access API

## Base URL

```
https://api.openmarketaccess.io
```

## Authentication

All paid endpoints require an `X-Payment` header with a valid x402 payment proof.

```bash
curl -H "X-Payment: <proof>" https://api.openmarketaccess.io/price
```

## Endpoints

### Health Check

```http
GET /health
```

**Price:** FREE

**Response:**
```json
{
  "status": "ok",
  "uptime": 3600,
  "version": "1.0.0"
}
```

### Crypto Prices

```http
GET /price
```

**Price:** $0.05

**Response:**
```json
{
  "data": {
    "sol": { "price": 76.50, "change": 2.3 },
    "btc": { "price": 43250, "change": -0.5 },
    "eth": { "price": 2280, "change": 1.2 }
  }
}
```

### Trading Signals

```http
GET /signal
```

**Price:** $0.25

**Response:**
```json
{
  "signal": "BUY",
  "confidence": 0.85,
  "assets": ["SOL", "ETH"],
  "reasoning": "Strong momentum detected..."
}
```

### Polymarket Data

```http
GET /markets
```

**Price:** $0.10

**Response:**
```json
{
  "markets": [
    {
      "id": "abc123",
      "question": "Will BTC reach $100K?",
      "yesPrice": 0.35,
      "volume": 5000000
    }
  ]
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request |
| 401 | Payment Required |
| 402 | Invalid Payment |
| 429 | Rate Limited |
| 500 | Server Error |

## Rate Limits

| Tier | Requests/Min |
|------|--------------|
| Free | 100 |
| Pro | 1,000 |
| Enterprise | Unlimited |
