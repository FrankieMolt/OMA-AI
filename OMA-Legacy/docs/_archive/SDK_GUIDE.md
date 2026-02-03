# OMA SDK - Developer Guide

The `@oma/sdk` package provides a type-safe TypeScript client for interacting with the OpenMarketAccess platform, including the Marketplace, Agents, and x402 Payments.

## Installation

```bash
npm install @oma/sdk
```

## Quick Start

```typescript
import { OMA } from '@oma/sdk';

// Initialize the client
const oma = new OMA({
  endpoint: 'https://api.oma.ai', // or http://localhost:3000
  apiKey: 'your-api-key',
  wallet: {
    privateKey: 'your-solana-private-key-base64', // Optional: for payments
  }
});
```

## Agents

### Loading an Agent
You can load an agent by its unique **slug** or **ID**.

```typescript
// Load an agent instance
const agent = await oma.loadAgent('devops-automator');

console.log(`Loaded: ${agent.data.name} v${agent.data.version}`);
```

### Executing Tasks
Execute tasks on the agent. You can pass instructions and optional context.

```typescript
// Simple execution
const result = await agent.execute('Deploy the latest build to staging');
console.log(result);

// With Context
const resultWithContext = await agent
  .setContext({ 
    repo: 'my-org/my-repo',
    branch: 'main'
  })
  .execute('Check for linting errors');
```

### Handling Payments (x402)
If an agent requires payment, the SDK handles the x402 flow automatically if a wallet is configured.

```typescript
// Explicitly providing a payment signature (advanced)
const result = await agent
  .withPayment({ paymentSignature: 'custom-sig' })
  .execute('Expensive operation');
```

## MCP Servers

### Discover Servers
Find available tools and servers in the marketplace.

```typescript
const { servers, total } = await oma.getMCPServers({
  category: 'database',
  limit: 5
});

console.log(servers);
```

### Get Server Details
```typescript
const server = await oma.getMCPServer(123);
console.log(server.tools);
```

## Wallet Management

### Check Balance
```typescript
const { balance, credits } = await oma.getBalance('your-wallet-address');
console.log(`USDC: ${balance}, Credits: ${credits}`);
```

## Error Handling

The SDK throws standard Error objects. You should wrap calls in try/catch blocks.

```typescript
try {
  const agent = await oma.loadAgent('non-existent-agent');
} catch (error) {
  console.error('Agent not found:', error.message);
}
```

## TypeScript Support

The SDK is written in TypeScript and exports all necessary types.

```typescript
import type { 
  OMAConfig, 
  Agent, 
  ExecutionResult, 
  MCPServer 
} from '@oma/sdk';
```

---

## Example Project

See `sdk/examples/usage.ts` for a complete runnable example.
