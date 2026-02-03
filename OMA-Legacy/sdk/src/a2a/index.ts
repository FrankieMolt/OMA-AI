import {
  A2AClientConfig,
  A2AMessage,
  A2ASendOptions,
  A2AExecuteOptions,
  A2AExecuteResult,
  A2ADiscoveryOptions,
  A2AAgentInfo,
} from './types';

export class A2AClient {
  private config: A2AClientConfig;

  constructor(config: A2AClientConfig = {}) {
    this.config = {
      endpoint: config.endpoint || 'https://api.oma.ai',
      apiKey: config.apiKey,
      agentId: config.agentId,
      signingKey: config.signingKey,
    };
  }

  async sendMessage(
    to: string,
    type: string,
    payload: Record<string, unknown>,
    options?: A2ASendOptions
  ): Promise<A2AMessage> {
    const messageId = this.generateMessageId();
    const timestamp = new Date().toISOString();

    const message: Partial<A2AMessage> = {
      id: messageId,
      to,
      type,
      payload,
      timestamp,
    };

    if (this.config.agentId) {
      message.from = this.config.agentId;
    }

    const signature = this.signMessage(message);
    (message as A2AMessage).signature = signature;

    const response = await fetch(`${this.config.endpoint}/api/a2a/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
        ...(options?.paymentSignature && {
          'PAYMENT-SIGNATURE': JSON.stringify(options.paymentSignature),
        }),
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Failed to send A2A message: ${response.statusText}`);
    }

    const data = await response.json() as { data: A2AMessage };
    return data.data;
  }

  async execute(agentId: string, options: A2AExecuteOptions): Promise<A2AExecuteResult> {
    const response = await fetch(`${this.config.endpoint}/api/a2a/${agentId}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
        ...(options.paymentSignature && {
          'PAYMENT-SIGNATURE': JSON.stringify(options.paymentSignature),
        }),
      },
      body: JSON.stringify({
        goal: options.goal,
        context: options.context,
        constraints: options.constraints,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to execute A2A task: ${response.statusText}`);
    }

    const data = await response.json() as { data: A2AExecuteResult };
    return data.data;
  }

  async executeStream(agentId: string, options: A2AExecuteOptions): Promise<ReadableStream> {
    const response = await fetch(`${this.config.endpoint}/api/a2a/${agentId}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
        ...(options.paymentSignature && {
          'PAYMENT-SIGNATURE': JSON.stringify(options.paymentSignature),
        }),
        Accept: 'text/event-stream',
      },
      body: JSON.stringify({
        goal: options.goal,
        context: options.context,
        constraints: options.constraints,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to execute A2A task stream: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error('No response body');
    }

    return response.body;
  }

  async discover(
    options?: A2ADiscoveryOptions
  ): Promise<{ agents: A2AAgentInfo[]; total: number }> {
    const params = new URLSearchParams();

    if (options?.category) params.set('category', options.category);
    if (options?.search) params.set('search', options.search);
    if (options?.capability) params.set('capability', options.capability);
    if (options?.minRating) params.set('minRating', options.minRating.toString());
    if (options?.limit) params.set('limit', options.limit.toString());
    if (options?.offset) params.set('offset', options.offset.toString());

    const response = await fetch(`${this.config.endpoint}/api/a2a/discover?${params}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to discover A2A agents: ${response.statusText}`);
    }

    const data = await response.json() as { data?: { agents: A2AAgentInfo[]; total: number } };
    return data.data || { agents: [], total: 0 };
  }

  async getAgent(agentId: string): Promise<A2AAgentInfo | null> {
    const response = await fetch(`${this.config.endpoint}/api/a2a/agents/${agentId}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to get A2A agent: ${response.statusText}`);
    }

    const data = await response.json() as { data: A2AAgentInfo };
    return data.data;
  }

  async getCapabilities(agentId: string): Promise<string[]> {
    const agent = await this.getAgent(agentId);
    return agent?.capabilities || [];
  }

  async getTaskStatus(taskId: string): Promise<A2AExecuteResult> {
    const response = await fetch(`${this.config.endpoint}/api/a2a/tasks/${taskId}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get task status: ${response.statusText}`);
    }

    const data = await response.json() as { data: A2AExecuteResult };
    return data.data;
  }

  async getMessages(options?: {
    from?: string;
    to?: string;
    type?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ messages: A2AMessage[]; total: number }> {
    const params = new URLSearchParams();

    if (options?.from) params.set('from', options.from);
    if (options?.to) params.set('to', options.to);
    if (options?.type) params.set('type', options.type);
    if (options?.limit) params.set('limit', options.limit.toString());
    if (options?.offset) params.set('offset', options.offset.toString());

    const response = await fetch(`${this.config.endpoint}/api/a2a/messages?${params}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get A2A messages: ${response.statusText}`);
    }

    const data = await response.json() as { data?: { messages: A2AMessage[]; total: number } };
    return data.data || { messages: [], total: 0 };
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  private signMessage(message: Partial<A2AMessage>): string {
    const messageData = JSON.stringify({
      id: message.id,
      from: message.from,
      to: message.to,
      type: message.type,
      timestamp: message.timestamp,
    });

    return Buffer.from(messageData).toString('base64');
  }

  setAgentId(agentId: string): void {
    this.config.agentId = agentId;
  }

  setSigningKey(signingKey: string): void {
    this.config.signingKey = signingKey;
  }

  setApiKey(apiKey: string): void {
    this.config.apiKey = apiKey;
  }

  setEndpoint(endpoint: string): void {
    this.config.endpoint = endpoint;
  }
}
