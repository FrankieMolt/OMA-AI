# Together AI Provider - Best Open-Source Models

import os
import httpx
import json
from typing import List, Dict, Any, Optional
from ..base import BaseProvider, ModelInfo

class TogetherProvider(BaseProvider):
    """Together AI - Open-source models at 11x lower cost than GPT-4o"""
    
    BASE_URL = "https://api.together.xyz/v1"
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("TOGETHER_API_KEY")
        self.client = httpx.AsyncClient(timeout=120.0)
    
    @property
    def name(self) -> str:
        return "together"
    
    @property
    def models(self) -> List[ModelInfo]:
        return [
            ModelInfo(
                id="meta-llama/Llama-4-Scout-17B-16E-Instruct-Turbo",
                name="Llama 4 Scout",
                provider="together",
                pricing={"input": 0.10, "output": 0.10},
                speed="fast",
                context=1000000,
                description="Maverick mixture-of-experts at 17B activation cost"
            ),
            ModelInfo(
                id="meta-llama/Llama-3.3-70B-Instruct-Turbo",
                name="Llama 3.3 70B Turbo",
                provider="together",
                pricing={"input": 0.27, "output": 0.27},
                speed="very fast",
                context=128000,
                description="11x cheaper than GPT-4o"
            ),
            ModelInfo(
                id="deepseek-ai/DeepSeek-R1",
                name="DeepSeek R1",
                provider="together",
                pricing={"input": 0.27, "output": 0.27},
                speed="fast",
                context=163840,
                description="Open-source reasoning model, 9x cheaper than o1"
            ),
            ModelInfo(
                id="meta-llama/Llama-3.1-8B-Instruct-Turbo",
                name="Llama 3.1 8B Turbo",
                provider="together",
                pricing={"input": 0.10, "output": 0.10},
                speed="fast",
                context=128000,
                description="Ultra cheap, great for simple tasks"
            ),
            ModelInfo(
                id="meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
                name="Llama 3.1 405B",
                provider="together",
                pricing={"input": 5.00, "output": 5.00},
                speed="medium",
                context=128000,
                description="Massive open model, frontier performance"
            ),
            ModelInfo(
                id="Qwen/Qwen2.5-72B-Instruct",
                name="Qwen 2.5 72B",
                provider="together",
                pricing={"input": 0.40, "output": 0.40},
                speed="fast",
                context=32768,
                description="Alibaba's strong open model"
            ),
            ModelInfo(
                id="mistralai/Mistral-7B-Instruct-v0.3",
                name="Mistral 7B v0.3",
                provider="together",
                pricing={"input": 0.10, "output": 0.10},
                speed="fast",
                context=32768,
                description="Small but capable"
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
        """Generate completion via Together AI"""
        
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
        model: str,
        texts: List[str]
    ) -> List[List[float]]:
        """Get embeddings for texts"""
        
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
    
    def calculate_cost(self, model: str, input_tokens: int, output_tokens: int) -> float:
        """Calculate cost for a request"""
        for m in self.models:
            if m.id == model:
                return (input_tokens / 1_000_000 * m.pricing["input"] + 
                        output_tokens / 1_000_000 * m.pricing["output"])
        return 0.0