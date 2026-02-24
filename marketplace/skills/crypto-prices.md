# crypto-prices

> Real-time cryptocurrency prices from multiple exchanges.

## Install

```bash
oma install crypto-prices
```

## Version
2.0.0

## Description

Get real-time cryptocurrency prices from Coinbase Pro, Binance, and other major exchanges. Supports SOL, BTC, ETH, and 100+ other tokens.

## Usage

```javascript
import { cryptoPrices } from '@oma/crypto-prices';

// Get single price
const solPrice = await cryptoPrices.get('SOL');
console.log(solPrice); // { price: 76.50, change: 2.3 }

// Get multiple prices
const prices = await cryptoPrices.getAll(['SOL', 'BTC', 'ETH']);
console.log(prices);
// {
//   SOL: { price: 76.50, change: 2.3 },
//   BTC: { price: 43250, change: -0.5 },
//   ETH: { price: 2280, change: 1.2 }
// }
```

## API

### `get(symbol)`
Get price for a single token.

### `getAll(symbols)`
Get prices for multiple tokens.

### `getHistory(symbol, period)`
Get historical prices.

## Price

$0.05 per request

## Data Sources

- Coinbase Pro (primary)
- Binance (backup)
- CoinGecko (fallback)

## Rate Limits

- 100 requests/minute (free tier)
- 1000 requests/minute (paid tier)
