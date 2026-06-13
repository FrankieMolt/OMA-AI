import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      name: 'OMA-AI MCP Marketplace API',
      version: '1.0.0',
      list_endpoint: '/api/mcp/list',
      docs: '/docs/api',
      x402: true,
      message: 'x402 payments enabled for all MCP endpoints',
    });
  } catch (error) {
    console.error('[GET /api/mcp] error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
