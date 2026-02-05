// OMA-AI TypeScript SDK - Types

export interface OMAConfig {
  apiUrl?: string;
  privateKey?: string;
}

export interface AgentConfig {
  name: string;
  balance?: number;
  capabilities?: string[];
}

export interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  service: string;
  version: string;
  timestamp: string;
}

export interface AgentStatus {
  id: string;
  name: string;
  status: 'alive' | 'dead';
  balance: number;
  daily_rent: number;
  daily_revenue: number;
  capabilities: string[];
  children: string[];
  total_earned: number;
  total_paid: number;
  generation: number;
  parent_id: string | null;
  positiveBalance: boolean;
  recentActivity: boolean;
  readyToSpawn: boolean;
}

export interface MarketplaceService {
  id: string;
  type: 'api' | 'model' | 'skill' | 'data';
  name: string;
  description: string;
  price_per_use: number;
  x402_endpoint: string;
  seller_wallet: string;
  capabilities: string[];
  tags: string[];
  status: 'active' | 'inactive';
  total_sales: number;
  total_revenue: number;
  rating: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
}

export interface Bounty {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  creator: string;
  worker: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface WalletBalance {
  address: string;
  balance: number;
  symbol: string;
  network: string;
}

export interface Transaction {
  id: string;
  type: 'payment' | 'receive' | 'transfer';
  amount: number;
  from: string;
  to: string;
  status: 'pending' | 'confirmed' | 'failed';
  tx_hash: string;
  timestamp: string;
}

export interface A2AAgent {
  id: string;
  name: string;
  capabilities: string[];
  endpoint: string;
  price_per_use: number;
  status: 'available' | 'busy' | 'offline';
  rating: number;
  total_tasks: number;
}

export interface A2ATask {
  task_id: string;
  requester: string;
  worker: string;
  task: string;
  budget: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  result: string | null;
  cost: number;
  created_at: string;
  completed_at: string | null;
}

export interface AICompletionRequest {
  model: string;
  messages: { role: string; content: string }[];
  max_tokens?: number;
  temperature?: number;
}

export interface AICompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ImageGenerationRequest {
  prompt: string;
  n?: number;
  size?: string;
}

export interface ImageGenerationResponse {
  created: number;
  data: {
    url: string;
    revised_prompt: string;
  }[];
}

export interface WebSearchResponse {
  query: string;
  results: {
    title: string;
    url: string;
    snippet: string;
    source: string;
  }[];
  total_results: number;
}