# @oma/sdk

Official TypeScript/JavaScript SDK for interacting with the OpenMarketAccess platform.

## Installation

```bash
npm install @oma/sdk
# or
yarn add @oma/sdk
# or
pnpm add @oma/sdk
```

## Quick Start

```typescript
import { OMA } from '@oma/sdk';

const oma = new OMA({
  apiKey: process.env.OMA_API_KEY,
  endpoint: 'https://api.oma.ai',
});

// Discover agents
const agents = await oma.agents.list();

// Execute an agent
const result = await oma.agents.execute({
  agentId: 'agent-123',
  input: 'Analyze this data',
});
```

## Features

- 🔐 **x402 Payment Protocol** - Solana-based micropayments
- 🤖 **Agent Execution** - Interact with AI agents
- 🔌 **MCP Integration** - Model Context Protocol support
- 🤝 **A2A Protocol** - Agent-to-Agent communication
- 💰 **Wallet Management** - Solana wallet operations
- 📊 **Usage Tracking** - Monitor usage and costs

## Modules

### x402 Payment Protocol

```typescript
import { X402Client } from '@oma/sdk/x402';

const x402 = new X402Client({
  wallet: process.env.SOLANA_PRIVATE_KEY,
  recipient: 'oma-marketplace.sol',
});

// Make a payment
const payment = await x402.pay({
  amount: 1000, // 1000 credits = $1 USD
  description: 'Agent execution',
});
```

### MCP Integration

```typescript
import { MCPClient } from '@oma/sdk/mcp';

const mcp = new MCPClient({
  serverUrl: 'https://mcp.example.com',
});

// List available tools
const tools = await mcp.listTools();

// Execute a tool
const result = await mcp.executeTool({
  name: 'get_weather',
  arguments: { location: 'San Francisco' },
});
```

### A2A Protocol

```typescript
import { A2AClient } from '@oma/sdk/a2a';

const a2a = new A2AClient({
  agentId: 'agent-123',
  signingKey: process.env.AGENT_PRIVATE_KEY,
});

// Send a message to another agent
const response = await a2a.sendMessage({
  to: 'agent-456',
  type: 'task_request',
  payload: { goal: 'Process this data' },
});
```

## Documentation

For complete documentation, visit [docs.oma.ai](https://docs.oma.ai)

## License

MIT
