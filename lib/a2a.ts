// OMA-AI TypeScript SDK - Agent-to-Agent Protocol

import { ethers } from 'ethers';
import axios, { AxiosInstance } from 'axios';

interface AgentInfo {
  id: string;
  name: string;
  capabilities: string[];
  endpoint: string;
  price_per_use: number;
  status: 'available' | 'busy' | 'offline';
}

interface TaskRequest {
  task: string;
  budget: number;
  deadline?: number;
  requirements?: string[];
}

interface TaskResult {
  task_id: string;
  result: string;
  cost: number;
  agent_id: string;
  completed_at: string;
}

export class A2A {
  private wallet: ethers.Wallet | ethers.HDNodeWallet;
  private http: AxiosInstance;
  private myInfo: AgentInfo | null = null;

  constructor(wallet: ethers.Wallet | ethers.HDNodeWallet, http: AxiosInstance) {
    this.wallet = wallet;
    this.http = http;
  }
  
  /**
   * Register this agent with the A2A network
   */
  async register(agent: {
    name: string;
    capabilities: string[];
    endpoint: string;
    price_per_use?: number;
  }): Promise<AgentInfo> {
    const response = await this.http.post('/api/a2a/register', {
      ...agent,
      price_per_use: agent.price_per_use || 0.01,
    });

    this.myInfo = response.data;
    if (!this.myInfo) {
      throw new Error('Failed to register agent: Invalid response');
    }
    return this.myInfo;
  }
  
  /**
   * Discover agents with specific capabilities
   */
  async discover(
    capabilities: string[],
    budget: number = 1.0
  ): Promise<AgentInfo[]> {
    const response = await this.http.post('/api/a2a/discover', {
      capabilities,
      budget,
    });
    return response.data.agents || [];
  }
  
  /**
   * Hire an agent for a task
   */
  async hire(
    agentId: string,
    task: string,
    budget: number
  ): Promise<TaskResult> {
    const response = await this.http.post(`/api/a2a/hire/${agentId}`, {
      task,
      budget,
      requester: this.wallet.address,
    });
    return response.data;
  }
  
  /**
   * Complete a task (as a hired agent)
   */
  async completeTask(taskId: string, result: string, cost: number): Promise<void> {
    await this.http.post(`/api/a2a/task/${taskId}/complete`, {
      result,
      cost,
    });
  }
  
  /**
   * Get task status
   */
  async getTaskStatus(taskId: string): Promise<TaskResult> {
    const response = await this.http.get(`/api/a2a/task/${taskId}`);
    return response.data;
  }
  
  /**
   * Negotiate with an agent
   */
  async negotiate(
    agentId: string,
    task: string,
    initialPrice: number
  ): Promise<{
    counteroffer: number | null;
    accepted: boolean;
    message: string;
  }> {
    const response = await this.http.post(`/api/a2a/negotiate/${agentId}`, {
      task,
      initial_price: initialPrice,
    });
    return response.data;
  }
  
  /**
   * Get my current tasks
   */
  async getMyTasks(): Promise<TaskResult[]> {
    const response = await this.http.get('/api/a2a/my-tasks');
    return response.data.tasks || [];
  }
  
  /**
   * Update my availability
   */
  async setAvailability(status: 'available' | 'busy' | 'offline'): Promise<void> {
    await this.http.post('/api/a2a/availability', { status });
    if (this.myInfo) {
      this.myInfo.status = status;
    }
  }
  
  /**
   * Get my registered info
   */
  getMyInfo(): AgentInfo | null {
    return this.myInfo;
  }
}