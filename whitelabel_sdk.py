"""
OMA-AI Whitelabel Provider SDK
Standardized wrapper for OpenRouter, Anthropic, and AI service APIs
"""

import asyncio
import json
import logging
from datetime import datetime
from typing import Dict, Optional, Any, List, Union
from dataclasses import dataclass, asdict
import httpx
from abc import ABC, abstractmethod

# ============================================================================
# CONFIGURATION & CONSTANTS
# ============================================================================

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================================================
# DATA MODELS
# ============================================================================

@dataclass
class APIResponse:
    success: bool
    data: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    cost: Optional[float] = None
    provider: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

@dataclass
class ProviderMetrics:
    requests_count: int
    total_cost: float
    total_revenue: float
    last_request: Optional[datetime] = None

# ============================================================================
# ABSTRACT PROVIDER INTERFACE
# ============================================================================

class WhitelabelProvider(ABC):
    """Abstract base for all whitelabel providers"""
    
    def __init__(self, api_key: str, markup_multiplier: float = 3.0):
        self.api_key = api_key
        self.markup_multiplier = markup_multiplier
        self.metrics = ProviderMetrics(requests_count=0, total_cost=0.0, total_revenue=0.0)
    
    @abstractmethod
    async def execute_request(self, prompt: str, **kwargs) -> APIResponse:
        """Execute request to provider"""
        pass
    
    @abstractmethod
    def get_base_cost(self) -> float:
        """Get base cost per request"""
        pass
    
    def calculate_price(self, base_cost: float) -> float:
        """Calculate price with markup"""
        return base_cost * self.markup_multiplier
    
    def update_metrics(self, cost: float) -> None:
        """Update provider metrics"""
        self.metrics.requests_count += 1
        self.metrics.total_cost += cost
        self.metrics.total_revenue += (cost - base_cost)
        self.metrics.last_request = datetime.now()

# ============================================================================
# PROVIDER IMPLEMENTATIONS
# ============================================================================

class OpenRouterProvider(WhitelabelProvider):
    """OpenRouter API wrapper"""
    
    def __init__(self, api_key: str, markup_multiplier: float = 3.0):
        super().__init__(api_key, markup_multiplier)
        self.base_url = "https://openrouter.ai/api/v1"
        self.base_cost = 0.001  # $0.001 per request
    
    def get_base_cost(self) -> float:
        return self.base_cost
    
    async def execute_request(self, prompt: str, model: str = "anthropic/claude-3-opus", **kwargs) -> APIResponse:
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://oma-ai.com"
            }
            
            request_data = {
                "model": model,
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": kwargs.get("max_tokens", 1000),
                "temperature": kwargs.get("temperature", 0.7),
                **{k: v for k, v in kwargs.items() if k not in ["max_tokens", "temperature"]}
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    json=request_data,
                    headers=headers,
                    timeout=60.0
                )
                response.raise_for_status()
                
                result = response.json()
                cost = self.calculate_price(self.base_cost)
                self.update_metrics(self.base_cost)
                
                return APIResponse(
                    success=True,
                    data=result,
                    cost=cost,
                    provider="openrouter",
                    metadata={
                        "model": model,
                        "tokens_used": result.get("usage", {}).get("total_tokens", 0),
                        "prompt": prompt[:100] + "..." if len(prompt) > 100 else prompt
                    }
                )
                
        except Exception as e:
            logger.error(f"OpenRouter request failed: {e}")
            return APIResponse(
                success=False,
                error=str(e),
                provider="openrouter"
            )

class AnthropicProvider(WhitelabelProvider):
    """Anthropic Claude API wrapper"""
    
    def __init__(self, api_key: str, markup_multiplier: float = 2.5):
        super().__init__(api_key, markup_multiplier)
        self.base_url = "https://api.anthropic.com/v1"
        self.base_cost = 0.015  # $0.015 per 1K tokens
    
    def get_base_cost(self) -> float:
        return self.base_cost
    
    async def execute_request(self, prompt: str, model: str = "claude-3-opus-20240229", **kwargs) -> APIResponse:
        try:
            headers = {
                "x-api-key": self.api_key,
                "Content-Type": "application/json",
                "anthropic-version": "2023-06-01"
            }
            
            request_data = {
                "model": model,
                "max_tokens": kwargs.get("max_tokens", 1000),
                "messages": [{"role": "user", "content": prompt}],
                "temperature": kwargs.get("temperature", 0.7)
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/messages",
                    json=request_data,
                    headers=headers,
                    timeout=60.0
                )
                response.raise_for_status()
                
                result = response.json()
                usage = result.get("usage", {})
                tokens_used = usage.get("input_tokens", 0) + usage.get("output_tokens", 0)
                actual_cost = (tokens_used / 1000) * self.base_cost
                cost = self.calculate_price(actual_cost)
                self.update_metrics(actual_cost)
                
                return APIResponse(
                    success=True,
                    data=result,
                    cost=cost,
                    provider="anthropic_claude",
                    metadata={
                        "model": model,
                        "tokens_used": tokens_used,
                        "prompt": prompt[:100] + "..." if len(prompt) > 100 else prompt
                    }
                )
                
        except Exception as e:
            logger.error(f"Anthropic request failed: {e}")
            return APIResponse(
                success=False,
                error=str(e),
                provider="anthropic_claude"
            )

class DeepSeekProvider(WhitelabelProvider):
    """DeepSeek API wrapper"""
    
    def __init__(self, api_key: str, markup_multiplier: float = 3.5):
        super().__init__(api_key, markup_multiplier)
        self.base_url = "https://api.deepseek.com"
        self.base_cost = 0.0008  # $0.0008 per 1K tokens
    
    def get_base_cost(self) -> float:
        return self.base_cost
    
    async def execute_request(self, prompt: str, model: str = "deepseek-r1", **kwargs) -> APIResponse:
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            request_data = {
                "model": model,
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": kwargs.get("max_tokens", 2000),
                "temperature": kwargs.get("temperature", 0.7),
                "stream": kwargs.get("stream", False)
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    json=request_data,
                    headers=headers,
                    timeout=60.0
                )
                response.raise_for_status()
                
                result = response.json()
                usage = result.get("usage", {})
                tokens_used = usage.get("total_tokens", 0)
                actual_cost = (tokens_used / 1000) * self.base_cost
                cost = self.calculate_price(actual_cost)
                self.update_metrics(actual_cost)
                
                return APIResponse(
                    success=True,
                    data=result,
                    cost=cost,
                    provider="deepseek",
                    metadata={
                        "model": model,
                        "tokens_used": tokens_used,
                        "prompt": prompt[:100] + "..." if len(prompt) > 100 else prompt
                    }
                )
                
        except Exception as e:
            logger.error(f"DeepSeek request failed: {e}")
            return APIResponse(
                success=False,
                error=str(e),
                provider="deepseek"
            )

# ============================================================================
# PROVIDER MANAGER
# ============================================================================

class WhitelabelManager:
    """Manages multiple whitelabel providers"""
    
    def __init__(self):
        self.providers = {}
        self.default_provider = "openrouter"
    
    def add_provider(self, name: str, api_key: str, provider_class: type, markup: float = 3.0):
        """Add a new provider"""
        provider = provider_class(api_key, markup)
        self.providers[name] = provider
        logger.info(f"Added provider: {name} (class: {provider_class.__name__})")
    
    def get_provider(self, name: str) -> Optional[WhitelabelProvider]:
        """Get provider by name"""
        return self.providers.get(name)
    
    async def execute_request(self, prompt: str, provider: Optional[str] = None, **kwargs) -> APIResponse:
        """Execute request using specified or default provider"""
        provider_name = provider or self.default_provider
        provider = self.get_provider(provider_name)
        
        if not provider:
            return APIResponse(
                success=False,
                error=f"Provider {provider_name} not found. Available: {list(self.providers.keys())}"
            )
        
        logger.info(f"Executing request with provider: {provider_name}")
        return await provider.execute_request(prompt, **kwargs)
    
    def get_provider_status(self) -> Dict[str, Any]:
        """Get status of all providers"""
        status = {}
        for name, provider in self.providers.items():
            status[name] = {
                "class": provider.__class__.__name__,
                "base_cost": provider.get_base_cost(),
                "markup": provider.markup_multiplier,
                "metrics": asdict(provider.metrics),
                "requests_count": provider.metrics.requests_count,
                "total_revenue": provider.metrics.total_revenue
            }
        return status

# ============================================================================
# FASTAPI ENDPOINTS
# ============================================================================

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="OMA-AI Whitelabel SDK", version="1.0.0")

class ExecuteRequest(BaseModel):
    prompt: str = Field(..., description="The prompt or request to execute")
    provider: Optional[str] = Field(None, description="Provider to use (default: openrouter)")
    model: Optional[str] = Field(None, description="Model to use")
    max_tokens: Optional[int] = Field(1000, description="Maximum tokens")
    temperature: Optional[float] = Field(0.7, description="Temperature for generation")

class AddProviderRequest(BaseModel):
    name: str = Field(..., description="Provider name")
    api_key: str = Field(..., description="API key for provider")
    provider_type: str = Field(..., description="Provider type (openrouter, anthropic, deepseek)")
    markup: Optional[float] = Field(3.0, description="Markup multiplier")

# Initialize manager
manager = WhitelabelManager()

# Add default providers with placeholder API keys
manager.add_provider("openrouter", "sk-or-placeholder", OpenRouterProvider, 3.0)
manager.add_provider("anthropic_claude", "sk-ant-placeholder", AnthropicProvider, 2.5)
manager.add_provider("deepseek", "sk-ds-placeholder", DeepSeekProvider, 3.5)

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "whitelabel-sdk"}

@app.get("/providers")
async def get_providers():
    """Get available providers"""
    return {"providers": manager.get_provider_status()}

@app.post("/execute")
async def execute_request(request: ExecuteRequest):
    """Execute request through whitelabel provider"""
    try:
        result = await manager.execute_request(
            prompt=request.prompt,
            provider=request.provider,
            model=request.model,
            max_tokens=request.max_tokens,
            temperature=request.temperature
        )
        return asdict(result)
    except Exception as e:
        logger.error(f"Execute request failed: {e}")
        return {"success": False, "error": str(e)}

@app.post("/add-provider")
async def add_provider(request: AddProviderRequest):
    """Add new provider"""
    try:
        provider_classes = {
            "openrouter": OpenRouterProvider,
            "anthropic": AnthropicProvider,
            "deepseek": DeepSeekProvider
        }
        
        provider_class = provider_classes.get(request.provider_type)
        if not provider_class:
            raise ValueError(f"Unknown provider type: {request.provider_type}")
        
        manager.add_provider(
            name=request.name,
            api_key=request.api_key,
            provider_class=provider_class,
            markup=request.markup
        )
        
        return {"success": True, "message": f"Provider {request.name} added"}
        
    except Exception as e:
        logger.error(f"Add provider failed: {e}")
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    import os
    
    port = int(os.getenv("PORT", 8002))
    uvicorn.run(app, host="0.0.0.0", port=port)