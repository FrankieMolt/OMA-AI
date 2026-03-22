# OMA-AI Platform Documentation

## Overview

OMA-AI (Open Market Access) is a decentralized API marketplace for AI agents, powered by x402 micropayments on the Base network.

---

## Quick Start

### 1. Install SDK

```bash
npm install @oma-ai/sdk
```

### 2. Connect Wallet

```javascript
import { OMAClient } from '@oma-ai/sdk';

const client = new OMAClient();

// Connect wallet (browser)
const wallet = await client.wallet.connect();
console.log('Connected:', wallet.address);
```

### 3. Use APIs

```javascript
// Get crypto prices (free)
const prices = await client.prices.get();
console.log('BTC:', prices.bitcoin.price);

// AI generation
const result = await client.ai.generate('Write a haiku about AI');

// Weather
const weather = await client.weather.get('San Francisco');

// Web search
const results = await client.search.search('AI agents');
```

---

## API Reference

### Price API

**Endpoint:** `GET /api/price`

Returns BTC, ETH, SOL prices from CoinGecko.

```json
{
  "success": true,
  "data": {
    "btc": { "price": 66159, "change_24h": 3.15, "symbol": "BTC" },
    "eth": { "price": 1930, "change_24h": 4.78, "symbol": "ETH" },
    "sol": { "price": 82, "change_24h": 5.93, "symbol": "SOL" }
  }
}
```

**Extended Prices:** `GET /api/prices`
- Returns 10 cryptocurrencies

**Premium:** `GET /api/premium-price`
- Requires x402 payment ($0.001)
- Returns extended data with market cap

### LLM API

**Endpoint:** `GET /api/llm`

| Parameter | Type | Description |
|-----------|------|-------------|
| prompt | string | Input text |
| model | string | Model to use (default: gpt2) |
| temperature | number | 0-1 (default: 0.7) |

### Weather API

**Endpoint:** `GET /api/weather`

| Parameter | Type | Description |
|-----------|------|-------------|
| city | string | City name (default: New York) |

### Search API

**Endpoint:** `GET /api/search`

| Parameter | Type | Description |
|-----------|------|-------------|
| q | string | Search query |
| limit | number | Results (default: 10) |

---

## x402 Payments

### How It Works

1. **User has USDC** on Base network
2. **API call made** without payment → returns 402
3. **Payment header** created with authorization
4. **Request retried** with payment header
5. **Server verifies** and processes payment
6. **Data returned** to user

### Payment Requirement Format

```json
{
  "x402-version": 1,
  "scheme": "erc20",
  "currency": "USDC",
  "amount": "0.001",
  "recipient": "0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6",
  "network": "base",
  "description": "Premium crypto data"
}
```

### Revenue Split

- **Publisher:** 90%
- **Platform:** 10%

---

## Wallet Integration

### Supported Wallets
- MetaMask
- Coinbase Wallet
- Rainbow Wallet

### Code Example

```javascript
import { WalletAPI } from '@oma-ai/sdk';

const wallet = new WalletAPI();

// Connect
const info = await wallet.connect();
console.log('Address:', info.address);
console.log('USDC Balance:', info.usdcBalance);

// Get payment requirement
const requirement = wallet.getPaymentRequirement('0.001', 'API access');
```

---

## Supabase Database Schema

### Tables

#### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address VARCHAR(44) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### apis
```sql
CREATE TABLE apis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id),
  name VARCHAR(255),
  endpoint VARCHAR(500),
  price_per_call DECIMAL(18,6) DEFAULT 0.001,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### api_calls
```sql
CREATE TABLE api_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_id UUID REFERENCES apis(id),
  user_id UUID REFERENCES users(id),
  amount DECIMAL(18,6),
  tx_hash VARCHAR(66),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# x402
PRIVATE_KEY=0x...
TREASURY_WALLET_BASE=0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6

# APIs (free tiers available)
GOOGLE_AI_KEY=xxx
NVIDIA_API_KEY=xxx

# Base Network
NEXT_PUBLIC_BASE_RPC=https://mainnet.base.org
NEXT_PUBLIC_USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
```

---

## Smart Contract

### OMAEscrow

**Location:** `contracts/OMAEscrow.sol`

**Features:**
- USDC deposits
- Automated revenue splitting (90/10)
- Publisher management
- API pricing

**Deploy:**
```bash
npx hardhat run scripts/deploy.js --network base
```

---

## SDK Documentation

### Classes

| Class | Description |
|-------|-------------|
| `OMAClient` | Main client |
| `PriceAPI` | Crypto prices |
| `LLMAPI` | AI text generation |
| `WeatherAPI` | Weather forecasts |
| `SearchAPI` | Web search |
| `WalletAPI` | Wallet connection |

### Error Handling

```javascript
try {
  const prices = await client.prices.get();
} catch (error) {
  if (error.message.includes('Payment required')) {
    // Handle 402 - need to pay
    const payment = JSON.parse(error.message.replace('Payment required: ', ''));
    // Send payment and retry
  }
}
```

---

## Support

- Discord: https://discord.gg/oma-ai
- GitHub: https://github.com/oma-ai
- Email: hello@oma-ai.com