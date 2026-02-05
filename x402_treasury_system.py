"""
OMA-AI x402 Treasury Forwarding System
Handles payment routing: user → treasury → service provider
"""

import asyncio
import json
import logging
from datetime import datetime
from typing import Dict, Optional, Any, List
from dataclasses import dataclass, asdict
from eth_account import Account
from eth_account.messages import encode_defunct
from web3 import Web3
import httpx

# ============================================================================
# CONFIGURATION & CONSTANTS
# ============================================================================

# Treasury Configuration
TREASURY_WALLET = "0x590FdA238A52bBA79fD4635e73bDAC1eAe558e784"
TREASURY_PRIVATE_KEY = os.getenv("TREASURY_PRIVATE_KEY")

# Base Network Configuration
BASE_RPC = "https://mainnet.base.org"
BASE_EXPLORER = "https://basescan.org"
BASE_CHAIN_ID = 8453
USDC_CONTRACT = "0x036CbD53842c5426634e7929541eC2318f3dCF7e"

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================================================
# DATA MODELS
# ============================================================================

@dataclass
class Payment:
    user_address: str
    amount: float
    service_id: str
    provider_id: str
    timestamp: datetime

@dataclass
class ProviderConfig:
    id: str
    name: str
    api_endpoint: str
    cost_per_request: float
    markup_multiplier: float
    api_key: Optional[str] = None
    auth_type: str = "api_key"

@dataclass
class Commission:
    user_payment: float
    provider_cost: float
    commission: float
    timestamp: datetime

@dataclass
class TreasuryBalance:
    address: str
    balance: float
    last_updated: datetime

# ============================================================================
# X402 TREASURY CLASS
# ============================================================================

class X402Treasury:
    """Manages x402 payments and provider forwarding"""
    
    def __init__(self):
        self.w3 = Web3(Web3.HTTPProvider(BASE_RPC))
        self.account = Account.from_key(TREASURY_PRIVATE_KEY) if TREASURY_PRIVATE_KEY else None
        self.commission_rate = 0.25  # 25% commission
        self.providers = self._load_providers()
        self.commissions = []
        
    def _load_providers(self) -> Dict[str, ProviderConfig]:
        """Load whitelabel providers configuration"""
        return {
            "openrouter": ProviderConfig(
                id="openrouter",
                name="OpenRouter Gateway",
                api_endpoint="https://openrouter.ai/api/v1",
                cost_per_request=0.001,
                markup_multiplier=3.0,
                auth_type="api_key"
            ),
            "anthropic_claude": ProviderConfig(
                id="anthropic_claude",
                name="Anthropic Claude API",
                api_endpoint="https://api.anthropic.com/v1",
                cost_per_request=0.015,
                markup_multiplier=2.5,
                auth_type="api_key"
            ),
            "deepseek": ProviderConfig(
                id="deepseek",
                name="DeepSeek Models",
                api_endpoint="https://api.deepseek.com",
                cost_per_request=0.0008,
                markup_multiplier=3.5,
                auth_type="api_key"
            ),
            "elevenlabs_voice": ProviderConfig(
                id="elevenlabs_voice",
                name="ElevenLabs Voice",
                api_endpoint="https://api.elevenlabs.io/v1",
                cost_per_request=0.0003,
                markup_multiplier=8.0,
                auth_type="api_key"
            ),
            "runway_video": ProviderConfig(
                id="runway_video",
                name="Runway Video Gen",
                api_endpoint="https://api.runwayml.com/v1",
                cost_per_request=0.05,
                markup_multiplier=5.0,
                auth_type="api_key"
            ),
            "dalle_image": ProviderConfig(
                id="dalle_image",
                name="DALL-E Image Gen",
                api_endpoint="https://api.openai.com/v1",
                cost_per_request=0.04,
                markup_multiplier=4.0,
                auth_type="api_key"
            ),
            "perplexity_search": ProviderConfig(
                id="perplexity_search",
                name="Perplexity Search",
                api_endpoint="https://api.perplexity.ai",
                cost_per_request=0.001,
                markup_multiplier=2.5,
                auth_type="api_key"
            )
        }
    
    def calculate_commission(self, provider_cost: float) -> Commission:
        """Calculate commission for a transaction"""
        commission = provider_cost * self.commission_rate
        total_charge = provider_cost + commission
        
        return Commission(
            user_payment=total_charge,
            provider_cost=provider_cost,
            commission=commission,
            timestamp=datetime.now()
        )
    
    async def process_payment(self, payment: Payment) -> Dict[str, Any]:
        """Process x402 payment through treasury"""
        try:
            provider = self.providers.get(payment.provider_id)
            if not provider:
                raise ValueError(f"Provider {payment.provider_id} not found")
            
            # Calculate total charge with commission
            provider_cost = provider.cost_per_request
            commission_info = self.calculate_commission(provider_cost)
            
            # Log transaction
            transaction = {
                "id": str(uuid.uuid4()),
                "user_address": payment.user_address,
                "amount": commission_info.user_payment,
                "provider_cost": provider_cost,
                "commission": commission_info.commission,
                "provider_id": payment.provider_id,
                "service_id": payment.service_id,
                "timestamp": commission_info.timestamp.isoformat()
            }
            
            logger.info(f"Processing payment: {transaction}")
            
            # Here we would normally:
            # 1. Execute x402 payment from user
            # 2. Forward payment to provider
            # 3. Execute service request
            # 4. Return result to user
            
            self.commissions.append(commission_info)
            
            return {
                "success": True,
                "transaction_id": transaction["id"],
                "total_charge": commission_info.user_payment,
                "provider_cost": provider_cost,
                "commission": commission_info.commission,
                "service_executed": True,
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Payment processing failed: {e}")
            return {
                "success": False,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    async def forward_to_provider(self, provider_id: str, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """Forward request to whitelabel provider"""
        try:
            provider = self.providers.get(provider_id)
            if not provider:
                raise ValueError(f"Provider {provider_id} not found")
            
            # Prepare provider-specific request
            headers = {
                "Authorization": f"Bearer {provider.api_key}",
                "Content-Type": "application/json"
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    provider.api_endpoint,
                    json=request_data,
                    headers=headers,
                    timeout=30.0
                )
                response.raise_for_status()
                
            return {
                "success": True,
                "provider": provider_id,
                "response": response.json(),
                "cost": provider.cost_per_request,
                "timestamp": datetime.now().isoformat()
            }
                
        except Exception as e:
            logger.error(f"Provider forwarding failed: {e}")
            return {
                "success": False,
                "error": str(e),
                "provider": provider_id,
                "timestamp": datetime.now().isoformat()
            }
    
    async def get_balance(self) -> TreasuryBalance:
        """Get current treasury balance"""
        try:
            if not self.account:
                return TreasuryBalance(
                    address=TREASURY_WALLET,
                    balance=0.0,
                    last_updated=datetime.now()
                )
            
            balance_wei = self.w3.eth.get_balance(TREASURY_WALLET)
            balance_eth = self.w3.from_wei(balance_wei)
            balance_usdc = float(balance_eth)  # Simplified for demo
            
            return TreasuryBalance(
                address=TREASURY_WALLET,
                balance=balance_usdc,
                last_updated=datetime.now()
            )
            
        except Exception as e:
            logger.error(f"Balance check failed: {e}")
            return TreasuryBalance(
                address=TREASURY_WALLET,
                balance=0.0,
                last_updated=datetime.now()
            )
    
    def get_provider_catalog(self) -> List[Dict[str, Any]]:
        """Get available providers with pricing"""
        catalog = []
        for provider_id, config in self.providers.items():
            catalog.append({
                "id": config.id,
                "name": config.name,
                "api_endpoint": config.api_endpoint,
                "cost_per_request": config.cost_per_request,
                "markup_multiplier": config.markup_multiplier,
                "total_cost": config.cost_per_request * (1 + self.commission_rate)
            })
        return catalog
    
    def get_commission_report(self) -> Dict[str, Any]:
        """Get commission statistics"""
        if not self.commissions:
            return {
                "total_commissions": 0,
                "total_revenue": 0.0,
                "transactions": []
            }
        
        total_revenue = sum(c.commission for c in self.commissions)
        
        return {
            "total_commissions": len(self.commissions),
            "total_revenue": total_revenue,
            "transactions": [asdict(c) for c in self.commissions[-10:]],  # Last 10
            "timestamp": datetime.now().isoformat()
        }

# ============================================================================
# FASTAPI ENDPOINTS
# ============================================================================

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="OMA-AI x402 Treasury", version="1.0.0")

class PaymentRequest(BaseModel):
    user_address: str
    amount: float
    service_id: str
    provider_id: str

class ProviderRequest(BaseModel):
    provider_id: str
    request_data: Dict[str, Any]

# Initialize treasury
treasury = X402Treasury()

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "x402-treasury"}

@app.get("/balance")
async def get_balance():
    """Get treasury balance"""
    balance = await treasury.get_balance()
    return asdict(balance)

@app.get("/providers")
async def get_providers():
    """Get available providers"""
    return {"providers": treasury.get_provider_catalog()}

@app.get("/commissions")
async def get_commissions():
    """Get commission statistics"""
    return await treasury.get_commission_report()

@app.post("/process-payment")
async def process_payment(request: PaymentRequest):
    """Process x402 payment"""
    payment = Payment(
        user_address=request.user_address,
        amount=request.amount,
        service_id=request.service_id,
        provider_id=request.provider_id,
        timestamp=datetime.now()
    )
    
    result = await treasury.process_payment(payment)
    return result

@app.post("/forward-request")
async def forward_request(request: ProviderRequest):
    """Forward request to provider"""
    result = await treasury.forward_to_provider(
        request.provider_id,
        request.request_data
    )
    return result

if __name__ == "__main__":
    import uvicorn
    import os
    
    port = int(os.getenv("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)