# advanced-trading

> Professional trading analysis with technical indicators and AI signals

## Overview

Advanced trading skill providing:
- Technical analysis (RSI, MACD, Bollinger Bands)
- AI-powered buy/sell signals
- Risk assessment
- Portfolio optimization

## Installation

```bash
oma install advanced-trading
```

## Configuration

```json
{
  "skills": {
    "advanced-trading": {
      "enabled": true,
      "config": {
        "risk_tolerance": "medium",
        "assets": ["SOL", "BTC", "ETH"],
        "timeframe": "1h"
      }
    }
  }
}
```

## Tools

### analyze_technical

Perform technical analysis on an asset.

**Parameters:**
- `asset` (string): Asset symbol (SOL, BTC, ETH)
- `indicators` (array): List of indicators to calculate

**Example:**
```javascript
const analysis = await trading.analyzeTechnical({
  asset: 'SOL',
  indicators: ['rsi', 'macd', 'bollinger']
});
// Returns: { rsi: 65, macd: { signal: 'buy' }, ... }
```

### get_signal

Get AI-powered trading signal.

**Parameters:**
- `asset` (string): Asset symbol
- `timeframe` (string): Analysis timeframe

**Example:**
```javascript
const signal = await trading.getSignal({
  asset: 'SOL',
  timeframe: '1h'
});
// Returns: { signal: 'BUY', confidence: 0.78, entry: 175.50 }
```

### calculate_risk

Calculate position size and risk.

**Parameters:**
- `capital` (number): Total capital
- `risk_percent` (number): Risk per trade
- `entry` (number): Entry price
- `stop` (number): Stop loss price

## Pricing

- **Free Tier:** 10 signals/day
- **Pro:** $9.99/month unlimited

## Version

1.0.0
