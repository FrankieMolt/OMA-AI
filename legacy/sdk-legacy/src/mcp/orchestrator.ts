import { MCPClient } from './index';
import type { MCPExecuteResult, MCPServerInfo } from './types';
import { X402Client } from '../x402';

/**
 * Enhanced MCP Orchestration Service
 * Provides intelligent MCP server selection, load balancing, and cost optimization
 */
export interface MCPOrchestratorConfig {
  mcpClient: MCPClient;
  x402Client: X402Client;
  defaultBudget?: number; // SOL
  maxRetries?: number;
  timeoutMs?: number;
}

export interface MCPSelectionCriteria {
  category?: string;
  minRating?: number;
  maxCost?: number;
  requiredCapabilities?: string[];
  preferredPricingType?: 'free' | 'usage' | 'subscription' | 'one-time';
}

export interface MCPExecutionPlan {
  serverId: number;
  serverName: string;
  toolName: string;
  estimatedCost: number;
  estimatedTime: number;
  confidence: number;
}

export interface MCPExecutionResult {
  success: boolean;
  result?: unknown;
  error?: string;
  executionTime: number;
  actualCost?: number;
  serverId: number;
  toolName: string;
  confidence: number;
}

/**
 * Intelligent MCP orchestration with cost optimization and load balancing
 */
export class MCPOrchestrator {
  private config: MCPOrchestratorConfig;
  private executionHistory = new Map<string, number[]>(); // Track execution times per tool
  private serverMetrics = new Map<number, { avgResponseTime: number; successRate: number; lastUsed: number }>();

  constructor(config: MCPOrchestratorConfig) {
    this.config = {
      maxRetries: 3,
      timeoutMs: 30000,
      defaultBudget: 1.0, // 1 SOL default
      ...config,
    };
  }

  /**
   * Discover and rank MCP servers based on criteria
   */
  async discoverOptimalServers(criteria: MCPSelectionCriteria): Promise<MCPExecutionPlan[]> {
    const { servers } = await this.config.mcpClient.discover({
      category: criteria.category,
      minRating: criteria.minRating,
      pricingType: criteria.preferredPricingType,
    });

    const plans: MCPExecutionPlan[] = [];

    for (const server of servers) {
      // Check if server has required capabilities
      if (criteria.requiredCapabilities) {
        const hasAllCapabilities = criteria.requiredCapabilities.every(cap =>
          server.capabilities.includes(cap)
        );
        if (!hasAllCapabilities) continue;
      }

      // Score each tool on the server
      for (const tool of server.tools) {
        const estimatedCost = this.estimateCost(server, tool.name);
        const estimatedTime = this.estimateExecutionTime(server.id, tool.name);
        const confidence = this.calculateConfidence(server, tool.name);

        if (criteria.maxCost && estimatedCost > criteria.maxCost) continue;

        plans.push({
          serverId: server.id,
          serverName: server.name,
          toolName: tool.name,
          estimatedCost,
          estimatedTime,
          confidence,
        });
      }
    }

    // Sort by confidence (weighted score of rating, cost, and speed)
    return plans.sort((a, b) => {
      const scoreA = this.calculateCompositeScore(a);
      const scoreB = this.calculateCompositeScore(b);
      return scoreB - scoreA;
    });
  }

  /**
   * Execute tool with automatic server selection and fallback
   */
  async executeTool(
    toolName: string,
    args: Record<string, unknown>,
    criteria?: MCPSelectionCriteria
  ): Promise<MCPExecutionResult> {
    const startTime = Date.now();

    try {
      // Find optimal servers for this tool
      const plans = criteria 
        ? await this.discoverOptimalServers(criteria)
        : await this.discoverOptimalServers({});

      // Filter plans for the specific tool
      const toolPlans = plans.filter(plan => plan.toolName === toolName);
      
      if (toolPlans.length === 0) {
        return {
          success: false,
          error: `No MCP servers found for tool: ${toolName}`,
          executionTime: Date.now() - startTime,
          serverId: 0,
          toolName,
          confidence: 0,
        };
      }

      // Try servers in order of confidence
      for (const plan of toolPlans) {
        try {
          const result = await this.executeWithRetry(plan.serverId, toolName, args);
          
          // Update metrics
          this.updateServerMetrics(plan.serverId, Date.now() - startTime, true);
          this.updateExecutionHistory(toolName, Date.now() - startTime);
          
          return {
            ...result,
            toolName,
            actualCost: result.cost || plan.estimatedCost,
            serverId: plan.serverId,
            confidence: plan.confidence,
          };
        } catch (error) {
          // Update failure metrics
          this.updateServerMetrics(plan.serverId, Date.now() - startTime, false);
          
          console.warn(`MCP Server ${plan.serverId} failed for ${toolName}:`, error);
          
          // Continue to next server
          continue;
        }
      }

      // All servers failed
      return {
        success: false,
        error: `All MCP servers failed for tool: ${toolName}`,
        executionTime: Date.now() - startTime,
        serverId: 0,
        toolName,
        confidence: 0,
      };
    } catch (error) {
      return {
        success: false,
        error: `Execution failed: ${error instanceof Error ? error.message : String(error)}`,
        executionTime: Date.now() - startTime,
        serverId: 0,
        toolName,
        confidence: 0,
      };
    }
  }

  /**
   * Execute with automatic retry and payment handling
   */
  private async executeWithRetry(
    serverId: number,
    toolName: string,
    args: Record<string, unknown>,
    attempt: number = 1
  ): Promise<MCPExecuteResult> {
    try {
      // Check if payment is needed
      const needsPayment = await this.checkPaymentRequired(serverId, toolName);
      let paymentSignature;

      if (needsPayment) {
        const cost = await this.estimateCostForServer(serverId, toolName);
        const payment = await this.config.x402Client.pay({
          amount: cost,
          recipient: await this.getTreasuryAddress(),
          description: `MCP tool execution: ${toolName}`,
        });
        paymentSignature = this.config.x402Client.createPaymentSignature(payment);
      }

      const result = await this.config.mcpClient.executeTool(serverId, toolName, args, {
        paymentSignature,
        timeout: this.config.timeoutMs,
      });

      return result;
    } catch (error) {
      if (this.config.maxRetries !== undefined && attempt < this.config.maxRetries) {
        // Exponential backoff
        const delay = Math.pow(2, attempt - 1) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return this.executeWithRetry(serverId, toolName, args, attempt + 1);
      }
      
      throw error;
    }
  }

  /**
   * Execute multiple tools in parallel with cost optimization
   */
  async executeBatch(
    executions: Array<{ toolName: string; args: Record<string, unknown>; criteria?: MCPSelectionCriteria }>
  ): Promise<MCPExecutionResult[]> {
    // Check budget constraints
    const totalEstimatedCost = await Promise.all(
      executions.map(async exec => {
        const plans = exec.criteria 
          ? await this.discoverOptimalServers(exec.criteria)
          : await this.discoverOptimalServers({});
        const plan = plans.find(p => p.toolName === exec.toolName);
        return plan?.estimatedCost || 0;
      })
    );

    const totalCost = totalEstimatedCost.reduce((sum, cost) => sum + cost, 0);
    
    if (totalCost > (this.config.defaultBudget || 1.0)) {
      throw new Error(`Total estimated cost (${totalCost} SOL) exceeds budget (${this.config.defaultBudget} SOL)`);
    }

    // Execute in parallel
    const results = await Promise.allSettled(
      executions.map(exec => 
        this.executeTool(exec.toolName, exec.args, exec.criteria)
      )
    );

    return results.map(result => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          success: false,
          error: result.reason,
          executionTime: 0,
          serverId: 0,
          toolName: '',
          confidence: 0,
        };
      }
    });
  }

  /**
   * Get execution analytics and recommendations
   */
  getAnalytics(): {
    totalExecutions: number;
    averageResponseTime: number;
    successRate: number;
    costOptimization: number;
    topServers: Array<{ serverId: number; name: string; usage: number; avgResponseTime: number }>;
  } {
    const totalExecutions = Array.from(this.executionHistory.values())
      .reduce((sum, times) => sum + times.length, 0);

    const allTimes = Array.from(this.executionHistory.values()).flat();
    const averageResponseTime = allTimes.length > 0 
      ? allTimes.reduce((sum, time) => sum + time, 0) / allTimes.length 
      : 0;

    const successCount = Array.from(this.serverMetrics.values())
      .reduce((sum, metric) => sum + (metric.successRate * 100), 0);
    const totalServers = this.serverMetrics.size;
    const successRate = totalServers > 0 ? successCount / totalServers : 0;

    // Top performing servers
    const topServers = Array.from(this.serverMetrics.entries())
      .map(([id, metrics]) => ({
        serverId: id,
        name: `Server ${id}`,
        usage: 0, // Would need to track this separately
        avgResponseTime: metrics.avgResponseTime,
      }))
      .sort((a, b) => a.avgResponseTime - b.avgResponseTime)
      .slice(0, 5);

    return {
      totalExecutions,
      averageResponseTime,
      successRate,
      costOptimization: 0.85, // Placeholder - would be calculated from actual vs estimated costs
      topServers,
    };
  }

  // Private helper methods

  private estimateCost(server: MCPServerInfo, toolName: string): number {
    // Base cost estimation logic
    const baseCost = server.pricingType === 'free' ? 0 : 0.01; // 0.01 SOL base
    const complexityMultiplier = this.getToolComplexity(toolName);
    return baseCost * complexityMultiplier;
  }

  private estimateExecutionTime(_serverId: number, _toolName: string): number {
    const history = this.executionHistory.get(_toolName) || [];
    return history.length > 0 
      ? history.reduce((sum, time) => sum + time, 0) / history.length 
      : 1000; // 1 second default
  }

  private calculateConfidence(server: MCPServerInfo, _toolName: string): number {
    const ratingScore = server.rating / 5; // Normalize to 0-1
    const speedScore = this.serverMetrics.get(server.id)?.successRate || 0.8;
    const costScore = server.pricingType === 'free' ? 1 : Math.max(0.1, 1 - server.price / 0.1);
    
    return (ratingScore * 0.4) + (speedScore * 0.4) + (costScore * 0.2);
  }

  private calculateCompositeScore(plan: MCPExecutionPlan): number {
    return plan.confidence * 100 - (plan.estimatedCost * 10) - (plan.estimatedTime / 100);
  }

  private getToolComplexity(toolName: string): number {
    // Simple complexity estimation
    const complexTools = ['analyze', 'process', 'transform', 'generate'];
    const isComplex = complexTools.some(complex => 
      toolName.toLowerCase().includes(complex)
    );
    return isComplex ? 2 : 1;
  }

  private async checkPaymentRequired(serverId: number, _toolName: string): Promise<boolean> {
    // Simple logic - in production would check server's pricing model
    const server = await this.config.mcpClient.getServer(serverId);
    return server?.pricingType !== 'free';
  }

  private async estimateCostForServer(serverId: number, toolName: string): Promise<number> {
    const server = await this.config.mcpClient.getServer(serverId);
    if (!server) return 0;
    return this.estimateCost(server, toolName);
  }

  private async getTreasuryAddress(): Promise<string> {
    // In production, this would be from config or environment variable
    return '7xgS3vD9M4krX01o98p2974261687352316498111111';
  }

  private updateServerMetrics(serverId: number, responseTime: number, success: boolean): void {
    const current = this.serverMetrics.get(serverId) || { avgResponseTime: 0, successRate: 0, lastUsed: Date.now() };
    
    // Update rolling averages
    const alpha = 0.1; // Smoothing factor
    current.avgResponseTime = (alpha * responseTime) + ((1 - alpha) * current.avgResponseTime);
    current.successRate = (alpha * (success ? 1 : 0)) + ((1 - alpha) * current.successRate);
    current.lastUsed = Date.now();
    
    this.serverMetrics.set(serverId, current);
  }

  private updateExecutionHistory(toolName: string, responseTime: number): void {
    const history = this.executionHistory.get(toolName) || [];
    history.push(responseTime);
    
    // Keep only last 50 executions per tool
    if (history.length > 50) {
      history.splice(0, history.length - 50);
    }
    
    this.executionHistory.set(toolName, history);
  }
}
