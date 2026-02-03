# Payment Provider Integrations

Integrate OpenMarketAccess with various payment providers.

## Overview

OpenMarketAccess supports multiple payment providers through the x402 protocol:

- Stripe
- PayPal
- Square
- Web3/Cryptocurrency
- Bank transfers

## Stripe Integration

### Configuration

```typescript
import { OpenMarketAccess } from '@openmarketaccess/sdk';

const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY,
  paymentProviders: {
    stripe: {
      enabled: true,
      publicKey: process.env.STRIPE_PUBLIC_KEY,
      secretKey: process.env.STRIPE_SECRET_KEY
    }
  }
});
```

### Create Payment with Stripe

```typescript
const payment = await oma.payments.create({
  protocol: 'x402',
  amount: 100.00,
  currency: 'USD',
  paymentMethod: {
    provider: 'stripe',
    type: 'card',
    token: 'tok_visa' // Stripe test token
  }
});
```

### Handle Stripe Webhooks

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

app.post('/webhook/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature']!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      await oma.payments.execute(
        event.data.object.metadata.paymentId,
        { confirmationCode: event.data.object.id }
      );
      break;
    case 'payment_intent.payment_failed':
      await oma.payments.cancel(
        event.data.object.metadata.paymentId,
        { reason: 'payment_failed' }
      );
      break;
  }

  res.json({ received: true });
});
```

## PayPal Integration

### Configuration

```typescript
const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY,
  paymentProviders: {
    paypal: {
      enabled: true,
      clientId: process.env.PAYPAL_CLIENT_ID,
      clientSecret: process.env.PAYPAL_CLIENT_SECRET,
      mode: 'sandbox' // or 'live'
    }
  }
});
```

### Create Payment with PayPal

```typescript
const payment = await oma.payments.create({
  protocol: 'x402',
  amount: 100.00,
  currency: 'USD',
  paymentMethod: {
    provider: 'paypal',
    type: 'express_checkout'
  }
});
```

### PayPal Express Checkout

```typescript
// Create order
const order = await oma.payments.createPayPalOrder({
  amount: 100.00,
  currency: 'USD',
  returnUrl: 'https://yourapp.com/success',
  cancelUrl: 'https://yourapp.com/cancel'
});

// Redirect user to PayPal
window.location.href = order.approvalUrl;

// Handle return
const capture = await oma.payments.capturePayPalOrder(order.id);
```

## Square Integration

### Configuration

```typescript
const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY,
  paymentProviders: {
    square: {
      enabled: true,
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: 'sandbox' // or 'production'
    }
  }
});
```

### Create Payment with Square

```typescript
const payment = await oma.payments.create({
  protocol: 'x402',
  amount: 100.00,
  currency: 'USD',
  paymentMethod: {
    provider: 'square',
    type: 'card',
    nonce: 'cnon:card-nonce-123'
  }
});
```

## Web3/Cryptocurrency Integration

### Configuration

```typescript
const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY,
  paymentProviders: {
    web3: {
      enabled: true,
      networks: ['ethereum', 'polygon', 'bsc'],
      rpcUrls: {
        ethereum: process.env.ETHEREUM_RPC_URL,
        polygon: process.env.POLYGON_RPC_URL,
        bsc: process.env.BSC_RPC_URL
      }
    }
  }
});
```

### Create Payment with ETH

```typescript
const payment = await oma.payments.create({
  protocol: 'x402',
  amount: 0.005,
  currency: 'ETH',
  paymentMethod: {
    provider: 'web3',
    type: 'eth',
    network: 'mainnet',
    fromAddress: '0x123...'
  }
});
```

### Web3 Integration with ethers.js

```typescript
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider(
  process.env.ETHEREUM_RPC_URL
);

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
);

async function sendCryptoPayment(payment) {
  const tx = await wallet.sendTransaction({
    to: payment.recipientAddress,
    value: ethers.utils.parseEther(payment.amount.toString())
  });

  await tx.wait();

  await oma.payments.execute(payment.id, {
    confirmationCode: tx.hash
  });
}
```

## Bank Transfer Integration

### Configuration

```typescript
const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY,
  paymentProviders: {
    bank: {
      enabled: true,
      plaidClientId: process.env.PLAID_CLIENT_ID,
      plaidSecret: process.env.PLAID_SECRET,
      environment: 'sandbox'
    }
  }
});
```

### Create Payment with Bank Transfer

```typescript
const payment = await oma.payments.create({
  protocol: 'x402',
  amount: 100.00,
  currency: 'USD',
  paymentMethod: {
    provider: 'bank',
    type: 'ach',
    accountId: 'act_123456'
  }
});
```

## Multi-Provider Strategy

### Provider Selection

```typescript
async function selectProvider(amount, currency) {
  if (currency === 'USD' && amount < 1000) {
    return 'stripe';
  } else if (currency === 'EUR') {
    return 'paypal';
  } else if (['ETH', 'BTC'].includes(currency)) {
    return 'web3';
  } else {
    return 'stripe';
  }
}

async function createOptimalPayment(amount, currency) {
  const provider = await selectProvider(amount, currency);

  return await oma.payments.create({
    protocol: 'x402',
    amount,
    currency,
    paymentMethod: { provider }
  });
}
```

## Error Handling

### Provider-Specific Errors

```typescript
try {
  const payment = await oma.payments.create(paymentData);
} catch (error) {
  switch (error.provider) {
    case 'stripe':
      handleStripeError(error);
      break;
    case 'paypal':
      handlePayPalError(error);
      break;
    case 'web3':
      handleWeb3Error(error);
      break;
    default:
      handleGenericError(error);
  }
}

function handleStripeError(error) {
  if (error.code === 'card_declined') {
    console.error('Card declined:', error.message);
  } else if (error.code === 'insufficient_funds') {
    console.error('Insufficient funds');
  }
}
```

## Testing

### Test Mode

```typescript
const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_SANDBOX_API_KEY,
  apiUrl: 'https://sandbox-api.openmarketaccess.com/v1'
});
```

### Stripe Test Cards

| Card Number | Description |
|-------------|-------------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Card declined |
| 4000 0000 0000 9995 | Insufficient funds |
| 4242 4242 4242 4241 | Process with error |

### PayPal Test Credentials

```typescript
// Sandbox credentials
const paypalTestCredentials = {
  clientId: 'your_sandbox_client_id',
  clientSecret: 'your_sandbox_client_secret'
};
```

## Best Practices

1. **Use test mode** during development
2. **Handle provider-specific errors** appropriately
3. **Implement retry logic** for transient failures
4. **Secure API keys** properly
5. **Monitor payment failures** and retry automatically
6. **Use webhooks** for real-time updates
7. **Validate payment methods** before processing
8. **Implement idempotency** to prevent duplicate charges

## See Also

- [x402 Protocol](../protocols/x402.md)
- [Payment Guide](../guides/payments.md)
- [Payment API](../api/payments.md)
