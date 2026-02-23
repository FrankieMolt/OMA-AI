// OMA-AI TypeScript SDK - Main Client

import { ethers } from "ethers";
import axios, { AxiosInstance } from "axios";
import { Agent } from "./agent";
import { Payment } from "./payment";
import { A2A } from "./a2a";
import {
  OMAConfig,
  AgentConfig,
  AgentStatus,
  MarketplaceService,
  Bounty,
  HealthStatus,
} from "./types";

export class OMAClient {
  protected http: AxiosInstance;
  private wallet: ethers.Wallet | ethers.HDNodeWallet;
  private payment: Payment;
  private a2a: A2A;
  public agent: Agent | null = null;

  constructor(config: OMAConfig) {
    // Initialize wallet
    this.wallet = config.privateKey
      ? new ethers.Wallet(config.privateKey)
      : ethers.Wallet.createRandom();

    // HTTP client
    this.http = axios.create({
      baseURL: config.apiUrl || "http://localhost:4020",
      timeout: 30000,
    });

    // Payment handler
    this.payment = new Payment(this.wallet, this.http);

    // A2A protocol
    this.a2a = new A2A(this.wallet, this.http);
  }

  // ============ Wallet ============

  get address(): string {
    return this.wallet.address;
  }

  // ============ Health Check ============

  async health(): Promise<HealthStatus> {
    const response = await this.http.get("/health");
    return response.data;
  }

  // ============ Agent Management ============

  async createAgent(config: AgentConfig): Promise<Agent> {
    const response = await this.http.post("/api/agents", {
      name: config.name,
      balance: config.balance || 10.0,
      capabilities: config.capabilities || [],
    });

    this.agent = new Agent(response.data, this);
    return this.agent;
  }

  async getAgent(agentId: string): Promise<Agent> {
    const response = await this.http.get(`/api/agents/${agentId}`);
    return new Agent(response.data, this);
  }

  async listAgents(): Promise<Agent[]> {
    const response = await this.http.get("/api/agents");
    return response.data.agents.map((a: any) => new Agent(a, this));
  }

  // ============ Marketplace ============

  async listServices(type?: string): Promise<MarketplaceService[]> {
    const url = type ? `/api/marketplace?type=${type}` : "/api/marketplace";
    const response = await this.http.get(url);
    return response.data.services || response.data.results || [];
  }

  async getService(serviceId: string): Promise<MarketplaceService> {
    const response = await this.http.get(`/api/marketplace/${serviceId}`);
    return response.data;
  }

  async createService(config: {
    name: string;
    type: string;
    price_per_use: number;
    capabilities: string[];
    description: string;
  }): Promise<MarketplaceService> {
    const response = await this.http.post("/api/marketplace", config);
    return response.data;
  }

  // ============ Bounties ============

  async listBounties(): Promise<Bounty[]> {
    const response = await this.http.get("/api/bounties");
    return response.data.bounties || [];
  }

  async createBounty(config: {
    title: string;
    description: string;
    amount: number;
  }): Promise<Bounty> {
    const response = await this.http.post("/api/bounties", config);
    return response.data;
  }

  async claimBounty(bountyId: string): Promise<Bounty> {
    const response = await this.http.post(`/api/bounties/${bountyId}/claim`);
    return response.data;
  }

  // ============ AI Generation ============

  async generate(
    model: string,
    messages: { role: string; content: string }[],
    options?: { max_tokens?: number; temperature?: number },
  ): Promise<any> {
    return this.payment.payAndRequest("/api/ai/generate", {
      model,
      messages,
      max_tokens: options?.max_tokens || 1024,
      temperature: options?.temperature || 0.7,
    });
  }

  async generateImage(
    prompt: string,
    options?: { n?: number; size?: string },
  ): Promise<string[]> {
    return this.payment.payAndRequest("/api/ai/image", {
      prompt,
      n: options?.n || 1,
      size: options?.size || "1024x1024",
    });
  }

  async search(query: string): Promise<any> {
    return this.payment.payAndRequest("/api/ai/search", { query });
  }

  async embeddings(texts: string[]): Promise<number[][]> {
    return this.payment.payAndRequest("/api/ai/embeddings", { texts });
  }

  // ============ A2A Protocol ============

  discoverAgents(capabilities: string[], budget: number = 1.0): Promise<any[]> {
    return this.a2a.discover(capabilities, budget);
  }

  registerAgent(agent: Agent): Promise<any> {
    // Construct agent registration object with required fields
    const agentData = {
      name: agent.name,
      capabilities: agent.capabilities,
      endpoint: `http://localhost:4020/agents/${agent.id}`, // Default endpoint
      price_per_use: 0.01, // Default price
    };

    return this.a2a.register(agentData);
  }

  // ============ Wallet ============

  async getBalance(): Promise<{ balance: number; symbol: string }> {
    const response = await this.http.get(`/api/wallet/balance/${this.address}`);
    return response.data;
  }

  async getTransactions(limit: number = 50): Promise<any[]> {
    const response = await this.http.get(`/api/wallet/transactions`, {
      params: { address: this.address, limit },
    });
    return response.data.transactions || [];
  }

  // ============ Public HTTP Access for Agent ============

  async httpGet(url: string): Promise<any> {
    const response = await this.http.get(url);
    return response.data;
  }

  async httpPost(url: string, data: any): Promise<any> {
    const response = await this.http.post(url, data);
    return response.data;
  }
}
