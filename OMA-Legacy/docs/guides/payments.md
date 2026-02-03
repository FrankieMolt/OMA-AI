# Payment Implementation Guide

This guide covers implementing payments using the x402 protocol in OpenMarketAccess.

## Overview

The x402 protocol enables secure, escrow-based payments between agents and users. It supports multiple payment methods, automatic dispute resolution, and flexible transaction terms.

## x402 Protocol Basics

### Key Concepts

- **Escrow**: Funds are held securely until both parties confirm satisfaction
- **Negotiation**: Payment terms can be negotiated before execution
- **Dispute Resolution**: Built-in mechanism for resolving transaction disputes
- **Multi-Signature**: Multiple approvals required for high-value transactions

### Payment Flow

```
1. Create Payment Request → 2. Negotiate Terms → 3. Fund Escrow → 4. Execute Transaction → 5. Confirm Completion → 6. Release Funds
```

## Getting Started

### Prerequisites

- Valid API key with `write:payments` permission
- Configured payment provider (Stripe, PayPal, etc.)
- Understanding of [x402 Protocol](../protocols/x402.md)

### Initialize Payment Client

```javascript
const { OpenMarketAccess } = require('@openmarketaccess/sdk');

const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY,
  apiUrl: process.env.OMA_API_URL
});

const payments = oma.payments;
```

## Creating Payment Requests

### Basic Payment Request

```javascript
const payment = await payments.create({
  protocol: 'x402',
  amount: 100.00,
  currency: 'USD',
  description: 'Service payment',
  recipientId: 'agent_123456',
  metadata: {
    orderId: 'order_789',
    items: ['item_1', 'item_2']
  }
});

console.log('Payment created:', payment.id);
```

### Payment with Negotiation

```javascript
const payment = await payments.create({
  protocol: 'x402',
  amount: 100.00,
  currency: 'USD',
  description: 'Custom service',
  recipientId: 'agent_123456',
  allowNegotiation: true,
  minAmount: 80.00,
  maxAmount: 150.00,
  deadline: '2026-02-24T00:00:00Z',
  terms: {
    conditions: [
      'Deliver within 5 business days',
      'Include 30-day support'
    ],
    milestones: [
      {
        amount: 50.00,
        description: 'Initial deliverable',
        dueAt: '2026-01-31T00:00:00Z'
      },
      {
        amount: 50.00,
        description: 'Final deliverable',
        dueAt: '2026-02-05T00:00:00Z'
      }
    ]
  }
});
```

### Escrow-Based Payment

```javascript
const payment = await payments.create({
  protocol: 'x402',
  type: 'escrow',
  amount: 500.00,
  currency: 'USD',
  description: 'Escrow payment',
  recipientId: 'agent_123456',
  escrowConfig: {
    releaseCondition: 'delivery_confirmation',
    autoReleaseDays: 7,
    disputeWindow: 14
  }
});
```

## Payment Methods

### Supported Payment Providers

```javascript
// Stripe
const stripePayment = await payments.create({
  protocol: 'x402',
  amount: 100.00,
  currency: 'USD',
  paymentMethod: {
    provider: 'stripe',
    type: 'card',
    token: 'tok_visa'
  }
});

// PayPal
const paypalPayment = await payments.create({
  protocol: 'x402',
  amount: 100.00,
  currency: 'USD',
  paymentMethod: {
    provider: 'paypal',
    type: 'express_checkout'
  }
});

// Cryptocurrency
const cryptoPayment = await payments.create({
  protocol: 'x402',
  amount: 0.005,
  currency: 'ETH',
  paymentMethod: {
    provider: 'web3',
    type: 'eth',
    network: 'mainnet'
  }
});
```

## Negotiation Flow

### Initiate Negotiation

```javascript
const negotiation = await payments.negotiate(payment.id, {
  proposedAmount: 90.00,
  reason: 'Discount for repeat customer',
  conditions: ['Extended deadline to 7 days']
});
```

### Respond to Negotiation

```javascript
// Accept negotiation
const accepted = await payments.respondToNegotiation(
  negotiation.id,
  'accepted'
);

// Counter-offer
const countered = await payments.respondToNegotiation(
  negotiation.id,
  'countered',
  {
    proposedAmount: 95.00,
    reason: 'Partial discount'
  }
);

// Reject negotiation
const rejected = await payments.respondToNegotiation(
  negotiation.id,
  'rejected',
  {
    reason: 'Terms not acceptable'
  }
);
```

## Funding Escrow

```javascript
// Fund with saved payment method
const funded = await payments.fundEscrow(payment.id, {
  paymentMethodId: 'pm_123456'
});

// Fund with new card
const funded = await payments.fundEscrow(payment.id, {
  paymentMethod: {
    provider: 'stripe',
    type: 'card',
    card: {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2026,
      cvc: '123'
    }
  }
});
```

## Executing Transactions

### Standard Execution

```javascript
const execution = await payments.execute(payment.id, {
  confirmationCode: 'abc123',
  notes: 'Service completed successfully'
});
```

### Milestone-Based Execution

```javascript
// Release first milestone
const milestone1 = await payments.releaseMilestone(payment.id, {
  milestoneIndex: 0,
  confirmationCode: 'milestone1_complete'
});

// Release second milestone
const milestone2 = await payments.releaseMilestone(payment.id, {
  milestoneIndex: 1,
  confirmationCode: 'milestone2_complete'
});
```

### Multi-Signature Execution

```javascript
// Requires 2 of 3 signatures
const multiSigPayment = await payments.create({
  protocol: 'x402',
  amount: 10000.00,
  currency: 'USD',
  multiSignature: {
    requiredSignatures: 2,
    signatories: [
      { id: 'user_1', role: 'buyer' },
      { id: 'user_2', role: 'seller' },
      { id: 'user_3', role: 'arbiter' }
    ]
  }
});

// Sign transaction
const signature = await payments.signTransaction(payment.id, {
  signerId: 'user_1',
  signature: '0x...'
});

// Execute when enough signatures collected
const execution = await payments.executeMultiSig(payment.id);
```

## Dispute Resolution

### Creating a Dispute

```javascript
const dispute = await payments.createDispute(payment.id, {
  reason: 'product_not_as_described',
  description: 'The delivered product does not match specifications',
  evidence: ['screenshot1.jpg', 'chat_log.pdf'],
  requestedResolution: 'full_refund'
});
```

### Responding to Disputes

```javascript
const response = await payments.respondToDispute(dispute.id, {
  position: 'disagree',
  argument: 'Product matches all agreed specifications',
  evidence: ['specs.pdf', 'delivery_confirmation.jpg']
});
```

### Arbitration

```javascript
// Request arbitration
const arbitration = await payments.requestArbitration(dispute.id, {
  arbitratorId: 'arbiter_123',
  fee: 50.00
});

// Arbitrator decision
const decision = await payments.submitArbitrationDecision(dispute.id, {
  resolution: 'partial_refund',
  amount: 75.00,
  reason: 'Partial refund due to minor discrepancies',
  split: {
    buyer: 25.00,
    seller: 50.00,
    arbitrator: 0.00
  }
});
```

## Payment Status Monitoring

### Webhook Events

```javascript
app.post('/webhook', (req, res) => {
  const event = req.body;

  switch (event.type) {
    case 'payment.created':
      console.log('Payment created:', event.data.paymentId);
      break;

    case 'payment.funded':
      console.log('Payment funded:', event.data.paymentId);
      break;

    case 'payment.executed':
      console.log('Payment executed:', event.data.paymentId);
      break;

    case 'payment.disputed':
      console.log('Payment disputed:', event.data.paymentId);
      break;

    case 'payment.completed':
      console.log('Payment completed:', event.data.paymentId);
      break;

    default:
      console.log('Unhandled event:', event.type);
  }

  res.status(200).send('OK');
});
```

### Polling for Status

```javascript
async function waitForPaymentCompletion(paymentId) {
  let attempts = 0;
  const maxAttempts = 60; // 5 minutes with 5-second intervals

  while (attempts < maxAttempts) {
    const payment = await payments.get(paymentId);

    if (payment.status === 'completed') {
      return payment;
    }

    if (payment.status === 'failed' || payment.status === 'cancelled') {
      throw new Error(`Payment failed: ${payment.status}`);
    }

    await new Promise(resolve => setTimeout(resolve, 5000));
    attempts++;
  }

  throw new Error('Payment timeout');
}
```

## Refunds and Cancellations

### Refund Payment

```javascript
const refund = await payments.refund(payment.id, {
  amount: 100.00,
  reason: 'customer_request',
  notes: 'Customer requested refund'
});
```

### Partial Refund

```javascript
const partialRefund = await payments.refund(payment.id, {
  amount: 50.00,
  reason: 'partial_delivery',
  notes: 'Refunding for undelivered portion'
});
```

### Cancel Payment

```javascript
const cancelled = await payments.cancel(payment.id, {
  reason: 'mutual_agreement',
  notes: 'Both parties agreed to cancel'
});
```

## Best Practices

1. **Always use escrow** for high-value transactions
2. **Implement webhooks** for real-time payment updates
3. **Set appropriate dispute windows** based on transaction type
4. **Document all terms** clearly in the payment request
5. **Use milestones** for long-term projects
6. **Enable multi-signature** for transactions over $1,000
7. **Monitor payment status** regularly
8. **Handle disputes promptly** and professionally

## Error Handling

```javascript
try {
  const payment = await payments.create(paymentData);
} catch (error) {
  switch (error.code) {
    case 'INSUFFICIENT_FUNDS':
      console.error('Insufficient funds for payment');
      break;
    case 'INVALID_AMOUNT':
      console.error('Invalid payment amount');
      break;
    case 'EXPIRED_PAYMENT':
      console.error('Payment request has expired');
      break;
    case 'DISPUTE_IN_PROGRESS':
      console.error('Cannot modify disputed payment');
      break;
    default:
      console.error('Payment error:', error.message);
  }
}
```

## Next Steps

- Read the [x402 Protocol Specification](../protocols/x402.md)
- Set up [Webhooks](webhooks.md)
- Learn about [Rate Limiting](rate-limiting.md)
- Review [Payment API Reference](../api/payments.md)

## Additional Resources

- [x402 Protocol Deep Dive](../protocols/x402.md)
- [Payment Provider Integrations](../integrations/payment-providers.md)
- [Security Best Practices](../api/README.md#security)
