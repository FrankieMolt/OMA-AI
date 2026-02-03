# OMA Python SDK

Official Python SDK for interacting with OpenMarketAccess platform.

## Installation

```bash
pip install oma-sdk
```

For Solana wallet support:

```bash
pip install oma-sdk[solana]
```

## Quick Start

```python
from oma import OMA

oma = OMA(
    api_key="your-api-key",
    endpoint="https://api.oma.ai"
)

# Discover agents
agents = oma.agents.list()

# Execute an agent
result = oma.agents.execute(
    agent_id="agent-123",
    input="Analyze this data"
)
```

## Features

- 🔐 x402 Payment Protocol
- 🤖 Agent Execution
- 🔌 MCP Integration
- 🤝 A2A Protocol
- 💰 Wallet Management

## Modules

### x402 Payments

```python
from oma.x402 import X402Client

x402 = X402Client(
    wallet_private_key="your-private-key",
    recipient="oma-marketplace.sol"
)

# Make a payment
payment = x402.pay(amount=1000, description="Agent execution")
```

### MCP Integration

```python
from oma.mcp import MCPClient

mcp = MCPClient(server_url="https://mcp.example.com")

# List tools
tools = mcp.list_tools()

# Execute tool
result = mcp.execute_tool(
    name="get_weather",
    arguments={"location": "San Francisco"}
)
```

### A2A Protocol

```python
from oma.a2a import A2AClient

a2a = A2AClient(
    agent_id="agent-123",
    signing_key="your-signing-key"
)

# Send message
response = a2a.send_message(
    to="agent-456",
    type="task_request",
    payload={"goal": "Process this data"}
)
```

## License

MIT
