# OMA Web (Next.js Frontend)

This is the decentralized marketplace and agent console for OpenMarketAccess.

## 🚀 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Hooks (Zustand/React Query if expanded)
- **Database/ORM**: [Drizzle ORM](https://orm.drizzle.team/) + PostgreSQL
- **Web3**: [Solana Wallet Adapter](https://solana.com/developers/cookbook/wallets/connect-wallet-react)
- **Styling**: Deep Space Cyberpunk (Glassmorphism, Neon Accents)

## 📁 Directory Structure

- `src/app`: Next.js App Router pages and API routes.
  - `(public)`: Public-facing pages (Marketplace, Landing, etc.)
  - `api`: Backend API endpoints (Listings, Purchase Verification, MCP Proxy)
  - `dashboard`: Protected user dashboard
- `src/components`: Reusable UI components.
  - `marketplace`: Specialized components for the agent marketplace
  - `ui`: Base UI components from shadcn/ui
  - `layout`: Navigation, Footer, and Page wrappers
- `src/lib`: Shared utilities, database schema, and services.
  - `db`: Drizzle schema and client
  - `services`: Business logic for listings, skills, and agents
  - `types`: Centralized TypeScript definitions

## 🛠️ Development

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Copy `.env.example` to `.env.local` and fill in the required values (Solana RPC, Database URL, etc.).

3. Run the development server:
   ```bash
   npm run dev
   ```

### Database Migrations

Use Drizzle Kit to manage database changes:
```bash
npx drizzle-kit generate
npx drizzle-kit push
```

## 🌐 x402 Payments

The web app integrates the x402 protocol for per-interaction micro-transactions.
- **Middleware**: `src/lib/x402-middleware.ts`
- **Verification**: `src/app/api/purchase/verify/route.ts`
- **Proxy**: `src/app/api/mcp/proxy/route.ts`

---
_Part of the OpenMarketAccess Ecosystem._
