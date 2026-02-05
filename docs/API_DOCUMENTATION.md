# OMA-AI API Documentation

## Base URLs

### Production
- **Main Backend**: `https://api.oma-ai.com`
- **Treasury Service**: `https://treasury.oma-ai.com`
- **Whitelabel SDK**: `https://sdk.oma-ai.com`
- **Frontend**: `https://oma-ai.com`

### Development
- **Main Backend**: `http://localhost:9000`
- **Treasury Service**: `http://localhost:8001`
- **Whitelabel SDK**: `http://localhost:8002`
- **Frontend**: `http://localhost:3000`

---

## Authentication

All endpoints require x402 payment headers for paid services.

```http
x-402-payment-required: true
x-402-amount: 0.05
x-402-currency: USDC
x-402-chain: base
x-402-wallet: {user_wallet_address}
```

---

## Treasury Service Endpoints

### Health Check
```http
GET /health
```

Response:
```json
{
  "status": "healthy",
  "service": "x402-treasury"
}
```

### Get Treasury Balance
```http
GET /balance
```

Response:
```json
{
  "address": "0x590FdA238A52bBA79fD4635e73bDAC1eAe558e784",
  "balance": 1250.50,
  "last_updated": "2026-02-03T05:55:00Z"
}
```

### Get Available Providers
```http
GET /providers
```

Response:
```json
{
  "providers": [
    {
      "id": "openrouter",
      "name": "OpenRouter Gateway",
      "cost_per_request": 0.001,
      "markup_multiplier": 3.0,
      "total_cost": 0.00375
    },
    {
      "id": "anthropic_claude",
      "name": "Anthropic Claude API",
      "cost_per_request": 0.015,
      "markup_multiplier": 2.5,
      "total_cost": 0.05625
    }
  ]
}
```

### Process Payment
```http
POST /process-payment
Content-Type: application/json

{
  "user_address": "0x123...",
  "amount": 0.05,
  "service_id": "llm_completion",
  "provider_id": "openrouter"
}
```

Response:
```json
{
  "success": true,
  "transaction_id": "txn_abc123",
  "total_charge": 0.05,
  "provider_cost": 0.001,
  "commission": 0.02475,
  "service_executed": true,
  "timestamp": "2026-02-03T05:55:00Z"
}
```

### Get Commissions Report
```http
GET /commissions
```

Response:
```json
{
  "total_commissions": 156,
  "total_revenue": 387.25,
  "transactions": [...],
  "timestamp": "2026-02-03T05:55:00Z"
}
```

---

## Whitelabel SDK Endpoints

### Health Check
```http
GET /health
```

### Get Provider Status
```http
GET /providers
```

Response:
```json
{
  "providers": {
    "openrouter": {
      "class": "OpenRouterProvider",
      "base_cost": 0.001,
      "markup": 3.0,
      "requests_count": 45,
      "total_revenue": 6.75
    },
    "anthropic_claude": {
      "class": "AnthropicProvider",
      "base_cost": 0.015,
      "markup": 2.5,
      "requests_count": 23,
      "total_revenue": 8.63
    }
  }
}
```

### Execute Request
```http
POST /execute
Content-Type: application/json

{
  "prompt": "Explain quantum computing in simple terms",
  "provider": "openrouter",
  "model": "anthropic/claude-3-opus",
  "max_tokens": 500,
  "temperature": 0.7
}
```

Response:
```json
{
  "success": true,
  "data": {
    "choices": [...],
    "usage": {...}
  },
  "cost": 0.00375,
  "provider": "openrouter",
  "metadata": {
    "model": "anthropic/claude-3-opus",
    "tokens_used": 150,
    "prompt": "Explain quantum computing..."
  }
}
```

### Add Provider
```http
POST /add-provider
Content-Type: application/json

{
  "name": "my_custom_provider",
  "api_key": "sk-custom-123",
  "provider_type": "openrouter",
  "markup": 2.0
}
```

---

## Main Backend Endpoints

### Marketplace Services

#### List All Services
```http
GET /api/v3/marketplace/services
```

Response:
```json
{
  "ai_services": 57,
  "extended_services": 27,
  "defi_services": 19,
  "total_services": 103,
  "services": [...]
}
```

#### Get Service Details
```http
GET /api/v3/marketplace/services/{service_id}
```

#### Execute Service (with x402)
```http
POST /api/v3/services/{service_id}/execute
Content-Type: application/json
x-402-payment-required: true
x-402-amount: 0.05

{
  "prompt": "Generate a marketing slogan",
  "options": {...}
}
```

---

## WebSocket Real-time

### Connection
```javascript
const ws = new WebSocket('wss://api.oma-ai.com/ws');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'subscribe',
    channel: 'marketplace'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};
```

### Events

#### Service Execution
```json
{
  "type": "service_executed",
  "service_id": "llm_completion",
  "provider": "openrouter",
  "cost": 0.05,
  "timestamp": "2026-02-03T05:55:00Z"
}
```

#### Commission Earned
```json
{
  "type": "commission_earned",
  "amount": 0.02475,
  "provider": "openrouter",
  "total_revenue": 387.25,
  "timestamp": "2026-02-03T05:55:00Z"
}
```

---

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "error": "Error description",
  "code": "ERROR_CODE",
  "timestamp": "2026-02-03T05:55:00Z"
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| `INSUFFICIENT_FUNDS` | User wallet has insufficient balance |
| `INVALID_PROVIDER` | Provider ID not found |
| `PROVIDER_ERROR` | External API error |
| `PAYMENT_FAILED` | x402 payment verification failed |
| `RATE_LIMITED` | Too many requests |
| `SERVICE_UNAVAILABLE` | Service temporarily unavailable |

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| `/health` | 100/min |
| `/execute` | 60/min |
| `/process-payment` | 30/min |
| `/providers` | 120/min |
| WebSocket | 1000/min |

---

## Examples

### Python
```python
import httpx

async def execute_llm(prompt: str):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8002/execute",
            json={
                "prompt": prompt,
                "provider": "openrouter",
                "model": "anthropic/claude-3-opus"
            }
        )
        return response.json()

result = await execute_llm("Hello, world!")
```

### JavaScript
```javascript
const executeService = async (prompt) => {
  const response = await fetch('http://localhost:8002/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      provider: 'openrouter',
      model: 'anthropic/claude-3-opus'
    })
  });
  return await response.json();
};

executeService('Hello, world!').then(console.log);
```

### cURL
```bash
curl -X POST http://localhost:8002/execute \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Hello, world!",
    "provider": "openrouter",
    "model": "anthropic/claude-3-opus"
  }'
```