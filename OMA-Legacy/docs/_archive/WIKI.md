# OpenMarketAccess Wiki

Welcome to the central knowledge base for OpenMarketAccess (OMA). This document serves as the entry point for all technical, architectural, and operational documentation.

## 📚 Core Documentation

### Getting Started
- [**README**](../README.md): Project overview, features, and quick start.
- [**Deployment Guide**](./DEPLOYMENT_GUIDE.md): Infrastructure setup, environment variables, and production deployment.
- [**SDK Guide**](./SDK_GUIDE.md): Developer guide for `@oma/sdk`.

### Architecture & Protocols
- [**x402 Payment Protocol**](./X402_PAYMENT_PROTOCOL.md): Technical specification of the payment layer.
- [**API Documentation**](./API_DOCUMENTATION.md): REST API reference for the platform.
- [**Community Integration**](./COMMUNITY_INTEGRATION.md): Guide for importing skills and agents from the community.

### Reports
- [**Audit Report**](../AUDIT_REPORT.md): Latest system audit and refactoring status.

## 🧩 Directory Structure

```
/
├── apps/
│   └── web/              # Next.js Frontend & API
├── sdk/                  # TypeScript SDK
├── docs/                 # Documentation (You are here)
└── ...
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- PostgreSQL 15+ (or PGlite for non-Next.js environments)
- Solana Wallet (for payment testing)

### Commands
- `npm run dev`: Start full stack
- `npm run build`: Build all packages
- `npm run db:studio`: Open Drizzle Studio
- `npm run seed`: Seed database

## 🤝 Contributing

We welcome contributions! Please see the [Contribution Guide](../CONTRIBUTING.md) (coming soon) for details.
