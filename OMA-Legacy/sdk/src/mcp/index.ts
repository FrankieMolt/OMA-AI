import {
  MCPClientConfig,
  MCPListOptions,
  MCPExecuteOptions,
  MCPExecuteResult,
  MCPServerInfo,
  MCPTool,
} from './types';

export class MCPClient {
  private config: MCPClientConfig;

  constructor(config: MCPClientConfig = {}) {
    this.config = {
      endpoint: config.endpoint || 'https://api.oma.ai',
      apiKey: config.apiKey,
      timeout: config.timeout || 30000,
    };
  }

  async discover(options?: MCPListOptions): Promise<{ servers: MCPServerInfo[]; total: number }> {
    const params = new URLSearchParams();

    if (options?.category) params.set('category', options.category);
    if (options?.search) params.set('search', options.search);
    if (options?.pricingType) params.set('pricingType', options.pricingType);
    if (options?.healthStatus) params.set('healthStatus', options.healthStatus);
    if (options?.minRating) params.set('minRating', options.minRating.toString());
    if (options?.tags) params.set('tags', options.tags.join(','));
    if (options?.limit) params.set('limit', options.limit.toString());
    if (options?.offset) params.set('offset', options.offset.toString());

    const response = await fetch(`${this.config.endpoint}/api/mcp/discover?${params}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to discover MCP servers: ${response.statusText}`);
    }

    const data = await response.json() as { data?: { servers: MCPServerInfo[]; total: number } };
    return data.data || { servers: [], total: 0 };
  }

  async getServer(id: number): Promise<MCPServerInfo | null> {
    const response = await fetch(`${this.config.endpoint}/api/mcp/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to get MCP server: ${response.statusText}`);
    }

    const data = await response.json() as { data: MCPServerInfo };
    return data.data;
  }

  async getServerTools(
    id: number
  ): Promise<{ serverId: number; serverName: string; tools: MCPTool[] }> {
    const response = await fetch(`${this.config.endpoint}/api/mcp/${id}/tools`, {
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get MCP server tools: ${response.statusText}`);
    }

    const data = await response.json() as { data: MCPServerInfo };
    return { serverId: id, serverName: data.data.name, tools: data.data.tools };
  }

  async executeTool(
    serverId: number,
    toolName: string,
    args: Record<string, unknown>,
    options?: MCPExecuteOptions
  ): Promise<MCPExecuteResult> {
    const startTime = Date.now();

    const response = await fetch(`${this.config.endpoint}/api/mcp/${serverId}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
        ...(options?.paymentSignature && {
          'PAYMENT-SIGNATURE': JSON.stringify(options.paymentSignature),
        }),
      },
      body: JSON.stringify({
        toolName,
        arguments: args,
      }),
    });

    const executionTime = Date.now() - startTime;

    if (!response.ok) {
      return {
        success: false,
        error: `Execution failed: ${response.statusText}`,
        toolName,
        executionTime,
      };
    }

    const data = await response.json() as { data: MCPExecuteResult };
    return {
      ...data.data,
      executionTime,
    };
  }

  async executeToolStream(
    serverId: number,
    toolName: string,
    args: Record<string, unknown>,
    options?: MCPExecuteOptions
  ): Promise<ReadableStream> {
    const response = await fetch(`${this.config.endpoint}/api/mcp/${serverId}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
        ...(options?.paymentSignature && {
          'PAYMENT-SIGNATURE': JSON.stringify(options.paymentSignature),
        }),
        Accept: 'text/event-stream',
      },
      body: JSON.stringify({
        toolName,
        arguments: args,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to execute tool stream: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error('No response body');
    }

    return response.body;
  }

  async checkHealth(id: number): Promise<unknown> {
    const response = await fetch(`${this.config.endpoint}/api/mcp/${id}/health`, {
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to check MCP server health: ${response.statusText}`);
    }

    const data = await response.json() as { data: MCPServerInfo };
    return data.data;
  }

  async proxyRequest(
    targetUrl: string,
    payload: Record<string, unknown>,
    signature?: string
  ): Promise<unknown> {
    const response = await fetch(`${this.config.endpoint}/api/mcp/proxy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
        ...(signature && { 'PAYMENT-SIGNATURE': JSON.stringify(signature) }),
      },
      body: JSON.stringify({
        targetUrl,
        payload,
        signature,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to proxy request: ${response.statusText}`);
    }

    return response.json();
  }

  setApiKey(apiKey: string): void {
    this.config.apiKey = apiKey;
  }

  setEndpoint(endpoint: string): void {
    this.config.endpoint = endpoint;
  }
}
