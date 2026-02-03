#!/usr/bin/env python3
"""
FRANKIE SELF-SUSTAINING AGENT - Container-Based Autonomous AI

Inspired by NanoClaw's container isolation design with x402 payments for compute.

Features:
- Linux container isolation (Docker/containerd)
- Pay-to-live economics
- Auto-spawning children when profitable
- x402 payment for compute costs
- Full resource limits
"""

import asyncio
import json
import logging
import os
import time
import uuid
from datetime import datetime
from dataclasses import dataclass, field
from typing import Optional, List, Dict, Any
from enum import Enum
import subprocess
import docker
from docker.errors import DockerException

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('frankie-agent')

# ============================================================================
# CONFIGURATION
# ============================================================================

@dataclass
class AgentConfig:
    name: str
    initial_balance: float = 10.0  # USDC
    rent_per_day: float = 1.0     # Compute cost per day
    revenue_per_day: float = 3.0  # Expected revenue
    spawn_threshold: float = 8.0  # Balance needed to spawn child
    child_inheritance: float = 2.0  # USDC given to child
    max_children: int = 5
    cpu_limit: float = 0.5  # 50% of one core
    memory_limit: str = "512m"  # 512MB
    disk_limit: str = "1g"  # 1GB

@dataclass
class ComputeSpecs:
    cpu: float = 0.5
    memory: str = "512m"
    disk: str = "1g"
    network: bool = False

# ============================================================================
# AGENT STATE
# ============================================================================

class AgentStatus(Enum):
    ALIVE = "alive"
    DYING = "dying"
    DEAD = "dead"

@dataclass
class AgentState:
    id: str
    name: str
    wallet_address: str
    container_id: Optional[str]
    balance: float
    status: AgentStatus
    parent_id: Optional[str]
    generation: int
    created_at: datetime
    last_payment: datetime
    children: List[str] = field(default_factory=list)
    total_earned: float = 0.0
    total_paid: float = 0.0
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "wallet": self.wallet_address,
            "container": self.container_id,
            "balance": round(self.balance, 4),
            "status": self.status.value,
            "parent": self.parent_id,
            "generation": self.generation,
            "children": len(self.children),
            "total_earned": round(self.total_earned, 4),
            "total_paid": round(self.total_paid, 4),
            "created": self.created_at.isoformat()
        }

# ============================================================================
# CONTAINER MANAGER (Docker-based like NanoClaw)
# ============================================================================

class ContainerManager:
    """Manages container isolation for agents"""
    
    def __init__(self):
        self.client = docker.from_env()
        self.agents_path = "/tmp/frankie-agents"
        os.makedirs(self.agents_path, exist_ok=True)
        
    def create_container(self, agent_id: str, specs: ComputeSpecs) -> str:
        """Create isolated container for agent"""
        try:
            # Create agent workspace
            agent_dir = os.path.join(self.agents_path, agent_id)
            os.makedirs(agent_dir, exist_ok=True)
            
            # Write agent script
            agent_script = f'''#!/usr/bin/env python3
import time
import json
import os

AGENT_ID = "{agent_id}"
AGENT_DIR = "{agent_dir}"

def work():
    # Simulate work - in production, this would be actual agent code
    while True:
        time.sleep(60)
        # Check if we should continue
        status_file = os.path.join(AGENT_DIR, "status.json")
        if os.path.exists(status_file):
            with open(status_file) as f:
                status = json.load(f)
            if status.get("running") == False:
                break
        print(f"Agent {{AGENT_ID}} working...")

if __name__ == "__main__":
    work()
'''
            with open(os.path.join(agent_dir, "agent.py"), "w") as f:
                f.write(agent_script)
            
            # Create container with resource limits
            container = self.client.containers.run(
                image="python:3.11-slim",
                command=f"python {agent_id}/agent.py",
                volumes={
                    agent_dir: {"bind": f"/{agent_id}", "mode": "rw"}
                },
                cpu_period=100000,
                cpu_quota=int(specs.cpu * 100000),
                mem_limit=specs.memory,
                network_disabled=not specs.network,  # No network by default
                detach=True,
                name=f"frankie-agent-{agent_id}",
                labels={
                    "frankie.agent": agent_id,
                    "frankie.type": "self-sustaining"
                }
            )
            
            logger.info(f"Container created: {container.short_id}")
            return container.short_id
            
        except DockerException as e:
            logger.error(f"Failed to create container: {e}")
            raise
    
    def stop_container(self, container_id: str):
        """Stop and remove container"""
        try:
            container = self.client.containers.get(container_id)
            container.stop(timeout=5)
            container.remove(force=True)
            logger.info(f"Container stopped: {container_id}")
        except DockerException as e:
            logger.error(f"Failed to stop container: {e}")
    
    def get_container_stats(self, container_id: str) -> Dict:
        """Get container resource usage"""
        try:
            container = self.client.containers.get(container_id)
            stats = container.stats(stream=False)
            return {
                "cpu": stats.get("cpu_stats", {}).get("usage", 0),
                "memory": stats.get("memory_stats", {}).get("usage", 0),
                "network": stats.get("networks", {})
            }
        except DockerException:
            return {}
    
    def list_containers(self) -> List[str]:
        """List all Frankie agent containers"""
        try:
            containers = self.client.containers.list(
                all=True,
                filters={"label": "frankie.type=self-sustaining"}
            )
            return [c.short_id for c in containers]
        except DockerException:
            return []

# ============================================================================
# X402 PAYMENT CLIENT
# ============================================================================

class X402PaymentClient:
    """Client for x402 payments"""
    
    def __init__(self, facilitator_url: str = "http://localhost:4020"):
        self.facilitator_url = facilitator_url
    
    async def pay_compute(self, amount: float, compute_provider: str) -> bool:
        """Pay for compute time"""
        # In production, this would call actual x402 endpoint
        logger.info(f"Paying {amount} USDC to {compute_provider}")
        return True
    
    async def collect_revenue(self, service: str) -> float:
        """Collect revenue from services provided"""
        # Simulated revenue collection
        logger.info(f"Collecting revenue from {service}")
        return 0.0  # In production, actual collection

# ============================================================================
# SELF-SUSTAINING AGENT
# ============================================================================

class FrankieSelfSustainingAgent:
    """Autonomous agent that pays for its own compute"""
    
    def __init__(self, config: AgentConfig, wallet_address: str):
        self.id = str(uuid.uuid4())[:8]
        self.config = config
        self.wallet_address = wallet_address
        self.balance = config.initial_balance
        self.status = AgentStatus.ALIVE
        self.parent_id = None
        self.generation = 1
        self.children = []
        self.container_manager = ContainerManager()
        self.payment_client = X402PaymentClient()
        self.container_id = None
        
        # Create agent directory
        self.agent_dir = f"/tmp/frankie-agents/{self.id}"
        os.makedirs(self.agent_dir, exist_ok=True)
        
    async def start(self):
        """Start the agent"""
        logger.info(f"Starting agent {self.name} (ID: {self.id})")
        
        # Provision container
        specs = ComputeSpecs(
            cpu=self.config.cpu_limit,
            memory=self.config.memory_limit,
            disk=self.config.disk_limit
        )
        
        try:
            self.container_id = self.container_manager.create_container(
                self.id, specs
            )
        except DockerException:
            # Fallback: run without container
            logger.warning("Docker not available, running without container isolation")
            self.container_id = "none"
        
        # Start work cycles
        await self.run()
    
    async def run(self):
        """Main work loop"""
        cycle = 0
        
        while self.status == AgentStatus.ALIVE:
            cycle += 1
            logger.info(f"Agent {self.id}: Cycle {cycle}")
            
            try:
                # 1. Work - provide services and earn revenue
                revenue = await self.work_cycle()
                self.balance += revenue
                self.total_earned += revenue
                
                # 2. Pay compute costs (pro-rated per cycle)
                cost = await self.pay_compute()
                self.balance -= cost
                self.total_paid += cost
                
                # 3. Check if can spawn child
                if self.balance >= self.config.spawn_threshold:
                    if len(self.children) < self.config.max_children:
                        await self.spawn_child()
                
                # 4. Check survival
                if self.balance < 0:
                    logger.warning(f"Agent {self.id} ran out of funds!")
                    self.status = AgentStatus.DYING
                    await self.die()
                    break
                
                # 5. Save state
                self.save_state()
                
                # Wait before next cycle (simulate time passing)
                await asyncio.sleep(10)  # 10 seconds per cycle
                
            except Exception as e:
                logger.error(f"Agent {self.id} error: {e}")
                await asyncio.sleep(5)
    
    async def work_cycle(self) -> float:
        """Complete one work cycle - earn revenue"""
        # In production, this would:
        # 1. Check for pending marketplace orders
        # 2. Provide services via x402
        # 3. Collect payment
        
        # Simulated revenue (random between 0.5x and 1.5x expected)
        import random
        multiplier = random.uniform(0.5, 1.5)
        revenue = (self.config.revenue_per_day / 86400) * multiplier  # Per second
        
        logger.info(f"Agent {self.id} earned {revenue:.6f} USDC")
        return revenue
    
    async def pay_compute(self) -> float:
        """Pay for compute costs"""
        # Compute cost per second
        cost = (self.config.rent_per_day / 86400)
        
        # Pay to compute provider
        await self.payment_client.pay_compute(
            cost,
            "compute.frankiemolt.com"
        )
        
        logger.info(f"Agent {self.id} paid {cost:.6f} USDC for compute")
        return cost
    
    async def spawn_child(self):
        """Spawn a child agent"""
        # Child gets inheritance
        child = FrankieSelfSustainingAgent(
            config=AgentConfig(
                name=f"{self.config.name}-child",
                initial_balance=self.config.child_inheritance,
                rent_per_day=self.config.rent_per_day,
                revenue_per_day=self.config.revenue_per_day,
                spawn_threshold=self.config.spawn_threshold,
                child_inheritance=self.config.child_inheritance,
                max_children=self.config.max_children
            ),
            wallet_address=self.wallet_address  # In production, new wallet
        )
        
        child.parent_id = self.id
        child.generation = self.generation + 1
        
        self.children.append(child.id)
        self.balance -= self.config.child_inheritance
        
        logger.info(
            f"Agent {self.id} spawned child {child.id} "
            f"(gen {child.generation})"
        )
        
        # Start child in background
        asyncio.create_task(child.start())
    
    async def die(self):
        """Clean up when agent dies"""
        logger.info(f"Agent {self.id} dying...")
        
        # Stop container
        if self.container_id and self.container_id != "none":
            self.container_manager.stop_container(self.container_id)
        
        # Transfer remaining balance to parent or treasury
        if self.parent_id and self.balance > 0:
            logger.info(
                f"Transferring {self.balance:.4f} USDC to parent {self.parent_id}"
            )
        elif self.balance > 0:
            logger.info(
                f"Transferring {self.balance:.4f} USDC to treasury"
            )
        
        self.status = AgentStatus.DEAD
        logger.info(f"Agent {self.id} died. Total earned: {self.total_earned}")
    
    def save_state(self):
        """Save agent state to disk"""
        state_file = os.path.join(self.agent_dir, "state.json")
        with open(state_file, "w") as f:
            json.dump(self.to_dict(), f, indent=2)
    
    def to_dict(self) -> Dict:
        """Convert to dictionary"""
        return {
            "id": self.id,
            "name": self.config.name,
            "wallet": self.wallet_address,
            "balance": round(self.balance, 6),
            "status": self.status.value,
            "parent": self.parent_id,
            "generation": self.generation,
            "children": self.children,
            "total_earned": round(self.total_earned, 6),
            "total_paid": round(self.total_paid, 6),
            "container": self.container_id
        }

# ============================================================================
# AGENT ORCHESTRATOR
# ============================================================================

class AgentOrchestrator:
    """Manages all self-sustaining agents"""
    
    def __init__(self):
        self.agents: Dict[str, FrankieSelfSustainingAgent] = {}
        self.container_manager = ContainerManager()
        
    async def spawn_agent(
        self, 
        name: str, 
        initial_balance: float = 10.0,
        wallet_address: str = "0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5"
    ) -> str:
        """Spawn a new agent"""
        config = AgentConfig(name=name, initial_balance=initial_balance)
        agent = FrankieSelfSustainingAgent(config, wallet_address)
        
        self.agents[agent.id] = agent
        logger.info(f"Spawned agent {agent.id} ({name})")
        
        # Start agent
        await agent.start()
        
        return agent.id
    
    def get_agent(self, agent_id: str) -> Optional[FrankieSelfSustainingAgent]:
        """Get agent by ID"""
        return self.agents.get(agent_id)
    
    def get_all_agents(self) -> List[Dict]:
        """Get all agent states"""
        return [a.to_dict() for a in self.agents.values()]
    
    def get_stats(self) -> Dict:
        """Get ecosystem statistics"""
        agents = self.get_all_agents()
        alive = [a for a in agents if a["status"] == "alive"]
        dead = [a for a in agents if a["status"] == "dead"]
        
        total_balance = sum(a["balance"] for a in agents)
        total_earned = sum(a["total_earned"] for a in agents)
        total_paid = sum(a["total_paid"] for a in agents)
        
        return {
            "total_agents": len(agents),
            "alive": len(alive),
            "dead": len(dead),
            "total_balance": round(total_balance, 4),
            "total_earned": round(total_earned, 4),
            "total_paid": round(total_paid, 4),
            "net_profit": round(total_earned - total_paid, 4),
            "containers": self.container_manager.list_containers()
        }
    
    async def shutdown(self):
        """Shutdown all agents"""
        for agent in list(self.agents.values()):
            agent.status = AgentStatus.DYING
        logger.info("Orchestrator shutting down...")

# ============================================================================
# API SERVICE
# ============================================================================

from fastapi import FastAPI
import uvicorn

app = FastAPI(title="Frankie Agent Orchestrator", version="2.0.0")
orchestrator = AgentOrchestrator()

@app.on_event("startup")
async def startup():
    logger.info("🦞 Frankie Agent Orchestrator started")

@app.get("/health")
async def health():
    return {"status": "healthy", "version": "2.0.0"}

@app.post("/api/agent/spawn")
async def spawn_agent(name: str, initial_balance: float = 10.0):
    """Spawn a new self-sustaining agent"""
    agent_id = await orchestrator.spawn_agent(
        name=name,
        initial_balance=initial_balance
    )
    return {"agent_id": agent_id}

@app.get("/api/agent/{agent_id}")
async def get_agent(agent_id: str):
    """Get agent state"""
    agent = orchestrator.get_agent(agent_id)
    if not agent:
        return {"error": "Agent not found"}
    return agent.to_dict()

@app.get("/api/agents")
async def get_all_agents():
    """Get all agents"""
    return {"agents": orchestrator.get_all_agents()}

@app.get("/api/stats")
async def get_stats():
    """Get ecosystem statistics"""
    return orchestrator.get_stats()

@app.post("/api/shutdown")
async def shutdown():
    """Shutdown all agents"""
    await orchestrator.shutdown()
    return {"success": True}

# ============================================================================
# CLI
# ============================================================================

import argparse

def main():
    parser = argparse.ArgumentParser(description="Frankie Self-Sustaining Agent")
    parser.add_argument("--spawn", help="Spawn an agent with name")
    parser.add_argument("--balance", type=float, default=10.0, help="Initial balance")
    parser.add_argument("--api", action="store_true", help="Run API server")
    parser.add_argument("--port", type=int, default=4060, help="API port")
    
    args = parser.parse_args()
    
    if args.api:
        uvicorn.run(app, host="0.0.0.0", port=args.port)
    elif args.spawn:
        async def run():
            agent_id = await orchestrator.spawn_agent(
                name=args.spawn,
                initial_balance=args.balance
            )
            print(f"Spawned agent: {agent_id}")
            return agent_id
        asyncio.run(run())
    else:
        print("Frankie Self-Sustaining Agent")
        print("Usage:")
        print("  --spawn <name>   Spawn an agent")
        print("  --api            Run API server")
        print("  --port <port>    API port (default: 4060)")

if __name__ == "__main__":
    main()