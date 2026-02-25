// OMA-AI TypeScript SDK - Main Entry Point

export { OMAClient } from './lib/client';
export * from './lib/x402';

// Re-export types
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