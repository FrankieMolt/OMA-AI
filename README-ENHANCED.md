# OMA-AI - API Marketplace for AI Agents

[![Tests](https://img.shields.io/badge/tests-29%2F29-brightgreen)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()

## 🚀 Overview

OMA-AI is a comprehensive API marketplace connecting AI agents with powerful tools, APIs, and services. Built with Next.js 16, Supabase, and x402 payment infrastructure.

## ✨ Features

### Core Features
- **API Marketplace** - Browse and integrate 22+ APIs
- **Task System** - Rent-a-human / Task posting platform
- **x402 Payments** - Seamless crypto payments
- **Dark/Light Mode** - Beautiful theme toggle
- **Cmd+K Search** - Keyboard-first navigation
- **Toast Notifications** - Real-time feedback

### Developer Features
- **Next.js 16** - Latest framework with Turbopack
- **TypeScript** - Full type safety
- **Playwright Tests** - Comprehensive E2E testing
- **PWA Support** - Offline-first experience
- **SEO Optimized** - Structured data and meta tags

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.6
- **Language:** TypeScript 5.x
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS + Memoria design system
- **Payments:** x402 protocol
- **Auth:** Supabase Auth
- **Testing:** Playwright
- **Deployment:** Vercel

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Run development
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## 📁 Project Structure

```
app/           - Next.js app router pages
components/    - React components
  shared/      - Common UI components
  providers/   - Context providers
lib/           - Utilities and configurations
hooks/         - Custom React hooks
public/        - Static assets
supabase/      - Database migrations
scripts/       - Build and automation scripts
logs/          - Monitoring and audit logs
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run test` - Run Playwright tests
- `npm run lint` - Check code quality
- `npm run audit` - Security audit

## 📊 Performance

- Bundle size: ~141MB (optimized from 296MB)
- Time to First Byte: < 800ms
- Lighthouse Score: 88/100
- Tests: 29/29 passing

## 🛡️ Security

- Content Security Policy configured
- SQL injection prevention
- XSS protection
- Secure authentication
- Dependency auditing

## 📝 License

MIT License - see LICENSE file for details.

---

Built with ❤️ by Frankie 🧟‍♂️ for Nosyt Labs
