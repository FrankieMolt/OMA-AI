# SDK Examples

Common usage examples for OpenMarketAccess SDKs.

## TypeScript Examples

### Basic Payment Flow

```typescript
import { OpenMarketAccess } from '@openmarketaccess/sdk';

const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY!
});

async function basicPaymentFlow() {
  // Create payment
  const payment = await oma.payments.create({
    protocol: 'x402',
    amount: 100.00,
    currency: 'USD'
  });

  // Fund escrow
  await oma.payments.fundEscrow(payment.id, {
    paymentMethodId: 'pm_123456'
  });

  // Execute payment
  await oma.payments.execute(payment.id, {
    confirmationCode: 'abc123'
  });

  console.log('Payment completed!');
}
```

### Payment with Negotiation

```typescript
async function negotiablePayment() {
  const payment = await oma.payments.create({
    protocol: 'x402',
    amount: 100.00,
    currency: 'USD',
    allowNegotiation: true,
    minAmount: 80.00,
    maxAmount: 150.00
  });

  // Initiate negotiation
  const negotiation = await oma.payments.negotiate(payment.id, {
    proposedAmount: 90.00,
    reason: 'Discount for repeat customer'
  });

  // Accept negotiation
  await oma.payments.respondToNegotiation(negotiation.id, 'accepted');
}
```

### Webhook Handler

```typescript
import express from 'express';
import { OpenMarketAccess } from '@openmarketaccess/sdk';

const app = express();
const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY!
});

app.use(express.json());

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-oma-signature'] as string;
  const payload = JSON.stringify(req.body);

  // Verify signature
  const isValid = oma.webhooks.verifySignature(
    payload,
    signature,
    process.env.OMA_WEBHOOK_SECRET!
  );

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Handle webhook
  handleWebhook(req.body);
  res.status(200).send('OK');
});

function handleWebhook(event: any) {
  switch (event.type) {
    case 'payment.completed':
      console.log('Payment completed:', event.data.paymentId);
      break;
    case 'payment.disputed':
      console.log('Payment disputed:', event.data.paymentId);
      break;
  }
}
```

## Python Examples

### Basic Payment Flow

```python
from openmarketaccess import OpenMarketAccess

oma = OpenMarketAccess(api_key=os.environ.get('OMA_API_KEY'))

def basic_payment_flow():
    # Create payment
    payment = oma.payments.create(
        protocol='x402',
        amount=100.00,
        currency='USD'
    )

    # Fund escrow
    oma.payments.fund_escrow(
        payment.id,
        payment_method_id='pm_123456'
    )

    # Execute payment
    oma.payments.execute(
        payment.id,
        confirmation_code='abc123'
    )

    print('Payment completed!')
```

### Payment with Negotiation

```python
def negotiable_payment():
    payment = oma.payments.create(
        protocol='x402',
        amount=100.00,
        currency='USD',
        allow_negotiation=True,
        min_amount=80.00,
        max_amount=150.00
    )

    # Initiate negotiation
    negotiation = oma.payments.negotiate(
        payment.id,
        proposed_amount=90.00,
        reason='Discount for repeat customer'
    )

    # Accept negotiation
    oma.payments.respond_to_negotiation(
        negotiation.id,
        'accepted'
    )
```

### Webhook Handler

```python
from flask import Flask, request, jsonify
from openmarketaccess import OpenMarketAccess

app = Flask(__name__)
oma = OpenMarketAccess(api_key=os.environ.get('OMA_API_KEY'))

@app.route('/webhook', methods=['POST'])
def webhook():
    signature = request.headers.get('X-OMA-Signature')
    payload = request.get_data(as_text=True)

    # Verify signature
    is_valid = oma.webhooks.verify_signature(
        payload,
        signature,
        os.environ.get('OMA_WEBHOOK_SECRET')
    )

    if not is_valid:
        return jsonify({'error': 'Invalid signature'}), 401

    # Handle webhook
    handle_webhook(request.json)
    return 'OK', 200

def handle_webhook(event):
    if event['type'] == 'payment.completed':
        print(f'Payment completed: {event["data"]["paymentId"]}')
    elif event['type'] == 'payment.disputed':
        print(f'Payment disputed: {event["data"]["paymentId"]}')
```

## Marketplace Examples

### TypeScript

```typescript
async function createAndSellListing() {
  // Create listing
  const listing = await oma.marketplace.createListing({
    name: 'API Integration Service',
    description: 'Custom API integration',
    category: 'software',
    price: 50.00,
    currency: 'USD'
  });

  // Purchase listing
  const purchase = await oma.marketplace.createPurchase({
    listingId: listing.id,
    paymentMethod: {
      provider: 'stripe',
      type: 'card',
      token: 'tok_visa'
    }
  });

  // Review purchase
  await oma.marketplace.createReview({
    purchaseId: purchase.id,
    rating: 5,
    comment: 'Excellent service!'
  });
}
```

### Python

```python
def create_and_sell_listing():
    # Create listing
    listing = oma.marketplace.create_listing(
        name='API Integration Service',
        description='Custom API integration',
        category='software',
        price=50.00,
        currency='USD'
    )

    # Purchase listing
    purchase = oma.marketplace.create_purchase(
        listing_id=listing.id,
        payment_method={
            'provider': 'stripe',
            'type': 'card',
            'token': 'tok_visa'
        }
    )

    # Review purchase
    oma.marketplace.create_review(
        purchase_id=purchase.id,
        rating=5,
        comment='Excellent service!'
    )
```

## See Also

- [TypeScript SDK](typescript.md)
- [Python SDK](python.md)
- [SDK Reference](README.md)
