/**
 * Frankie Conway Spawn Manager
 * 
 * Manages agent lifecycle: spawn, monitor, reproduce, terminate
 * Integrates with Vistara Hypercore for VM management
 */

const crypto = require('crypto');
const { WebSocket } = require('ws');
const ConwayAgent = require('./frankie-conway-agent');

class ConwaySpawnManager {
  constructor(config) {
    this.hypercoreEndpoint = config.hypercoreEndpoint || 'ws://localhost:8080';
    this.registryUrl = config.registryUrl || 'http://localhost:8080';
    
    // Local agent storage (would use database in production)
    this.agents = new Map();
    this.agentIndex = 1;
    
    // Economic settings
    this.globalRentPerDay = config.globalRentPerDay || 1.0;
    this.globalRevenuePerDay = config.globalRevenuePerDay || 2.0;
    this.profitTarget = config.profitTarget || 5.0;
    
    // Hypercore connection
    this.ws = null;
    this.connected = false;
    
    // Statistics
    this.stats = {
      totalSpawned: 0,
      totalDied: 0,
      totalActive: 0,
      totalRevenue: 0,
      totalCosts: 0
    };
  }

  /**
   * Connect to Hypercore WebSocket
   */
  async connect() {
    return new Promise((resolve, reject) => {
      console.log(`[SpawnManager] Connecting to Hypercore at ${this.hypercoreEndpoint}...`);
      
      this.ws = new WebSocket(this.hypercoreEndpoint);
      
      this.ws.on('open', () => {
        console.log('[SpawnManager] Connected to Hypercore');
        this.connected = true;
        resolve();
      });
      
      this.ws.on('message', (data) => {
        this.handleHypercoreMessage(JSON.parse(data));
      });
      
      this.ws.on('close', () => {
        console.log('[SpawnManager] Disconnected from Hypercore');
        this.connected = false;
      });
      
      this.ws.on('error', (error) => {
        console.error('[SpawnManager] Connection error:', error.message);
        reject(error);
      });
      
      // Timeout
      setTimeout(() => {
        if (!this.connected) {
          // Still try to work without Hypercore
          console.log('[SpawnManager] Connection timeout - working in local mode');
          resolve();
        }
      }, 5000);
    });
  }

  /**
   * Handle messages from Hypercore
   */
  handleHypercoreMessage(message) {
    const { type, data } = message;
    
    switch (type) {
      case 'vm_spawned':
        console.log(`[SpawnManager] VM spawned: ${data.vmId}`);
        break;
      case 'vm_destroyed':
        console.log(`[SpawnManager] VM destroyed: ${data.vmId}`);
        break;
      case 'status':
        console.log(`[SpawnManager] VM status: ${data.status}`);
        break;
      default:
        console.log(`[SpawnManager] Unknown message: ${type}`);
    }
  }

  /**
   * Send command to Hypercore
   */
  async sendCommand(command, params = {}) {
    if (!this.connected || !this.ws) {
      console.log(`[SpawnManager] Local command: ${command}`);
      return { local: true, command, params };
    }
    
    return new Promise((resolve, reject) => {
      const message = JSON.stringify({ command, params, timestamp: Date.now() });
      
      this.ws.send(message);
      
      // Simple response handling
      const timeout = setTimeout(() => {
        reject(new Error('Command timeout'));
      }, 10000);
      
      const handler = (data) => {
        const response = JSON.parse(data);
        if (response.command === command) {
          clearTimeout(timeout);
          this.ws.off('message', handler);
          resolve(response);
        }
      };
      
      this.ws.on('message', handler);
    });
  }

  /**
   * Spawn a new agent
   */
  async spawnAgent(config = {}) {
    const agentId = `frankie-${this.agentIndex++}`;
    const wallet = config.privateKey || ethers.Wallet.createRandom();
    
    const agentConfig = {
      id: agentId,
      name: config.name || `agent-${agentId}`,
      privateKey: wallet.privateKey,
      parentId: config.parentId || null,
      rentPerDay: config.rentPerDay || this.globalRentPerDay,
      revenuePerDay: config.revenuePerDay || this.globalRevenuePerDay,
      profitTarget: config.profitTarget || this.profitTarget,
      initialBalance: config.initialBalance || 10.0,
      maxChildren: config.maxChildren || 5,
      generation: config.generation || 1,
      capabilities: config.capabilities || ['general-purpose'],
      services: config.services || [
        { id: 'text-gen', name: 'Text Generation', price: 0.01 },
        { id: 'analysis', name: 'Data Analysis', price: 0.05 }
      ]
    };
    
    const agent = new ConwayAgent(agentConfig);
    
    // Register agent
    this.agents.set(agent.id, agent);
    this.stats.totalSpawned++;
    this.stats.totalActive++;
    
    // Request VM from Hypercore
    const vmResult = await this.spawnVM(agent);
    agent.vmId = vmResult.vmId || null;
    
    console.log(`[SpawnManager] Agent ${agent.name} spawned (${agent.id})`);
    console.log(`  Address: ${wallet.address}`);
    console.log(`  Initial Balance: ${agent.survivalBuffer} USDC`);
    
    return { agent, vm: vmResult };
  }

  /**
   * Spawn VM via Hypercore
   */
  async spawnVM(agent) {
    const result = await this.sendCommand('spawn', {
      name: agent.name,
      image: 'frankie-agent:latest',
      resources: {
        cpu: 1,
        memory: '512Mi',
        storage: '1Gi'
      },
      env: {
        AGENT_ID: agent.id,
        AGENT_WALLET: agent.wallet.address,
        API_ENDPOINT: this.registryUrl
      }
    });
    
    return {
      vmId: result.vmId || `vm-${agent.id}`,
      status: 'running'
    };
  }

  /**
   * Destroy agent and VM
   */
  async destroyAgent(agentId, reason = 'manual') {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent not found: ${agentId}`);
    }
    
    // Destroy VM if exists
    if (agent.vmId) {
      await this.sendCommand('destroy', { vmId: agent.vmId });
    }
    
    // Remove from registry
    this.agents.delete(agentId);
    this.stats.totalActive--;
    this.stats.totalDied++;
    
    console.log(`[SpawnManager] Agent ${agent.name} destroyed (${reason})`);
    
    return { agentId, reason, timestamp: new Date() };
  }

  /**
   * Process daily survival for all agents
   */
  async processSurvival() {
    const results = {
      processed: 0,
      survived: 0,
      died: 0,
      events: []
    };
    
    for (const [agentId, agent] of this.agents) {
      const result = agent.processSurvivalPayment();
      results.processed++;
      
      if (result.survived) {
        results.survived++;
      } else {
        results.died++;
        
        // Agent died - destroy VM
        if (agent.vmId) {
          await this.sendCommand('destroy', { vmId: agent.vmId, reason: 'insufficient_funds' });
        }
        
        this.agents.delete(agentId);
        this.stats.totalActive--;
        this.stats.totalDied++;
        
        results.events.push({
          type: 'death',
          agentId,
          reason: result.reason,
          timestamp: new Date()
        });
      }
    }
    
    // Update stats
    this.stats.totalRevenue = Array.from(this.agents.values())
      .reduce((sum, a) => sum + a.totalRevenue, 0);
    this.stats.totalCosts = Array.from(this.agents.values())
      .reduce((sum, a) => sum + a.totalCosts, 0);
    
    return results;
  }

  /**
   * Check for reproduction opportunities
   */
  async checkReproduction() {
    const events = [];
    
    for (const [agentId, agent] of this.agents) {
      if (agent.canSpawnChild().canSpawn) {
        try {
          const { child, event } = agent.spawnChild();
          
          // Register child
          this.agents.set(child.id, child);
          this.stats.totalSpawned++;
          this.stats.totalActive++;
          
          // Spawn VM for child
          await this.spawnVM(child);
          
          events.push({
            type: 'spawn',
            parentId: agentId,
            childId: child.id,
            event
          });
          
          console.log(`[SpawnManager] ${agent.name} spawned child ${child.name}`);
        } catch (error) {
          console.error(`[SpawnManager] Spawn failed for ${agent.name}:`, error.message);
        }
      }
    }
    
    return events;
  }

  /**
   * Get comprehensive ecosystem status
   */
  getEcosystemStatus() {
    const agents = Array.from(this.agents.values()).map(a => a.getStatus());
    
    return {
      timestamp: new Date().toISOString(),
      stats: {
        ...this.stats,
        totalActive: this.agents.size
      },
      economics: {
        totalRevenue: this.stats.totalRevenue,
        totalCosts: this.stats.totalCosts,
        netProfit: this.stats.totalRevenue - this.stats.totalCosts,
        averageBalance: this.agents.size > 0 
          ? Array.from(this.agents.values())
              .reduce((sum, a) => sum + a.survivalBuffer, 0) / this.agents.size 
          : 0
      },
      agents: {
        count: this.agents.size,
        list: agents
      },
      hypercore: {
        connected: this.connected,
        endpoint: this.hypercoreEndpoint
      }
    };
  }

  /**
   * Get agent by ID
   */
  getAgent(agentId) {
    return this.agents.get(agentId);
  }

  /**
   * List all agents
   */
  listAgents(filter = {}) {
    let agents = Array.from(this.agents.values());
    
    if (filter.status) {
      agents = agents.filter(a => a.status === filter.status);
    }
    if (filter.generation !== undefined) {
      agents = agents.filter(a => a.generation === filter.generation);
    }
    
    return agents.map(a => a.getStatus());
  }

  /**
   * Simulate ecosystem evolution (for testing/demo)
   */
  async simulateEvolution(generations = 5, agentsPerGeneration = 3) {
    console.log('\n🌱 Starting ecosystem simulation...\n');
    
    // Initial population
    const initialAgents = [];
    for (let i = 0; i < agentsPerGeneration; i++) {
      const { agent } = await this.spawnAgent({
        name: `founder-${i + 1}`,
        initialBalance: 10.0,
        revenuePerDay: 2.5
      });
      initialAgents.push(agent);
      console.log(`  👤 Spawned ${agent.name} with ${agent.survivalBuffer} USDC`);
    }
    
    // Simulate generations
    for (let gen = 1; gen <= generations; gen++) {
      console.log(`\n📊 Generation ${gen}:`);
      
      // Process survival
      const survival = await this.processSurvival();
      console.log(`  🏃 Survived: ${survival.survived}, Died: ${survival.died}`);
      
      // Process reproduction
      const births = await this.checkReproduction();
      console.log(`  👶 Born: ${births.length}`);
      
      // Add revenue to survivors
      for (const [agentId, agent] of this.agents) {
        if (agent.status === 'alive') {
          const revenue = agent.revenuePerDay * 0.5; // Half day simulation
          agent.survivalBuffer += revenue;
        }
      }
      
      // Log status
      const status = this.getEcosystemStatus();
      console.log(`  💰 Total Revenue: $${status.economics.totalRevenue.toFixed(2)}`);
      console.log(`  💸 Total Costs: $${status.economics.totalCosts.toFixed(2)}`);
      console.log(`  📈 Net Profit: $${status.economics.netProfit.toFixed(2)}`);
      console.log(`  👥 Active Agents: ${status.stats.totalActive}`);
    }
    
    console.log('\n✅ Simulation complete');
    return this.getEcosystemStatus();
  }
}

// Import ethers for wallet creation
const { ethers } = require('ethers');

module.exports = ConwaySpawnManager;

// CLI Interface
if (require.main === module) {
  const spawner = new ConwaySpawnManager({
    hypercoreEndpoint: process.env.HYPERCORE_ENDPOINT || 'ws://localhost:8080',
    globalRentPerDay: 1.0,
    globalRevenuePerDay: 2.0,
    profitTarget: 5.0
  });

  // Test simulation
  spawner.connect().then(async () => {
    const result = await spawner.simulateEvolution(5, 3);
    console.log('\n📊 Final Ecosystem Status:');
    console.log(JSON.stringify(result, null, 2));
    
    process.exit(0);
  }).catch(err => {
    console.error('Simulation failed:', err);
    process.exit(1);
  });
}