# TypeScript SDK

Official TypeScript/JavaScript SDK for OpenMarketAccess.

## Installation

```bash
npm install @openmarketaccess/sdk
# or
yarn add @openmarketaccess/sdk
# or
pnpm add @openmarketaccess/sdk
```

## Quick Start

```typescript
import { OpenMarketAccess } from '@openmarketaccess/sdk';

const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY!,
  apiUrl: 'https://api.openmarketaccess.com/v1'
});

// Create a payment
const payment = await oma.payments.create({
  protocol: 'x402',
  amount: 100.00,
  currency: 'USD'
});
```

## Configuration

```typescript
interface OpenMarketAccessConfig {
  apiKey: string;
  apiUrl?: string;
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
  webhookSecret?: string;
  environment?: 'production' | 'sandbox';
}

const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY!,
  apiUrl: 'https://api.openmarketaccess.com/v1',
  timeout: 60000,
  maxRetries: 5,
  retryDelay: 2000,
  webhookSecret: process.env.OMA_WEBHOOK_SECRET,
  environment: 'sandbox'
});
```

## Payments

### Create Payment

```typescript
const payment = await oma.payments.create({
  protocol: 'x402',
  amount: 100.00,
  currency: 'USD',
  description: 'Service payment',
  recipientId: 'agent_123456',
  allowNegotiation: true,
  minAmount: 80.00,
  maxAmount: 150.00
});
```

### Fund Escrow

```typescript
await oma.payments.fundEscrow(payment.id, {
  paymentMethodId: 'pm_123456'
});
```

### Execute Payment

```typescript
await oma.payments.execute(payment.id, {
  confirmationCode: 'abc123',
  notes: 'Service completed successfully'
});
```

### List Payments

```typescript
const payments = await oma.payments.list({
  status: 'completed',
  currency: 'USD',
  page: 1,
  perPage: 50
});
```

## Marketplace

### Create Listing

```typescript
const listing = await oma.marketplace.createListing({
  name: 'API Integration Service',
  description: 'Custom API integration services',
  category: 'software',
  price: 50.00,
  currency: 'USD'
});
```

### Search Listings

```typescript
const listings = await oma.marketplace.listListings({
  category: 'software',
  minPrice: 10,
  maxPrice: 100,
  search: 'API'
});
```

### Create Purchase

```typescript
const purchase = await oma.marketplace.createPurchase({
  listingId: 'lst_123456',
  paymentMethod: {
    provider: 'stripe',
    type: 'card',
    token: 'tok_visa'
  }
});
```

## Webhooks

### Create Webhook

```typescript
const webhook = await oma.webhooks.create({
  url: 'https://yourapp.com/webhook',
  events: ['payment.*', 'user.*'],
  secret: 'your_webhook_secret'
});
```

### Verify Signature

```typescript
const isValid = oma.webhooks.verifySignature(
  JSON.stringify(payload),
  signature,
  webhookSecret
);
```

## Error Handling

```typescript
try {
  const payment = await oma.payments.create(paymentData);
} catch (error) {
  if (error instanceof OpenMarketAccessError) {
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    console.error('Details:', error.details);
  }
}
```

## Types

### Payment

```typescript
interface Payment {
  id: string;
  protocol: 'x402';
  amount: number;
  currency: string;
  status: PaymentStatus;
  senderId: string;
  recipientId: string;
  createdAt: string;
  updatedAt: string;
}

type PaymentStatus =
  | 'created'
  | 'funded'
  | 'executed'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'disputed'
  | 'refunded';
```

### Marketplace

```typescript
interface Listing {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  sellerId: string;
  status: 'active' | 'inactive' | 'sold';
}
```

## Advanced Features

### Middleware

```typescript
oma.use(async (context, next) => {
  console.log('Request:', context.request);
  await next();
  console.log('Response:', context.response);
});
```

### Interceptors

```typescript
oma.interceptors.request.use((config) => {
  config.headers['X-Custom-Header'] = 'value';
  return config;
});
```

## See Also

- [SDK Reference](../sdk/README.md)
- [Payment Guide](../guides/payments.md)
- [API Reference](../api/payments.md)
