/**
 * AI Orchestration Framework
 * Large Model Fine-tuned Autonomous Orchestrator
 *
 * Purpose: Intelligently routes tasks to the best AI model
 * - Model selection based on task type, cost, and capability
 * - Automatic fallback chains
 * - Load balancing across providers
 * - Cost optimization (cheapest viable model)
 */

import { logger } from '@/lib/logger';

// ============================================
// 🎯 MODEL DEFINITIONS
// ============================================

export type ModelProvider = 'anthropic' | 'openai' | 'google' | 'local' | 'mistral';

export interface ModelConfig {
  id: string;
  provider: ModelProvider;
  name: string;
  contextWindow: number;
  costPer1kTokens: number; // in USD
  capabilities: ModelCapability[];
  speed: 'slow' | 'medium' | 'fast' | 'ultra_fast';
  quality: 'basic' | 'good' | 'great' | 'elite';
  tier: string;
}

export type ModelCapability =
  | 'chat'
  | 'code'
  | 'vision'
  | 'reasoning'
  | 'creative'
  | 'math'
  | 'analysis'
  | 'roleplay';

// ============================================
// 📊 MODEL REGISTRY
// ============================================

const MODEL_REGISTRY: ModelConfig[] = [
  {
    id: 'claude-sonnet-4',
    provider: 'anthropic',
    name: 'Claude Sonnet 4',
    contextWindow: 200000,
    costPer1kTokens: 0.003,
    capabilities: ['chat', 'code', 'reasoning', 'creative', 'analysis'],
    speed: 'fast',
    quality: 'elite',
    tier: 'premium',
  },
  {
    id: 'claude-haiku-3.5',
    provider: 'anthropic',
    name: 'Claude Haiku 3.5',
    contextWindow: 200000,
    costPer1kTokens: 0.00025,
    capabilities: ['chat', 'code'],
    speed: 'ultra_fast',
    quality: 'good',
    tier: 'utility',
  },
  {
    id: 'gpt-4o',
    provider: 'openai',
    name: 'GPT-4o',
    contextWindow: 128000,
    costPer1kTokens: 0.005,
    capabilities: ['chat', 'code', 'vision', 'creative'],
    speed: 'fast',
    quality: 'great',
    tier: 'standard',
  },
  {
    id: 'gpt-4o-mini',
    provider: 'openai',
    name: 'GPT-4o Mini',
    contextWindow: 128000,
    costPer1kTokens: 0.00015,
    capabilities: ['chat', 'code'],
    speed: 'ultra_fast',
    quality: 'good',
    tier: 'utility',
  },
  {
    id: 'gemini-2.0-flash',
    provider: 'google',
    name: 'Gemini 2.0 Flash',
    contextWindow: 1000000,
    capabilities: ['chat', 'code', 'vision', 'reasoning'],
    costPer1kTokens: 0.0001,
    speed: 'ultra_fast',
    quality: 'great',
    tier: 'fast',
  },
  {
    id: 'mistral-large',
    provider: 'mistral',
    name: 'Mistral Large',
    contextWindow: 128000,
    costPer1kTokens: 0.002,
    capabilities: ['chat', 'code', 'reasoning'],
    speed: 'fast',
    quality: 'great',
    tier: 'standard',
  },
  {
    id: 'local-llama',
    provider: 'local',
    name: 'Local Llama',
    contextWindow: 32000,
    costPer1kTokens: 0, // Free!
    capabilities: ['chat', 'code'],
    speed: 'medium',
    quality: 'good',
    tier: 'local',
  },
];

// ============================================
// 🎲 ROUTING STRATEGIES
// ============================================

export type RoutingStrategy = 'cheapest' | 'fastest' | 'best_quality' | 'balanced' | 'experimental';

interface TaskRequirements {
  capabilities: ModelCapability[];
  minContextWindow?: number;
  maxCostPer1k?: number;
  preferredSpeed?: 'slow' | 'medium' | 'fast' | 'ultra_fast';
  strategy?: RoutingStrategy;
}

// ============================================
// 🚀 AI ORCHESTRATOR
// ============================================

export class AIOrchestrator {
  private models: ModelConfig[];
  private usageStats: Map<string, { calls: number; tokens: number; cost: number }>;
  private fallbackChain: string[];

  constructor() {
    this.models = [...MODEL_REGISTRY];
    this.usageStats = new Map();
    this.fallbackChain = ['claude-sonnet-4', 'gpt-4o', 'gemini-2.0-flash', 'local-llama'];

    logger.info('AI Orchestrator initialized');
  }

  /**
   * Select the best model for a task
   */
  selectModel(requirements: TaskRequirements): ModelConfig | null {
    const { capabilities, minContextWindow, maxCostPer1k, strategy = 'balanced' } = requirements;

    // Filter eligible models
    const eligible = this.models.filter((model) => {
      // Check capabilities
      const hasCapabilities = capabilities.every((cap) => model.capabilities.includes(cap));
      if (!hasCapabilities) return false;

      // Check context window
      if (minContextWindow && model.contextWindow < minContextWindow) return false;

      // Check cost
      if (maxCostPer1k && model.costPer1kTokens > maxCostPer1k) return false;

      return true;
    });

    if (eligible.length === 0) {
      logger.warn('No models match requirements');
      return null;
    }

    // Apply routing strategy
    let selected: ModelConfig;

    switch (strategy) {
      case 'cheapest':
        selected = eligible.sort((a, b) => a.costPer1kTokens - b.costPer1kTokens)[0];
        logger.info(`Cheapest model selected: ${selected.name}`);
        break;

      case 'fastest':
        const speedRank = { slow: 0, medium: 1, fast: 2, ultra_fast: 3 };
        selected = eligible.sort((a, b) => speedRank[b.speed] - speedRank[a.speed])[0];
        logger.info(`Fastest model selected: ${selected.name}`);
        break;

      case 'best_quality':
        const qualityRank = { basic: 0, good: 1, great: 2, elite: 3 };
        selected = eligible.sort((a, b) => qualityRank[b.quality] - qualityRank[a.quality])[0];
        logger.info(`Quality model selected: ${selected.name}`);
        break;
      case 'experimental':
        selected = eligible[Math.floor(Math.random() * eligible.length)];
        logger.info(`Experimental model selected: ${selected.name}`);
        break;
      default:
        // Score based on combined factors
        selected = eligible.sort((a, b) => {
          const qualityRank = { basic: 1, good: 2, great: 3, elite: 4 };
          const speedRank = { slow: 1, medium: 2, fast: 3, ultra_fast: 4 };

          const scoreA = qualityRank[a.quality] * 2 + speedRank[a.speed] - a.costPer1kTokens * 100;
          const scoreB = qualityRank[b.quality] * 2 + speedRank[b.speed] - b.costPer1kTokens * 100;

          return scoreB - scoreA;
        })[0];
        logger.info(`⚖️ Balanced model selected: ${selected.name}`);
    }

    return selected;
  }

  /**
   * Execute with automatic fallback
   */
  async executeWithFallback<T>(
    task: (model: ModelConfig) => Promise<T>,
    requirements: TaskRequirements
  ): Promise<{ result: T; model: ModelConfig } | null> {
    for (const modelId of this.fallbackChain) {
      const model = this.models.find((m) => m.id === modelId);
      if (!model) continue;

      // Check if model meets requirements
      const meetsRequirements = requirements.capabilities.every((cap) =>
        model.capabilities.includes(cap)
      );
      if (!meetsRequirements) continue;

      try {
        logger.info(`🎯 Trying model: ${model.name}`);
        const result = await task(model);

        // Track usage
        this.trackUsage(model.id, 1000, model.costPer1kTokens);

        logger.info(`Orchestration success with ${model.name}`);
        return { result, model };
      } catch (error) {
        logger.warn(`⚠️ ${model.name} failed, trying next in chain...`, { error });
        continue;
      }
    }

    logger.error('All models in fallback chain failed');
    return null;
  }

  /**
   * Track model usage for cost optimization
   */
  private trackUsage(modelId: string, tokens: number, costPer1k: number): void {
    const current = this.usageStats.get(modelId) || { calls: 0, tokens: 0, cost: 0 };
    this.usageStats.set(modelId, {
      calls: current.calls + 1,
      tokens: current.tokens + tokens,
      cost: current.cost + (tokens / 1000) * costPer1k,
    });
  }

  /**
   * Get usage statistics
   */
  getStats(): Record<string, { calls: number; tokens: number; cost: number }> {
    const stats: Record<string, { calls: number; tokens: number; cost: number }> = {};
    for (const [modelId, data] of this.usageStats) {
      stats[modelId] = data;
    }
    return stats;
  }

  /**
   * Get total cost across all models
   */
  getTotalCost(): number {
    let total = 0;
    for (const [, data] of this.usageStats) {
      total += data.cost;
    }
    return total;
  }

  /**
   * Add a custom model to the registry
   */
  registerModel(model: ModelConfig): void {
    this.models.push(model);
    logger.info(`Registered new model: ${model.name}`);
  }

  /**
   * Get all available models
   */
  getModels(): ModelConfig[] {
    return [...this.models];
  }

  /**
   * Set custom fallback chain
   */
  setFallbackChain(modelIds: string[]): void {
    this.fallbackChain = modelIds;
    logger.info(`🔗 Updated fallback chain: ${modelIds.join(' → ')}`);
  }
}

// ============================================
// 🌟 EXPORTS
// ============================================

export const aiOrchestrator = new AIOrchestrator();

// Quick access helpers
export const selectModel = (req: TaskRequirements) => aiOrchestrator.selectModel(req);
export const executeWithFallback = <T>(
  task: (model: ModelConfig) => Promise<T>,
  req: TaskRequirements
) => aiOrchestrator.executeWithFallback(task, req);

export const ORCHESTRATOR_MOTTO = 'Intelligent AI Orchestration';
