# LLM API Reselling Guide

## Overview

Resell OpenRouter LLM APIs through OMA with x402 micropayments. Add your markup and earn on every call.

---

## Architecture

```
User Request
    ↓
OMA Platform (your-api.com/v1/chat)
    ↓
X-Payment verification ($0.01)
    ↓
OpenRouter API
    ↓
Response to User
```

---

## Setup

### 1. Get OpenRouter API Key

1. Go to https://openrouter.ai
2. Create account
3. Generate API key
4. Add credits ($10 minimum)

### 2. Configure Environment

```bash
# Add to ~/.oma/.env
OPENROUTER_KEY=sk-or-v1-xxxxx
OPENROUTER_SITE=https://your-site.com
OPENROUTER_TITLE=Your App Name
```

### 3. Create LLM Proxy Server

```javascript
// llm-proxy.js
const express = require('express');
const { verifyX402 } = require('@openmarketaccess/x402');

const app = express();
app.use(express.json());

const OPENROUTER_KEY = process.env.OPENROUTER_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1';

// Pricing per model
const PRICING = {
  'openai/gpt-4o': { cost: 0.005, sell: 0.01 },
  'openai/gpt-4o-mini': { cost: 0.00015, sell: 0.001 },
  'anthropic/claude-3.5-sonnet': { cost: 0.003, sell: 0.008 },
  'anthropic/claude-3-haiku': { cost: 0.00025, sell: 0.001 },
  'meta-llama/llama-3.1-405b-instruct': { cost: 0.002, sell: 0.005 },
  'meta-llama/llama-3.1-70b-instruct': { cost: 0.0001, sell: 0.001 },
  'mistralai/mistral-large': { cost: 0.002, sell: 0.005 }
};

// Payment config
const PAYMENT_CONFIG = {
  recipient: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6',
  network: 'base-mainnet'
};

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'llm-proxy' });
});

// List models
app.get('/v1/models', (req, res) => {
  res.json({
    object: 'list',
    data: Object.entries(PRICING).map(([id, pricing]) => ({
      id,
      object: 'model',
      pricing: {
        prompt: pricing.sell,
        completion: pricing.sell
      }
    }))
  });
});

// Chat completions
app.post('/v1/chat/completions', async (req, res) => {
  const { model, messages, ...params } = req.body;
  
  // Check model exists
  if (!PRICING[model]) {
    return res.status(400).json({ error: 'Unknown model' });
  }
  
  const pricing = PRICING[model];
  
  // Verify payment
  const proof = req.headers['x-payment'];
  const verification = await verifyX402(proof, {
    recipient: PAYMENT_CONFIG.recipient,
    amount: pricing.sell.toString(),
    network: PAYMENT_CONFIG.network
  });
  
  if (!verification.valid) {
    return res.status(402).json({
      error: 'Payment required',
      x402: {
        version: '1.0',
        amount: pricing.sell,
        recipient: PAYMENT_CONFIG.recipient,
        network: PAYMENT_CONFIG.network
      }
    });
  }
  
  try {
    // Forward to OpenRouter
    const response = await fetch(`${OPENROUTER_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.OPENROUTER_SITE,
        'X-Title': process.env.OPENROUTER_TITLE
      },
      body: JSON.stringify({ model, messages, ...params })
    });
    
    const data = await response.json();
    
    // Add payment info to response
    data.payment = {
      charged: pricing.sell,
      verified: true
    };
    
    res.json(data);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('LLM Proxy running on port 3000');
});
```

### 4. Deploy

```bash
# Install dependencies
npm install express @openmarketaccess/x402

# Run locally
node llm-proxy.js

# Deploy to production
# Vercel, Railway, Render, etc.
```

---

## Pricing Strategy

### Recommended Markups

| Model | Cost/1K tokens | Sell Price | Markup |
|-------|----------------|------------|--------|
| GPT-4o | $0.005 | $0.01 | 100% |
| GPT-4o-mini | $0.00015 | $0.001 | 566% |
| Claude 3.5 Sonnet | $0.003 | $0.008 | 166% |
| Claude 3 Haiku | $0.00025 | $0.001 | 300% |
| Llama 3.1 405B | $0.002 | $0.005 | 150% |
| Llama 3.1 70B | $0.0001 | $0.001 | 900% |
| Mistral Large | $0.002 | $0.005 | 150% |

### Pricing Factors

1. **Your costs**: OpenRouter charges
2. **Value provided**: Model quality
3. **Competition**: Other providers
4. **Volume**: Higher volume = lower prices

---

## Revenue Projections

### Scenario 1: Small Scale

- 100 calls/day
- $0.01 avg price
- **$30/month revenue**
- $15 profit (50% margin)

### Scenario 2: Medium Scale

- 1,000 calls/day
- $0.01 avg price
- **$300/month revenue**
- $150 profit

### Scenario 3: Large Scale

- 10,000 calls/day
- $0.01 avg price
- **$3,000/month revenue**
- $1,500 profit

---

## Client Integration

### Using the API

```bash
# List models
curl https://your-api.com/v1/models

# Chat completion
curl https://your-api.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-Payment: your-proof" \
  -d '{
    "model": "openai/gpt-4o",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

### JavaScript SDK

```javascript
import { OMAClient } from '@openmarketaccess/sdk';

const client = new OMAClient({
  baseUrl: 'https://your-api.com',
  paymentProof: await generateProof()
});

const response = await client.chat({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello!' }]
});
```

---

## Monitoring

### Track Usage

```javascript
// Add to your proxy
app.use((req, res, next) => {
  console.log({
    timestamp: new Date(),
    model: req.body?.model,
    cost: PRICING[req.body?.model]?.cost,
    revenue: PRICING[req.body?.model]?.sell
  });
  next();
});
```

### Metrics to Track

- Requests per day
- Revenue per model
- Error rate
- Latency
- Payment failures

---

## Best Practices

1. **Cache responses** for identical queries
2. **Rate limit** to prevent abuse
3. **Log everything** for debugging
4. **Monitor costs** vs revenue
5. **Handle errors** gracefully
6. **Version your API** for changes

---

## Support

- OpenRouter Docs: https://openrouter.ai/docs
- OMA Discord: https://discord.gg/openmarketaccess
- Email: llm@openmarketaccess.io
