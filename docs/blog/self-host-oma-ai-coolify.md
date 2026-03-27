---
title: "Self-Hosting OMA-AI with Coolify: Complete Guide"
description: "Deploy the full OMA-AI stack on your own server with Coolify. Zero cloud costs, full control, running on a 10 dollar VPS."
date: "2026-03-22"
tags: ["self-hosting", "coolify", "deployment", "vps", "tutorial"]
---

# Self-Hosting OMA-AI with Coolify: Complete Guide

OMA-AI runs entirely on open-source software. Here is how to deploy it on a 10 dollar per month VPS with Coolify.

## What You Need

- VPS: 4GB RAM, 40GB SSD, Ubuntu 22.04 (Hetzner, Contabo, or any provider)
- Domain: Point DNS to your VPS
- Coolify: Free self-hosted deployment platform

## Step 1: Install Coolify

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

This installs Docker, Caddy (reverse proxy), and Coolify dashboard.

## Step 2: Deploy Supabase

OMA-AI uses Supabase (PostgreSQL + Auth + REST API). Clone the Supabase docker-compose and deploy via Coolify. Note your POSTGRES_PASSWORD and JWT_SECRET.

## Step 3: Deploy OMA-AI

Connect your GitHub repo in Coolify:
- Framework: Next.js
- Build command: npm run build
- Port: 3000

Set environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase.com
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
```

## Step 4: Database Setup

Run the schema from database/schema-production.sql. This creates all tables: mcp_servers, users, api_keys, transactions, x402_nonces.

## Step 5: Configure Domain

In Coolify, add your domain and Caddy handles SSL automatically.

## Cost Comparison

| Component | Self-Hosted | Vercel/Cloud |
|-----------|------------|--------------|
| VPS (4GB) | $10/mo | - |
| Supabase | $0 | $25+/mo |
| Storage | $0 | $5/mo |
| Compute | $0 | $20/mo |
| **Total** | **$10/mo** | **$50+/mo** |

## Updating

Pull latest from GitHub and Coolify auto-rebuilds with zero-downtime deployment.
