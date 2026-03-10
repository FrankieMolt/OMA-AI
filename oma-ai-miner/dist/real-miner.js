"use strict";
/**
 * OMA-AI Real Miner Implementation
 *
 * Uses llama.cpp for actual inference
 * Integrates with Base for payments
 * P2P networking with libp2p
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OMAMiner = void 0;
exports.detectHardware = detectHardware;
exports.calculateCredits = calculateCredits;
exports.main = main;
const node_llama_cpp_1 = require("node-llama-cpp");
const libp2p_1 = require("libp2p");
const libp2p_noise_1 = require("@chainsafe/libp2p-noise");
const libp2p_yamux_1 = require("@chainsafe/libp2p-yamux");
const kad_dht_1 = require("@libp2p/kad-dht");
const libp2p_gossipsub_1 = require("@chainsafe/libp2p-gossipsub");
const ethers_1 = require("ethers");
const systeminformation_1 = __importDefault(require("systeminformation"));
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
// ============ HARDWARE DETECTION ============
async function detectHardware() {
    const cpu = await systeminformation_1.default.cpu();
    const mem = await systeminformation_1.default.mem();
    const graphics = await systeminformation_1.default.graphics();
    const gpu = graphics.controllers.find(c => c.vendor.toLowerCase().includes('nvidia') ||
        c.vendor.toLowerCase().includes('amd') ||
        c.vendor.toLowerCase().includes('intel'));
    // Run quick benchmark
    const benchmark = await runBenchmark();
    return {
        cpuCores: cpu.cores,
        cpuModel: cpu.brand,
        cpuSpeed: cpu.speedmax,
        gpuAvailable: !!gpu,
        gpuModel: gpu?.model,
        gpuVRAM: gpu?.vram,
        totalRAM: Math.round(mem.total / 1024 / 1024 / 1024),
        benchmark
    };
}
async function runBenchmark() {
    // Simple benchmark: generate 100 tokens and measure time
    const start = Date.now();
    let hashCount = 0;
    while (Date.now() - start < 1000) {
        crypto_1.default.createHash('sha256').update(`benchmark-${hashCount}`).digest();
        hashCount++;
    }
    return hashCount;
}
// ============ CREDIT CALCULATION ============
function calculateCredits(tokensPerSecond, totalTokens, isGpu, modelSize) {
    // Base rate: 1 credit = $0.001
    // Formula based on Salad.io economics
    let baseCredits = (totalTokens / 1000) * 1; // 1 credit per 1K tokens
    // GPU bonus (2x)
    if (isGpu)
        baseCredits *= 2;
    // Model size bonus
    const sizeMultiplier = modelSize >= 70 ? 2.0 :
        modelSize >= 30 ? 1.5 :
            modelSize >= 7 ? 1.2 : 1.0;
    baseCredits *= sizeMultiplier;
    // Performance bonus (high TPS = more credits)
    if (tokensPerSecond > 50)
        baseCredits *= 1.3;
    else if (tokensPerSecond > 20)
        baseCredits *= 1.1;
    return Math.round(baseCredits * 100) / 100;
}
// ============ REAL MINER CLASS ============
class OMAMiner {
    config;
    llama = null;
    p2pNode = null;
    wallet;
    hardware = null;
    stats;
    isRunning = false;
    startTime = 0;
    constructor(config) {
        this.config = config;
        this.wallet = new ethers_1.ethers.Wallet(config.walletPrivateKey);
        this.stats = {
            totalRequests: 0,
            totalTokens: 0,
            totalCredits: 0,
            pendingPayout: 0,
            uptime: 0,
            avgLatency: 0
        };
    }
    async initialize() {
        console.log('[MINER] Initializing OMA-AI Miner...');
        // 1. Detect hardware
        console.log('[HARDWARE] Detecting...');
        this.hardware = await detectHardware();
        console.log(`[HARDWARE] CPU: ${this.hardware.cpuCores} cores @ ${this.hardware.cpuSpeed} GHz`);
        console.log(`[HARDWARE] RAM: ${this.hardware.totalRAM} GB`);
        if (this.hardware.gpuAvailable) {
            console.log(`[HARDWARE] GPU: ${this.hardware.gpuModel} (${this.hardware.gpuVRAM} MB)`);
        }
        console.log(`[HARDWARE] Benchmark: ${this.hardware.benchmark} ops/sec`);
        // 2. Load model
        console.log('[MODEL] Loading', this.config.modelId);
        await this.loadModel();
        // 3. Initialize P2P
        console.log('[P2P] Starting libp2p node...');
        await this.initP2P();
        // 4. Register with API
        console.log('[API] Registering miner...');
        await this.registerMiner();
        console.log('[MINER] ✅ Initialization complete');
    }
    async loadModel() {
        if (!fs_1.default.existsSync(this.config.modelPath)) {
            throw new Error(`Model not found: ${this.config.modelPath}`);
        }
        const config = {
            modelPath: this.config.modelPath,
            contextSize: 4096,
            threads: this.hardware?.cpuCores || 4,
            gpuLayers: this.hardware?.gpuAvailable ? 35 : 0,
        };
        this.llama = await node_llama_cpp_1.LLama.load(config);
        console.log('[MODEL] ✅ Model loaded');
    }
    async initP2P() {
        this.p2pNode = await (0, libp2p_1.createLibp2p)({
            addresses: {
                listen: ['/ip4/0.0.0.0/tcp/0']
            },
            transports: [],
            streamMuxers: [(0, libp2p_yamux_1.yamux)()],
            connectionEncryption: [(0, libp2p_noise_1.noise)()],
            dht: (0, kad_dht_1.kadDHT)(),
            pubsub: (0, libp2p_gossipsub_1.gossipsub)()
        });
        await this.p2pNode.start();
        console.log(`[P2P] ✅ Node started: ${this.p2pNode.peerId.toString()}`);
    }
    async registerMiner() {
        const response = await fetch(`${this.config.apiUrl}/miners/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': this.config.apiKey
            },
            body: JSON.stringify({
                address: this.wallet.address,
                modelId: this.config.modelId,
                hardware: this.hardware,
                peerId: this.p2pNode?.peerId?.toString()
            })
        });
        if (!response.ok) {
            throw new Error('Failed to register miner');
        }
        console.log(`[API] ✅ Registered: ${this.wallet.address.slice(0, 8)}...`);
    }
    async start() {
        if (this.isRunning)
            return;
        this.isRunning = true;
        this.startTime = Date.now();
        console.log('[MINER] 🚀 Starting inference loop...');
        console.log('[MINER] Press Ctrl+C to stop');
        // Subscribe to inference requests
        if (this.p2pNode) {
            this.p2pNode.pubsub.subscribe('oma-ai/requests');
            this.p2pNode.pubsub.addEventListener('message', async (event) => {
                if (event.detail.topic === 'oma-ai/requests') {
                    const request = JSON.parse(new TextDecoder().decode(event.detail.data));
                    await this.handleRequest(request);
                }
            });
        }
        // Also poll API for requests (fallback)
        setInterval(async () => {
            if (this.isRunning) {
                await this.pollForRequests();
            }
        }, 5000);
    }
    async stop() {
        this.isRunning = false;
        console.log('[MINER] Stopping...');
        // Submit final stats
        await this.submitCredits();
        // Stop P2P
        if (this.p2pNode) {
            await this.p2pNode.stop();
        }
        // Print stats
        console.log('\n[STATS] Session Summary:');
        console.log(`  Requests: ${this.stats.totalRequests}`);
        console.log(`  Tokens: ${this.stats.totalTokens}`);
        console.log(`  Credits: ${this.stats.totalCredits}`);
        console.log(`  Pending Payout: $${(this.stats.pendingPayout / 1000).toFixed(2)}`);
        console.log(`  Uptime: ${Math.round((Date.now() - this.startTime) / 1000)}s`);
    }
    async pollForRequests() {
        try {
            const response = await fetch(`${this.config.apiUrl}/miners/requests?modelId=${this.config.modelId}`, {
                headers: { 'X-API-Key': this.config.apiKey }
            });
            if (response.ok) {
                const { requests } = await response.json();
                for (const request of requests) {
                    await this.handleRequest(request);
                }
            }
        }
        catch (error) {
            console.error('[POLL] Error:', error.message);
        }
    }
    async handleRequest(request) {
        console.log(`[REQUEST] ${request.id.slice(0, 8)}... Processing`);
        const startTime = Date.now();
        try {
            if (!this.llama) {
                throw new Error('Model not loaded');
            }
            // Run inference
            const result = await this.llama.inference({
                prompt: request.prompt,
                maxTokens: request.maxTokens,
                temperature: request.temperature,
                topP: request.topP,
            });
            const latency = Date.now() - startTime;
            const tokensPerSecond = result.tokens.length / (latency / 1000);
            // Calculate credits
            const credits = calculateCredits(tokensPerSecond, result.tokens.length, this.hardware?.gpuAvailable || false, this.getModelSize());
            // Generate proof
            const proof = await this.generateProof(request, result, credits);
            // Submit result
            await this.submitResult({
                requestId: request.id,
                text: result.text,
                tokens: result.tokens.length,
                credits,
                latency,
                proof
            });
            // Update stats
            this.stats.totalRequests++;
            this.stats.totalTokens += result.tokens.length;
            this.stats.totalCredits += credits;
            this.stats.pendingPayout += credits;
            this.stats.avgLatency =
                (this.stats.avgLatency * (this.stats.totalRequests - 1) + latency) /
                    this.stats.totalRequests;
            console.log(`[REQUEST] ✅ ${result.tokens.length} tokens, ${tokensPerSecond.toFixed(1)} t/s, ${credits} credits`);
        }
        catch (error) {
            console.error(`[REQUEST] ❌ Error:`, error.message);
        }
    }
    async generateProof(request, result, credits) {
        const hash = crypto_1.default
            .createHash('sha256')
            .update(request.id + result.text + credits.toString())
            .digest('hex');
        const message = ethers_1.ethers.solidityPackedKeccak256(['string', 'uint256', 'string', 'uint256'], [request.id, result.tokens.length, hash, Date.now()]);
        const signature = await this.wallet.signMessage(ethers_1.ethers.getBytes(message));
        return {
            requestId: request.id,
            minerAddress: this.wallet.address,
            tokensGenerated: result.tokens.length,
            hash,
            timestamp: Date.now(),
            signature
        };
    }
    async submitResult(result) {
        await fetch(`${this.config.apiUrl}/miners/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': this.config.apiKey
            },
            body: JSON.stringify(result)
        });
    }
    async submitCredits() {
        if (this.stats.pendingPayout < this.config.minPayout) {
            console.log(`[CREDITS] ${this.stats.pendingPayout} credits (below $${this.config.minPayout / 1000} minimum)`);
            return;
        }
        console.log(`[CREDITS] Submitting ${this.stats.pendingPayout} credits for payout...`);
        await fetch(`${this.config.apiUrl}/miners/payout`, {
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
    }
    getModelSize() {
        // Extract model size from ID (e.g., "qwen-3.5-4b" -> 4)
        const match = this.config.modelId.match(/(\d+)b/i);
        return match ? parseInt(match[1]) : 7;
    }
    getStats() {
        return {
            ...this.stats,
            uptime: Math.round((Date.now() - this.startTime) / 1000)
        };
    }
}
exports.OMAMiner = OMAMiner;
// ============ CLI ENTRYPOINT ============
async function main() {
    const config = {
        apiKey: process.env.OMA_API_KEY || '',
        modelId: process.env.OMA_MODEL_ID || 'qwen-3.5-4b',
        modelPath: process.env.OMA_MODEL_PATH || './models/qwen-3.5-4b-q4_k_m.gguf',
        apiUrl: process.env.OMA_API_URL || 'https://oma-ai.com/api',
        walletPrivateKey: process.env.OMA_WALLET_KEY || '',
        minPayout: parseInt(process.env.OMA_MIN_PAYOUT || '10000') // $10 in credits
    };
    if (!config.apiKey || !config.walletPrivateKey) {
        console.error('Error: OMA_API_KEY and OMA_WALLET_KEY required');
        process.exit(1);
    }
    const miner = new OMAMiner(config);
    // Handle shutdown
    process.on('SIGINT', async () => {
        await miner.stop();
        process.exit(0);
    });
    await miner.initialize();
    await miner.start();
}
// Run if executed directly
if (require.main === module) {
    main().catch(console.error);
}
