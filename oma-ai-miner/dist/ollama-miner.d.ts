/**
 * OMA-AI Miner SDK v2
 *
 * Leverages Ollama for inference
 * Lightweight CLI - not a desktop app
 */
interface MinerConfig {
    apiKey: string;
    modelId: string;
    ollamaHost?: string;
    walletPrivateKey: string;
    minPayout?: number;
}
interface MinerStats {
    totalRequests: number;
    totalTokens: number;
    totalCredits: number;
    pendingPayout: number;
    uptime: number;
}
export declare function calculateCredits(tokensPerSecond: number, totalTokens: number, hasGpu: boolean): number;
export declare class OMAMiner {
    private config;
    private ollama;
    private wallet;
    private stats;
    private isRunning;
    private startTime;
    private hasGpu;
    constructor(config: MinerConfig);
    initialize(): Promise<void>;
    private register;
    start(): Promise<void>;
    stop(): Promise<void>;
    private pollRequests;
    private handleRequest;
    private submitCredits;
    private printStats;
    getStats(): MinerStats;
}
export declare function main(): Promise<void>;
export {};
