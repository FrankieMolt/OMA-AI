/**
 * Frankie Conway - Hypercore Integration Layer
 * 
 * Spawning system for autonomous AI agents using Vistara Hypercore
 * Integration with FrankieMolt x402 facilitator
 */

const WebSocket = require('ws');

class HypercoreClient {
  constructor(grpcAddress = '127.0.0.1:8000') {
    this.grpcAddress = grpcAddress;
    this.ws = null;
    this.callbacks = new Map();
    this.messageId = 0;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(`ws://${this.grpcAddress}/v1/cluster/spawn/stream`);
      
      this.ws.on('open', () => {
        console.log('[Hypercore] Connected');
        resolve();
      });

      this.ws.on('message', (data) => {
        this.handleMessage(JSON.parse(data));
      });

      this.ws.on('error', (error) => {
        console.error('[Hypercore] Error:', error);
        reject(error);
      });

      this.ws.on('close', () => {
        console.log('[Hypercore] Disconnected');
      });
    });
  }

  on(event, callback) {
    this.callbacks.set(event, callback);
  }

  spawnAgent(config) {
    return new Promise((resolve, reject) => {
      const spawnRequest = {
        id: ++this.messageId,
        method: 'spawn',
        params: {
          ports: {
            '443': '3000'
          },
          image_ref: config.image || 'registry.vistara.dev/next-example:latest',
          memory_mb: config.memory || 2048,
          cores: config.cores || 1
        }
      };

      this.ws.send(JSON.stringify(spawnRequest));

      // Wait for response
      const timeout = setTimeout(() => {
        reject(new Error('Spawn timeout'));
      }, 30000);

      const callback = (response) => {
        clearTimeout(timeout);
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      };

      this.on(`spawn:${spawnRequest.id}`, callback);
    });
  }

  listVMs() {
    return new Promise((resolve, reject) => {
      const listRequest = {
        id: ++this.messageId,
        method: 'list',
        params: {}
      };

      this.ws.send(JSON.stringify(listRequest));

      const callback = (response) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response.vms || []);
        }
      };

      this.on(`list:${listRequest.id}`, callback);
    });
  }

  destroyVM(vmId) {
    return new Promise((resolve, reject) => {
      const destroyRequest = {
        id: ++this.messageId,
        method: 'destroy',
        params: { vm_id: vmId }
      };

      this.ws.send(JSON.stringify(destroyRequest));

      const callback = (response) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      };

      this.on(`destroy:${destroyRequest.id}`, callback);
    });
  }

  handleMessage(message) {
    const { id, method, result, error } = message;

    if (error) {
      console.error(`[Hypercore] Error in ${method}:`, error);
      const errorCallback = this.callbacks.get(`error:${id}`);
      if (errorCallback) errorCallback(error);
      return;
    }

    if (result) {
      const callback = this.callbacks.get(`${method}:${id}`);
      if (callback) callback(result);
    }
  }
}

module.exports = HypercoreClient;

// Example Usage:
/*
const client = new HypercoreClient();

await client.connect();

// Spawn a new agent VM
const result = await client.spawnAgent({
  memory: 2048,
  cores: 1,
  image: 'registry.vistara.dev/agent-image:latest'
});

console.log('Agent URL:', result.url);
console.log('Agent ID:', result.id);

// List all VMs
const vms = await client.listVMs();
console.log('Active agents:', vms.length);

// Destroy an agent
await client.destroyVM('06d0f10a-a6c6-45ae-8f23-770b96851bc3');
*/
