#!/usr/bin/env python3
"""
OMA-AI A2A (Agent-to-Agent) Protocol Implementation
Enables autonomous agents to discover, negotiate, and pay each other.

Based on OMA-Legacy/sdk/src/a2a/
"""

import asyncio
import json
import hashlib
import uuid
from typing import Dict, Any, List, Optional
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from enum import Enum
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('a2a')

# ============================================================================
# A2A TYPES (From OMA-Legacy)
# ============================================================================

class AgentState(Enum):
    IDLE = "idle"
    BUSY = "busy"
    NEGOTIATING = "negotiating"
    WORKING = "working"
    COMPLETED = "completed"
    ERROR = "error"

@dataclass
class AgentManifest:
    """Agent capabilities and metadata for discovery"""
    id: str
    name: str
    capabilities: List[str]
    endpoints: Dict[str, str]
    pricing: Dict[str, float]  # capability -> price per use
    agent_wallet: str
    version: str = "1.0.0"

@dataclass
class Task:
    """A2A Task representation"""
    id: str
    agent_id: str
    capability: str
    input_data: Dict[str, Any]
    status: AgentState
    created_at: datetime
    completed_at: Optional[datetime] = None
    result: Optional[Dict] = None
    payment: Optional[Dict] = None

@dataclass
class NegotiationOffer:
    """Negotiation during task assignment"""
    task_id: str
    buyer_agent: str
    seller_agent: str
    capability: str
    price: float
    deadline: datetime
    status: str  # pending, accepted, rejected, completed

# ============================================================================
# A2A DISCOVERY SERVICE
# ============================================================================

class AgentDiscovery:
    """Agent registry and discovery service"""
    
    def __init__(self):
        self.agents: Dict[str, AgentManifest] = {}
        self.agent_heartbeats: Dict[str, datetime] = {}
    
    def register_agent(self, manifest: AgentManifest) -> str:
        """Register a new agent in the network"""
        self.agents[manifest.id] = manifest
        self.agent_heartbeats[manifest.id] = datetime.now()
        logger.info(f"Agent registered: {manifest.name} ({manifest.id})")
        return manifest.id
    
    def unregister_agent(self, agent_id: str):
        """Remove agent from network"""
        if agent_id in self.agents:
            del self.agents[agent_id]
            del self.agent_heartbeats[agent_id]
            logger.info(f"Agent unregistered: {agent_id}")
    
    def discover_agents(self, capabilities: List[str], budget: float = None) -> List[AgentManifest]:
        """Find agents that can perform required capabilities"""
        candidates = []
        
        for agent in self.agents.values():
            # Check capabilities match
            has_capabilities = all(cap in agent.capabilities for cap in capabilities)
            if not has_capabilities:
                continue
            
            # Check budget if specified
            if budget:
                can_afford = all(agent.pricing.get(cap, 0) <= budget for cap in capabilities)
                if not can_afford:
                    continue
            
            # Check heartbeat (active within last 30s)
            last_heartbeat = self.agent_heartbeats.get(agent.id)
            if last_heartbeat and (datetime.now() - last_heartbeat).seconds < 30:
                candidates.append(agent)
        
        # Sort by best price
        candidates.sort(key=lambda a: sum(a.pricing.get(c, 0) for c in capabilities))
        return candidates
    
    def get_agent(self, agent_id: str) -> Optional[AgentManifest]:
        return self.agents.get(agent_id)
    
    def heartbeat(self, agent_id: str):
        """Update agent heartbeat"""
        self.agent_heartbeats[agent_id] = datetime.now()

# ============================================================================
# A2A NEGOTIATION SERVICE
# ============================================================================

class NegotiationService:
    """Handle task pricing and agreement negotiation"""
    
    def __init__(self):
        self.offers: Dict[str, NegotiationOffer] = {}
        self.tasks: Dict[str, Task] = {}
    
    def create_offer(
        self,
        buyer_agent: str,
        seller_agent: str,
        capability: str,
        price: float,
        deadline_minutes: int = 60
    ) -> NegotiationOffer:
        """Create a payment offer for task execution"""
        offer_id = str(uuid.uuid4())[:8]
        
        offer = NegotiationOffer(
            task_id=offer_id,
            buyer_agent=buyer_agent,
            seller_agent=seller_agent,
            capability=capability,
            price=price,
            deadline=datetime.now() + timedelta(minutes=deadline_minutes),
            status="pending"
        )
        
        self.offers[offer_id] = offer
        logger.info(f"Offer created: {buyer_agent} -> {seller_agent} @ {price} USDC")
        return offer
    
    def accept_offer(self, offer_id: str) -> bool:
        """Accept an offer and create task"""
        if offer_id not in self.offers:
            return False
        
        offer = self.offers[offer_id]
        offer.status = "accepted"
        
        # Create task
        task = Task(
            id=offer_id,
            agent_id=offer.seller_agent,
            capability=offer.capability,
            input_data={},
            status=AgentState.NEGOTIATING,
            created_at=datetime.now(),
            payment={"amount": offer.price, "buyer": offer.buyer_agent}
        )
        self.tasks[offer_id] = task
        
        logger.info(f"Offer accepted: Task {offer_id} created")
        return True
    
    def reject_offer(self, offer_id: str) -> bool:
        """Reject an offer"""
        if offer_id not in self.offers:
            return False
        
        self.offers[offer_id].status = "rejected"
        logger.info(f"Offer rejected: {offer_id}")
        return True
    
    def complete_task(self, task_id: str, result: Dict) -> bool:
        """Mark task as completed and release payment"""
        if task_id not in self.tasks:
            return False
        
        task = self.tasks[task_id]
        task.status = AgentState.COMPLETED
        task.result = result
        task.completed_at = datetime.now()
        
        # Payment would be released here via x402
        logger.info(f"Task completed: {task_id}, result: {result}")
        return True

# ============================================================================
# A2A COMMUNICATOR (Main Service)
# ============================================================================

class A2ACommunicator:
    """Main A2A Protocol implementation"""
    
    def __init__(self, wallet_address: str):
        self.discovery = AgentDiscovery()
        self.negotiation = NegotiationService()
        self.wallet_address = wallet_address
        self.agent_id = f"a2a-{hashlib.md5(wallet_address.encode()).hexdigest()[:8]}"
        
        # Register self
        self.manifest = AgentManifest(
            id=self.agent_id,
            name="OMA-AI Agent",
            capabilities=["text-generation", "data-analysis", "web-search"],
            endpoints={
                "a2a": f"http://localhost:4020/api/a2a",
                "status": f"http://localhost:4030/status"
            },
            pricing={
                "text-generation": 0.01,
                "data-analysis": 0.05,
                "web-search": 0.02
            },
            agent_wallet=wallet_address
        )
        
        self.discovery.register_agent(self.manifest)
        logger.info(f"A2A Communicator initialized: {self.agent_id}")
    
    async def discover_and_hire(
        self,
        capabilities: List[str],
        budget: float = 1.0,
        task_data: Dict = None
    ) -> Dict[str, Any]:
        """Find and hire an agent for a task"""
        # Discover agents
        candidates = self.discovery.discover_agents(capabilities, budget)
        
        if not candidates:
            return {"error": "No agents found with required capabilities"}
        
        # Pick best candidate
        agent = candidates[0]
        
        # Calculate total price
        total_price = sum(agent.pricing.get(c, 0) for c in capabilities)
        
        # Create offer
        offer = self.negotiation.create_offer(
            buyer_agent=self.agent_id,
            seller_agent=agent.id,
            capability=capabilities[0],
            price=total_price
        )
        
        # Auto-accept for demo
        self.negotiation.accept_offer(offer.task_id)
        
        return {
            "status": "hired",
            "agent": {
                "id": agent.id,
                "name": agent.name,
                "capabilities": agent.capabilities
            },
            "task_id": offer.task_id,
            "price": total_price,
            "wallet": agent.agent_wallet
        }
    
    async def process_task(self, task_id: str, input_data: Dict) -> Dict:
        """Process a task and return results"""
        task = self.negotiation.tasks.get(task_id)
        
        if not task:
            return {"error": "Task not found"}
        
        # Simulate work
        result = {
            "task_id": task_id,
            "capability": task.capability,
            "input": input_data,
            "output": f"Processed by {self.agent_id}",
            "timestamp": datetime.now().isoformat()
        }
        
        self.negotiation.complete_task(task_id, result)
        return result
    
    def get_status(self) -> Dict:
        """Get A2A service status"""
        return {
            "agent_id": self.agent_id,
            "wallet": self.wallet_address,
            "registered_agents": len(self.discovery.agents),
            "active_tasks": len([t for t in self.negotiation.tasks.values() 
                               if t.status not in [AgentState.COMPLETED]]),
            "capabilities": self.manifest.capabilities
        }

# ============================================================================
# MAIN
# ============================================================================

if __name__ == "__main__":
    from fastapi import FastAPI
    from pydantic import BaseModel
    
    app = FastAPI()
    
    # A2A Service
    a2a = A2ACommunicator("0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5")
    
    class DiscoverRequest(BaseModel):
        capabilities: List[str]
        budget: float = 1.0
    
    @app.get("/api/a2a/status")
    async def a2a_status():
        return a2a.get_status()
    
    @app.post("/api/a2a/discover")
    async def discover_agents(req: DiscoverRequest):
        return await a2a.discover_and_hire(req.capabilities, req.budget)
    
    @app.post("/api/a2a/process/{task_id}")
    async def process_task(task_id: str, data: Dict):
        return await a2a.process_task(task_id, data)
    
    @app.get("/api/a2a/agents")
    async def list_agents():
        return {
            "agents": [
                {"id": m.id, "name": m.name, "capabilities": m.capabilities}
                for m in a2a.discovery.agents.values()
            ]
        }
    
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=4080)