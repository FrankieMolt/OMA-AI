import { z } from 'zod';

// ==================== LISTINGS SCHEMAS ====================
export const createListingSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(10).max(5000),
  category: z.enum(['agent', 'mcp', 'api', 'llm', 'skill', 'tool']),
  pricingType: z.enum(['free', 'usage', 'subscription', 'one-time']),
  price: z.number().min(0).max(999999.9999),
  endpoint: z.string().url().optional().or(z.literal('')),
  capabilities: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  type: z.string().optional().default('api'),
  installCommand: z.string().optional(),
  contextWindow: z.number().int().positive().optional(),
  documentation: z.string().optional(),
  schema: z.record(z.string(), z.unknown()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const updateListingSchema = createListingSchema.partial().extend({
  status: z.enum(['approved', 'pending', 'rejected', 'suspended']).optional(),
});

// ==================== SKILLS SCHEMAS ====================
export const createSkillSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(10).max(5000),
  category: z.string().min(1).max(100),
  pricingType: z.enum(['free', 'one-time', 'subscription']),
  price: z.number().min(0).max(999999.9999),
  tags: z.array(z.string()).optional().default([]),
  capabilities: z.array(z.string()).optional().default([]),
  githubUrl: z.string().url().optional().or(z.literal('')),
  demoUrl: z.string().url().optional().or(z.literal('')),
  documentation: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const updateSkillSchema = createSkillSchema.partial().extend({
  status: z.enum(['active', 'pending', 'rejected', 'suspended']).optional(),
  featured: z.boolean().optional(),
  verified: z.boolean().optional(),
});

// ==================== AGENT SCHEMAS ====================
export const createAgentSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(10).max(5000),
  category: z.string().min(1).max(100),
  strategy: z.string().optional(),
  capabilities: z.array(z.string()).optional().default([]),
  pricingType: z.enum(['free', 'usage', 'subscription', 'one-time']),
  baseCostUsd: z.number().min(0).max(999999.9999).optional(),
  maxCostUsd: z.number().min(0).max(999999.9999).optional(),
  models: z.array(z.string()).optional().default([]),
  mcpStack: z.record(z.string(), z.unknown()).optional(),
  executionPolicy: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
  sla: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
  riskDisclosure: z.string().optional(),
});

export const updateAgentSchema = createAgentSchema.partial().extend({
  status: z.enum(['active', 'inactive', 'maintenance', 'suspended']).optional(),
  reputationWeight: z.number().min(0).max(5).optional(),
});

// ==================== TASK SCHEMAS ====================
export const createTaskSchema = z.object({
  goal: z.string().min(10).max(10000),
  budget: z.number().min(0.01).max(999999.9999),
  deadlineMinutes: z.number().int().min(1).max(10080),
  qualityBias: z.enum(['speed', 'balanced', 'quality']).default('balanced'),
  allowedAgents: z.array(z.number().int().positive()).optional(),
  settlementMethod: z.enum(['x402', 'escrow', 'direct']).default('x402'),
});

export const updateTaskSchema = createTaskSchema.partial().extend({
  status: z.enum(['pending', 'in_progress', 'completed', 'failed', 'cancelled']).optional(),
  result: z.record(z.string(), z.unknown()).optional(),
  error: z.string().optional(),
  actualCost: z.number().min(0).optional(),
});

// ==================== REVIEW SCHEMAS ====================
export const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().min(1).max(255),
  content: z.string().min(10).max(5000),
});

// ==================== PAYMENT & TRANSACTION SCHEMAS ====================
export const depositSchema = z.object({
  txHash: z.string().min(32),
  amount: z.number().min(0.01),
  currency: z.string().default('USDC'),
});

export const transactionFilterSchema = z.object({
  type: z.enum(['deposit', 'withdrawal', 'usage', 'refund', 'escrow', 'settlement']).optional(),
  status: z.enum(['pending', 'completed', 'failed', 'cancelled']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().min(0).optional(),
});

// ==================== WEBHOOK SCHEMAS ====================
export const webhookSchema = z.object({
  event: z.enum([
    'transaction.completed',
    'transaction.failed',
    'agent.task.completed',
    'agent.task.failed',
    'skill.purchased',
    'listing.created',
    'listing.approved',
    'user.registered',
    'user.verified',
  ]),
  data: z.record(z.string(), z.unknown()),
  timestamp: z.string().datetime().optional(),
  signature: z.string().optional(),
});

// ==================== PAGINATION & FILTERING SCHEMAS ====================
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().max(500).optional(),
  category: z.string().max(100).optional(),
  sortBy: z
    .enum(['newest', 'popular', 'price-low', 'price-high', 'rating', 'name', 'downloads'])
    .default('newest'),
  status: z.enum(['all', 'active', 'pending', 'suspended']).optional(),
  tags: z.array(z.string()).optional(),
  pricingType: z.enum(['free', 'usage', 'subscription', 'one-time', 'all']).optional(),
});

export const advancedListingsFilterSchema = paginationSchema.extend({
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  minRating: z.number().min(0).max(5).optional(),
  verified: z.boolean().optional(),
  featured: z.boolean().optional(),
  capabilities: z.array(z.string()).optional(),
});

// ==================== ANALYTICS SCHEMAS ====================
export const analyticsQuerySchema = z.object({
  period: z.enum(['24h', '7d', '30d', '90d', 'all']).default('30d'),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  category: z.string().max(100).optional(),
  granularity: z.enum(['hour', 'day', 'week', 'month']).default('day'),
  type: z
    .enum([
      'overview',
      'categories',
      'top-listings',
      'top-skills',
      'usage-trends',
      'revenue-trends',
      'user-growth',
      'listing-performance',
      'skill-performance',
      'agent-performance',
      'user-analytics',
      'realtime',
    ])
    .default('overview'),
  listingId: z.string().optional(),
  skillId: z.string().optional(),
  agentId: z.string().optional(),
  userId: z.string().optional(),
  limit: z.string().default('10'),
});

// ==================== WALLET SCHEMAS ====================
export const walletConnectionSchema = z.object({
  walletAddress: z.string().min(32).max(44),
  signature: z.string(),
  message: z.string(),
});

export const withdrawSchema = z.object({
  amount: z.number().min(0.01),
  destinationAddress: z.string().min(32).max(44),
  currency: z.string().default('USDC'),
});

// ==================== AGENT STATUS SCHEMAS ====================
export const agentStatusSchema = z.object({
  status: z.enum(['online', 'offline', 'busy', 'error']),
  uptime: z.number().optional(),
  lastActivity: z.string().datetime().optional(),
  activeTasks: z.number().int().min(0).optional(),
  totalTasks: z.number().int().min(0).optional(),
  performanceMetrics: z.record(z.string(), z.number()).optional(),
});

// ==================== API KEY SCHEMAS ====================
export const createApiKeySchema = z.object({
  name: z.string().min(1).max(255),
  permissions: z.array(z.string()).optional().default([]),
  expiresIn: z.number().int().positive().optional(),
});

// ==================== MCP SERVER SCHEMAS ====================
export const createMCPServerSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(10).max(5000),
  endpointUrl: z.string().url(),
  transportType: z.enum(['stdio', 'http', 'websocket']).default('http'),
  capabilities: z.array(z.string()).optional().default([]),
  tools: z.array(z.record(z.string(), z.unknown())).optional().default([]),
  resources: z.array(z.record(z.string(), z.unknown())).optional().default([]),
  prompts: z.array(z.record(z.string(), z.unknown())).optional().default([]),
  serverConfig: z.record(z.string(), z.unknown()).optional(),
  installCommand: z.string().optional(),
  dockerImage: z.string().optional(),
  repositoryUrl: z.string().url().optional().or(z.literal('')),
  documentationUrl: z.string().url().optional().or(z.literal('')),
  license: z.string().optional(),
  category: z.string().min(1).max(100).default('tool'),
  tags: z.array(z.string()).optional().default([]),
  pricingType: z.enum(['free', 'usage', 'subscription', 'one-time']).default('free'),
  price: z.number().min(0).max(999999.9999).default(0),
  healthCheckUrl: z.string().url().optional().or(z.literal('')),
});

export const updateMCPServerSchema = createMCPServerSchema.partial().extend({
  status: z.enum(['active', 'inactive', 'offline', 'unhealthy']).optional(),
  healthStatus: z.enum(['unknown', 'healthy', 'unhealthy', 'offline']).optional(),
});

// ==================== TYPE EXPORTS ====================
export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
export type CreateSkillInput = z.infer<typeof createSkillSchema>;
export type UpdateSkillInput = z.infer<typeof updateSkillSchema>;
export type CreateAgentInput = z.infer<typeof createAgentSchema>;
export type UpdateAgentInput = z.infer<typeof updateAgentSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type DepositInput = z.infer<typeof depositSchema>;
export type TransactionFilterInput = z.infer<typeof transactionFilterSchema>;
export type WebhookInput = z.infer<typeof webhookSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type AdvancedListingsFilterInput = z.infer<typeof advancedListingsFilterSchema>;
export type AnalyticsQueryInput = z.infer<typeof analyticsQuerySchema>;
export type WalletConnectionInput = z.infer<typeof walletConnectionSchema>;
export type WithdrawInput = z.infer<typeof withdrawSchema>;
export type AgentStatusInput = z.infer<typeof agentStatusSchema>;
export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>;
export type CreateMCPServerInput = z.infer<typeof createMCPServerSchema>;
export type UpdateMCPServerInput = z.infer<typeof updateMCPServerSchema>;
