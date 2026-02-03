/**
 * MCP Connection Manager
 * Handles connection pooling, retry logic, and connection lifecycle for MCP servers
 */

import { logger } from '@/lib/logger';
import type { MCPConnection, MCPConnectionConfig, MCPTransportType } from './types';

export interface ConnectionPool {
  [serverId: string]: {
    connections: Map<string, MCPConnection>;
    active: number;
    waiting: number;
  };
}

export class MCPConnectionManager {
  private pools: ConnectionPool = {};
  private config: Required<MCPConnectionConfig>;
  private cleanupInterval: NodeJS.Timeout;

  constructor(config: MCPConnectionConfig = {}) {
    const pool = {
      maxSize: 10,
      minSize: 1,
      idleTimeout: 300000,
      acquireTimeout: 30000,
      createTimeout: 10000,
      ...config.pool,
    };
    const retry = {
      maxAttempts: 3,
      initialDelay: 1000,
      maxDelay: 10000,
      backoffFactor: 2,
      ...config.retry,
    };
    const timeout = {
      connect: 5000,
      request: 30000,
      healthCheck: 5000,
      ...config.timeout,
    };

    this.config = { pool, retry, timeout };

    // Start cleanup interval for idle connections
    this.cleanupInterval = setInterval(() => {
      this.cleanupIdleConnections();
    }, 60000); // Check every minute

    logger.info('MCPConnectionManager initialized', {
      poolConfig: this.config.pool,
      retryConfig: this.config.retry,
    });
  }

  /**
   * Acquire a connection from the pool
   */
  async acquireConnection(
    serverId: string,
    endpointUrl: string,
    transportType: MCPTransportType
  ): Promise<MCPConnection> {
    const poolKey = serverId;
    const pool = this.pools[poolKey] || {
      connections: new Map(),
      active: 0,
      waiting: 0,
    };

    // Try to get an existing idle connection
    for (const [id, connection] of pool.connections.entries()) {
      if (!connection.connected && pool.active < this.config.pool.maxSize) {
        connection.connected = true;
        connection.lastUsed = new Date();
        pool.active++;
        this.pools[poolKey] = pool;
        logger.debug(`Acquired existing connection ${id} for server ${serverId}`);
        return connection;
      }
    }

    // Create a new connection if under limit
    if (pool.active < this.config.pool.maxSize) {
      const connection = await this.createConnection(serverId, endpointUrl, transportType);
      pool.connections.set(connection.id, connection);
      pool.active++;
      this.pools[poolKey] = pool;
      logger.info(`Created new connection ${connection.id} for server ${serverId}`);
      return connection;
    }

    // Wait for a connection to become available
    pool.waiting++;
    this.pools[poolKey] = pool;

    logger.debug(`Waiting for connection to server ${serverId}`);

    try {
      return await this.waitForConnection(poolKey);
    } finally {
      if (this.pools[poolKey]) {
        this.pools[poolKey].waiting--;
      }
    }
  }

  /**
   * Release a connection back to the pool
   */
  releaseConnection(connection: MCPConnection): void {
    const poolKey = connection.serverId;
    const pool = this.pools[poolKey];

    if (!pool) {
      logger.warn(`Pool not found for server ${connection.serverId}`);
      return;
    }

    const conn = pool.connections.get(connection.id);
    if (conn) {
      conn.connected = false;
      conn.lastUsed = new Date();
      pool.active--;
      logger.debug(`Released connection ${connection.id} for server ${connection.serverId}`);
    }

    this.pools[poolKey] = pool;
  }

  /**
   * Execute a request with retry logic
   */
  async executeWithRetry<T>(
    serverId: string,
    endpointUrl: string,
    transportType: MCPTransportType,
    executor: (connection: MCPConnection) => Promise<T>
  ): Promise<T> {
    const { maxAttempts, initialDelay, maxDelay, backoffFactor } = this.config.retry;

    let lastError: Error | null = null;
    let delay = initialDelay;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const connection = await this.acquireConnection(serverId, endpointUrl, transportType);

        try {
          const result = await executor(connection);
          return result;
        } finally {
          this.releaseConnection(connection);
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        if (attempt === maxAttempts) {
          break;
        }

        logger.warn(
          `Request failed for server ${serverId} (attempt ${attempt}/${maxAttempts}), retrying in ${delay}ms`,
          { error: lastError.message }
        );

        await this.sleep(delay);
        delay = Math.min(delay * backoffFactor, maxDelay);
      }
    }

    throw lastError;
  }

  /**
   * Test a connection
   */
  async testConnection(connection: MCPConnection): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout.connect);

      const response = await fetch(connection.endpointUrl, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      logger.warn(`Connection test failed for ${connection.id}`, {
        error: error instanceof Error ? error.message : String(error),
      });
      return false;
    }
  }

  /**
   * Close all connections for a server
   */
  async closeServerConnections(serverId: string): Promise<void> {
    const pool = this.pools[serverId];
    if (!pool) {
      return;
    }

    for (const connection of pool.connections.values()) {
      try {
        await this.closeConnection(connection);
      } catch (error) {
        logger.warn(`Failed to close connection ${connection.id}`, {
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    delete this.pools[serverId];
    logger.info(`Closed all connections for server ${serverId}`);
  }

  /**
   * Close a specific connection
   */
  async closeConnection(connection: MCPConnection): Promise<void> {
    const poolKey = connection.serverId;
    const pool = this.pools[poolKey];

    if (!pool) {
      return;
    }

    pool.connections.delete(connection.id);
    if (connection.connected) {
      pool.active--;
    }
    this.pools[poolKey] = pool;

    logger.debug(`Closed connection ${connection.id}`);
  }

  /**
   * Get pool statistics
   */
  getPoolStats(serverId?: string): Record<string, unknown> {
    if (serverId) {
      const pool = this.pools[serverId];
      if (!pool) {
        return { serverId, connections: 0, active: 0, waiting: 0 };
      }

      return {
        serverId,
        connections: pool.connections.size,
        active: pool.active,
        waiting: pool.waiting,
        idle: pool.connections.size - pool.active,
      };
    }

    // Return stats for all pools
    const stats: Record<string, unknown> = {
      totalServers: Object.keys(this.pools).length,
      totalConnections: 0,
      totalActive: 0,
      totalWaiting: 0,
    };

    for (const [, pool] of Object.entries(this.pools)) {
      stats.totalConnections = (stats.totalConnections as number) + pool.connections.size;
      stats.totalActive = (stats.totalActive as number) + pool.active;
      stats.totalWaiting = (stats.totalWaiting as number) + pool.waiting;
    }

    return stats;
  }

  /**
   * Cleanup idle connections
   */
  private cleanupIdleConnections(): void {
    const now = Date.now();
    const idleTimeout = this.config.pool.idleTimeout;

    for (const [serverId, pool] of Object.entries(this.pools)) {
      for (const [id, connection] of pool.connections.entries()) {
        if (!connection.connected) {
          const idleTime = now - connection.lastUsed.getTime();
          if (idleTime > idleTimeout) {
            logger.debug(
              `Cleaning up idle connection ${id} for server ${serverId} (idle: ${idleTime}ms)`
            );
            pool.connections.delete(id);
          }
        }
      }
    }

    logger.debug('Idle connection cleanup completed');
  }

  /**
   * Create a new connection
   */
  private async createConnection(
    serverId: string,
    endpointUrl: string,
    transportType: MCPTransportType
  ): Promise<MCPConnection> {
    const connectionId = `${serverId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.pool.createTimeout);

    try {
      const connection: MCPConnection = {
        id: connectionId,
        serverId,
        endpointUrl,
        transportType,
        connected: true,
        lastUsed: new Date(),
        createdAt: new Date(),
      };

      // Test the connection
      const isValid = await this.testConnection(connection);
      if (!isValid) {
        throw new Error('Connection test failed');
      }

      return connection;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Wait for a connection to become available
   */
  private async waitForConnection(poolKey: string): Promise<MCPConnection> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Connection acquire timeout'));
      }, this.config.pool.acquireTimeout);

      const checkInterval = setInterval(() => {
        const pool = this.pools[poolKey];
        if (!pool) {
          clearInterval(checkInterval);
          clearTimeout(timeout);
          reject(new Error('Pool not found'));
          return;
        }

        for (const connection of pool.connections.values()) {
          if (!connection.connected && pool.active < this.config.pool.maxSize) {
            clearInterval(checkInterval);
            clearTimeout(timeout);
            connection.connected = true;
            connection.lastUsed = new Date();
            pool.active++;
            resolve(connection);
            return;
          }
        }
      }, 100);
    });
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Shutdown the connection manager
   */
  async shutdown(): Promise<void> {
    clearInterval(this.cleanupInterval);

    for (const serverId of Object.keys(this.pools)) {
      await this.closeServerConnections(serverId);
    }

    logger.info('MCPConnectionManager shut down');
  }
}

// Singleton instance
let connectionManagerInstance: MCPConnectionManager | null = null;

export function getConnectionManager(config?: MCPConnectionConfig): MCPConnectionManager {
  if (!connectionManagerInstance) {
    connectionManagerInstance = new MCPConnectionManager(config);
  }
  return connectionManagerInstance;
}

export function resetConnectionManager(): void {
  if (connectionManagerInstance) {
    connectionManagerInstance.shutdown();
    connectionManagerInstance = null;
  }
}
