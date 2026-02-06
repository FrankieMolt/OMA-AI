# x402 Paywall Embed Scripts

Integrate OMA-AI x402 paywall into your website to monetize your APIs, MCPs, and services.

## Quick Start

### Basic Implementation

Add the embed script to your HTML:

```html
<script
  src="https://oma-ai.com/embed/paywall.js"
  data-api-key="your-api-key"
  data-price="0.01"
  data-title="Unlock Premium Access"
></script>
```

### Full Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My API - Premium Access</title>
  <script
    src="https://oma-ai.com/embed/paywall.js"
    data-api-key="your-api-key-here"
    data-price="0.01"
    data-currency="USDC"
    data-title="Unlock Premium Access"
    data-button-text="Unlock Now - $0.01"
    data-accent="#8b5cf6"
    data-background="#000000"
    data-text="#ffffff"
  ></script>
</head>
<body>
  <div>
    <h1>My Premium API</h1>
    <p>This content requires a payment to access.</p>
  </div>
</body>
</html>
```

## Configuration Options

| Attribute | Required | Default | Description |
|-----------|-----------|---------|-------------|
| data-api-key | ✅ Yes | - | Your OMA-AI API key |
| data-price | ✅ Yes | - | Price per call in USDC |
| data-currency | ❌ No | "USDC" | Currency symbol (USDC, ETH, SOL) |
| data-title | ❌ No | "Unlock with x402 Payment" | Custom title for paywall |
| data-button-text | ❌ No | "Unlock Now" | Button text |
| data-accent | ❌ No | "#8b5cf6" | Accent color (hex) |
| data-background | ❌ No | "#000000" | Background color (hex) |
| data-text | ❌ No | "#ffffff" | Text color (hex) |
| data-position | ❌ No | "top" | Position ("top", "center") |

## JavaScript Events

Listen to payment success events:

```javascript
// Callback function
window.OMAPaywallSuccess = function(paymentId) {
  console.log('Payment successful:', paymentId);
  // Unlock your content here
  localStorage.setItem('unlocked', 'true');
  location.reload();
};

// Or use event listener
document.addEventListener('oma-paywall-success', function(e) {
  console.log('Payment ID:', e.detail.paymentId);
  // Unlock your content here
});
```

## Examples

### Example 1: Paywall for API Endpoints

```javascript
// server.js (Node.js/Express)
const express = require('express');
const app = express();

app.get('/api/protected', async (req, res) => {
  const { api_key } = req.query;
  
  // Verify payment status
  const response = await fetch('https://oma-ai.com/api/payments/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: api_key }),
  });
  
  const { verified } = await response.json();
  
  if (!verified) {
    return res.status(402).json({ error: 'Payment required' });
  }
  
  // Provide protected content
  res.json({ data: 'Your protected API data' });
});

app.listen(3000);
```

### Example 2: Paywall for Website Content

```html
<!DOCTYPE html>
<html>
<head>
  <script
    src="https://oma-ai.com/embed/paywall.js"
    data-api-key="your-api-key"
    data-price="0.05"
    data-title="Premium Article Access"
  ></script>
</head>
<body>
  <div id="content">
    <h1>Premium Content</h1>
    <p>This content requires payment...</p>
  </div>

  <script>
    // Check if unlocked
    const isUnlocked = localStorage.getItem('oma_paywall_status_your-api-key') === 'unlocked';
    
    if (!isUnlocked) {
      // Paywall will automatically show
      document.getElementById('content').style.display = 'none';
    } else {
      // Show content if unlocked
      document.getElementById('content').style.display = 'block';
    }
  </script>
</body>
</html>
```

### Example 3: Paywall for MCPs

```javascript
// mcp-server.ts
import { Server } from '@modelcontextprotocol/sdk';

const server = new Server();

// Middleware to check x402 payment
server.use(async (req, res, next) => {
  const { api_key } = req.headers;
  
  // Verify with OMA-AI
  const response = await fetch('https://oma-ai.com/api/payments/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: api_key }),
  });
  
  const { verified } = await response.json();
  
  if (!verified) {
    // Return x402 payment challenge
    res.setHeader('WWW-Authenticate', 'x402 payment required');
    return res.status(402).json({
      error: 'Payment required',
      payment_url: 'https://oma-ai.com/pay',
      amount: 0.01
    });
  }
  
  next();
});

server.start();
```

## Advanced Integration

### Custom Paywall Styling

The paywall can be fully customized using data attributes:

```html
<script
  src="https://oma-ai.com/embed/paywall.js"
  data-api-key="your-api-key"
  data-price="0.01"
  data-title="My Custom Title"
  data-button-text="Get Access Now"
  data-accent="#ff6b6b"
  data-background="#1a1a2e"
  data-text="#e2e8f0"
></script>
```

### Payment Verification API

To verify payments on your backend, use the verification endpoint:

```bash
curl -X POST https://oma-ai.com/api/payments/verify \\
  -H "Content-Type: application/json" \\
  -d '{
    "apiKey": "your-api-key",
    "paymentId": "payment-id-from-webhook"
  }'
```

Response:
```json
{
  "verified": true,
  "paymentId": "oma_abc123def456_1704060800000",
  "amount": 0.01,
  "currency": "USDC",
  "timestamp": 1704060800000,
  "status": "confirmed"
}
```

## Troubleshooting

### Paywall Not Showing

1. Check that `data-api-key` is set correctly
2. Verify your API key is active in OMA-AI dashboard
3. Check browser console for errors (F12)
4. Ensure script is loaded before DOM is ready

### Payment Failed

1. Check your x402 wallet has sufficient funds
2. Verify network (Base, Ethereum, Solana) is correct
3. Check transaction gas fees
4. Ensure payment amount is correct

### Content Not Unlocking

1. Verify `window.OMAPaywallSuccess` callback is set
2. Check event listener for `oma-paywall-success`
3. Ensure localStorage is not blocked
4. Check payment status with verification API

## Support

For issues or questions:
- Documentation: https://oma-ai.com/docs
- Support: support@oma-ai.com
- Discord: https://discord.gg/oma-ai
