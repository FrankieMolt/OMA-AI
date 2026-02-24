# polymarket-analysis

> Real-time prediction market analysis and trading signals from Polymarket.

## Installation

```bash
oma install polymarket-analysis
```

## Configuration

```json
{
  "skills": {
    "polymarket-analysis": {
      "api_key": "YOUR_POLYMARKET_API_KEY",
      "markets": ["politics", "sports", "crypto"]
    }
  }
}
```

## Tools Provided

| Tool | Description |
|------|-------------|
| `get_markets` | List active prediction markets |
| `get_odds` | Get current odds for a market |
| `analyze_market` | AI analysis of market trends |
| `get_positions` | View open positions |

## Example Usage

```javascript
// Get all active markets
const markets = await polymarket.getMarkets({ limit: 10 });

// Analyze a specific market
const analysis = await polymarket.analyzeMarket({
  marketId: 'will-bitcoin-hit-100k',
  timeframe: '7d'
});
```

## Pricing

- **$0.10** per API call
- **$25/month** unlimited

## Version

2.1.0
