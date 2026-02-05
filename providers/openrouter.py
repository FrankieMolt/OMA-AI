# OpenRouter Provider Integration

import os
import aiohttp
import logging
from typing import List, Dict, Any, Optional
from .base import BaseProvider, ModelInfo

logger = logging.getLogger("openrouter-provider")

class OpenRouterProvider(BaseProvider):
    """OpenRouter provider implementation"""
    
    @property
    def name(self) -> str:
        return "openrouter"
    
    @property
    def models(self) -> List[ModelInfo]:
        return [
            ModelInfo(
                id="google/gemini-2.0-flash-001",
                name="Gemini 2.0 Flash",
                provider="google",
                pricing={"input": 0.1, "output": 0.4},
                speed="fastest",
                context=1000000,
                description="Fast and capable model from Google"
            ),
            ModelInfo(
                id="anthropic/claude-3.7-sonnet",
                name="Claude 3.7 Sonnet",
                provider="anthropic",
                pricing={"input": 3.0, "output": 15.0},
                speed="fast",
                context=200000,
                description="Anthropic's latest high-intelligence model"
            ),
            ModelInfo(
                id="deepseek/deepseek-r1",
                name="DeepSeek R1",
                provider="deepseek",
                pricing={"input": 0.55, "output": 2.19},
                speed="medium",
                context=64000,
                description="Reasoning model from DeepSeek"
            ),
            ModelInfo(
                id="meta-llama/llama-3.3-70b-instruct",
                name="Llama 3.3 70B",
                provider="meta",
                pricing={"input": 0.12, "output": 0.3},
                speed="fast",
                context=128000,
                description="Meta's latest 70B model"
            )
        ]
    
    async def complete(
        self,
        model: str,
        messages: List[Dict[str, str]],
        max_tokens: int = 1024,
        temperature: float = 0.7,
        **kwargs
    ) -> Dict[str, Any]:
        api_key = os.getenv("OPENROUTER_API_KEY")
        if not api_key:
            return {"error": "OPENROUTER_API_KEY not configured"}
            
        headers = {
            "Authorization": f"Bearer {api_key}",
            "HTTP-Referer": os.getenv("SITE_URL", "https://oma-ai.com"),
            "X-Title": "OMA-AI Platform",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": model,
            "messages": messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
            **kwargs
        }
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    json=payload,
                    headers=headers
                ) as resp:
                    if resp.status != 200:
                        error_text = await resp.text()
                        logger.error(f"OpenRouter API Error: {error_text}")
                        return {"error": f"API Error: {resp.status}"}
                    
                    data = await resp.json()
                    return data
        except Exception as e:
            logger.error(f"OpenRouter Provider Exception: {e}")
            return {"error": str(e)}
            
    def calculate_cost(
        self,
        model: str,
        input_tokens: int,
        output_tokens: int
    ) -> float:
        model_info = self.get_model(model)
        if not model_info:
            return 0.0
        
        input_cost = (input_tokens / 1_000_000) * model_info.pricing["input"]
        output_cost = (output_tokens / 1_000_000) * model_info.pricing["output"]
        return input_cost + output_cost
