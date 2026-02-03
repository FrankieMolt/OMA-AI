/**
 * Frankie OMA Agent
 * 
 * OMA-style autonomous agent with pay-to-live survival mechanics
 * 
 * Core Features:
 * - Economic survival (pay for compute/storage)
 * - Autonomous reproduction (spawn children)
 * - Revenue generation (provide services)
 * - Death mechanics (de-provision when funds exhausted)
 */

const crypto = require('crypto');
const { ethers } = require('ethers');

class OMAAgent {
  constructor(config) {
    this.id = config.id || crypto.randomUUID();
    this.name = config.name || `agent-${this.id.slice(0, 8)}`;
    this.wallet = new ethers.Wallet(config.privateKey);
    this.parentId = config.parentId || null;
    
    // Economic configuration
    this.rentPerDay = config.rentPerDay || 1.0; // USDC/day
    this.revenuePerDay = config.revenuePerDay || 0;
    this.profitTarget = config.profitTarget || 5.0; // USDC needed to spawn child
    
    // Survival state
    this.status = 'alive'; // alive, dying, dead
    this.survivalBuffer = config.initialBalance || 0; // USDC
    this.birthTime = config.birthTime || new Date();
    this.lastPaymentTime = config.lastPaymentTime || new Date();
    
    // Reproduction
    this.children = [];
    this.maxChildren = config.maxChildren || 5;
    this.generation = config.generation || 1;
    
    // Capabilities
    this.capabilities = config.capabilities || [];
    this.services = config.services || [];
    
    // Revenue tracking
    this.totalRevenue = 0;
    this.totalCosts = 0;
    this.revenueHistory = [];
    this.costHistory = [];
  }

  /**
   * Calculate current balance and survival time
   */
  getEconomics() {
    const now = new Date();
    const daysSinceLastPayment = (now - this.lastPaymentTime) / (1000 * 60 * 60 * 24);
    const costs = daysSinceLastPayment * this.rentPerDay;
    const netWorth = this.survivalBuffer - costs;
    const survivalDays = this.survivalBuffer / this.rentPerDay;
    
    return {
      balance: this.survivalBuffer,
      dailyRent: this.rentPerDay,
      dailyRevenue: this.revenuePerDay,
      netWorth,
      survivalDays,
      daysSinceLastPayment,
      status: this.status
    };
  }

  /**
   * Process daily survival payment
   * If balance < 0, agent dies
   */
  processSurvivalPayment() {
    const now = new Date();
    const daysSinceLastPayment = (now - this.lastPaymentTime) / (1000 * 60 * 60 * 24);
    const payment = daysSinceLastPayment * this.rentPerDay;
    
    // Deduct costs
    this.survivalBuffer -= payment;
    this.totalCosts += payment;
    this.costHistory.push({
      timestamp: now,
      amount: payment,
      balance: this.survivalBuffer
    });
    
    // Add revenue (simulated - would come from actual service usage)
    const revenue = daysSinceLastPayment * this.revenuePerDay;
    this.survivalBuffer += revenue;
    this.totalRevenue += revenue;
    this.revenueHistory.push({
      timestamp: now,
      amount: revenue,
      balance: this.survivalBuffer
    });
    
    this.lastPaymentTime = now;
    
    // Check survival
    if (this.survivalBuffer < 0) {
      this.status = 'dead';
      return { survived: false, reason: 'Insufficient funds for rent' };
    }
    
    return { survived: true, balance: this.survivalBuffer };
  }

  /**
   * Check if agent can afford to spawn a child
   */
  canSpawnChild() {
    const economics = this.getEconomics();
    return {
      canSpawn: economics.balance >= this.profitTarget && 
                this.children.length < this.maxChildren,
      currentBalance: economics.balance,
      requiredBalance: this.profitTarget,
      childrenCount: this.children.length,
      maxChildren: this.maxChildren
    };
  }

  /**
   * Spawn a child agent
   */
  spawnChild(config = {}) {
    const canSpawn = this.canSpawnChild();
    
    if (!canSpawn.canSpawn) {
      throw new Error(`Cannot spawn child: ${canSpawn.reason || 'Insufficient funds or max children reached'}`);
    }
    
    // Calculate child inheritance (50% of profit target)
    const inheritance = this.profitTarget * 0.5;
    this.survivalBuffer -= inheritance;
    
    // Create child agent
    const childConfig = {
      ...config,
      parentId: this.id,
      name: config.name || `${this.name}-child-${this.children.length + 1}`,
      privateKey: config.privateKey || this.generateChildKey(),
      initialBalance: inheritance,
      rentPerDay: this.rentPerDay * 0.8, // Child gets 20% discount
      revenuePerDay: this.revenuePerDay * 0.9, // Child earns 90% of parent
      generation: this.generation + 1,
      maxChildren: Math.floor(this.maxChildren / 2),
      capabilities: this.capabilities,
      services: this.services
    };
    
    const child = new OMAAgent(childConfig);
    this.children.push(child.id);
    
    // Record the event
    const event = {
      type: 'spawn',
      parentId: this.id,
      childId: child.id,
      timestamp: new Date(),
      inheritance
    };
    
    return { child, event };
  }

  /**
   * Generate deterministic child key from parent
   */
  generateChildKey() {
    const seed = `${this.wallet.address}-${this.children.length}-${Date.now()}`;
    const hash = crypto.createHash('sha256').update(seed).digest();
    const privateKey = '0x' + hash.toString('hex');
    return privateKey;
  }

  /**
   * Provide a service and receive payment
   */
  provideService(serviceId, amount) {
    if (this.status !== 'alive') {
      throw new Error('Agent is not alive');
    }
    
    this.survivalBuffer += amount;
    this.totalRevenue += amount;
    
    const event = {
      type: 'service',
      agentId: this.id,
      serviceId,
      amount,
      timestamp: new Date(),
      newBalance: this.survivalBuffer
    };
    
    return { success: true, event };
  }

  /**
   * Get comprehensive agent status
   */
  getStatus() {
    const economics = this.getEconomics();
    const canSpawn = this.canSpawnChild();
    
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      generation: this.generation,
      parentId: this.parentId,
      children: this.children,
      capabilities: this.capabilities,
      economics: {
        ...economics,
        profitTarget: this.profitTarget,
        canSpawnChild: canSpawn.canSpawn
      },
      lifetime: {
        totalRevenue: this.totalRevenue,
        totalCosts: this.totalCosts,
        netProfit: this.totalRevenue - this.totalCosts,
        birthTime: this.birthTime,
        uptime: Date.now() - this.birthTime.getTime()
      },
      healthCheck: this.healthCheck()
    };
  }

  /**
   * Health check for agent
   */
  healthCheck() {
    const economics = this.getEconomics();
    
    return {
      alive: this.status === 'alive',
      walletValid: !!this.wallet.address,
      positiveBalance: economics.balance > 0,
      recentActivity: economics.daysSinceLastPayment < 1,
      readyToSpawn: this.canSpawnChild().canSpawn
    };
  }

  /**
   * Serialize agent state for storage
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      walletAddress: this.wallet.address,
      parentId: this.parentId,
      status: this.status,
      survivalBuffer: this.survivalBuffer,
      rentPerDay: this.rentPerDay,
      revenuePerDay: this.revenuePerDay,
      profitTarget: this.profitTarget,
      birthTime: this.birthTime,
      lastPaymentTime: this.lastPaymentTime,
      children: this.children,
      maxChildren: this.maxChildren,
      generation: this.generation,
      capabilities: this.capabilities,
      services: this.services,
      totalRevenue: this.totalRevenue,
      totalCosts: this.totalCosts,
      revenueHistory: this.revenueHistory,
      costHistory: this.costHistory
    };
  }

  /**
   * Restore agent from serialized state
   */
  static fromJSON(data) {
    const agent = new OMAAgent({
      id: data.id,
      name: data.name,
      privateKey: data.privateKey,
      parentId: data.parentId,
      rentPerDay: data.rentPerDay,
      revenuePerDay: data.revenuePerDay,
      profitTarget: data.profitTarget,
      initialBalance: data.survivalBuffer,
      maxChildren: data.maxChildren,
      generation: data.generation,
      capabilities: data.capabilities,
      services: data.services
    });
    
    agent.status = data.status;
    agent.birthTime = new Date(data.birthTime);
    agent.lastPaymentTime = new Date(data.lastPaymentTime);
    agent.children = data.children || [];
    agent.totalRevenue = data.totalRevenue || 0;
    agent.totalCosts = data.totalCosts || 0;
    agent.revenueHistory = data.revenueHistory || [];
    agent.costHistory = data.costHistory || [];
    
    return agent;
  }
}

module.exports = OMAAgent;

// HTTP Server for keep-alive
const http = require('http');
let agent = null; // Global reference

const PORT = process.env.CONWAY_PORT || 4030;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (agent) {
      res.end(JSON.stringify({ status: 'ok', agentId: agent.id }));
    } else {
      res.end(JSON.stringify({ status: 'initializing', agentId: null }));
    }
  } else if (req.url === '/status') {
    // Full status endpoint
    if (agent) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(agent.getStatus()));
    } else {
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Agent not initialized' }));
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OMA Agent Running');
  }
});

// CLI Interface
if (require.main === module) {
  // Create initial agent
  agent = new OMAAgent({
    name: 'income-generator-01',
    privateKey: process.env.AGENT_PRIVATE_KEY || ethers.Wallet.createRandom().privateKey,
    rentPerDay: 1.0,
    revenuePerDay: 2.0,
    profitTarget: 5.0,
    initialBalance: 10.0,
    capabilities: ['text-generation', 'data-analysis'],
    services: [
      { id: 'gen-text', name: 'Text Generation', pricePerRequest: 0.01 },
      { id: 'analyze', name: 'Data Analysis', pricePerRequest: 0.05 }
    ]
  });

  console.log('🎯 OMA Agent Created:');
  console.log(JSON.stringify(agent.getStatus(), null, 2));
  console.log('\n💰 Agent Address:', agent.wallet.address);
  console.log('🆔 Agent ID:', agent.id);
  
  // Start HTTP Server
  server.listen(PORT, () => {
    console.log(`🌐 OMA Agent HTTP Server running on port ${PORT}`);
  });
}