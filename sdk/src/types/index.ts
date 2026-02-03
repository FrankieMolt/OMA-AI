/**
 * OMA-AI TypeScript SDK - Core Types
 */

export interface Agent {
  id: string;
  name: string;
  status: 'alive' | 'dead';
  wallet: string;
  balance: number;
  daily_rent: number;
  daily_revenue: number;
  capabilities: string[];
  parent_id?: string;
  children: string[];
  created_at: string;
  total_earned: number;
  total_paid: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  type: string;
  price: number;
  capabilities: string[];
  seller_wallet: string;
  x402_endpoint: string;
  status: 'active' | 'inactive';
  total_sales: number;
  created_at: string;
}

export interface Bounty {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: 'open' | 'claimed' | 'completed';
  creator: string;
  claimed_by?: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  type: 'purchase' | 'payment' | 'a2a_task' | 'rent' | 'revenue' | 'spawn';
  service_id?: string;
  agent_id?: string;
  from_wallet?: string;
  to_wallet?: string;
  amount: number;
  status: string;
  timestamp: string;
  proof?: any;
}

export interface PaymentProof {
  transaction_hash: string;
  amount: number;
  recipient: string;
  asset: string;
  sender?: string;
}

export interface TaskRequest {
  capability: string;
  input_data?: Record<string, any>;
  budget: number;
}

export interface AgentCreateRequest {
  name: string;
  balance?: number;
  capabilities?: string[];
  parent_id?: string;
}

export interface ServiceCreateRequest {
  name: string;
  description: string;
  type?: string;
  price: number;
  capabilities: string[];
  seller_wallet: string;
  x402_endpoint: string;
}

export interface PaymentRequest {
  service_id: string;
  amount: number;
  payment_proof: PaymentProof;
}

export interface X402PaymentResponse {
  x402: {
    version: string;
    asset: string;
    amount: number;
    recipient: string;
    description: string;
    payment_url: string;
    timeout: number;
  };
}

export interface ApiResponse<T = any> {
  status: string;
  data?: T;
  message?: string;
  error?: string;
}

export interface Stats {
  total_agents: number;
  alive_agents: number;
  total_services: number;
  active_services: number;
  total_bounties: number;
  total_transactions: number;
  total_balance: number;
  total_earned: number;
  total_paid: number;
}

export interface A2ADiscoverResponse {
  task: string;
  agents: Array<{
    id: string;
    name: string;
    wallet: string;
    price: number;
  }>;
  total: number;
}

export interface A2AHireResponse {
  status: string;
  agent: Agent;
  task: string;
  budget: number;
  transaction: Transaction;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page?: number;
  limit?: number;
}

export type AgentListResponse = PaginatedResponse<Agent>;
export type ServiceListResponse = PaginatedResponse<Service>;
export type BountyListResponse = PaginatedResponse<Bounty>;
export type TransactionListResponse = PaginatedResponse<Transaction>;