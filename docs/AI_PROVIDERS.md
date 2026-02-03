# AI Provider Integration Layer

**Multi-LLM routing with x402 micropayments**

---

## Overview

OMA-AI integrates with multiple AI providers to offer the best price/performance for every use case:

| Provider | Best For | Speed | Price | Models |
|----------|----------|-------|-------|--------|
| **Groq** | Real-time chat | ⚡⚡⚡⚡⚡ | $$ | Llama, Mistral |
| **Together AI** | Open-source models | ⚡⚡⚡ | $ | Llama 4, DeepSeek |
| **OpenAI** | Frontier models | ⚡⚡ | $$$$ | GPT-4o, o1 |
| **Anthropic** | Long context | ⚡⚡ | $$$$ | Claude 3.7 |
| **DeepSeek** | Reasoning | ⚡⚡ | $ | DeepSeek-R1 |

---

## Pricing Comparison

### Groq (Fastest - $0.10-0.60/M tokens)

| Model | Input | Output | Speed |
|-------|-------|--------|-------|
| Llama 3.3 70B | $0.59/M | $0.79/M | 276 tok/s |
| Llama 3.1 70B | $0.59/M | $0.79/M | 251 tok/s |
| Llama 3.1 8B | $0.10/M | $0.10/M | 1000+ tok/s |
| Mixtral 8x7B | $0.24/M | $0.24/M | 400 tok/s |

### Together AI (Best Value - $0.10-0.27/M tokens)

| Model | Input | Output | Notes |
|-------|-------|--------|-------|
| Llama 4 Scout | $0.10/M | $0.10/M | Lite, fast |
| Llama 3.3 70B | $0.27/M | $0.27/M | Turbo |
| DeepSeek-R1 | $0.27/M | $0.27/M | 9x cheaper than o1 |
| Llama 3.1 8B | $0.10/M | $0.10/M | Ultra cheap |

### OpenAI ($0.10-15.00/M tokens)

| Model | Input | Output | Context |
|-------|-------|--------|---------|
| GPT-4o | $2.50/M | $10.00/M | 128K |
| GPT-4o-mini | $0.10/M | $0.40/M | 128K |
| o1 (reasoning) | $15.00/M | $60.00/M | 200K |

### Anthropic ($0.25-15.00/M tokens)

| Model | Input | Output | Context |
|-------|-------|--------|---------|
| Claude 3.7 Sonnet | $3.00/M | $15.00/M | 200K |
| Claude 3.5 Haiku | $0.25/M | $1.25/M | 200K |

---

## API Usage in OMA-AI

### Direct API Calls (No x402)

```python
# Fast real-time with Groq
from oma_ai.providers import groq

response = await groq.complete(
    model="llama-3.3-70b-versatile",
    messages=[{"role": "user", "content": "Analyze this data"}],
    max_tokens=1024
)
```

### x402 Monetized Access

```python
# Pay per use via x402
from oma_ai.x402 import pay_and_call

result = await pay_and_call(
    endpoint="http://localhost:4020/api/ai/generate",
    payload={"model": "gpt-4o", "prompt": "Write code"},
    wallet=FRANKIE_WALLET
)
```

---

## Agent Integration

### Agents Can Use Any Provider

```python
class OMAAgent:
    async def think(self, task: str) -> str:
        # Choose best provider based on task
        if "quick" in task or "chat" in task:
            # Use Groq for speed
            return await groq.complete(
                model="llama-3.1-8b-instruct",
                messages=[{"role": "user", "content": task}]
            )
        elif "reason" in task or "think" in task:
            # Use DeepSeek for reasoning
            return await together.complete(
                model="deepseek-r1",
                messages=[{"role": "user", "content": task}]
            )
        elif "creative" in task or "write" in task:
            # Use Claude for creativity
            return await anthropic.complete(
                model="claude-3-7-sonnet",
                messages=[{"role": "user", "content": task}]
            )
```

---

## Cost Optimization

### Smart Routing

```python
from oma_ai.router import SmartRouter

router = SmartRouter()

async def route_request(task: str, budget: float) -> str:
    """Route to cheapest provider within budget."""
    providers = await router.get_providers(
        task_type=classify_task(task),
        max_price=budget
    )
    
    # Use best provider
    return await providers[0].complete(task)
```

### Batch Processing

```python
# Batch requests for 50% discount on Groq
await groq.batch_complete(
    requests=[
        {"model": "llama-3.1-70b", "messages": [...]},
        {"model": "llama-3.1-70b", "messages": [...]},
        # ...
    ],
    priority="normal"  # 24h-7d window
)
```

---

## Provider Setup

### Groq API

```bash
export GROQ_API_KEY="gsk_..."
```

### Together AI

```bash
export TOGETHER_API_KEY="..."
```

### OpenAI

```bash
export OPENAI_API_KEY="sk-..."
```

### Anthropic

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

---

## Integration Code

See `backend/providers/` for complete implementations:

- `groq.py` - Groq API integration
- `together.py` - Together AI integration  
- `openai.py` - OpenAI API integration
- `anthropic.py` - Anthropic API integration
- `router.py` - Smart routing logic
- `pricing.py` - Cost calculations