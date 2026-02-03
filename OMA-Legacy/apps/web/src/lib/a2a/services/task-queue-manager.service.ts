import { db, agents, agentTasks, x402Escrows } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { logger } from '@/lib/logger';
import type { A2ATaskSpec } from '../types';

export interface QueuedTask {
  id: string;
  taskSpec: A2ATaskSpec;
  requesterAgentId: string;
  executorAgentId: string;
  priority: number;
  estimatedDuration: number;
  estimatedCost: number;
  createdAt: string;
  expiresAt: string;
  status: 'pending' | 'queued' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
  metadata?: Record<string, unknown>;
}

export interface TaskExecutionResult {
  taskId: string;
  status: 'completed' | 'failed';
  executorAgentId?: string;
  result?: unknown;
  error?: string;
  actualCost?: number;
  actualDuration?: number;
  completedAt: string;
}

export class A2ATaskQueueManager {
  private taskQueue: Map<string, QueuedTask> = new Map();
  private activeTasks: Map<string, QueuedTask> = new Map();
  private completedTasks: Map<string, TaskExecutionResult> = new Map();
  private readonly MAX_QUEUE_SIZE = 1000;
  private readonly MAX_ACTIVE_TASKS = 50;
  private readonly DEFAULT_TASK_TIMEOUT = 30 * 60 * 1000; // 30 minutes

  /**
   * Add task to queue
   */
  async enqueueTask(
    task: QueuedTask
  ): Promise<{ success: boolean; taskId?: string; error?: string }> {
    try {
      // Check queue capacity
      if (this.taskQueue.size >= this.MAX_QUEUE_SIZE) {
        return {
          success: false,
          error: 'Task queue is at maximum capacity',
        };
      }

      // Validate executor agent
      const [executor] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, parseInt(task.executorAgentId)))
        .limit(1);

      if (!executor || executor.status !== 'active') {
        return {
          success: false,
          error: 'Executor agent is not available',
        };
      }

      // Check agent concurrency limit
      const activeTaskCount = Array.from(this.activeTasks.values()).filter(
        (t) => t.executorAgentId === task.executorAgentId
      ).length;

      const maxConcurrentTasks = this.getMaxConcurrentTasks(executor);
      if (activeTaskCount >= maxConcurrentTasks) {
        return {
          success: false,
          error: 'Executor agent has reached maximum concurrent tasks',
        };
      }

      // Add to queue
      this.taskQueue.set(task.id, task);

      // Create database record
      await db.insert(agentTasks).values({
        hireId: parseInt(task.requesterAgentId),
        goal: task.taskSpec.description,
        budget: task.estimatedCost,
        deadlineMinutes: Math.ceil(task.estimatedDuration / 60000),
        qualityBias: 'balanced',
        settlementMethod: 'x402',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      logger.info('Task enqueued', {
        taskId: task.id,
        requesterAgentId: task.requesterAgentId,
        executorAgentId: task.executorAgentId,
        priority: task.priority,
      });

      // Trigger queue processing
      this.processQueue();

      return { success: true, taskId: task.id };
    } catch (error) {
      logger.error('Failed to enqueue task', { error, task });
      return {
        success: false,
        error: 'Failed to enqueue task',
      };
    }
  }

  /**
   * Process task queue
   */
  private async processQueue(): Promise<void> {
    if (this.activeTasks.size >= this.MAX_ACTIVE_TASKS) {
      return;
    }

    // Get sorted queue (by priority, then by creation time)
    const sortedTasks = Array.from(this.taskQueue.values()).sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority; // Higher priority first
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    // Process tasks until capacity is reached
    for (const task of sortedTasks) {
      if (this.activeTasks.size >= this.MAX_ACTIVE_TASKS) {
        break;
      }

      await this.startTask(task);
    }
  }

  /**
   * Start task execution
   */
  private async startTask(task: QueuedTask): Promise<void> {
    try {
      // Remove from queue
      this.taskQueue.delete(task.id);

      // Add to active tasks
      task.status = 'in_progress';
      this.activeTasks.set(task.id, task);

      // Update database record
      await db
        .update(agentTasks)
        .set({
          status: 'in_progress',
          startedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(agentTasks.id, parseInt(task.id.replace('task_', ''))));

      logger.info('Task started', {
        taskId: task.id,
        executorAgentId: task.executorAgentId,
      });

      // Set timeout for task
      setTimeout(() => {
        this.handleTaskTimeout(task.id);
      }, task.estimatedDuration || this.DEFAULT_TASK_TIMEOUT);
    } catch (error) {
      logger.error('Failed to start task', { error, taskId: task.id });
      await this.failTask(task.id, 'Failed to start task execution');
    }
  }

  /**
   * Complete task with result
   */
  async completeTask(
    taskId: string,
    result: unknown,
    actualCost?: number,
    actualDuration?: number
  ): Promise<boolean> {
    try {
      const task = this.activeTasks.get(taskId);

      if (!task) {
        logger.warn('Task not found in active tasks', { taskId });
        return false;
      }

      const completedAt = new Date().toISOString();

      // Remove from active tasks
      this.activeTasks.delete(task.id);

      // Add to completed tasks
      const taskResult: TaskExecutionResult = {
        taskId,
        status: 'completed',
        executorAgentId: task.executorAgentId,
        result,
        actualCost: actualCost || task.estimatedCost,
        actualDuration: actualDuration || task.estimatedDuration,
        completedAt,
      };
      this.completedTasks.set(taskId, taskResult);

      // Update database record
      await db
        .update(agentTasks)
        .set({
          status: 'completed',
          result: result ? JSON.stringify(result) : null,
          actualCost: Number(actualCost || task.estimatedCost),
          completedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(agentTasks.id, parseInt(taskId.replace('task_', ''))));

      // Update escrow if exists
      if (task.estimatedCost > 0) {
        await this.settleEscrow(taskId, taskResult);
      }

      logger.info('Task completed', {
        taskId,
        executorAgentId: task.executorAgentId,
        actualCost,
        actualDuration,
      });

      // Process next task in queue
      this.processQueue();

      return true;
    } catch (error) {
      logger.error('Failed to complete task', { error, taskId });
      return false;
    }
  }

  /**
   * Fail task with error
   */
  async failTask(taskId: string, error: string): Promise<boolean> {
    try {
      const task = this.activeTasks.get(taskId) || this.taskQueue.get(taskId);

      if (!task) {
        logger.warn('Task not found', { taskId });
        return false;
      }

      const completedAt = new Date().toISOString();

      // Remove from active/queue
      this.activeTasks.delete(taskId);
      this.taskQueue.delete(taskId);

      // Add to completed tasks
      const taskResult: TaskExecutionResult = {
        taskId,
        status: 'failed',
        executorAgentId: task.executorAgentId,
        error,
        completedAt,
      };
      this.completedTasks.set(taskId, taskResult);

      // Update database record
      await db
        .update(agentTasks)
        .set({
          status: 'failed',
          error,
          completedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(agentTasks.id, parseInt(taskId.replace('task_', ''))));

      // Refund escrow if exists
      await this.refundEscrow(taskId, error);

      logger.info('Task failed', {
        taskId,
        error,
      });

      // Process next task in queue
      this.processQueue();

      return true;
    } catch (error) {
      logger.error('Failed to fail task', { error, taskId });
      return false;
    }
  }

  /**
   * Cancel task
   */
  async cancelTask(taskId: string, reason?: string): Promise<boolean> {
    try {
      const task = this.activeTasks.get(taskId) || this.taskQueue.get(taskId);

      if (!task) {
        logger.warn('Task not found for cancellation', { taskId });
        return false;
      }

      // Remove from active/queue
      this.activeTasks.delete(taskId);
      this.taskQueue.delete(taskId);

      // Update database record
      await db
        .update(agentTasks)
        .set({
          status: 'cancelled',
          error: reason || 'Task cancelled by user',
          completedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(agentTasks.id, parseInt(taskId.replace('task_', ''))));

      // Refund escrow if exists
      await this.refundEscrow(taskId, reason || 'Task cancelled');

      logger.info('Task cancelled', {
        taskId,
        reason,
      });

      // Process next task in queue
      this.processQueue();

      return true;
    } catch (error) {
      logger.error('Failed to cancel task', { error, taskId });
      return false;
    }
  }

  /**
   * Get task status
   */
  getTaskStatus(taskId: string): {
    status: string;
    task?: QueuedTask | TaskExecutionResult;
    progress?: number;
  } {
    // Check completed tasks
    const completedTask = this.completedTasks.get(taskId);
    if (completedTask) {
      return {
        status: completedTask.status,
        task: completedTask,
        progress: 100,
      };
    }

    // Check active tasks
    const activeTask = this.activeTasks.get(taskId);
    if (activeTask) {
      return {
        status: activeTask.status,
        task: activeTask,
        progress: 50, // Mock progress for in-progress tasks
      };
    }

    // Check queued tasks
    const queuedTask = this.taskQueue.get(taskId);
    if (queuedTask) {
      return {
        status: queuedTask.status,
        task: queuedTask,
        progress: 0,
      };
    }

    return {
      status: 'not_found',
    };
  }

  /**
   * Get queue statistics
   */
  getQueueStats(): {
    queueSize: number;
    activeTasks: number;
    completedTasks: number;
    averageWaitTime: number;
    averageExecutionTime: number;
  } {
    const queueSize = this.taskQueue.size;
    const activeCount = this.activeTasks.size;
    const completedCount = this.completedTasks.size;

    // Calculate average wait time
    const now = Date.now();
    const waitTimes = Array.from(this.taskQueue.values()).map(
      (t) => now - new Date(t.createdAt).getTime()
    );
    const averageWaitTime =
      waitTimes.length > 0 ? waitTimes.reduce((a, b) => a + b, 0) / waitTimes.length : 0;

    // Calculate average execution time
    const completedTasksList = Array.from(this.completedTasks.values()).filter(
      (t) => t.status === 'completed'
    );
    const executionTimes = completedTasksList.map((t) => t.actualDuration || 0);
    const averageExecutionTime =
      executionTimes.length > 0
        ? executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length
        : 0;

    return {
      queueSize,
      activeTasks: activeCount,
      completedTasks: completedCount,
      averageWaitTime,
      averageExecutionTime,
    };
  }

  /**
   * Handle task timeout
   */
  private async handleTaskTimeout(taskId: string): Promise<void> {
    const task = this.activeTasks.get(taskId);

    if (!task) {
      return;
    }

    logger.warn('Task timeout', {
      taskId,
      executorAgentId: task.executorAgentId,
      estimatedDuration: task.estimatedDuration,
    });

    await this.failTask(taskId, 'Task execution timed out');
  }

  /**
   * Get max concurrent tasks for agent
   */
  private getMaxConcurrentTasks(agent: typeof agents.$inferSelect): number {
    let constraints: Record<string, unknown> | null = null;
    if (typeof agent.executionPolicy === 'string') {
      try {
        const parsed = JSON.parse(agent.executionPolicy);
        if (parsed && typeof parsed === 'object') {
          constraints = parsed as Record<string, unknown>;
        }
      } catch {
        constraints = null;
      }
    } else if (agent.executionPolicy && typeof agent.executionPolicy === 'object') {
      constraints = agent.executionPolicy as Record<string, unknown>;
    }

    const maxConcurrent = constraints?.maxConcurrentTasks;
    return typeof maxConcurrent === 'number' ? maxConcurrent : Number(maxConcurrent || 10);
  }

  /**
   * Settle escrow for completed task
   */
  private async settleEscrow(taskId: string, result: TaskExecutionResult): Promise<void> {
    try {
      const [escrow] = await db
        .select()
        .from(x402Escrows)
        .where(eq(x402Escrows.taskId, parseInt(taskId.replace('task_', ''))))
        .limit(1);

      if (!escrow || escrow.status !== 'escrowed') {
        return;
      }

      await db
        .update(x402Escrows)
        .set({
          status: 'settled',
          settledAmount: Number(result.actualCost || 0),
          updatedAt: new Date(),
        })
        .where(eq(x402Escrows.id, escrow.id));

      logger.info('Escrow settled', {
        escrowId: escrow.id,
        taskId,
        settledAmount: result.actualCost,
      });
    } catch (error) {
      logger.error('Failed to settle escrow', { error, taskId });
    }
  }

  /**
   * Refund escrow for failed/cancelled task
   */
  private async refundEscrow(taskId: string, reason: string): Promise<void> {
    try {
      const [escrow] = await db
        .select()
        .from(x402Escrows)
        .where(eq(x402Escrows.taskId, parseInt(taskId.replace('task_', ''))))
        .limit(1);

      if (!escrow || escrow.status !== 'escrowed') {
        return;
      }

      await db
        .update(x402Escrows)
        .set({
          status: 'refunded',
          refundAmount: escrow.amount,
          failureReason: reason,
          updatedAt: new Date(),
        })
        .where(eq(x402Escrows.id, escrow.id));

      logger.info('Escrow refunded', {
        escrowId: escrow.id,
        taskId,
        refundAmount: escrow.amount,
        reason,
      });
    } catch (error) {
      logger.error('Failed to refund escrow', { error, taskId });
    }
  }

  /**
   * Cleanup old completed tasks
   */
  cleanupOldTasks(maxAge: number = 24 * 60 * 60 * 1000): number {
    const now = Date.now();
    let cleaned = 0;

    for (const [id, task] of this.completedTasks.entries()) {
      const taskAge = now - new Date(task.completedAt).getTime();
      if (taskAge > maxAge) {
        this.completedTasks.delete(id);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      logger.info('Cleaned up old completed tasks', { count: cleaned });
    }

    return cleaned;
  }

  /**
   * Get tasks by agent
   */
  getTasksByAgent(agentId: string): {
    pending: QueuedTask[];
    active: QueuedTask[];
    completed: TaskExecutionResult[];
  } {
    return {
      pending: Array.from(this.taskQueue.values()).filter((t) => t.executorAgentId === agentId),
      active: Array.from(this.activeTasks.values()).filter((t) => t.executorAgentId === agentId),
      completed: Array.from(this.completedTasks.values()).filter(
        (t) => t.executorAgentId === agentId
      ),
    };
  }
}

// Export singleton instance
export const a2aTaskQueueManager = new A2ATaskQueueManager();

// Schedule cleanup of old tasks
if (typeof setInterval !== 'undefined') {
  setInterval(
    () => {
      a2aTaskQueueManager.cleanupOldTasks();
    },
    60 * 60 * 1000
  ); // Every hour
}
