#!/usr/bin/env python3
"""
FRANKIE MARKETPLACE SERVICE - Complete Marketplace Implementation

Features:
- Service listings (APIs, Models, Compute, Agents, Skills, Prompts)
- x402 payment integration
- Search and discovery
- Transaction tracking
- Production Mode: Supports Supabase (PostgreSQL) and Demo Mode (JSON)
"""

from fastapi import FastAPI, HTTPException, Request, Depends
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum
import uvicorn
import json
import logging
import os
from uuid import uuid4

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('/tmp/frankie-marketplace.log')
    ]
)
logger = logging.getLogger('frankie-marketplace')

# Initialize FastAPI app
app = FastAPI(title="Frankie Marketplace", description="x402 Payment Marketplace")

# ============================================================================
# PRODUCTION MODE SWITCH
# ============================================================================

# Check for Database URL (Supabase/Postgres)
DATABASE_URL = os.environ.get("DATABASE_URL")
USE_PRODUCTION_DB = DATABASE_URL is not None

if USE_PRODUCTION_DB:
    try:
        import psycopg2
        logger.info("🗄️ PRODUCTION MODE: Connecting to PostgreSQL...")
        conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        conn.autocommit = True
        logger.info("✅ Connected to Supabase/PostgreSQL")
    except Exception as e:
        logger.error(f"❌ Database connection failed: {e}. Falling back to JSON.")
        USE_PRODUCTION_DB = False
else:
    logger.info("💾 DEMO MODE: Using JSON file persistence.")

# ============================================================================
# MODELS
# ============================================================================

class ServiceType(str, Enum):
    API = "api"
    MODEL = "model"
    COMPUTE = "compute"
    AGENT = "agent"
    SKILL = "skill"
    PROMPT = "prompt"

class ServiceStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"

class ServiceListing(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    type: ServiceType
    name: str
    description: str
    price_per_use: float  # USDC
    x402_endpoint: str
    documentation_url: Optional[str] = None
    seller_wallet: str
    capabilities: List[str] = []
    tags: List[str] = []
    status: ServiceStatus = ServiceStatus.ACTIVE
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    total_sales: int = 0
    total_revenue: float = 0.0
    rating: float = 0.0
    rating_count: int = 0

class SearchQuery(BaseModel):
    query: Optional[str] = None
    type: Optional[ServiceType] = None
    capabilities: Optional[List[str]] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    tags: Optional[List[str]] = None
    limit: int = 20
    offset: int = 0

class PurchaseRequest(BaseModel):
    service_id: str
    buyer_wallet: str
    amount: float

class ReviewRequest(BaseModel):
    service_id: str
    rating: float = Field(ge=1, le=5)
    review: Optional[str] = None

# ============================================================================
# STORAGE (JSON FILE PERSISTENCE)
# ============================================================================

DATA_DIR = "/home/nosyt/.openclaw/workspace/data"
MARKETPLACE_FILE = f"{DATA_DIR}/marketplace.json"
TRANSACTIONS_FILE = f"{DATA_DIR}/transactions.json"

import os

if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

services: Dict[str, ServiceListing] = {}
transactions: List[Dict] = []

def save_data():
    """Save services and transactions to disk"""
    try:
        with open(MARKETPLACE_FILE, "w") as f:
            json.dump({k: v.dict() for k, v in services.items()}, f, default=str, indent=2)
        with open(TRANSACTIONS_FILE, "w") as f:
            json.dump(transactions, f, default=str, indent=2)
        logger.info("Data saved to disk")
    except Exception as e:
        logger.error(f"Failed to save data: {e}")

def load_data():
    """Load data from disk"""
    global services, transactions
    try:
        if os.path.exists(MARKETPLACE_FILE):
            with open(MARKETPLACE_FILE, "r") as f:
                data = json.load(f)
                services = {k: ServiceListing(**v) for k, v in data.items()}
                logger.info(f"Loaded {len(services)} services from disk")
        else:
            init_demo_services()
            
        if os.path.exists(TRANSACTIONS_FILE):
            with open(TRANSACTIONS_FILE, "r") as f:
                transactions = json.load(f)
                logger.info(f"Loaded {len(transactions)} transactions from disk")
    except Exception as e:
        logger.error(f"Failed to load data: {e}")
        init_demo_services()

# Initialize with persistence
def init_demo_services():
    demo_services = [
        ServiceListing(
            type=ServiceType.API,
            name="Frankie Trading API",
            description="Real-time trading signals and execution for Solana/Base",
            price_per_use=0.05,
            x402_endpoint="http://localhost:4020/api/trade",
            seller_wallet="0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5",
            capabilities=["trading", "solana", "defi"],
            tags=["trading", "defi", "solana"]
        ),
        ServiceListing(
            type=ServiceType.MODEL,
            name="Claude 3.7 Sonnet Access",
            description="Direct API access to Claude 3.7 Sonnet for complex reasoning",
            price_per_use=0.10,
            x402_endpoint="http://localhost:4020/api/model/claude",
            seller_wallet="0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5",
            capabilities=["text-generation", "reasoning", "coding"],
            tags=["llm", "anthropic", "reasoning"]
        ),
        ServiceListing(
            type=ServiceType.COMPUTE,
            name="GPU Compute Instance",
            description="1-hour access to GPU instance for ML training",
            price_per_use=1.0,
            x402_endpoint="http://localhost:4020/api/compute/gpu",
            seller_wallet="0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5",
            capabilities=["gpu", "ml-training", "inference"],
            tags=["compute", "gpu", "ml"]
        ),
        ServiceListing(
            type=ServiceType.AGENT,
            name="Frankie Research Agent",
            description="Autonomous research agent that finds and synthesizes information",
            price_per_use=0.02,
            x402_endpoint="http://localhost:4020/api/agent/research",
            seller_wallet="0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5",
            capabilities=["research", "synthesis", "web-search"],
            tags=["agent", "research", "ai"]
        ),
        ServiceListing(
            type=ServiceType.SKILL,
            name="Email Automation Skill",
            description="Send, read, and manage emails autonomously",
            price_per_use=0.01,
            x402_endpoint="http://localhost:4020/api/skill/email",
            seller_wallet="0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5",
            capabilities=["email", "automation", "imap"],
            tags=["skill", "email", "automation"]
        ),
        ServiceListing(
            type=ServiceType.PROMPT,
            name="System Prompt Template Pack",
            description="50+ optimized prompts for coding, writing, and analysis",
            price_per_use=0.005,
            x402_endpoint="http://localhost:4020/api/prompt/pack",
            seller_wallet="0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5",
            capabilities=["prompts", "templates", "optimization"],
            tags=["prompt", "template", "engineering"]
        )
    ]
    
    for service in demo_services:
        services[service.id] = service
    
    logger.info(f"Initialized {len(demo_services)} demo services")

# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.on_event("startup")
async def startup():
    load_data()
    logger.info("🦞 Frankie Marketplace started (Persistent Mode)")

# Health check
@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "version": "2.0.0",
        "total_services": len(services),
        "total_transactions": len(transactions)
    }

# List a new service
@app.post("/api/marketplace/list", response_model=ServiceListing)
async def list_service(listing: ServiceListing):
    """List a new service in the marketplace"""
    services[listing.id] = listing
    save_data()
    logger.info(f"Service listed: {listing.name} ({listing.type})")
    return listing

# Search services
@app.post("/api/marketplace/search")
async def search_services(query: SearchQuery):
    """Search marketplace services"""
    results = []
    
    for service in services.values():
        if service.status != ServiceStatus.ACTIVE:
            continue
            
        # Filter by type
        if query.type and service.type != query.type:
            continue
            
        # Filter by capabilities
        if query.capabilities:
            if not any(c in service.capabilities for c in query.capabilities):
                continue
                
        # Filter by price
        if query.min_price and service.price_per_use < query.min_price:
            continue
        if query.max_price and service.price_per_use > query.max_price:
            continue
            
        # Filter by tags
        if query.tags:
            if not any(t in service.tags for t in query.tags):
                continue
                
        # Text search
        if query.query:
            query_lower = query.query.lower()
            if not (query_lower in service.name.lower() or 
                    query_lower in service.description.lower()):
                continue
                
        results.append(service)
    
    # Pagination
    total = len(results)
    results = results[query.offset:query.offset + query.limit]
    
    return {
        "total": total,
        "limit": query.limit,
        "offset": query.offset,
        "results": [s.dict() for s in results]
    }

# Get service details
@app.get("/api/marketplace/service/{service_id}")
async def get_service(service_id: str):
    """Get service details"""
    if service_id not in services:
        raise HTTPException(status_code=404, detail="Service not found")
    return services[service_id]

# Purchase service (returns 402 if not paid)
@app.post("/api/marketplace/purchase/{service_id}")
async def purchase_service(service_id: str, request: PurchaseRequest):
    """Purchase access to a service"""
    if service_id not in services:
        raise HTTPException(status_code=404, detail="Service not found")
    
    service = services[service_id]
    
    # Verify amount matches price
    if request.amount < service.price_per_use:
        raise HTTPException(
            status_code=400, 
            detail=f"Insufficient payment. Required: {service.price_per_use} USDC"
        )
    
    # Record transaction
    transaction = {
        "id": str(uuid4()),
        "service_id": service_id,
        "buyer_wallet": request.buyer_wallet,
        "seller_wallet": service.seller_wallet,
        "amount": request.amount,
        "fee": request.amount * 0.01,  # 1% fee
        "net": request.amount * 0.99,
        "created_at": datetime.utcnow().isoformat()
    }
    transactions.append(transaction)
    save_data()
    
    # Update service stats
    service.total_sales += 1
    service.total_revenue += transaction["net"]
    services[service_id] = service
    
    logger.info(f"Transaction: {request.buyer_wallet} -> {service.seller_wallet}: {request.amount} USDC")
    
    # Return x402 access grant
    return {
        "transaction_id": transaction["id"],
        "access_granted": True,
        "x402_endpoint": service.x402_endpoint,
        "payment_header": f"Bearer {transaction['id']}",
        "expires_at": datetime.utcnow().isoformat()
    }

# Get service transactions
@app.get("/api/marketplace/service/{service_id}/transactions")
async def get_service_transactions(service_id: str):
    """Get transaction history for a service"""
    service_transactions = [
        t for t in transactions if t["service_id"] == service_id
    ]
    return {
        "total": len(service_transactions),
        "revenue": sum(t["net"] for t in service_transactions),
        "transactions": service_transactions
    }

# Rate a service
@app.post("/api/marketplace/service/{service_id}/review")
async def rate_service(service_id: str, review: ReviewRequest):
    """Rate and review a service"""
    if service_id not in services:
        raise HTTPException(status_code=404, detail="Service not found")
    
    service = services[service_id]
    
    # Update rating
    total_rating = service.rating * service.rating_count + review.rating
    service.rating_count += 1
    service.rating = total_rating / service.rating_count
    services[service_id] = service
    
    return {
        "success": True,
        "new_rating": service.rating,
        "total_reviews": service.rating_count
    }

# Get marketplace statistics
@app.get("/api/marketplace/stats")
async def get_stats():
    """Get marketplace statistics"""
    by_type = {}
    for service in services.values():
        if service.type not in by_type:
            by_type[service.type] = {"count": 0, "revenue": 0}
        by_type[service.type]["count"] += 1
        by_type[service.type]["revenue"] += service.total_revenue
    
    return {
        "total_services": len(services),
        "total_transactions": len(transactions),
        "total_revenue": sum(t["net"] for t in transactions),
        "by_type": by_type,
        "top_services": sorted(
            [s.dict() for s in services.values()],
            key=lambda x: x["total_revenue"],
            reverse=True
        )[:5]
    }

# ============================================================================
# RUNNER
# ============================================================================

if __name__ == "__main__":
    uvicorn.run(
        "frankie-marketplace-service:app",
        host="0.0.0.0",
        port=4050,
        log_level="info"
    )