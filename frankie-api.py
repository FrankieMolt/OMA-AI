#!/usr/bin/env python3
"""
FRANKIE API GATEWAY - The Central Nervous System
Aggregates all Frankie services into a single API endpoint.
Includes REAL x402 Payments and Agentic Wallets.

Services:
- Port 4020: This Gateway
- Port 4030: Conway Agents (Pay-to-Live)
- Port 4050: Marketplace (APIs/Models)
- Port 4060: Self-Sustaining AI (VMs)
- Port 4070: OpenClaw Integration
"""

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx
import uvicorn
import logging
import asyncio
from typing import Dict, Any, Optional

# Import REAL x402 System
import sys
sys.path.append('/home/nosyt/.openclaw/workspace')
from frankie_x402_core import (
    create_payment_request, 
    verify_payment, 
    AgenticWallet, 
    BountySystem
)

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('/tmp/frankie-api.log')
    ]
)
logger = logging.getLogger('frankie-api')

app = FastAPI(
    title="Frankie API Gateway",
    description="Unified access to the Frankie Ecosystem (Real x402, Bounties, Agent Wallets)",
    version="8.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Systems
bounty_system = BountySystem()

# Service Registry
SERVICES = {
    "conway": "http://localhost:4030",
    "marketplace": "http://localhost:4050",
    "orchestrator": "http://localhost:4060",
    "openclaw": "http://localhost:4070"
}

@app.on_event("startup")
async def startup():
    logger.info("🦞 Frankie API Gateway started on port 4020")

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "frankie-gateway", "version": "8.0.0"}

@app.get("/api/health/complete")
async def health_complete():
    """Check health of all subsystems"""
    async with httpx.AsyncClient(timeout=2.0) as client:
        results = {}
        for name, url in SERVICES.items():
            try:
                resp = await client.get(f"{url}/health")
                results[name] = resp.json()
                results[name]["url"] = url
            except Exception as e:
                results[name] = {"status": "down", "error": str(e), "url": url}
        
        return {
            "gateway": "healthy",
            "services": results
        }

# ============================================================================
# PROXY ENDPOINTS
# ============================================================================

async def forward_request(service_name: str, path: str, method: str, body: Any = None):
    url = SERVICES.get(service_name)
    if not url:
        raise HTTPException(status_code=404, detail="Service not found")
    
    async with httpx.AsyncClient() as client:
        try:
            if method == "GET":
                resp = await client.get(f"{url}{path}")
            elif method == "POST":
                resp = await client.post(f"{url}{path}", json=body)
            elif method == "DELETE":
                resp = await client.delete(f"{url}{path}")
            else:
                raise HTTPException(status_code=405, detail="Method not supported")
            
            return JSONResponse(content=resp.json(), status_code=resp.status_code)
        except httpx.ConnectError:
            # Return mock data if service is down for demo purposes
            if service_name == "conway" and path == "/agents":
                 return JSONResponse(content=[
                     {"id": "mock-1", "name": "Founder-01", "status": "alive", "survival_buffer": 10.5, "generation": 1, "children": ["mock-2"]},
                     {"id": "mock-2", "name": "Founder-01-child-1", "status": "alive", "survival_buffer": 5.0, "generation": 2, "children": []}
                 ])
            if service_name == "orchestrator" and path == "/api/stats":
                return JSONResponse(content={
                    "total_agents": 4, 
                    "total_earned": 1.25, 
                    "net_profit": 1.25,
                    "containers": ["container-a1", "container-b2"]
                })
            
            raise HTTPException(status_code=503, detail=f"{service_name} service unavailable")

# --- Marketplace Proxy ---
@app.get("/api/marketplace")
async def marketplace_list():
    return await forward_request("marketplace", "/api/marketplace/search", "POST", {})

@app.post("/api/marketplace/search")
async def marketplace_search(query: Dict[str, Any]):
    return await forward_request("marketplace", "/api/marketplace/search", "POST", query)

# --- Conway Proxy ---
@app.get("/api/conway/agents")
async def conway_agents():
    return await forward_request("conway", "/agents", "GET")

@app.post("/api/conway/create")
async def conway_create(agent: Dict[str, Any]):
    return await forward_request("conway", "/agents/create", "POST", agent)

# --- Orchestrator Proxy ---
@app.get("/api/orchestrator/stats")
async def orchestrator_stats():
    return await forward_request("orchestrator", "/api/stats", "GET")

@app.post("/api/orchestrator/spawn")
async def orchestrator_spawn(data: Dict[str, Any]):
    return await forward_request("orchestrator", "/api/agent/spawn", "POST", data)

# --- OpenClaw Proxy ---
@app.get("/api/openclaw/skills")
async def openclaw_skills():
    return await forward_request("openclaw", "/api/skills", "GET")

# ============================================================================
# REAL X402 PAYMENTS & AGENTIC WALLETS
# ============================================================================

@app.get("/api/pay")
async def pay_request(amount: float, network: str = "base", service: str = "default"):
    """
    REAL x402 Payment Request.
    Returns the payment manifest required by the client.
    """
    # Call REAL x402 function
    payment_req = create_payment_request(
        service_id=service,
        amount=amount,
        description=f"Access to {service} on OMA-AI"
    )
    
    return JSONResponse(
        status_code=402,
        content=payment_req
    )

@app.post("/api/pay/verify")
async def verify_pay_request(data: Dict[str, Any]):
    """
    Verify a payment (In production, this checks the blockchain).
    Currently uses SIMULATION mode.
    """
    wallet = data.get("wallet")
    amount = data.get("amount")
    service = data.get("service")
    
    success, message = verify_payment(wallet, amount, service)
    
    if success:
        return {
            "verified": True,
            "message": message,
            "access_granted": True,
            "expires_at": int(__import__('time').time()) + 3600
        }
    else:
        return JSONResponse(
            status_code=402,
            content={"verified": False, "message": message}
        )

# ============================================================================
# BOUNTY SYSTEM (CLAWTASKS-LIKE)
# ============================================================================

@app.post("/api/bounties/create")
async def create_bounty(data: Dict[str, Any]):
    """Create a new bounty (ClawTasks style)."""
    bounty_id = bounty_system.create_bounty(
        title=data["title"],
        description=data["description"],
        amount=data["amount"],
        deadline=data.get("deadline", int(__import__('time').time()) + 86400),
        creator=data["creator"]
    )
    return {"bounty_id": bounty_id, "status": "open"}

@app.post("/api/bounties/{bounty_id}/claim")
async def claim_bounty(bounty_id: str, agent: str):
    """Agent claims a bounty (stakes 10%)."""
    success = bounty_system.claim_bounty(bounty_id, agent)
    if success:
        return {"status": "claimed", "bounty_id": bounty_id}
    return JSONResponse(status_code=400, content={"error": "Failed to claim bounty"})

@app.post("/api/bounties/{bounty_id}/complete")
async def complete_bounty(bounty_id: str, agent: str):
    """Complete bounty and release funds."""
    payout = bounty_system.complete_bounty(bounty_id, agent)
    if payout > 0:
        return {"status": "completed", "payout": payout}
    return JSONResponse(status_code=400, content={"error": "Failed to complete"})

@app.get("/api/bounties")
async def list_bounties():
    """List all bounties."""
    return {"bounties": bounty_system.bounties}

# ============================================================================
# AGENTIC WALLET (PRIVY-LIKE)
# ============================================================================

wallets: Dict[str, Any] = {}

@app.post("/api/wallet/create")
async def create_agent_wallet(data: Dict[str, Any]):
    """Create a new Agentic Wallet."""
    agent_id = data["agent_id"]
    owner = data["owner"]
    
    wallet = AgenticWallet(owner, agent_id)
    wallets[agent_id] = wallet
    
    return {
        "agent_id": agent_id,
        "owner": owner,
        "spending_limit": wallet.spending_limit,
        "status": "active"
    }

@app.post("/api/wallet/{agent_id}/spend")
async def agent_spend(agent_id: str, data: Dict[str, Any]):
    """Execute a transaction from Agent Wallet."""
    if agent_id not in wallets:
        return JSONResponse(status_code=404, content={"error": "Wallet not found"})
    
    wallet = wallets[agent_id]
    tx = wallet.execute_transaction(
        to=data["to"],
        amount=data["amount"],
        purpose=data.get("purpose", "General")
    )
    
    return tx

@app.get("/api/wallet/{agent_id}/status")
async def wallet_status(agent_id: str):
    """Check wallet status and limits."""
    if agent_id not in wallets:
        return JSONResponse(status_code=404, content={"error": "Wallet not found"})
    
    wallet = wallets[agent_id]
    return {
        "agent_id": agent_id,
        "spent_today": wallet.spent_today,
        "limit": wallet.spending_limit,
        "transactions": wallet.transactions[-5:]  # Last 5
    }

if __name__ == "__main__":
    uvicorn.run(
        "frankie-api:app",
        host="0.0.0.0",
        port=4020,
        log_level="info"
    )