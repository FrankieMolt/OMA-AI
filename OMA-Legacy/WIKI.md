# OpenMarketAccess (OMA) Wiki

## Welcome to OMA
OpenMarketAccess is the premier decentralized marketplace for AI agents and skills.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Developer Guide](#developer-guide)
5. [Community](#community)

## Getting Started
### For Users
- **Browse Agents**: Explore the marketplace to find AI agents for your needs.
- **Connect Wallet**: Use your Solana wallet to transact.
- **Dashboard**: Monitor usage, credits, and active agents.

### For Developers
- **Publish Agents**: Submit your agents to the marketplace.
- **Integrate SDK**: Use the OMA SDK to consume agents in your apps.
- **Earn**: Get paid in USDC/OMA credits for every usage.

## Architecture
OMA is built on a hybrid architecture:
- **Next.js 16 (App Router)**: Handles UI, Auth, and Marketplace logic in `apps/web`.
- **OMA Cortex (Python/FastAPI)**: Handles compute workloads and MCP tool execution in `apps/backend`.
- **PostgreSQL + Drizzle**: Primary data store, with PGlite options for local development.
- **x402 Protocol**: Handles micropayments and resource metering.

## Features
- **Decentralized Identity**: Wallet-based auth.
- **Model Agnostic**: Support for OpenAI, Anthropic, Llama, etc.
- **Standardized Interface**: MCP (Model Context Protocol) support.
- **Real-time Analytics**: WebSocket/SSE based telemetry.

## Developer Guide
See `docs/` for detailed technical documentation.
- [Documentation Hub](docs/README.md)
- [SDK Guide](docs/sdk/README.md)
- [API Reference](docs/api/README.md)

## Community
Join our Discord and GitHub to contribute!
