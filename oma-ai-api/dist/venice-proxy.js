"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const https_1 = __importDefault(require("https"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
// ============ CONFIG ============
const VENICE_API_KEY = process.env.VENICE_API_KEY || '';
const VENICE_BASE_URL = 'api.venice.ai';
// ============ VENICE API PROXY ============
async function proxyToVenice(path, method, body) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: VENICE_BASE_URL,
            path: `/api/v1${path}`,
            method: method,
            headers: {
                'Authorization': `Bearer ${VENICE_API_KEY}`,
                'Content-Type': 'application/json',
            }
        };
        const req = https_1.default.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                }
                catch {
                    resolve({ raw: data });
                }
            });
        });
        req.on('error', reject);
        if (body)
            req.write(JSON.stringify(body));
        req.end();
    });
}
// ============ CREDITS SYSTEM ============
const userCredits = new Map();
const CREDIT_COSTS = {
    'venice-uncensored': { input: 200, output: 900 },
    'zai-org-glm-4.7': { input: 550, output: 2650 },
    'deepseek-v3.2': { input: 400, output: 1000 },
    'qwen3-4b': { input: 150, output: 600 },
    'llama-3.2-3b': { input: 150, output: 600 },
    'flux-2-pro': { input: 40, output: 0 },
    'nano-banana-pro': { input: 180, output: 0 },
};
function checkCredits(apiKey, cost) {
    const credits = userCredits.get(apiKey) || 0;
    return credits >= cost;
}
function deductCredits(apiKey, cost) {
    const current = userCredits.get(apiKey) || 0;
    userCredits.set(apiKey, current - cost);
}
function addCredits(apiKey, amount) {
    const current = userCredits.get(apiKey) || 0;
    userCredits.set(apiKey, current + amount);
}
// ============ AUTH MIDDLEWARE ============
function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing API key' });
    }
    const apiKey = auth.slice(7);
    if (!userCredits.has(apiKey)) {
        // Initialize new user with 1000 free credits ($1)
        userCredits.set(apiKey, 1000);
    }
    req.apiKey = apiKey;
    next();
}
// ============ HEALTH ============
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        models: Object.keys(CREDIT_COSTS).length
    });
});
// ============ MODELS ============
app.get('/v1/models', (req, res) => {
    res.json({
        object: 'list',
        data: [
            { id: 'venice-uncensored', object: 'model', owned_by: 'oma-ai' },
            { id: 'zai-org-glm-4.7', object: 'model', owned_by: 'oma-ai' },
            { id: 'deepseek-v3.2', object: 'model', owned_by: 'oma-ai' },
            { id: 'qwen3-4b', object: 'model', owned_by: 'oma-ai' },
            { id: 'llama-3.2-3b', object: 'model', owned_by: 'oma-ai' },
            { id: 'flux-2-pro', object: 'model', owned_by: 'oma-ai' },
            { id: 'nano-banana-pro', object: 'model', owned_by: 'oma-ai' },
            { id: 'tts-kokoro', object: 'model', owned_by: 'oma-ai' },
        ]
    });
});
// ============ CHAT COMPLETIONS ============
app.post('/v1/chat/completions', authMiddleware, async (req, res) => {
    const apiKey = req.apiKey;
    const body = req.body;
    // Calculate cost (estimate based on input tokens)
    const model = body.model || 'venice-uncensored';
    const costs = CREDIT_COSTS[model] || CREDIT_COSTS['venice-uncensored'];
    const estimatedCost = costs.input + costs.output;
    if (!checkCredits(apiKey, estimatedCost)) {
        return res.status(402).json({ error: 'Insufficient credits' });
    }
    try {
        // Proxy to Venice API
        const response = await proxyToVenice('/chat/completions', 'POST', body);
        // Deduct credits based on actual usage
        const usage = response.usage || {};
        const inputTokens = usage.prompt_tokens || 100;
        const outputTokens = usage.completion_tokens || 100;
        const actualCost = Math.ceil((inputTokens * costs.input + outputTokens * costs.output) / 1000);
        deductCredits(apiKey, actualCost);
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// ============ IMAGE GENERATION ============
app.post('/v1/images/generations', authMiddleware, async (req, res) => {
    const apiKey = req.apiKey;
    const body = req.body;
    const model = body.model || 'flux-2-pro';
    const costs = CREDIT_COSTS[model] || { input: 40, output: 0 };
    const cost = costs.input * (body.n || 1);
    if (!checkCredits(apiKey, cost)) {
        return res.status(402).json({ error: 'Insufficient credits' });
    }
    try {
        const response = await proxyToVenice('/images/generations', 'POST', body);
        deductCredits(apiKey, cost);
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// ============ AUDIO TTS ============
app.post('/v1/audio/speech', authMiddleware, async (req, res) => {
    const apiKey = req.apiKey;
    const body = req.body;
    // $3.50/1M chars = 0.0035 credits per char
    const cost = Math.ceil((body.input?.length || 100) * 0.0035);
    if (!checkCredits(apiKey, cost)) {
        return res.status(402).json({ error: 'Insufficient credits' });
    }
    try {
        const response = await proxyToVenice('/audio/speech', 'POST', body);
        deductCredits(apiKey, cost);
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// ============ EMBEDDINGS ============
app.post('/v1/embeddings', authMiddleware, async (req, res) => {
    const apiKey = req.apiKey;
    const body = req.body;
    // $0.15/1M tokens = 0.15 credits per 1K tokens
    const text = Array.isArray(body.input) ? body.input.join(' ') : body.input;
    const tokens = Math.ceil((text?.length || 100) / 4);
    const cost = Math.ceil(tokens * 0.15 / 1000);
    if (!checkCredits(apiKey, cost)) {
        return res.status(402).json({ error: 'Insufficient credits' });
    }
    try {
        const response = await proxyToVenice('/embeddings', 'POST', body);
        deductCredits(apiKey, cost);
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// ============ CREDITS ============
app.get('/v1/credits', authMiddleware, (req, res) => {
    const apiKey = req.apiKey;
    const credits = userCredits.get(apiKey) || 0;
    res.json({
        credits,
        dollars: (credits / 1000).toFixed(2),
        message: credits < 1000 ? 'Low credits - purchase more' : 'Credits OK'
    });
});
app.post('/v1/credits/purchase', authMiddleware, (req, res) => {
    const apiKey = req.apiKey;
    const { amount } = req.body; // in dollars
    // In production, this would process USDC payment
    const credits = (amount || 10) * 1000;
    addCredits(apiKey, credits);
    res.json({
        success: true,
        credits_added: credits,
        total_credits: userCredits.get(apiKey)
    });
});
const miners = new Map();
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
app.get('/api/miners/stats', (req, res) => {
    res.json({
        totalMiners: miners.size,
        onlineMiners: Array.from(miners.values()).filter(m => m.status === 'online').length,
        totalCredits: Array.from(miners.values()).reduce((sum, m) => sum + m.totalCredits, 0),
        totalPendingPayouts: Array.from(miners.values()).reduce((sum, m) => sum + m.pendingPayout, 0)
    });
});
// ============ START ============
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`[OMA-AI API] Running on port ${PORT}`);
    console.log(`[OMA-AI API] OpenAI-compatible endpoints:`);
    console.log(`  - POST /v1/chat/completions`);
    console.log(`  - POST /v1/images/generations`);
    console.log(`  - POST /v1/audio/speech`);
    console.log(`  - POST /v1/embeddings`);
    console.log(`  - GET  /v1/models`);
    console.log(`  - GET  /v1/credits`);
});
exports.default = app;
