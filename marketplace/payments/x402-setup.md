# X402 Payment Integration

## Overview

X402 is a micropayment protocol enabling instant, low-cost payments on Base and Solana networks.

## How X402 Works

```
1. Client requests paid endpoint
2. Server returns 402 with payment details
3. Client creates payment proof (on-chain tx)
4. Client retries with X-Payment header
5. Server verifies and returns data
```

## Payment Flow

```
┌─────────┐    GET /api/price    ┌─────────┐
│  Client │ ──────────────────► │  Server │
└─────────┘                     └─────────┘
                                    │
                              402 Response
                          {x402: {amount, recipient}}
                                    │
                                    ▼
┌─────────┐    Send USDC on Base   ┌─────────┐
│  Client │ ──────────────────► │  Chain   │
└─────────┘                     └─────────┘
     │
     │ Get tx hash + sign
     ▼
┌─────────┐  GET /api/price       ┌─────────┐
│  Client │  X-Payment: proof     │  Server │
└─────────┘ ──────────────────► │         │
                              └─────────┘
                                    │
                              Verify on-chain
                                    │
                                    ▼
                              200 Response
                              {data: ...}
```

## Server Implementation

```javascript
import { verifyX402 } from '@x402/sdk';

const PAYMENT_CONFIG = {
  recipient: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6',
  network: 'base-mainnet',
  prices: {
    '/api/price': '0.00',
    '/api/weather': '0.02',
    '/api/search': '0.03',
    '/api/scrape': '0.05',
    '/api/llm': '0.005'
  }
};

async function handlePaidEndpoint(req, res, endpoint) {
  const proof = req.headers['x-payment'];
  const amount = PAYMENT_CONFIG.prices[endpoint];
  
  // Free endpoints
  if (amount === '0.00') {
    return { authorized: true };
  }
  
  // Check payment proof
  if (!proof) {
    return res.status(402).json({
      error: 'Payment required',
      x402: {
        version: '1.0',
        amount,
        recipient: PAYMENT_CONFIG.recipient,
        network: PAYMENT_CONFIG.network,
        description: `Access to ${endpoint}`
      }
    });
  }
  
  // Verify payment
  const verification = await verifyX402(proof, {
    recipient: PAYMENT_CONFIG.recipient,
    amount,
    network: PAYMENT_CONFIG.network
  });
  
  if (!verification.valid) {
    return res.status(402).json({
      error: 'Invalid payment',
      details: verification.error
    });
  }
  
  return { authorized: true, payment: verification };
}
```

## Client Implementation

```javascript
import { createX402Proof } from '@x402/sdk';

async function callPaidAPI(endpoint, params) {
  // First attempt
  let response = await fetch(`https://oma-ai.com${endpoint}`, { params });
  
  if (response.status === 402) {
    const { x402 } = await response.json();
    
    // Create payment
    const proof = await createX402Proof({
      amount: x402.amount,
      recipient: x402.recipient,
      network: x402.network,
      wallet: userWallet
    });
    
    // Retry with payment
    response = await fetch(`https://oma-ai.com${endpoint}`, {
      params,
      headers: { 'X-Payment': proof }
    });
  }
  
  return response.json();
}
```

## Supported Networks

| Network | Chain ID | Currency |
|---------|----------|----------|
| Base Mainnet | 8453 | USDC |
| Base Sepolia | 84532 | USDC |
| Solana | - | USDC |

## Pricing Tiers

| Endpoint | Price | Free Tier |
|----------|-------|-----------|
| /api/price | FREE | Unlimited |
| /api/weather | $0.02 | 100/month |
| /api/search | $0.03 | 50/month |
| /api/scrape | $0.05 | 20/month |
| /api/llm | $0.005+ | 10/month |

## Security

- Verify all payments on-chain
- Check payment amounts exactly
- Validate recipient address
- Prevent replay attacks with nonces
- Rate limit by wallet address
