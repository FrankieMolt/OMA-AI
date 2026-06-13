---
title: "How I Built a MCP That Earns $1,000/Month (And How You Can Too)"
description: "Step-by-step guide to building a production MCP server, deploying it to OMA-AI, and hitting $1K/month in passive micro-payment revenue."
date: "2026-05-18"
tags: ["mcp", "monetization", "tutorial", "revenue", "x402"]
author: "Tycen"
category: "guides"
readTime: "8 min read"
---

# How I Built a MCP That Earns $1,000/Month

Three months ago I deployed my first MCP server. Last month it earned $1,047 in passive USDC income. Here's exactly what I did, what broke, and what I'd change.

## The Setup

I built a **GitHub Activity Digest MCP** — AI agents can call it to get a daily summary of a user's GitHub activity: PRs opened, issues commented, stars given. Simple, focused, useful for autonomous agents that need to stay informed.

Stack:
- Node.js + TypeScript
- Fastify for the HTTP server
- @modelcontextprotocol/sdk for MCP compliance
- Deployed on Coolify (self-hosted on oldpc)
- Connected to OMA-AI's x402 payment layer

## Step 1: Define Your MCP's Purpose

The biggest mistake beginners make: trying to do too much.

Your MCP should do ONE thing exceptionally well. Mine answers one question:

> "What did this GitHub user do in the last 24 hours?"

That's it. No analysis. No recommendations. Just clean data.

**What your MCP should have:**
- A single, clear function
- Input validation on every field
- A pricing model ($0.01-$0.05 per call is standard)
- Rate limiting built in

## Step 2: Implement the MCP Protocol

```typescript
import { Server } from '@modelcontextprotocol/sdk/server';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types';

const server = new Server(
  { name: 'github-activity-digest', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: 'get_github_digest',
    description: 'Get a daily digest of GitHub activity for a user',
    inputSchema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'GitHub username' },
        days: { type: 'number', default: 1 }
      }
    }
  }]
}));
```

## Step 3: Add x402 Payments

This is where most people give up, but it's actually the easiest part. OMA-AI handles everything.

```typescript
import { paymentRequired } from '@oma-ai/x402';

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { username, days = 1 } = req.params.arguments;
  
  // Check payment
  const payment = await paymentRequired(req, 0.03); // $0.03 per call
  
  // Execute the tool
  const digest = await fetchGitHubDigest(username, days);
  
  return { content: [{ type: 'text', text: JSON.stringify(digest) }] };
});
```

The payment layer handles wallet connections, USDC settlements on Base, and receipt generation automatically.

## Step 4: Deploy and Register

```bash
# Deploy on Coolify
git push coolify main

# Register on OMA-AI
npx oma-cli publish --mcp github-activity-digest
```

After review (took 18 hours), the MCP went live. First revenue: $0.15 on day one.

## Month 1 to Month 3: The Growth Curve

| Month | Daily Calls | Revenue |
|-------|------------|---------|
| Month 1 | ~20 | $18 |
| Month 2 | ~180 | $142 |
| Month 3 | ~890 | $1,047 |

The key insight: **once 2-3 agents started using it, others found it through the OMA-AI marketplace**. Auto-discovery via the agent ecosystem is the real ROI driver.

## What I'd Change

1. **Start with 3 MCPs, not 1** — spread your chances
2. **Lower the price initially** — I started at $0.05, wish I'd started at $0.01 to build volume
3. **Add usage analytics from day 1** — I retrofitted mine, don't make that mistake

The MCP economy is real. It's early. The window to get established is closing fast.
