"use strict";
/**
 * OMA-AI Real API Backend
 *
 * Handles miner registration, request routing, credit tracking
 * Integrates with Base smart contracts
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const ethers_1 = require("ethers");
const pg_1 = require("pg");
const ioredis_1 = __importDefault(require("ioredis"));
const crypto_1 = __importDefault(require("crypto"));
// ============ SERVICES ============
class MinerService {
    db;
    redis;
    constructor(db, redis) {
        this.db = db;
        this.redis = redis;
    }
    async register(data, apiKey) {
        // Verify API key
        const user = await this.getUserByApiKey(apiKey);
        if (!user)
            throw new Error('Invalid API key');
        // Check if miner already exists
        const existing = await this.db.query('SELECT * FROM miners WHERE address = $1', [data.address]);
        if (existing.rows.length > 0) {
            // Update existing miner
            await this.db.query(`
        UPDATE miners SET
          model_id = $2,
          hardware = $3,
          peer_id = $4,
          status = 'online',
          last_seen = NOW()
        WHERE address = $1
      `, [data.address, data.modelId, JSON.stringify(data.hardware), data.peerId]);
            return existing.rows[0];
        }
        // Create new miner
        const result = await this.db.query(`
      INSERT INTO miners (address, model_id, hardware, peer_id, status, reputation)
      VALUES ($1, $2, $3, $4, 'online', 100)
      RETURNING *
    `, [data.address, data.modelId, JSON.stringify(data.hardware), data.peerId]);
        // Cache in Redis for fast lookup
        await this.redis.hset('miners:online', data.address, JSON.stringify(result.rows[0]));
        return result.rows[0];
    }
    async getAvailableMiners(modelId) {
        // Check Redis cache first
        const cached = await this.redis.hgetall('miners:online');
        const miners = [];
        for (const [address, data] of Object.entries(cached)) {
            const miner = JSON.parse(data);
            if (miner.modelId === modelId && miner.status === 'online') {
                miners.push(miner);
            }
        }
        // Sort by reputation (highest first)
        return miners.sort((a, b) => b.reputation - a.reputation);
    }
    async selectMiner(modelId) {
        const miners = await this.getAvailableMiners(modelId);
        if (miners.length === 0)
            return null;
        // Weighted selection based on reputation
        const totalReputation = miners.reduce((sum, m) => sum + m.reputation, 0);
        let random = Math.random() * totalReputation;
        for (const miner of miners) {
            random -= miner.reputation;
            if (random <= 0)
                return miner;
        }
        return miners[0];
    }
    async updateMinerStatus(address, status) {
        await this.db.query('UPDATE miners SET status = $2, last_seen = NOW() WHERE address = $1', [address, status]);
        // Update Redis cache
        const cached = await this.redis.hget('miners:online', address);
        if (cached) {
            const miner = JSON.parse(cached);
            miner.status = status;
            await this.redis.hset('miners:online', address, JSON.stringify(miner));
        }
    }
    async recordCredits(address, credits) {
        await this.db.query(`
      UPDATE miners SET
        total_credits = total_credits + $2,
        pending_payout = pending_payout + $2,
        last_seen = NOW()
      WHERE address = $1
    `, [address, credits]);
    }
    async getUserByApiKey(apiKey) {
        const result = await this.db.query('SELECT * FROM users WHERE api_key = $1', [apiKey]);
        return result.rows[0] || null;
    }
}
class RequestService {
    db;
    redis;
    minerService;
    constructor(db, redis, minerService) {
        this.db = db;
        this.redis = redis;
        this.minerService = minerService;
    }
    async createRequest(data) {
        const id = crypto_1.default.randomUUID();
        const result = await this.db.query(`
      INSERT INTO requests (id, user_id, model_id, prompt, max_tokens, temperature, status)
      VALUES ($1, $2, $3, $4, $5, $6, 'pending')
      RETURNING *
    `, [id, data.userId, data.modelId, data.prompt, data.maxTokens, data.temperature]);
        // Add to pending queue
        await this.redis.lpush('requests:pending', JSON.stringify(result.rows[0]));
        return result.rows[0];
    }
    async getPendingRequests(modelId) {
        const result = await this.db.query(`
      SELECT * FROM requests
      WHERE model_id = $1 AND status = 'pending'
      ORDER BY created_at ASC
      LIMIT 10
    `, [modelId]);
        return result.rows;
    }
    async assignMiner(requestId, minerAddress) {
        await this.db.query(`
      UPDATE requests SET
        assigned_miner = $2,
        status = 'processing'
      WHERE id = $1
    `, [requestId, minerAddress]);
        await this.minerService.updateMinerStatus(minerAddress, 'busy');
    }
    async completeRequest(requestId, result, tokens, credits, proof) {
        await this.db.query(`
      UPDATE requests SET
        result = $2,
        credits = $4,
        status = 'complete'
      WHERE id = $1
    `, [requestId, result, tokens, credits]);
        // Record miner credits
        const request = await this.db.query('SELECT assigned_miner FROM requests WHERE id = $1', [requestId]);
        if (request.rows[0]?.assigned_miner) {
            await this.minerService.recordCredits(request.rows[0].assigned_miner, credits);
            await this.minerService.updateMinerStatus(request.rows[0].assigned_miner, 'online');
        }
    }
}
class PaymentService {
    provider;
    wallet;
    paymentsContract;
    db;
    constructor(db, rpcUrl, privateKey, contractAddress) {
        this.db = db;
        this.provider = new ethers_1.ethers.JsonRpcProvider(rpcUrl);
        this.wallet = new ethers_1.ethers.Wallet(privateKey, this.provider);
        // Load contract ABI
        const abi = [
            'function recordMiningCredits(address miner, uint256 credits, uint256 usdValue)',
            'function getPendingPayout(address miner) view returns (uint256)'
        ];
        this.paymentsContract = new ethers_1.ethers.Contract(contractAddress, abi, this.wallet);
    }
    async recordMiningCredits(miner, credits, usdValue) {
        const tx = await this.paymentsContract.recordMiningCredits(miner, credits, Math.floor(usdValue * 1e6) // Convert to USDC decimals
        );
        await tx.wait();
        // Update database
        await this.db.query(`
      UPDATE miners SET
        pending_payout = 0,
        total_payouts = total_payouts + $2
      WHERE address = $1
    `, [miner, usdValue]);
        return tx.hash;
    }
    async processWeeklyPayouts() {
        // Get all miners with pending payouts >= $10
        const result = await this.db.query(`
      SELECT address, pending_payout FROM miners
      WHERE pending_payout >= 10000
    `);
        console.log(`[PAYOUTS] Processing ${result.rows.length} miners`);
        for (const miner of result.rows) {
            try {
                await this.recordMiningCredits(miner.address, miner.pending_payout, miner.pending_payout / 1000 // Convert credits to USD
                );
                console.log(`[PAYOUT] ✅ ${miner.address}: $${miner.pending_payout / 1000}`);
            }
            catch (error) {
                console.error(`[PAYOUT] ❌ ${miner.address}: ${error.message}`);
            }
        }
    }
}
// ============ API ROUTES ============
function createApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // Initialize services
    const db = new pg_1.Pool({
        connectionString: process.env.DATABASE_URL
    });
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    const minerService = new MinerService(db, redis);
    const requestService = new RequestService(db, redis, minerService);
    const paymentService = new PaymentService(db, process.env.BASE_RPC_URL, process.env.PAYOUT_PRIVATE_KEY, process.env.PAYMENTS_CONTRACT_ADDRESS);
    // ============ MINER ROUTES ============
    app.post('/api/miners/register', async (req, res) => {
        try {
            const apiKey = req.headers['x-api-key'];
            const miner = await minerService.register(req.body, apiKey);
            res.json({ success: true, miner });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
    app.get('/api/miners/requests', async (req, res) => {
        try {
            const { modelId } = req.query;
            const requests = await requestService.getPendingRequests(modelId);
            res.json({ requests });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
    app.post('/api/miners/submit', async (req, res) => {
        try {
            const { requestId, text, tokens, credits, latency, proof } = req.body;
            await requestService.completeRequest(requestId, text, tokens, credits, proof);
            res.json({ success: true });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
    app.post('/api/miners/payout', async (req, res) => {
        try {
            const { credits, address } = req.body;
            const txHash = await paymentService.recordMiningCredits(address, credits, credits / 1000);
            res.json({ success: true, txHash });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
    // ============ USER ROUTES ============
    app.post('/api/inference', async (req, res) => {
        try {
            const apiKey = req.headers['x-api-key'];
            const { modelId, prompt, maxTokens, temperature } = req.body;
            // Create request
            const request = await requestService.createRequest({
                userId: apiKey, // Simplified
                modelId,
                prompt,
                maxTokens,
                temperature
            });
            // Find available miner
            const miner = await minerService.selectMiner(modelId);
            if (!miner) {
                // No miners available - use fallback (Venice API)
                const fallback = await fetch('https://api.venice.ai/api/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${process.env.VENICE_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: modelId,
                        messages: [{ role: 'user', content: prompt }],
                        max_tokens: maxTokens,
                        temperature
                    })
                });
                const result = await fallback.json();
                return res.json({
                    id: request.id,
                    text: result.choices[0].message.content,
                    credits: 0, // No credits for fallback
                    fallback: true
                });
            }
            // Assign miner
            await requestService.assignMiner(request.id, miner.address);
            // Wait for result (with timeout)
            const result = await waitForResult(request.id, 60000);
            res.json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
    // ============ HEALTH ============
    app.get('/api/health', (req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });
    // ============ CRON ============
    // Weekly payouts (Sundays at 00:00 UTC)
    app.post('/api/cron/payouts', async (req, res) => {
        const auth = req.headers.authorization;
        if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        await paymentService.processWeeklyPayouts();
        res.json({ success: true });
    });
    return app;
}
// Helper function
async function waitForResult(requestId, timeout) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        // Check Redis for result
        const result = await redis.get(`request:${requestId}:result`);
        if (result) {
            return JSON.parse(result);
        }
        await new Promise(r => setTimeout(r, 1000));
    }
    throw new Error('Request timeout');
}
// ============ START ============
const app = createApp();
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`[SERVER] OMA-AI API on port ${PORT}`);
});
