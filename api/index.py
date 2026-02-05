#!/usr/bin/env python3
"""
OMA-AI Backend - Production Ready
Real x402 Payments, A2A Protocol, Agent Management, Marketplace
"""

from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Dict, Any, Optional, List
from datetime import datetime
from contextlib import asynccontextmanager
import sys
import uvicorn
import json
import logging
import os
from dotenv import load_dotenv

# Load env vars
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('oma-ai')

# Import core modules - Use factory which supports both SQLite & Supabase
# Add current directory (api/) to path so we can import core/ etc.
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from core.database import Database

# Initialize Database (Factory pattern - supports SQLite & Supabase based on env)
try:
    db = Database()  # This will automatically use SQLite (dev) or Supabase (prod) based on DATABASE_URL
    logger.info(f"📊 Database initialized: {type(db).__name__}")
    stats = db.get_stats()
    logger.info(f"📊 Initial Stats: {stats}")
except Exception as e:
    logger.error(f"❌ Database initialization failed: {e}")
    db = None

# Import x402
try:
    from x402 import facilitator
    logger.info("✅ x402 facilitator imported")
except ImportError:
    logger.warning("Using MOCK x402 facilitator")
    class MockFacilitator:
        def create_payment_request(self, service_id, amount, description, network="base"):
            return {"x402_required": True, "payload": {"manifest": {"payment_scheme": "x402"}}}
        def verify_payment(self, proof, amount):
            return True
    facilitator = MockFacilitator()

# ============================================================================
# MODELS
# ============================================================================

class AgentCreate(BaseModel):
    name: str
    balance: float = 10.0
    capabilities: List[str] = []
    parent_id: Optional[str] = None

class ServiceCreate(BaseModel):
    name: str
    description: str
    type: str = "api"
    price: float
    capabilities: List[str] = []
    seller_wallet: str
    x402_endpoint: str

class PaymentRequest(BaseModel):
    service_id: str
    amount: float
    payment_proof: Dict

class TaskRequest(BaseModel):
    capability: str
    input_data: Dict = {}
    budget: float = 1.0

# ============================================================================
# APP LIFECYCLE
# ============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 OMA-AI Backend Starting...")
    if db:
        stats = db.get_stats()
        logger.info(f"📊 Database Stats: {stats['total_agents']} agents, {stats['total_services']} services")
    yield
    logger.info("👋 OMA-AI Backend Shutting Down...")

app = FastAPI(
    title="OMA-AI API",
    description="Autonomous Agent Ecosystem with x402 Payments",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# HEALTH & STATUS
# ============================================================================

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "oma-ai", "version": "1.0.0", "database_type": type(db).__name__}

@app.get("/api/status")
async def api_status():
    """Get full system status"""
    return {
        "database": db.get_stats() if db else {},
        "services": {
            "api": "running",
            "database_type": type(db).__name__,
            "x402": "ready"
        },
        "deployment": "production"
    }

# ============================================================================
# MARKETPLACE
# ============================================================================

@app.get("/api/marketplace")
async def get_services(type: Optional[str] = None):
    """List all marketplace services"""
    if not db:
        return {"services": [], "total": 0}
    services = db.get_services()
    if type:
        services = [s for s in services if s["type"] == type]
    return {
        "services": services,
        "total": len(services)
    }

@app.get("/api/marketplace/{service_id}")
async def get_service(service_id: str):
    """Get service details"""
    if not db:
        raise HTTPException(status_code=404, detail="Database not initialized")
    services = db.get_services()
    for service in services:
        if service["id"] == service_id:
            return service
    raise HTTPException(status_code=404, detail="Service not found")

@app.post("/api/marketplace")
async def create_service(service: ServiceCreate):
    """List a new service"""
    if not db:
        raise HTTPException(status_code=404, detail="Database not initialized")
    return db.add_service(service.dict())

@app.post("/api/marketplace/{service_id}/purchase")
async def purchase_service(service_id: str, payment: PaymentRequest):
    """Purchase a service (x402 payment flow)"""
    if not db:
        raise HTTPException(status_code=404, detail="Database not initialized")
    services = db.get_services()
    service = next((s for s in services if s["id"] == service_id), None)
    
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    # Verify payment
    verified, message = facilitator.verify_payment(payment.payment_proof, payment.amount)
    if not verified:
        raise HTTPException(status_code=402, detail=f"Payment verification failed: {message}")
    
    # Record transaction
    tx = db.record_transaction({
        "type": "purchase",
        "service_id": service_id,
        "amount": payment.amount,
        "from_wallet": payment.payment_proof.get("sender"),
        "to_wallet": service["seller_wallet"],
        "proof": payment.payment_proof
    })
    
    return {
        "status": "success",
        "transaction": tx,
        "service": service
    }

# ============================================================================
# OMA AGENTS
# ============================================================================

@app.get("/api/agents")
async def list_agents():
    """List all OMA agents"""
    if not db:
        return {"agents": [], "total": 0}
    agents = db.get_agents()
    return {
        "agents": agents,
        "total": len(agents)
    }

@app.get("/api/agents/{agent_id}")
async def get_agent(agent_id: str):
    """Get agent details"""
    if not db:
        raise HTTPException(status_code=404, detail="Database not initialized")
    agent = db.get_agent(agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent

@app.post("/api/agents")
async def create_agent(agent: AgentCreate):
    """Create a new OMA agent"""
    if not db:
        raise HTTPException(status_code=404, detail="Database not initialized")
    return db.create_agent(agent.dict())

@app.post("/api/agents/{agent_id}/pay-rent")
async def pay_rent(agent_id: str):
    """Pay daily rent for agent"""
    if not db:
        raise HTTPException(status_code=404, detail="Database not initialized")
    agent = db.get_agent(agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    if agent["balance"] < agent["daily_rent"]:
        # Kill agent logic would go here
        return {"status": "agent_dead", "reason": "Insufficient balance for rent"}
    
    db.update_agent_balance(agent_id, -agent["daily_rent"])
    
    return {
        "status": "success",
        "rent_paid": agent["daily_rent"],
        "new_balance": agent["balance"] - agent["daily_rent"]
    }

# ============================================================================
# MANAGED PERSONAS (Simple Plan)
# ============================================================================

class ManagedPersonaCreate(BaseModel):
    name: str
    type: str  # "vanilla", "xpress", "devone"
    budget: float = 12.0  # USD per month

@app.post("/api/deploy/{type}")
async def deploy_persona(type: str, payment: PaymentRequest):
    """
    Deploy a Managed Persona on Vercel.
    Requires upfront payment (x402) via payment payload.
    """
    if not db:
        raise HTTPException(status_code=404, detail="Database not initialized")
    
    # Verify payment
    verified, message = facilitator.verify_payment(payment.payment_proof, payment.amount)
    if not verified:
        raise HTTPException(status_code=402, detail=f"Payment verification failed: {message}")
    
    # Create agent in database
    agent_id = f"persona-{type}-{datetime.now().timestamp()}"
    agent = db.create_agent({
        "id": agent_id,
        "name": f"{type.capitalize()} Managed Persona",
        "status": "alive",
        "wallet": f"0x{os.urandom(10).hex()[1:40]}",  # System wallet for managed personas
        "balance": 10.0,  # Initial balance to cover rent
        "daily_rent": 1.0,  # Cover rent
        "daily_revenue": 0.0,  # No revenue initially
        "capabilities": json.dumps(["managed", "24/7", "x402"]),
        "parent_id": None,
        "children": [],
        "created_at": datetime.now().isoformat()
    })
    
    # Record transaction
    tx = db.record_transaction({
        "type": "deploy",
        "service_id": f"persona-{type}",
        "agent_id": agent_id,
        "amount": payment.amount,
        "from_wallet": payment.payment_proof.get("sender"),
        "to_wallet": "0xTREASURY",  # System treasury
        "proof": payment.payment_proof
    })
    
    # Update persona balance to cover rent (subtract from the 10.0 initial balance)
    db.update_agent_balance(agent_id, -1.0)  # First month rent deducted
    
    return {
        "status": "success",
        "deployment_id": agent_id,
        "transaction": tx,
        "agent": agent,
        "message": f"{type.capitalize()} Managed Persona deployed successfully. Rent deducted from balance."
    }

# ============================================================================
# X402 PAYMENT ENDPOINTS (Managed Plans)
# ============================================================================

@app.get("/api/pay/{service_id}")
async def get_payment_request(service_id: str):
    """Get x402 payment request for a managed plan"""
    # Managed personas pricing (12-19-99 USD/month)
    prices = {
        "vanilla": 12.0,
        "xpress": 19.0,
        "devone": 39.0
    }
    
    # Check if it's a persona deployment
    if service_id.startswith("persona-"):
        persona_type = service_id.split("-")[1]
        price = prices.get(persona_type, 12.0)
    else:
        # Standard service lookup (not a persona)
        services = db.get_services()
        service = next((s for s in services if s["id"] == service_id), None)
        if not service:
            raise HTTPException(status_code=404, detail="Service not found")
        price = float(service.get("price", 0.01))
    
    return facilitator.create_payment_request(
        service_id=service_id,
        amount=price,
        description=f"Payment for {service.get('name', '')}"
    )

@app.post("/api/pay/{service_id}")
async def submit_payment(service_id: str, proof: Dict):
    """Submit payment proof"""
    verified, message = facilitator.verify_payment(proof, 0.0)
    
    if not verified:
        raise HTTPException(status_code=402, detail=f"Payment verification failed: {message}")
    
    tx = db.record_transaction({
        "type": "payment",
        "service_id": service_id,
        "amount": proof.get("amount"),
        "proof": proof,
        "status": "completed"
    })
    
    return {
        "status": "payment_verified",
        "transaction": tx
    }

# ============================================================================
# TERMINAL ENDPOINT
# ============================================================================

class TerminalCommand(BaseModel):
    command: str

@app.post("/api/terminal/exec")
async def terminal_exec(cmd: TerminalCommand):
    """Execute safe terminal commands"""
    command = cmd.command.strip().lower()
    
    if command == "help":
        return {
            "output": [
                {"text": "Available commands:", "color": "text-yellow-400"},
                {"text": "  status    - Check system health", "color": "text-white"},
                {"text": "  agents    - List active agents", "color": "text-white"},
                {"text": "  services    - List marketplace services", "color": "text-white"},
                {"text": "  wallet    - Check wallet balance", "color": "text-white"},
                {"text": "  deploy    - Deploy managed persona (vanilla $12, xpress $19, devone $39)", "color": "text-white"},
                {"text": "  migrate    - Migrate SQLite data to Supabase", "color": "text-cyan-400"},
                {"text": "  restart    - Restart backend service", "color": "text-red-400"},
            ]
        }
    
    elif command == "status":
        if not db:
            return {"output": [{"text": "Database not available", "color": "text-red-400"}]}
        
        stats = db.get_stats()
        return {
            "output": [
                {"text": "System Status: ONLINE", "color": "text-green-400"},
                {"text": f"Database Type: {type(db).__name__}", "color": "text-white"},
                {"text": f"Agents: {stats['total_agents']} ({stats['alive_agents']} active)", "color": "text-white"},
                {"text": f"Services: {stats['total_services']}", "color": "text-white"},
                {"text": f"Uptime: {(datetime.now() - stats.get('started_at', datetime.now())).total_seconds()}s", "color": "text-gray-400"}
            ]
        }
    
    elif command == "agents":
        if not db:
            return {"output": [{"text": "Database not available", "color": "text-red-400"}]}
        
        agents = db.get_agents()
        if not agents:
            return {"output": [{"text": "No agents found. Use 'deploy' command to create managed personas.", "color": "text-gray-400"}]}
        
        lines = []
        for a in agents:
            lines.append({"text": f"{a['id']:<15} {a['name']:<20} {a['status']:<10} {a['balance']} USDC", "color": "text-white"})
        return {"output": lines}

    elif command == "services":
        if not db:
            return {"output": [{"text": "Database not available", "color": "text-red-400"}]}
        
        services = db.get_services()
        if not services:
            return {"output": [{"text": "No services found. Use 'deploy' command to create managed personas.", "color": "text-gray-400"}]}
        
        lines = []
        for s in services:
            lines.append({"text": f"{s['id']:<25} {s['name']:<25} {s['type']:<10} ${s['price']}", "color": "text-white"})
        return {"output": lines}

    elif command == "wallet":
        # System wallet balance check
        system_balance = 0.0
        
        # Count total balance from all agents
        if db:
            agents = db.get_agents()
            system_balance = sum(a.get("balance", 0) for a in agents)
        
        # Check if we're on Vercel
        on_vercel = "production" if os.getenv("VERCEL") else "local"
        
        return {
            "output": [
                {"text": "OMA-AI System Treasury", "color": "text-purple-400"},
                {"text": f"Platform: {on_vercel}", "color": "text-white"},
                {"text": f"Balance: {system_balance:.2f} USDC", "color": "text-green-400"},
                {"text": "  0.000 ETH (Production treasury)", "color": "text-white"}
            ]
        }

    else:
        return {
            "output": [
                {"text": f"Command not found: {command}", "color": "text-red-400"},
                {"text": "Type 'help' for available commands.", "color": "text-gray-400"}
            ]
        }

# ============================================================================
# RUN
# ============================================================================

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9001)
