# Getting Started with Open Market Access

## What is OMA?

Open Market Access (OMA) is a marketplace for:
- **MCP Servers** - Connect AI assistants to tools and data
- **AI Skills** - Modular capabilities for autonomous agents
- **APIs** - Data endpoints with x402 micropayments

## Quick Start

### 1. Install the CLI

```bash
npm install -g @openmarketaccess/cli
```

### 2. Initialize

```bash
oma init
```

This creates `~/.oma/config.json` with default settings.

### 3. Install Your First Skill

```bash
oma install proactive-agent
```

### 4. Add an MCP Server

For Claude Desktop users:

```bash
oma add @modelcontextprotocol/server-filesystem /path/to/your/projects
```

This automatically updates your Claude Desktop config.

## Using Skills

Skills are loaded automatically when you start your AI agent.

### List Installed Skills

```bash
oma list
```

### Update Skills

```bash
oma update --all
```

### Remove a Skill

```bash
oma remove skill-name
```

## Using MCP Servers

MCP servers connect your AI assistant to external tools.

### Popular Servers

| Server | Purpose |
|--------|---------|
| `@mcp/server-filesystem` | File operations |
| `@mcp/server-postgres` | Database queries |
| `@mcp/server-github` | GitHub API |
| `@mcp/server-brave-search` | Web search |

### Adding to Claude Desktop

```bash
oma add @mcp/server-github
```

Or manually edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxx"
      }
    }
  }
}
```

## Connecting APIs

### List Available APIs

```bash
oma api list
```

### Connect an API

```bash
oma connect frankie-api --key YOUR_KEY
```

### Use in Code

```javascript
const { frankie } = require('@openmarketaccess/apis');

const price = await frankie.getPrice('SOL');
console.log(price); // { price: "176.42" }
```

## Making Payments

OMA uses x402 protocol for micropayments on Base.

### Setup Wallet

```bash
oma wallet setup
```

### Fund Wallet

Send USDC to the displayed address on Base network.

### Check Balance

```bash
oma wallet balance
```

### Pay for API Call

```bash
oma pay frankie-api price --amount 0.05
```

## Configuration

Config file: `~/.oma/config.json`

```json
{
  "version": "1.0",
  "skills": {
    "proactive-agent": {
      "enabled": true,
      "config": {}
    }
  },
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@mcp/server-filesystem", "/projects"]
    }
  },
  "apis": {
    "frankie-api": {
      "key": "xxx",
      "baseUrl": "https://frankie-prod.life.conway.tech"
    }
  },
  "wallet": {
    "address": "0x...",
    "network": "base-mainnet"
  }
}
```

## Troubleshooting

### Skills not loading

```bash
oma doctor
```

### MCP server not connecting

1. Check the server is installed: `npx @mcp/server-filesystem --version`
2. Check config: `cat ~/Library/Application\ Support/Claude/claude_desktop_config.json`
3. Restart Claude Desktop

### API connection failed

1. Check your API key: `oma config get apis.frankie-api.key`
2. Test connection: `oma api test frankie-api`

## Next Steps

- [Publish Your Own Skill](./PUBLISHING.md)
- [API Reference](./api-reference.md)
- [CLI Reference](./cli-reference.md)
