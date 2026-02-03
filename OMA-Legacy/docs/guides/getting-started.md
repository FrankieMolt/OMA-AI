# Getting Started with OpenMarketAccess

This guide will help you set up your development environment and create your first application with OpenMarketAccess.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.9 or higher) - [Download](https://www.python.org/downloads/)
- **Docker** (optional) - [Download](https://www.docker.com/products/docker-desktop/)
- **Git** - [Download](https://git-scm.com/downloads)

## Installation

### Option 1: Clone the Repository

```bash
git clone https://github.com/your-org/OpenMarketAccess.git
cd OpenMarketAccess
npm install
```

### Option 2: Install via Package Manager

```bash
npm install @openmarketaccess/sdk
# or
pip install openmarketaccess
```

## Project Setup

### 1. Initialize Your Project

```bash
# Create a new directory
mkdir my-oma-app
cd my-oma-app

# Initialize Node.js project
npm init -y

# Install the SDK
npm install @openmarketaccess/sdk
```

### 2. Configure Environment Variables

Create a `.env` file in your project root:

```env
OMA_API_KEY=your_api_key_here
OMA_API_URL=https://api.openmarketaccess.com/v1
OMA_WEBHOOK_SECRET=your_webhook_secret_here
```

### 3. Create Your First Application

Create `index.js`:

```javascript
const { OpenMarketAccess } = require('@openmarketaccess/sdk');

// Initialize the client
const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY,
  apiUrl: process.env.OMA_API_URL
});

// Test the connection
async function main() {
  try {
    const health = await oma.health.check();
    console.log('Connection successful:', health);
  } catch (error) {
    console.error('Connection failed:', error.message);
  }
}

main();
```

Run your application:

```bash
node index.js
```

## Quick Start Examples

### TypeScript Example

```typescript
import { OpenMarketAccess, PaymentRequest } from '@openmarketaccess/sdk';

const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY!,
  apiUrl: process.env.OMA_API_URL!
});

async function createPayment() {
  const payment: PaymentRequest = {
    amount: 10.00,
    currency: 'USD',
    description: 'Test payment',
    protocol: 'x402'
  };

  const result = await oma.payments.create(payment);
  console.log('Payment created:', result);
}

createPayment();
```

### Python Example

```python
from openmarketaccess import OpenMarketAccess

oma = OpenMarketAccess(
    api_key=os.environ.get('OMA_API_KEY'),
    api_url=os.environ.get('OMA_API_URL')
)

def create_payment():
    payment = oma.payments.create(
        amount=10.00,
        currency='USD',
        description='Test payment',
        protocol='x402'
    )
    print(f'Payment created: {payment}')

create_payment()
```

## Using Docker

### Docker Compose Setup

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  oma-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - OMA_API_KEY=${OMA_API_KEY}
      - OMA_API_URL=${OMA_API_URL}
    depends_on:
      - redis

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

Run with Docker:

```bash
docker-compose up -d
```

## Next Steps

- Learn about [Authentication](authentication.md)
- Understand the [x402 Payment Protocol](../protocols/x402.md)
- Explore the [API Reference](../api/README.md)
- Check [SDK Examples](../sdk/examples.md)

## Troubleshooting

### Common Issues

**Problem:** Cannot connect to API
- **Solution:** Check your API key and ensure the API URL is correct

**Problem:** Authentication failed
- **Solution:** Verify your API key is valid and has the required permissions

**Problem:** Rate limit exceeded
- **Solution:** Implement rate limiting in your application or upgrade your plan

## Getting Help

- Read the [Troubleshooting Guide](../troubleshooting/common-issues.md)
- Check the [API Documentation](../api/README.md)
- Join our [Community Discord](https://discord.gg/openmarketaccess)
