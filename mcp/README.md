# OMA-AI MCP Server

> Model Context Protocol server for OMA-AI APIs

---

## Installation

```bash
npm install @oma-ai/mcp-server
```

Or use directly with npx:

```bash
npx @oma-ai/mcp-server
```

## Configuration

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "oma-ai": {
      "command": "npx",
      "args": ["-y", "@oma-ai/mcp-server"],
      "env": {
        "OMA_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Available Tools

### `oma_get_crypto_prices`

Get real-time cryptocurrency prices.

**Parameters:** None

**Example:**
```
Use oma_get_crypto_prices to get the current Bitcoin price
```

### `oma_get_weather`

Get weather data for any city.

**Parameters:**
- `city` (required): City name
- `units` (optional): "metric" or "imperial"

**Example:**
```
Use oma_get_weather with city="London" to get London weather
```

### `oma_search_web`

Search the web with AI-powered summarization.

**Parameters:**
- `query` (required): Search query
- `limit` (optional): Max results (default: 5)

**Example:**
```
Use oma_search_web with query="latest AI news" to search for AI news
```

### `oma_scrape_web`

Scrape content from any URL.

**Parameters:**
- `url` (required): URL to scrape
- `selector` (optional): CSS selector
- `extract` (optional): "text", "html", "links", "markdown"

**Example:**
```
Use oma_scrape_web with url="https://example.com" to scrape the page
```

### `oma_list_apis`

List all available APIs on OMA-AI marketplace.

**Parameters:** None

### `oma_get_llm_response`

Generate text using LLM gateway.

**Parameters:**
- `prompt` (required): Input prompt
- `model` (optional): Model to use (default: "auto")
- `max_tokens` (optional): Max tokens (default: 1000)

---

## Authentication

Set the `OMA_API_KEY` environment variable with your API key from https://oma-ai.com/dashboard

## Rate Limits

- Free tier: 1,000 calls/day
- Pro tier: Based on plan

## Support

- Discord: https://discord.gg/oma-ai
- Email: support@oma-ai.com

---

_Last updated: 2026-02-27_
