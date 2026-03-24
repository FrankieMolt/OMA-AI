---
title: Quick Start: Build Your First AI Agent in 5 Minutes
description: Step-by-step guide to building your first AI agent using OMA-Ai MCPs. Complete with code examples and deployment instructions.
date: 2026-03-12
author: OMA-Ai Team
tags: [quickstart, tutorial, ai-agent, beginner]
---

## Quick Start: Build Your First AI Agent in 5 Minutes

Welcome to OMA-Ai! In this quick start guide, you'll build a fully functional AI agent using our MCP marketplace. No AI experience required—just follow these steps.

## What You'll Build

A **personal AI assistant** that can:
- Answer questions about weather
- Send emails automatically
- Post updates to Twitter
- Search the web
- Process images

**Time:** 5 minutes
**Cost:** FREE (using free MCPs)
**Difficulty:** Beginner ⭐

---

## Prerequisites

- Node.js 18+ installed
- Basic JavaScript knowledge
- A code editor (VS Code recommended)
- Terminal access

---

## Step 1: Create Your Project

```bash
# Create project directory
mkdir my-ai-agent
cd my-ai-agent

# Initialize Node.js project
npm init -y

# Install OMA-Ai SDK
npm install @oma-ai/sdk

# Create main file
touch index.js
```

---

## Step 2: Connect to OMA-Ai

```javascript
// index.js
import { OMAI } from '@oma-ai/sdk';

// Initialize OMA-Ai client
const oma = new OMAI({
  apiKey: 'YOUR_FREE_API_KEY' // Get free key at oma-ai.com/signup
});

console.log('✅ Connected to OMA-Ai!');
```

---

## Step 3: Choose Your MCPs

**Free MCPs** (no cost to use):
- ✅ **Weather API MCP** - Weather data
- ✅ **Crypto Prices MCP** - Crypto prices
- ✅ **Web Scraper MCP** - Web content
- ✅ **Image Processor MCP** - Image manipulation

```javascript
// Add MCPs to your agent
const agent = oma.agent()
  .useMCP('weather-api-mcp')  // FREE
  .useMCP('crypto-prices-mcp') // FREE
  .useMCP('web-scraper-mcp')   // FREE
  .useMCP('image-processor-mcp'); // FREE

console.log('✅ MCPs loaded!');
```

---

## Step 4: Create Your Agent Logic

```javascript
// Simple question-answering agent
async function answerQuestion(question) {
  console.log(`\n❓ Question: ${question}`);

  // Detect intent (simple keyword matching)
  const intent = detectIntent(question);

  let response;

  switch (intent.category) {
    case 'weather':
      response = await oma.callTool({
        mcp_id: 'weather-api-mcp',
        tool: 'get_weather',
        parameters: {
          city: intent.city,
          units: 'metric'
        }
      });
      break;

    case 'crypto':
      response = await oma.callTool({
        mcp_id: 'crypto-prices-mcp',
        tool: 'get_price',
        parameters: {
          id: 'bitcoin' // or ethereum, solana, etc.
        }
      });
      break;

    case 'search':
      response = await oma.callTool({
        mcp_id: 'web-scraper-mcp',
        tool: 'scrape',
        parameters: {
          url: intent.url
        }
      });
      break;

    case 'image':
      response = await oma.callTool({
        mcp_id: 'image-processor-mcp',
        tool: 'resize',
        parameters: {
          input_path: intent.image,
          output_path: 'resized.jpg',
          width: 800,
          height: 600
        }
      });
      break;

    default:
      response = "I'm not sure how to help with that. Try asking about weather, crypto prices, or web search!";
  }

  return response;
}

// Simple intent detection
function detectIntent(question) {
  const lower = question.toLowerCase();

  if (lower.includes('weather') || lower.includes('temperature') || lower.includes('forecast')) {
    // Extract city name
    const words = lower.split(' ');
    const cityIndex = words.findIndex(w => ['in', 'at', 'for'].includes(w));

    return {
      category: 'weather',
      city: cityIndex > 0 ? words[cityIndex + 1] : 'London'
    };
  }

  if (lower.includes('bitcoin') || lower.includes('crypto') || lower.includes('price')) {
    return {
      category: 'crypto'
    };
  }

  if (lower.includes('search') || lower.includes('find') || lower.includes('look up')) {
    return {
      category: 'search',
      url: extractUrl(question)
    };
  }

  if (lower.includes('resize') || lower.includes('image') || lower.includes('compress')) {
    return {
      category: 'image',
      image: extractImage(question)
    };
  }

  return { category: 'unknown' };
}

// Helper: Extract URL
function extractUrl(text) {
  const urlRegex = /https?:\/\/[^\s]+/i;
  const match = text.match(urlRegex);
  return match ? match[0] : 'https://example.com';
}

// Helper: Extract image path
function extractImage(text) {
  const words = text.split(' ');
  const imageIndex = words.findIndex(w => w.includes('.jpg') || w.includes('.png'));
  return imageIndex > 0 ? words[imageIndex] : 'image.jpg';
}
```

---

## Step 5: Add Interactive Prompt

```javascript
// Read questions from user input
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🤖 Your AI Agent is ready!');
console.log('✅ Ask about:');
console.log('   - Weather (e.g., "What\'s the weather in Paris?")');
console.log('   - Crypto prices (e.g., "What\'s the Bitcoin price?")');
console.log('   - Web search (e.g., "Search for latest AI news")');
console.log('   - Image processing (e.g., "Resize image.jpg to 800x600")');
console.log('\n❓ Type "exit" to quit\n');

rl.on('line', async (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('\n👋 Goodbye!');
    rl.close();
    return;
  }

  const answer = await answerQuestion(input);
  console.log(`\n💡 Answer: ${JSON.stringify(answer, null, 2)}\n`);

  rl.prompt();
});

rl.prompt();
```

---

## Step 6: Test Your Agent

```bash
# Run your agent
node index.js

# Example interactions:
# ❓ Question: What's the weather in Tokyo?
# 💡 Answer: { "temperature": 12.5, "humidity": 72, ... }

# ❓ Question: What's the Bitcoin price?
# 💡 Answer: { "price": 67234.52, "change_24h": 2.34, ... }

# ❓ Question: Search for latest AI news
# 💡 Answer: { "title": "...", "content": "...", ... }

# ❓ Question: Resize image.jpg to 800x600
# 💡 Answer: { "success": true, "output": "resized.jpg", ... }
```

---

## Step 7: Deploy to Production

```bash
# Deploy to Vercel (free hosting)
npm install -g vercel
vercel

# Follow prompts:
# - Link to existing project or create new
# - Configure build settings
# - Deploy!

# Your agent will be live in seconds!
# Example: https://my-ai-agent.vercel.app
```

---

## Advanced: Add More Features

### Feature 1: Add Email Notifications

```javascript
import { EmailMCP } from '@oma-ai/email-mcp';

const email = oma.useMCP('email-sender-mcp'); // $0.001/call

async function notifyUser(userEmail, message) {
  await oma.callTool({
    mcp_id: 'email-sender-mcp',
    tool: 'send',
    parameters: {
      to: userEmail,
      subject: 'Your AI Agent Update',
      body: message
    }
  });
}

// Usage
await notifyUser('user@example.com', 'Your weather query results are ready!');
```

### Feature 2: Add Twitter Integration

```javascript
import { TwitterMCP } from '@oma-ai/twitter-api-mcp';

const twitter = oma.useMCP('twitter-api-mcp'); // $0.003/call

async function postUpdate(message) {
  await oma.callTool({
    mcp_id: 'twitter-api-mcp',
    tool: 'post_tweet',
    parameters: {
      text: message
    }
  });
}

// Usage
await postUpdate('🚀 Just deployed my first AI agent using OMA-Ai!');
```

### Feature 3: Add Image Generation

```javascript
import { StabilityAIMCP } from '@oma-ai/stability-ai-mcp';

const stability = oma.useMCP('stability-ai-mcp'); // $0.025/call

async function generateImage(prompt) {
  const image = await oma.callTool({
    mcp_id: 'stability-ai-mcp',
    tool: 'generate',
    parameters: {
      prompt: prompt,
      width: 512,
      height: 512
    }
  });

  return image;
}

// Usage
const image = await generateImage('A futuristic city skyline at sunset');
```

---

## Full Example: Multi-Feature Agent

```javascript
// full-agent.js
import { OMAI } from '@oma-ai/sdk';
import readline from 'readline';

const oma = new OMAI({ apiKey: 'YOUR_API_KEY' });

const agent = oma.agent()
  .useMCP('weather-api-mcp')      // FREE
  .useMCP('crypto-prices-mcp')    // FREE
  .useMCP('web-scraper-mcp')       // FREE
  .useMCP('image-processor-mcp')   // FREE
  .useMCP('email-sender-mcp')      // $0.001/call
  .useMCP('twitter-api-mcp')       // $0.003/call
  .useMCP('stability-ai-mcp')     // $0.025/call;

async function processCommand(command) {
  const intent = detectIntent(command);

  switch (intent.action) {
    case 'weather':
      return await getWeather(intent);

    case 'crypto':
      return await getCryptoPrice(intent);
    case 'search':
      return await searchWeb(intent);
    case 'email':
      return await sendEmail(intent);
    case 'twitter':
      return await postTweet(intent);
    case 'image':
      return await generateImage(intent);
    default:
      return 'Unknown command. Try: weather, crypto, search, email, twitter, image';
  }
}

// ... (implement all functions above)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🤖 Multi-Feature AI Agent!');
console.log('✅ Commands: weather, crypto, search, email, twitter, image');

rl.on('line', async (input) => {
  const result = await processCommand(input);
  console.log(`\n✅ Result: ${JSON.stringify(result, null, 2)}\n`);
  rl.prompt();
});

rl.prompt();
```

---

## Pricing & Costs

### Free Usage

| MCP | Calls/Day | Cost | Features |
|------|-----------|------|----------|
| **Weather API** | Unlimited | $0 | Current weather, 7-day forecast |
| **Crypto Prices** | Unlimited | $0 | Real-time prices, market data |
| **Web Scraper** | Unlimited | $0 | Scrape web pages, extract data |
| **Image Processor** | Unlimited | $0 | Resize, compress, convert |

### Paid MCPs

| MCP | Price | When to Use |
|------|-------|-------------|
| **Email Sender** | $0.001/call | Send notifications |
| **Twitter API** | $0.003/call | Post updates |
| **Stability AI** | $0.025/call | Generate images |

### Monthly Costs (Example Usage)

| Usage | Free MCPs | Email | Twitter | Images | **Total** |
|--------|------------|-------|---------|--------|----------|
| **Light** | $0 | $10 | $30 | $25 | **$65/month** |
| **Medium** | $0 | $30 | $90 | $75 | **$195/month** |
| **Heavy** | $0 | $100 | $300 | $250 | **$650/month** |

---

## Troubleshooting

### Problem: API Key Invalid

**Solution:** Get free API key at https://www.oma-ai.com/signup

### Problem: MCP Not Found

**Solution:** Check MCP slug at https://www.oma-ai.com/mcps

### Problem: Rate Limit Exceeded

**Solution:** Upgrade to Basic ($5/mo) or Pro ($25/mo) tier

### Problem: Image Processing Failed

**Solution:** Ensure image path is correct and file exists

---

## Next Steps

1. **Deploy Your Agent:** Follow deployment instructions above
2. **Add More MCPs:** Browse all 19 MCPs at oma-ai.com/mcps
3. **Customize Your Agent:** Add your own features and logic
4. **Publish Your MCP:** Create and share your own MCPs
5. **Join Community:** Discord at discord.gg/oma-ai

---

## Resources

- **OMA-Ai Website:** https://www.oma-ai.com
- **MCP Marketplace:** https://www.oma-ai.com/mcps
- **API Documentation:** /docs/api
- **GitHub Repository:** https://github.com/oma-ai
- **Discord Community:** https://discord.gg/oma-ai
- **Twitter:** @oma_ai

---

**Congratulations!** 🎉 You've built your first AI agent in 5 minutes!

*Published: March 12, 2026*
*Updated: March 12, 2026*
*Author: OMA-Ai Team*
