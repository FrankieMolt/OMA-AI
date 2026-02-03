from typing import Optional, Dict, Any, List
import json


class MCPClient:
    def __init__(
        self,
        endpoint: str = "https://api.oma.ai",
        api_key: Optional[str] = None,
        timeout: int = 30000
    ):
        self.endpoint = endpoint
        self.api_key = api_key
        self.timeout = timeout

    async def discover(
        self,
        category: Optional[str] = None,
        search: Optional[str] = None,
        pricing_type: Optional[str] = None,
        health_status: Optional[str] = None,
        min_rating: Optional[float] = None,
        tags: Optional[List[str]] = None,
        limit: int = 20,
        offset: int = 0
    ) -> Dict[str, Any]:
        import aiohttp

        params = {
            'limit': limit,
            'offset': offset
        }
        if category:
            params['category'] = category
        if search:
            params['search'] = search
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
                if not response.ok:
                    raise Exception(f"Failed to discover MCP servers: {response.text}")
                data = await response.json()
                return data.get('data', {'servers': [], 'total': 0})

    async def get_server(self, server_id: int) -> Optional[Dict[str, Any]]:
        import aiohttp

        headers = {'Content-Type': 'application/json'}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'

        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.endpoint}/api/mcp/{server_id}",
                headers=headers
            ) as response:
                if response.status == 404:
                    return None
                if not response.ok:
                    raise Exception(f"Failed to get MCP server: {response.text}")
                data = await response.json()
                return data.get('data')

    async def get_server_tools(self, server_id: int) -> Dict[str, Any]:
        import aiohttp

        headers = {'Content-Type': 'application/json'}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'

        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.endpoint}/api/mcp/{server_id}/tools",
                headers=headers
            ) as response:
                if not response.ok:
                    raise Exception(f"Failed to get MCP server tools: {response.text}")
                data = await response.json()
                return data.get('data')

    async def get_server_resources(self, server_id: int) -> Dict[str, Any]:
        import aiohttp

        headers = {'Content-Type': 'application/json'}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'

        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.endpoint}/api/mcp/{server_id}/resources",
                headers=headers
            ) as response:
                if not response.ok:
                    raise Exception(f"Failed to get MCP server resources: {response.text}")
                data = await response.json()
                return data.get('data')

    async def execute_tool(
        self,
        server_id: int,
        tool_name: str,
        arguments: Dict[str, Any],
        payment_signature: Optional[str] = None
    ) -> Dict[str, Any]:
        import aiohttp
        import time

        start_time = time.time()

        headers = {'Content-Type': 'application/json'}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'
        if payment_signature:
            headers['PAYMENT-SIGNATURE'] = json.dumps(payment_signature)

        payload = {
            "toolName": tool_name,
            "arguments": arguments
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.endpoint}/api/mcp/{server_id}/execute",
                headers=headers,
                json=payload
            ) as response:
                execution_time = (time.time() - start_time) * 1000

                if not response.ok:
                    return {
                        "success": False,
                        "error": f"Execution failed: {response.text}",
                        "toolName": tool_name,
                        "executionTime": execution_time
                    }

                data = await response.json()
                result = data.get('data', {})
                result['executionTime'] = execution_time
                return result

    async def execute_tool_stream(
        self,
        server_id: int,
        tool_name: str,
        arguments: Dict[str, Any],
        payment_signature: Optional[str] = None
    ):
        import aiohttp

        headers = {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream'
        }
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'
        if payment_signature:
            headers['PAYMENT-SIGNATURE'] = json.dumps(payment_signature)

        payload = {
            "toolName": tool_name,
            "arguments": arguments,
            "stream": True
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.endpoint}/api/mcp/{server_id}/execute",
                headers=headers,
                json=payload
            ) as response:
                if not response.ok:
                    raise Exception(f"Failed to execute tool stream: {response.text}")
                async for chunk in response.content:
                    yield chunk

    async def check_health(self, server_id: int) -> Dict[str, Any]:
        import aiohttp

        headers = {'Content-Type': 'application/json'}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'

        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.endpoint}/api/mcp/{server_id}/health",
                headers=headers
            ) as response:
                if not response.ok:
                    raise Exception(f"Failed to check health: {response.text}")
                data = await response.json()
                return data.get('data')

    async def proxy_request(
        self,
        target_url: str,
        payload: Dict[str, Any],
        signature: Optional[str] = None
    ) -> Dict[str, Any]:
        import aiohttp

        headers = {'Content-Type': 'application/json'}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'
        if signature:
            headers['PAYMENT-SIGNATURE'] = json.dumps(signature)

        request_payload = {
            "targetUrl": target_url,
            "payload": payload,
            "signature": signature
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.endpoint}/api/mcp/proxy",
                headers=headers,
                json=request_payload
            ) as response:
                if not response.ok:
                    raise Exception(f"Failed to proxy request: {response.text}")
                return await response.json()

    def set_api_key(self, api_key: str) -> None:
        self.api_key = api_key

    def set_endpoint(self, endpoint: str) -> None:
        self.endpoint = endpoint
