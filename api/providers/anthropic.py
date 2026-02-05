# Anthropic Provider - Claude 3.7 Sonnet

import os
import httpx
import json
from typing import List, Dict, Any, Optional
from .base import BaseProvider, ModelInfo

class AnthropicProvider(BaseProvider):
    """Anthropic API for Claude 3.7, 3.5"""
    
    BASE_URL = "https://api.anthropic.com/v1"
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("ANTHROPIC_API_KEY")
        self.client = httpx.AsyncClient(timeout=120.0)
    
    @property
    def name(self) -> str:
        return "anthropic"
    
    @property
    def models(self) -> List[ModelInfo]:
        return [
            ModelInfo(
                id="claude-3-7-sonnet-20250511",
                name="Claude 3.7 Sonnet",
                provider="anthropic",
                pricing={"input": 3.00, "output": 15.00},
                speed="medium",
                context=200000,
                description="Best for complex reasoning and creativity"
            ),
            ModelInfo(
                id="claude-3-5-sonnet-20241022",
                name="Claude 3.5 Sonnet",
                provider="anthropic",
                pricing={"input": 3.00, "output": 15.00},
                speed="fast",
                context=200000,
                description="Balanced performance and speed"
            ),
            ModelInfo(
                id="claude-3-5-haiku-20241022",
                name="Claude 3.5 Haiku",
                provider="anthropic",
                pricing={"input": 0.25, "output": 1.25},
                speed="very fast",
                context=200000,
                description="Fast, cheap, responsive"
            ),
            ModelInfo(
                id="claude-opus-4-20250511",
                name="Claude 4 Opus",
                provider="anthropic",
                pricing={"input": 15.00, "output": 75.00},
                speed="medium",
                context=200000,
                description="Maximum capability for complex tasks"
            ),
        ]
    
    async def complete(
        self,
        model: str,
        messages: List[Dict[str, str]],
        max_tokens: int = 1024,
        temperature: float = 0.7,
        **kwargs
    ) -> Dict[str, Any]:
        """Generate completion via Anthropic"""
        
        # Convert OpenAI format to Anthropic format
        system_message = None
        anthropic_messages = []
        
        for msg in messages:
            if msg["role"] == "system":
                system_message = msg["content"]
            else:
                anthropic_messages.append({
                    "role": msg["role"],
                    "content": msg["content"]
                })
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "x-api-key": self.api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        }
        
        body = {
            "model": model,
            "messages": anthropic_messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
            "stream": False
        }
        
        if system_message:
            body["system"] = system_message
        
        response = await self.client.post(
            f"{self.BASE_URL}/messages",
            headers=headers,
            json=body
        )
        response.raise_for_status()
        
        # Convert to OpenAI format for consistency
        data = response.json()
        return {
            "id": data.get("id", "claude-msg"),
            "object": "chat.completion",
            "created": data.get("created", 0),
            "model": model,
            "choices": [{
                "index": 0,
                "message": {
                    "role": "assistant",
                    "content": data["content"][0]["text"]
                },
                "finish_reason": "stop"
            }],
            "usage": {
                "prompt_tokens": data["usage"]["input_tokens"],
                "completion_tokens": data["usage"]["output_tokens"],
                "total_tokens": data["usage"]["input_tokens"] + data["usage"]["output_tokens"]
            }
        }
    
    async def complete_streaming(
        self,
        model: str,
        messages: List[Dict[str, str]],
        max_tokens: int = 1024,
        **kwargs
    ):
        """Stream completion"""
        
        # Convert messages
        system_message = None
        anthropic_messages = []
        
        for msg in messages:
            if msg["role"] == "system":
                system_message = msg["content"]
            else:
                anthropic_messages.append({
                    "role": msg["role"],
                    "content": msg["content"]
                })
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "x-api-key": self.api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        }
        
        body = {
            "model": model,
            "messages": anthropic_messages,
            "max_tokens": max_tokens,
            "temperature": 0.7,
            "stream": True
        }
        
        if system_message:
            body["system"] = system_message
        
        async with self.client.stream(
            "POST",
            f"{self.BASE_URL}/messages",
            headers=headers,
            json=body
        ) as response:
            async for chunk in response.aiter_lines():
                if chunk.startswith("data: "):
                    data = json.loads(chunk[6:])
                    if data["type"] == "content_block_delta":
                        yield {"choices": [{"delta": {"content": data["delta"]["text"]}}]}
    
    def calculate_cost(self, model: str, input_tokens: int, output_tokens: int) -> float:
        """Calculate cost for a request"""
        for m in self.models:
            if m.id == model:
                return (input_tokens / 1_000_000 * m.pricing["input"] + 
                        output_tokens / 1_000_000 * m.pricing["output"])
        return 0.0