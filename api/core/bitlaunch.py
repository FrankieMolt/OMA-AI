import requests
import logging
import os
from typing import Dict, Optional

logger = logging.getLogger('oma-ai.bitlaunch')

class BitLaunchClient:
    """
    Client for BitLaunch.io API.
    Enables programmatic server provisioning paid with Crypto.
    """
    
    BASE_URL = "https://app.bitlaunch.io/api"
    
    def __init__(self, api_token: Optional[str] = None):
        self.token = api_token or os.environ.get("BITLAUNCH_TOKEN")
        self.headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

    def get_account(self) -> Dict:
        """Get account details and balance"""
        if not self.token:
            return {"balance": 0.0, "currency": "USD", "status": "mock"}
            
        resp = requests.get(f"{self.BASE_URL}/account", headers=self.headers)
        if resp.status_code == 200:
            return resp.json()
        logger.error(f"BitLaunch API Error: {resp.text}")
        return {"error": resp.text}

    def create_server(self, name: str, host: str = "BitLaunch", 
                     size: str = "2gb", region: str = "lon1", 
                     image: str = "ubuntu-22.04") -> Dict:
        """
        Create a new server.
        host: 'BitLaunch', 'DigitalOcean', 'Vultr', 'Linode'
        """
        if not self.token:
            logger.info(f"[MOCK] Creating server {name} on {host} ({size})")
            return {
                "id": "mock-server-id",
                "name": name,
                "ipv4": "10.0.0.1", 
                "status": "launching"
            }

        payload = {
            "name": name,
            "host": host,
            "size": size,
            "region": region,
            "image": image,
            # "ssh_keys": [...] # Add SSH key ID if needed
        }
        
        resp = requests.post(f"{self.BASE_URL}/servers", json=payload, headers=self.headers)
        
        if resp.status_code == 201:
            return resp.json()
        
        logger.error(f"Failed to create server: {resp.text}")
        raise Exception(f"BitLaunch Provisioning Failed: {resp.text}")

    def get_server(self, server_id: str) -> Dict:
        """Get server status/IP"""
        if not self.token:
            return {"status": "running", "ipv4": "10.0.0.1"}
            
        resp = requests.get(f"{self.BASE_URL}/servers/{server_id}", headers=self.headers)
        return resp.json()

    def destroy_server(self, server_id: str):
        """Terminate a server"""
        if not self.token:
            return True
            
        requests.delete(f"{self.BASE_URL}/servers/{server_id}", headers=self.headers)
