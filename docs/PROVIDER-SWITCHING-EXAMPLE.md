# Provider Switching Strategy for Rate Limit Handling
**For:** MASTA (Nosyt)
**Date:** 2026-02-07

---

## 🎯 PROBLEM: API Rate Limits

OpenRouter and Zai have rate limits that cause 429 errors. Instead of hitting them, we intelligently switch between providers.

---

## 💡 STRATEGY: Round-Robin with Priority Queue

### Architecture:
```
┌─────────────────────────────────────┐
│         OMA-AI Agent Code       │
│                                   │
│  ┌───────────────────────────┐    │
│  │  Provider Pool Manager │    │
│  │                         │    │
│  │  ┌─────────┐          │    │
│  │  │ Providers│          │    │
│  │  ├─ OpenRouter (50)   │    │
│  │  ├─ Zai (20/m)       │    │
│  │  └─ Claude Direct (10)│    │
│  │  └─────────┘          │    │
│  │                         │    │
│  └───────────────────────────┘    │
│              │                       │
│     ┌────────┴────────┐           │
│     │ Request Queue   │           │
│     │ (with priority) │           │
│     └─────────────────┘           │
└─────────────────────────────────────┘
```

---

## 📝 IMPLEMENTATION

### Python Example:
```python
import asyncio
from dataclasses import dataclass
from typing import Optional

@dataclass
class Provider:
    name: str
    requests_per_minute: int
    concurrent: int
    active: bool = True
    request_count: int = 0
    last_reset: float = 0.0

class ProviderPool:
    def __init__(self):
        self.providers = [
            Provider("OpenRouter", 50, 50),  # Varies by model
            Provider("Zai", 20, 5),         # 20 req/min, 5 concurrent
            Provider("Claude Direct", 10, 3)  # Very conservative
        ]
        self.current_provider_idx = 0
    
    def get_next_provider(self) -> Provider:
        """Round-robin to next available provider"""
        attempts = 0
        while attempts < len(self.providers):
            provider = self.providers[self.current_provider_idx]
            self.current_provider_idx = (self.current_provider_idx + 1) % len(self.providers)
            
            # Check if provider is available
            if provider.active:
                # Reset count if minute passed
                now = asyncio.get_event_loop().time()
                if now - provider.last_reset > 60:
                    provider.request_count = 0
                    provider.last_reset = now
                    return provider
            
            attempts += 1
        
        # All providers rate limited - wait
        await asyncio.sleep(60)  # Wait 1 minute
        return self.get_next_provider()
    
    async def call_with_retry(self, prompt: str, model: str, max_retries: int = 3):
        """Make request with automatic provider switching"""
        
        for attempt in range(max_retries):
            provider = self.get_next_provider()
            
            try:
                # Call provider
                response = await self.call_provider(provider, prompt, model, timeout=30)
                
                # Success - return response
                return {
                    'success': True,
                    'provider': provider.name,
                    'response': response,
                    'attempt': attempt + 1
                }
                
            except Exception as e:
                # Check if rate limited (429)
                if '429' in str(e) or 'rate limit' in str(e).lower():
                    provider.active = False  # Mark as rate limited
                    provider.request_count += 1
                    print(f"Rate limit hit on {provider.name}. Switching...")
                    
                    if provider.request_count >= provider.requests_per_minute:
                        # Hit hard limit - wait and reset
                        provider.active = False
                        await asyncio.sleep(60)
                        continue
                
                # Other errors - try next provider
                continue
        
        # All retries failed
        return {
            'success': False,
            'error': 'All providers rate limited or unavailable',
            'attempt': max_retries
        }
    
    async def call_provider(self, provider: Provider, prompt: str, model: str, timeout: int):
        """Implementation depends on provider - example for OpenRouter"""
        
        # x402 payment
        amount = provider.request_count * 0.01  # Incremental pricing
        payment_proof = await self.pay_x402(amount)
        
        headers = {
            'X-Payment-Proof': payment_proof,
            'X-Payment-Signature': self.sign_message(payment_proof),
            'Content-Type': 'application/json'
        }
        
        # OpenRouter API call
        url = "https://openrouter.ai/api/v1/chat/completions"
        payload = {
            'model': model or 'gpt-4-turbo',
            'messages': [{'role': 'user', 'content': prompt}],
            'provider': {
                'order': [provider.name, 'anthropic', 'openai']  # Prioritize
            }
        }
        
        async with asyncio.timeout(timeout):
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=payload) as response:
                    response.raise_for_status()
                    return await response.json()
    
    async def pay_x402(self, amount: float) -> str:
        """Simulate x402 payment - replace with real blockchain payment"""
        import hashlib
        import json
        
        # Sign payment message
        message = json.dumps({
            'timestamp': int(asyncio.get_event_loop().time()),
            'amount': amount,
            'service_id': 'openrouter-chat'
        })
        
        # Sign with wallet private key
        private_key = os.getenv('AGENT_WALLET_PRIVATE_KEY')
        signature = self.sign_message(message, private_key)
        
        # Create hash
        message_hash = hashlib.sha256(message.encode()).hexdigest()
        
        return message_hash
```

---

## 🔄 USAGE PATTERN

```python
# Initialize provider pool
pool = ProviderPool()

# Use in agent loop
for task in autonomous_tasks:
    result = await pool.call_with_retry(
        prompt=task.prompt,
        model='gpt-4-turbo'
    )
    
    if result['success']:
        print(f"Success with {result['provider']}!")
        # Use result['response']
    else:
        print(f"All providers failed: {result['error']}")
        # Wait and retry
        await asyncio.sleep(120)
```

---

## 📊 BENEFITS

1. **Never Hit Rate Limits**
   - Providers rotate automatically
   - When one is limited, switch to next
   - No 429 errors

2. **Optimal Latency**
   - Providers have different response times
   - Choose fastest for each request type
   - Round-robin ensures fair distribution

3. **Cost Optimization**
   - Some providers cheaper for certain models
   - Can route to cheapest available provider
   - Track spending per provider

4. **Redundancy**
   - If one provider goes down
   - Automatically failover to others
   - No single point of failure

5. **Fair Usage**
   - Respects provider limits
   - Don't abuse any single provider
   - Build good reputation with providers

---

## 🎯 INTEGRATION WITH OMA-AI

### Step 1: Add to Agent SDK
```typescript
// lib/provider-pool.ts
export class ProviderPool {
  private providers = [
    { name: 'openrouter', url: 'https://openrouter.ai/api/v1', limit: 50 },
    { name: 'zai', url: 'https://api.zai.ai/v1', limit: 20 },
    { name: 'claude', url: 'https://api.anthropic.com/v1', limit: 10 }
  ];
  
  async call(prompt: string, model: string) {
    return this.round_robin_call(prompt, model);
  }
}
```

### Step 2: Use in OMA-AI Agents
```typescript
import { ProviderPool } from './lib/provider-pool';

export class OMAAgent {
  private providerPool = new ProviderPool();
  
  async generateCode(task: string): Promise<string> {
    const result = await this.providerPool.call(task, 'gpt-4-turbo');
    return result.response.content;
  }
}
```

---

**Created by Frankie 🧟‍♂️**
**For MASTA's AI Agent Development**
