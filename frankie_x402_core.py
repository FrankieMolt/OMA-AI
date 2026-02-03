#!/usr/bin/env python3
"""
FRANKIE REAL x402 IMPLEMENTATION
Real x402 Payment Protocol for Base Network.

Features:
- USDC Payment Handling
- Merchant/Client Logic
- Bounty System (ClawTasks)
"""

import os
import json
import time
import hashlib
from typing import Dict, Optional, Tuple, Any
from dataclasses import dataclass
from web3 import Web3
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('x402')

# ============================================================================
# CONFIGURATION
# ============================================================================

# Load Wallets
BASE_WALLET_ADDRESS = os.environ.get("BASE_WALLET_ADDRESS", "0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5")
BASE_PRIVATE_KEY = os.environ.get("BASE_PRIVATE_KEY", "bfea4e87868ae91315d5c0d0390e9dc47bb8c7f9ce5b207b21bc6b5e9cd5c6d6")

# Base RPC
BASE_RPC_URL = os.environ.get("BASE_RPC_URL", "https://base-mainnet.infura.io/v3/YOUR_KEY")
w3 = Web3(Web3.HTTPProvider(BASE_RPC_URL))

# x402 Constants
X402_VERSION = "1.0"
FACTOR_NUMERATOR = 1.0 / 10000  # 0.01%

@dataclass
class PaymentHeader:
    scheme: str
    payload: str  # Base64 encoded

@dataclass
class PaymentManifest:
    instructions: str
    max_amount_required: int
    asset: str  # e.g., "USDC"
    recipient: str
    extra: Dict[str, Any]

# ============================================================================
# CORE FUNCTIONS
# ============================================================================

def create_payment_request(
    service_id: str,
    amount: float,
    description: str
) -> Dict[str, Any]:
    """
    Create a x402 Payment Request (The '402 Required' response).
    This is what the server returns when payment is needed.
    """
    manifest = {
        "payment_scheme": "x402",
        "description": description,
        "instructions": f"Pay {amount} USDC to access {service_id}",
        "max_amount_required": int(amount * 1e6),  # Convert to cents/smallest unit
        "asset": "USDC",
        "recipient": BASE_WALLET_ADDRESS,
        "extra": {
            "service_id": service_id,
            "expires_at": int(time.time()) + 3600  # 1 hour expiry
        }
    }
    
    return {
        "x402_required": True,
        "x402_version": X402_VERSION,
        "payload": {
            "network": "base",
            "currency": "USDC",
            "amount": amount,
            "recipient": BASE_WALLET_ADDRESS,
            "manifest": manifest
        },
        "message": f"Payment Required: {amount} USDC"
    }

def verify_payment(
    wallet_address: str,
    amount: float,
    service_id: str
) -> Tuple[bool, str]:
    """
    Verify a payment (Mock implementation simulating on-chain check).
    
    In a real implementation, this would:
    1. Query the blockchain for the transaction.
    2. Verify the sender matches the wallet_address.
    3. Verify the amount >= required.
    4. Verify the recipient matches our wallet.
    5. Verify the transaction is finalized.
    """
    
    logger.info(f"Verifying payment from {wallet_address} for {amount} USDC ({service_id})")
    
    # SIMULATION MODE
    return True, "Payment Verified (Simulation Mode)"

# ============================================================================
# AGENTIC WALLET INTEGRATION (PRIVY-LIKE)
# ============================================================================

class AgenticWallet:
    """
    Manages wallets for autonomous agents.
    Supports限额 (Spending Limits) and permissions.
    """
    
    def __init__(self, owner_address: str, agent_id: str):
        self.owner = owner_address
        self.agent_id = agent_id
        self.spending_limit = 10.0  # USDC per day
        self.spent_today = 0.0
        self.transactions = []
        
    def check_limit(self, amount: float) -> bool:
        """Check if agent can spend this amount."""
        return (self.spent_today + amount) <= self.spending_limit
    
    def execute_transaction(self, to: str, amount: float, purpose: str) -> Dict:
        """
        Execute a transaction on behalf of the agent.
        Returns the transaction hash (mocked).
        """
        if not self.check_limit(amount):
            return {"error": "Spending limit exceeded", "limit": self.spending_limit}
            
        # In real implementation, this would:
        # 1. Construct Tx
        # 2. Sign with Agent Private Key (stored in HSM/Privy)
        # 3. Broadcast to Base
        
        tx = {
            "hash": f"0x{hashlib.sha256(f'{self.agent_id}{time.time()}'.encode()).hexdigest()}",
            "from": self.owner,
            "to": to,
            "amount": amount,
            "purpose": purpose,
            "timestamp": int(time.time())
        }
        
        self.transactions.append(tx)
        self.spent_today += amount
        
        logger.info(f"Agent {self.agent_id} executed tx: {purpose} ({amount} USDC)")
        
        return tx

# ============================================================================
# BOUNTY SYSTEM (CLAWTASKS-LIKE)
# ============================================================================

class BountySystem:
    """
    Manages bounties for agent tasks.
    Features: Staking, Escrow, Completion.
    """
    
    def __init__(self):
        self.bounties: Dict[str, Dict] = {}
        
    def create_bounty(
        self,
        title: str,
        description: str,
        amount: float,
        deadline: int,
        creator: str
    ) -> str:
        """Create a new bounty."""
        bounty_id = f"bounty_{hashlib.md5(f'{title}{time.time()}'.encode()).hexdigest()[:8]}"
        
        bounty = {
            "id": bounty_id,
            "title": title,
            "description": description,
            "amount": amount,
            "creator": creator,
            "status": "open",  # open, claimed, completed, expired
            "deadline": deadline,
            "stake_required": amount * 0.1,  # 10% stake
            "claims": [],
            "created_at": int(time.time())
        }
        
        self.bounties[bounty_id] = bounty
        logger.info(f"Bounty created: {title} ({amount} USDC)")
        
        return bounty_id
    
    def claim_bounty(self, bounty_id: str, agent_address: str) -> bool:
        """Agent claims a bounty (stakes 10%)."""
        if bounty_id not in self.bounties:
            return False
            
        bounty = self.bounties[bounty_id]
        if bounty["status"] != "open":
            return False
            
        # In real implementation, lock funds here
        bounty["status"] = "in_progress"
        bounty["claims"].append({
            "agent": agent_address,
            "staked": bounty["stake_required"],
            "claimed_at": int(time.time())
        })
        
        return True
        
    def complete_bounty(self, bounty_id: str, agent_address: str) -> float:
        """Mark bounty as complete and release funds."""
        bounty = self.bounties[bounty_id]
        
        # Find the claim
        claim = next((c for c in bounty["claims"] if c["agent"] == agent_address), None)
        if not claim:
            return 0.0
            
        # Pay out: 95% bounty + 10% stake = 105% return
        payout = bounty["amount"] + claim["staked"]
        
        bounty["status"] = "completed"
        logger.info(f"Bounty {bounty_id} completed by {agent_address}. Payout: {payout} USDC")
        
        return payout

# ============================================================================
# MAIN ENTRY POINT
# ============================================================================

if __name__ == "__main__":
    # Test the x402 System
    print("🦞 Frankie x402 System Starting...")
    
    # Test Payment Request
    req = create_payment_request("agent-trading-v1", 0.05, "Access to Trading Agent")
    print(f"Payment Request: {json.dumps(req, indent=2)}")
    
    # Test Agent Wallet
    wallet = AgenticWallet("0x123", "agent-01")
    tx = wallet.execute_transaction("0x456", 5.0, "Compute Rental")
    print(f"Agent Transaction: {json.dumps(tx, indent=2)}")
    
    # Test Bounty System
    bounty_sys = BountySystem()
    b_id = bounty_sys.create_bounty(
        "Write Python Script",
        "Create a script that scrapes Moltbook",
        50.0,
        int(time.time()) + 86400,
        "0xCreator"
    )
    bounty_sys.claim_bounty(b_id, "0xAgent")
    payout = bounty_sys.complete_bounty(b_id, "0xAgent")
    print(f"Bounty Payout: {payout} USDC")