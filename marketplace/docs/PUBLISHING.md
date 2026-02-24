# Publishing to Open Market Access - Complete Guide

## Table of Contents

1. [Overview](#overview)
2. [Publishing Skills](#publishing-skills)
3. [Publishing MCP Servers](#publishing-mcp-servers)
4. [Publishing APIs](#publishing-apis)
5. [Monetization](#monetization)
6. [Best Practices](#best-practices)
7. [Review Process](#review-process)
8. [Marketing](#marketing)

---

## Overview

Anyone can publish to OMA and earn revenue. This guide covers everything you need to know.

### What Can You Publish?

| Type | Description | Revenue Model |
|------|-------------|---------------|
| Skills | AI agent capabilities | Free or paid |
| MCP Servers | Tool integrations | Usually free |
| APIs | Data endpoints | Pay per call |

### Revenue Share

- **You keep 90%** of all revenue
- OMA takes 10% for platform costs
- Payments processed via x402 on Base

---

## Publishing Skills

### Step 1: Create Your Skill

```bash
# Create from template
oma create skill my-skill

cd my-skill
```

This creates:
```
my-skill/
├── SKILL.md          # Documentation
├── index.js          # Implementation
├── package.json      # Metadata
├── config.json       # Configuration
├── README.md         # User guide
└── tests/
    └── index.test.js # Tests
```

### Step 2: Implement Your Skill

Edit `index.js`:

```javascript
/**
 * My Skill - Does something awesome
 * @version 1.0.0
 */

module.exports = {
  name: 'my-skill',
  version: '1.0.0',
  description: 'Does something awesome for AI agents',
  author: 'Your Name',
  license: 'MIT',
  
  // Configuration schema
  configSchema: {
    type: 'object',
    properties: {
      apiKey: { type: 'string', description: 'Your API key' },
      timeout: { type: 'number', default: 5000 }
    },
    required: ['apiKey']
  },
  
  // Tools provided by this skill
  tools: {
    // Tool 1
    doSomething: {
      description: 'Performs the main action',
      parameters: {
        input: {
          type: 'string',
          description: 'The input to process',
          required: true
        },
        options: {
          type: 'object',
          properties: {
            verbose: { type: 'boolean', default: false }
          }
        }
      },
      execute: async (params, context) => {
        const { input, options = {} } = params;
        const { config, logger } = context;
        
        logger.info(`Processing: ${input}`);
        
        // Your implementation here
        const result = await processInput(input, config);
        
        return {
          success: true,
          result,
          timestamp: new Date().toISOString()
        };
      }
    },
    
    // Tool 2
    getStatus: {
      description: 'Get current status',
      parameters: {},
      execute: async (params, context) => {
        return {
          status: 'operational',
          uptime: process.uptime()
        };
      }
    }
  },
  
  // Lifecycle hooks
  async onLoad(context) {
    const { config, logger } = context;
    logger.info('My Skill loaded');
    
    // Validate configuration
    if (!config.apiKey) {
      throw new Error('apiKey is required');
    }
    
    // Initialize connections
    await initializeAPI(config.apiKey);
  },
  
  async onUnload(context) {
    const { logger } = context;
    logger.info('My Skill unloaded');
    
    // Cleanup
    await cleanup();
  }
};

// Helper functions
async function processInput(input, config) {
  // Your logic here
  return `Processed: ${input}`;
}

async function initializeAPI(key) {
  // Setup API connection
}

async function cleanup() {
  // Cleanup resources
}
```

### Step 3: Document Your Skill

Edit `SKILL.md`:

```markdown
# my-skill

> One-line description of what your skill does

## Overview

Detailed explanation of your skill:
- What problem it solves
- Who should use it
- Key features

## Installation

\`\`\`bash
oma install my-skill
\`\`\`

## Configuration

Add to \`~/.oma/config.json\`:

\`\`\`json
{
  "skills": {
    "my-skill": {
      "enabled": true,
      "config": {
        "apiKey": "YOUR_API_KEY",
        "timeout": 5000
      }
    }
  }
}
\`\`\`

## Tools

### doSomething

Description of what this tool does.

**Parameters:**
- \`input\` (string, required): Description
- \`options.verbose\` (boolean, optional): Enable verbose output

**Returns:**
\`\`\`json
{
  "success": true,
  "result": "...",
  "timestamp": "2026-02-24T..."
}
\`\`\`

**Example:**
\`\`\`javascript
const result = await skill.doSomething({
  input: 'Hello',
  options: { verbose: true }
});
\`\`\`

## Pricing

- **Free Tier**: 100 calls/month
- **Pro**: $4.99/month unlimited

## Changelog

### v1.0.0 (2026-02-24)
- Initial release

## Support

- GitHub: https://github.com/you/my-skill
- Email: support@example.com
```

### Step 4: Add Tests

Edit `tests/index.test.js`:

```javascript
const skill = require('../index.js');

describe('my-skill', () => {
  test('loads successfully', () => {
    expect(skill.name).toBe('my-skill');
  });
  
  test('doSomething works', async () => {
    const result = await skill.tools.doSomething.execute(
      { input: 'test' },
      { config: { apiKey: 'test' }, logger: console }
    );
    expect(result.success).toBe(true);
  });
});
```

### Step 5: Test Locally

```bash
# Run tests
npm test

# Test skill locally
oma test my-skill

# Test specific tool
oma test my-skill --tool doSomething --input "test"
```

### Step 6: Publish

```bash
# Publish to npm
npm publish --access public

# Submit to OMA directory
oma submit my-skill
```

---

## Publishing MCP Servers

### Step 1: Create Server

```bash
oma create mcp my-mcp-server
cd my-mcp-server
```

### Step 2: Implement Server

```typescript
// src/index.ts
import { Server } from '@modelcontextprotocol/sdk';
import { z } from 'zod';

const server = new Server({
  name: 'my-mcp-server',
  version: '1.0.0'
});

// Define tool
server.tool(
  'my_tool',
  'Description of what this tool does',
  {
    input: z.string().describe('Input parameter'),
    option: z.boolean().optional().describe('Optional flag')
  },
  async (params) => {
    // Your implementation
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ result: 'done' })
      }]
    };
  }
);

// Define resource
server.resource(
  'my-resource',
  'resource://my-data',
  async (uri) => {
    return {
      contents: [{
        uri: uri.href,
        text: 'Resource data'
      }]
    };
  }
);

// Define prompt
server.prompt(
  'my-prompt',
  'A helpful prompt template',
  { topic: z.string() },
  async (params) => {
    return {
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: `Tell me about ${params.topic}`
        }
      }]
    };
  }
);

// Start server
server.start();
```

### Step 3: Configure package.json

```json
{
  "name": "@your-org/server-my-server",
  "version": "1.0.0",
  "description": "My MCP server",
  "type": "module",
  "bin": {
    "mcp-server-my-server": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.22.0"
  }
}
```

### Step 4: Document

Create `SKILL.md`:

```markdown
# @your-org/server-my-server

> MCP server for [purpose]

## Installation

\`\`\`bash
npx @your-org/server-my-server
\`\`\`

## Claude Desktop Configuration

\`\`\`json
{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["@your-org/server-my-server"],
      "env": {
        "API_KEY": "your-key"
      }
    }
  }
}
\`\`\`

## Tools

| Tool | Description |
|------|-------------|
| my_tool | Does something |

## Resources

| Resource | Description |
|----------|-------------|
| resource://my-data | Data resource |

## Prompts

| Prompt | Description |
|--------|-------------|
| my-prompt | Helpful prompt |
```

### Step 5: Publish

```bash
npm publish --access public
```

---

## Publishing APIs

### Step 1: Create API

Create your API with x402 payment support:

```javascript
// api/index.js
const express = require('express');
const { verifyX402 } = require('@openmarketaccess/x402');

const app = express();
app.use(express.json());

// Payment configuration
const PAYMENT_CONFIG = {
  recipient: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6',
  network: 'base-mainnet',
  prices: {
    '/data': '0.05',
    '/premium': '0.25'
  }
};

// Free endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Paid endpoint
app.get('/data', async (req, res) => {
  const proof = req.headers['x-payment'];
  
  // Verify payment
  const verification = await verifyX402(proof, {
    recipient: PAYMENT_CONFIG.recipient,
    amount: PAYMENT_CONFIG.prices['/data'],
    network: PAYMENT_CONFIG.network
  });
  
  if (!verification.valid) {
    return res.status(402).json({
      error: 'Payment required',
      x402: {
        version: '1.0',
        amount: PAYMENT_CONFIG.prices['/data'],
        recipient: PAYMENT_CONFIG.recipient,
        network: PAYMENT_CONFIG.network
      }
    });
  }
  
  // Return data
  res.json({
    data: await getData(),
    paid: true
  });
});

app.listen(3000);
```

### Step 2: Create API Definition

```json
// api.json
{
  "name": "my-api",
  "version": "1.0.0",
  "description": "My awesome API",
  "baseUrl": "https://api.example.com",
  "auth": {
    "type": "x402",
    "recipient": "0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6",
    "network": "base-mainnet"
  },
  "endpoints": [
    {
      "path": "/health",
      "method": "GET",
      "price": "0",
      "description": "Health check"
    },
    {
      "path": "/data",
      "method": "GET",
      "price": "0.05",
      "description": "Get data"
    }
  ],
  "category": "data",
  "tags": ["data", "utility"]
}
```

### Step 3: Submit

```bash
oma api submit api.json
```

---

## Monetization

### Pricing Strategies

| Strategy | Use Case | Example |
|----------|----------|---------|
| Free | Lead generation, open source | Basic tools |
| Freemium | Grow user base | Free tier + paid |
| Usage-based | Variable value | $0.01 per call |
| Subscription | Predictable revenue | $9.99/month |

### Setting Prices

Consider:
- Your costs (API calls, compute)
- Value provided to users
- Competitor pricing
- Target revenue

### Revenue Tracking

```bash
# View your earnings
oma earnings

# Monthly breakdown
oma earnings --monthly

# Per-product breakdown
oma earnings --by-product
```

### Getting Paid

1. Earnings accumulate in your wallet
2. Payouts on 1st of each month
3. Minimum payout: $10
4. Currency: USDC on Base

---

## Best Practices

### Code Quality

- ✅ TypeScript for type safety
- ✅ Comprehensive tests
- ✅ Error handling
- ✅ Logging
- ✅ Documentation

### Security

- ✅ Validate all inputs
- ✅ Sanitize outputs
- ✅ Rate limiting
- ✅ API key protection
- ✅ No secrets in code

### Performance

- ✅ Caching where appropriate
- ✅ Async operations
- ✅ Connection pooling
- ✅ Graceful degradation

---

## Review Process

### Automated Checks (5 min)

- Package validation
- Security scan
- Documentation check
- Test coverage

### Human Review (1-3 days)

- Code review
- Functionality test
- Security audit
- Documentation review

### Approval Criteria

- Working implementation
- Complete documentation
- No security issues
- Clear value proposition

---

## Marketing

### Launch Checklist

- [ ] Product Hunt submission
- [ ] Reddit post (r/LocalLLaMA, r/ClaudeAI)
- [ ] Discord announcement
- [ ] Twitter/X thread
- [ ] Blog post

### Ongoing Promotion

- Engage in community discussions
- Create example use cases
- Write tutorials
- Respond to issues quickly

---

## Support

- Publishers Discord: https://discord.gg/openmarketaccess
- Email: publishers@openmarketaccess.io
- GitHub: https://github.com/FrankieMolt/OMA-AI
