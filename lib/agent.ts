// OMA-AI TypeScript SDK - Agent Wrapper

import { OMAClient } from './client';
import { ethers } from 'ethers';

export interface AgentData {
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
}

export class Agent {
  private data: AgentData;
  private client: OMAClient;
  
  constructor(data: AgentData, client: OMAClient) {
    this.data = data;
    this.client = client;
  }
  
  // ============ Getters ============
  
  get id(): string { return this.data.id; }
  get name(): string { return this.data.name; }
  get status(): string { return this.data.status; }
  get balance(): number { return this.data.balance; }
  get capabilities(): string[] { return this.data.capabilities; }
  get children(): string[] { return this.data.children; }
  get isAlive(): boolean { return this.data.status === 'alive'; }
  
  // ============ Actions ============
  
  async think(task: string): Promise<string> {
    const response = await this.client.generate(
      'llama-3.3-70b-versatile',
      [{ role: 'user', content: task }]
    );
    return response.choices[0].message.content;
  }
  
  async spawnChild(name: string, balance: number = 10): Promise<Agent> {
    const response = await this.client.httpPost(`/api/agents/${this.id}/spawn`, {
      name,
      balance,
    });
    return new Agent(response.data, this.client);
  }

  async earn(amount: number): Promise<void> {
    await this.client.httpPost(`/api/agents/${this.id}/earn`, { amount });
    this.data.balance += amount;
    this.data.total_earned += amount;
  }

  async pay(amount: number): Promise<void> {
    await this.client.httpPost(`/api/agents/${this.id}/pay`, { amount });
    this.data.balance -= amount;
    this.data.total_paid += amount;
  }

  async addCapability(capability: string): Promise<void> {
    await this.client.httpPost(`/api/agents/${this.id}/capabilities`, {
      capability
    });
    this.data.capabilities.push(capability);
  }

  // ============ Status ============

  async getStatus(): Promise<AgentData> {
    const response = await this.client.httpGet(`/api/agents/${this.id}`);
    this.data = response;
    return this.data;
  }

  async getEarnings(): Promise<{
    total_earned: number;
    total_paid: number;
    net_profit: number;
    daily_average: number;
  }> {
    const response = await this.client.httpGet(`/api/agents/${this.id}/earnings`);
    return response;
  }

  async getChildren(): Promise<Agent[]> {
    const response = await this.client.httpGet(`/api/agents/${this.id}/children`);
    return response.children.map((a: any) => new Agent(a, this.client));
  }
  
  // ============ Economics ============
  
  get survivalDays(): number {
    if (this.data.daily_rent <= 0) return Infinity;
    const daily_net = this.data.daily_revenue - this.data.daily_rent;
    if (daily_net <= 0) return 0;
    return Math.floor(this.data.balance / Math.abs(daily_net));
  }
  
  get netWorth(): number {
    return this.data.balance - (this.data.children.length * 5); // 5 per child spawned
  }
  
  get canSpawn(): boolean {
    return this.data.balance >= 10 && this.data.status === 'alive';
  }
  
  // ============ JSON ============
  
  toJSON(): AgentData {
    return this.data;
  }
}