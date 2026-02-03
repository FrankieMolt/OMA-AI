# OpenAI Provider - GPT-4o and o1 Models

import os
import httpx
import json
from typing import List, Dict, Any, Optional
from ..base import BaseProvider, ModelInfo

class OpenAIProvider(BaseProvider):
    """OpenAI API for GPT-4o, o1, and GPT-4o-mini"""
    
    BASE_URL = "https://api.openai.com/v1"
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.client = httpx.AsyncClient(timeout=120.0)
    
    @property
    def name(self) -> str:
        return "openai"
    
    @property
    def models(self) -> List[ModelInfo]:
        return [
            ModelInfo(
                id="gpt-4o",
                name="GPT-4o",
                provider="openai",
                pricing={"input": 2.50, "output": 10.00},
                speed="medium",
                context=128000,
                description="Flagship multimodal model"
            ),
            ModelInfo(
                id="gpt-4o-mini",
                name="GPT-4o-mini",
                provider="openai",
                pricing={"input": 0.10, "output": 0.40},
                speed="fast",
                context=128000,
                description="Cheap, fast, capable"
            ),
            ModelInfo(
                id="o1",
                name="o1 (Reasoning)",
                provider="openai",
                pricing={"input": 15.00, "output": 60.00},
                speed="slow",
                context=200000,
                description="Advanced reasoning, longer thinking time"
            ),
            ModelInfo(
                id="o1-mini",
                name="o1-mini",
                provider="openai",
                pricing={"input": 3.00, "output": 12.00},
                speed="medium",
                context=128000,
                description="Faster reasoning, code-focused"
            ),
            ModelInfo(
                id="gpt-4-turbo",
                name="GPT-4 Turbo",
                provider="openai",
                pricing={"input": 10.00, "output": 30.00},
                speed="medium",
                context=128000,
                description="Previous flagship"
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
        """Generate completion via OpenAI"""
        
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
        """Stream completion"""
        
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
    
    async def embeddings(
        self,
        model: str = "text-embedding-3-small",
        texts: List[str]
    ) -> List[List[float]]:
        """Get embeddings"""
        
        response = await self.client.post(
            f"{self.BASE_URL}/embeddings",
            headers={"Authorization": f"Bearer {self.api_key}"},
            json={
                "model": model,
                "input": texts
            }
        )
        response.raise_for_status()
        return [d["embedding"] for d in response.json()["data"]]
    
    async def images(
        self,
        prompt: str,
        model: str = "dall-e-3",
        size: str = "1024x1024",
        n: int = 1
    ) -> List[str]:
        """Generate images"""
        
        response = await self.client.post(
            f"{self.BASE_URL}/images/generations",
            headers={"Authorization": f"Bearer {self.api_key}"},
            json={
                "model": model,
                "prompt": prompt,
                "size": size,
                "n": n
            }
        )
        response.raise_for_status()
        return [d["url"] for d in response.json()["data"]]
    
    def calculate_cost(self, model: str, input_tokens: int, output_tokens: int) -> float:
        """Calculate cost for a request"""
        for m in self.models:
            if m.id == model:
                return (input_tokens / 1_000_000 * m.pricing["input"] + 
                        output_tokens / 1_000_000 * m.pricing["output"])
        return 0.0