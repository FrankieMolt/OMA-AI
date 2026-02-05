# Venice AI Provider Integration

import os
import aiohttp
import logging
from typing import List, Dict, Any, Optional
from .base import BaseProvider, ModelInfo

logger = logging.getLogger("venice-provider")

class VeniceProvider(BaseProvider):
    """Venice AI provider implementation (Sovereign AI)"""
    
    @property
    def name(self) -> str:
        return "venice"
    
    @property
    def models(self) -> List[ModelInfo]:
        return [
            ModelInfo(
                id="llama-3.3-70b",
                name="Llama 3.3 70B",
                provider="venice",
                pricing={"input": 0.2, "output": 0.2},
                speed="fast",
                context=128000,
                description="High-performance sovereign model"
            ),
            ModelInfo(
                id="dolph-2.9.2-qwen2-72b",
                name="Dolphin Qwen 2 72B",
                provider="venice",
                pricing={"input": 0.15, "output": 0.15},
                speed="medium",
                context=32000,
                description="Uncensored sovereign model"
            ),
            ModelInfo(
                id="qwen-2.5-coder-32b",
                name="Qwen 2.5 Coder 32B",
                provider="venice",
                pricing={"input": 0.1, "output": 0.1},
                speed="fast",
                context=32000,
                description="Specialized coding model"
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
        api_key = os.getenv("VENICE_API_KEY")
        if not api_key:
            return {"error": "VENICE_API_KEY not configured"}
            
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": model,
            "messages": messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
            "venice_parameters": {
                "include_venice_system_prompt": False
            },
            **kwargs
        }
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    "https://api.venice.ai/api/v1/chat/completions",
                    json=payload,
                    headers=headers
                ) as resp:
                    if resp.status != 200:
                        error_text = await resp.text()
                        logger.error(f"Venice API Error: {error_text}")
                        return {"error": f"API Error: {resp.status}"}
                    
                    data = await resp.json()
                    return data
        except Exception as e:
            logger.error(f"Venice Provider Exception: {e}")
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
