/**
 * A2A (Agent-to-Agent) Protocol Types
 *
 * Unified type definitions for agent-to-agent communication.
 * These types are shared across the SDK and web apps.
 */

// ============================================================================
// Client Configuration
// ============================================================================

export interface A2AClientConfig {
  endpoint?: string;
  apiKey?: string;
  agentId?: string;
  signingKey?: string;
}

// ============================================================================
// Core Message Types
// ============================================================================

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

export interface A2ASendOptions {
  paymentSignature?: string;
  timeout?: number;
}

// ============================================================================
// Execution Types
// ============================================================================

export interface A2AExecuteOptions {
  goal: string;
  context?: Record<string, unknown>;
  constraints?: Record<string, unknown>;
  paymentSignature?: string;
  timeout?: number;
}

export interface A2AExecuteResult {
  taskId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: unknown;
  error?: string;
  executionTime?: number;
  cost?: number;
}

// ============================================================================
// Discovery Types
// ============================================================================

export interface A2ADiscoveryOptions {
  category?: string;
  search?: string;
  capability?: string;
  minRating?: number;
  limit?: number;
  offset?: number;
}

export interface A2AAgentInfo {
  id: string;
  name: string;
  description: string;
  version: string;
  capabilities: string[];
  endpointUrl: string;
  a2aVersion: string;
  owner: string;
  rating: number;
  reviewCount: number;
  price: number;
  pricingType: 'free' | 'usage' | 'subscription' | 'one-time';
}

// ============================================================================
// Protocol Version & Error Codes (from comprehensive types)
// ============================================================================

export type A2AProtocolVersion = '1.0.0';

export enum A2AErrorCode {
  ParseError = -32700,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  InvalidParams = -32602,
  InternalError = -32603,
  AgentNotFound = -32001,
  AgentOffline = -32002,
  CapabilityMismatch = -32003,
  NegotiationFailed = -32004,
  TaskNotFound = -32005,
  PaymentRequired = -32006,
  AuthenticationFailed = -32007,
  RateLimitExceeded = -32008,
}

// ============================================================================
// Agent Card (Full Definition)
// ============================================================================

export interface A2AAgentCard {
  version: A2AProtocolVersion;
  metadata: {
    name: string;
    description: string;
    author: string;
    license: string;
    version: string;
    homepage: string;
    tags?: string[];
  };
  capabilities: {
    protocols: string[];
    models: string[];
    tools: string[];
    languages?: string[];
    specializations?: string[];
  };
  pricing: {
    type: 'free' | 'per_request' | 'per_token' | 'subscription';
    amount: string;
    currency: string;
    subscriptionPeriod?: string;
  };
  endpoints: {
    message: string;
    status?: string;
    negotiate?: string;
  };
  performance?: {
    avgResponseTime: number;
    successRate: number;
    uptime: number;
    totalTasks: number;
  };
  constraints?: {
    maxTokens?: number;
    maxDuration?: number;
    maxConcurrentTasks?: number;
    supportedFormats?: string[];
  };
}

// ============================================================================
// JSON-RPC Types
// ============================================================================

export interface A2AMessageRequest {
  jsonrpc: '2.0';
  method: string;
  params: unknown;
  id: string | number;
}

export interface A2AMessageResponse {
  jsonrpc: '2.0';
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
  id: string | number;
}

// ============================================================================
// Task Types
// ============================================================================

export interface A2ATaskSpec {
  type: string;
  description: string;
  input: Record<string, unknown>;
  outputFormat?: string;
  complexity?: 'low' | 'medium' | 'high';
  priority?: number;
}

export interface A2ATask {
  id: string;
  status:
    | 'pending'
    | 'negotiating'
    | 'accepted'
    | 'in_progress'
    | 'completed'
    | 'failed'
    | 'cancelled';
  requesterAgentId: string;
  executorAgentId?: string;
  negotiationId?: string;
  taskSpec: A2ATaskSpec;
  result?: unknown;
  error?: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
}
