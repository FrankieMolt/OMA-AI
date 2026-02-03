# Python SDK

Official Python SDK for OpenMarketAccess.

## Installation

```bash
pip install openmarketaccess
```

## Quick Start

```python
from openmarketaccess import OpenMarketAccess

oma = OpenMarketAccess(
    api_key=os.environ.get('OMA_API_KEY'),
    api_url='https://api.openmarketaccess.com/v1'
)

# Create a payment
payment = oma.payments.create(
    protocol='x402',
    amount=100.00,
    currency='USD'
)
```

## Configuration

```python
from openmarketaccess import OpenMarketAccess

oma = OpenMarketAccess(
    api_key=os.environ.get('OMA_API_KEY'),
    api_url='https://api.openmarketaccess.com/v1',
    timeout=60,
    max_retries=5,
    retry_delay=2,
    webhook_secret=os.environ.get('OMA_WEBHOOK_SECRET'),
    environment='sandbox'
)
```

## Payments

### Create Payment

```python
payment = oma.payments.create(
    protocol='x402',
    amount=100.00,
    currency='USD',
    description='Service payment',
    recipient_id='agent_123456',
    allow_negotiation=True,
    min_amount=80.00,
    max_amount=150.00
)
```

### Fund Escrow

```python
oma.payments.fund_escrow(
    payment.id,
    payment_method_id='pm_123456'
)
```

### Execute Payment

```python
oma.payments.execute(
    payment.id,
    confirmation_code='abc123',
    notes='Service completed successfully'
)
```

### List Payments

```python
payments = oma.payments.list(
    status='completed',
    currency='USD',
    page=1,
    per_page=50
)
```

## Marketplace

### Create Listing

```python
listing = oma.marketplace.create_listing(
    name='API Integration Service',
    description='Custom API integration services',
    category='software',
    price=50.00,
    currency='USD'
)
```

### Search Listings

```python
listings = oma.marketplace.list_listings(
    category='software',
    min_price=10,
    max_price=100,
    search='API'
)
```

### Create Purchase

```python
purchase = oma.marketplace.create_purchase(
    listing_id='lst_123456',
    payment_method={
        'provider': 'stripe',
        'type': 'card',
        'token': 'tok_visa'
    }
)
```

## Webhooks

### Create Webhook

```python
webhook = oma.webhooks.create(
    url='https://yourapp.com/webhook',
    events=['payment.*', 'user.*'],
    secret='your_webhook_secret'
)
```

### Verify Signature

```python
is_valid = oma.webhooks.verify_signature(
    payload,
    signature,
    webhook_secret
)
```

## Error Handling

```python
from openmarketaccess import OpenMarketAccessError

try:
    payment = oma.payments.create(payment_data)
except OpenMarketAccessError as e:
    print(f'Error: {e.message}')
    print(f'Code: {e.code}')
    print(f'Details: {e.details}')
```

## Async Support

```python
from openmarketaccess import AsyncOpenMarketAccess

oma = AsyncOpenMarketAccess(
    api_key=os.environ.get('OMA_API_KEY')
)

async def create_payment():
    payment = await oma.payments.create(
        protocol='x402',
        amount=100.00,
        currency='USD'
    )
    return payment
```

## See Also

- [SDK Reference](../sdk/README.md)
- [Payment Guide](../guides/payments.md)
- [API Reference](../api/payments.md)
