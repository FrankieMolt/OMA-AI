import { mcpRegistryService, MCPTool, MCPRegistryEntry } from './mcp-registry.service';
import { x402Middleware } from '@/lib/x402-middleware';
import { logger } from '@/lib/logger';
import { db, users } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

export interface MCPExecutionResult {
  success: boolean;
  result?: unknown;
  error?: string;
  toolName?: string;
  executionTime: number;
  cost?: number;
  requestId?: string;
}

export interface MCPSandboxConfig {
  maxExecutionTime: number;
  maxMemoryMB: number;
  allowNetworkAccess: boolean;
  allowedDomains?: string[];
}

export class MCPExecutionService {
  private sandboxConfig: MCPSandboxConfig = {
    maxExecutionTime: 30000,
    maxMemoryMB: 512,
    allowNetworkAccess: true,
    allowedDomains: ['localhost', '127.0.0.1', '*.oma.ai', 'api.openrouter.ai'],
  };

  async executeTool(
    serverId: number,
    toolName: string,
    toolArgs: Record<string, unknown>,
    _userId: string,
    userEmail: string,
    paymentSignature?: string
  ): Promise<MCPExecutionResult> {
    const startTime = Date.now();
    const requestId = crypto.randomUUID();

    try {
      const server = await mcpRegistryService.getServerById(serverId);
      if (!server) {
        return {
          success: false,
          error: 'MCP server not found',
          executionTime: Date.now() - startTime,
          requestId,
        };
      }

      const tool = server.tools.find((t) => t.name === toolName);
      if (!tool) {
        return {
          success: false,
          error: `Tool '${toolName}' not found on server`,
          executionTime: Date.now() - startTime,
          requestId,
        };
      }

      const price = server.price;
      const treasuryWallet = process.env.OMA_TREASURY_WALLET || 'oma-marketplace.sol';

      if (price > 0) {
        const mockRequest = new Request('http://localhost/api/mcp/execute', {
          method: 'POST',
          headers: paymentSignature
            ? {
                'PAYMENT-SIGNATURE': paymentSignature,
              }
            : {},
          body: JSON.stringify({
            serverId,
            toolName,
            toolArgs,
          }),
        });

        const paymentResponse = await x402Middleware(
          mockRequest as unknown as NextRequest,
          price,
          treasuryWallet,
          {
            enableRateLimiting: true,
            maxProcessingTime: this.sandboxConfig.maxExecutionTime,
          }
        );

        if (paymentResponse) {
          return {
            success: false,
            error: 'Payment required or verification failed',
            executionTime: Date.now() - startTime,
            requestId,
            cost: price,
          };
        }
      }

      const [user] = await db.select().from(users).where(eq(users.email, userEmail)).limit(1);
      if (!user) {
        return {
          success: false,
          error: 'User not found',
          executionTime: Date.now() - startTime,
          requestId,
        };
      }

      const result = await this.executeSandboxed(server, tool, toolArgs, this.sandboxConfig);

      await this.recordUsage(
        user.id,
        serverId,
        toolName,
        price,
        Date.now() - startTime,
        result.success
      );

      await mcpRegistryService.incrementUsage(serverId);

      return {
        success: result.success,
        result: result.data,
        error: result.error,
        toolName,
        executionTime: Date.now() - startTime,
        cost: price,
        requestId,
      };
    } catch (error) {
      logger.error('MCP Execution: Failed to execute tool', {
        serverId,
        toolName,
        error,
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime: Date.now() - startTime,
        requestId,
      };
    }
  }

  private async executeSandboxed(
    server: MCPRegistryEntry,
    tool: MCPTool,
    toolArgs: Record<string, unknown>,
    config: MCPSandboxConfig
  ): Promise<{ success: boolean; data?: unknown; error?: string }> {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Execution timeout')), config.maxExecutionTime);
    });

    try {
      const executionPromise = this.fetchToolResult(server, tool, toolArgs);
      const result = await Promise.race([executionPromise, timeoutPromise]);

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      if (error instanceof Error && error.message === 'Execution timeout') {
        return {
          success: false,
          error: `Tool execution exceeded ${config.maxExecutionTime}ms timeout`,
        };
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Tool execution failed',
      };
    }
  }

  private async fetchToolResult(
    server: MCPRegistryEntry,
    tool: MCPTool,
    toolArgs: Record<string, unknown>
  ): Promise<unknown> {
    try {
      const response = await fetch(server.endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MCP-Server-Id': server.id.toString(),
          'X-MCP-Tool-Name': tool.name,
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'tools/call',
          params: {
            name: tool.name,
            arguments: toolArgs,
          },
          id: crypto.randomUUID(),
        }),
        signal: AbortSignal.timeout(30000),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'Tool execution error');
      }

      return data.result;
    } catch (error) {
      logger.error('MCP Execution: Fetch tool result failed', {
        serverId: server.id,
        toolName: tool.name,
        error,
      });
      throw error;
    }
  }

  private async recordUsage(
    userId: number,
    serverId: number,
    toolName: string,
    cost: number,
    duration: number,
    success: boolean
  ): Promise<void> {
    try {
      // Note: usageRecords schema expects apiId, creditsUsed
      // MCP usage tracking requires schema update or separate table
      // For now, log usage without DB persistence
      logger.info('MCP tool usage', {
        userId,
        serverId,
        toolName,
        cost,
        duration,
        success,
      });
    } catch (error) {
      logger.error('MCP Execution: Failed to record usage', {
        userId,
        serverId,
        toolName,
        error,
      });
    }
  }

  async executeToolStream(
    serverId: number,
    toolName: string,
    toolArgs: Record<string, unknown>,
    _userId: string,
    _userEmail: string,
    paymentSignature?: string
  ): Promise<ReadableStream> {
    const requestId = crypto.randomUUID();

    try {
      const server = await mcpRegistryService.getServerById(serverId);
      if (!server) {
        throw new Error('MCP server not found');
      }

      const tool = server.tools.find((t) => t.name === toolName);
      if (!tool) {
        throw new Error(`Tool '${toolName}' not found on server`);
      }

      const price = server.price;
      const treasuryWallet = process.env.OMA_TREASURY_WALLET || 'oma-marketplace.sol';

      if (price > 0) {
        const mockRequest = new Request('http://localhost/api/mcp/execute', {
          method: 'POST',
          headers: paymentSignature
            ? {
                'PAYMENT-SIGNATURE': paymentSignature,
              }
            : {},
          body: JSON.stringify({
            serverId,
            toolName,
            toolArgs,
          }),
        });

        const paymentResponse = await x402Middleware(
          mockRequest as unknown as NextRequest,
          price,
          treasuryWallet
        );

        if (paymentResponse) {
          throw new Error('Payment required or verification failed');
        }
      }

      const stream = await this.fetchToolResultStream(server, tool, toolArgs, requestId);

      return new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();

          try {
            controller.enqueue(
              encoder.encode(
                JSON.stringify({
                  type: 'start',
                  requestId,
                  toolName,
                  timestamp: Date.now(),
                }) + '\n'
              )
            );

            const reader = stream.getReader();
            const decoder = new TextDecoder();

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const text = decoder.decode(value, { stream: true });
              controller.enqueue(encoder.encode(text));
            }

            controller.enqueue(
              encoder.encode(
                JSON.stringify({
                  type: 'end',
                  requestId,
                  timestamp: Date.now(),
                }) + '\n'
              )
            );

            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
      });
    } catch (error) {
      logger.error('MCP Execution: Failed to execute tool stream', {
        serverId,
        toolName,
        error,
      });
      throw error;
    }
  }

  private async fetchToolResultStream(
    server: MCPRegistryEntry,
    tool: MCPTool,
    toolArgs: Record<string, unknown>,
    requestId: string
  ): Promise<ReadableStream> {
    const response = await fetch(server.endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MCP-Server-Id': server.id.toString(),
        'X-MCP-Tool-Name': tool.name,
        'X-Request-ID': requestId,
        Accept: 'text/event-stream',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'tools/call',
        params: {
          name: tool.name,
          arguments: toolArgs,
        },
        id: requestId,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error('No response body');
    }

    return response.body;
  }
}

export const mcpExecutionService = new MCPExecutionService();
