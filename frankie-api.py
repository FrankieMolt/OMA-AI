#!/usr/bin/env python3
"""
FRANKIE API GATEWAY - The Central Nervous System
Aggregates all Frankie services into a single API endpoint.

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
    description="Unified access to the Frankie Ecosystem",
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
# X402 PAYMENT SIMULATOR (for now)
# ============================================================================

@app.get("/api/pay")
async def pay_request(amount: float, network: str = "base"):
    """Simulate 402 Payment Required"""
    return JSONResponse(
        status_code=402,
        content={
            "error": "Payment Required",
            "x402_version": "1.0",
            "amount": amount * 1.01,  # Add fee
            "network": network,
            "wallet_address": "0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5"
        }
    )

if __name__ == "__main__":
    uvicorn.run(
        "frankie-api:app",
        host="0.0.0.0",
        port=4020,
        log_level="info"
    )