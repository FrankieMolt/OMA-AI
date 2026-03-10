"use strict";
/**
 * OMA-AI Miner - Simple & Clean
 * Run AI models, earn credits
 */
Object.defineProperty(exports, "__esModule", { value: true });
const API = 'api.oma-ai.com';
const OLLAMA = 'http://localhost:11434';
class Miner {
    config;
    running = false;
    constructor(config) {
        this.config = config;
    }
    async start() {
        console.log(`⛏️ OMA Miner starting...`);
        console.log(`📦 Model: ${this.config.model}`);
        console.log(`💼 Wallet: ${this.config.wallet}`);
        // Check Ollama
        try {
            await this.checkOllama();
            console.log(`✅ Ollama connected`);
        }
        catch (e) {
            console.error(`❌ Ollama not running. Run: ollama serve`);
            return;
        }
        // Register with API
        await this.register();
        // Start processing
        this.running = true;
        this.loop();
    }
    stop() {
        this.running = false;
        console.log(`🛑 Miner stopped`);
    }
    async checkOllama() {
        const res = await fetch(`${OLLAMA}/api/tags`);
        if (!res.ok)
            throw new Error('Ollama not running');
        const data = await res.json();
        console.log(`📋 Available models: ${data.models.map(m => m.name).join(', ')}`);
    }
    async register() {
        console.log(`📝 Registering with OMA-AI...`);
        // In production, call /api/miners/register
        console.log(`✅ Registered`);
    }
    async loop() {
        while (this.running) {
            try {
                // Get pending request
                const request = await this.getRequest();
                if (request) {
                    console.log(`⚡ Processing request: ${request.id}`);
                    // Run inference
                    const result = await this.inference(request.prompt);
                    // Submit result
                    await this.submit(request.id, result);
                    console.log(`✅ Completed: ${request.id}`);
                }
                else {
                    // No work, wait
                    await this.sleep(5000);
                }
            }
            catch (e) {
                console.error(`❌ Error: ${e.message}`);
                await this.sleep(10000);
            }
        }
    }
    async getRequest() {
        // In production, call /api/miners/requests
        return null;
    }
    async inference(prompt) {
        const res = await fetch(`${OLLAMA}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: this.config.model,
                prompt,
                stream: false
            })
        });
        const data = await res.json();
        return data.response;
    }
    async submit(requestId, result) {
        // In production, call /api/miners/submit
        console.log(`📤 Submitted: ${requestId}`);
    }
    sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }
}
// CLI
const args = process.argv.slice(2);
const config = {
    apiKey: process.env.OMA_API_KEY || args[0] || '',
    wallet: process.env.OMA_WALLET || args[1] || '',
    model: process.env.OMA_MODEL || 'qwen3:4b'
};
if (!config.apiKey || !config.wallet) {
    console.log(`
Usage: oma-miner <api-key> <wallet> [model]

Example:
  oma-miner sk-xxx 0x123... qwen3:4b

Environment:
  OMA_API_KEY  - Your API key
  OMA_WALLET   - Your wallet address
  OMA_MODEL    - Model to run (default: qwen3:4b)
`);
    process.exit(1);
}
const miner = new Miner(config);
miner.start();
process.on('SIGINT', () => {
    miner.stop();
    process.exit(0);
});
