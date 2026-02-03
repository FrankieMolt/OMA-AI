# Webhooks Guide

This guide covers setting up and handling webhooks in OpenMarketAccess.

## Overview

Webhooks allow OpenMarketAccess to notify your application in real-time when events occur. Webhooks are essential for:

- Payment status updates
- User authentication events
- Marketplace activity
- System notifications
- Dispute resolution updates

## Setting Up Webhooks

### Creating a Webhook Endpoint

```javascript
// Express.js example
const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-oma-signature'];
  const payload = JSON.stringify(req.body);

  // Verify signature
  const expectedSignature = crypto
    .createHmac('sha256', process.env.OMA_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  if (signature !== expectedSignature) {
    console.error('Invalid webhook signature');
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Process webhook
  processWebhook(req.body);

  // Respond quickly
  res.status(200).send('OK');
});

app.listen(3000, () => {
  console.log('Webhook server listening on port 3000');
});
```

### Registering Your Webhook

```javascript
const webhook = await oma.webhooks.create({
  url: 'https://yourapp.com/webhook',
  events: [
    'payment.*',
    'user.*',
    'marketplace.*'
  ],
  secret: process.env.OMA_WEBHOOK_SECRET,
  active: true
});
```

## Webhook Events

### Payment Events

| Event | Description | Payload |
|-------|-------------|---------|
| `payment.created` | New payment created | Payment object |
| `payment.funded` | Payment funded in escrow | Payment object |
| `payment.executed` | Payment executed | Payment object |
| `payment.completed` | Payment completed | Payment object |
| `payment.failed` | Payment failed | Error details |
| `payment.disputed` | Payment disputed | Dispute object |
| `payment.refunded` | Payment refunded | Refund object |
| `payment.cancelled` | Payment cancelled | Payment object |

### User Events

| Event | Description | Payload |
|-------|-------------|---------|
| `user.created` | New user registered | User object |
| `user.updated` | User profile updated | User object |
| `user.deleted` | User account deleted | User object |
| `user.verified` | User verified email | User object |
| `user.suspended` | User account suspended | User object |

### Marketplace Events

| Event | Description | Payload |
|-------|-------------|---------|
| `marketplace.listing_created` | New listing created | Listing object |
| `marketplace.listing_updated` | Listing updated | Listing object |
| `marketplace.listing_deleted` | Listing deleted | Listing object |
| `marketplace.purchase_completed` | Purchase completed | Purchase object |

### Dispute Events

| Event | Description | Payload |
|-------|-------------|---------|
| `dispute.created` | Dispute created | Dispute object |
| `dispute.updated` | Dispute updated | Dispute object |
| `dispute.resolved` | Dispute resolved | Dispute object |
| `dispute.arbitration_requested` | Arbitration requested | Dispute object |

## Handling Webhooks

### Basic Event Handler

```javascript
function processWebhook(event) {
  console.log(`Received event: ${event.type}`);

  switch (event.type) {
    case 'payment.created':
      handlePaymentCreated(event.data);
      break;

    case 'payment.completed':
      handlePaymentCompleted(event.data);
      break;

    case 'payment.disputed':
      handlePaymentDisputed(event.data);
      break;

    case 'user.created':
      handleUserCreated(event.data);
      break;

    default:
      console.log('Unhandled event:', event.type);
  }
}

function handlePaymentCreated(data) {
  // Send confirmation email
  // Update database
  // Trigger internal workflow
  console.log('Payment created:', data.paymentId);
}

function handlePaymentCompleted(data) {
  // Release digital goods
  // Update order status
  // Send completion notification
  console.log('Payment completed:', data.paymentId);
}
```

### Async Processing

```javascript
// Use a message queue for async processing
const { Queue } = require('bullmq');

const webhookQueue = new Queue('webhooks');

app.post('/webhook', async (req, res) => {
  const event = req.body;

  // Add to queue for async processing
  await webhookQueue.add('process-webhook', event);

  res.status(200).send('OK');
});

// Worker processes webhooks
const { Worker } = require('bullmq');

const worker = new Worker('webhooks', async (job) => {
  const event = job.data;
  await processWebhook(event);
});
```

### Retry Logic

```javascript
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function processWebhookWithRetry(event, attempt = 1) {
  try {
    await processWebhook(event);
  } catch (error) {
    if (attempt < MAX_RETRIES) {
      console.log(`Retrying webhook (attempt ${attempt + 1})`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return processWebhookWithRetry(event, attempt + 1);
    }
    console.error('Webhook processing failed after retries:', error);
    throw error;
  }
}
```

## Security

### Signature Verification

```javascript
function verifyWebhookSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');

  // Use timing-safe comparison
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}
```

### IP Whitelisting

```javascript
const allowedIPs = [
  '54.210.132.41',
  '54.210.134.241',
  '54.210.133.241'
];

app.post('/webhook', (req, res) => {
  const clientIP = req.ip;

  if (!allowedIPs.includes(clientIP)) {
    console.error('Unauthorized IP:', clientIP);
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Process webhook
  processWebhook(req.body);
  res.status(200).send('OK');
});
```

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const webhookLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many webhook requests from this IP'
});

app.post('/webhook', webhookLimiter, (req, res) => {
  processWebhook(req.body);
  res.status(200).send('OK');
});
```

## Testing Webhooks

### Local Testing with ngrok

```bash
# Install ngrok
npm install -g ngrok

# Start your local server
node server.js

# Expose local server
ngrok http 3000

# Register webhook with ngrok URL
const webhook = await oma.webhooks.create({
  url: 'https://your-ngrok-url.ngrok.io/webhook',
  events: ['payment.*']
});
```

### Sending Test Webhooks

```javascript
const testWebhook = await oma.webhooks.sendTest({
  url: 'https://yourapp.com/webhook',
  event: 'payment.completed',
  data: {
    paymentId: 'test_payment_123',
    amount: 100.00,
    currency: 'USD',
    status: 'completed'
  }
});
```

## Webhook Management

### List Webhooks

```javascript
const webhooks = await oma.webhooks.list({
  active: true,
  limit: 50
});
```

### Update Webhook

```javascript
const updated = await oma.webhooks.update(webhookId, {
  events: ['payment.*', 'user.*'],
  active: true
});
```

### Delete Webhook

```javascript
await oma.webhooks.delete(webhookId);
```

### Pause Webhook

```javascript
await oma.webhooks.pause(webhookId);
```

### Resume Webhook

```javascript
await oma.webhooks.resume(webhookId);
```

## Monitoring and Logging

### Webhook Logs

```javascript
const logs = await oma.webhooks.getLogs(webhookId, {
  startDate: '2026-01-01',
  endDate: '2026-01-31',
  status: 'failed'
});
```

### Retry Failed Webhooks

```javascript
const retries = await oma.webhooks.retryFailed(webhookId);
console.log(`Retrying ${retries.count} failed webhooks`);
```

## Best Practices

1. **Always verify signatures** to ensure authenticity
2. **Respond quickly** (within 5 seconds) to avoid timeouts
3. **Use async processing** for time-consuming operations
4. **Implement retry logic** for failed processing
5. **Log all webhooks** for debugging and auditing
6. **Use idempotency keys** to prevent duplicate processing
7. **Monitor webhook delivery** and retry failures
8. **Test webhooks locally** using ngrok or similar tools

## Troubleshooting

### Common Issues

**Problem:** Webhook not received
- Check webhook URL is accessible
- Verify webhook is active
- Check firewall settings

**Problem:** Signature verification fails
- Ensure secret matches
- Check payload encoding
- Verify signature algorithm (SHA256)

**Problem:** Webhook timeouts
- Optimize processing time
- Use async processing
- Implement queue system

**Problem:** Duplicate webhooks
- Use idempotency keys
- Check event ID before processing

## Next Steps

- Learn about [Authentication](authentication.md)
- Understand [Rate Limiting](rate-limiting.md)
- Review [API Reference](../api/README.md)
- Check [Troubleshooting Guide](../troubleshooting/common-issues.md)

## Additional Resources

- [Webhook Security Best Practices](https://webhooks.best-practices.security)
- [Idempotency in Webhooks](https://stripe.com/docs/webhooks/best-practices#idempotency)
- [Message Queue Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/)
