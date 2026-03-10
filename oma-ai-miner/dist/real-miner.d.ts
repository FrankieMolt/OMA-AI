/**
 * OMA-AI Real Miner Implementation
 *
 * Uses llama.cpp for actual inference
 * Integrates with Base for payments
 * P2P networking with libp2p
 */
interface HardwareInfo {
    cpuCores: number;
    cpuModel: string;
    cpuSpeed: number;
    gpuAvailable: boolean;
    gpuModel?: string;
    gpuVRAM?: number;
    totalRAM: number;
    benchmark: number;
}
interface MinerConfig {
    apiKey: string;
    modelId: string;
    modelPath: string;
    apiUrl: string;
    walletPrivateKey: string;
    minPayout: number;
}
interface MinerStats {
    totalRequests: number;
    totalTokens: number;
    totalCredits: number;
    pendingPayout: number;
    uptime: number;
    avgLatency: number;
}
export declare function detectHardware(): Promise<HardwareInfo>;
export declare function calculateCredits(tokensPerSecond: number, totalTokens: number, isGpu: boolean, modelSize: number): number;
export declare class OMAMiner {
    private config;
    private llama;
    private p2pNode;
    private wallet;
    private hardware;
    private stats;
    private isRunning;
    private startTime;
    constructor(config: MinerConfig);
    initialize(): Promise<void>;
    private loadModel;
    private initP2P;
    private registerMiner;
    start(): Promise<void>;
    stop(): Promise<void>;
    private pollForRequests;
    private handleRequest;
    private generateProof;
    private submitResult;
    private submitCredits;
    private getModelSize;
    getStats(): MinerStats;
}
export declare function main(): Promise<void>;
export {};
