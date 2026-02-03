import OpenAI from 'openai';
import { logger } from '@/lib/logger';

export interface OpenRouterModel {
  id: string;
  name: string;
  description: string;
  pricing: {
    input: number;
    output: number;
  };
  contextLength: number;
  capabilities: string[];
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GenerateOptions {
  model?: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface GenerateResult {
  id: string;
  model: string;
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

class OpenRouterClient {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      baseURL: process.env.NEXT_PUBLIC_OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY || '',
    });
  }

  async generate(options: GenerateOptions): Promise<GenerateResult> {
    const { model = 'openai/gpt-4-turbo', messages, temperature = 0.7, maxTokens = 1000 } = options;

    try {
      const completion = await this.client.chat.completions.create({
        model,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        temperature,
        max_tokens: maxTokens,
        stream: false,
      });

      const choice = completion.choices[0];
      if (!choice?.message?.content) {
        throw new Error('No content in response');
      }

      return {
        id: completion.id,
        model: completion.model,
        content: choice.message.content,
        usage: {
          promptTokens: completion.usage?.prompt_tokens || 0,
          completionTokens: completion.usage?.completion_tokens || 0,
          totalTokens: completion.usage?.total_tokens || 0,
        },
      };
    } catch (error) {
      logger.error('OpenRouter generation error', { error });
      throw error;
    }
  }

  async generateStream(options: GenerateOptions): Promise<ReadableStream> {
    const { model = 'openai/gpt-4-turbo', messages, temperature = 0.7, maxTokens = 1000 } = options;

    try {
      const stream = await this.client.chat.completions.create({
        model,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        temperature,
        max_tokens: maxTokens,
        stream: true,
      });

      return new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const content = chunk.choices[0]?.delta?.content;
              if (content) {
                controller.enqueue(new TextEncoder().encode(content));
              }
            }
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
      });
    } catch (error) {
      logger.error('OpenRouter stream error', { error });
      throw error;
    }
  }

  async getModels(): Promise<OpenRouterModel[]> {
    try {
      const response = await this.client.models.list();

      return response.data.map((model) => ({
        id: model.id,
        name: model.id.split('/').pop() || model.id,
        description: model.id,
        pricing: {
          input: 0,
          output: 0,
        },
        contextLength: 0,
        capabilities: ['chat'],
      }));
    } catch (error) {
      logger.error('OpenRouter models error', { error });
      return [];
    }
  }
}

export const openRouterClient = new OpenRouterClient();
