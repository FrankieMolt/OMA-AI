/**
 * OMA-AI Miner SDK
 * Mine AI credits by running local models
 *
 * @version 0.1.0
 */
interface HardwareInfo {
    cpuCores: number;
    cpuModel: string;
    gpuAvailable: boolean;
    gpuModel?: string;
    gpuVRAM?: number;
    totalRAM: number;
}
interface MinerConfig {
    apiKey: string;
    modelId: string;
    apiUrl?: string;
    minCredits?: number;
}
interface MiningStats {
    totalCredits: number;
    totalRequests: number;
    avgLatency: number;
    uptime: number;
}
export declare function detectHardware(): Promise<HardwareInfo>;
export declare function calculateCredits(tokensPerSecond: number, isGpu: boolean, modelSize: number): number;
export declare class OMAMiner {
    private config;
    private stats;
    private startTime;
    private isRunning;
    constructor(config: MinerConfig);
    start(): Promise<void>;
    stop(): Promise<void>;
    private verifyApiKey;
    private submitCredits;
    getStats(): MiningStats;
}
export default OMAMiner;
export { HardwareInfo, MinerConfig, MiningStats };
