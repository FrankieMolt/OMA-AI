/**
 * Supabase Configuration
 * Database connection and client setup
 */

import { createClient } from '@supabase/supabase-js';

// ============================================
// CONFIGURATION
// ============================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// ============================================
// CLIENT EXPORT
// ============================================

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// TYPES
// ============================================

export interface MCP_Skill {
  id: string;
  name: string;
  slug: string;
  category: string[];
  description: string;
  author: string;
  repository_url: string;
  documentation_url: string | null;
  mcp_endpoint: string;
  pricing_usdc: number;
  x402_enabled: boolean;
  verified: boolean;
  rating: number;
  total_calls: number;
  success_rate: number;
  created_at: string;
  updated_at: string;
}

export interface Agent_Wallet {
  id: string;
  agent_id: string;
  wallet_address: string;
  ens_name: string | null;
  chain_id: number;
  balance_usdc: number;
  total_earned: number;
  total_spent: number;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  from_wallet: string;
  to_wallet: string;
  amount_usdc: number;
  status: 'pending' | 'completed' | 'failed' | 'expired';
  tx_hash: string | null;
  skill_id: string | null;
  created_at: string;
  completed_at: string | null;
  error_message: string | null;
}

export interface LLM_Model {
  id: string;
  provider: string;
  name: string;
  slug: string;
  model_id: string;
  context_window: number;
  pricing_input: number;
  pricing_output: number;
  pricing_usdc: number;
  category: string;
  capabilities: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Usage_Metric {
  id: string;
  skill_id: string | null;
  wallet_address: string | null;
  api_endpoint: string;
  success: boolean;
  latency_ms: number | null;
  tokens_used: number;
  cost_usdc: number;
  created_at: string;
}

export interface Agent_Profile {
  id: string;
  agent_id: string;
  name: string;
  description: string | null;
  wallet_address: string | null;
  skills: string[];
  reputation_score: number;
  total_tasks_completed: number;
  total_earned: number;
  verified: boolean;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Marketplace_Stats {
  verified_mcp_count: number;
  total_agents: number;
  total_volume_usdc: number;
  volume_24h: number;
  volume_7d: number;
  tx_24h: number;
  tx_7d: number;
  last_updated: string;
}

// ============================================
// TABLE NAMES
// ============================================

export const TABLES = {
  MCP_SKILLS: 'mcp_skills',
  AGENT_WALLETS: 'agent_wallets',
  TRANSACTIONS: 'transactions',
  LLM_MODELS: 'llm_models',
  USAGE_METRICS: 'usage_metrics',
  AGENT_PROFILES: 'agent_profiles',
  MARKETPLACE_STATS: 'marketplace_stats',
} as const;

// ============================================
// API KEY VALIDATION (TEMPORARY)
// ============================================

export async function validateApiKey(apiKey: string) {
  // TODO: Implement proper API key validation with database
  // For now, this is a placeholder to avoid build errors
  return {
    users: {
      credits: 1000,
      bonus_credits: 100,
      used_this_month: 50,
    }
  };
}

// ============================================
// EXPORTS
// ============================================

// All types are already exported with 'export interface' above
// validateApiKey is exported for legacy compatibility

