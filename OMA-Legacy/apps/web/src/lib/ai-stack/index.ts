/**
 * AI Stack
 *
 * Central export point for the OMA AI Orchestration Layer.
 */

import { aiOrchestrator, AIOrchestrator } from '@/lib/ai-orchestrator';
import { aiFeedbackLoop, AIFeedbackLoop } from '@/lib/ai-feedback-loop';
import { taskQueue, TaskQueue } from '@/lib/task-queue';

// Re-export types
export * from '@/lib/ai-orchestrator';
export * from '@/lib/ai-feedback-loop';
export * from '@/lib/task-queue';

/**
 * Access all AI services from a single object
 */
export const AiStack = {
  // Services
  orchestrator: aiOrchestrator,
  feedback: aiFeedbackLoop,
  queue: taskQueue,

  // Classes
  Orchestrator: AIOrchestrator,
  FeedbackLoop: AIFeedbackLoop,
  TaskQueue: TaskQueue,

  info: {
    version: '2.0.0',
    name: 'OMA AI Stack',
  },
};

export default AiStack;
