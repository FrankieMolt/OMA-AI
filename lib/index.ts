/**
 * OMA-AI SDK
 * 
 * Main entry point for the OMA-AI TypeScript SDK
 */

export { OMAClient } from './client';
export * from './x402';

// Types
export interface APIListing {
  id: string;
  name: string;
  endpoint: string;
  price: number;
  description?: string;
  category?: string;
}

export interface MCPServer {
  id: string;
  name: string;
  description: string;
  authType: 'none' | 'apiKey' | 'oauth';
  status: 'active' | 'inactive';
}

export interface UsageStats {
  calls: number;
  errors: number;
  revenue: number;
  uptime: number;
}