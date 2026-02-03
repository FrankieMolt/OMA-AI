# Common Issues

Frequently encountered problems and their solutions.

## Authentication Issues

### Problem: Invalid API Key

**Symptoms:**
- API returns `401 Unauthorized`
- Error message: "Invalid API key"

**Solutions:**
1. Verify API key is correct
2. Check API key has not expired
3. Ensure API key is for correct environment (sandbox/production)
4. Regenerate API key if necessary

```typescript
// Check API key status
const apiKey = await oma.apiKeys.get('key_id');
console.log('Active:', apiKey.active);
console.log('Expires:', apiKey.expiresAt);
```

### Problem: Insufficient Permissions

**Symptoms:**
- API returns `403 Forbidden`
- Error message: "Insufficient permissions"

**Solutions:**
1. Check API key permissions
2. Update API key permissions
3. Use different API key with required permissions

```typescript
// Update API key permissions
await oma.apiKeys.update('key_id', {
  permissions: ['read:payments', 'write:payments']
});
```

## Payment Issues

### Problem: Payment Not Found

**Symptoms:**
- API returns `404 Not Found`
- Error message: "Payment not found"

**Solutions:**
1. Verify payment ID is correct
2. Check payment exists in database
3. Confirm you have access to the payment

```typescript
// List payments to verify
const payments = await oma.payments.list({
  senderId: 'user_id'
});
```

### Problem: Insufficient Funds

**Symptoms:**
- Payment creation fails
- Error message: "Insufficient funds"

**Solutions:**
1. Check account balance
2. Verify payment method has sufficient funds
3. Try different payment method

```typescript
// Check payment methods
const paymentMethods = await oma.paymentMethods.list();
console.log(paymentMethods);
```

### Problem: Payment Expired

**Symptoms:**
- Cannot execute payment
- Error message: "Payment has expired"

**Solutions:**
1. Check payment deadline
2. Create new payment if expired
3. Extend deadline if negotiation is allowed

```typescript
// Check payment details
const payment = await oma.payments.get('payment_id');
console.log('Deadline:', payment.deadline);
console.log('Status:', payment.status);
```

### Problem: Payment Already Executed

**Symptoms:**
- Cannot execute payment
- Error message: "Payment already executed"

**Solutions:**
1. Check payment status
2. Verify execution was not already completed
3. Create new payment if needed

```typescript
// Check payment status
const payment = await oma.payments.get('payment_id');
if (payment.status === 'completed') {
  console.log('Payment already completed');
}
```

## Webhook Issues

### Problem: Webhook Not Received

**Symptoms:**
- Webhook endpoint not receiving events
- No logs in webhook history

**Solutions:**
1. Verify webhook URL is accessible
2. Check webhook is active
3. Verify webhook events are configured correctly
4. Check firewall settings

```typescript
// Test webhook endpoint
const test = await oma.webhooks.sendTest({
  url: 'https://yourapp.com/webhook',
  event: 'payment.completed',
  data: { paymentId: 'test' }
});
console.log('Test result:', test);
```

### Problem: Invalid Webhook Signature

**Symptoms:**
- Signature verification fails
- Error message: "Invalid signature"

**Solutions:**
1. Verify webhook secret matches
2. Check signature verification code
3. Ensure payload is stringified correctly

```typescript
// Verify signature
const isValid = oma.webhooks.verifySignature(
  JSON.stringify(payload),
  signature,
  webhookSecret
);
```

### Problem: Webhook Timeout

**Symptoms:**
- Webhook delivery fails
- Error message: "Webhook timeout"

**Solutions:**
1. Optimize webhook handler
2. Use async processing
3. Implement queue system

```typescript
// Use queue for async processing
app.post('/webhook', async (req, res) => {
  await webhookQueue.add('process', req.body);
  res.status(200).send('OK');
});
```

## Rate Limiting Issues

### Problem: Rate Limit Exceeded

**Symptoms:**
- API returns `429 Too Many Requests`
- Error message: "Rate limit exceeded"

**Solutions:**
1. Implement exponential backoff
2. Reduce request frequency
3. Upgrade plan for higher limits
4. Use caching to reduce API calls

```typescript
// Implement backoff
async function makeRequestWithBackoff(attempt = 0) {
  try {
    return await oma.payments.list();
  } catch (error) {
    if (error.code === 'RATE_LIMIT_EXCEEDED' && attempt < 3) {
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      return makeRequestWithBackoff(attempt + 1);
    }
    throw error;
  }
}
```

## Marketplace Issues

### Problem: Listing Not Found

**Symptoms:**
- Cannot access listing
- Error message: "Listing not found"

**Solutions:**
1. Verify listing ID is correct
2. Check listing status (may be inactive)
3. Confirm listing exists

```typescript
// Search for listing
const listings = await oma.marketplace.listListings({
  search: 'listing name'
});
```

### Problem: Purchase Already Completed

**Symptoms:**
- Cannot complete purchase
- Error message: "Purchase already completed"

**Solutions:**
1. Check purchase status
2. Verify purchase was not already completed
3. Create new purchase if needed

```typescript
// Check purchase status
const purchase = await oma.marketplace.getPurchase('purchase_id');
console.log('Status:', purchase.status);
```

## Network Issues

### Problem: Connection Timeout

**Symptoms:**
- Requests timeout
- Error message: "Connection timeout"

**Solutions:**
1. Check internet connection
2. Verify API URL is correct
3. Increase timeout settings
4. Check firewall settings

```typescript
// Increase timeout
const oma = new OpenMarketAccess({
  apiKey: 'your_key',
  timeout: 60000 // 60 seconds
});
```

### Problem: DNS Resolution Failed

**Symptoms:**
- Cannot connect to API
- Error message: "DNS resolution failed"

**Solutions:**
1. Check DNS settings
2. Verify API URL is correct
3. Try different DNS server
4. Use IP address directly

## Environment Issues

### Problem: Sandbox vs Production Confusion

**Symptoms:**
- Working in wrong environment
- Test data in production

**Solutions:**
1. Verify API URL
2. Check API key environment
3. Use environment variables

```typescript
// Environment-specific configuration
const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY,
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://api.openmarketaccess.com/v1'
    : 'https://sandbox-api.openmarketaccess.com/v1'
});
```

## Data Issues

### Problem: Invalid Currency Code

**Symptoms:**
- Payment creation fails
- Error message: "Invalid currency code"

**Solutions:**
1. Use 3-letter ISO currency codes
2. Verify currency is supported
3. Check capitalization

```typescript
// Correct
currency: 'USD'

// Incorrect
currency: 'usd'
currency: 'US Dollar'
```

### Problem: Invalid Amount

**Symptoms:**
- Payment creation fails
- Error message: "Invalid amount"

**Solutions:**
1. Ensure amount is a number
2. Check amount is positive
3. Verify amount has correct decimal places

```typescript
// Correct
amount: 100.00

// Incorrect
amount: '100'
amount: -100
```

## SDK Issues

### Problem: SDK Installation Failed

**Symptoms:**
- Cannot install SDK
- Error during npm install

**Solutions:**
1. Clear npm cache
2. Delete node_modules
3. Update npm
4. Try different package manager

```bash
# Clear cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Problem: Type Errors

**Symptoms:**
- TypeScript compilation errors
- Type mismatches

**Solutions:**
1. Update TypeScript types
2. Check SDK version compatibility
3. Use type assertions carefully

```typescript
// Update types
npm install @types/node --save-dev
```

## Debugging Tips

### Enable Debug Logging

```typescript
const oma = new OpenMarketAccess({
  apiKey: 'your_key',
  debug: true
});
```

### Check Request IDs

```typescript
try {
  const payment = await oma.payments.create(data);
  console.log('Request ID:', payment.requestId);
} catch (error) {
  console.log('Request ID:', error.requestId);
}
```

### Monitor API Status

```bash
curl https://status.openmarketaccess.com
```

## Getting Help

### Self-Service Resources

1. **Documentation** - [docs.openmarketaccess.com](https://docs.openmarketaccess.com)
2. **API Reference** - Check API documentation
3. **GitHub Issues** - Search existing issues

### Community Support

1. **Discord** - [discord.gg/openmarketaccess](https://discord.gg/openmarketaccess)
2. **GitHub Discussions** - [github.com/openmarketaccess/discussions](https://github.com/openmarketaccess/discussions)
3. **Stack Overflow** - Tag questions with `openmarketaccess`

### Paid Support

1. **Email** - support@openmarketaccess.com
2. **Priority Support** - Available for Enterprise plans

## See Also

- [Error Codes](../reference/error-codes.md)
- [API Reference](../api/README.md)
- [Getting Help](getting-help.md)
