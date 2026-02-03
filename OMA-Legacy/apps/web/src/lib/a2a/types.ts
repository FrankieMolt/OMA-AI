export type A2AProtocolVersion = '1.0.0';

// JSON-RPC 2.0 Error Codes
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

// Enhanced Agent Card
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

// JSON-RPC 2.0 Base Types
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

// Negotiation Types
export interface A2ANegotiationRequest {
  jsonrpc: '2.0';
  method: 'negotiate';
  params: {
    taskId: string;
    requesterAgentId: string;
    targetAgentId: string;
    task: A2ATaskSpec;
    constraints?: A2ANegotiationConstraints;
    timeoutMs?: number;
  };
  id: string | number;
}

export interface A2ANegotiationResponse {
  jsonrpc: '2.0';
  result?: {
    negotiationId: string;
    status: 'accepted' | 'rejected' | 'counter_offered' | 'pending';
    terms?: A2ANegotiationTerms;
    counterOffer?: A2ATaskSpec;
    taskId?: string;
    expiresAt: string;
  };
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
  id: string | number;
}

export interface A2ANegotiationConstraints {
  maxCost?: number;
  maxDuration?: number;
  requiredCapabilities?: string[];
  preferredCapabilities?: string[];
  qualityLevel?: 'speed' | 'balanced' | 'quality';
  deadline?: string;
}

export interface A2ANegotiationTerms {
  cost: number;
  currency: string;
  estimatedDuration: number;
  paymentMethod: 'x402' | 'direct' | 'escrow';
  serviceLevel: string;
  deliverables: string[];
  conditions?: string[];
}

export interface A2ATaskSpec {
  type: string;
  description: string;
  input: Record<string, unknown>;
  outputFormat?: string;
  complexity?: 'low' | 'medium' | 'high';
  priority?: number;
}

// Task Management Types
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

export interface A2ATaskStatusRequest {
  jsonrpc: '2.0';
  method: 'task.status';
  params: {
    taskId: string;
    includeProgress?: boolean;
  };
  id: string | number;
}

export interface A2ATaskStatusResponse {
  jsonrpc: '2.0';
  result?: {
    taskId: string;
    status: string;
    progress?: number;
    estimatedCompletion?: string;
    result?: unknown;
    error?: string;
    metadata?: Record<string, unknown>;
  };
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
  id: string | number;
}

// Streaming Support
export interface A2AStreamRequest {
  jsonrpc: '2.0';
  method: 'stream';
  params: {
    taskId: string;
    streamType: 'results' | 'progress' | 'logs';
    format?: 'sse' | 'websocket';
  };
  id: string | number;
}

export interface A2AStreamChunk {
  type: 'data' | 'progress' | 'error' | 'complete';
  data?: unknown;
  progress?: number;
  error?: string;
  timestamp: string;
}

// Discovery Types
export interface A2ADiscoveryRequest {
  jsonrpc: '2.0';
  method: 'discover';
  params?: {
    category?: string;
    capability?: string[];
    model?: string[];
    pricingType?: string[];
    minRating?: number;
    maxCost?: number;
    onlineOnly?: boolean;
    limit?: number;
    offset?: number;
  };
  id: string | number;
}

export interface A2ADiscoveryResponse {
  jsonrpc: '2.0';
  result?: {
    agents: A2AAgentCard[];
    total: number;
    limit: number;
    offset: number;
  };
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
  id: string | number;
}

// Communication Logging Types
export interface A2ACommunicationLog {
  id: string;
  timestamp: string;
  fromAgentId: string;
  toAgentId: string;
  messageType: string;
  method: string;
  payload: unknown;
  response?: unknown;
  error?: string;
  duration?: number;
  status: 'success' | 'failure' | 'timeout';
  metadata?: Record<string, unknown>;
}

// Agent Manifest Validation
export interface A2AManifestValidationError {
  field: string;
  message: string;
  code: string;
}

export interface A2AManifestValidationResult {
  valid: boolean;
  errors: A2AManifestValidationError[];
  warnings: string[];
}

// Capability Matching
export interface A2ACapabilityMatch {
  agentId: string;
  matchScore: number;
  matchedCapabilities: string[];
  missingCapabilities: string[];
  confidence: number;
  estimatedCost: number;
  estimatedDuration: number;
}

export interface A2ACapabilityMatchRequest {
  taskRequirements: string[];
  constraints?: {
    maxCost?: number;
    maxDuration?: number;
    minRating?: number;
  };
  filters?: {
    category?: string;
    pricingType?: string[];
  };
}
