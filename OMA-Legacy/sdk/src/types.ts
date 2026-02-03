export interface OMAConfig {
  apiKey?: string;
  endpoint: string;
  wallet?: {
    privateKey?: string;
    address?: string;
  };
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  version: string;
  capabilities: string[];
  endpointUrl: string;
  price: number;
  pricingType: 'free' | 'usage' | 'subscription' | 'one-time';
  category: string;
  tags: string[];
  owner: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface MCPServer {
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

export interface MCPPrompt {
  name: string;
  description: string;
  arguments?: Record<string, unknown>;
}

export interface X402Payment {
  amount: number;
  recipient: string;
  currency: string;
  transactionId: string;
  timestamp: string;
  signature: string;
  nonce: string;
}

export interface A2AMessage {
  id: string;
  from: string;
  to: string;
  type: string;
  payload: Record<string, unknown>;
  timestamp: string;
  signature: string;
  replyTo?: string;
}

export interface ExecutionResult {
  success: boolean;
  result?: unknown;
  error?: string;
  executionTime: number;
  cost?: number;
  requestId: string;
}

export interface ListOptions {
  limit?: number;
  offset?: number;
  search?: string;
  category?: string;
  pricingType?: string;
  healthStatus?: string;
  tags?: string[];
  minRating?: number;
}

export interface PaymentOptions {
  amount: number;
  recipient: string;
  description?: string;
  timeout?: number;
}
