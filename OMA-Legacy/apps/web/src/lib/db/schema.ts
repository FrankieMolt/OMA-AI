import { sql } from 'drizzle-orm';
import {
  pgTable,
  integer,
  text,
  real,
  index,
  serial,
  boolean,
  jsonb,
  timestamp,
} from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    name: text('name').notNull(),
    credits: real('credits').default(0).notNull(),
    role: text('role').default('user').notNull(),
    profile: jsonb('profile').$type<Record<string, unknown> | null>(),
    stripeCustomerId: text('stripe_customer_id'),
    solanaWalletAddress: text('solana_wallet_address'),
    usdcBalance: real('usdc_balance').default(0).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index('users_email_idx').on(table.email),
    walletIdx: index('users_wallet_idx').on(table.solanaWalletAddress),
  })
);

export const apiListings = pgTable(
  'api_listings',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').unique().notNull(),
    description: text('description').notNull(),
    category: text('category').notNull(),
    endpointUrl: text('endpoint_url'),
    type: text('type').default('api').notNull(),
    installCommand: text('install_command'),
    contextWindow: integer('context_window'),
    pricingType: text('pricing_type').notNull(),
    price: real('price').notNull(),
    documentation: text('documentation'),
    schema: jsonb('schema').$type<Record<string, unknown> | null>(),
    capabilities: jsonb('capabilities')
      .$type<string[]>()
      .default(sql`'[]'::jsonb`)
      .notNull(),
    tags: jsonb('tags')
      .$type<string[]>()
      .default(sql`'[]'::jsonb`)
      .notNull(),
    metadata: jsonb('metadata').$type<Record<string, unknown> | null>(),
    status: text('status').default('pending').notNull(),
    verified: boolean('verified').default(false).notNull(),
    featured: boolean('featured').default(false).notNull(),
    currency: text('currency').default('USDC').notNull(),
    ownerId: integer('owner_id')
      .references(() => users.id)
      .notNull(),
    usageCount: integer('usage_count').default(0).notNull(),
    rating: real('rating').default(0).notNull(),
    reviewCount: integer('review_count').default(0).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index('api_listings_slug_idx').on(table.slug),
    categoryIdx: index('api_listings_category_idx').on(table.category),
    statusIdx: index('api_listings_status_idx').on(table.status),
    ownerIdIdx: index('api_listings_owner_id_idx').on(table.ownerId),
    statusCategoryCreatedIdx: index('api_listings_status_category_created_idx').on(
      table.status,
      table.category,
      table.createdAt
    ),
    statusOwnerIdx: index('api_listings_status_owner_idx').on(table.status, table.ownerId),
  })
);

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  apiId: integer('api_id')
    .references(() => apiListings.id)
    .notNull(),
  rating: integer('rating').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  helpfulCount: integer('helpful_count').default(0).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const usageRecords = pgTable(
  'usage_records',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => users.id)
      .notNull(),
    apiId: integer('api_id')
      .references(() => apiListings.id)
      .notNull(),
    creditsUsed: real('credits_used').notNull(),
    metadata: jsonb('metadata').$type<Record<string, unknown> | null>(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('usage_records_user_id_idx').on(table.userId),
    userIdCreatedAtIdx: index('usage_records_user_id_created_at_idx').on(
      table.userId,
      table.createdAt
    ),
  })
);

export const transactions = pgTable(
  'transactions',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => users.id)
      .notNull(),
    apiId: integer('api_id').references(() => apiListings.id),
    skillId: integer('skill_id').references(() => skills.id),
    type: text('type').notNull(),
    amount: real('amount').notNull(),
    description: text('description'),
    metadata: jsonb('metadata').$type<Record<string, unknown> | null>(),
    solanaTxId: text('solana_tx_id'),
    x402Signature: text('x402_signature'),
    status: text('status').default('pending').notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('transactions_user_id_idx').on(table.userId),
    apiIdIdx: index('transactions_api_id_idx').on(table.apiId),
    skillIdIdx: index('transactions_skill_id_idx').on(table.skillId),
    typeIdx: index('transactions_type_idx').on(table.type),
  })
);

// Skills marketplace tables
export const skills = pgTable(
  'skills',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').unique().notNull(),
    description: text('description').notNull(),
    category: text('category').notNull(),
    tags: jsonb('tags')
      .$type<string[]>()
      .default(sql`'[]'::jsonb`)
      .notNull(),
    capabilities: jsonb('capabilities')
      .$type<string[]>()
      .default(sql`'[]'::jsonb`)
      .notNull(),
    pricingType: text('pricing_type').default('one-time').notNull(),
    price: real('price').notNull(),
    ownerId: integer('owner_id')
      .references(() => users.id)
      .notNull(),
    downloads: integer('downloads').default(0).notNull(),
    rating: real('rating').default(0).notNull(),
    reviewCount: integer('review_count').default(0).notNull(),
    githubUrl: text('github_url'),
    demoUrl: text('demo_url'),
    documentation: text('documentation'),
    metadata: jsonb('metadata').$type<Record<string, unknown> | null>(),
    status: text('status').default('pending').notNull(),
    featured: boolean('featured').default(false).notNull(),
    verified: boolean('verified').default(false).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index('skills_slug_idx').on(table.slug),
    categoryIdx: index('skills_category_idx').on(table.category),
    ownerIdIdx: index('skills_owner_id_idx').on(table.ownerId),
    statusIdx: index('skills_status_idx').on(table.status),
    featuredIdx: index('skills_featured_idx').on(table.featured),
    verifiedIdx: index('skills_verified_idx').on(table.verified),
  })
);

export const skillReviews = pgTable(
  'skill_reviews',
  {
    id: serial('id').primaryKey(),
    skillId: integer('skill_id')
      .references(() => skills.id)
      .notNull(),
    userId: integer('user_id')
      .references(() => users.id)
      .notNull(),
    rating: integer('rating').notNull(),
    comment: text('comment'),
    verified: boolean('verified').default(false).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    skillIdIdx: index('skill_reviews_skill_id_idx').on(table.skillId),
    userIdIdx: index('skill_reviews_user_id_idx').on(table.userId),
  })
);

export const skillDownloads = pgTable(
  'skill_downloads',
  {
    id: serial('id').primaryKey(),
    skillId: integer('skill_id')
      .references(() => skills.id)
      .notNull(),
    userId: integer('user_id')
      .references(() => users.id)
      .notNull(),
    transactionId: integer('transaction_id').references(() => transactions.id),
    downloadUrl: text('download_url'),
    expiresAt: timestamp('expires_at', { mode: 'date' }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    skillIdIdx: index('skill_downloads_skill_id_idx').on(table.skillId),
    userIdIdx: index('skill_downloads_user_id_idx').on(table.userId),
    transactionIdIdx: index('skill_downloads_transaction_id_idx').on(table.transactionId),
  })
);

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').unique().notNull(),
  description: text('description'),
  icon: text('icon'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const apiKeys = pgTable(
  'api_keys',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => users.id)
      .notNull(),
    name: text('name').notNull(),
    key: text('key').unique().notNull(),
    permissions: text('permissions'),
    lastUsed: timestamp('last_used', { mode: 'date' }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('api_keys_user_id_idx').on(table.userId),
  })
);

export const agents = pgTable(
  'agents',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').unique().notNull(),
    description: text('description').notNull(),
    version: text('version').default('1.0.0').notNull(),
    category: text('category').notNull(),
    strategy: text('strategy'),
    capabilities: jsonb('capabilities')
      .$type<string[]>()
      .default(sql`'[]'::jsonb`)
      .notNull(),
    mcpStack: jsonb('mcp_stack').$type<Record<string, unknown> | null>(),
    executionPolicy: text('execution_policy'),
    pricingType: text('pricing_type').notNull(),
    baseCostUsd: real('base_cost_usd'),
    maxCostUsd: real('max_cost_usd'),
    sla: text('sla'),
    models: jsonb('models')
      .$type<string[]>()
      .default(sql`'[]'::jsonb`)
      .notNull(),
    reputationWeight: real('reputation_weight').default(1.0).notNull(),
    historicalPerformance: jsonb('historical_performance').$type<Record<string, unknown> | null>(),
    riskDisclosure: text('risk_disclosure'),
    status: text('status').default('active').notNull(),
    ownerId: integer('owner_id')
      .references(() => users.id)
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index('agents_slug_idx').on(table.slug),
    categoryIdx: index('agents_category_idx').on(table.category),
    statusIdx: index('agents_status_idx').on(table.status),
    ownerIdIdx: index('agents_owner_id_idx').on(table.ownerId),
  })
);

export const agentSkills = pgTable(
  'agent_skills',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    version: text('version').notNull(),
    category: text('category').notNull(),
    pricingType: text('pricing_type').notNull(),
    costUsd: real('cost_usd'),
    skillMdContent: text('skill_md_content'),
    rating: real('rating').default(0).notNull(),
    uses: integer('uses').default(0).notNull(),
    instructions: text('instructions'),
    examples: text('examples'),
    status: text('status').default('active').notNull(),
    ownerId: integer('owner_id')
      .references(() => users.id)
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    categoryIdx: index('agent_skills_category_idx').on(table.category),
    statusIdx: index('agent_skills_status_idx').on(table.status),
    ownerIdIdx: index('agent_skills_owner_id_idx').on(table.ownerId),
  })
);

export const agentHires = pgTable(
  'agent_hires',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => users.id)
      .notNull(),
    agentId: integer('agent_id')
      .references(() => agents.id)
      .notNull(),
    budgetLimit: real('budget_limit').notNull(),
    currency: text('currency').default('USD').notNull(),
    status: text('status').default('active').notNull(),
    expiresAt: timestamp('expires_at', { mode: 'date' }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('agent_hires_user_id_idx').on(table.userId),
    agentIdIdx: index('agent_hires_agent_id_idx').on(table.agentId),
    statusIdx: index('agent_hires_status_idx').on(table.status),
  })
);

export const agentTasks = pgTable(
  'agent_tasks',
  {
    id: serial('id').primaryKey(),
    hireId: integer('hire_id')
      .references(() => agentHires.id)
      .notNull(),
    goal: text('goal').notNull(),
    budget: real('budget').notNull(),
    deadlineMinutes: integer('deadline_minutes').notNull(),
    qualityBias: text('quality_bias').default('balanced').notNull(),
    allowedAgents: jsonb('allowed_agents').$type<number[] | null>(),
    settlementMethod: text('settlement_method').default('x402').notNull(),
    status: text('status').default('pending').notNull(),
    result: text('result'),
    error: text('error'),
    actualCost: real('actual_cost'),
    startedAt: timestamp('started_at', { mode: 'date' }),
    completedAt: timestamp('completed_at', { mode: 'date' }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    hireIdIdx: index('agent_tasks_hire_id_idx').on(table.hireId),
    statusIdx: index('agent_tasks_status_idx').on(table.status),
  })
);

export const p2PEndpoints = pgTable(
  'p2p_endpoints',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => users.id)
      .notNull(),
    endpointUrl: text('endpoint_url').notNull(),
    walletAddress: text('wallet_address').notNull(),
    platformFee: real('platform_fee').default(0).notNull(),
    reputationScore: real('reputation_score').default(0).notNull(),
    healthCheckUrl: text('health_check_url'),
    lastHealthCheck: timestamp('last_health_check', { mode: 'date' }),
    status: text('status').default('active').notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('p2p_endpoints_user_id_idx').on(table.userId),
    statusIdx: index('p2p_endpoints_status_idx').on(table.status),
  })
);

export const x402Escrows = pgTable(
  'x402_escrows',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => users.id)
      .notNull(),
    taskId: integer('task_id')
      .references(() => agentTasks.id)
      .notNull(),
    amount: real('amount').notNull(),
    currency: text('currency').default('USDC').notNull(),
    recipientAddress: text('recipient_address').notNull(),
    network: text('network').default('base-sepolia').notNull(),
    solanaTxId: text('solana_tx_id'),
    status: text('status').default('escrowed').notNull(),
    settledAmount: real('settled_amount'),
    refundAmount: real('refund_amount'),
    failureReason: text('failure_reason'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('x402_escrows_user_id_idx').on(table.userId),
    taskIdIdx: index('x402_escrows_task_id_idx').on(table.taskId),
    statusIdx: index('x402_escrows_status_idx').on(table.status),
    solanaTxIdIdx: index('x402_escrows_solana_tx_id_idx').on(table.solanaTxId),
  })
);

export const mcpServers = pgTable(
  'mcp_servers',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').unique().notNull(),
    description: text('description').notNull(),
    version: text('version').default('1.0.0').notNull(),
    mcpVersion: text('mcp_version').default('1.0.0').notNull(),
    endpointUrl: text('endpoint_url').notNull(),
    transportType: text('transport_type').default('stdio').notNull(),
    capabilities: jsonb('capabilities')
      .$type<string[]>()
      .default(sql`'[]'::jsonb`)
      .notNull(),
    tools: jsonb('tools')
      .$type<Record<string, unknown>[]>()
      .default(sql`'[]'::jsonb`)
      .notNull(),
    resources: jsonb('resources')
      .$type<Record<string, unknown>[]>()
      .default(sql`'[]'::jsonb`)
      .notNull(),
    prompts: jsonb('prompts')
      .$type<Record<string, unknown>[]>()
      .default(sql`'[]'::jsonb`)
      .notNull(),
    serverConfig: jsonb('server_config').$type<Record<string, unknown> | null>(),
    installCommand: text('install_command'),
    dockerImage: text('docker_image'),
    repositoryUrl: text('repository_url'),
    documentationUrl: text('documentation_url'),
    license: text('license'),
    pricingType: text('pricing_type').default('free').notNull(),
    price: real('price').default(0).notNull(),
    category: text('category').default('tool').notNull(),
    tags: jsonb('tags')
      .$type<string[]>()
      .default(sql`'[]'::jsonb`)
      .notNull(),
    metadata: jsonb('metadata').$type<Record<string, unknown> | null>(),
    healthCheckUrl: text('health_check_url'),
    lastHealthCheck: timestamp('last_health_check', { mode: 'date' }),
    healthStatus: text('health_status').default('unknown').notNull(),
    usageCount: integer('usage_count').default(0).notNull(),
    rating: real('rating').default(0).notNull(),
    reviewCount: integer('review_count').default(0).notNull(),
    status: text('status').default('pending').notNull(),
    apiListingId: integer('api_listing_id').references(() => apiListings.id),
    ownerId: integer('owner_id')
      .references(() => users.id)
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index('mcp_servers_slug_idx').on(table.slug),
    categoryIdx: index('mcp_servers_category_idx').on(table.category),
    statusIdx: index('mcp_servers_status_idx').on(table.status),
    ownerIdIdx: index('mcp_servers_owner_id_idx').on(table.ownerId),
    healthStatusIdx: index('mcp_servers_health_status_idx').on(table.healthStatus),
    apiListingIdIdx: index('mcp_servers_api_listing_id_idx').on(table.apiListingId),
  })
);

// AI FEEDBACK LOOP PERSISTENCE
export const aiFeedbackLessons = pgTable(
  'ai_feedback_lessons',
  {
    id: serial('id').primaryKey(),
    context: text('context').notNull(),
    learning: text('learning').notNull(),
    confidence: real('confidence').default(0.5).notNull(),
    usageCount: integer('usage_count').default(0).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    contextIdx: index('ai_feedback_lessons_context_idx').on(table.context),
    confidenceIdx: index('ai_feedback_lessons_confidence_idx').on(table.confidence),
  })
);

export const aiFeedbackRecords = pgTable(
  'ai_feedback_records',
  {
    id: serial('id').primaryKey(),
    taskId: text('task_id').notNull(),
    type: text('type').notNull(), // success, failure, partial
    prompt: text('prompt').notNull(),
    response: text('response'),
    score: integer('score').notNull(), // 0-100
    metadata: jsonb('metadata').$type<Record<string, unknown> | null>(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    taskIdIdx: index('ai_feedback_records_task_id_idx').on(table.taskId),
    typeIdx: index('ai_feedback_records_type_idx').on(table.type),
  })
);

export type User = typeof users.$inferSelect;
export type ApiListing = typeof apiListings.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type UsageRecord = typeof usageRecords.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type ApiKey = typeof apiKeys.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type SkillReview = typeof skillReviews.$inferSelect;
export type SkillDownload = typeof skillDownloads.$inferSelect;
export type Agent = typeof agents.$inferSelect;
export type AgentSkill = typeof agentSkills.$inferSelect;
export type AgentHires = typeof agentHires.$inferSelect;
export type AgentTasks = typeof agentTasks.$inferSelect;
export type P2PEndpoint = typeof p2PEndpoints.$inferSelect;
export type X402Escrow = typeof x402Escrows.$inferSelect;
export type McpServer = typeof mcpServers.$inferSelect;
// Analytics table
export const analytics = pgTable('analytics', {
  id: serial('id').primaryKey(),
  event: text('event').notNull(),
  userId: integer('user_id').references(() => users.id),
  sessionId: text('session_id'),
  data: jsonb('data')
    .$type<Record<string, unknown>>()
    .default(sql`'{}'::jsonb`)
    .notNull(),
  timestamp: timestamp('timestamp', { mode: 'date' }).defaultNow().notNull(),
  ip: text('ip'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export type AIFeedbackLesson = typeof aiFeedbackLessons.$inferSelect;
export type AIFeedbackRecord = typeof aiFeedbackRecords.$inferSelect;
export type Analytics = typeof analytics.$inferSelect;
