# LLM Gateway API Skill

> Multi-provider LLM access through a unified API

---

## Overview

The LLM Gateway provides unified access to multiple language model providers including OpenAI, Anthropic, and open-source models. One API for all your LLM needs.

## Endpoint

```
POST https://oma-ai.com/api/llm
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| prompt | string | Yes | The input prompt |
| model | string | No | Model to use (default: "auto") |
| max_tokens | number | No | Maximum tokens (default: 1000) |
| temperature | number | No | Sampling temperature (default: 0.7) |

## Available Models

| Model | Provider | Best For |
|-------|----------|----------|
| gpt-4o | OpenAI | General purpose |
| claude-3-opus | Anthropic | Complex reasoning |
| claude-3-sonnet | Anthropic | Fast responses |
| llama-3-70b | Meta | Open source |
| gemini-pro | Google | Multimodal |

## Response

```json
{
  "success": true,
  "response": "Generated text...",
  "model": "claude-3-sonnet",
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 150,
    "total_tokens": 175
  }
}
```

## Pricing

| Model | Price/1K tokens |
|-------|-----------------|
| gpt-4o | $0.01 |
| claude-3-opus | $0.015 |
| claude-3-sonnet | $0.003 |
| llama-3-70b | $0.001 |
| gemini-pro | $0.002 |

## Example Usage

```bash
# Basic completion
curl -X POST https://oma-ai.com/api/llm \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer oma_your_key" \
  -d '{
    "prompt": "Explain quantum computing in one paragraph",
    "model": "claude-3-sonnet"
  }'

# With temperature control
curl -X POST https://oma-ai.com/api/llm \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer oma_your_key" \
  -d '{
    "prompt": "Write a creative story about robots",
    "model": "gpt-4o",
    "temperature": 0.9,
    "max_tokens": 500
  }'
```

## Auto Model Selection

When `model: "auto"`, the gateway selects the best model based on:
- Prompt complexity
- Token count
- Current provider availability
- Cost optimization

---

_Last updated: 2026-02-27_
