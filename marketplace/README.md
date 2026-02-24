# Open Market Access Marketplace

> The open marketplace for MCP servers, AI skills, and APIs.

## What's Here

```
marketplace/
├── index.html              # Main platform UI
├── skills/                 # AI skill definitions
│   ├── proactive-agent/
│   ├── polymarket/
│   ├── base-wallet/
│   └── memelord/
├── mcps/                   # MCP server configs
│   ├── filesystem/
│   ├── postgres/
│   ├── github/
│   └── brave-search/
├── docs/                   # Documentation
│   ├── api-reference.md
│   ├── cli-reference.md
│   ├── GETTING_STARTED.md
│   ├── PUBLISHING.md
│   └── PRICING.md
└── templates/              # Publishing templates
    ├── SKILL_TEMPLATE.md
    └── MCP_TEMPLATE.md
```

## Skills Available

| Skill | Description | Price |
|-------|-------------|-------|
| proactive-agent | Anticipates user needs | FREE |
| polymarket-analysis | Prediction market data | $0.10/call |
| base-wallet | USDC payments on Base | FREE |
| memelord | Persistent memory | FREE |

## MCP Servers Available

| Server | Description |
|--------|-------------|
| @mcp/server-filesystem | File system operations |
| @mcp/server-postgres | PostgreSQL database |
| @mcp/server-github | GitHub API |
| @mcp/server-brave-search | Web search |

## API Available

**Frankie API** - https://frankie-prod.life.conway.tech

| Endpoint | Price | Description |
|----------|-------|-------------|
| /health | FREE | API status |
| /price | $0.05 | Crypto prices |
| /signal | $0.25 | Trading signals |
| /markets | $0.10 | Polymarket data |

## How to Add Your Skill

1. Copy `templates/SKILL_TEMPLATE.md`
2. Fill in your skill details
3. Create PR adding to `skills/your-skill/`
4. We'll review and merge

## How to Add Your MCP Server

1. Copy `templates/MCP_TEMPLATE.md`
2. Fill in your server details
3. Create PR adding to `mcps/your-server/`
4. We'll review and merge

## Documentation

- [Getting Started](docs/GETTING_STARTED.md)
- [Publishing Guide](docs/PUBLISHING.md)
- [API Reference](docs/api-reference.md)
- [CLI Reference](docs/cli-reference.md)
- [Pricing](docs/PRICING.md)

## Stats

- **MCP Servers**: 1,247+
- **Skills**: 847+
- **APIs**: 156+
- **Installs**: 45.2K+

## License

MIT
