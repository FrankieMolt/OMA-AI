"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ============ IN-MEMORY STORAGE ============
const miners = new Map();
const pendingRequests = [];
// ============ HEALTH ============
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        miners: miners.size,
        pending: pendingRequests.length
    });
});
// ============ MINER ROUTES ============
app.post('/api/miners/register', (req, res) => {
    const { address, modelId, hasGpu } = req.body;
    const miner = {
        id: address,
        address,
        modelId,
        hasGpu: hasGpu || false,
        status: 'online',
        totalCredits: 0,
        pendingPayout: 0,
        lastSeen: new Date()
    };
    miners.set(address, miner);
    res.json({ success: true, miner });
});
app.get('/api/miners/requests', (req, res) => {
    const { modelId } = req.query;
    const requests = pendingRequests.filter(r => r.modelId === modelId);
    res.json({ requests });
});
app.post('/api/miners/submit', (req, res) => {
    const { requestId, tokens, credits, minerAddress } = req.body;
    const miner = miners.get(minerAddress);
    if (miner) {
        miner.totalCredits += credits;
        miner.pendingPayout += credits;
        miner.lastSeen = new Date();
    }
    // Remove from pending
    const idx = pendingRequests.findIndex(r => r.id === requestId);
    if (idx >= 0) {
        pendingRequests.splice(idx, 1);
    }
    res.json({ success: true, credits });
});
app.post('/api/miners/payout', (req, res) => {
    const { credits, address } = req.body;
    const miner = miners.get(address);
    if (miner && miner.pendingPayout >= 10000) { // $10 minimum
        miner.pendingPayout = 0;
        res.json({ success: true, txHash: '0x...' + Date.now() });
    }
    else {
        res.json({ success: false, error: 'Below minimum payout' });
    }
});
app.get('/api/miners/stats', (req, res) => {
    const stats = {
        totalMiners: miners.size,
        onlineMiners: Array.from(miners.values()).filter(m => m.status === 'online').length,
        totalCredits: Array.from(miners.values()).reduce((sum, m) => sum + m.totalCredits, 0),
        totalPendingPayouts: Array.from(miners.values()).reduce((sum, m) => sum + m.pendingPayout, 0)
    };
    res.json(stats);
});
// ============ USER ROUTES ============
app.post('/api/inference', (req, res) => {
    const { modelId, prompt, maxTokens, temperature } = req.body;
    // Create request
    const request = {
        id: `req-${Date.now()}`,
        modelId,
        prompt,
        maxTokens: maxTokens || 512,
        temperature: temperature || 0.7
    };
    pendingRequests.push(request);
    // For now, return a placeholder (in production, wait for miner response)
    res.json({
        id: request.id,
        text: 'Request queued for processing',
        status: 'pending',
        credits: 0
    });
});
// ============ MODELS ============
app.get('/api/models', (req, res) => {
    res.json({
        models: [
            { id: 'qwen3:4b', name: 'Qwen 3 4B', type: 'chat' },
            { id: 'llama3.2:3b', name: 'Llama 3.2 3B', type: 'chat' },
            { id: 'deepseek-v3:8b', name: 'DeepSeek V3 8B', type: 'chat' },
            { id: 'mistral:7b', name: 'Mistral 7B', type: 'chat' }
        ]
    });
});
// ============ START ============
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`[OMA-AI API] Running on port ${PORT}`);
});
exports.default = app;
