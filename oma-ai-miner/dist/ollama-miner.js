"use strict";
/**
 * OMA-AI Miner SDK v2
 *
 * Leverages Ollama for inference
 * Lightweight CLI - not a desktop app
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OMAMiner = void 0;
exports.calculateCredits = calculateCredits;
exports.main = main;
const ollama_1 = require("ollama");
const ethers_1 = require("ethers");
const systeminformation_1 = __importDefault(require("systeminformation"));
// ============ CREDIT CALCULATION ============
function calculateCredits(tokensPerSecond, totalTokens, hasGpu) {
    // 1 credit = $0.001
    // Formula: base on tokens, bonus for GPU, bonus for speed
    let credits = (totalTokens / 1000) * 1; // 1 credit per 1K tokens
    if (hasGpu)
        credits *= 2; // GPU bonus
    if (tokensPerSecond > 50)
        credits *= 1.3;
    else if (tokensPerSecond > 20)
        credits *= 1.1;
    return Math.round(credits * 100) / 100;
}
// ============ MINER CLASS ============
class OMAMiner {
    config;
    ollama;
    wallet;
    stats;
    isRunning = false;
    startTime = 0;
    hasGpu = false;
    constructor(config) {
        this.config = {
            ollamaHost: 'http://localhost:11434',
            minPayout: 10000, // $10
            ...config
        };
        this.ollama = new ollama_1.Ollama({ host: this.config.ollamaHost });
        this.wallet = new ethers_1.ethers.Wallet(config.walletPrivateKey);
        this.stats = {
            totalRequests: 0,
            totalTokens: 0,
            totalCredits: 0,
            pendingPayout: 0,
            uptime: 0
        };
    }
    async initialize() {
        console.log('[MINER] Initializing OMA-AI Miner...');
        console.log(`[WALLET] ${this.wallet.address}`);
        // Check if Ollama is running
        try {
            const models = await this.ollama.list();
            console.log(`[OLLAMA] Connected, ${models.models.length} models available`);
            // Check if model exists
            const hasModel = models.models.some(m => m.name.includes(this.config.modelId));
            if (!hasModel) {
                console.log(`[MODEL] Pulling ${this.config.modelId}...`);
                await this.ollama.pull({ model: this.config.modelId });
                console.log(`[MODEL] ✅ ${this.config.modelId} ready`);
            }
            else {
                console.log(`[MODEL] ✅ ${this.config.modelId} already available`);
            }
        }
        catch (e) {
            console.error('[OLLAMA] Not running! Start Ollama first: ollama serve');
            throw e;
        }
        // Detect hardware
        const graphics = await systeminformation_1.default.graphics();
        this.hasGpu = graphics.controllers.some(c => c.vendor.toLowerCase().includes('nvidia') ||
            c.vendor.toLowerCase().includes('amd'));
        if (this.hasGpu) {
            console.log('[HARDWARE] ✅ GPU detected - 2x earnings bonus');
        }
        else {
            console.log('[HARDWARE] CPU only - install GPU for higher earnings');
        }
        // Register with OMA network
        await this.register();
        console.log('[MINER] ✅ Ready to mine');
    }
    async register() {
        console.log('[API] Registering with OMA network...');
        const response = await fetch('https://oma-ai.com/api/miners/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': this.config.apiKey
            },
            body: JSON.stringify({
                address: this.wallet.address,
                modelId: this.config.modelId,
                hasGpu: this.hasGpu
            })
        });
        if (!response.ok) {
            throw new Error('Failed to register');
        }
        console.log('[API] ✅ Registered');
    }
    async start() {
        if (this.isRunning)
            return;
        this.isRunning = true;
        this.startTime = Date.now();
        console.log('[MINER] 🚀 Mining started');
        console.log('[MINER] Press Ctrl+C to stop\n');
        // Poll for requests
        setInterval(async () => {
            if (this.isRunning) {
                await this.pollRequests();
            }
        }, 5000);
        // Print stats every minute
        setInterval(() => {
            this.printStats();
        }, 60000);
    }
    async stop() {
        this.isRunning = false;
        console.log('\n[MINER] Stopping...');
        await this.submitCredits();
        this.printStats();
    }
    async pollRequests() {
        try {
            const response = await fetch(`https://oma-ai.com/api/miners/requests?modelId=${this.config.modelId}`, {
                headers: { 'X-API-Key': this.config.apiKey }
            });
            if (!response.ok)
                return;
            const data = await response.json();
            const requests = data.requests || [];
            for (const request of requests) {
                await this.handleRequest(request);
            }
        }
        catch (e) {
            // Silently fail - network issues
        }
    }
    async handleRequest(request) {
        console.log(`[REQUEST] ${request.id.slice(0, 8)}... Processing`);
        const start = Date.now();
        try {
            // Run inference via Ollama
            const response = await this.ollama.generate({
                model: this.config.modelId,
                prompt: request.prompt,
                stream: false,
                options: {
                    num_predict: request.maxTokens || 512,
                    temperature: request.temperature || 0.7
                }
            });
            const latency = Date.now() - start;
            const tokens = response.eval_count || 0;
            const tps = tokens / (latency / 1000);
            // Calculate credits
            const credits = calculateCredits(tps, tokens, this.hasGpu);
            // Submit result
            await fetch('https://oma-ai.com/api/miners/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': this.config.apiKey
                },
                body: JSON.stringify({
                    requestId: request.id,
                    text: response.response,
                    tokens,
                    credits,
                    latency,
                    minerAddress: this.wallet.address
                })
            });
            // Update stats
            this.stats.totalRequests++;
            this.stats.totalTokens += tokens;
            this.stats.totalCredits += credits;
            this.stats.pendingPayout += credits;
            console.log(`[REQUEST] ✅ ${tokens} tokens, ${tps.toFixed(1)} t/s, ${credits} credits`);
        }
        catch (e) {
            console.error(`[REQUEST] ❌ ${e.message}`);
        }
    }
    async submitCredits() {
        if (this.stats.pendingPayout < (this.config.minPayout || 10000)) {
            console.log(`[CREDITS] ${this.stats.pendingPayout} (below $${(this.config.minPayout || 10000) / 1000} min)`);
            return;
        }
        await fetch('https://oma-ai.com/api/miners/payout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': this.config.apiKey
            },
            body: JSON.stringify({
                credits: this.stats.pendingPayout,
                address: this.wallet.address
            })
        });
        console.log(`[CREDITS] Submitted ${this.stats.pendingPayout} for payout`);
    }
    printStats() {
        const uptime = Math.round((Date.now() - this.startTime) / 1000);
        console.log('\n[STATS] ─────────────────────────');
        console.log(`  Requests: ${this.stats.totalRequests}`);
        console.log(`  Tokens:   ${this.stats.totalTokens}`);
        console.log(`  Credits:  ${this.stats.totalCredits}`);
        console.log(`  Pending:  $${(this.stats.pendingPayout / 1000).toFixed(2)}`);
        console.log(`  Uptime:   ${uptime}s`);
        console.log('─────────────────────────────────\n');
    }
    getStats() {
        return {
            ...this.stats,
            uptime: Math.round((Date.now() - this.startTime) / 1000)
        };
    }
}
exports.OMAMiner = OMAMiner;
// ============ CLI ============
async function main() {
    const args = process.argv.slice(2);
    const config = {
        apiKey: process.env.OMA_API_KEY || args.find(a => a.startsWith('--api-key='))?.split('=')[1] || '',
        modelId: process.env.OMA_MODEL || args.find(a => a.startsWith('--model='))?.split('=')[1] || 'qwen3:4b',
        ollamaHost: process.env.OLLAMA_HOST || 'http://localhost:11434',
        walletPrivateKey: process.env.OMA_WALLET || args.find(a => a.startsWith('--wallet='))?.split('=')[1] || ''
    };
    if (!config.apiKey || !config.walletPrivateKey) {
        console.log(`
OMA-AI Miner - Earn credits by running local AI models

Usage:
  oma-miner start --api-key=YOUR_KEY --wallet=YOUR_PRIVATE_KEY --model=qwen3:4b

Environment:
  OMA_API_KEY     Your OMA-AI API key
  OMA_WALLET      Your wallet private key (for payouts)
  OMA_MODEL       Model to run (default: qwen3:4b)
  OLLAMA_HOST     Ollama host (default: http://localhost:11434)

Prerequisites:
  1. Install Ollama: curl -fsSL https://ollama.com/install.sh | sh
  2. Start Ollama: ollama serve
  3. Get API key from: https://oma-ai.com

Example:
  OMA_API_KEY=abc123 OMA_WALLET=0x... oma-miner start
`);
        process.exit(1);
    }
    const miner = new OMAMiner(config);
    process.on('SIGINT', async () => {
        await miner.stop();
        process.exit(0);
    });
    await miner.initialize();
    await miner.start();
}
if (require.main === module) {
    main().catch(console.error);
}
