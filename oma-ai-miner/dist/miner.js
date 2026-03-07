"use strict";
/**
 * OMA-AI Miner SDK
 * Mine AI credits by running local models
 *
 * @version 0.1.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OMAMiner = void 0;
exports.detectHardware = detectHardware;
exports.calculateCredits = calculateCredits;
const axios_1 = __importDefault(require("axios"));
const systeminformation_1 = __importDefault(require("systeminformation"));
// ============ HARDWARE DETECTION ============
async function detectHardware() {
    const cpu = await systeminformation_1.default.cpu();
    const mem = await systeminformation_1.default.mem();
    const graphics = await systeminformation_1.default.graphics();
    const gpu = graphics.controllers.find(c => c.vendor.toLowerCase().includes('nvidia') ||
        c.vendor.toLowerCase().includes('amd'));
    return {
        cpuCores: cpu.cores,
        cpuModel: cpu.brand,
        gpuAvailable: !!gpu,
        gpuModel: gpu?.model,
        gpuVRAM: gpu?.vram,
        totalRAM: Math.round(mem.total / 1024 / 1024 / 1024)
    };
}
// ============ CREDIT CALCULATION ============
function calculateCredits(tokensPerSecond, isGpu, modelSize) {
    // Base: 1 credit per 1000 tokens
    let credits = tokensPerSecond * 0.001 * 3600; // Per hour
    // GPU bonus: 2x
    if (isGpu)
        credits *= 2;
    // Model size bonus: larger models = more credits
    const sizeBonus = modelSize >= 7 ? 1.5 : modelSize >= 3 ? 1.2 : 1.0;
    credits *= sizeBonus;
    return Math.round(credits);
}
// ============ MINER CLASS ============
class OMAMiner {
    config;
    stats;
    startTime;
    isRunning = false;
    constructor(config) {
        this.config = {
            apiUrl: 'https://oma-ai.com/api',
            minCredits: 100,
            ...config
        };
        this.stats = {
            totalCredits: 0,
            totalRequests: 0,
            avgLatency: 0,
            uptime: 0
        };
        this.startTime = Date.now();
    }
    async start() {
        console.log('[MINER] Starting OMA-AI Miner...');
        // Verify API key
        const valid = await this.verifyApiKey();
        if (!valid) {
            throw new Error('Invalid API key');
        }
        // Detect hardware
        const hardware = await detectHardware();
        console.log(`[HARDWARE] CPU: ${hardware.cpuCores} cores (${hardware.cpuModel})`);
        console.log(`[HARDWARE] RAM: ${hardware.totalRAM} GB`);
        if (hardware.gpuAvailable) {
            console.log(`[HARDWARE] GPU: ${hardware.gpuModel} (${hardware.gpuVRAM} MB VRAM)`);
        }
        this.isRunning = true;
        console.log('[MINER] Ready to accept inference requests');
        console.log('[MINER] Press Ctrl+C to stop');
    }
    async stop() {
        this.isRunning = false;
        console.log('[MINER] Stopping...');
        // Submit final credits
        await this.submitCredits();
        console.log(`[STATS] Session complete:`);
        console.log(`  - Credits earned: ${this.stats.totalCredits}`);
        console.log(`  - Requests served: ${this.stats.totalRequests}`);
        console.log(`  - Uptime: ${Math.round((Date.now() - this.startTime) / 1000)}s`);
    }
    async verifyApiKey() {
        try {
            const res = await axios_1.default.get(`${this.config.apiUrl}/verify`, {
                headers: { 'X-API-Key': this.config.apiKey }
            });
            return res.data.valid === true;
        }
        catch {
            return false;
        }
    }
    async submitCredits() {
        if (this.stats.totalCredits < (this.config.minCredits || 100)) {
            console.log(`[CREDITS] ${this.stats.totalCredits} credits (below minimum, not submitted)`);
            return;
        }
        try {
            await axios_1.default.post(`${this.config.apiUrl}/mining/submit`, {
                credits: this.stats.totalCredits,
                modelId: this.config.modelId,
                requests: this.stats.totalRequests,
                uptime: Math.round((Date.now() - this.startTime) / 1000)
            }, {
                headers: { 'X-API-Key': this.config.apiKey }
            });
            console.log(`[CREDITS] Submitted ${this.stats.totalCredits} credits`);
        }
        catch (e) {
            console.error(`[CREDITS] Failed to submit: ${e.message}`);
        }
    }
    getStats() {
        return {
            ...this.stats,
            uptime: Math.round((Date.now() - this.startTime) / 1000)
        };
    }
}
exports.OMAMiner = OMAMiner;
// ============ EXPORTS ============
exports.default = OMAMiner;
