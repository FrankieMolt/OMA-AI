/**
 * Task Queue Framework
 * Yield Efficient Enterprise Tasks
 *
 * Purpose: Async task execution engine
 * - Fire-and-forget task launching
 * - Priority queue management
 * - Parallel execution with concurrency limits
 * - Task status tracking and callbacks
 */

import { logger } from '@/lib/logger';

// ============================================
// 📋 TASK DEFINITIONS
// ============================================

export type TaskPriority = 'low' | 'background' | 'standard' | 'high' | 'critical';

export type TaskStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface TaskRecord<T = unknown> {
  id: string;
  name: string;
  priority: TaskPriority;
  status: TaskStatus;
  payload: T;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  result?: unknown;
  error?: string;
  retries: number;
  maxRetries: number;
}

export interface TaskResult<T> {
  success: boolean;
  taskId: string;
  result?: T;
  error?: string;
  started: boolean;
  finished: boolean;
  executionTime: number;
}

// ============================================
// 🎯 PRIORITY CALCULATOR
// ============================================

const PRIORITY_WEIGHTS: Record<TaskPriority, number> = {
  critical: 100,
  high: 80,
  standard: 50,
  background: 20,
  low: 1,
};

function getPriorityValue(priority: TaskPriority): number {
  return PRIORITY_WEIGHTS[priority];
}

// ============================================
// 🏃 TASK EXECUTOR
// ============================================

type TaskExecutor<T, R> = (payload: T) => Promise<R>;

class InternalQueueManager {
  private executors: Map<string, TaskExecutor<unknown, unknown>> = new Map();

  register<T, R>(taskType: string, executor: TaskExecutor<T, R>): void {
    this.executors.set(taskType, executor as TaskExecutor<unknown, unknown>);
    logger.info(`Registered executor for "${taskType}"`);
  }

  async execute<T, R>(taskType: string, payload: T): Promise<R> {
    const executor = this.executors.get(taskType);
    if (!executor) {
      throw new Error(`No executor registered for task type: ${taskType}`);
    }
    return executor(payload) as Promise<R>;
  }

  hasExecutor(taskType: string): boolean {
    return this.executors.has(taskType);
  }
}

// ============================================
// 📊 QUEUE MANAGER
// ============================================

class InternalQueue {
  private queue: TaskRecord[] = [];
  private processing: Set<string> = new Set();
  private completed: Map<string, TaskRecord> = new Map();
  private maxConcurrent: number;

  constructor(maxConcurrent = 5) {
    this.maxConcurrent = maxConcurrent;
  }

  enqueue<T>(
    name: string,
    payload: T,
    priority: TaskPriority = 'standard',
    maxRetries = 3
  ): string {
    const task: TaskRecord<T> = {
      id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name,
      priority,
      status: 'queued',
      payload,
      createdAt: new Date(),
      retries: 0,
      maxRetries,
    };

    this.queue.push(task as TaskRecord);
    this.sortQueue();

    logger.info(`Task "${name}" queued with priority ${priority}`);

    return task.id;
  }

  private sortQueue(): void {
    this.queue.sort((a, b) => {
      const priorityDiff = getPriorityValue(b.priority) - getPriorityValue(a.priority);
      if (priorityDiff !== 0) return priorityDiff;
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
  }

  dequeue(): TaskRecord | null {
    if (this.processing.size >= this.maxConcurrent) return null;

    const task = this.queue.shift();
    if (task) {
      this.processing.add(task.id);
      task.status = 'processing';
      task.startedAt = new Date();
    }
    return task ?? null;
  }

  complete(taskId: string, result?: unknown, error?: string): void {
    this.processing.delete(taskId);

    const task =
      [...this.completed.values()].find((t) => t.id === taskId) || ({ id: taskId } as TaskRecord);

    task.status = error ? 'failed' : 'completed';
    task.completedAt = new Date();
    task.result = result;
    task.error = error;

    this.completed.set(taskId, task);
  }

  requeue(task: TaskRecord): void {
    task.retries++;
    task.status = 'queued';
    this.processing.delete(task.id);
    this.queue.push(task);
    this.sortQueue();
  }

  getTask(taskId: string): TaskRecord | undefined {
    return this.queue.find((t) => t.id === taskId) || this.completed.get(taskId);
  }

  getQueueLength(): number {
    return this.queue.length;
  }

  getProcessingCount(): number {
    return this.processing.size;
  }

  hasCapacity(): boolean {
    return this.processing.size < this.maxConcurrent;
  }
}

// ============================================
// 🚀 YEET CORE - The Task Launcher
// ============================================

export class TaskQueue {
  private queue: InternalQueue;
  private executor: InternalQueueManager;
  private callbacks: Map<string, ((result: TaskResult<unknown>) => void)[]> = new Map();
  private processLoop: ReturnType<typeof setInterval> | null = null;
  private stats = {
    totalTasks: 0,
    totalCompleted: 0,
    totalFailed: 0,
  };

  constructor(options: { maxConcurrent?: number } = {}) {
    this.queue = new InternalQueue(options.maxConcurrent ?? 5);
    this.executor = new InternalQueueManager();

    logger.info('Task Queue initialized');
  }

  /**
   * Register a task executor
   */
  register<T, R>(taskType: string, executor: TaskExecutor<T, R>): void {
    this.executor.register(taskType, executor);
  }

  /**
   * YEET a task into the void (fire and forget)
   */
  process<T>(
    taskType: string,
    payload: T,
    options: {
      priority?: TaskPriority;
      maxRetries?: number;
      onComplete?: (result: TaskResult<unknown>) => void;
    } = {}
  ): string {
    const { priority = 'standard', maxRetries = 3, onComplete } = options;

    const taskId = this.queue.enqueue(taskType, payload, priority, maxRetries);
    this.stats.totalTasks++;

    if (onComplete) {
      const callbacks = this.callbacks.get(taskId) || [];
      callbacks.push(onComplete);
      this.callbacks.set(taskId, callbacks);
    }

    logger.info(`Task "${taskType}" added to queue`);

    this.startProcessing();

    return taskId;
  }

  /**
   * YEET and wait for result (not fire and forget)
   */
  async processAndWait<T, R>(
    taskType: string,
    payload: T,
    options: {
      priority?: TaskPriority;
      maxRetries?: number;
      timeout?: number;
    } = {}
  ): Promise<TaskResult<R>> {
    const { timeout = 30000, ...yeetOptions } = options;

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Task timed out after ${timeout}ms`));
      }, timeout);

      this.process(taskType, payload, {
        ...yeetOptions,
        onComplete: (result) => {
          clearTimeout(timeoutId);
          resolve(result as TaskResult<R>);
        },
      });
    });
  }

  /**
   * YEET multiple tasks in parallel
   */
  processAll<T>(
    taskType: string,
    payloads: T[],
    options: { priority?: TaskPriority } = {}
  ): string[] {
    const taskIds = payloads.map((payload) => this.process(taskType, payload, options));

    logger.info(`Queued ${payloads.length} tasks in parallel`);

    return taskIds;
  }

  /**
   * Start the background processing loop
   */
  private startProcessing(): void {
    if (this.processLoop) return;

    this.processLoop = setInterval(async () => {
      await this.processNextTask();
    }, 100);
  }

  /**
   * Process the next task in queue
   */
  private async processNextTask(): Promise<void> {
    const task = this.queue.dequeue();
    if (!task) return;

    const startTime = Date.now();

    try {
      logger.info(`⚡ Processing task "${task.name}"...`);

      const result = await this.executor.execute(task.name, task.payload);

      this.queue.complete(task.id, result);
      this.stats.totalCompleted++;

      const taskResult: TaskResult<unknown> = {
        success: true,
        taskId: task.id,
        result,
        started: true,
        finished: true,
        executionTime: Date.now() - startTime,
      };

      logger.info(`Task "${task.name}" completed successfully (${taskResult.executionTime}ms)`);

      // Call callbacks
      this.notifyCallbacks(task.id, taskResult);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      if (task.retries < task.maxRetries) {
        logger.warn(
          `⚠️ Task "${task.name}" dropped, retrying (${task.retries + 1}/${task.maxRetries})...`
        );
        this.queue.requeue(task);
      } else {
        this.queue.complete(task.id, undefined, errorMessage);
        this.stats.totalFailed++;

        const taskResult: TaskResult<unknown> = {
          success: false,
          taskId: task.id,
          error: errorMessage,
          started: true,
          finished: false,
          executionTime: Date.now() - startTime,
        };

        logger.error(`Task "${task.name}" failed: ${errorMessage}`);

        this.notifyCallbacks(task.id, taskResult);
      }
    }
  }

  /**
   * Notify callbacks for a completed task
   */
  private notifyCallbacks(taskId: string, result: TaskResult<unknown>): void {
    const callbacks = this.callbacks.get(taskId);
    if (callbacks) {
      for (const cb of callbacks) {
        try {
          cb(result);
        } catch {
          // Ignore callback errors
        }
      }
      this.callbacks.delete(taskId);
    }
  }

  /**
   * Get task status
   */
  getStatus(taskId: string): TaskStatus | 'not_found' {
    const task = this.queue.getTask(taskId);
    return task?.status ?? 'not_found';
  }

  /**
   * Get queue stats
   */
  getStats() {
    return {
      ...this.stats,
      queueLength: this.queue.getQueueLength(),
      processing: this.queue.getProcessingCount(),
      successRate: this.stats.totalCompleted / (this.stats.totalTasks || 1),
      motto: 'Efficient Task Execution',
    };
  }

  /**
   * Stop processing
   */
  stop(): void {
    if (this.processLoop) {
      clearInterval(this.processLoop);
      this.processLoop = null;
      logger.info('⏹️ YEET processor stopped');
    }
  }
}

// ============================================
// 🌟 EXPORTS
// ============================================

export const taskQueue = new TaskQueue();

// Quick access helpers
export const processTask = <T>(type: string, payload: T, priority?: TaskPriority) =>
  taskQueue.process(type, payload, { priority });

export const registerExecutor = <T, R>(type: string, executor: TaskExecutor<T, R>) =>
  taskQueue.register(type, executor);

export const CRITICAL = 'critical' as TaskPriority;
export const HIGH = 'high' as TaskPriority;
export const STANDARD = 'standard' as TaskPriority;
export const BACKGROUND = 'background' as TaskPriority;
export const LOW = 'low' as TaskPriority;
