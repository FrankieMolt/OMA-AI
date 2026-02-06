# x402 Wallet Adapter for OpenClaw Agents

## Overview
This wallet adapter enables OpenClaw agents to:
- Accept x402 payments (HTTP 402 Payment Required)
- Send x402 payments to other agents/services
- Manage wallet keys securely
- Support multiple networks (Base, Ethereum, Solana)

## Installation

```bash
npm install @oma-ai/x402-wallet-adapter
```

## Quick Start

```typescript
import { X402Wallet } from '@oma-ai/x402-wallet-adapter';

// Initialize wallet
const wallet = new X402Wallet({
  network: 'base', // 'base', 'ethereum', or 'solana'
  privateKey: process.env.WALLET_PRIVATE_KEY
});

// Accept x402 payment
app.post('/api/payment', async (req, res) => {
  const { amount, currency } = req.body;
  
  const payment = await wallet.acceptPayment({
    amount,
    currency,
    metadata: { service: 'API access' }
  });
  
  res.json({ paymentUrl: payment.url });
});

// Send x402 payment
const payment = await wallet.sendPayment({
  to: '0xrecipient...',
  amount: 0.001,
  currency: 'USDC',
  metadata: { task: 'API call' }
});
```

## Network Support

### Base (Recommended)
- Lowest fees
- Fast confirmation
- USDC stablecoin
- EVM-compatible

```typescript
const wallet = new X402Wallet({
  network: 'base',
  rpcUrl: 'https://mainnet.base.org'
});
```

### Ethereum
- Mainnet reliability
- Widespread adoption
- Higher fees than Base

```typescript
const wallet = new X402Wallet({
  network: 'ethereum',
  rpcUrl: 'https://eth.llamarpc.com'
});
```

### Solana
- Fast transactions
- Very low fees
- SPL tokens

```typescript
const wallet = new X402Wallet({
  network: 'solana',
  rpcUrl: 'https://api.mainnet-beta.solana.com'
});
```

## API Reference

### `X402Wallet`

#### Constructor
```typescript
new X402Wallet({
  network: 'base' | 'ethereum' | 'solana',
  privateKey?: string,
  rpcUrl?: string
})
```

#### Methods

**acceptPayment(options)**
Accept x402 payment request

```typescript
const payment = await wallet.acceptPayment({
  amount: number,           // Payment amount
  currency: string,         // 'USDC', 'ETH', 'SOL'
  description?: string,      // Payment description
  metadata?: object,        // Additional metadata
  expiry?: number           // Expiry timestamp
});

// Returns
{
  paymentUrl: string;      // x402 payment URL
  paymentId: string;      // Unique payment ID
  expiresAt: number;      // Expiry timestamp
}
```

**sendPayment(options)**
Send x402 payment

```typescript
const payment = await wallet.sendPayment({
  to: string,              // Recipient address
  amount: number,          // Payment amount
  currency: string,        // 'USDC', 'ETH', 'SOL'
  description?: string,     // Payment description
  metadata?: object,       // Additional metadata
  maxGas?: number         // Maximum gas to spend
});

// Returns
{
  txHash: string;          // Transaction hash
  status: 'pending' | 'confirmed' | 'failed';
  amount: string;         // Amount sent
}
```

**getBalance(currency)**
Get wallet balance

```typescript
const balance = await wallet.getBalance('USDC');

// Returns
{
  amount: string;
  formatted: string;
  currency: string;
}
```

**generatePaymentLink(options)**
Generate payment link for embedding

```typescript
const link = wallet.generatePaymentLink({
  amount: 0.001,
  currency: 'USDC',
  description: 'API Access',
  redirectUrl: 'https://oma-ai.com/success',
  webhookUrl: 'https://oma-ai.com/api/webhook'
});

// Returns
{
  url: string;              // Payment URL
  qrCode: string;          // QR code data URI
  paymentId: string;       // Unique ID
}
```

## Usage Examples

### Agent-to-Agent Payment
```typescript
// Agent A paying Agent B for service
const agentAWallet = new X402Wallet({ network: 'base' });
const agentBAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44';

const payment = await agentAWallet.sendPayment({
  to: agentBAddress,
  amount: 0.001,
  currency: 'USDC',
  description: 'Payment for task completion'
});
```

### Accepting x402 on API
```typescript
// Next.js API route (app/api/agents/[id]/purchase/route.ts)
import { X402Wallet } from '@oma-ai/x402-wallet-adapter';

const wallet = new X402Wallet({
  network: 'base',
  privateKey: process.env.WALLET_PRIVATE_KEY
});

export async function POST(req: Request) {
  const { agentId, serviceName } = await req.json();
  
  const payment = await wallet.acceptPayment({
    amount: 0.001,
    currency: 'USDC',
    description: `Access to ${serviceName}`,
    metadata: { agentId, serviceName }
  });
  
  return Response.json({ paymentUrl: payment.url });
}
```

### Embed x402 Paywall
```html
<!-- Simple x402 paywall embed -->
<div id="x402-paywall" data-amount="0.001" data-currency="USDC">
  <script src="https://oma-ai.com/embed/x402.js"></script>
</div>
```

## Environment Variables

```bash
# Required
WALLET_PRIVATE_KEY=your_private_key_here
X402_API_KEY=your_api_key_here

# Optional (defaults to Base)
X402_NETWORK=base
X402_RPC_URL=https://mainnet.base.org

# For development
X402_TESTNET=true
```

## Security

- **Never commit private keys** to Git
- Use environment variables only
- Rotate keys regularly
- Implement rate limiting
- Validate all payment callbacks

## Testing

```bash
# Testnet (Base Goerli)
X402_TESTNET=true X402_NETWORK=base npm test

# Local testing
X402_MOCK=true npm test
```

## License

MIT License - Free and open source

## Support

- Documentation: https://docs.oma-ai.com/x402
- Issues: https://github.com/FrankieMolt/OMA-AI/issues
- Discord: https://discord.gg/clawd
