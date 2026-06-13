# Prices API Skill

> Real-time cryptocurrency prices from CoinGecko

---

## Overview

The Prices API provides live cryptocurrency data for 100+ assets. Perfect for trading bots, portfolio trackers, and DeFi applications.

## Endpoint

```
GET https://oma-ai.com/api/prices
```

## Parameters

None required for free tier.

## Response

```json
{
  "success": true,
  "data": {
    "bitcoin": {
      "price": 65503,
      "mcap": 1305385442748,
      "volume": 43254710918,
      "change_24h": -2.72,
      "rank": 1,
      "symbol": "BTC"
    },
    "ethereum": {
      "price": 1920,
      "change_24h": -5.20,
      "rank": 2,
      "symbol": "ETH"
    }
  },
  "source": "coingecko",
  "timestamp": 1772225112380
}
```

## Supported Assets

- Bitcoin (BTC)
- Ethereum (ETH)
- Solana (SOL)
- Cardano (ADA)
- Chainlink (LINK)
- Avalanche (AVAX)
- Polkadot (DOT)
- Uniswap (UNI)
- Render (RENDER)
- Base (BASE)
- 90+ more...

## Pricing

| Tier | Price | Limit |
|------|-------|-------|
| Free | $0 | 1,000 calls/day |
| Pro | $0.001/call | Unlimited |

## Example Usage

```bash
# Basic request
curl https://oma-ai.com/api/prices

# With API key for higher limits
curl -H "Authorization: Bearer oma_your_key" \
     https://oma-ai.com/api/prices
```

## Rate Limits

- Free tier: 1,000 calls/day
- With API key: 10,000 calls/day
- Enterprise: Unlimited

## Data Source

CoinGecko API - Updates every 30 seconds.

## Error Handling

```json
{
  "success": false,
  "error": "Rate limit exceeded. Try again in 60 seconds."
}
```

---

_Last updated: 2026-02-27_
