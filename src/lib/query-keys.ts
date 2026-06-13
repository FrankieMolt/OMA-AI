/**
 * React Query Keys — centralized for type safety and cache management
 */

export enum QueryKeys {
  // MCP Marketplace
  MCP_LIST = 'mcp.list',
  MCP_DETAIL = 'mcp.detail',
  MCP_CATEGORIES = 'mcp.categories',
  
  // Agents
  AGENT_LIST = 'agent.list',
  AGENT_DETAIL = 'agent.detail',
  
  // Human Services
  SERVICE_LIST = 'service.list',
  SERVICE_DETAIL = 'service.detail',
  
  // User & Account
  USER_PROFILE = 'user.profile',
  USER_STATS = 'user.stats',
  USER_MCPS = 'user.mcps',
  
  // x402 & Payments
  X402_NONCE = 'x402.nonce',
  
  // System
  HEALTH = 'health',
}

export const createQueryKey = (key: QueryKeys, params?: Record<string, unknown>) => {
  if (params) {
    return [key, params] as const;
  }
  return [key] as const;
};
