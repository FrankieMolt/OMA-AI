from typing import Optional, Dict, Any, List
from oma.x402 import X402Client
from oma.mcp import MCPClient
from oma.a2a import A2AClient


class OMA:
    def __init__(
        self,
        api_key: Optional[str] = None,
        endpoint: str = "https://api.oma.ai",
        wallet: Optional[Dict[str, str]] = None
    ):
        self.api_key = api_key
        self.endpoint = endpoint
        self.wallet = wallet

        self.x402 = X402Client(
            wallet=wallet.get('private_key') if wallet else None,
            endpoint=endpoint
        )

        self.mcp = MCPClient(
            endpoint=endpoint,
            api_key=api_key
        )

        self.a2a = A2AClient(
            endpoint=endpoint,
            api_key=api_key
        )

    async def get_agents(
        self,
        limit: int = 20,
        offset: int = 0,
        search: Optional[str] = None,
        category: Optional[str] = None,
        pricing_type: Optional[str] = None,
        min_rating: Optional[float] = None,
        tags: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        import aiohttp
        import json

        params = {
            'limit': limit,
            'offset': offset
        }
        if search:
            params['search'] = search
        if category:
            params['category'] = category
        if pricing_type:
            params['pricingType'] = pricing_type
        if min_rating:
            params['minRating'] = min_rating
        if tags:
            params['tags'] = ','.join(tags)

        headers = {'Content-Type': 'application/json'}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'

        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.endpoint}/api/agents/list",
                params=params,
                headers=headers
            ) as response:
                data = await response.json()
                return data.get('data', {'agents': [], 'total': 0})

    async def get_agent(self, agent_id: str) -> Optional[Dict[str, Any]]:
        import aiohttp

        headers = {'Content-Type': 'application/json'}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'

        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.endpoint}/api/agents/{agent_id}",
                headers=headers
            ) as response:
                if response.status == 404:
                    return None
                data = await response.json()
                return data.get('data')

    async def execute_agent(
        self,
        agent_id: str,
        input_text: str,
        payment_signature: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        import aiohttp

        headers = {'Content-Type': 'application/json'}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'
        if payment_signature:
            headers['PAYMENT-SIGNATURE'] = json.dumps(payment_signature)

        payload = {
            'input': input_text,
            'context': context
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.endpoint}/api/agents/{agent_id}/execute",
                headers=headers,
                json=payload
            ) as response:
                data = await response.json()
                return data.get('data')

    async def get_mcp_servers(
        self,
        limit: int = 20,
        offset: int = 0,
        search: Optional[str] = None,
        category: Optional[str] = None,
        pricing_type: Optional[str] = None,
        health_status: Optional[str] = None,
        min_rating: Optional[float] = None,
        tags: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        import aiohttp

        params = {
            'limit': limit,
            'offset': offset
        }
        if search:
            params['search'] = search
        if category:
            params['category'] = category
        if pricing_type:
            params['pricingType'] = pricing_type
        if health_status:
            params['healthStatus'] = health_status
        if min_rating:
            params['minRating'] = min_rating
        if tags:
            params['tags'] = ','.join(tags)

        headers = {'Content-Type': 'application/json'}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'

        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.endpoint}/api/mcp/discover",
                params=params,
                headers=headers
            ) as response:
                data = await response.json()
                return data.get('data', {'servers': [], 'total': 0})
