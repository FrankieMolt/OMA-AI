# Authentication and Authorization

This guide covers authentication and authorization mechanisms in OpenMarketAccess.

## Overview

OpenMarketAccess uses API key-based authentication for server-to-server communication and OAuth 2.0 for user-facing applications.

## API Key Authentication

### Obtaining an API Key

1. Log in to your OpenMarketAccess dashboard
2. Navigate to Settings > API Keys
3. Click "Generate New API Key"
4. Copy your API key (you won't see it again)

### Using API Keys

```javascript
const oma = new OpenMarketAccess({
  apiKey: 'your_api_key_here',
  apiUrl: 'https://api.openmarketaccess.com/v1'
});
```

### API Key Best Practices

- **Never** commit API keys to version control
- Use environment variables to store keys
- Rotate keys regularly (every 90 days recommended)
- Use separate keys for development, staging, and production
- Revoke compromised keys immediately

### API Key Permissions

API keys can have the following permissions:

| Permission | Description |
|------------|-------------|
| `read:markets` | Read marketplace data |
| `write:markets` | Create and update marketplace listings |
| `read:payments` | Read payment information |
| `write:payments` | Process payments |
| `read:users` | Read user information |
| `write:users` | Manage user accounts |
| `admin:all` | Full administrative access |

### Creating Scoped API Keys

```javascript
// Create a key with limited permissions
const limitedKey = await oma.apiKeys.create({
  name: 'Payment Processor',
  permissions: ['read:payments', 'write:payments'],
  expiresAt: '2026-04-24T00:00:00Z'
});
```

## OAuth 2.0 Authentication

### OAuth 2.0 Flow

OpenMarketAccess supports the Authorization Code flow for user-facing applications.

#### Step 1: Register Your Application

```javascript
const app = await oma.oauth.registerApp({
  name: 'My OMA App',
  redirectUri: 'https://myapp.com/callback',
  scopes: ['read:profile', 'write:payments']
});
```

#### Step 2: Redirect Users to Auth URL

```javascript
const authUrl = oma.oauth.getAuthorizationUrl({
  clientId: app.clientId,
  redirectUri: 'https://myapp.com/callback',
  scope: 'read:profile write:payments',
  state: 'random_state_value'
});

// Redirect user to authUrl
```

#### Step 3: Exchange Code for Tokens

```javascript
const tokens = await oma.oauth.exchangeCodeForTokens({
  clientId: app.clientId,
  clientSecret: app.clientSecret,
  code: authorizationCode,
  redirectUri: 'https://myapp.com/callback'
});
```

#### Step 4: Use Access Token

```javascript
const oma = new OpenMarketAccess({
  accessToken: tokens.accessToken
});
```

### Token Management

```javascript
// Refresh access token
const newTokens = await oma.oauth.refreshToken({
  clientId: app.clientId,
  clientSecret: app.clientSecret,
  refreshToken: tokens.refreshToken
});

// Revoke token
await oma.oauth.revokeToken({
  token: tokens.accessToken
});
```

## Webhook Authentication

Webhooks are authenticated using HMAC signatures to verify requests originated from OpenMarketAccess.

### Verifying Webhook Signatures

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Express.js example
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-oma-signature'];
  const isValid = verifyWebhookSignature(
    JSON.stringify(req.body),
    signature,
    process.env.OMA_WEBHOOK_SECRET
  );

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Process webhook
  processWebhook(req.body);
  res.status(200).send('OK');
});
```

## JWT Tokens

OpenMarketAccess uses JWT (JSON Web Tokens) for session management.

### Decoding JWT Tokens

```javascript
const jwt = require('jsonwebtoken');

const decoded = jwt.decode(accessToken, { complete: true });

console.log(decoded.payload);
// {
//   sub: 'user_id',
//   iat: 1234567890,
//   exp: 1234567990,
//   permissions: ['read:payments', 'write:payments']
// }
```

### Validating JWT Tokens

```javascript
const decoded = jwt.verify(
  accessToken,
  process.env.OMA_JWT_SECRET,
  { issuer: 'openmarketaccess.com' }
);
```

## Error Handling

### Common Authentication Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `INVALID_API_KEY` | API key is invalid or expired | Check your API key and regenerate if needed |
| `INSUFFICIENT_PERMISSIONS` | API key lacks required permissions | Update API key permissions |
| `EXPIRED_TOKEN` | Access token has expired | Refresh the token |
| `INVALID_SIGNATURE` | Webhook signature verification failed | Check your webhook secret |
| `RATE_LIMIT_EXCEEDED` | Too many authentication attempts | Implement backoff strategy |

### Example Error Handling

```javascript
try {
  const result = await oma.payments.create(payment);
} catch (error) {
  if (error.code === 'INVALID_API_KEY') {
    console.error('Invalid API key. Please check your configuration.');
  } else if (error.code === 'INSUFFICIENT_PERMISSIONS') {
    console.error('API key lacks required permissions.');
  } else {
    console.error('Authentication error:', error.message);
  }
}
```

## Security Best Practices

1. **Always use HTTPS** for all API calls
2. **Never expose secrets** in client-side code
3. **Implement rate limiting** to prevent brute force attacks
4. **Use short-lived tokens** with refresh tokens
5. **Validate all inputs** to prevent injection attacks
6. **Monitor authentication logs** for suspicious activity
7. **Rotate secrets regularly** (every 90 days)
8. **Use environment variables** for sensitive configuration

## Next Steps

- Learn about [Payment Implementation](payments.md)
- Set up [Webhooks](webhooks.md)
- Understand [Rate Limiting](rate-limiting.md)
- Review [API Security Best Practices](../api/README.md#security)

## Additional Resources

- [OAuth 2.0 RFC](https://tools.ietf.org/html/rfc6749)
- [JWT Specification](https://jwt.io/introduction)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
