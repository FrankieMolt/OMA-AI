from typing import Optional, Dict, Any, List
import json
import base64
import time
import uuid


class A2AClient:
    def __init__(
        self,
        endpoint: str = "https://api.oma.ai",
        api_key: Optional[str] = None,
        agent_id: Optional[str] = None,
        signing_key: Optional[str] = None
    ):
        self.endpoint = endpoint
        self.api_key = api_key
        self.agent_id = agent_id
        self.signing_key = signing_key

    async def send_message(
        self,
        to: str,
        message_type: str,
        payload: Dict[str, Any],
        payment_signature: Optional[str] = None
    ) -> Dict[str, Any]:
        import aiohttp

        message_id = self._generate_message_id()
        timestamp = time.strftime("%Y-%m-%dT%H:%M:%S.000Z", time.gmtime())

        message = {
            "id": message_id,
            "to": to,
            "type": message_type,
            "payload": payload,
            "timestamp": timestamp
        }

        if self.agent_id:
            message["from"] = self.agent_id

        message["signature"] = self._sign_message(message)

        headers = {'Content-Type': 'application/json'}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'
        if payment_signature:
            headers['PAYMENT-SIGNATURE'] = json.dumps(payment_signature)

        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.endpoint}/api/a2a/send",
                headers=headers,
                json=message
            ) as response:
                if not response.ok:
                    raise Exception(f"Failed to send A2A message: {response.text}")
                data = await response.json()
                return data.get('data')

    async def execute(
        self,
        agent_id: str,
        goal: str,
        context: Optional[Dict[str, Any]] = None,
        constraints: Optional[Dict[str, Any]] = None,
        payment_signature: Optional[str] = None
    ) -> Dict[str, Any]:
        import aiohttp

        payload = {
            "goal": goal,
            "context": context,
            "constraints": constraints
        }

        headers = {'Content-Type': 'application/json'}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'
        if payment_signature:
            headers['PAYMENT-SIGNATURE'] = json.dumps(payment_signature)

        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.endpoint}/api/a2a/{agent_id}/execute",
                headers=headers,
                json=payload
            ) as response:
                if not response.ok:
                    raise Exception(f"Failed to execute A2A task: {response.text}")
                data = await response.json()
                return data.get('data')

    async def execute_stream(
        self,
        agent_id: str,
        goal: str,
        context: Optional[Dict[str, Any]] = None,
        constraints: Optional[Dict[str, Any]] = None,
        payment_signature: Optional[str] = None
    ):
        import aiohttp

        payload = {
            "goal": goal,
            "context": context,
            "constraints": constraints,
            "stream": True
        }

        headers = {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream'
        }
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'
        if payment_signature:
            headers['PAYMENT-SIGNATURE'] = json.dumps(payment_signature)

        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.endpoint}/api/a2a/{agent_id}/execute",
                headers=headers,
                json=payload
            ) as response:
                if not response.ok:
                    raise Exception(f"Failed to execute A2A task stream: {response.text}")
                async for chunk in response.content:
                    yield chunk

    async def discover(
        self,
        category: Optional[str] = None,
        search: Optional[str] = None,
        capability: Optional[str] = None,
        min_rating: Optional[float] = None,
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
        if capability:
            params['capability'] = capability
        if min_rating:
            params['minRating'] = min_rating

        headers = {'Content-Type': 'application/json'}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'

        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.endpoint}/api/a2a/discover",
                params=params,
                headers=headers
            ) as response:
                if not response.ok:
                    raise Exception(f"Failed to discover A2A agents: {response.text}")
                data = await response.json()
                return data.get('data', {'agents': [], 'total': 0})

    async def get_agent(self, agent_id: str) -> Optional[Dict[str, Any]]:
        import aiohttp

        headers = {'Content-Type': 'application/json'}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'

        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.endpoint}/api/a2a/agents/{agent_id}",
                headers=headers
            ) as response:
                if response.status == 404:
                    return None
                if not response.ok:
                    raise Exception(f"Failed to get A2A agent: {response.text}")
                data = await response.json()
                return data.get('data')

    async def get_capabilities(self, agent_id: str) -> List[str]:
        agent = await self.get_agent(agent_id)
        return agent.get('capabilities', []) if agent else []

    async def get_task_status(self, task_id: str) -> Dict[str, Any]:
        import aiohttp

        headers = {'Content-Type': 'application/json'}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'

        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.endpoint}/api/a2a/tasks/{task_id}",
                headers=headers
            ) as response:
                if not response.ok:
                    raise Exception(f"Failed to get task status: {response.text}")
                data = await response.json()
                return data.get('data')

    async def get_messages(
        self,
        from_agent: Optional[str] = None,
        to_agent: Optional[str] = None,
        message_type: Optional[str] = None,
        limit: int = 20,
        offset: int = 0
    ) -> Dict[str, Any]:
        import aiohttp

        params = {
            'limit': limit,
            'offset': offset
        }
        if from_agent:
            params['from'] = from_agent
        if to_agent:
            params['to'] = to_agent
        if message_type:
            params['type'] = message_type

        headers = {'Content-Type': 'application/json'}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'

        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.endpoint}/api/a2a/messages",
                params=params,
                headers=headers
            ) as response:
                if not response.ok:
                    raise Exception(f"Failed to get A2A messages: {response.text}")
                data = await response.json()
                return data.get('data', {'messages': [], 'total': 0})

    def _generate_message_id(self) -> str:
        return f"msg_{int(time.time() * 1000)}_{uuid.uuid4().hex[:8]}"

    def _sign_message(self, message: Dict[str, Any]) -> str:
        message_data = json.dumps({
            "id": message.get("id"),
            "from": message.get("from"),
            "to": message.get("to"),
            "type": message.get("type"),
            "timestamp": message.get("timestamp")
        }, sort_keys=True)
        return base64.b64encode(message_data.encode()).decode()

    def set_agent_id(self, agent_id: str) -> None:
        self.agent_id = agent_id

    def set_signing_key(self, signing_key: str) -> None:
        self.signing_key = signing_key

    def set_api_key(self, api_key: str) -> None:
        self.api_key = api_key

    def set_endpoint(self, endpoint: str) -> None:
        self.endpoint = endpoint
