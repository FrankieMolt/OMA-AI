import { OMAConfig, Agent, MCPServer, ListOptions, ExecutionResult } from './types';
import { X402Client } from './x402';
import { MCPClient } from './mcp';
import { A2AClient } from './a2a';
import { AgentInstance } from './agent';

export class OMA {
  public readonly config: OMAConfig;
  public readonly x402: X402Client;
  public readonly mcp: MCPClient;
  public readonly a2a: A2AClient;

  constructor(config: OMAConfig) {
    this.config = {
      endpoint: config.endpoint || 'https://api.oma.ai',
      apiKey: config.apiKey,
      wallet: config.wallet,
    };

    this.x402 = new X402Client({
      wallet: config.wallet?.privateKey,
      endpoint: this.config.endpoint,
    });

    this.mcp = new MCPClient({
      endpoint: this.config.endpoint,
      apiKey: this.config.apiKey,
    });

    this.a2a = new A2AClient({
      endpoint: this.config.endpoint,
      apiKey: this.config.apiKey,
    });
  }

  /**
   * Load an agent by ID or Slug to interact with it
   */
  async loadAgent(idOrSlug: string): Promise<AgentInstance> {
    // Try as ID first, then fallback to slug search if implemented on backend
    // For now, we assume the API supports retrieving by either via the same endpoint or search
    
    // First try direct fetch (assuming ID)
    let agentData: Agent | null = null;
    
    try {
      agentData = await this.getAgent(idOrSlug);
    } catch (error) {
      // Ignore error and try search
    }

    if (!agentData) {
       // If getAgent failed (404), try searching by slug
       const searchResults = await this.getAgents({ search: idOrSlug, limit: 1 });
       if (searchResults.agents.length > 0) {
         agentData = searchResults.agents[0];
       }
    }

    if (!agentData) {
      throw new Error(`Agent not found: ${idOrSlug}`);
    }

    return new AgentInstance(this, agentData);
  }

  async getAgents(options?: ListOptions): Promise<{ agents: Agent[]; total: number }> {
    const params = new URLSearchParams();

    if (options?.limit) params.set('limit', options.limit.toString());
    if (options?.offset) params.set('offset', options.offset.toString());
    if (options?.search) params.set('search', options.search);
    if (options?.category) params.set('category', options.category);
    if (options?.pricingType) params.set('pricingType', options.pricingType);
    if (options?.minRating) params.set('minRating', options.minRating.toString());
    if (options?.tags) params.set('tags', options.tags.join(','));
    // Ensure we only get agents
    params.set('category', 'agent');

    const response = await fetch(`${this.config.endpoint}/api/listings?${params}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch agents: ${response.statusText}`);
    }

    const data = await response.json() as { data?: { agents: Agent[]; total: number } };
    return data.data || { agents: [], total: 0 };
  }

  async getAgent(id: string): Promise<Agent | null> {
    const response = await fetch(`${this.config.endpoint}/api/listings/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch agent: ${response.statusText}`);
    }

    const data = await response.json() as { data: Agent };
    return data.data;
  }

  async executeAgent(
    agentId: string,
    input: string,
    options?: {
      paymentSignature?: string;
      context?: Record<string, unknown>;
    }
  ): Promise<ExecutionResult> {
    const response = await fetch(`${this.config.endpoint}/api/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
        ...(options?.paymentSignature && {
          'PAYMENT-SIGNATURE': JSON.stringify(options.paymentSignature),
        }),
      },
      body: JSON.stringify({
        listingId: agentId,
        input,
        context: options?.context,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to execute agent: ${response.statusText}`);
    }

    const data = await response.json() as { data: ExecutionResult };
    return data.data;
  }

  async getMCPServers(options?: ListOptions): Promise<{ servers: MCPServer[]; total: number }> {
    const params = new URLSearchParams();

    if (options?.limit) params.set('limit', options.limit.toString());
    if (options?.offset) params.set('offset', options.offset.toString());
    if (options?.search) params.set('search', options.search);
    if (options?.category) params.set('category', options.category);
    if (options?.pricingType) params.set('pricingType', options.pricingType);
    if (options?.healthStatus) params.set('healthStatus', options.healthStatus);
    if (options?.minRating) params.set('minRating', options.minRating.toString());
    if (options?.tags) params.set('tags', options.tags.join(','));

    const response = await fetch(`${this.config.endpoint}/api/mcp/discover?${params}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch MCP servers: ${response.statusText}`);
    }

    const data = await response.json() as { data?: { servers: MCPServer[]; total: number } };
    return data.data || { servers: [], total: 0 };
  }

  async getMCPServer(id: number): Promise<MCPServer | null> {
    const response = await fetch(`${this.config.endpoint}/api/mcp/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch MCP server: ${response.statusText}`);
    }

    const data = await response.json() as { data: MCPServer };
    return data.data;
  }

  async getBalance(address: string): Promise<{ balance: number; credits: number }> {
    const response = await fetch(`${this.config.endpoint}/api/wallet/balance?address=${address}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch balance: ${response.statusText}`);
    }

    const data = await response.json() as { data: { balance: number; credits: number } };
    return data.data;
  }
}
