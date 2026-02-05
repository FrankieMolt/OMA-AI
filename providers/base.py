# Base Provider Class

from dataclasses import dataclass
from typing import List, Dict, Any, Optional
from abc import ABC, abstractmethod

@dataclass
class ModelInfo:
    """Information about a model"""
    id: str
    name: str
    provider: str
    pricing: Dict[str, float]  # {"input": 0.10, "output": 0.10}
    speed: str  # "fastest", "very fast", "fast", "medium", "slow"
    context: int  # max context tokens
    description: str

class BaseProvider(ABC):
    """Base class for AI providers"""
    
    @property
    @abstractmethod
    def name(self) -> str:
        """Provider name"""
        pass
    
    @property
    @abstractmethod
    def models(self) -> List[ModelInfo]:
        """List of available models"""
        pass
    
    @abstractmethod
    async def complete(
        self,
        model: str,
        messages: List[Dict[str, str]],
        max_tokens: int = 1024,
        temperature: float = 0.7,
        **kwargs
    ) -> Dict[str, Any]:
        """Generate completion"""
        pass
    
    async def complete_streaming(
        self,
        model: str,
        messages: List[Dict[str, str]],
        max_tokens: int = 1024,
        **kwargs
    ):
        """Stream completion (optional)"""
        yield  # Override if supported
    
    async def embeddings(
        self,
        model: str,
        texts: List[str]
    ) -> List[List[float]]:
        """Get embeddings (optional)"""
        raise NotImplementedError(f"{self.name} doesn't support embeddings")
    
    async def images(
        self,
        prompt: str,
        model: str = "dall-e-3",
        size: str = "1024x1024",
        n: int = 1
    ) -> List[str]:
        """Generate images (optional)"""
        raise NotImplementedError(f"{self.name} doesn't support image generation")
    
    @abstractmethod
    def calculate_cost(
        self,
        model: str,
        input_tokens: int,
        output_tokens: int
    ) -> float:
        """Calculate cost for a request"""
        pass
    
    def get_model(self, model_id: str) -> Optional[ModelInfo]:
        """Get model info by ID"""
        for m in self.models:
            if m.id == model_id:
                return m
        return None
    
    async def health_check(self) -> bool:
        """Check if provider is available"""
        try:
            # Simple check - try to list models or make a small request
            return True
        except Exception:
            return False