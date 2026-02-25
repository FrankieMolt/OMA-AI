/**
 * OMA-AI SDK
 * 
 * Complete SDK for interacting with OMA-AI platform
 * - API calls with automatic payment
 * - Wallet connection
 * - MCP server management
 * - Usage tracking
 * 
 * @example
 * import { OMAClient } from '@oma-ai/sdk';
 * 
 * const client = new OMAClient({
 *   baseUrl: 'https://oma-ai.com',
 *   wallet: '0x...'
 * });
 * 
 * // Get crypto prices
 * const prices = await client.prices.get();
 * 
 * // Call paid API
 * const result = await client.ai.generate('Hello world');
 */

import { ethers, BrowserProvider, Contract } from 'ethers';

// Configuration
export interface OMAConfig {
  baseUrl?: string;
  wallet?: string;
  privateKey?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ===========================================
// PRICE API
// ===========================================

export interface PriceData {
  price: number;
  change_24h: number;
  mcap?: number;
  volume?: number;
  rank?: number;
  symbol: string;
}

export interface PricesResponse {
  bitcoin: PriceData;
  ethereum: PriceData;
  solana: PriceData;
  [key: string]: PriceData;
}

export class PriceAPI {
  constructor(private client: OMAClient) {}

  /** Get BTC, ETH, SOL prices */
  async get(): Promise<PricesResponse> {
    const res = await this.client.request('/api/price');
    return res.data;
  }

  /** Get 10 cryptocurrencies */
  async getAll(): Promise<PricesResponse> {
    const res = await this.client.request('/api/prices');
    return res.data;
  }

  /** Get premium prices (x402 required) */
  async getPremium(): Promise<PricesResponse> {
    const res = await this.client.request('/api/premium-price', {}, { requirePayment: true });
    return res.data;
  }
}

// ===========================================
// AI/LLM API  
// ===========================================

export interface LLMResponse {
  model: string;
  result: any;
  provider: string;
}

export class LLMAPI {
  constructor(private client: OMAClient) {}

  /** Generate text using AI */
  async generate(prompt: strin...(options ? { model: options.model, temperature: String(options.temperature || 0.7), maxTokens: String(options.maxTokens || 1000) } : {})?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }): Promise<LLMResponse> {
    const res = await this.client.request('/api/llm', {
      prompt,
      ...(options ? { model: options.model, temperature: String(options.temperature || 0.7), maxTokens: String(options.maxTokens || 1000) } : {})
    });
    return res.data;
  }
}

// ===========================================
// WEATHER API
// ===========================================

export interface WeatherData {
  location: string;
  country: string;
  current: {
    temp_c: number;
    temp_f: number;
    condition: string;
    icon: string;
    wind_kph: number;
    humidity: number;
  };
  forecast: Array<{
    date: string;
    max_c: number;
    min_c: number;
    condition: string;
  }>;
}

export class WeatherAPI {
  constructor(private client: OMAClient) {}

  /** Get weather for a city */
  async get(city: string): Promise<WeatherData> {
    const res = await this.client.request('/api/weather', { city });
    return res.data;
  }
}

// ===========================================
// SEARCH API
// ===========================================

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface SearchResponse {
  results: SearchResult[];
  query: string;
}

export class SearchAPI {
  constructor(private client: OMAClient) {}

  /** Search the web */
  async search(query: string, limit = 10): Promise<SearchResponse> {
    const res = await this.client.request('/api/search', { q: query, limit: String(limit) });
    return res.data;
  }
}

// ===========================================
// WALLET
// ===========================================

export interface WalletInfo {
  address: string;
  chainId: number;
  network: string;
  usdcBalance: string;
}

export class WalletAPI {
  constructor(private client: OMAClient) {}

  /** Connect wallet (requires browser) */
  async connect(): Promise<WalletInfo> {
    if (typeof window === 'undefined') {
      throw new Error('Wallet connection requires browser');
    }

    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      throw new Error('No wallet found');
    }

    await ethereum.request({ method: 'eth_requestAccounts' });
    
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const chainId = await ethereum.request({ method: 'eth_chainId' });

    // Get USDC balance
    const provider = new BrowserProvider(ethereum);
    const usdc = new Contract(
      '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      ['function balanceOf(address) view returns (uint256)'],
      provider
    );
    
    const balance = await usdc.balanceOf(accounts[0]);

    return {
      address: accounts[0],
      chainId: parseInt(chainId, 16),
      network: 'base',
      usdcBalance: ethers.formatUnits(balance, 6)
    };
  }

  /** Get payment requirement for an API */
  getPaymentRequirement(amount: string, description: string) {
    return {
      'x402-version': 1,
      'scheme': 'erc20',
      'currency': 'USDC',
      'amount': amount,
      'recipient': '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6',
      'network': 'base',
      'description': description
    };
  }
}

// ===========================================
// MAIN CLIENT
// ===========================================

export class OMAClient {
  public prices: PriceAPI;
  public ai: LLMAPI;
  public weather: WeatherAPI;
  public search: SearchAPI;
  public wallet: WalletAPI;

  private baseUrl: string;
  private walletAddress?: string;
  private privateKey?: string;

  constructor(config: OMAConfig = {}) {
    this.baseUrl = config.baseUrl || 'https://oma-ai.com';
    this.walletAddress = config.wallet;
    this.privateKey = config.privateKey;

    this.prices = new PriceAPI(this);
    this.ai = new LLMAPI(this);
    this.weather = new WeatherAPI(this);
    this.search = new SearchAPI(this);
    this.wallet = new WalletAPI(this);
  }

  async request(
    endpoint: string, 
    params: Record<string, string> = {},
 ...(options ? { model: options.model, temperature: String(options.temperature || 0.7), maxTokens: String(options.maxTokens || 1000) } : {}): { requirePayment?: boolean } = {}
  ): Promise<APIResponse<any>> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add payment header if required
    i...(options ? { model: options.model, temperature: String(options.temperature || 0.7), maxTokens: String(options.maxTokens || 1000) } : {}).requirePayment && this.privateKey) {
      // Create payment authorization (simplified)
      // In production, use proper x402 signature
      headers['X-Payment'] = 'paid';
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
}

export default OMAClient;