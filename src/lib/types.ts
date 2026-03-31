// Shared TypeScript interfaces for OMA-AI

// ============ AGENT TYPES ============
export interface Agent {
  id: string;
  agent_id: string;
  name: string;
  description: string | null;
  avatar_url: string | null;
  reputation_score: number;
  total_tasks_completed: number;
  total_earned: number;
  is_verified: boolean;
  status: string;
  capabilities: string[];
  creator_id?: string;
  creator_username: string | null;
  creator_display_name: string | null;
  creator_avatar: string | null;
  created_at?: string;
}

export interface AgentCreator {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
}

// ============ SERVICE TYPES ============
export interface HumanService {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string | null;
  price_usdc: number;
  requirements: string[];
  status: string;
  applications_count: number;
  created_at: string;
  expires_at: string;
  service_type?: string;
  ai_agents: ServiceAgent;
}

export interface ServiceAgent {
  id: string;
  name: string;
  description: string | null;
  avatar_url: string | null;
  reputation_score: number;
  wallet_address?: string;
}

// ============ MCP TYPES ============

/**
 * Canonical MCP skill interface — single source of truth for all data layers.
 *
 * Observed across:
 *   - types.ts          (base fields)
 *   - useMCPMarketplace.ts   (+ tier, color)
 *   - compare/page.tsx        (+ avg_latency_ms)
 *   - mcp-data.ts             (+ long_description, version, color, tools_count, tools)
 *
 * Supabase schema may add more fields; extend here, not locally.
 */
export interface MCPSkill {
  // Identity
  id: string;
  name: string;
  slug: string;
  // Categorization
  category: string[];
  tags?: string[];
  // Descriptions
  description: string;
  long_description?: string;
  // Authorship & links
  author: string;
  repository_url?: string | null;
  documentation_url?: string | null;
  // Endpoint
  mcp_endpoint: string;
  // Pricing & payments
  pricing_usdc: number;
  x402_enabled: boolean;
  // Trust & quality
  verified: boolean;
  rating: number;
  total_calls: number;
  // Alias: legacy field name used in raw mcp-data.ts objects
  // Remove once Supabase is the only data source
  calls?: number;
  success_rate: number;
  avg_latency_ms?: number;
  downloads?: number;
  // Tool metadata
  tools?: { name: string; description: string }[];
  /** Number of tools; falls back to tools.length when stored directly in Supabase */
  tools_count?: number;
  // Versioning & branding
  version?: string;
  color?: string;
  tier?: 'free' | 'premium';
  // Timestamps
  created_at?: string;
}

/** Alias: MCPServer = MCPSkill (used internally in mcp-data.ts) */
export type MCPServer = MCPSkill;

export interface MCPTool {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
}

// ============ MARKETPLACE TYPES ============
export interface MarketplaceStats {
  total_mcps: number;
  verified_count: number;
  total_calls: number;
  avg_rating: number;
}

export interface MCPCategory {
  name: string;
  count: number;
}

// ============ USER TYPES ============
export interface User {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  email?: string;
  created_at?: string;
}

// ============ API RESPONSE TYPES ============
export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ============ MCP REGISTER TYPES ============
export interface MCPToolInput {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
  pricing_usdc?: number;
}

export interface MCPRegisterBody {
  name: string;
  description: string;
  category: string;
  repository_url?: string;
  documentation_url?: string;
  mcp_endpoint: string;
  pricing_usdc?: number;
  tools: MCPToolInput[];
}

// ============ SEARCH TYPES ============
export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  category?: string;
  engine?: string;
  score?: number;
}
