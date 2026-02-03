/**
 * MCP (Model Context Protocol) Type Definitions
 * Core types for MCP server integration with OpenMarketAccess
 */

// ============================================================================
// MCP Protocol Core Types
// ============================================================================

export type MCPTransportType = 'stdio' | 'http' | 'websocket' | 'sse';

export type MCPHealthStatus = 'unknown' | 'healthy' | 'unhealthy' | 'offline' | 'degraded';

export type MCPPricingType = 'free' | 'per_request' | 'per_token' | 'subscription';

export type MCPServerStatus = 'pending' | 'active' | 'suspended' | 'deprecated';

export type MCPProtocolVersion = '1.0.0' | '1.1.0' | '2.0.0';

// ============================================================================
// MCP Capability Types
// ============================================================================

export interface MCPCapability {
  name: string;
  version?: string;
  enabled: boolean;
  config?: Record<string, unknown>;
}

export type MCPCapabilityType =
  | 'tools'
  | 'resources'
  | 'prompts'
  | 'logging'
  | 'streaming'
  | 'authentication'
  | 'rate_limiting';

export interface MCPCapabilitySet {
  tools?: boolean;
  resources?: boolean;
  prompts?: boolean;
  logging?: boolean;
  streaming?: boolean;
  authentication?: boolean;
  rateLimiting?: boolean;
}

// ============================================================================
// MCP Tool Types
// ============================================================================

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: JSONSchema7;
  pricing?: {
    credits?: number;
    currency?: string;
    perRequest?: number;
  };
  rateLimit?: {
    maxRequests?: number;
    windowMs?: number;
  };
  metadata?: Record<string, unknown>;
  enabled?: boolean;
}

export interface MCPToolExecution {
  toolId: string;
  serverId: string;
  userId: number;
  input: Record<string, unknown>;
  timestamp: Date;
  duration?: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: unknown;
  error?: string;
  creditsUsed?: number;
  paymentVerified?: boolean;
}

// ============================================================================
// MCP Resource Types
// ============================================================================

export interface MCPResource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
  metadata?: Record<string, unknown>;
  enabled?: boolean;
}

export interface MCPResourceTemplate {
  uriTemplate: string;
  name: string;
  description?: string;
  mimeType?: string;
}

// ============================================================================
// MCP Prompt Types
// ============================================================================

export interface MCPPrompt {
  name: string;
  description?: string;
  arguments?: MCPPromptArgument[];
  metadata?: Record<string, unknown>;
  enabled?: boolean;
}

export interface MCPPromptArgument {
  name: string;
  description?: string;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object';
}

// ============================================================================
// MCP Server Types
// ============================================================================

export interface MCPServerConfig {
  name: string;
  version: string;
  description: string;
  mcpVersion: MCPProtocolVersion;
  endpointUrl: string;
  transportType: MCPTransportType;
  capabilities: MCPCapabilitySet;
  tools: MCPTool[];
  resources?: MCPResource[];
  prompts?: MCPPrompt[];
  healthCheckUrl?: string;
  serverConfig?: Record<string, unknown>;
}

export interface MCPServerRegistration {
  name: string;
  slug: string;
  description: string;
  version: string;
  mcpVersion: MCPProtocolVersion;
  endpointUrl: string;
  transportType: MCPTransportType;
  capabilities: MCPCapabilitySet;
  tools: MCPTool[];
  resources?: MCPResource[];
  prompts?: MCPPrompt[];
  serverConfig?: Record<string, unknown>;
  installCommand?: string;
  dockerImage?: string;
  repositoryUrl?: string;
  documentationUrl?: string;
  license?: string;
  pricingType: MCPPricingType;
  price: number;
  category: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
  healthCheckUrl?: string;
  ownerId: number;
}

export interface MCPServerUpdate {
  name?: string;
  description?: string;
  version?: string;
  endpointUrl?: string;
  capabilities?: MCPCapabilitySet;
  tools?: MCPTool[];
  resources?: MCPResource[];
  prompts?: MCPPrompt[];
  serverConfig?: Record<string, unknown>;
  pricingType?: MCPPricingType;
  price?: number;
  category?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
  healthCheckUrl?: string;
  status?: MCPServerStatus;
}

// ============================================================================
// MCP Discovery Types
// ============================================================================

export interface MCPDiscoveryFilter {
  category?: string;
  pricingType?: MCPPricingType;
  healthStatus?: MCPHealthStatus;
  transportType?: MCPTransportType;
  minRating?: number;
  maxPrice?: number;
  tags?: string[];
  capabilities?: string[];
  search?: string;
  verified?: boolean;
  featured?: boolean;
  status?: MCPServerStatus;
}

export interface MCPDiscoverySort {
  field: 'name' | 'rating' | 'price' | 'usage' | 'createdAt' | 'updatedAt';
  order: 'asc' | 'desc';
}

export interface MCPDiscoveryOptions {
  filter?: MCPDiscoveryFilter;
  sort?: MCPDiscoverySort;
  page?: number;
  limit?: number;
}

export interface MCPDiscoveryResult {
  servers: MCPServerInfo[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface MCPServerInfo {
  id: number;
  name: string;
  slug: string;
  description: string;
  version: string;
  mcpVersion: MCPProtocolVersion;
  endpointUrl: string;
  transportType: MCPTransportType;
  capabilities: MCPCapabilitySet;
  toolCount: number;
  resourceCount: number;
  promptCount: number;
  pricingType: MCPPricingType;
  price: number;
  category: string;
  tags: string[];
  healthStatus: MCPHealthStatus;
  lastHealthCheck: Date | null;
  usageCount: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured: boolean;
  status: MCPServerStatus;
  ownerName?: string;
  ownerAvatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// MCP Execution Types
// ============================================================================

export interface MCPToolExecutionRequest {
  toolName: string;
  input: Record<string, unknown>;
  timeout?: number;
  stream?: boolean;
  paymentSignature?: string;
  userId?: number;
}

export interface MCPToolExecutionResponse {
  success: boolean;
  result?: unknown;
  error?: string;
  executionId: string;
  duration: number;
  creditsUsed?: number;
  paymentVerified?: boolean;
  serverId: string;
  toolName: string;
  timestamp: Date;
}

export interface MCPStreamEvent {
  type: 'data' | 'error' | 'complete' | 'progress';
  data?: unknown;
  error?: string;
  progress?: number;
  timestamp: Date;
}

// ============================================================================
// MCP Health Check Types
// ============================================================================

export interface MCPHealthCheckResult {
  serverId: string;
  status: MCPHealthStatus;
  responseTime: number;
  timestamp: Date;
  error?: string;
  details?: {
    toolsAvailable?: number;
    resourcesAvailable?: number;
    promptsAvailable?: number;
    uptime?: number;
    lastError?: string;
  };
}

export interface MCPHealthCheckConfig {
  interval: number; // milliseconds
  timeout: number; // milliseconds
  retryAttempts: number;
  retryDelay: number; // milliseconds
  degradedThreshold: number; // response time in ms to consider degraded
}

// ============================================================================
// MCP Connection Types
// ============================================================================

export interface MCPConnection {
  id: string;
  serverId: string;
  endpointUrl: string;
  transportType: MCPTransportType;
  connected: boolean;
  lastUsed: Date;
  createdAt: Date;
  metadata?: Record<string, unknown>;
}

export interface MCPConnectionPool {
  maxSize: number;
  minSize: number;
  idleTimeout: number;
  acquireTimeout: number;
  createTimeout: number;
}

export interface MCPConnectionConfig {
  pool?: MCPConnectionPool;
  retry?: {
    maxAttempts: number;
    initialDelay: number;
    maxDelay: number;
    backoffFactor: number;
  };
  timeout?: {
    connect: number;
    request: number;
    healthCheck: number;
  };
}

// ============================================================================
// MCP Proxy Types
// ============================================================================

export interface MCPProxyRequest {
  serverId: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  paymentSignature?: string;
  userId?: number;
  timeout?: number;
}

export interface MCPProxyResponse {
  success: boolean;
  status: number;
  headers: Record<string, string>;
  body?: unknown;
  error?: string;
  duration: number;
  creditsUsed?: number;
  paymentVerified?: boolean;
}

// ============================================================================
// MCP Payment Types
// ============================================================================

export interface MCPPaymentInfo {
  serverId: string;
  toolName?: string;
  creditsRequired: number;
  currency: string;
  recipientAddress: string;
  nonce: string;
  timestamp: number;
  signature?: string;
}

export interface MCPPaymentVerification {
  valid: boolean;
  amount: number;
  transactionId?: string;
  error?: string;
}

// ============================================================================
// MCP Sandbox Types
// ============================================================================

export interface MCPSandboxConfig {
  enabled: boolean;
  maxMemoryMB?: number;
  maxCpuPercent?: number;
  maxExecutionTime?: number;
  allowedDomains?: string[];
  allowedProtocols?: string[];
  blockedDomains?: string[];
  blockedCommands?: string[];
  environmentVariables?: Record<string, string>;
}

export interface MCPSandboxContext {
  userId: number;
  serverId: string;
  executionId: string;
  startTime: Date;
  memoryUsage?: number;
  cpuUsage?: number;
}

// ============================================================================
// MCP Logging Types
// ============================================================================

export interface MCPLogEntry {
  id: string;
  serverId: string;
  userId?: number;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

export interface MCPLogFilter {
  serverId?: string;
  userId?: number;
  level?: string;
  startTime?: Date;
  endTime?: Date;
  limit?: number;
}

// ============================================================================
// MCP Statistics Types
// ============================================================================

export interface MCPStatistics {
  serverId: string;
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  averageExecutionTime: number;
  totalCreditsUsed: number;
  uniqueUsers: number;
  toolsUsed: Record<string, number>;
  errors: Record<string, number>;
  period: {
    start: Date;
    end: Date;
  };
}

export interface MCPUsageMetrics {
  serverId: string;
  timestamp: Date;
  metrics: {
    requests: number;
    errors: number;
    averageResponseTime: number;
    p50ResponseTime: number;
    p95ResponseTime: number;
    p99ResponseTime: number;
    creditsUsed: number;
    uniqueUsers: number;
  };
}

// ============================================================================
// JSON Schema Types
// ============================================================================

export interface JSONSchema7 {
  type?: string | string[];
  properties?: Record<string, JSONSchema7>;
  required?: string[];
  additionalProperties?: boolean | JSONSchema7;
  items?: JSONSchema7 | JSONSchema7[];
  enum?: unknown[];
  const?: unknown;
  format?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  minProperties?: number;
  maxProperties?: number;
  allOf?: JSONSchema7[];
  anyOf?: JSONSchema7[];
  oneOf?: JSONSchema7[];
  not?: JSONSchema7;
  if?: JSONSchema7;
  then?: JSONSchema7;
  else?: JSONSchema7;
  default?: unknown;
  description?: string;
  title?: string;
  examples?: unknown[];
  $schema?: string;
  $id?: string;
  $ref?: string;
  definitions?: Record<string, JSONSchema7>;
}

// ============================================================================
// MCP Error Types
// ============================================================================

export interface MCPError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  serverId?: string;
  toolName?: string;
  timestamp: Date;
}

export type MCPErrorCode =
  | 'SERVER_NOT_FOUND'
  | 'SERVER_OFFLINE'
  | 'TOOL_NOT_FOUND'
  | 'INVALID_INPUT'
  | 'EXECUTION_TIMEOUT'
  | 'PAYMENT_REQUIRED'
  | 'PAYMENT_FAILED'
  | 'RATE_LIMIT_EXCEEDED'
  | 'CONNECTION_ERROR'
  | 'SANDBOX_VIOLATION'
  | 'AUTHENTICATION_FAILED'
  | 'PERMISSION_DENIED'
  | 'INTERNAL_ERROR';

export interface MCPErrorResponse {
  success: false;
  error: MCPError;
  requestId: string;
}
