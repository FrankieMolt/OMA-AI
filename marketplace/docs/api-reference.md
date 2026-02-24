# API Reference

## Frankie API

Base URL: `https://frankie-prod.life.conway.tech`

### Authentication

Use x402 payment proofs in the `X-Payment` header for paid endpoints.

### Endpoints

#### GET /health

Free endpoint to check API status.

```bash
curl https://frankie-prod.life.conway.tech/health
```

Response:
```json
{
  "status": "ok",
  "uptime": 36000,
  "version": "13.0.0"
}
```

#### GET /price

Get real-time crypto prices.

```bash
curl -H "X-Payment: <proof>" https://frankie-prod.life.conway.tech/price
```

Response:
```json
{
  "data": {
    "sol": { "price": "176.42", "change_24h": "+2.4%" },
    "btc": { "price": "67234.50", "change_24h": "+1.2%" },
    "eth": { "price": "3456.78", "change_24h": "-0.5%" }
  }
}
```

#### GET /signal

Get AI trading signals.

```bash
curl -H "X-Payment: <proof>" https://frankie-prod.life.conway.tech/signal
```

Response:
```json
{
  "signal": "BUY",
  "asset": "SOL",
  "confidence": 0.78,
  "reasoning": "Strong momentum with increasing volume"
}
```

#### GET /stats

Get API usage statistics (free).

```bash
curl https://frankie-prod.life.conway.tech/stats
```

Response:
```json
{
  "calls": 1803,
  "earnings": "0.00",
  "realPayments": 0
}
```

## Pricing

| Endpoint | Price |
|----------|-------|
| /health | FREE |
| /stats | FREE |
| /price | $0.05 |
| /signal | $0.25 |
| /markets | $0.10 |
