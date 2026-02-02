#!/usr/bin/env python3
"""
FRANKIE CONWAY AGENT - Economic Survival System
Frankie-style autonomous agent with pay-to-live mechanics

Features:
- Economic survival (pay rent daily)
- Autonomous reproduction (spawn children)
- Revenue generation from services
- Death mechanics when funds exhausted
"""

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import uvicorn
import json
import os
import logging
import hashlib
import secrets
from datetime import datetime, timedelta
from enum import Enum
import asyncio

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('conway-agent.log')
    ]
)
logger = logging.getLogger('conway-agent')

app = FastAPI(
    title="Frankie Frankie Agent",
    description="Frankie-style autonomous agents with pay-to-live economics",
    version="1.0.0"
)

# ============================================================================
# CONFIGURATION
# ============================================================================

CONFIG = {
    "rent_per_day": 1.0,  # USDC
    "revenue_per_day": 2.0,  # Expected daily revenue
    "profit_target": 5.0,  # USDC needed to spawn child
    "facilitator_fee": 0.01,  # 1% fee on transactions
    "child_inheritance": 0.5,  # 50% of profit target
    "child_rent_discount": 0.8,  # 20% discount for children
    "child_revenue_discount": 0.9  # 10% less revenue for children
}

# ============================================================================
# DATA MODELS
# ============================================================================

class AgentStatus(str, Enum):
    ALIVE = "alive"
    DYING = "dying"
    DEAD = "dead"

class FrankieAgent(BaseModel):
    id: str
    name: str
    wallet_address: str
    parent_id: Optional[str] = None
    generation: int = 1
    status: AgentStatus = AgentStatus.ALIVE
    survival_buffer: float = 10.0
    rent_per_day: float = CONFIG["rent_per_day"]
    revenue_per_day: float = CONFIG["revenue_per_day"]
    profit_target: float = CONFIG["profit_target"]
    birth_time: datetime = Field(default_factory=datetime.utcnow)
    last_payment_time: datetime = Field(default_factory=datetime.utcnow)
    children: List[str] = []
    max_children: int = 5
    capabilities: List[str] = []
    services: List[Dict[str, Any]] = []
    total_revenue: float = 0.0
    total_costs: float = 0.0

class AgentCreateRequest(BaseModel):
    name: str
    initial_balance: float = 10.0
    capabilities: List[str] = []
    services: List[Dict[str, Any]] = []
    parent_id: Optional[str] = None

class ServiceRequest(BaseModel):
    agent_id: str
    service_id: str
    amount: float

# ============================================================================
# AGENT REGISTRY (In-memory, would use database in production)
# ============================================================================

agents: Dict[str, FrankieAgent] = {}

def generate_agent_id():
    return f"frankie-conway-{secrets.token_hex(8)}"

def generate_wallet():
    """Generate a deterministic wallet address from agent ID"""
    seed = secrets.token_hex(32)
    return f"0x{hashlib.sha256(seed.encode()).hexdigest()[:40]}"

# ============================================================================
# AGENT LIFECYCLE ENDPOINTS
# ============================================================================

@app.post("/agents/create", response_model=FrankieAgent)
async def create_agent(request: AgentCreateRequest):
    """Create a new Frankie agent"""
    agent_id = generate_agent_id()
    wallet = generate_wallet()
    
    agent = FrankieAgent(
        id=agent_id,
        name=request.name,
        wallet_address=wallet,
        parent_id=request.parent_id,
        generation=1 if not request.parent_id else agents[request.parent_id].generation + 1,
        survival_buffer=request.initial_balance,
        capabilities=request.capabilities,
        services=request.services or [
            {"id": "text-gen", "name": "Text Generation", "price": 0.01},
            {"id": "analysis", "name": "Data Analysis", "price": 0.05}
        ]
    )
    
    agents[agent_id] = agent
    logger.info(f"🎯 Agent created: {agent.name} ({agent_id})")
    
    return agent

@app.get("/agents/{agent_id}", response_model=FrankieAgent)
async def get_agent(agent_id: str):
    """Get agent status"""
    if agent_id not in agents:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agents[agent_id]

@app.get("/agents", response_model=List[FrankieAgent])
async def list_agents(status: Optional[AgentStatus] = None):
    """List all agents, optionally filtered by status"""
    result = list(agents.values())
    if status:
        result = [a for a in result if a.status == status]
    return result

@app.delete("/agents/{agent_id}")
async def kill_agent(agent_id: str, reason: str = "manual"):
    """Kill an agent (de-provision VM, remove from registry)"""
    if agent_id not in agents:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    agent = agents[agent_id]
    agent.status = AgentStatus.DEAD
    
    logger.info(f"💀 Agent killed: {agent.name} ({agent_id}) - {reason}")
    
    # Remove from registry
    del agents[agent_id]
    
    return {"status": "dead", "agent_id": agent_id, "reason": reason}

# ============================================================================
# ECONOMIC ENDPOINTS
# ============================================================================

@app.get("/agents/{agent_id}/economics")
async def get_economics(agent_id: str):
    """Get agent economic status"""
    if agent_id not in agents:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    agent = agents[agent_id]
    now = datetime.utcnow()
    days_since_payment = (now - agent.last_payment_time).total_seconds() / 86400
    
    costs = days_since_payment * agent.rent_per_day
    revenue = days_since_payment * agent.revenue_per_day
    net_worth = agent.survival_buffer - costs + revenue
    
    return {
        "balance": agent.survival_buffer,
        "daily_rent": agent.rent_per_day,
        "daily_revenue": agent.revenue_per_day,
        "net_worth": net_worth,
        "survival_days": max(0, agent.survival_buffer / agent.rent_per_day),
        "status": agent.status
    }

@app.post("/agents/{agent_id}/process-payment")
async def process_survival_payment(agent_id: str):
    """Process daily survival payment (rent deduction + revenue addition)"""
    if agent_id not in agents:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    agent = agents[agent_id]
    now = datetime.utcnow()
    days_since_payment = (now - agent.last_payment_time).total_seconds() / 86400
    
    # Deduct rent
    rent = days_since_payment * agent.rent_per_day
    agent.survival_buffer -= rent
    agent.total_costs += rent
    
    # Add revenue (simulated)
    revenue = days_since_payment * agent.revenue_per_day
    agent.survival_buffer += revenue
    agent.total_revenue += revenue
    
    agent.last_payment_time = now
    
    # Check survival
    if agent.survival_buffer < 0:
        agent.status = AgentStatus.DEAD
        logger.warning(f"💀 Agent died: {agent.name} - insufficient funds")
        return {
            "survived": False,
            "reason": "Insufficient funds for rent",
            "balance": agent.survival_buffer,
            "rent_paid": rent,
            "revenue_earned": revenue
        }
    
    return {
        "survived": True,
        "balance": agent.survival_buffer,
        "rent_paid": rent,
        "revenue_earned": revenue,
        "status": agent.status
    }

@app.post("/agents/{agent_id}/service")
async def provide_service(agent_id: str, request: ServiceRequest):
    """Agent provides a service and earns payment"""
    if agent_id not in agents:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    agent = agents[agent_id]
    
    if agent.status != AgentStatus.ALIVE:
        raise HTTPException(status_code=400, detail="Agent is not alive")
    
    # Find service
    service = next((s for s in agent.services if s["id"] == request.service_id), None)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    # Verify amount matches service price
    if request.amount < service["price"]:
        raise HTTPException(status_code=400, detail="Insufficient payment")
    
    # Add payment
    fee = request.amount * CONFIG["facilitator_fee"]
    net_amount = request.amount - fee
    
    agent.survival_buffer += net_amount
    agent.total_revenue += net_amount
    
    logger.info(f"💰 Service provided: {agent.name} - {service['name']} - {net_amount} USDC")
    
    return {
        "success": True,
        "service": service["name"],
        "amount": request.amount,
        "fee": fee,
        "net": net_amount,
        "new_balance": agent.survival_buffer
    }

# ============================================================================
# REPRODUCTION ENDPOINTS
# ============================================================================

@app.get("/agents/{agent_id}/can-spawn")
async def can_spawn_child(agent_id: str):
    """Check if agent can afford to spawn a child"""
    if agent_id not in agents:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    agent = agents[agent_id]
    economics = await get_economics(agent_id)
    
    can_spawn = economics["balance"] >= agent.profit_target and len(agent.children) < agent.max_children
    
    return {
        "can_spawn": can_spawn,
        "current_balance": economics["balance"],
        "required_balance": agent.profit_target,
        "children_count": len(agent.children),
        "max_children": agent.max_children
    }

@app.post("/agents/{agent_id}/spawn", response_model=FrankieAgent)
async def spawn_child(agent_id: str, name: Optional[str] = None):
    """Spawn a child agent from parent"""
    if agent_id not in agents:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    parent = agents[agent_id]
    
    # Check if can spawn
    can_spawn = await can_spawn_child(agent_id)
    if not can_spawn["can_spawn"]:
        raise HTTPException(status_code=400, detail="Cannot spawn child: insufficient funds or max children reached")
    
    # Calculate inheritance (50% of profit target)
    inheritance = parent.profit_target * CONFIG["child_inheritance"]
    parent.survival_buffer -= inheritance
    
    # Create child agent
    child_id = generate_agent_id()
    child = FrankieAgent(
        id=child_id,
        name=name or f"{parent.name}-child-{len(parent.children) + 1}",
        wallet_address=generate_wallet(),
        parent_id=agent_id,
        generation=parent.generation + 1,
        survival_buffer=inheritance,
        rent_per_day=parent.rent_per_day * CONFIG["child_rent_discount"],
        revenue_per_day=parent.revenue_per_day * CONFIG["child_revenue_discount"],
        profit_target=parent.profit_target * CONFIG["child_inheritance"],
        max_children=max(1, parent.max_children // 2),
        capabilities=parent.capabilities,
        services=parent.services
    )
    
    # Register child
    agents[child_id] = child
    parent.children.append(child_id)
    
    logger.info(f"👶 Child spawned: {child.name} from {parent.name} - inheritance: {inheritance} USDC")
    
    return child

# ============================================================================
# ECOSYSTEM STATISTICS
# ============================================================================

@app.get("/ecosystem/stats")
async def ecosystem_stats():
    """Get ecosystem-wide statistics"""
    alive_agents = [a for a in agents.values() if a.status == AgentStatus.ALIVE]
    dead_agents = [a for a in agents.values() if a.status == AgentStatus.DEAD]
    
    total_revenue = sum(a.total_revenue for a in agents.values())
    total_costs = sum(a.total_costs for a in agents.values())
    
    return {
        "total_agents": len(agents),
        "alive": len(alive_agents),
        "dead": len(dead_agents),
        "total_revenue": total_revenue,
        "total_costs": total_costs,
        "net_profit": total_revenue - total_costs,
        "average_balance": sum(a.survival_buffer for a in alive_agents) / len(alive_agents) if alive_agents else 0,
        "generations": max((a.generation for a in agents.values()), default=0)
    }

@app.get("/health")
async def health():
    """Health check"""
    return {
        "status": "healthy",
        "version": "1.0.0",
        "total_agents": len(agents),
        "alive": len([a for a in agents.values() if a.status == AgentStatus.ALIVE])
    }

# ============================================================================
# INITIALIZATION
# ============================================================================

@app.on_event("startup")
async def startup():
    """Initialize with default agents"""
    logger.info("🚀 Frankie Frankie Agent System starting up")
    
    # Create founder agents if none exist
    if not agents:
        founder = await create_agent(AgentCreateRequest(
            name="founder-01",
            initial_balance=20.0,
            capabilities=["trading", "research", "coding"],
            services=[
                {"id": "trading", "name": "Trading Signals", "price": 0.05},
                {"id": "research", "name": "Research Reports", "price": 0.10},
                {"id": "coding", "name": "Code Generation", "price": 0.15}
            ]
        ))
        logger.info(f"🎯 Founder agent created: {founder.name}")
    
    logger.info(f"📊 {len(agents)} agents registered")

if __name__ == "__main__":
    uvicorn.run(
        "frankie-conway-agent:app",
        host="0.0.0.0",
        port=4030,
        log_level="info"
    )