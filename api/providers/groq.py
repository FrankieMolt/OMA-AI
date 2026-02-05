# Groq Provider - Fastest LLM Inference

import os
import httpx
from typing import List, Dict, Any, Optional
from .base import BaseProvider, ModelInfo

class GroqProvider(BaseProvider):
    """Groq API for ultra-fast inference (276 tokens/sec for Llama 3.3 70B)"""
    
    BASE_URL = "https://api.groq.com/openai/v1"
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("GROQ_API_KEY")
        self.client = httpx.AsyncClient(timeout=60.0)
    
    @property
    def name(self) -> str:
        return "groq"
    
    @property
    def models(self) -> List[ModelInfo]:
        return [
            ModelInfo(
                id="llama-3.3-70b-versatile",
                name="Llama 3.3 70B",
                provider="groq",
                pricing={"input": 0.59, "output": 0.79},  # per 1M tokens
                speed="fastest",
                context=128000,
                description="Fastest 70B model, great for chat"
            ),
            ModelInfo(
                id="llama-3.1-70b-versatile",
                name="Llama 3.1 70B", 
                provider="groq",
                pricing={"input": 0.59, "output": 0.79},
                speed="very fast",
                context=128000,
                description="Meta's flagship open model"
            ),
            ModelInfo(
                id="llama-3.1-8b-instruct",
                name="Llama 3.1 8B",
                provider="groq",
                pricing={"input": 0.10, "output": 0.10},
                speed="fastest",
                context=128000,
                description="Ultra cheap, incredibly fast"
            ),
            ModelInfo(
                id="mixtral-8x7b-32768",
                name="Mixtral 8x7B",
                provider="groq",
                pricing={"input": 0.24, "output": 0.24},
                speed="very fast",
                context=32768,
                description="Sparse mixture of experts"
            ),
            ModelInfo(
                id="gemma2-9b-it",
                name="Gemma 2 9B",
                provider="groq",
                pricing={"input": 0.20, "output": 0.20},
                speed="fast",
                context=8192,
                description="Google's efficient model"
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
        """Generate completion via Groq"""
        
        response = await self.client.post(
            f"{self.BASE_URL}/chat/completions",
            headers={"Authorization": f"Bearer {self.api_key}"},
            json={
                "model": model,
                "messages": messages,
                "max_tokens": max_tokens,
                "temperature": temperature,
                "stream": False
            }
        )
        response.raise_for_status()
        return response.json()
    
    async def complete_streaming(
        self,
        model: str,
        messages: List[Dict[str, str]],
        max_tokens: int = 1024,
        **kwargs
    ):
        """Stream completion for real-time output"""
        
        async with self.client.stream(
            "POST",
            f"{self.BASE_URL}/chat/completions",
            headers={"Authorization": f"Bearer {self.api_key}"},
            json={
                "model": model,
                "messages": messages,
                "max_tokens": max_tokens,
                "temperature": 0.7,
                "stream": True
            }
        ) as response:
            async for chunk in response.aiter_lines():
                if chunk.startswith("data: "):
                    data = chunk[6:]
                    if data != "[DONE]":
                        yield json.loads(data)
    
    async def batch_complete(
        self,
        requests: List[Dict[str, Any]],
        priority: str = "normal"
    ) -> List[Dict[str, Any]]:
        """Batch processing for 50% discount (24h-7d window)"""
        
        # Note: Groq batch API would go here
        # For now, process sequentially
        results = []
        for req in requests:
            results.append(await self.complete(**req))
        return results
    
    def calculate_cost(self, model: str, input_tokens: int, output_tokens: int) -> float:
        """Calculate cost for a request"""
        for m in self.models:
            if m.id == model:
                return (input_tokens / 1_000_000 * m.pricing["input"] + 
                        output_tokens / 1_000_000 * m.pricing["output"])
        return 0.0