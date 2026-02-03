# Error Codes

Complete list of error codes and their meanings.

## Authentication Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_API_KEY` | 401 | Invalid or expired API key |
| `INSUFFICIENT_PERMISSIONS` | 403 | API key lacks required permissions |
| `INVALID_CREDENTIALS` | 401 | Invalid username or password |
| `SESSION_EXPIRED` | 401 | User session has expired |
| `INVALID_TOKEN` | 401 | Invalid access token |
| `EXPIRED_TOKEN` | 401 | Access token has expired |
| `INVALID_REFRESH_TOKEN` | 401 | Invalid refresh token |
| `EXPIRED_REFRESH_TOKEN` | 401 | Refresh token has expired |
| `INVALID_SIGNATURE` | 401 | Invalid signature |
| `IP_NOT_ALLOWED` | 403 | IP address not whitelisted |

## Payment Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `PAYMENT_NOT_FOUND` | 404 | Payment not found |
| `INVALID_AMOUNT` | 400 | Invalid payment amount |
| `INVALID_CURRENCY` | 400 | Invalid currency code |
| `INSUFFICIENT_FUNDS` | 400 | Insufficient funds for payment |
| `PAYMENT_ALREADY_FUNDED` | 400 | Payment already funded |
| `PAYMENT_ALREADY_EXECUTED` | 400 | Payment already executed |
| `PAYMENT_EXPIRED` | 400 | Payment request has expired |
| `PAYMENT_CANCELLED` | 400 | Payment has been cancelled |
| `NEGOTIATION_NOT_ALLOWED` | 400 | Negotiation not allowed for this payment |
| `NEGOTIATION_FAILED` | 400 | Negotiation failed |
| `NEGOTIATION_EXPIRED` | 400 | Negotiation has expired |
| `INVALID_PAYMENT_METHOD` | 400 | Invalid payment method |
| `PAYMENT_METHOD_EXPIRED` | 400 | Payment method has expired |
| `ESCROW_NOT_FUNDED` | 400 | Escrow not funded |
| `ESCROW_ALREADY_RELEASED` | 400 | Escrow already released |
| `DISPUTE_EXISTS` | 400 | Dispute already exists for this payment |
| `DISPUTE_NOT_FOUND` | 404 | Dispute not found |
| `DISPUTE_ALREADY_RESOLVED` | 400 | Dispute already resolved |
| `REFUND_FAILED` | 400 | Refund failed |
| `REFUND_AMOUNT_INVALID` | 400 | Invalid refund amount |
| `REFUND_EXCEEDS_PAYMENT` | 400 | Refund amount exceeds payment amount |

## Marketplace Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `LISTING_NOT_FOUND` | 404 | Listing not found |
| `LISTING_ALREADY_SOLD` | 400 | Listing already sold |
| `LISTING_INACTIVE` | 400 | Listing is inactive |
| `INSUFFICIENT_STOCK` | 400 | Insufficient stock available |
| `INVALID_PRICE` | 400 | Invalid listing price |
| `INVALID_CATEGORY` | 400 | Invalid category |
| `PURCHASE_NOT_FOUND` | 404 | Purchase not found |
| `PURCHASE_ALREADY_COMPLETED` | 400 | Purchase already completed |
| `PURCHASE_CANCELLED` | 400 | Purchase has been cancelled |
| `REVIEW_ALREADY_EXISTS` | 400 | Review already exists for this purchase |
| `INVALID_RATING` | 400 | Invalid rating (must be 1-5) |

## Webhook Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `WEBHOOK_NOT_FOUND` | 404 | Webhook not found |
| `INVALID_WEBHOOK_URL` | 400 | Invalid webhook URL |
| `INVALID_WEBHOOK_EVENT` | 400 | Invalid webhook event pattern |
| `WEBHOOK_INACTIVE` | 400 | Webhook is inactive |
| `DELIVERY_FAILED` | 500 | Webhook delivery failed |
| `WEBHOOK_TIMEOUT` | 408 | Webhook endpoint timeout |
| `INVALID_SIGNATURE` | 401 | Invalid webhook signature |
| `WEBHOOK_LIMIT_EXCEEDED` | 429 | Webhook rate limit exceeded |

## User Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `USER_NOT_FOUND` | 404 | User not found |
| `USER_ALREADY_EXISTS` | 400 | User already exists |
| `USER_SUSPENDED` | 403 | User account is suspended |
| `USER_DELETED` | 400 | User account is deleted |
| `INVALID_EMAIL` | 400 | Invalid email address |
| `EMAIL_ALREADY_VERIFIED` | 400 | Email already verified |
| `EMAIL_VERIFICATION_FAILED` | 400 | Email verification failed |
| `INVALID_PASSWORD` | 400 | Invalid password |
| `PASSWORD_RESET_FAILED` | 400 | Password reset failed |
| `PASSWORD_TOO_WEAK` | 400 | Password does not meet requirements |

## API Key Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `API_KEY_NOT_FOUND` | 404 | API key not found |
| `API_KEY_ALREADY_EXISTS` | 400 | API key already exists |
| `API_KEY_EXPIRED` | 401 | API key has expired |
| `API_KEY_REVOKED` | 401 | API key has been revoked |
| `API_KEY_LIMIT_EXCEEDED` | 429 | API key rate limit exceeded |

## Rate Limiting Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `RATE_LIMIT_EXCEEDED` | 429 | Rate limit exceeded |
| `DAILY_LIMIT_EXCEEDED` | 429 | Daily limit exceeded |
| `MONTHLY_LIMIT_EXCEEDED` | 429 | Monthly limit exceeded |
| `PLAN_LIMIT_EXCEEDED` | 429 | Plan limit exceeded |

## Validation Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Invalid request format |
| `MISSING_REQUIRED_FIELD` | 400 | Missing required field |
| `INVALID_FIELD_TYPE` | 400 | Invalid field type |
| `FIELD_TOO_LONG` | 400 | Field exceeds maximum length |
| `FIELD_TOO_SHORT` | 400 | Field below minimum length |
| `INVALID_FORMAT` | 400 | Invalid format |
| `INVALID_DATE` | 400 | Invalid date format |
| `INVALID_UUID` | 400 | Invalid UUID format |
| `INVALID_ENUM` | 400 | Invalid enum value |

## MCP Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `MCP_INVALID_MODEL` | 400 | Invalid AI model specified |
| `MCP_MODEL_NOT_FOUND` | 404 | AI model not found |
| `MCP_TOKEN_LIMIT_EXCEEDED` | 400 | Token limit exceeded |
| `MCP_SESSION_NOT_FOUND` | 404 | MCP session not found |
| `MCP_TOOL_NOT_FOUND` | 404 | MCP tool not found |
| `MCP_RATE_LIMIT_EXCEEDED` | 429 | MCP rate limit exceeded |
| `MCP_API_ERROR` | 500 | MCP API error |

## A2A Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `A2A_AGENT_NOT_FOUND` | 404 | Agent not found |
| `A2A_AGENT_UNAVAILABLE` | 503 | Agent unavailable |
| `A2A_INVALID_MESSAGE` | 400 | Invalid message format |
| `A2A_NEGOTIATION_FAILED` | 400 | Agent negotiation failed |
| `A2A_CONTRACT_VIOLATION` | 400 | Contract violation |
| `A2A_AUTHENTICATION_FAILED` | 401 | Agent authentication failed |
| `A2A_RATE_LIMIT_EXCEEDED` | 429 | Agent rate limit exceeded |

## Server Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INTERNAL_ERROR` | 500 | Internal server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |
| `DATABASE_ERROR` | 500 | Database error |
| `CACHE_ERROR` | 500 | Cache error |
| `EXTERNAL_API_ERROR` | 502 | External API error |
| `TIMEOUT` | 504 | Request timeout |

## Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "PAYMENT_NOT_FOUND",
    "message": "Payment not found",
    "details": {
      "paymentId": "pay_123456"
    },
    "requestId": "req_789",
    "timestamp": "2026-01-24T12:00:00Z"
  }
}
```

## Handling Errors

### TypeScript

```typescript
try {
  const payment = await oma.payments.get('pay_123456');
} catch (error) {
  if (error instanceof OpenMarketAccessError) {
    switch (error.code) {
      case 'PAYMENT_NOT_FOUND':
        console.error('Payment does not exist');
        break;
      case 'INSUFFICIENT_PERMISSIONS':
        console.error('You do not have permission');
        break;
      default:
        console.error('An error occurred:', error.message);
    }
  }
}
```

### Python

```python
try:
    payment = oma.payments.get('pay_123456')
except OpenMarketAccessError as e:
    if e.code == 'PAYMENT_NOT_FOUND':
        print('Payment does not exist')
    elif e.code == 'INSUFFICIENT_PERMISSIONS':
        print('You do not have permission')
    else:
        print(f'An error occurred: {e.message}')
```

## Retryable Errors

The following errors are safe to retry with exponential backoff:

- `RATE_LIMIT_EXCEEDED`
- `INTERNAL_ERROR`
- `SERVICE_UNAVAILABLE`
- `TIMEOUT`
- `DATABASE_ERROR`
- `EXTERNAL_API_ERROR`

## Non-Retryable Errors

The following errors should not be retried:

- `INVALID_REQUEST`
- `PAYMENT_NOT_FOUND`
- `INVALID_API_KEY`
- `INSUFFICIENT_PERMISSIONS`
- `INVALID_AMOUNT`
- `PAYMENT_EXPIRED`
- `USER_SUSPENDED`

## Best Practices

1. **Always check error codes** for specific handling
2. **Implement retry logic** for retryable errors
3. **Log all errors** with request IDs
3. **Display user-friendly messages** for client errors
4. **Monitor error rates** for patterns
5. **Set up alerts** for critical errors
6. **Document custom error handling** in your code

## See Also

- [API Reference](../api/README.md)
- [Troubleshooting](../troubleshooting/common-issues.md)
- [Database Schema](database-schema.md)
