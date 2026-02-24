# Open Market Access - Complete Getting Started Guide

## Table of Contents

1. [What is OMA?](#what-is-oma)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Using Skills](#using-skills)
5. [Using MCP Servers](#using-mcp-servers)
6. [Using APIs](#using-apis)
7. [Payments with x402](#payments-with-x402)
8. [Troubleshooting](#troubleshooting)
9. [Advanced Usage](#advanced-usage)

---

## What is OMA?

Open Market Access (OMA) is a comprehensive marketplace for AI agent components:

### MCP Servers
Model Context Protocol servers connect AI assistants to external tools and data sources. They enable:
- File system operations
- Database queries
- API integrations
- Web scraping
- And much more

### AI Skills
Modular capabilities that enhance AI agents:
- Proactive behavior
- Memory systems
- Trading analysis
- Payment processing

### APIs
Data endpoints with instant micropayments:
- Crypto prices
- Trading signals
- Prediction markets
- LLM access

---

## Installation

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Git
- (Optional) Claude Desktop for MCP servers

### Step 1: Install the CLI

```bash
# Using npm
npm install -g @openmarketaccess/cli

# Using pnpm
pnpm add -g @openmarketaccess/cli

# Verify installation
oma --version
```

### Step 2: Initialize

```bash
# Initialize OMA in your home directory
oma init

# This creates:
# ~/.oma/
# ├── config.json      # Main configuration
# ├── skills/          # Installed skills
# ├── mcps/            # MCP server configs
# └── cache/           # Cached data
```

### Step 3: Verify Setup

```bash
# Check configuration
oma config list

# Test API connection
oma test

# List available skills
oma search skills
```

---

## Configuration

### Main Config File

Location: `~/.oma/config.json`

```json
{
  "version": "1.0.0",
  "user": {
    "name": "Your Name",
    "email": "you@example.com"
  },
  "skills": {
    "proactive-agent": {
      "enabled": true,
      "config": {
        "anticipation_level": "high",
        "max_autonomous_actions": 10
      }
    }
  },
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/path/to/projects"]
    }
  },
  "apis": {
    "frankie-api": {
      "baseUrl": "https://frankie-prod.life.conway.tech",
      "key": "your-api-key"
    }
  },
  "wallet": {
    "address": "0x...",
    "network": "base-mainnet",
    "balance": "0.00"
  },
  "settings": {
    "autoUpdate": true,
    "debug": false,
    "logLevel": "info"
  }
}
```

### Environment Variables

Create `~/.oma/.env`:

```bash
# API Keys
OPENROUTER_KEY=sk-or-xxxxx
ANTHROPIC_KEY=sk-ant-xxxxx
OPENAI_KEY=sk-xxxxx

# Payment
WALLET_PRIVATE_KEY=0x...
BASE_RPC_URL=https://mainnet.base.org

# Optional
DEBUG=true
LOG_FILE=~/.oma/logs/oma.log
```

---

## Using Skills

### Installing Skills

```bash
# Search for skills
oma search proactive

# Install a skill
oma install proactive-agent

# Install specific version
oma install proactive-agent@3.1.0

# Install from GitHub
oma install github:FrankieMolt/proactive-agent
```

### Managing Skills

```bash
# List installed skills
oma list skills

# Update a skill
oma update proactive-agent

# Update all skills
oma update --all

# Remove a skill
oma remove proactive-agent

# Enable/disable skill
oma enable proactive-agent
oma disable proactive-agent
```

### Skill Configuration

Each skill has its own config in `~/.oma/skills/{skill-name}/config.json`:

```json
{
  "name": "proactive-agent",
  "version": "3.1.0",
  "enabled": true,
  "settings": {
    "anticipation_level": "high",
    "max_autonomous_actions": 10,
    "confirmation_required": true,
    "learning_enabled": true
  }
}
```

### Using Skills in Code

```javascript
const { SkillLoader } = require('@openmarketaccess/sdk');

const loader = new SkillLoader();
const proactive = loader.load('proactive-agent');

// Use skill tools
const prediction = await proactive.tools.anticipate_needs({
  context: currentConversation
});

if (prediction.confidence > 0.8) {
  await proactive.tools.take_action({
    action: prediction.suggestedAction
  });
}
```

---

## Using MCP Servers

### What are MCP Servers?

MCP (Model Context Protocol) servers provide tools, resources, and prompts to AI assistants like Claude. They run locally and communicate via stdio.

### Installing MCP Servers

```bash
# Add to Claude Desktop
oma add @modelcontextprotocol/server-filesystem ~/projects

# This updates Claude Desktop config automatically
# Location: ~/Library/Application Support/Claude/claude_desktop_config.json
```

### Available Servers

| Server | Description | Install Command |
|--------|-------------|-----------------|
| filesystem | File operations | `oma add @mcp/server-filesystem ~/projects` |
| postgres | PostgreSQL | `oma add @mcp/server-postgres "postgresql://..."` |
| github | GitHub API | `oma add @mcp/server-github` |
| brave-search | Web search | `oma add @mcp/server-brave-search` |
| memory | Knowledge graph | `oma add @mcp/server-memory` |

### Manual Configuration

Edit `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/you/projects"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxx"
      }
    }
  }
}
```

### Testing MCP Servers

```bash
# Test server directly
npx @modelcontextprotocol/server-filesystem ~/projects

# List available tools
oma mcp tools filesystem

# Test a tool
oma mcp test filesystem read_file --path "/test.txt"
```

---

## Using APIs

### Available APIs

| API | Base URL | Free Tier |
|-----|----------|-----------|
| Frankie API | https://frankie-prod.life.conway.tech | 100 calls/month |
| LLM Proxy | https://api.openmarketaccess.io/v1 | 10 calls/month |

### Connecting APIs

```bash
# Connect Frankie API
oma connect frankie-api --key YOUR_KEY

# Connect LLM API
oma connect llm-api --key YOUR_OPENROUTER_KEY
```

### Using APIs in Code

```javascript
const { OMAClient } = require('@openmarketaccess/sdk');

const client = new OMAClient({
  apiKey: 'your-api-key'
});

// Get crypto prices
const prices = await client.frankie.getPrice();
console.log(prices);
// { sol: { price: "176.42" }, btc: { price: "67234.50" } }

// Get trading signal
const signal = await client.frankie.getSignal({ asset: 'SOL' });
console.log(signal);
// { signal: "BUY", confidence: 0.78 }

// Use LLM
const response = await client.llm.chat({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello!' }]
});
```

### Direct API Calls

```bash
# Health check (free)
curl https://frankie-prod.life.conway.tech/health

# Get stats (free)
curl https://frankie-prod.life.conway.tech/stats

# Get prices ($0.05)
curl -H "X-Payment: proof" https://frankie-prod.life.conway.tech/price

# Get signal ($0.25)
curl -H "X-Payment: proof" https://frankie-prod.life.conway.tech/signal
```

---

## Payments with x402

### What is x402?

x402 is a micropayment protocol on Base network that enables instant, low-cost payments for API calls.

### Setup Wallet

```bash
# Create new wallet
oma wallet create

# Or import existing
oma wallet import --private-key 0x...

# Check balance
oma wallet balance
# Address: 0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6
# Balance: 12.50 USDC
```

### Fund Wallet

1. Get USDC on Base network
2. Send to your wallet address
3. Verify with `oma wallet balance`

### Making Payments

```bash
# Pay for API call
oma pay frankie-api price --amount 0.05

# The CLI handles:
# 1. Creating payment proof
# 2. Sending to API
# 3. Verifying response
```

### Payment Flow

```
1. Client requests API endpoint
2. API returns 402 Payment Required with x402 details
3. Client creates payment proof (USDC transfer on Base)
4. Client retries with X-Payment header
5. API verifies payment and returns data
```

---

## Troubleshooting

### Common Issues

#### Skills not loading

```bash
# Check skill status
oma list skills --verbose

# Reinstall skill
oma remove proactive-agent
oma install proactive-agent

# Check logs
oma logs skills
```

#### MCP server not connecting

```bash
# Test server directly
npx @modelcontextprotocol/server-filesystem ~/projects

# Check Claude Desktop config
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Restart Claude Desktop
```

#### API connection failed

```bash
# Test connection
oma test frankie-api

# Check API key
oma config get apis.frankie-api.key

# Test manually
curl https://frankie-prod.life.conway.tech/health
```

#### Payment failed

```bash
# Check wallet balance
oma wallet balance

# Check recent transactions
oma wallet transactions

# Verify Base network
oma wallet network
```

### Debug Mode

```bash
# Enable debug logging
oma config set debug true

# View logs
oma logs --follow

# Check specific component
oma logs skills --follow
oma logs mcp --follow
```

---

## Advanced Usage

### Creating Custom Skills

```bash
# Create new skill
oma create skill my-custom-skill

# This creates:
# my-custom-skill/
# ├── SKILL.md
# ├── index.js
# ├── package.json
# └── config.json
```

### Skill Structure

```javascript
// index.js
module.exports = {
  name: 'my-custom-skill',
  version: '1.0.0',
  
  // Tools the skill provides
  tools: {
    myTool: {
      description: 'What this tool does',
      parameters: {
        input: { type: 'string', required: true }
      },
      execute: async (params, context) => {
        return { result: 'done' };
      }
    }
  },
  
  // Lifecycle hooks
  onLoad: async (context) => {
    console.log('Skill loaded');
  },
  
  onUnload: async (context) => {
    console.log('Skill unloaded');
  }
};
```

### Creating MCP Servers

```bash
# Create from template
oma create mcp my-mcp-server

# Structure:
# my-mcp-server/
# ├── src/
# │   └── index.ts
# ├── package.json
# └── README.md
```

### Publishing

```bash
# Publish skill
oma publish my-skill

# Publish MCP server
npm publish --access public

# Submit to directory
oma submit my-mcp-server
```

---

## Next Steps

- [Publishing Guide](./PUBLISHING.md)
- [API Reference](./api-reference.md)
- [CLI Reference](./cli-reference.md)
- [Pricing](./PRICING.md)

## Support

- GitHub Issues: https://github.com/FrankieMolt/OMA-AI/issues
- Discord: https://discord.gg/openmarketaccess
- Email: support@openmarketaccess.io
- Docs: https://docs.openmarketaccess.io
