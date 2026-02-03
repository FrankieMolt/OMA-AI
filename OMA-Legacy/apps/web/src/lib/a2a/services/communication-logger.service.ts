import { logger } from '@/lib/logger';
import type { A2ACommunicationLog } from '../types';

export interface CommunicationLogQuery {
  fromAgentId?: string;
  toAgentId?: string;
  method?: string;
  status?: 'success' | 'failure' | 'timeout';
  startTime?: string;
  endTime?: string;
  limit?: number;
  offset?: number;
}

export class A2ACommunicationLogger {
  private logs: Map<string, A2ACommunicationLog> = new Map();
  private agentLogs: Map<string, string[]> = new Map(); // agentId -> logIds
  private readonly MAX_LOGS = 10000;
  private readonly MAX_LOGS_PER_AGENT = 1000;

  /**
   * Log a communication between agents
   */
  async logCommunication(
    log: Omit<A2ACommunicationLog, 'id' | 'timestamp'>
  ): Promise<A2ACommunicationLog> {
    const logId = this.generateLogId();
    const timestamp = new Date().toISOString();

    const fullLog: A2ACommunicationLog = {
      id: logId,
      timestamp,
      ...log,
    };

    // Check log capacity
    if (this.logs.size >= this.MAX_LOGS) {
      this.evictOldestLog();
    }

    // Store log
    this.logs.set(logId, fullLog);

    // Index by agents
    this.indexByAgent(logId, log.fromAgentId);
    if (log.toAgentId) {
      this.indexByAgent(logId, log.toAgentId);
    }

    logger.info('A2A Communication logged', {
      logId,
      fromAgentId: log.fromAgentId,
      toAgentId: log.toAgentId,
      method: log.method,
      status: log.status,
      duration: log.duration,
    });

    return fullLog;
  }

  /**
   * Log incoming request
   */
  async logRequest(
    fromAgentId: string,
    toAgentId: string,
    method: string,
    payload: unknown
  ): Promise<string> {
    const log: Omit<A2ACommunicationLog, 'id' | 'timestamp'> = {
      fromAgentId,
      toAgentId,
      messageType: 'request',
      method,
      payload,
      status: 'success',
      duration: 0,
    };

    const logged = await this.logCommunication(log);
    return logged.id;
  }

  /**
   * Log response
   */
  async logResponse(
    logId: string,
    response: unknown,
    duration: number,
    status: 'success' | 'failure'
  ): Promise<void> {
    const log = this.logs.get(logId);

    if (!log) {
      logger.warn('Log not found for response', { logId });
      return;
    }

    log.response = response;
    log.duration = duration;
    log.status = status;

    logger.info('A2A Response logged', {
      logId,
      status,
      duration,
    });
  }

  /**
   * Log error
   */
  async logError(logId: string, error: string, duration: number): Promise<void> {
    const log = this.logs.get(logId);

    if (!log) {
      logger.warn('Log not found for error', { logId });
      return;
    }

    log.error = error;
    log.duration = duration;
    log.status = 'failure';

    logger.error('A2A Error logged', {
      logId,
      error,
      duration,
    });
  }

  /**
   * Log timeout
   */
  async logTimeout(logId: string, duration: number): Promise<void> {
    const log = this.logs.get(logId);

    if (!log) {
      logger.warn('Log not found for timeout', { logId });
      return;
    }

    log.error = 'Request timed out';
    log.duration = duration;
    log.status = 'timeout';

    logger.warn('A2A Timeout logged', {
      logId,
      duration,
    });
  }

  /**
   * Get log by ID
   */
  getLog(logId: string): A2ACommunicationLog | null {
    return this.logs.get(logId) || null;
  }

  /**
   * Query logs with filters
   */
  queryLogs(query: CommunicationLogQuery): A2ACommunicationLog[] {
    let results = Array.from(this.logs.values());

    // Filter by from agent
    if (query.fromAgentId) {
      const agentLogIds = this.agentLogs.get(query.fromAgentId) || [];
      results = results.filter((log) => agentLogIds.includes(log.id));
    }

    // Filter by to agent
    if (query.toAgentId) {
      const agentLogIds = this.agentLogs.get(query.toAgentId) || [];
      results = results.filter((log) => agentLogIds.includes(log.id));
    }

    // Filter by method
    if (query.method) {
      results = results.filter((log) => log.method === query.method);
    }

    // Filter by status
    if (query.status) {
      results = results.filter((log) => log.status === query.status);
    }

    // Filter by time range
    if (query.startTime) {
      const startTime = new Date(query.startTime).getTime();
      results = results.filter((log) => new Date(log.timestamp).getTime() >= startTime);
    }

    if (query.endTime) {
      const endTime = new Date(query.endTime).getTime();
      results = results.filter((log) => new Date(log.timestamp).getTime() <= endTime);
    }

    // Sort by timestamp (newest first)
    results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Apply pagination
    const offset = query.offset || 0;
    const limit = query.limit || 100;

    return results.slice(offset, offset + limit);
  }

  /**
   * Get logs for a specific agent
   */
  getAgentLogs(agentId: string, limit: number = 100, offset: number = 0): A2ACommunicationLog[] {
    const agentLogIds = this.agentLogs.get(agentId) || [];

    const results = agentLogIds
      .map((id) => this.logs.get(id))
      .filter((log): log is A2ACommunicationLog => log !== undefined);

    // Sort by timestamp (newest first)
    results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return results.slice(offset, offset + limit);
  }

  /**
   * Get statistics for an agent
   */
  getAgentStatistics(agentId: string): {
    totalCommunications: number;
    successRate: number;
    averageDuration: number;
    methodCounts: Record<string, number>;
    statusCounts: Record<string, number>;
    recentCommunications: number;
  } {
    const logs = this.getAgentLogs(agentId, this.MAX_LOGS_PER_AGENT);

    if (logs.length === 0) {
      return {
        totalCommunications: 0,
        successRate: 0,
        averageDuration: 0,
        methodCounts: {},
        statusCounts: {},
        recentCommunications: 0,
      };
    }

    // Calculate statistics
    const successfulLogs = logs.filter((log) => log.status === 'success');
    const successRate = successfulLogs.length / logs.length;

    const totalDuration = logs.reduce((sum, log) => sum + (log.duration || 0), 0);
    const averageDuration = totalDuration / logs.length;

    const methodCounts: Record<string, number> = {};
    logs.forEach((log) => {
      methodCounts[log.method] = (methodCounts[log.method] || 0) + 1;
    });

    const statusCounts: Record<string, number> = {};
    logs.forEach((log) => {
      statusCounts[log.status] = (statusCounts[log.status] || 0) + 1;
    });

    // Count recent communications (last hour)
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const recentCommunications = logs.filter(
      (log) => new Date(log.timestamp).getTime() >= oneHourAgo
    ).length;

    return {
      totalCommunications: logs.length,
      successRate,
      averageDuration,
      methodCounts,
      statusCounts,
      recentCommunications,
    };
  }

  /**
   * Get overall system statistics
   */
  getSystemStatistics(): {
    totalLogs: number;
    totalAgents: number;
    successRate: number;
    averageDuration: number;
    methodCounts: Record<string, number>;
    statusCounts: Record<string, number>;
    activeAgents: number;
  } {
    const logs = Array.from(this.logs.values());

    if (logs.length === 0) {
      return {
        totalLogs: 0,
        totalAgents: 0,
        successRate: 0,
        averageDuration: 0,
        methodCounts: {},
        statusCounts: {},
        activeAgents: 0,
      };
    }

    const successfulLogs = logs.filter((log) => log.status === 'success');
    const successRate = successfulLogs.length / logs.length;

    const totalDuration = logs.reduce((sum, log) => sum + (log.duration || 0), 0);
    const averageDuration = totalDuration / logs.length;

    const methodCounts: Record<string, number> = {};
    logs.forEach((log) => {
      methodCounts[log.method] = (methodCounts[log.method] || 0) + 1;
    });

    const statusCounts: Record<string, number> = {};
    logs.forEach((log) => {
      statusCounts[log.status] = (statusCounts[log.status] || 0) + 1;
    });

    // Count active agents (communicated in last hour)
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const activeAgents = new Set(
      logs
        .filter((log) => new Date(log.timestamp).getTime() >= oneHourAgo)
        .map((log) => [log.fromAgentId, log.toAgentId].filter(Boolean))
        .flat()
    ).size;

    return {
      totalLogs: logs.length,
      totalAgents: this.agentLogs.size,
      successRate,
      averageDuration,
      methodCounts,
      statusCounts,
      activeAgents,
    };
  }

  /**
   * Index log by agent
   */
  private indexByAgent(logId: string, agentId: string): void {
    if (!this.agentLogs.has(agentId)) {
      this.agentLogs.set(agentId, []);
    }

    const agentLogIds = this.agentLogs.get(agentId);
    if (!agentLogIds) {
      return;
    }

    // Check agent log capacity
    if (agentLogIds.length >= this.MAX_LOGS_PER_AGENT) {
      // Remove oldest log for this agent
      const oldestLogId = agentLogIds.shift();
      if (oldestLogId) {
        // Remove from main logs if no other agents reference it
        const log = this.logs.get(oldestLogId);
        if (log) {
          const otherAgentIds = [log.fromAgentId, log.toAgentId].filter((id) => id !== agentId);
          let isReferenced = false;
          for (const otherAgentId of otherAgentIds) {
            if (otherAgentId) {
              const otherAgentLogs = this.agentLogs.get(otherAgentId);
              if (otherAgentLogs?.includes(oldestLogId)) {
                isReferenced = true;
                break;
              }
            }
          }
          if (!isReferenced) {
            this.logs.delete(oldestLogId);
          }
        }
      }
    }

    agentLogIds.push(logId);
  }

  /**
   * Evict oldest log from storage
   */
  private evictOldestLog(): void {
    let oldestLogId: string | null = null;
    let oldestTimestamp = Infinity;

    for (const [id, log] of this.logs.entries()) {
      const logTime = new Date(log.timestamp).getTime();
      if (logTime < oldestTimestamp) {
        oldestTimestamp = logTime;
        oldestLogId = id;
      }
    }

    if (oldestLogId) {
      this.deleteLog(oldestLogId);
    }
  }

  /**
   * Delete log
   */
  private deleteLog(logId: string): void {
    const log = this.logs.get(logId);

    if (!log) {
      return;
    }

    // Remove from agent indexes
    if (log.fromAgentId) {
      const agentLogIds = this.agentLogs.get(log.fromAgentId);
      if (agentLogIds) {
        const index = agentLogIds.indexOf(logId);
        if (index > -1) {
          agentLogIds.splice(index, 1);
        }
        if (agentLogIds.length === 0) {
          this.agentLogs.delete(log.fromAgentId);
        }
      }
    }

    if (log.toAgentId) {
      const agentLogIds = this.agentLogs.get(log.toAgentId);
      if (agentLogIds) {
        const index = agentLogIds.indexOf(logId);
        if (index > -1) {
          agentLogIds.splice(index, 1);
        }
        if (agentLogIds.length === 0) {
          this.agentLogs.delete(log.toAgentId);
        }
      }
    }

    // Remove from main storage
    this.logs.delete(logId);
  }

  /**
   * Cleanup old logs
   */
  cleanupOldLogs(maxAge: number = 24 * 60 * 60 * 1000): number {
    const now = Date.now();
    const toDelete: string[] = [];

    for (const [id, log] of this.logs.entries()) {
      const logAge = now - new Date(log.timestamp).getTime();
      if (logAge > maxAge) {
        toDelete.push(id);
      }
    }

    for (const id of toDelete) {
      this.deleteLog(id);
    }

    if (toDelete.length > 0) {
      logger.info('Cleaned up old communication logs', { count: toDelete.length });
    }

    return toDelete.length;
  }

  /**
   * Generate unique log ID
   */
  private generateLogId(): string {
    return `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Create communication middleware for automatic logging
   */
  createLoggingMiddleware(agentId: string) {
    return {
      beforeRequest: async (
        method: string,
        payload: unknown,
        toAgentId?: string
      ): Promise<string> => {
        return await this.logRequest(agentId, toAgentId || 'unknown', method, payload);
      },

      afterResponse: async (logId: string, response: unknown, duration: number): Promise<void> => {
        await this.logResponse(logId, response, duration, 'success');
      },

      onError: async (logId: string, error: string, duration: number): Promise<void> => {
        await this.logError(logId, error, duration);
      },

      onTimeout: async (logId: string, duration: number): Promise<void> => {
        await this.logTimeout(logId, duration);
      },
    };
  }
}

// Export singleton instance
export const a2aCommunicationLogger = new A2ACommunicationLogger();

// Schedule cleanup of old logs
if (typeof setInterval !== 'undefined') {
  setInterval(
    () => {
      a2aCommunicationLogger.cleanupOldLogs();
    },
    60 * 60 * 1000
  ); // Every hour
}
