/**
 * AI Feedback Loop Framework
 * Recursive Optimization and Learning
 *
 * Purpose: Implements a persistent improvement loop for AI operations
 * - Tracks success/failure of operations
 * - Automatically adjusts prompts and parameters
 * - Implements A/B testing for responses
 * - Stores lessons learned for future use
 */

import { logger } from '@/lib/logger';

// ============================================
// 📊 FEEDBACK TYPES
// ============================================

export type FeedbackType = 'success' | 'failure' | 'partial' | 'timeout';

export interface FeedbackEntry {
  id: string;
  taskId: string;
  type: FeedbackType;
  prompt: string;
  response: string;
  score: number; // 0-100
  timestamp: Date;
  metadata: Record<string, unknown>;
}

export interface OptimizationResult {
  originalPrompt: string;
  optimizedPrompt: string;
  improvementScore: number;
  iterations: number;
  lessons: string[];
}

// ============================================
// 🧠 LESSON STORE - Wisdom from failures
// ============================================

export interface Lesson {
  id: string;
  context: string;
  learning: string;
  confidence: number;
  usageCount: number;
  createdAt: Date;
}

// Helper for Base URL
const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // Browser
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  return 'http://localhost:3000'; // Default local
};

class LessonStore {
  private lessons: Map<string, Lesson> = new Map();

  async addLesson(context: string, learning: string): Promise<string> {
    const tempId = `lesson_${Date.now()}`;

    // Optimistic update
    this.lessons.set(tempId, {
      id: tempId,
      context,
      learning,
      confidence: 0.5,
      usageCount: 0,
      createdAt: new Date(),
    });

    try {
      const res = await fetch(`${getBaseUrl()}/api/ai-feedback/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context, learning }),
      });

      if (res.ok) {
        const data = await res.json();
        // Update map with real ID if needed, but for now just log
        logger.info(`📚 Persisted lesson: ${data.id}`);
        return data.id;
      }
    } catch (e) {
      logger.error('Failed to persist lesson', e as Record<string, unknown>);
    }

    logger.info(`📚 New lesson learned (local): "${learning.slice(0, 50)}..."`);
    return tempId;
  }

  async findRelevantLessons(context: string, limit = 5): Promise<Lesson[]> {
    try {
      const res = await fetch(
        `${getBaseUrl()}/api/ai-feedback/lessons?context=${encodeURIComponent(context)}`
      );
      if (res.ok) {
        const lessons = await res.json();
        return lessons.slice(0, limit);
      }
    } catch (e) {
      logger.warn('Failed to fetch persistent lessons, falling back to memory', e as Record<string, unknown>);
    }

    // Fallback to in-memory
    const relevant: Lesson[] = [];
    for (const [, lesson] of this.lessons) {
      if (context.toLowerCase().includes(lesson.context.toLowerCase())) {
        relevant.push(lesson);
        lesson.usageCount++;
      }
    }
    return relevant.sort((a, b) => b.confidence - a.confidence).slice(0, limit);
  }

  reinforceLesson(id: string, success: boolean): void {
    const lesson = this.lessons.get(id);
    if (lesson) {
      lesson.confidence = Math.max(0, Math.min(1, lesson.confidence + (success ? 0.1 : -0.15)));
      logger.info(`📈 Lesson ${id} confidence: ${(lesson.confidence * 100).toFixed(0)}%`);
    }
  }
}

// ============================================
// 🔄 PROMPT EVOLVER - Bilevel Optimization
// ============================================

interface PromptVersion {
  version: number;
  prompt: string;
  score: number;
  uses: number;
}

class PromptEvolver {
  private versions: Map<string, PromptVersion[]> = new Map();
  private currentVersions: Map<string, number> = new Map();

  registerPrompt(taskType: string, prompt: string): void {
    let versions = this.versions.get(taskType);
    if (!versions) {
      versions = [];
      this.versions.set(taskType, versions);
    }

    versions.push({
      version: versions.length + 1,
      prompt,
      score: 0.5,
      uses: 0,
    });

    this.currentVersions.set(taskType, versions.length);
    logger.info(`📝 Registered prompt v${versions.length} for "${taskType}"`);
  }

  getPrompt(taskType: string): string | null {
    const versions = this.versions.get(taskType);
    const currentVersion = this.currentVersions.get(taskType);

    if (!versions || !currentVersion) return null;

    const prompt = versions[currentVersion - 1];
    prompt.uses++;
    return prompt.prompt;
  }

  evolvePrompt(taskType: string, feedback: FeedbackEntry): string {
    const versions = this.versions.get(taskType);
    if (!versions || versions.length === 0) {
      return feedback.prompt;
    }

    // Update score of current version
    const currentIdx = (this.currentVersions.get(taskType) || 1) - 1;
    const current = versions[currentIdx];
    current.score = (current.score * current.uses + feedback.score / 100) / (current.uses + 1);

    // If score is low, try to evolve
    if (current.score < 0.6 && feedback.type === 'failure') {
      // Generate evolved prompt (in production, this would use an LLM)
      const evolved = this.generateEvolvedPrompt(current.prompt, feedback);
      this.registerPrompt(taskType, evolved);
      logger.info(`🧬 Evolved prompt for "${taskType}" to v${versions.length}`);
      return evolved;
    }

    return current.prompt;
  }

  private generateEvolvedPrompt(original: string, feedback: FeedbackEntry): string {
    // Simple evolution: Add lessons learned
    const prefix = `[LEARNED: Avoid patterns that led to: ${feedback.response.slice(0, 50)}]\n`;
    return prefix + original;
  }
}

// ============================================
// 🎯 A/B TESTER - Experiment Framework
// ============================================

interface Experiment {
  id: string;
  name: string;
  variants: { id: string; weight: number; value: unknown }[];
  results: Map<string, { success: number; total: number }>;
  status: 'running' | 'concluded';
  winner?: string;
}

class ABTester {
  private experiments: Map<string, Experiment> = new Map();

  createExperiment(
    name: string,
    variants: { id: string; weight: number; value: unknown }[]
  ): string {
    const id = `exp_${Date.now()}`;
    const results = new Map<string, { success: number; total: number }>();

    for (const variant of variants) {
      results.set(variant.id, { success: 0, total: 0 });
    }

    this.experiments.set(id, {
      id,
      name,
      variants,
      results,
      status: 'running',
    });

    logger.info(`🧪 Created A/B test "${name}" with ${variants.length} variants`);
    return id;
  }

  getVariant(experimentId: string): { variantId: string; value: unknown } | null {
    const exp = this.experiments.get(experimentId);
    if (!exp || exp.status !== 'running') return null;

    // Weighted random selection
    const totalWeight = exp.variants.reduce((sum, v) => sum + v.weight, 0);
    let random = Math.random() * totalWeight;

    for (const variant of exp.variants) {
      random -= variant.weight;
      if (random <= 0) {
        return { variantId: variant.id, value: variant.value };
      }
    }

    return { variantId: exp.variants[0].id, value: exp.variants[0].value };
  }

  recordResult(experimentId: string, variantId: string, success: boolean): void {
    const exp = this.experiments.get(experimentId);
    if (!exp) return;

    const results = exp.results.get(variantId);
    if (results) {
      results.total++;
      if (success) results.success++;

      logger.info(
        `📊 Experiment "${exp.name}" - ${variantId}: ${results.success}/${results.total}`
      );

      // Auto-conclude if enough data
      this.checkForConclusion(exp);
    }
  }

  private checkForConclusion(exp: Experiment): void {
    const MIN_SAMPLES = 30;

    for (const [, results] of exp.results) {
      if (results.total < MIN_SAMPLES) return;
    }

    // Find winner
    let bestRate = 0;
    let winner = '';

    for (const [variantId, results] of exp.results) {
      const rate = results.success / results.total;
      if (rate > bestRate) {
        bestRate = rate;
        winner = variantId;
      }
    }

    exp.status = 'concluded';
    exp.winner = winner;
    logger.info(
      `🏆 Experiment "${exp.name}" concluded! Winner: ${winner} (${(bestRate * 100).toFixed(1)}%)`
    );
  }
}

// ============================================
// 🚀 ROFL CORE - The Feedback Loop
// ============================================

export class AIFeedbackLoop {
  private lessons: LessonStore;
  private promptEvolver: PromptEvolver;
  private abTester: ABTester;
  private feedbackHistory: FeedbackEntry[] = [];
  private iterationCount = 0;
  private maxIterations: number;

  constructor(maxIterations = 100) {
    this.lessons = new LessonStore();
    this.promptEvolver = new PromptEvolver();
    this.abTester = new ABTester();
    this.maxIterations = maxIterations;

    logger.info('AI Feedback Loop initialized');
  }

  /**
   * The Ralph Wiggum Loop - iterate until success or max iterations
   * Named after the Simpsons character known for 그의 naive persistence.
   * "I'm in a loop! 🤡"
   */
  async optimizationLoop<T>(
    task: (context: {
      prompt: string;
      iteration: number;
    }) => Promise<{ result: T; success: boolean }>,
    initialPrompt: string,
    options: {
      maxIterations?: number;
      onFailure?: (error: unknown) => void;
    } = {}
  ): Promise<T> {
    const max = options.maxIterations || this.maxIterations;
    let currentPrompt = initialPrompt;

    for (let i = 1; i <= max; i++) {
      logger.info(`🤡 Ralph Loop iteration ${i}/${max}: "I'm helping!"`);
      try {
        const { result, success } = await task({ prompt: currentPrompt, iteration: i });
        if (success) {
          logger.info(`✅ Ralph Loop success! "I'm a genius!"`);
          return result;
        }
      } catch (error) {
        logger.warn(`⚠️ Ralph Loop iteration ${i} failed. "Me fail English? That's unpossible!"`);
        options.onFailure?.(error);
      }
      // In a true Ralph Loop, we just keep going with the same or slightly jittered prompt
      currentPrompt = currentPrompt + (i % 2 === 0 ? ' Please try harder.' : ' Focus on accuracy.');
    }

    throw new Error('Ralph Loop reached max iterations. "I\'m a failure! 🤡"');
  }

  /**
   * The Original ROFL Loop - iterate with actual feedback and adaptation
   */
  async loop<T>(
    task: (context: {
      prompt: string;
      lessons: Lesson[];
      iteration: number;
    }) => Promise<{ result: T; success: boolean }>,
    initialPrompt: string,
    options: {
      taskType?: string;
      completionCheck?: (result: T) => boolean;
      onIteration?: (iteration: number, result: T) => void;
    } = {}
  ): Promise<{ result: T; iterations: number; improved: boolean }> {
    const { taskType = 'default', completionCheck, onIteration } = options;
    let currentPrompt = initialPrompt;
    let lastResult: T | undefined;
    let improved = false;

    // Register initial prompt
    this.promptEvolver.registerPrompt(taskType, initialPrompt);

    for (let i = 1; i <= this.maxIterations; i++) {
      this.iterationCount = i;

      // Get relevant lessons (ASYNC NOW)
      const relevantLessons = await this.lessons.findRelevantLessons(currentPrompt);

      logger.info(`🔄 ROFL iteration ${i}/${this.maxIterations}`);

      try {
        const { result, success } = await task({
          prompt: currentPrompt,
          lessons: relevantLessons,
          iteration: i,
        });

        lastResult = result;
        onIteration?.(i, result);

        // Check completion
        const isComplete = completionCheck ? completionCheck(result) : success;

        if (isComplete) {
          logger.info(`✅ ROFL completed after ${i} iterations! ROFLcopter to production! 🚁`);

          // Record success
          await this.recordFeedback({
            taskId: taskType,
            type: 'success',
            prompt: currentPrompt,
            response: JSON.stringify(result),
            score: 100,
          });

          return { result, iterations: i, improved };
        }

        // Record partial/failure and evolve
        await this.recordFeedback({
          taskId: taskType,
          type: success ? 'partial' : 'failure',
          prompt: currentPrompt,
          response: JSON.stringify(result),
          score: success ? 50 : 20,
        });

        // Evolve prompt for next iteration
        currentPrompt = this.promptEvolver.evolvePrompt(
          taskType,
          this.feedbackHistory[this.feedbackHistory.length - 1]
        );
        improved = true;
      } catch (error) {
        logger.warn(`⚠️ Iteration ${i} failed: ${error}`);

        // Learn from failure
        await this.lessons.addLesson(currentPrompt, `Error occurred: ${error}`);

        await this.recordFeedback({
          taskId: taskType,
          type: 'failure',
          prompt: currentPrompt,
          response: String(error),
          score: 0,
        });
      }
    }

    logger.warn(`💀 ROFL max iterations reached. Rolling on the floor crying.`);
    if (lastResult === undefined) {
      throw new Error('ROFL max iterations reached without a result');
    }
    return {
      result: lastResult,
      iterations: this.maxIterations,
      improved,
    };
  }

  /**
   * Record feedback for learning
   */
  private async recordFeedback(
    entry: Omit<FeedbackEntry, 'id' | 'timestamp' | 'metadata'>
  ): Promise<void> {
    const feedback: FeedbackEntry = {
      id: `fb_${Date.now()}`,
      timestamp: new Date(),
      metadata: {},
      ...entry,
    };

    this.feedbackHistory.push(feedback);

    try {
      await fetch(`${getBaseUrl()}/api/ai-feedback/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...entry,
          metadata: feedback.metadata,
        }),
      });
    } catch (e) {
      logger.error('Failed to persist feedback', e as Record<string, unknown>);
    }
  }

  /**
   * Run an A/B test
   */
  createExperiment(
    name: string,
    variants: { id: string; weight: number; value: unknown }[]
  ): string {
    return this.abTester.createExperiment(name, variants);
  }

  getExperimentVariant(experimentId: string) {
    return this.abTester.getVariant(experimentId);
  }

  recordExperimentResult(experimentId: string, variantId: string, success: boolean): void {
    this.abTester.recordResult(experimentId, variantId, success);
  }

  /**
   * Public API to retrieve relevant lessons
   */
  async retrieve(context: string, limit = 5): Promise<Lesson[]> {
    return this.lessons.findRelevantLessons(context, limit);
  }

  /**
   * Add a lesson manually
   */
  async learn(context: string, lesson: string): Promise<string> {
    return this.lessons.addLesson(context, lesson);
  }

  /**
   * Get statistics
   */
  getStats() {
    const feedbackByType = this.feedbackHistory.reduce(
      (acc, f) => {
        acc[f.type] = (acc[f.type] || 0) + 1;
        return acc;
      },
      {} as Record<FeedbackType, number>
    );

    return {
      totalIterations: this.iterationCount,
      feedbackCount: this.feedbackHistory.length,
      feedbackByType,
      successRate: feedbackByType.success / (this.feedbackHistory.length || 1),
      motto: 'ROFLcopter to production! 🚁',
    };
  }
}

// ============================================
// 🌟 EXPORTS
// ============================================

export const aiFeedbackLoop = new AIFeedbackLoop();

// Quick access helpers
export const loop = aiFeedbackLoop.loop.bind(aiFeedbackLoop);
export const learn = aiFeedbackLoop.learn.bind(aiFeedbackLoop);

export const FEEDBACK_MOTTO = 'Continuous optimization and learning';
