# API Reference

Complete API documentation for OpenMarketAccess.

## Base URL

```
Production: https://api.openmarketaccess.com/v1
Sandbox:    https://sandbox-api.openmarketaccess.com/v1
```

## Authentication

All API requests require authentication using an API key in the header:

```http
Authorization: Bearer YOUR_API_KEY
```

## Request Format

### JSON

```http
Content-Type: application/json
Accept: application/json
```

### Example Request

```bash
curl -X POST https://api.openmarketaccess.com/v1/payments \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100.00,
    "currency": "USD",
    "protocol": "x402"
  }'
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "pay_123456",
    "amount": 100.00,
    "currency": "USD",
    "status": "created"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_AMOUNT",
    "message": "Payment amount must be greater than 0",
    "details": {}
  }
}
```

## Rate Limiting

API requests are rate limited based on your plan:

| Plan | Requests | Window |
|------|----------|--------|
| Free | 1,000 | per hour |
| Pro | 10,000 | per hour |
| Enterprise | Unlimited | - |

Rate limit headers are included in every response:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1706092800
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_API_KEY` | 401 | Invalid or expired API key |
| `INSUFFICIENT_PERMISSIONS` | 403 | API key lacks required permissions |
| `INVALID_REQUEST` | 400 | Invalid request parameters |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMIT_EXCEEDED` | 429 | Rate limit exceeded |
| `INTERNAL_ERROR` | 500 | Internal server error |

## Pagination

List endpoints support pagination:

```bash
GET /payments?page=1&perPage=50
```

### Response

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "perPage": 50,
    "totalPages": 10,
    "totalItems": 500,
    "hasMore": true
  }
}
```

## Filtering and Sorting

### Filtering

```bash
GET /payments?status=completed&currency=USD
```

### Sorting

```bash
GET /payments?sort=createdAt&order=desc
```

## Webhooks

Webhooks notify your application of events:

```json
{
  "id": "evt_123456",
  "type": "payment.completed",
  "data": {
    "paymentId": "pay_789",
    "amount": 100.00
  },
  "timestamp": "2026-01-24T12:00:00Z"
}
```

## Security

### HTTPS Only

All API requests must be made over HTTPS. HTTP requests will be rejected.

### IP Whitelisting

Configure allowed IP addresses in your dashboard for additional security.

### Request Signing

For enhanced security, requests can be signed with HMAC:

```javascript
const crypto = require('crypto');

function signRequest(method, path, body, secret) {
  const timestamp = Date.now().toString();
  const payload = `${timestamp}${method}${path}${JSON.stringify(body)}`;

  const signature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return {
    'X-OMA-Timestamp': timestamp,
    'X-OMA-Signature': signature
  };
}
```

## API Versions

Current version: `v1`

Previous versions are maintained for backwards compatibility:

- `v1` (Current)
- `v0` (Deprecated)

Specify version in URL:

```
https://api.openmarketaccess.com/v1/payments
```

## SDK Support

Official SDKs are available:

- [TypeScript SDK](../sdk/typescript.md)
- [Python SDK](../sdk/python.md)

SDKs handle authentication, retries, and response parsing automatically.

## Testing

Use the sandbox environment for testing:

```javascript
const oma = new OpenMarketAccess({
  apiKey: 'your_sandbox_key',
  apiUrl: 'https://sandbox-api.openmarketaccess.com/v1'
});
```

## Changelog

### v1.2.0 (January 2026)
- Added multi-signature payments
- Enhanced dispute resolution
- New webhook events

### v1.1.0 (December 2025)
- Added batch operations
- Improved rate limiting
- New API endpoints

### v1.0.0 (November 2025)
- Initial stable release

## Support

- Documentation: [docs.openmarketaccess.com](https://docs.openmarketaccess.com)
- API Status: [status.openmarketaccess.com](https://status.openmarketaccess.com)
- Support Email: support@openmarketaccess.com
- Community Discord: [discord.gg/openmarketaccess](https://discord.gg/openmarketaccess)

## API Endpoints

- [Authentication API](auth.md)
- [Marketplace API](marketplace.md)
- [Payment API](payments.md)
- [Webhook API](webhooks.md)
- [User API](users.md)
