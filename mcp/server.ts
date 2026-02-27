#!/usr/bin/env node

/**
 * OMA-AI MCP Server
 * Model Context Protocol server for OMA-AI APIs
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const OMA_BASE_URL = 'https://oma-ai.com';
const API_KEY = process.env.OMA_API_KEY || '';

// Helper function to make API calls
async function callOMAAPI(endpoint: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  
  if (API_KEY) {
    headers['Authorization'] = `Bearer ${API_KEY}`;
  }
  
  const response = await fetch(`${OMA_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  return response.json();
}

// Define available tools
const TOOLS = [
  {
    name: 'oma_get_crypto_prices',
    description: 'Get real-time cryptocurrency prices for Bitcoin, Ethereum, Solana, and 100+ more',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'oma_get_weather',
    description: 'Get current weather conditions and forecast for any city',
    inputSchema: {
      type: 'object',
      properties: {
        city: {
          type: 'string',
          description: 'City name (e.g., "London", "New York")',
        },
        units: {
          type: 'string',
          enum: ['metric', 'imperial'],
          description: 'Temperature units',
        },
      },
      required: ['city'],
    },
  },
  {
    name: 'oma_search_web',
    description: 'Search the web with AI-powered summarization',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results (default: 5)',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'oma_scrape_web',
    description: 'Scrape content from any URL with adaptive parsing',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'URL to scrape',
        },
        selector: {
          type: 'string',
          description: 'CSS selector (default: body)',
        },
        extract: {
          type: 'string',
          enum: ['text', 'html', 'links', 'markdown'],
          description: 'Extraction mode',
        },
      },
      required: ['url'],
    },
  },
  {
    name: 'oma_list_apis',
    description: 'List all available APIs on the OMA-AI marketplace',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'oma_get_llm_response',
    description: 'Generate text using the LLM gateway (supports GPT-4, Claude, Llama, etc.)',
    inputSchema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'Input prompt',
        },
        model: {
          type: 'string',
          description: 'Model to use (gpt-4o, claude-3-sonnet, llama-3-70b, auto)',
        },
        max_tokens: {
          type: 'number',
          description: 'Maximum tokens (default: 1000)',
        },
      },
      required: ['prompt'],
    },
  },
];

// Tool handlers
async function handleToolCall(name: string, args: Record<string, unknown>) {
  switch (name) {
    case 'oma_get_crypto_prices': {
      const data = await callOMAAPI('/api/prices');
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
    
    case 'oma_get_weather': {
      const city = encodeURIComponent(args.city as string);
      const units = args.units || 'metric';
      const data = await callOMAAPI(`/api/weather?city=${city}&units=${units}`);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
    
    case 'oma_search_web': {
      const data = await callOMAAPI('/api/search', {
        method: 'POST',
        body: JSON.stringify({
          query: args.query,
          limit: args.limit || 5,
        }),
      });
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
    
    case 'oma_scrape_web': {
      const data = await callOMAAPI('/api/scrape', {
        method: 'POST',
        body: JSON.stringify({
          url: args.url,
          selector: args.selector || 'body',
          extract: args.extract || 'text',
        }),
      });
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
    
    case 'oma_list_apis': {
      const data = await callOMAAPI('/api/marketplace');
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
    
    case 'oma_get_llm_response': {
      const data = await callOMAAPI('/api/llm', {
        method: 'POST',
        body: JSON.stringify({
          prompt: args.prompt,
          model: args.model || 'auto',
          max_tokens: args.max_tokens || 1000,
        }),
      });
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
    
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// Create server
const server = new Server(
  {
    name: 'oma-ai',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle list tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  return handleToolCall(name, args || {});
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('OMA-AI MCP Server running');
}

main().catch(console.error);
