// Shared types for publish form steps

export interface MCPTool {
  name: string;
  description: string;
  pricing_usdc: number;
}

export const PUBLISH_CATEGORIES = [
  'data',
  'ai',
  'dev',
  'finance',
  'search',
  'storage',
  'security',
  'communication',
  'utility',
  'other',
] as const;
