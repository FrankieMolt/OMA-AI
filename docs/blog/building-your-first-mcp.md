---
title: Building Your First MCP: A Complete Guide
description: Step-by-step tutorial for creating and publishing your first MCP tool for AI agents with Model Context Protocol.
date: 2026-03-12
author: OMA-AI Team
tags: [MCP, tutorial, development, guide]
---

# Building Your First MCP: A Complete Guide

The Model Context Protocol (MCP) is revolutionizing how AI agents interact with external tools and services. In this comprehensive guide, we'll walk you through building, testing, deploying, and monetizing your first MCP from scratch.

## Table of Contents
1. [What is MCP?](#what-is-mcp)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Implementing Tools](#implementing-tools)
5. [Transport Protocols](#transport-protocols)
6. [Testing Your MCP](#testing-your-mcp)
7. [Deploying to Production](#deploying-to-production)
8. [Registering on OMA-AI](#registering-on-oma-ai)
9. [Monetization with x402](#monetization-with-x402)
10. [Best Practices](#best-practices)

## What is MCP?

The Model Context Protocol is an open standard that enables AI agents to connect to external tools and data sources in a standardized way. Think of it as a universal API that allows AI assistants like Claude Desktop, OpenAI agents, and other AI systems to access capabilities beyond their built-in features.

### Key Benefits of MCP

- **Universal Compatibility:** Works with any AI agent that supports MCP
- **Type-Safe:** Strong typing with JSON Schema for inputs/outputs
- **Flexible Transport:** Supports stdio, HTTP/SSE, and WebSocket
- **Secure:** Built-in authentication and authorization
- **Scalable:** Handle millions of API calls efficiently

### MCP in the Ecosystem

MCP is being adopted across the AI ecosystem:

- **Claude Desktop:** Native MCP support
- **OpenAI GPTs:** MCP compatibility
- **LangChain:** MCP integrations
- **Custom Agents:** Easy integration via standard protocol

## Prerequisites

Before we start building, make sure you have:

### Required Tools
- **Node.js** (v18 or later)
- **TypeScript** (v5 or later)
- **Package Manager** (npm, yarn, or pnpm)

### Optional Tools
- **Git** - For version control
- **Postman** - For API testing
- **VS Code** - Recommended IDE with MCP extensions

### Knowledge Requirements
- Basic JavaScript/TypeScript
- Understanding of JSON Schema
- Familiarity with REST APIs (helpful)

## Project Structure

A standard MCP project follows this structure:

```
my-mcp/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts          # Main MCP server entry point
│   ├── tools/
│   │   ├── tool1.ts
│   │   ├── tool2.ts
│   │   └── ...
│   └── utils/
│       ├── auth.ts
│       ├── validation.ts
│       └── error-handling.ts
├── tests/
│   ├── tool1.test.ts
│   └── ...
├── README.md
└── .env.example
```

### Initialize Your Project

```bash
# Create project directory
mkdir my-first-mcp
cd my-first-mcp

# Initialize package.json
npm init -y

# Install dependencies
npm install @modelcontextprotocol/sdk typescript @types/node zod

# Install dev dependencies
npm install -D @types/node typescript tsx vitest

# Create TypeScript config
npx tsc --init
```

### Update package.json

```json
{
  "name": "my-first-mcp",
  "version": "1.0.0",
  "description": "My first MCP tool for AI agents",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsx src/index.ts",
    "test": "vitest"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "typescript": "^5.3.0",
    "tsx": "^4.7.0",
    "vitest": "^1.1.0"
  }
}
```

## Implementing Tools

Let's create a simple but useful MCP: a **Weather Tool** that provides current weather and forecasts.

### Tool 1: Get Current Weather

Create `src/tools/get-weather.ts`:

```typescript
import { z } from 'zod';

// Define input schema using Zod
export const GetWeatherInputSchema = z.object({
  city: z.string().min(2).max(100),
  units: z.enum(['metric', 'imperial']).default('metric')
});

export type GetWeatherInput = z.infer<typeof GetWeatherInputSchema>;

// Define output schema
export const WeatherOutputSchema = z.object({
  city: z.string(),
  temperature: z.number(),
  humidity: z.number(),
  windSpeed: z.number(),
  description: z.string(),
  units: z.enum(['metric', 'imperial'])
});

export type WeatherOutput = z.infer<typeof WeatherOutputSchema>;

// Tool implementation
export async function getWeather(input: GetWeatherInput): Promise<WeatherOutput> {
  const { city, units } = GetWeatherInputSchema.parse(input);

  // Call weather API (using OpenWeatherMap as example)
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${units}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    city: data.name,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    description: data.weather[0].description,
    units: units
  };
}

// Export tool metadata
export const getWeatherTool = {
  name: 'get_weather',
  description: 'Get current weather for a city',
  inputSchema: GetWeatherInputSchema,
  outputSchema: WeatherOutputSchema,
  handler: getWeather
};
```

### Tool 2: Get 7-Day Forecast

Create `src/tools/get-forecast.ts`:

```typescript
import { z } from 'zod';

export const GetForecastInputSchema = z.object({
  city: z.string().min(2).max(100),
  units: z.enum(['metric', 'imperial']).default('metric'),
  days: z.number().min(1).max(7).default(7)
});

export type GetForecastInput = z.infer<typeof GetForecastInputSchema>;

export const ForecastDaySchema = z.object({
  date: z.string(),
  temperature: z.object({
    min: z.number(),
    max: z.number()
  }),
  humidity: z.number(),
  description: z.string()
});

export const ForecastOutputSchema = z.object({
  city: z.string(),
  days: z.array(ForecastDaySchema)
});

export type ForecastOutput = z.infer<typeof ForecastOutputSchema>;

export async function getForecast(input: GetForecastInput): Promise<ForecastOutput> {
  const { city, units, days } = GetForecastInputSchema.parse(input);

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${units}&cnt=${days}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Forecast API error: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    city: data.city.name,
    days: data.list.map((item: any) => ({
      date: item.dt_txt,
      temperature: {
        min: item.main.temp_min,
        max: item.main.temp_max
      },
      humidity: item.main.humidity,
      description: item.weather[0].description
    }))
  };
}

export const getForecastTool = {
  name: 'get_forecast',
  description: 'Get 7-day weather forecast for a city',
  inputSchema: GetForecastInputSchema,
  outputSchema: ForecastOutputSchema,
  handler: getForecast
};
```

### Create Main MCP Server

Create `src/index.ts`:

```typescript
import { MCPServer } from '@modelcontextprotocol/sdk';
import { getWeatherTool } from './tools/get-weather';
import { getForecastTool } from './tools/get-forecast';

// Create MCP server
const server = new MCPServer({
  name: 'weather-mcp',
  version: '1.0.0',
  description: 'Weather information MCP with current conditions and forecasts',
  tools: [getWeatherTool, getForecastTool],
  capabilities: {
    streaming: false
  }
});

// Start server
if (process.stdin.isTTY) {
  // stdio mode (local development)
  server.start();
} else {
  // HTTP mode (remote production)
  const port = process.env.PORT || 3000;
  server.startHTTP(port);
  console.log(`MCP server running on port ${port}`);
}
```

## Transport Protocols

MCP supports three transport protocols for different use cases:

### 1. stdio (Local Development)

**Best For:** Development, testing, local agents

**Pros:**
- Simplest setup
- No network configuration
- Fast iteration
- Perfect for local development

**Cons:**
- Local only
- No remote access
- Can't scale

**Implementation:** Built-in to MCP SDK

### 2. HTTP/SSE (Remote Production)

**Best For:** Production, remote agents, scaling

**Pros:**
- Remote access
- Scalable
- Works behind firewall/NAT
- Real-time updates via SSE

**Cons:**
- More complex setup
- Needs hosting
- Network configuration required

**Implementation:**
```typescript
server.startHTTP(3000, {
  cors: true,
  authentication: {
    type: 'x402',
    treasury: process.env.TREASURY_ADDRESS
  }
});
```

### 3. WebSocket (Real-time)

**Best For:** Real-time, high-frequency updates

**Pros:**
- Real-time bi-directional
- High performance
- Perfect for streaming

**Cons:**
- More complex
- Requires WebSocket support
- Similar to HTTP/SSE in complexity

## Testing Your MCP

### Unit Tests

Create `tests/get-weather.test.ts`:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { getWeather, getWeatherTool } from '../src/tools/get-weather';

// Mock fetch
global.fetch = vi.fn();

describe('getWeather', () => {
  it('should fetch weather data', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        name: 'London',
        main: {
          temp: 15,
          humidity: 72
        },
        wind: {
          speed: 3.5
        },
        weather: [{
          description: 'light rain'
        }]
      })
    };

    vi.mocked(fetch).mockResolvedValue(mockResponse as any);

    const result = await getWeather({ city: 'London' });

    expect(result.city).toBe('London');
    expect(result.temperature).toBe(15);
    expect(result.humidity).toBe(72);
  });

  it('should validate input', async () => {
    await expect(getWeather({ city: 'L' })).rejects.toThrow();
  });
});
```

Run tests:
```bash
npm test
```

### Manual Testing

Using stdio:
```bash
# In development mode
npm run dev

# Test tool manually
echo '{"method":"tools/call","params":{"name":"get_weather","arguments":{"city":"London"}}}' | npm run dev
```

Using HTTP:
```bash
# Start server
npm run build
PORT=3000 node dist/index.js

# Test with curl
curl http://localhost:3000/tools/get_weather \
  -H "Content-Type: application/json" \
  -d '{"city":"London"}'
```

## Deploying to Production

### Option 1: Vercel (Recommended for Starters)

**Setup:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

**vercel.json configuration:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "OPENWEATHER_API_KEY": "@openweather_api_key"
  }
}
```

**Cost:** Free tier (100K requests/month), Pro ($20/month)

### Option 2: VPS (Full Control)

**Setup:**
```bash
# SSH into VPS
ssh user@your-vps

# Clone repository
git clone https://github.com/yourusername/your-mcp.git
cd your-mcp

# Install dependencies
npm install

# Build
npm run build

# Start with PM2
npm install -g pm2
pm2 start dist/index.js --name weather-mcp
pm2 startup
pm2 save
```

**Cost:** $4-20/month (DigitalOcean, Linode, Vultr)

### Option 3: Serverless (Cost-Effective)

**Setup:**
```bash
# Create serverless function
# handlers/WeatherTool.ts

export default async function handler(event) {
  const { city } = JSON.parse(event.body);
  const weather = await getWeather({ city });
  return {
    statusCode: 200,
    body: JSON.stringify(weather)
  };
}
```

**Cost:** $0-20/month (Vercel, AWS Lambda, Cloudflare Workers)

## Registering on OMA-AI

Once your MCP is deployed, register it on OMA-AI marketplace.

### Step 1: Create Account
1. Visit https://www.oma-ai.com/signup
2. Enter email and create password
3. Verify email
4. Log in at https://www.oma-ai.com/login

### Step 2: Connect Wallet
1. Go to https://www.oma-ai.com/wallet
2. Click "Connect Wallet"
3. Choose MetaMask (Base) or Phantom (Solana)
4. Approve connection
5. Verify USDC balance

### Step 3: Publish MCP
1. Visit https://www.oma-ai.com/publish
2. Complete 4-step wizard:

**Step 1: Basic Info**
- Name: Weather MCP
- Slug: weather-mcp
- Category: Utility
- Short Description: Current weather and 7-day forecasts
- Long Description: [Full details]

**Step 2: Configuration**
- Endpoint URL: https://your-mcp.vercel.app
- Transport Protocol: HTTP/SSE
- Repository: https://github.com/yourusername/your-mcp
- Documentation URL: https://your-mcp.vercel.app/docs

**Step 3: Tools**
- Add tool: get_weather
  - Name: Get Current Weather
  - Description: Get current weather for a city
  - Input Schema: [JSON schema]
  - Output Schema: [JSON schema]

- Add tool: get_forecast
  - Name: Get 7-Day Forecast
  - Description: Get weather forecast for a city
  - Input Schema: [JSON schema]
  - Output Schema: [JSON schema]

**Step 4: Pricing**
- Global Price Tier: Low
- get_weather: $0.0001/call
- get_forecast: $0.0002/call
- x402 Payments: Enabled

3. Submit for review

### Step 4: Verification
OMA-AI team will review your MCP:
- Test all tools
- Verify functionality
- Check documentation
- Test payment flow

Once approved, your MCP will appear in the marketplace!

## Monetization with x402

OMA-AI uses x402 protocol for gasless microtransactions. Here's how you earn:

### Pricing Model

Choose from these pricing tiers:

| Tier | Price Range | Best For | Example |
|-------|--------------|-----------|---------|
| **Free** | $0 | Basic tools | Calculator, unit converter |
| **Low** | $0.0001 - $0.001 | Simple APIs | Weather, time, basic queries |
| **Medium** | $0.001 - $0.01 | Complex tools | Database queries, image processing |
| **High** | $0.01 - $0.10 | Premium features | AI models, advanced analytics |

### Revenue Split

- **OMA-AI Fee:** 5%
- **Your Payout:** 95%

### Payout Schedule

- **Frequency:** Monthly (1st of each month)
- **Minimum:** $10 USDC
- **Method:** Base USDC or Solana USDC (your choice)
- **Automatic:** If minimum met, payout sent automatically

### Revenue Projections

Example pricing and usage:

| Tool | Price | Daily Calls | Daily Revenue | Monthly Revenue | Your Monthly |
|-------|--------|--------------|----------------|--------------|
| get_weather | $0.0001 | 1000 | $0.10 | $0.095 |
| get_forecast | $0.0002 | 500 | $0.10 | $0.095 |
| **Total** | - | **1500** | **$20.00** | **$19.00** |

Scale to 10,000 calls/day:
- **Daily Revenue:** $2.00
- **Monthly Revenue:** $60.00
- **Your Monthly:** $57.00

## Best Practices

### 1. Input Validation

Always validate inputs with Zod:

```typescript
import { z } from 'zod';

const InputSchema = z.object({
  city: z.string().min(2).max(100),
  limit: z.number().min(1).max(100).optional()
});

const validated = InputSchema.parse(input);
```

### 2. Error Handling

Provide clear error messages:

```typescript
try {
  const result = await apiCall(input);
  return result;
} catch (error) {
  throw new Error(`Failed to fetch weather: ${error.message}`);
}
```

### 3. Rate Limiting

Protect against abuse:

```typescript
const rateLimiter = new RateLimiter({
  tokens: 100,      // Max 100 tokens
  refillRate: 10,  // Refill 10 tokens/sec
  interval: 1000
});

if (!rateLimiter.tryConsume(1)) {
  throw new Error('Rate limit exceeded');
}
```

### 4. Caching

Reduce API calls:

```typescript
const cache = new LRUCache({
  max: 1000,
  ttl: 2 * 60 * 1000  // 2 minutes
});

const cached = cache.get(city);
if (cached) {
  return cached;
}

const result = await fetchWeather(city);
cache.set(city, result, { ttl: 120000 });
return result;
```

### 5. Documentation

Always document:
- Tool purpose
- Input/output schemas
- Examples
- Error codes
- Rate limits

### 6. Testing

Test everything:
- Unit tests for each tool
- Integration tests for API
- Load tests for performance
- Security tests for vulnerabilities

### 7. Security

Never expose:
- API keys (use environment variables)
- User data
- System internals

Sanitize all outputs.

## Troubleshooting

### Common Issues

**Issue:** "Cannot find module '@modelcontextprotocol/sdk'"
**Solution:** `npm install @modelcontextprotocol/sdk`

**Issue:** "Tool not found"
**Solution:** Ensure tools are exported correctly in `src/index.ts`

**Issue:** "404 on deployment"
**Solution:** Check `vercel.json` routes configuration

**Issue:** "CORS error"
**Solution:** Enable CORS in HTTP server: `server.startHTTP(port, { cors: true })`

**Issue:** "Environment variable not found"
**Solution:** Add to `.env` file and deploy configuration

## Next Steps

Congratulations on building your first MCP! 🎉

**What's Next:**
1. ✅ Your MCP is built and tested
2. ✅ Deployed to production
3. ✅ Registered on OMA-AI
4. ✅ Monetization enabled with x402

**Continue Learning:**
- Read [MCP Documentation](https://docs.oma-ai.com/mcp)
- Explore [Other MCPs](https://www.oma-ai.com/mcps)
- Join [Discord Community](https://discord.gg/oma-ai)

**Build More MCPs:**
- Database Query MCP
- Web Scraper MCP
- Email Sending MCP
- Image Processing MCP
- [And 100s more!](https://www.oma-ai.com/mcps)

---

*Published: March 12, 2026*
*Updated: March 12, 2026*
*Author: OMA-AI Team*
