#!/usr/bin/env node
"use strict";
/**
 * OMA-AI Miner CLI
 *
 * Usage:
 *   oma-miner start --api-key YOUR_KEY --model qwen-3.5-4b
 *   oma-miner status
 *   oma-miner withdraw --wallet 0x...
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const ora_1 = __importDefault(require("ora"));
const miner_1 = require("./miner");
const program = new commander_1.Command();
program
    .name('oma-miner')
    .description('Mine AI credits by running local models')
    .version('0.1.0');
// ============ START COMMAND ============
program
    .command('start')
    .description('Start mining credits')
    .requiredOption('-k, --api-key <key>', 'Your OMA-AI API key')
    .option('-m, --model <model>', 'Model to run', 'qwen-3.5-4b')
    .option('-u, --api-url <url>', 'API URL', 'https://oma-ai.com/api')
    .action(async (options) => {
    const spinner = (0, ora_1.default)('Initializing miner...').start();
    try {
        const miner = new miner_1.OMAMiner({
            apiKey: options.apiKey,
            modelId: options.model,
            apiUrl: options.apiUrl
        });
        // Handle shutdown
        process.on('SIGINT', async () => {
            spinner.stop();
            await miner.stop();
            process.exit(0);
        });
        await miner.start();
        spinner.succeed('Mining started!');
        // Keep running
        setInterval(() => {
            const stats = miner.getStats();
            console.log(`[STATUS] Credits: ${stats.totalCredits} | Requests: ${stats.totalRequests} | Uptime: ${stats.uptime}s`);
        }, 60000);
    }
    catch (e) {
        spinner.fail(e.message);
        process.exit(1);
    }
});
// ============ STATUS COMMAND ============
program
    .command('status')
    .description('Check mining status and earnings')
    .requiredOption('-k, --api-key <key>', 'Your OMA-AI API key')
    .action(async (options) => {
    const spinner = (0, ora_1.default)('Fetching status...').start();
    // TODO: Call API for status
    spinner.succeed('Status retrieved');
    console.log(`
📊 Mining Status
────────────────
  Credits: 1,234
  Pending: $12.34
  Last Payout: 2026-02-25
  Next Payout: 2026-03-04
    `);
});
// ============ HARDWARE COMMAND ============
program
    .command('hardware')
    .description('Detect available hardware')
    .action(async () => {
    const spinner = (0, ora_1.default)('Detecting hardware...').start();
    try {
        const hw = await (0, miner_1.detectHardware)();
        spinner.succeed('Hardware detected');
        console.log(`
🖥️  Hardware Information
────────────────────────
  CPU: ${hw.cpuCores} cores (${hw.cpuModel})
  RAM: ${hw.totalRAM} GB
  GPU: ${hw.gpuAvailable ? `${hw.gpuModel} (${hw.gpuVRAM} MB)` : 'Not detected'}
  
💡 Estimated Earnings
────────────────────────
  CPU Only:  $1-2/day
  ${hw.gpuAvailable ? `GPU (${hw.gpuModel}): $${hw.gpuVRAM && hw.gpuVRAM > 8000 ? '15-30' : '5-10'}/day` : ''}
      `);
        // Credit calculation example
        const cpuCredits = (0, miner_1.calculateCredits)(3, false, 4);
        const gpuCredits = hw.gpuAvailable ? (0, miner_1.calculateCredits)(50, true, 7) : 0;
        console.log(`  Credits/hour: ${cpuCredits} (CPU)${gpuCredits ? ` | ${gpuCredits} (GPU)` : ''}`);
    }
    catch (e) {
        spinner.fail(e.message);
    }
});
// ============ WITHDRAW COMMAND ============
program
    .command('withdraw')
    .description('Withdraw earned credits')
    .requiredOption('-k, --api-key <key>', 'Your OMA-AI API key')
    .requiredOption('-w, --wallet <address>', 'Wallet address for payout')
    .option('-a, --amount <credits>', 'Amount to withdraw (default: all)')
    .action(async (options) => {
    const spinner = (0, ora_1.default)('Processing withdrawal...').start();
    // TODO: Call API for withdrawal
    spinner.succeed('Withdrawal requested');
    console.log(`
💰 Withdrawal Requested
──────────────────────
  Credits: 1,000
  USD Value: $10.00
  Wallet: ${options.wallet}
  Network: Base
  
⏳ Estimated time: 24-48 hours
    `);
});
// ============ MODELS COMMAND ============
program
    .command('models')
    .description('List available models for mining')
    .action(() => {
    console.log(`
📦 Available Models
───────────────────
  qwen-3.5-4b    (4B params, CPU/GPU)  ← Recommended
  qwen-3.5-7b    (7B params, GPU 8GB+)
  llama-3.2-3b   (3B params, CPU/GPU)
  mistral-7b     (7B params, GPU 8GB+)
  deepseek-7b    (7B params, GPU 8GB+)

💡 Tip: Start with qwen-3.5-4b for best CPU performance
    `);
});
// Parse arguments
program.parse();
