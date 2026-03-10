# OMA MCP Server Template

**Quick-start template for creating MCP servers compatible with the OMA marketplace**

---

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Copy the template folder
cp -r mcp-template my-new-mcp
cd my-new-mcp

# Install dependencies
npm install
```

### 2. Customize Your MCP

Edit `index.ts`:
- Change `SERVER_CONFIG.name` to your MCP name
- Change `SERVER_CONFIG.version` to your version
- Modify tool definitions
- Implement tool logic

### 3. Test Locally

```bash
# Run server
npm run dev

# In another terminal, test with MCP inspector
npx @modelcontextprotocol/inspector node dist/index.js
```

### 4. Build for Production

```bash
# Build TypeScript
npm run build

# Run production build
npm start
```

### 5. Register with OMA

```bash
curl -X POST https://oma-ai.com/api/mcp/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My New MCP",
    "slug": "my-new-mcp",
    "category": ["search", "ai"],
    "description": "My custom MCP for web search",
    "author": "your-username",
    "repository_url": "https://github.com/username/my-new-mcp",
    "mcp_endpoint": "stdio://node dist/index.js",
    "pricing_usdc": 0.001,
    "x402_enabled": true
  }'
```

---

## 📦 Project Structure

```
my-new-mcp/
├── index.ts          # Main MCP server file
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── README.md         # This file
└── dist/            # Compiled JavaScript (generated)
```

---

## 🛠️ Available Tools

### 1. Text Processor

Process text with various operations.

**Operations:**
- `uppercase` - Convert to uppercase
- `lowercase` - Convert to lowercase
- `reverse` - Reverse text
- `word_count` - Count words

**Example:**
```json
{
  "name": "text_processor",
  "arguments": {
    "text": "Hello World",
    "operation": "uppercase"
  }
}
```

### 2. Web Search

Search the web using Exa API.

**Parameters:**
- `query` - Search query (required)
- `numResults` - Number of results (1-100, default: 10)
- `useAutoprompt` - Use AI-optimized query (default: true)

**Example:**
```json
{
  "name": "web_search",
  "arguments": {
    "query": "AI agent marketplace",
    "numResults": 5
  }
}
```

### 3. Calculator

Perform mathematical calculations.

**Parameters:**
- `expression` - Math expression (e.g., "2 + 2 * 3")

**Example:**
```json
{
  "name": "calculator",
  "arguments": {
    "expression": "2 + 2 * 3"
  }
}
```

---

## 🔧 Adding Custom Tools

### Step 1: Define Tool Schema

```typescript
const MY_TOOL = {
  name: 'my_custom_tool',
  description: 'Description of what your tool does',
  inputSchema: z.object({
    param1: z.string().describe('First parameter'),
    param2: z.number().describe('Second parameter'),
  }).shape,
};
```

### Step 2: Add to Tools List

```typescript
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      // ...existing tools
      {
        name: MY_TOOL.name,
        description: MY_TOOL.description,
        inputSchema: zodToJsonSchema(MY_TOOL.inputSchema),
      },
    ],
  };
});
```

### Step 3: Implement Tool Handler

```typescript
async function handleMyCustomTool(args: any) {
  const { param1, param2 } = args;

  // Your tool logic here
  const result = doSomething(param1, param2);

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result),
      },
    ],
  };
}
```

### Step 4: Add to Tool Call Handler

```typescript
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case MY_TOOL.name:
      return await handleMyCustomTool(args);
    // ...other cases
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});
```

---

## 📝 Configuration

### Environment Variables

Create a `.env` file:

```bash
# Exa API key (for web search tool)
EXA_API_KEY=your-exa-api-key

# Your custom API keys
MY_API_KEY=your-api-key
```

### Server Configuration

Edit `SERVER_CONFIG` in `index.ts`:

```typescript
const SERVER_CONFIG = {
  name: 'my-oma-mcp',
  version: '1.0.0',
  description: 'My custom MCP server',
  author: 'your-username',
};
```

---

## 🚢 Deployment

### Local Development (stdio)

```bash
# Run locally
npm run dev

# Test with MCP inspector
npx @modelcontextprotocol/inspector node dist/index.js
```

### Production (HTTP/SSE)

Convert to HTTP server:

```typescript
import express from 'express';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/sse', async (req, res) => {
  const transport = new SSEServerTransport('/messages', res);
  await server.connect(transport);
});

app.listen(PORT, () => {
  console.log(`MCP server running on http://localhost:${PORT}`);
});
```

Deploy to Vercel:

```bash
vercel
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

```bash
docker build -t my-mcp-server .
docker run -p 3000:3000 my-mcp-server
```

---

## 💰 Monetization with x402

### Enable x402 Payments

```bash
# Register with x402 enabled
curl -X POST https://oma-ai.com/api/mcp/register \
  -d '{
    "name": "My MCP",
    "slug": "my-mcp",
    "pricing_usdc": 0.001,
    "x402_enabled": true
  }'
```

### x402 Payment Flow

1. **Agent calls tool** → OMA marketplace checks balance
2. **Payment required** → Agent signs x402 payment (EIP-712)
3. **Payment verified** → Tool executes
4. **Success** → Payment transferred to MCP owner

---

## 📊 Best Practices

### Development
- ✅ Use Zod for input validation
- ✅ Add comprehensive error handling
- ✅ Log all tool calls
- ✅ Test with MCP inspector
- ✅ Add unit tests

### Production
- ✅ Use TypeScript for type safety
- ✅ Add rate limiting
- ✅ Implement caching
- ✅ Monitor API usage
- ✅ Add health check endpoint

### OMA Integration
- ✅ Register with OMA marketplace
- ✅ Use x402 for payments
- ✅ Document tools thoroughly
- ✅ Provide examples
- ✅ Support pricing tiers

---

## 📚 Resources

- [MCP Protocol Specification](https://modelcontextprotocol.io)
- [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [OMA Marketplace](https://oma-ai.com)
- [OMA MCP Hosting Guide](./OMA_MCP_HOSTING_GUIDE.md)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - feel free to use this template for your MCP projects!

---

**Happy MCP Building!** 🚀
