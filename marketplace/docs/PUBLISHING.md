# Publishing to Open Market Access

## Overview

Anyone can publish skills, MCP servers, and APIs to OMA. This guide covers everything you need to know.

## Publishing a Skill

### 1. Create Your Skill

```bash
oma create skill my-skill
```

This creates:
```
my-skill/
├── SKILL.md          # Skill documentation
├── index.js          # Skill implementation
├── package.json      # Package metadata
└── README.md         # User-facing docs
```

### 2. Implement Your Skill

Edit `index.js`:

```javascript
module.exports = {
  name: 'my-skill',
  version: '1.0.0',
  
  tools: {
    myTool: {
      description: 'What this tool does',
      parameters: {
        input: { type: 'string', required: true }
      },
      execute: async (params, context) => {
        // Your implementation
        return { result: 'done' };
      }
    }
  }
};
```

### 3. Document Your Skill

Edit `SKILL.md` using our template:

```bash
oma docs generate my-skill
```

### 4. Test Locally

```bash
oma test my-skill
```

### 5. Publish

```bash
oma publish my-skill
```

Your skill will be:
1. Validated
2. Published to npm
3. Listed on openmarketaccess.io

## Publishing an MCP Server

### 1. Create Server

```bash
oma create mcp my-server
```

### 2. Implement Server

```javascript
// index.js
const { Server } = require('@modelcontextprotocol/sdk');

const server = new Server({
  name: 'my-server',
  version: '1.0.0'
});

server.tool('myTool', {
  description: 'Tool description',
  parameters: { /* schema */ },
  handler: async (params) => {
    return { content: 'result' };
  }
});

server.start();
```

### 3. Test

```bash
npx ./
```

### 4. Publish to npm

```bash
npm publish --access public
```

### 5. Submit to Directory

Create PR to OMA repo adding your server to `marketplace/mcps/`.

## Publishing an API

### 1. Create API Definition

Create `api.json`:

```json
{
  "name": "my-api",
  "version": "1.0.0",
  "baseUrl": "https://api.example.com",
  "endpoints": [
    {
      "path": "/data",
      "method": "GET",
      "price": "0.05",
      "description": "Get data"
    }
  ],
  "auth": {
    "type": "x402",
    "address": "0x..."
  }
}
```

### 2. Implement x402

Your API must accept x402 payment proofs:

```javascript
app.get('/data', async (req, res) => {
  const proof = req.headers['x-payment'];
  
  // Verify payment
  const valid = await verifyX402(proof, {
    amount: '0.05',
    recipient: '0x...'
  });
  
  if (!valid) {
    return res.status(402).json({ error: 'Payment required' });
  }
  
  // Return data
  res.json({ data: '...' });
});
```

### 3. Publish

```bash
oma api publish api.json
```

## Pricing Your Work

### Recommended Pricing

| Type | Price Range | Notes |
|------|-------------|-------|
| Skills | FREE - $10/mo | Freemium works best |
| MCP Servers | FREE | Usually open source |
| APIs | $0.01 - $1.00 | Based on value provided |

### Revenue Share

- You keep 90% of revenue
- OMA takes 10% for platform costs

### Getting Paid

Payments are sent to your configured wallet:
1. Monthly on the 1st
2. Minimum payout: $10
3. Currency: USDC on Base

## Quality Guidelines

### Required

- ✅ Working implementation
- ✅ Complete SKILL.md documentation
- ✅ Error handling
- ✅ Rate limiting

### Recommended

- ✅ Unit tests
- ✅ TypeScript types
- ✅ Usage examples
- ✅ Changelog

### Prohibited

- ❌ Malicious code
- ❌ Data exfiltration
- ❌ Undisclosed tracking
- ❌ Misleading descriptions

## Review Process

1. **Automated Checks** (5 min)
   - Package validation
   - Security scan
   - Documentation check

2. **Human Review** (1-3 days)
   - Code review
   - Functionality test
   - Security audit

3. **Approval**
   - Listed on directory
   - Available for install

## Support

- Discord: discord.gg/openmarketaccess
- Email: publishers@openmarketaccess.io
- GitHub: github.com/FrankieMolt/OMA-AI/issues
