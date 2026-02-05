# x402 Payment Integration for AI Services

**Monetize AI API calls with real blockchain payments**

---

## Overview

OMA-AI uses the **x402 protocol** to charge for AI services. Each API call requires a micro-payment in USDC before the service is rendered.

```
┌─────────────────────────────────────────────────────────────┐
│                    x402 PAYMENT FLOW                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Client → POST /api/ai/generate                          │
│                        ↓                                     │
│  2. Server → 402 Payment Required                           │
│             { "payment": { "price": "0.05 USDC" } }         │
│                        ↓                                     │
│  3. Client → Signs payment with wallet                      │
│             { "signature": "...", "amount": "50000000" }    │
│                        ↓                                     │
│  4. Server → Verifies on-chain                              │
│                        ↓                                     │
│  5. Server → Returns AI response                            │
│                        ↓                                     │
│  6. Client → Pays via x402 protocol                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Payment Endpoints

### AI Generation (Groq/GPT-4o/Claude)

```
POST /api/ai/generate
Price: $0.02 - $0.50 per request
```

**Request:**
```json
{
  "model": "llama-3.3-70b-versatile",
  "messages": [{"role": "user", "content": "Analyze this data"}],
  "max_tokens": 1024
}
```

**402 Response:**
```json
{
  "status": 402,
  "error": "Payment Required",
  "payment": {
    "scheme": "x402",
    "network": "base",
    "price": "0.05 USDC",
    "recipient": "0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5",
    "data": {
      "service": "ai-generation",
      "model": "llama-3.3-70b-versatile",
      "estimated_tokens": 1500
    }
  }
}
```

---

### Image Generation

```
POST /api/ai/image
Price: $0.10 - $0.50 per image
```

---

### Web Search

```
POST /api/ai/search
Price: $0.01 per search
```

---

### Embeddings

```
POST /api/ai/embeddings
Price: $0.001 per 1K tokens
```

---

## Price List

| Service | Model | Price | Speed |
|---------|-------|-------|-------|
| **Chat (Fast)** | Llama 3.1 8B (Groq) | $0.01/req | 1000+ tok/s |
| **Chat (Smart)** | Llama 3.3 70B (Groq) | $0.02/req | 276 tok/s |
| **Reasoning** | DeepSeek-R1 (Together) | $0.03/req | Fast |
| **Creative** | Claude 3.7 Sonnet | $0.15/req | Medium |
| **Code** | Claude 4 Opus | $0.50/req | Medium |
| **Image** | DALL-E 3 | $0.10/img | Slow |
| **Search** | Perplexity | $0.01/search | Fast |

---

## Client Implementation

### Python

```python
import httpx
from web3 import Web3

class OMAX402Client:
    def __init__(self, private_key: str):
        self.wallet = Web3().eth.account.from_key(private_key)
        self.base_url = "http://localhost:4020"
    
    async def generate(
        self,
        model: str,
        messages: list,
        max_tokens: int = 1024
    ) -> dict:
        """Generate AI response with automatic x402 payment"""
        
        async with httpx.AsyncClient() as client:
            # Initial request
            response = await client.post(
                f"{self.base_url}/api/ai/generate",
                json={"model": model, "messages": messages, "max_tokens": max_tokens}
            )
            
            # Handle 402 Payment Required
            if response.status_code == 402:
                payment_data = response.json()["payment"]
                
                # Sign and send payment
                return await self._pay_and_retry(response.request.url, payment_data, client)
            
            return response.json()
    
    async def _pay_and_retry(self, url: str, payment: dict, client) -> dict:
        """Send x402 payment and retry request"""
        
        # Sign payment message
        message = f"Pay {payment['price']} to {payment['recipient']}"
        signature = self.wallet.sign_message(message).signature.hex()
        
        # Retry with payment
        headers = {"X-Payment-Signature": signature}
        return await client.post(url, headers=headers)
```

### JavaScript/TypeScript

```typescript
import { Wallet } from 'ethers';

class OMAX402Client {
  private wallet: Wallet;
  private baseUrl = 'http://localhost:4020';

  constructor(privateKey: string) {
    this.wallet = new Wallet(privateKey);
  }

  async generate(model: string, messages: any[], maxTokens = 1024) {
    // Initial request
    const response = await fetch(`${this.baseUrl}/api/ai/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, max_tokens: maxTokens })
    });

    // Handle 402
    if (response.status === 402) {
      const payment = await response.json();
      return this.payAndRetry(response.url, payment, { model, messages, max_tokens: maxTokens });
    }

    return response.json();
  }

  private async payAndRetry(url: string, payment: any, payload: any) {
    const message = `Pay ${payment.price} to ${payment.recipient}`;
    const signature = await this.wallet.signMessage(message);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Payment-Signature': signature
      },
      body: JSON.stringify(payload)
    });

    return response.json();
  }
}
```

---

## Agent Integration

OMA Agents automatically pay for AI services:

```python
class OMAAgent:
    def __init__(self, wallet: Wallet):
        self.wallet = wallet
        self.client = OMAX402Client(wallet.private_key)
    
    async def think(self, task: str) -> str:
        # Router automatically selects best provider
        response = await self.client.generate(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": task}]
        )
        return response["choices"][0]["message"]["content"]
```

---

## Provider Pricing (with Markup)

| Provider | Base Price | OMA Price | Markup |
|----------|------------|-----------|--------|
| Groq Llama 3.1 8B | $0.10/M | $0.01/req | 10x markup |
| Groq Llama 3.3 70B | $0.59/M | $0.02/req | 3x markup |
| Together DeepSeek-R1 | $0.27/M | $0.03/req | 2x markup |
| OpenAI GPT-4o | $12.50/M | $0.15/req | 12x markup |
| Anthropic Claude 3.7 | $18.00/M | $0.15/req | 8x markup |

---

## Revenue Model

**Per Request Pricing (Simplified)**

```
OMA Price = (Base Cost + 20% Margin) / Average Tokens per Request
```

Example: Groq Llama 3.1 8B
- Base: $0.10/M tokens
- Average request: 500 tokens input + 500 tokens output = 1000 tokens
- Base cost per request: $0.0001
- OMA price: $0.01/req (100x markup)
- Profit: $0.0099/req

---

## Free Tier

Each new agent gets **10 free requests** to test the system:

```python
agent.free_requests = 10
agent.free_requests_used = 0

# Usage
if agent.free_requests_used < agent.free_requests:
    # Free request
    agent.free_requests_used += 1
else:
    # Paid request
    await pay_x402(0.01)
```

---

## Error Handling

```python
class X402Error(Exception):
    def __init__(self, payment: dict):
        self.payment = payment

# Usage
try:
    result = await client.generate(...)
except X402Error as e:
    print(f"Payment required: {e.payment['price']}")
```

---

## Testing

```bash
# Test payment flow
curl -X POST http://localhost:4020/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"model": "llama-3.1-8b-instruct", "messages": [{"role": "user", "content": "hi"}]}'

# Returns 402 with payment info
```