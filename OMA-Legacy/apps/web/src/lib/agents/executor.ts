import { logger } from '@/lib/logger';
import { acontext, type Message } from '@/lib/agi/acontext';
import { memvid } from '@/lib/memory/memvid';
import { metaSPO } from '@/lib/agi/metaspo';

export interface X402PaymentVerification {
  isValid: boolean;
  paymentId?: string;
  error?: string;
}

export interface AgentExecutionRequest {
  listingId: string;
  endpoint: string;
  params: Record<string, unknown>;
  paymentId?: string;
}

export interface AgentExecutionResult {
  success: boolean;
  result?: unknown;
  error?: string;
  paymentVerified?: boolean;
  executionTime: number;
  timestamp: string;
}

export interface AgentExecutionEvent {
  type: 'started' | 'progress' | 'completed' | 'failed';
  data: unknown;
  timestamp: string;
}

class AgentExecutor {
  private activeExecutions = new Map<string, AbortController>();

  async execute(request: AgentExecutionRequest): Promise<AgentExecutionResult> {
    const startTime = Date.now();
    const executionId = crypto.randomUUID();

    logger.info('Starting agent execution', {
      executionId,
      listingId: request.listingId,
      endpoint: request.endpoint,
    });

    try {
      // 0. MetaSPO: Optimize system prompt for session
      const sessionContext = request.params.context as string || '';
      const modePrompt = metaSPO.optimizeForSession(sessionContext || (request.params.prompt as string) || '');
      
      // 1. AContext: Compress/Optimize the context if available
      let params = request.params;
      if (params.messages && Array.isArray(params.messages)) {
        const optimizedMessages = acontext.compressContext(params.messages as Message[]);
        params = { ...params, messages: optimizedMessages };
        logger.info('Context compressed', { 
          original: (request.params.messages as Message[]).length, 
          optimized: optimizedMessages.length 
        });
      }

      // Inject MetaSPO mode into params if it's not already there
      if (modePrompt) {
        params = {
          ...params,
          system_injection: (params.system_injection || '') + `\n${modePrompt}\n`
        };
      }

      // 2. MemVid: Retrieve relevant memory stream (Time Travel / RAG)
      // Check if prompt asks for "remember" or "past"
      const prompt = (params.prompt as string) || '';
      if (prompt && (prompt.includes('remember') || prompt.includes('what happened'))) {
        const memories = await memvid.queryStream(prompt, 3);
        const contextString = memories.map(m => `[Memory ${new Date(m.timestamp).toISOString()}]: ${m.content}`).join('\n');
        
        // Inject into system prompt or user message
        params = { 
          ...params, 
          system_injection: `Relevant Memories:\n${contextString}\n` 
        };
        logger.info('MemVid memory injected', { count: memories.length });
      }

      if (request.paymentId) {
        const verification = await this.verifyPayment(request.paymentId);
        if (!verification.isValid) {
          return {
            success: false,
            error: 'Payment verification failed',
            paymentVerified: false,
            executionTime: Date.now() - startTime,
            timestamp: new Date().toISOString(),
          };
        }
      }

      const controller = new AbortController();
      this.activeExecutions.set(executionId, controller);

      const response = await fetch(request.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(request.paymentId ? { 'PAYMENT-SIGNATURE': request.paymentId } : {}),
        },
        body: JSON.stringify({
          listingId: request.listingId,
          params: params, // Use optimized params
          executionId,
        }),
        signal: controller.signal,
      });

      this.activeExecutions.delete(executionId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Execution failed: ${response.status} ${errorText}`);
      }

      const result = await response.json();

      // 3. Post-Execution: Record thought trace to MemVid
      if (result.result) {
        const content = typeof result.result === 'string' ? result.result : JSON.stringify(result.result);
        await memvid.addFrame(content, 'interaction', 0.5, ['agent-execution', request.listingId]);
        
        // 4. AContext: Distill Skill if successful
        if (params.messages) {
           const newHistory = [...(params.messages as Message[]), { role: 'assistant', content } as Message];
           const skill = acontext.distillSkill(newHistory);
           if (skill) {
             logger.info('Skill distilled from execution', { skill });
             // In real app, save skill to DB
           }
        }

        // 5. MetaSPO: Outer Loop (Evolve System Prompt based on feedback)
        // In a real app, we'd collect user feedback. Here we simulate it for successful runs.
        await metaSPO.evolveSystemPrompt([{ status: 'success', listingId: request.listingId }]);
      }

      logger.info('Agent execution completed', {
        executionId,
        success: true,
        executionTime: Date.now() - startTime,
      });

      return {
        success: true,
        result,
        paymentVerified: !!request.paymentId,
        executionTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.activeExecutions.delete(executionId);

      logger.error('Agent execution failed', {
        executionId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async executeStream(
    request: AgentExecutionRequest
  ): Promise<ReadableStream<AgentExecutionEvent>> {
    const executionId = crypto.randomUUID();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const executor = this;

    logger.info('Starting agent stream execution', {
      executionId,
      listingId: request.listingId,
      endpoint: request.endpoint,
    });

    return new ReadableStream<AgentExecutionEvent>({
      async start(controller) {
        try {
          controller.enqueue({
            type: 'started',
            data: { executionId, listingId: request.listingId },
            timestamp: new Date().toISOString(),
          });

          if (request.paymentId) {
            const verification = await executor.verifyPayment(request.paymentId);
            if (!verification.isValid) {
              controller.enqueue({
                type: 'failed',
                data: { error: 'Payment verification failed' },
                timestamp: new Date().toISOString(),
              });
              controller.close();
              return;
            }
          }

          const response = await fetch(request.endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(request.paymentId ? { 'PAYMENT-SIGNATURE': request.paymentId } : {}),
            },
            body: JSON.stringify({
              listingId: request.listingId,
              params: request.params,
              executionId,
              stream: true,
            }),
          });

          if (!response.ok) {
            throw new Error(`Execution failed: ${response.status}`);
          }

          const reader = response.body?.getReader();
          if (!reader) {
            throw new Error('No response body');
          }

          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6));
                  controller.enqueue({
                    type: 'progress',
                    data,
                    timestamp: new Date().toISOString(),
                  });
                } catch {
                  logger.warn('Failed to parse SSE data', { line });
                }
              }
            }
          }

          controller.enqueue({
            type: 'completed',
            data: { executionId },
            timestamp: new Date().toISOString(),
          });

          controller.close();
        } catch (error) {
          controller.enqueue({
            type: 'failed',
            data: { error: error instanceof Error ? error.message : 'Unknown error' },
            timestamp: new Date().toISOString(),
          });
          controller.close();
        }
      },
    });
  }

  async verifyPayment(paymentId: string): Promise<X402PaymentVerification> {
    if (!paymentId) {
      return { isValid: false, error: 'Payment ID missing' };
    }

    // In production, verify that the transaction signature
    // actually exists and happened on-chain at the Agent API endpoint via x402-middleware.
    // Since paymentId is usually the X402 signature header, we could double check it here.
    return { isValid: true, paymentId };
  }

  cancelExecution(executionId: string): boolean {
    const controller = this.activeExecutions.get(executionId);
    if (controller) {
      controller.abort();
      this.activeExecutions.delete(executionId);
      logger.info('Agent execution cancelled', { executionId });
      return true;
    }
    return false;
  }
}

export const agentExecutor = new AgentExecutor();
