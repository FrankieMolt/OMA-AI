import { NextRequest, NextResponse } from 'next/server';
import { mcpRegistryService } from '@/lib/mcp/mcp-registry.service';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const serverId = parseInt(id);

    if (isNaN(serverId)) {
      return NextResponse.json(
        {
          error: 'Invalid server ID',
        },
        { status: 400 }
      );
    }

    const server = await mcpRegistryService.getServerById(serverId);

    if (!server) {
      return NextResponse.json(
        {
          error: 'MCP server not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        serverId: server.id,
        serverName: server.name,
        tools: server.tools.map((tool) => ({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
        })),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to retrieve MCP tools',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
