/**
 * OMA-AI TypeScript Client
 * 
 * SDK for interacting with OMA-AI marketplace
 * Supports API calls, MCP connections, and compute deployments
 * 
 * @example
 * import { OMAClient } from '@oma-ai/client';
 * 
 * const client = new OMAClient({
 *   network: 'base',
 *   privateKey: '0x...'
 * });
 * 
 * // Call an API
 * const prices = await client.call('price');
 * 
 * // List your API
 * await client.publishAPI({
 *   name: 'My API',
 *   endpoint: 'https://api.example.com',
 *   price: 0.001
 * });
 */

import { ethers } from 'ethers';

const DEFAULT_RPC = 'https://mainnet.base.org';
const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bDA02513';

/**
 * OMA-AI Client Configuration
 */
interface OMAConfig {
  network?: 'base' | 'ethereum';
  rpcUrl?: string;
  privateKey?: string;
  apiKey?: string;
}

/**
 * API Listing
 */
interface APIListing {
  id: string;
  name: string;
  endpoint: string;
  price: number;
  description?: string;
  category?: string;
}

/**
 * MCP Server
 */
interface MCPServer {
  id: string;
  name: string;
  description: string;
  authType: 'none' | 'apiKey' | 'oauth';
  status: 'active' | 'inactive';
}

/**
 * OMA-AI Client
 */
export class OMAClient {
  private network: string;
  private rpcUrl: string;
  private signer?: ethers.Signer;
  private provider: ethers.Provider;
  private apiKey?: string;
  
  constructor(config: OMAConfig = {}) {
    this.network = config.network || 'base';
    this.rpcUrl = config.rpcUrl || DEFAULT_RPC;
    this.apiKey = config.apiKey;
    
    this.provider = new ethers.JsonRpcProvider(this.rpcUrl);
    
    if (config.privateKey) {
      this.signer = new ethers.Wallet(config.privateKey, this.provider);
    }
  }
  
  /**
   * Get API Key for authenticated requests
   */
  async getApiKey(): Promise<string> {
    if (this.apiKey) return this.apiKey;
    throw new Error('API key not configured');
  }
  
  /**
   * Call an API endpoint
   */
  async call(endpoint: string, params: Record<string, string> = {}): Promise<any> {
    const url = new URL(`https://oma-ai.com/api/${endpoint}`);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    
    const response = await fetch(url.toString(), { headers });
    
    if (response.status === 402) {
      const paymentReq = await response.json();
      throw new Error(`Payment required: ${JSON.stringify(paymentReq.payment)}`);
    }
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  /**
   * Get crypto prices
   */
  async getPrices(): Promise<any> {
    return this.call('price');
  }
  
  /**
   * Get premium prices (with market cap)
   */
  async getPremiumPrices(): Promise<any> {
    return this.call('premium-price');
  }
  
  /**
   * Search the web
   */
  async search(query: string, limit = 10): Promise<any> {
    return this.call('search', { q: query, limit: limit.toString() });
  }
  
  /**
   * Get weather
   */
  async getWeather(city: string): Promise<any> {
    return this.call('weather', { city });
  }
  
  /**
   * Get wallet balance
   */
  async getBalance(currency: string = 'USDC'): Promise<string> {
    if (!this.signer) throw new Error('Wallet not configured');
    
    if (currency === 'USDC') {
      const usdc = new ethers.Contract(
        USDC_BASE,
        ['function balanceOf(address) view returns (uint256)'],
        this.provider
      );
      const balance = await usdc.balanceOf(await this.signer.getAddress());
      return ethers.formatUnits(balance, 6);
    }
    
    const bal = await this.provider.getBalance(await this.signer.getAddress());
    return ethers.formatEther(bal);
  }
  
  /**
   * Get published APIs for current user
   */
  async getMyAPIs(): Promise<APIListing[]> {
    const response = await fetch('https://oma-ai.com/api/my/apis', {
      headers: this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {}
    });
    
    if (!response.ok) return [];
    const data = await response.json();
    return data.apis || [];
  }
  
  /**
   * Get connected MCP servers
   */
  async getConnectedMCPs(): Promise<MCPServer[]> {
    const response = await fetch('https://oma-ai.com/api/my/mcps', {
      headers: this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {}
    });
    
    if (!response.ok) return [];
    const data = await response.json();
    return data.mcps || [];
  }
  
  /**
   * Connect to an MCP server
   */
  async connectMCP(serverId: string, authToken: string): Promise<void> {
    const response = await fetch(`https://oma-ai.com/api/mcps/${serverId}/connect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {})
      },
      body: JSON.stringify({ authToken })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to connect: ${response.statusText}`);
    }
  }
  
  /**
   * Get usage stats
   */
  async getStats(): Promise<any> {
    const response = await fetch('https://oma-ai.com/api/my/stats', {
      headers: this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {}
    });
    
    if (!response.ok) return null;
    return response.json();
  }
  
  /**
   * Get earnings
   */
  async getEarnings(): Promise<any> {
    const response = await fetch('https://oma-ai.com/api/my/earnings', {
      headers: this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {}
    });
    
    if (!response.ok) return null;
    return response.json();
  }
}

export default OMAClient;