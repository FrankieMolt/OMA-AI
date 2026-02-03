
import { OMA } from './client';
import { Agent, ExecutionResult } from './types';

export class AgentInstance {
  private context: Record<string, unknown> = {};
  private paymentOptions?: { paymentSignature?: string };

  constructor(
    private readonly client: OMA,
    public readonly data: Agent
  ) {}

  /**
   * Set execution context for the next request
   */
  setContext(context: Record<string, unknown>): this {
    this.context = { ...this.context, ...context };
    return this;
  }

  /**
   * Configure payment options for the next request
   */
  withPayment(options: { paymentSignature?: string }): this {
    this.paymentOptions = options;
    return this;
  }

  /**
   * Execute the agent with the given input
   */
  async execute(input: string): Promise<ExecutionResult> {
    const result = await this.client.executeAgent(this.data.id, input, {
      paymentSignature: this.paymentOptions?.paymentSignature,
      context: this.context,
    });

    // Reset temporary options after execution
    this.paymentOptions = undefined;
    
    return result;
  }

  /**
   * Clear current context
   */
  clearContext(): this {
    this.context = {};
    return this;
  }
}
