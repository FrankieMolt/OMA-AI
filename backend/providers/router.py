# Smart Router - Intelligent Provider Selection

import asyncio
from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass
from enum import Enum

from .groq import GroqProvider
from .together import TogetherProvider
from .openai import OpenAIProvider
from .anthropic import AnthropicProvider
from .base import BaseProvider, ModelInfo

class TaskType(Enum):
    """Task classification for smart routing"""
    CHAT = "chat"
    REASONING = "reasoning"
    CREATIVE = "creative"
    CODE = "code"
    FAST = "fast"
    CHEAP = "cheap"
    GENERAL = "general"

@dataclass
class RouteResult:
    """Result of routing decision"""
    provider: str
    model: str
    estimated_cost: float
    estimated_speed: str
    reasoning: str

class SmartRouter:
    """
    Intelligent routing that selects the best provider based on:
    - Task type
    - Budget constraints
    - Speed requirements
    - Model capabilities
    """
    
    def __init__(self):
        self.providers: Dict[str, BaseProvider] = {
            "groq": GroqProvider(),
            "together": TogetherProvider(),
            "openai": OpenAIProvider(),
            "anthropic": AnthropicProvider(),
        }
    
    def classify_task(self, task: str) -> TaskType:
        """Classify a task for routing"""
        task_lower = task.lower()
        
        # Reasoning tasks
        if any(kw in task_lower for kw in ["think", "reason", "analyze", "solve", "explain"]):
            return TaskType.REASONING
        
        # Code tasks
        if any(kw in task_lower for kw in ["code", "program", "debug", "implement"]):
            return TaskType.CODE
        
        # Creative tasks
        if any(kw in task_lower for kw in ["write", "story", "poem", "creative", "design"]):
            return TaskType.CREATIVE
        
        # Fast/chat tasks
        if any(kw in task_lower for kw in ["quick", "fast", "chat", "simple", "hi", "hello"]):
            return TaskType.FAST
        
        # Cheap tasks
        if any(kw in task_lower for kw in ["cheap", "budget", "save", "minimal"]):
            return TaskType.CHEAP
        
        return TaskType.GENERAL
    
    async def get_providers(
        self,
        task_type: TaskType = TaskType.GENERAL,
        budget: float = 1.0,
        speed_priority: str = "balanced",
        capabilities: List[str] = None
    ) -> List[RouteResult]:
        """Get ranked list of providers for a task"""
        
        results = []
        capabilities = capabilities or []
        
        for provider in self.providers.values():
            for model in provider.models:
                # Check capabilities
                if capabilities:
                    model_caps = model.capabilities if hasattr(model, 'capabilities') else []
                    if not any(cap in model_caps for cap in capabilities):
                        continue
                
                # Skip if over budget (assume 1000 token average)
                estimated = provider.calculate_cost(model.id, 500, 500)
                if estimated > budget:
                    continue
                
                # Score based on task type
                score, reasoning = self._score_model(
                    model, task_type, speed_priority
                )
                
                results.append(RouteResult(
                    provider=provider.name,
                    model=model.id,
                    estimated_cost=estimated,
                    estimated_speed=model.speed,
                    reasoning=reasoning
                ))
        
        # Sort by score
        results.sort(key=lambda x: self._score_to_float(x.reasoning), reverse=True)
        return results
    
    def _score_model(
        self,
        model: ModelInfo,
        task_type: TaskType,
        speed_priority: str
    ) -> Tuple[float, str]:
        """Score a model for a task type"""
        
        base_score = 0.5
        
        # Speed bonus
        speed_scores = {
            "fastest": 1.0,
            "very fast": 0.9,
            "fast": 0.8,
            "medium": 0.6,
            "slow": 0.4
        }
        
        speed_bonus = speed_scores.get(model.speed, 0.5)
        
        # Task-specific bonuses
        task_bonuses = {
            TaskType.CHAT: {
                "llama-3.1-8b-instruct": 0.3,
                "llama-3.3-70b-versatile": 0.2,
                "claude-3-5-haiku": 0.2,
            },
            TaskType.REASONING: {
                "deepseek-ai/DeepSeek-R1": 0.4,
                "claude-3-7-sonnet-20250511": 0.3,
                "o1": 0.3,
            },
            TaskType.CREATIVE: {
                "claude-3-7-sonnet-20250511": 0.3,
                "gpt-4o": 0.2,
                "llama-3.3-70b-versatile": 0.1,
            },
            TaskType.CODE: {
                "claude-opus-4-20250511": 0.3,
                "gpt-4o": 0.2,
                "deepseek-ai/DeepSeek-R1": 0.2,
            },
            TaskType.FAST: {
                "llama-3.1-8b-instruct": 0.4,
                "mixtral-8x7b-32768": 0.3,
                "claude-3-5-haiku": 0.2,
            },
            TaskType.CHEAP: {
                "llama-3.1-8b-instruct": 0.4,
                "llama-3.1-8B-Instruct-Turbo": 0.4,
                "gpt-4o-mini": 0.3,
            },
        }
        
        task_bonus = task_bonuses.get(task_type, {}).get(model.id, 0.0)
        
        # Speed priority adjustment
        if speed_priority == "speed":
            speed_weight = 0.5
        elif speed_priority == "cost":
            speed_weight = 0.1
        else:
            speed_weight = 0.3
        
        # Price penalty
        price = model.pricing.get("input", 0.5) + model.pricing.get("output", 0.5)
        price_penalty = max(0, (price - 1.0) * 0.1)  # Penalty for expensive models
        
        total_score = base_score + (speed_bonus * speed_weight) + task_bonus - price_penalty
        reasoning = f"Score: {total_score:.2f} (speed: {speed_bonus}, task: {task_bonus}, price: {price_penalty:.2f})"
        
        return total_score, reasoning
    
    def _score_to_float(self, reasoning: str) -> float:
        """Extract score from reasoning string"""
        try:
            return float(reasoning.split(":")[1].strip().split()[0])
        except:
            return 0.5
    
    async def route(
        self,
        task: str,
        budget: float = 1.0,
        speed_priority: str = "balanced",
        capabilities: List[str] = None
    ) -> RouteResult:
        """Route a task to the best provider"""
        
        task_type = self.classify_task(task)
        providers = await self.get_providers(
            task_type, budget, speed_priority, capabilities
        )
        
        if providers:
            return providers[0]
        
        # Fallback to groq with cheap model
        return RouteResult(
            provider="groq",
            model="llama-3.1-8b-instruct",
            estimated_cost=0.001,
            estimated_speed="fastest",
            reasoning="Fallback to cheapest fast model"
        )
    
    async def complete(
        self,
        task: str,
        messages: List[Dict[str, str]],
        budget: float = 1.0,
        **kwargs
    ) -> Dict[str, Any]:
        """Route and execute completion"""
        
        route = await self.route(task, budget)
        provider = self.providers[route.provider]
        
        return await provider.complete(
            model=route.model,
            messages=messages,
            **kwargs
        )


class ProviderManager:
    """Manager for all providers"""
    
    def __init__(self):
        self.router = SmartRouter()
        self.providers = {
            "groq": GroqProvider(),
            "together": TogetherProvider(),
            "openai": OpenAIProvider(),
            "anthropic": AnthropicProvider(),
        }
    
    async def health_check_all(self) -> Dict[str, bool]:
        """Check health of all providers"""
        results = {}
        for name, provider in self.providers.items():
            results[name] = await provider.health_check()
        return results
    
    def get_provider(self, name: str) -> Optional[BaseProvider]:
        """Get a specific provider"""
        return self.providers.get(name)
    
    def list_models(self) -> Dict[str, List[ModelInfo]]:
        """List all models from all providers"""
        return {name: p.models for name, p in self.providers.items()}