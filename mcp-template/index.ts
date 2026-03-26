/**
 * OMA MCP Server Template
 * Copy this to create your own MCP server for the OMA marketplace
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// ============================================
// MCP SERVER CONFIGURATION
// ============================================

const SERVER_CONFIG = {
  name: 'my-oma-mcp',
  version: '1.0.0',
  description: 'My custom MCP server for OMA marketplace',
  author: 'your-username',
};

// ============================================
// INITIALIZE MCP SERVER
// ============================================

const server = new Server(
  {
    name: SERVER_CONFIG.name,
    version: SERVER_CONFIG.version,
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ============================================
// TOOL DEFINITIONS
// ============================================

// Example Tool 1: Simple text processing
const TOOL_TEXT_PROCESSOR = {
  name: 'text_processor',
  description: 'Process and transform text with various operations',
  inputSchema: z.object({
    text: z.string().describe('Text to process'),
    operation: z.enum(['uppercase', 'lowercase', 'reverse', 'word_count']).describe('Operation to perform'),
  }).shape,
};

// Example Tool 2: Web search (using Exa API)
const TOOL_WEB_SEARCH = {
  name: 'web_search',
  description: 'Search the web using Exa API',
  inputSchema: z.object({
    query: z.string().describe('Search query'),
    numResults: z.number().min(1).max(100).default(10).describe('Number of results to return'),
    useAutoprompt: z.boolean().default(true).describe('Use AI-optimized query rewriting'),
  }).shape,
};

// Example Tool 3: Math calculator
const TOOL_CALCULATOR = {
  name: 'calculator',
  description: 'Perform mathematical calculations',
  inputSchema: z.object({
    expression: z.string().describe('Mathematical expression to evaluate (e.g., "2 + 2 * 3")'),
  }).shape,
};

// ============================================
// TOOL LIST HANDLER
// ============================================

server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: TOOL_TEXT_PROCESSOR.name,
        description: TOOL_TEXT_PROCESSOR.description,
        inputSchema: zodToJsonSchema(TOOL_TEXT_PROCESSOR.inputSchema),
      },
      {
        name: TOOL_WEB_SEARCH.name,
        description: TOOL_WEB_SEARCH.description,
        inputSchema: zodToJsonSchema(TOOL_WEB_SEARCH.inputSchema),
      },
      {
        name: TOOL_CALCULATOR.name,
        description: TOOL_CALCULATOR.description,
        inputSchema: zodToJsonSchema(TOOL_CALCULATOR.inputSchema),
      },
    ],
  };
});

// ============================================
// TOOL CALL HANDLER
// ============================================

server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // Route to appropriate tool
    switch (name) {
      case TOOL_TEXT_PROCESSOR.name:
        return await handleTextProcessor(args);
      case TOOL_WEB_SEARCH.name:
        return await handleWebSearch(args);
      case TOOL_CALCULATOR.name:
        return await handleCalculator(args);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
      isError: true,
    };
  }
});

// ============================================
// TOOL IMPLEMENTATIONS
// ============================================

async function handleTextProcessor(args: any) {
  const { text, operation } = args;

  let result: string;

  switch (operation) {
    case 'uppercase':
      result = text.toUpperCase();
      break;
    case 'lowercase':
      result = text.toLowerCase();
      break;
    case 'reverse':
      result = text.split('').reverse().join('');
      break;
    case 'word_count':
      result = text.split(/\s+/).length.toString();
      break;
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }

  return {
    content: [
      {
        type: 'text',
        text: `Processed text: ${result}`,
      },
    ],
  };
}

async function handleWebSearch(args: any) {
  const { query, numResults, useAutoprompt } = args;

  // Example: Call Exa API
  // const response = await fetch('https://api.exa.ai/search', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'x-api-key': process.env.EXA_API_KEY,
  //   },
  //   body: JSON.stringify({
  //     query,
  //     numResults,
  //     useAutoprompt,
  //   }),
  // });
  // const data = await response.json();

  // Mock data for template
  const mockResults = [
    { title: 'Result 1', url: 'https://example.com/1', snippet: 'Mock result 1' },
    { title: 'Result 2', url: 'https://example.com/2', snippet: 'Mock result 2' },
  ];

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          query,
          results: mockResults.slice(0, numResults),
          count: mockResults.length,
        }, null, 2),
      },
    ],
  };
}

async function handleCalculator(args: any) {
  const { expression } = args;

  // Safe evaluation (for demo - use mathjs in production)
  try {
     
    const result = eval(expression);

    return {
      content: [
        {
          type: 'text',
          text: `${expression} = ${result}`,
        },
      ],
    };
  } catch (error) {
    throw new Error(`Invalid expression: ${expression}`);
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function zodToJsonSchema(schema: z.ZodType<any>): any {
  // Convert Zod schema to JSON Schema
  // Simplified for template - use zod-to-json-schema in production
  return {
    type: 'object',
    properties: {
      // Add your schema properties here
    },
  };
}

// ============================================
// START SERVER
// ============================================

async function main() {
  console.log(`Starting ${SERVER_CONFIG.name} v${SERVER_CONFIG.version}...`);
  console.log(`Author: ${SERVER_CONFIG.author}`);
  console.log(`Description: ${SERVER_CONFIG.description}`);
  console.log('');

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.log('✅ MCP server running on stdio');
  console.log('Press Ctrl+C to stop');
}

// Start server
main().catch((error) => {
  console.error('Failed to start MCP server:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n👋 Shutting down MCP server...');
  await server.close();
  process.exit(0);
});
