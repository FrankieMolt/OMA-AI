import { mcpRegistryService } from './mcp-registry.service';
import { logger } from '@/lib/logger';

export interface HealthCheckResult {
  serverId: number;
  serverName: string;
  status: 'healthy' | 'unhealthy' | 'offline';
  responseTime?: number;
  lastChecked: string;
  error?: string;
  details?: Record<string, unknown>;
}

export class MCPHealthCheckService {
  private checkInterval: NodeJS.Timeout | null = null;
  private readonly CHECK_INTERVAL = 60000;

  async checkServer(serverId: number): Promise<HealthCheckResult> {
    const startTime = Date.now();

    try {
      const server = await mcpRegistryService.getServerById(serverId);
      if (!server) {
        return {
          serverId,
          serverName: 'Unknown',
          status: 'offline',
          lastChecked: new Date().toISOString(),
          error: 'Server not found',
        };
      }

      const healthCheckUrl = server.healthCheckUrl || server.endpointUrl;

      const response = await fetch(healthCheckUrl, {
        method: 'GET',
        headers: {
          'X-Health-Check': 'true',
          'User-Agent': 'OMA-Health-Check/1.0',
        },
        signal: AbortSignal.timeout(10000),
      });

      const responseTime = Date.now() - startTime;

      if (response.ok) {
        const healthData = await this.parseHealthResponse(response);

        await mcpRegistryService.updateHealthStatus(
          serverId,
          healthData.status === 'healthy' ? 'healthy' : 'unhealthy'
        );

        return {
          serverId,
          serverName: server.name,
          status: healthData.status,
          responseTime,
          lastChecked: new Date().toISOString(),
          details: healthData.details,
        };
      } else {
        await mcpRegistryService.updateHealthStatus(serverId, 'unhealthy');

        return {
          serverId,
          serverName: server.name,
          status: 'unhealthy',
          responseTime,
          lastChecked: new Date().toISOString(),
          error: `HTTP ${response.status}: ${response.statusText}`,
        };
      }
    } catch (error) {
      await mcpRegistryService.updateHealthStatus(serverId, 'offline');

      return {
        serverId,
        serverName: 'Unknown',
        status: 'offline',
        lastChecked: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async parseHealthResponse(
    response: Response
  ): Promise<{ status: 'healthy' | 'unhealthy'; details?: Record<string, unknown> }> {
    try {
      const contentType = response.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        const data = await response.json();

        if (data.status === 'ok' || data.status === 'healthy' || data.healthy === true) {
          return { status: 'healthy', details: data };
        }

        return { status: 'unhealthy', details: data };
      }

      if (response.ok) {
        return { status: 'healthy' };
      }

      return { status: 'unhealthy' };
    } catch {  
      return { status: 'unhealthy' };
    }
  }

  async checkAllServers(): Promise<HealthCheckResult[]> {
    try {
      const { servers } = await mcpRegistryService.listServers({ limit: 1000 });

      const healthChecks = await Promise.allSettled(
        servers.map((server) => this.checkServer(server.id))
      );

      const results: HealthCheckResult[] = [];

      healthChecks.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          results.push({
            serverId: servers[index].id,
            serverName: servers[index].name,
            status: 'offline',
            lastChecked: new Date().toISOString(),
            error: result.reason instanceof Error ? result.reason.message : 'Unknown error',
          });
        }
      });

      return results;
    } catch (error) {
      logger.error('MCP Health Check: Failed to check all servers', { error });
      throw new Error('Failed to check all MCP servers');
    }
  }

  async startPeriodicChecks(): Promise<void> {
    if (this.checkInterval) {
      logger.warn('MCP Health Check: Periodic checks already running');
      return;
    }

    logger.info('MCP Health Check: Starting periodic checks');

    await this.checkAllServers();

    this.checkInterval = setInterval(async () => {
      try {
        await this.checkAllServers();
      } catch (error) {
        logger.error('MCP Health Check: Periodic check failed', { error });
      }
    }, this.CHECK_INTERVAL);
  }

  stopPeriodicChecks(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
      logger.info('MCP Health Check: Stopped periodic checks');
    }
  }

  async getHealthyServers(): Promise<number[]> {
    try {
      const { servers } = await mcpRegistryService.listServers({
        healthStatus: 'healthy',
        limit: 1000,
      });

      return servers.map((server) => server.id);
    } catch (error) {
      logger.error('MCP Health Check: Failed to get healthy servers', { error });
      return [];
    }
  }

  async getServerHealthStats(): Promise<{
    total: number;
    healthy: number;
    unhealthy: number;
    offline: number;
    lastChecked: string;
  }> {
    try {
      const { servers } = await mcpRegistryService.listServers({ limit: 1000 });

      const stats = {
        total: servers.length,
        healthy: servers.filter((s) => s.healthStatus === 'healthy').length,
        unhealthy: servers.filter((s) => s.healthStatus === 'unhealthy').length,
        offline: servers.filter((s) => s.healthStatus === 'offline').length,
        lastChecked: new Date().toISOString(),
      };

      return stats;
    } catch (error) {
      logger.error('MCP Health Check: Failed to get health stats', { error });
      throw new Error('Failed to get server health statistics');
    }
  }
}

export const mcpHealthCheckService = new MCPHealthCheckService();
