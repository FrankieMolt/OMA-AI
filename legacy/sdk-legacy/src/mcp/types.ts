export interface MCPClientConfig {
  endpoint?: string;
  apiKey?: string;
  timeout?: number;
}

export interface MCPListOptions {
  category?: string;
  search?: string;
  pricingType?: 'free' | 'usage' | 'subscription' | 'one-time';
  healthStatus?: 'healthy' | 'unhealthy' | 'offline';
  minRating?: number;
  tags?: string[];
  limit?: number;
  offset?: number;
}

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface MCPResource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface MCPExecuteOptions {
  paymentSignature?: string;
  timeout?: number;
}

export interface MCPExecuteResult {
  success: boolean;
  result?: unknown;
  error?: string;
  toolName?: string;
  executionTime: number;
  cost?: number;
  requestId?: string;
}

export interface MCPPrompt {
  name: string;
  description: string;
  arguments?: Record<string, unknown>;
}

export interface MCPServerInfo {
  id: number;
  name: string;
  slug: string;
  description: string;
  version: string;
  mcpVersion: string;
  endpointUrl: string;
  transportType: 'stdio' | 'http' | 'websocket';
  capabilities: string[];
  tools: MCPTool[];
  resources: MCPResource[];
  prompts: MCPPrompt[];
  pricingType: 'free' | 'usage' | 'subscription' | 'one-time';
  price: number;
  category: string;
  tags: string[];
  healthStatus: 'unknown' | 'healthy' | 'unhealthy' | 'offline';
  rating: number;
}
