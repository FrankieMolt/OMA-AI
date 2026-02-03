import { UIMessage } from 'ai';
import { z } from 'zod';
import { tool } from 'ai';
import { aiFeedbackLoop } from '@/lib/ai-feedback-loop';

export interface MetaLesson {
  id: string;
  trigger: string; // "When user asks about X"
  strategy: string; // "Do Y instead of Z"
  confidence: number;
  source_interaction_id?: string;
}

/**
 * Meta-Learning System (CONSOLIDATED with AI Feedback Loop)
 * This handles the long-term learning of the agent.
 */
export const metaLearning = {
  /**
   * Analyze an interaction to extract lessons (Delegates to AI Feedback Loop)
   */
  analyzeInteraction: async (messages: UIMessage[] = []) => {
    // Extract context
    const context =
      messages.length > 0
        ? messages
            .map((message) => {
              const content = (message as { content?: unknown }).content;
              return typeof content === 'string' ? content : String(content ?? '');
            })
            .join(' ')
            .slice(-500)
        : 'manual_interaction';

    // In a real system, an LLM would extract the lesson from the conversation
    // For now, we simulate a lesson based on the context
    await aiFeedbackLoop.learn(
      context,
      'Always verify user intent before executing physical actions.'
    );

    return {
      success: true,
      stats: aiFeedbackLoop.getStats(),
    };
  },

  /**
   * Retrieve relevant lessons for current context from AI Feedback loop DB
   */
  get_relevant_lessons: async (context: string): Promise<MetaLesson[]> => {
    // Delegate to AI Feedback Loop's retrieval mechanism via public API
    const lessons = await aiFeedbackLoop.retrieve(context);

    return lessons.map((l: import('@/lib/ai-feedback-loop').Lesson) => ({
      id: String(l.id),
      trigger: l.context,
      strategy: l.learning,
      confidence: Number(l.confidence),
      source_interaction_id: 'feedback_db',
    }));
  },

  /**
   * Add a new lesson to the persistent store via AI Feedback loop
   */
  addLesson: async (lesson: Omit<MetaLesson, 'id' | 'source_interaction_id'>) => {
    await aiFeedbackLoop.learn(lesson.trigger, lesson.strategy);
    return {
      ...lesson,
      id: `lesson_${Date.now()}`,
      source_interaction_id: 'manual_add',
    };
  },
};

// Tool definitions for the AI SDK
type LearnLessonParams = {
  trigger: string;
  strategy: string;
};

export const learningTools = {
  learn_lesson: tool({
    description: 'Save a new lesson learned from this interaction to help you in the future.',
    parameters: z.object({
      trigger: z
        .string()
        .describe("The condition that triggers this lesson (e.g., 'When asked for math')"),
      strategy: z
        .string()
        .describe("The strategy to use (e.g., 'Use the calculator tool instead of mental math')"),
    }),
    execute: async ({ trigger, strategy }: LearnLessonParams) => {
      const lesson = await metaLearning.addLesson({
        trigger,
        strategy,
        confidence: 0.8,
      });
      return { success: true, lessonId: lesson.id };
    },
  } as unknown as ReturnType<typeof tool>),
};
