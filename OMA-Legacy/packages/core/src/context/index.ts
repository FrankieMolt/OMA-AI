export interface FunctionCall {
  name?: string;
  arguments?: string;
}

export interface ToolCall {
  id?: string;
  type?: string;
  function?: {
    name?: string;
    arguments?: string;
  };
}

export interface Message {
  role: string;
  content: string;
  name?: string;
  function_call?: FunctionCall;
  tool_calls?: ToolCall[];
}

export interface ContextConfig {
  maxTokens: number;
  pruningStrategy: 'summary' | 'fifo' | 'importance';
}

export class AContextManager {
  private config: ContextConfig;

  constructor(config: Partial<ContextConfig> = {}) {
    this.config = {
      maxTokens: 4000,
      pruningStrategy: 'importance',
      ...config,
    };
  }

  /**
   * Token Budget Optimization
   * Compresses the message history to fit within context window.
   */
  optimize(messages: Message[]): Message[] {
    // Simple heuristic: 1 char ~= 0.25 tokens
    let currentTokens = 0;
    const optimized: Message[] = [];

    if (messages.length === 0) return [];

    // Always keep system prompt
    const systemPrompt = messages.find((m) => m.role === 'system');
    if (systemPrompt) {
      optimized.push(systemPrompt);
      currentTokens += systemPrompt.content.length / 4;
    }

    // Process from end (most recent) to start
    // Skip system prompt if we already added it
    const recentMessages = messages.filter((m) => m !== systemPrompt).reverse();

    for (const msg of recentMessages) {
      const tokens = msg.content.length / 4;

      if (currentTokens + tokens < this.config.maxTokens) {
        optimized.splice(systemPrompt ? 1 : 0, 0, msg); // Insert after system prompt (or at start)
        currentTokens += tokens;
      } else {
        // Stop if full.
        // In a real implementation, we might summarize here.
        break;
      }
    }

    return optimized;
  }

  /**
   * Trajectory Segmentation (Agent Skill Distillation)
   * Splits a session into logical "Reasoning" and "Action" blocks.
   */
  segmentTrajectory(messages: Message[]): { reasoning: Message[]; actions: Message[] } {
    const reasoning: Message[] = [];
    const actions: Message[] = [];

    for (const msg of messages) {
      // Heuristic: If message contains code blocks or tool calls, it's an Action.
      // If it's pure text analysis, it's Reasoning.
      if (msg.content.includes('```') || msg.function_call || msg.tool_calls) {
        actions.push(msg);
      } else {
        reasoning.push(msg);
      }
    }
    return { reasoning, actions };
  }

  /**
   * Skill Distillation (Learning from SOPs)
   * extracts "Lessons" from successful task completions.
   */
  distillSkill(messages: Message[]): string | null {
    const { reasoning, actions } = this.segmentTrajectory(messages);

    if (messages.length === 0) return null;

    // Check if the last interaction was successful (heuristic)
    const lastMsg = messages[messages.length - 1];
    const isError =
      lastMsg.content.toLowerCase().includes('error') ||
      lastMsg.content.toLowerCase().includes('failed');

    if (lastMsg.role === 'assistant' && !isError) {
      return `Distilled Skill: Used ${reasoning.length} thought steps to execute ${actions.length} actions. Pattern: ${actions[0]?.content.slice(0, 50)}...`;
    }
    return null;
  }
}
