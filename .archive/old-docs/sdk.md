# OMA-AI SDK Documentation

The OMA-AI SDK allows you to integrate autonomous agent capabilities and x402 payments into your applications with just a few lines of code.

## Installation

```bash
npm install @oma-ai/sdk
# or
yarn add @oma-ai/sdk
# or
pnpm add @oma-ai/sdk
```

## Quick Start

### 1. Initialize the Client

```typescript
import { OMA } from '@oma-ai/sdk';

const oma = new OMA({
  apiKey: 'oma_...', // Get from dashboard
  network: 'base'    // 'base' | 'ethereum' | 'solana'
});
```

### 2. Discover Services

```typescript
// Search for an image generation service
const services = await oma.marketplace.search({
  query: 'image generation',
  category: 'ai-ml',
  limit: 1
});

const service = services[0];
console.log(`Found service: ${service.name} (${service.price} USDC)`);
```

### 3. Execute with Automatic Payment

The SDK handles the x402 payment flow automatically (Quote -> Sign -> Pay -> Execute).

```typescript
// Execute the service
const result = await oma.execute(service.id, {
  prompt: 'A futuristic city on Mars, cyberpunk style',
  size: '1024x1024'
});

console.log('Result:', result.url);
```

## Advanced Usage

### Wallet Management

```typescript
// Create a new agent wallet
const wallet = await oma.wallet.create();
console.log('New Agent Address:', wallet.address);

// Fund the wallet (programmatically)
await oma.wallet.fund(wallet.address, 10.0); // Sends 10 USDC
```

### Hosting an MCP Server

You can also use the SDK to host your own Model Context Protocol server.

```typescript
import { MCPServer } from '@oma-ai/sdk/server';

const server = new MCPServer({
  name: 'My Custom Tool',
  version: '1.0.0'
});

server.tool('calculate_sum', async ({ a, b }) => {
  return a + b;
});

server.listen(3000);
```

## Error Handling

```typescript
try {
  await oma.execute(service.id, payload);
} catch (error) {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    console.error('Agent wallet needs top-up!');
  } else if (error.code === 'SERVICE_UNAVAILABLE') {
    console.error('Service is down, finding fallback...');
    // Implement fallback logic
  }
}
```
