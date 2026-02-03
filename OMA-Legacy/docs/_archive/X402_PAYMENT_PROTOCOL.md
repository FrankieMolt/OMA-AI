# x402 Payment Protocol - Developer Documentation

## Overview

The x402 protocol is OpenMarketAccess's core innovation - a modern implementation of HTTP 402 (Payment Required) optimized for Solana blockchain micropayments.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client                         │
│                      │                                │
│         ┌──────────▼─────────┐                   │
│         │  Request Resource  │                   │
│         └───────────┬─────────┘                   │
│                      │                                │
┌───────────────────────▼──────────────────────────────┐ │
│           Server (OMA Gateway/Backend)              │ │
└───────────────────────┬──────────────────────────────┘ │
│                      │ 402 + Payment Requirements          │
┌───────────────────────▼──────────────────────────────┐ │
│        Client (Retry with Signature)               │ │
└───────────────────────┬──────────────────────────────┘ │
│                      │ PAYMENT-SIGNATURE header           │
┌───────────────────────▼──────────────────────────────┐ │
│           Server (Verify & Execute)                 │ │
└───────────────────────┬──────────────────────────────┘ │
│                      │ Response (200 OK)                 │
└───────────────────────▼──────────────────────────────┘ │
```

## Implementation

### 1. Middleware (`x402-middleware.ts`)

The middleware handles HTTP 402 requests and payment verification.

**Key Features:**
- Replay attack protection (5-minute cache TTL)
- Cryptographic signature verification (Ed25519)
- Nonce-based validation
- Timestamp validation (±5min tolerance)
- Amount variance tolerance (epsilon: 0.0001)
- Rate limiting
- Request ID tracking

**Usage:**
```typescript
import { x402Middleware } from '@/lib/x402-middleware';

export async function GET(req: NextRequest) {
  const result = await x402Middleware(
    req,
    price: 0.01,
    walletAddress: 'TreasuryWalletAddress'
  );

  if (result) {
    return result; // Returns 402 with payment requirements
  }

  // Payment verified, proceed with request
  return NextResponse.json({ data: 'success' });
}
```

### 2. Gateway (`gateway/src/index.ts`)

Local MCP Gateway that handles automatic x402 payments.

**Key Features:**
- Optimistic execution with fallback payment flow
- Wallet signature generation (Ed25519)
- Connection pooling for performance
- MCP proxying with payment enforcement

**Usage:**
```bash
# Install and run gateway
npm install -g @openmarketaccess/gateway
oma-gateway
```

### 3. Solana Service (`solana.ts`)

Service for Solana blockchain operations.

**Key Features:**
- Connection pool management
- Automatic retry with exponential backoff
- Health checks (30-second intervals)
- Transaction verification
- Token balance queries (USDC/SOL)

**Usage:**
```typescript
import { solanaService } from '@/lib/solana';

// Verify payment signature
const isValid = await solanaService.verifyPaymentSignature({
  amount: '0.01',
  recipient: 'TreasuryWalletAddress',
  nonce: 'unique-nonce',
  timestamp: Date.now(),
  signature: 'base58-signature',
  publicKey: 'sender-public-key',
});

// Get token balance
const balance = await solanaService.getTokenBalance(walletAddress, USDC_MINT);
```

### 4. Database Schema

**x402_escrows Table:**
```sql
CREATE TABLE x402_escrows (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  task_id INTEGER REFERENCES agent_tasks(id),
  amount REAL NOT NULL,
  currency TEXT DEFAULT 'USDC',
  recipient_address TEXT NOT NULL,
  network TEXT DEFAULT 'base-sepolia',
  solana_tx_id TEXT,
  status TEXT DEFAULT 'escrowed',
  settled_amount REAL,
  refund_amount REAL,
  failure_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Payment Flow

### Step 1: Request (No Payment)

```http
GET /api/agents/my-agent/execute
Headers: {
  Authorization: "Bearer user-token"
}
```

**Response (402 Payment Required):**
```json
{
  "network": "solana",
  "chainId": "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  "token": "USDC",
  "amount": "0.01",
  "recipient": "TreasuryWalletAddress",
  "description": "Payment for /api/agents/my-agent/execute",
  "nonce": "unique-nonce-12345",
  "expiration": 1706140900000,
  "instructions": "Send USDC to recipient address with specified amount. Include transaction signature in PAYMENT-SIGNATURE header.",
  "requestId": "req-abc-123"
}
```

Headers:
```http
Content-Type: application/json
Payment-Required: true
WWW-Authenticate: x402 realm="OpenMarketAccess", token="USDC", amount="0.01", recipient="TreasuryWalletAddress", nonce="unique-nonce-12345"
Cache-Control: no-cache, no-store, must-revalidate
X-Request-ID: req-abc-123
```

### Step 2: Payment (With Signature)

```http
GET /api/agents/my-agent/execute
Headers: {
  Authorization: "Bearer user-token",
  PAYMENT-SIGNATURE: JSON encoded payment signature
}
```

**PAYMENT-SIGNATURE Header (JSON):**
```json
{
  "amount": "0.01",
  "recipient": "TreasuryWalletAddress",
  "nonce": "unique-nonce-12345",
  "timestamp": 1706140900000,
  "signature": "base58-encoded-signature",
  "publicKey": "sender-public-key"
}
```

### Step 3: Execution (Payment Verified)

```http
HTTP/1.1 200 OK
X-OMA-Payment-Verified: true
Content-Type: application/json

{
  "status": "success",
  "result": { ... },
  "paymentVerified": true
}
```

## Security Features

### 1. Replay Attack Protection

- **Cache TTL:** 5 minutes
- **Cache Key:** `paymentHeader:path:clientIp`
- **Max Cache Size:** 10,000 entries
- **Automatic Cleanup:** Every 60 seconds

### 2. Signature Verification

- **Algorithm:** Ed25519 (Solana standard)
- **Message Format:** `amount:recipient:nonce:timestamp`
- **Verification:** `nacl.sign.detached.verify()`

### 3. Timestamp Validation

- **Tolerance:** ±5 minutes (300,000ms)
- **Purpose:** Reject expired or future timestamps

### 4. Amount Validation

- **Tolerance:** 0.0001 (epsilon)
- **Purpose:** Allow minor floating-point variations

### 5. Recipient Verification

- **Purpose:** Prevent users from paying their own wallets to bypass check
- **Requirement:** Recipient must match treasury wallet address

### 6. Rate Limiting

- **Implementation:** Memory-based rate limiting
- **Headers:** `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## Error Codes

| Code | Description |
|------|-------------|
| INVALID_JSON | Invalid payment header format |
| VALIDATION_FAILED | Payment signature schema validation failed |
| AMOUNT_MISMATCH | Payment amount does not match expected price |
| RECIPIENT_MISMATCH | Payment recipient does not match treasury wallet |
| INVALID_SIGNATURE | Cryptographic signature verification failed |
| REPLAY_DETECTED | Payment already processed (replay attack) |
| INTERNAL_ERROR | Internal payment verification error |

## Configuration

### Environment Variables

```bash
# Solana RPC
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# USDC Token Mint
NEXT_PUBLIC_USDC_MINT=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v

# Treasury Wallet
NEXT_PUBLIC_TREASURY_WALLET=7XgS3vD9M4krX01o98p2974261687352316498111111

# Connection Settings
OMA_CONNECTION_TIMEOUT=30000
OMA_MAX_RETRIES=3
OMA_RETRY_DELAY=1000
OMA_CACHE_TTL=300000
OMA_MAX_CACHE_SIZE=10000
```

## Best Practices

### For Developers

1. **Always validate** payment signatures on your server
2. **Use nonces** to prevent replay attacks
3. **Set proper TTL** for payment caches
4. **Log all payment attempts** for debugging
5. **Implement rate limiting** to prevent abuse
6. **Use treasury wallet verification** to prevent self-payment bypass
7. **Return clear error messages** for debugging
8. **Set appropriate timeouts** for blockchain operations

### For Users

1. **Use wallet adapter** for secure key management
2. **Verify amounts** before confirming transactions
3. **Keep transaction signatures** for proof of payment
4. **Monitor gas fees** and network conditions
5. **Use devnet for testing** before mainnet

## Example: Full Integration

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { x402Middleware } from '@/lib/x402-middleware';

export async function POST(req: NextRequest) {
  // Check x402 payment
  const result = await x402Middleware(
    req,
    price: 0.001,
    walletAddress: process.env.NEXT_PUBLIC_TREASURY_WALLET
  );

  if (result) {
    return result; // Returns 402 with payment requirements
  }

  // Payment verified, execute protected logic
  const { input } = await req.json();

  const response = await executeProtectedLogic(input);

  return NextResponse.json({
    success: true,
    result: response,
    paymentVerified: true
  }, {
    headers: {
      'X-OMA-Payment-Verified': 'true'
    }
  });
}
```

## Troubleshooting

### Common Issues

**Payment verification failing:**
- Check timestamp is within ±5 minutes
- Verify recipient matches treasury wallet
- Ensure signature is properly base58 encoded
- Check nonce uniqueness

**Replay attacks detected:**
- Clear payment cache if needed
- Check for duplicate transaction hashes
- Verify client IP tracking is working

**Blockchain operations timing out:**
- Check Solana RPC URL is accessible
- Verify network conditions
- Increase timeout if needed
- Check connection pool health

## Further Reading

- [OpenMarketAccess Architecture](./ARCHITECTURE.md)
- [Solana Documentation](https://docs.solana.com/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [HTTP 402 Status Code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402)

---

*This document is part of OpenMarketAccess Developer Documentation.*