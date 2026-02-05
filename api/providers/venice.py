\"\"\"
Venice AI Provider Integration
Privacy-focused, decentralized AI inference.
\"\"\"

import os
import aiohttp
import logging

logger = logging.getLogger("venice-ai")

class VeniceProvider:
    def __init__(self):
        self.api_key = os.getenv("VENICE_API_KEY")
        self.base_url = "https://api.venice.ai/api/v1"
        self.model = "llama-3.3-70b"  # Default high-performance model

    async def generate(self, prompt: str, system_prompt: str = None, **kwargs) -> str:
        if not self.api_key:
            return "Error: VENICE_API_KEY not configured"

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": kwargs.get("temperature", 0.7),
            "max_tokens": kwargs.get("max_tokens", 1000),
            "venice_parameters": {
                "include_venice_system_prompt": False  # Disable default prompt for privacy
            }
        }

        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(f"{self.base_url}/chat/completions", json=payload, headers=headers) as resp:
                    if resp.status != 200:
                        error_text = await resp.text()
                        logger.error(f"Venice API Error: {error_text}")
                        return f"Error: Venice API returned {resp.status}"
                    
                    data = await resp.json()
                    return data["choices"][0]["message"]["content"]
        except Exception as e:
            logger.error(f"Venice Provider Exception: {e}")
            return f"Error: {str(e)}"

    async def list_models(self):
        # Venice supports: llama-3.3-70b, dolph-2.9.2-qwen2-72b, etc.
        return [
            "llama-3.3-70b",
            "dolph-2.9.2-qwen2-72b",
            "qwen-2.5-32b",
            "qwen-2.5-coder-32b"
        ]
