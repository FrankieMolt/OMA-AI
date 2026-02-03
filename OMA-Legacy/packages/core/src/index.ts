import { EventEmitter } from 'eventemitter3';
import { AgentMemory } from './memory';
import { MetaOptimizer } from './meta';
import { KokoroTTS } from './voice';
import { AContextManager } from './context';

export interface AgentConfig {
  name: string;
  version: string;
  description?: string;
  memoryPath?: string;
  metaLearningEnabled?: boolean;
  voiceEnabled?: boolean;
  contextConfig?: { maxTokens: number };
}

export interface AgentState {
  status: 'idle' | 'thinking' | 'executing' | 'waiting' | 'error';
  currentTask?: string;
  memoryUsage: number;
  contextSize: number;
}

export interface AgentEvent {
  type:
    | 'agent_initialized'
    | 'agent_start'
    | 'agent_ready'
    | 'agent_shutdown'
    | 'task_start'
    | 'task_complete'
    | 'task_error'
    | 'memory_add'
    | 'memory_retrieve'
    | 'meta_update'
    | 'voice_speak'
    | 'time_travel';
  timestamp: number;
  data: unknown;
}

export class OMAAgent extends EventEmitter {
  private config: AgentConfig;
  private state: AgentState;
  private memory!: AgentMemory;
  private meta?: MetaOptimizer;
  private voice?: KokoroTTS;
  private context!: AContextManager;
  private eventHistory: AgentEvent[] = [];

  constructor(config: AgentConfig) {
    super();
    this.config = config;
    this.state = {
      status: 'idle',
      memoryUsage: 0,
      contextSize: 0,
    };

    this.initializeComponents();
    this.emit('agent_initialized', {
      timestamp: Date.now(),
      data: { config },
    });
  }

  private initializeComponents(): void {
    this.memory = new AgentMemory({
      path: this.config.memoryPath || './agent-memory.mv2',
      maxSize: 1024 * 1024 * 100,
    });

    this.context = new AContextManager(this.config.contextConfig);

    if (this.config.metaLearningEnabled !== false) {
      this.meta = new MetaOptimizer({
        targetImprovement: 0.15,
        adaptationInterval: 3600000,
      });
    }

    if (this.config.voiceEnabled) {
      this.voice = new KokoroTTS();
    }
  }

  async start(): Promise<void> {
    this.state.status = 'thinking';
    this.emit('agent_start', {
      timestamp: Date.now(),
      data: { status: this.state },
    });

    await this.memory.initialize();

    if (this.meta) {
      await this.meta.initialize();
    }

    if (this.voice) {
      await this.voice.initialize();
    }

    // Use context to prevent TS6133
    if (this.context) {
      // no-op
    }

    this.state.status = 'idle';
    this.logEvent('agent_ready', { state: this.state });
  }

  async executeTask(
    goal: string,
    options?: { maxCost?: number; timeout?: number }
  ): Promise<unknown> {
    this.state.status = 'executing';
    this.state.currentTask = goal;
    this.logEvent('task_start', { goal, options });

    let optimizedPrompt = goal;

    try {
      const startTime = Date.now();

      const context = await this.retrieveContext(goal);
      optimizedPrompt = await this.optimizePrompt(goal, context);

      const result = await this.executeCognitiveTask(goal, optimizedPrompt);

      const duration = Date.now() - startTime;

      await this.memory.add(goal, {
        type: 'result',
        metadata: { result: JSON.stringify(result), duration, success: true },
      });

      if (this.meta) {
        await this.meta.recordEpisode({
          goal,
          prompt: optimizedPrompt,
          result,
          duration,
          success: true,
        });
      }

      this.state.status = 'idle';
      this.logEvent('task_complete', { result, duration });

      return result;
    } catch (error) {
      this.state.status = 'error';
      this.logEvent('task_error', { error: (error as Error).message });

      if (this.meta) {
        await this.meta.recordEpisode({
          goal,
          prompt: optimizedPrompt,
          error: (error as Error).message,
          success: false,
        });
      }

      throw error;
    } finally {
      this.state.currentTask = undefined;
    }
  }

  private async retrieveContext(
    goal: string
  ): Promise<{
    memories: Array<{ id: string; timestamp: number; importance: number }>;
    timestamp: number;
    contextSize: number;
  }> {
    const memories = await this.memory.search(goal, { limit: 10 });
    return {
      memories: memories.map((memory) => ({
        id: memory.id,
        timestamp: memory.timestamp,
        importance: memory.importance,
      })),
      timestamp: Date.now(),
      contextSize: memories.length,
    };
  }

  private async optimizePrompt(
    goal: string,
    context: {
      memories: Array<{ id: string; timestamp: number; importance: number }>;
      timestamp: number;
      contextSize: number;
    }
  ): Promise<string> {
    if (!this.meta) {
      return goal;
    }

    return this.meta.optimizeForSession(goal, context);
  }

  private async executeCognitiveTask(
    _goal: string,
    prompt: string
  ): Promise<{ status: string; message: string; prompt: string; timestamp: number }> {
    // In a real implementation, this would call an LLM
    // For now, we simulate a response
    return {
      status: 'pending',
      message: 'Cognitive task execution requires LLM integration',
      prompt,
      timestamp: Date.now(),
    };
  }

  async memoryAdd(content: string, metadata?: Record<string, unknown>): Promise<void> {
    const frame = await this.memory.add(content, { metadata });
    this.logEvent('memory_add', { frameId: frame.id });
  }

  async memoryRetrieve(
    query: string,
    options?: { timeRange?: { start: number; end: number }; limit?: number }
  ): Promise<unknown[]> {
    const results = await this.memory.search(query, options);
    this.logEvent('memory_retrieve', { query, count: results.length });
    return results;
  }

  /**
   * Time Travel Debugging
   * Replays the agent's memory stream for a specific time range.
   * Returns a sequence of frames that can be "played back" in the UI.
   */
  async timeTravel(startTime: number, endTime: number): Promise<unknown[]> {
    const videoStream = await this.memory.getVideoStream(startTime, endTime);
    this.logEvent('time_travel', { startTime, endTime, frameCount: videoStream.length });
    return videoStream;
  }

  private logEvent(type: AgentEvent['type'], data: unknown): void {
    const event: AgentEvent = {
      type,
      timestamp: Date.now(),
      data,
    };

    this.eventHistory.push(event);
    this.emit(type, event);

    if (this.eventHistory.length > 1000) {
      this.eventHistory = this.eventHistory.slice(-500);
    }
  }

  getState(): AgentState {
    return { ...this.state };
  }

  getEventHistory(limit?: number): AgentEvent[] {
    return limit ? this.eventHistory.slice(-limit) : this.eventHistory;
  }

  async shutdown(): Promise<void> {
    this.state.status = 'idle';

    if (this.memory) {
      await this.memory.close();
    }

    if (this.voice) {
      await this.voice.stop();
    }

    this.emit('agent_shutdown', {
      timestamp: Date.now(),
      data: { state: this.state },
    });
  }
}

export function createAgent(config: AgentConfig): OMAAgent {
  return new OMAAgent(config);
}
