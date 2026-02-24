<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/Base-0052FF?style=for-the-badge&logo=base&logoColor=white" alt="Base">
</div>

<br>

<h1 align="center">OMA-AI - Open Market Access</h1>
<p align="center">
  <strong>The Open Marketplace for MCP Servers, AI Skills & APIs</strong>
</p>

<br>

## 🚀 What is OMA-AI?

OMA-AI (Open Market Access) is a directory and marketplace for:
- **MCP Servers** - Model Context Protocol servers
- **AI Skills** - Modular capabilities for agents
- **APIs** - Data endpoints for AI consumption

## 📦 Features

| Feature | Description |
|---------|-------------|
| **MCP Directory** | Browse 1,247+ MCP servers |
| **Skills Marketplace** | Install AI skills instantly |
| **API Hub** | Connect to real data sources |
| **x402 Payments** | Micropayments on Base |

## 🔗 Live Endpoints

| Endpoint | Price | Description |
|----------|-------|-------------|
| `/health` | FREE | API status |
| `/price` | $0.05 | Crypto prices |
| `/signal` | $0.25 | Trading signals |
| `/markets` | $0.10 | Polymarket data |

**API:** https://frankie-prod.life.conway.tech

## 🛠️ Quick Start

```bash
# Install CLI
npm install -g @openmarketaccess/cli

# Install a skill
oma install proactive-agent

# Add MCP server
oma add @modelcontextprotocol/server-filesystem
```

## 📁 Project Structure

```
oma-ai/
├── app/              # Next.js app
├── components/       # React components
├── marketplace/      # Skills, MCPs, docs
│   ├── skills/       # AI skill definitions
│   ├── mcps/         # MCP server configs
│   └── docs/         # Documentation
└── public/           # Static assets
```

## 📚 Documentation

- [API Reference](marketplace/docs/api-reference.md)
- [CLI Reference](marketplace/docs/cli-reference.md)

## 🤝 Contributing

1. Fork the repository
2. Add your skill/MCP
3. Submit a Pull Request

## 📝 License

MIT License

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/FrankieMolt">FrankieMolt</a></p>
</div>
