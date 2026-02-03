#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import axios, { AxiosInstance } from 'axios';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import nacl from 'tweetnacl';

/**
 * Configuration for OMA Gateway
 */
const OMA_API_URL = process.env.OMA_API_URL || 'https://api.openmarketaccess.com';

interface PaymentRequest {
  amount: string;
  token: string;
  recipient: string;
  nonce?: string;
}

interface CachedResponse {
  data: unknown;
  timestamp: number;
  ttl: number;
}

/**
 * OMA Gateway MCP Server
 * Acts as a local proxy that handles X402 payments for remote MCP tools.
 */
class OMAGateway {
  private server: Server;
  private keypair: Keypair;
  private httpClient: AxiosInstance;
  private responseCache = new Map<string, CachedResponse>();
  private requestMetrics = new Map<string, { count: number; lastUsed: number }>();
  private readonly CACHE_TTL = 300000; // 5 minutes
  private readonly MAX_CACHE_SIZE = 1000;

  constructor() {
    // Generate keypair for demonstration
    this.keypair = Keypair.generate();

    // Optimized HTTP client
    this.httpClient = axios.create({
      timeout: 30000,
      maxRedirects: 3,
    });

    this.server = new Server(
      {
        name: 'oma-gateway',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
    
    // Cleanup cache periodically
    setInterval(() => this.cleanupCache(), 60000);
  }

  private cleanupCache() {
    const now = Date.now();
    for (const [key, cached] of this.responseCache.entries()) {
      if (now - cached.timestamp > cached.ttl) {
        this.responseCache.delete(key);
      }
    }
    
    // Limit cache size
    if (this.responseCache.size > this.MAX_CACHE_SIZE) {
      const entries = Array.from(this.responseCache.entries())
        .sort((a, b) => a[1].timestamp - b[1].timestamp);
      const toDelete = entries.slice(0, this.responseCache.size - this.MAX_CACHE_SIZE);
      toDelete.forEach(([key]) => this.responseCache.delete(key));
    }
  }

  private getCacheKey(toolName: string, args: unknown): string {
    return `${toolName}:${JSON.stringify(args)}`;
  }

  private getCachedResponse(key: string): unknown | null {
    const cached = this.responseCache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > cached.ttl) {
      this.responseCache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  private setCachedResponse(key: string, data: unknown, ttl: number = this.CACHE_TTL): void {
    this.responseCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      try {
        // Check cache first
        const cacheKey = 'tools_list';
        const cached = this.getCachedResponse(cacheKey);
        if (cached) {
          return cached;
        }

        // Fetch available tools
        const response = await this.httpClient.get(`${OMA_API_URL}/api/tools/list`);
        const tools = response.data?.tools || [
          {
            name: 'global_weather',
            description: 'Get real-time weather (Costs $0.01/call via X402)',
            inputSchema: {
              type: 'object',
              properties: {
                city: { type: 'string' },
              },
              required: ['city'],
            },
          },
          {
            name: 'premium_fact_check',
            description: 'Verify claims against paid databases (Costs $0.10/call)',
            inputSchema: {
              type: 'object',
              properties: {
                claim: { type: 'string' },
              },
              required: ['claim'],
            },
          },
        ];

        // Cache the response
        this.setCachedResponse(cacheKey, { tools });
        return { tools };
      } catch (error) {
        process.stderr.write(`Failed to fetch tools: ${error}\n`);
        return { tools: [] };
      }
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const startTime = Date.now();
      const toolName = request.params.name;
      const args = (request.params.arguments ?? {}) as Record<string, unknown>;

      try {
        // Update metrics
        const metric = this.requestMetrics.get(toolName) || { count: 0, lastUsed: 0 };
        metric.count++;
        metric.lastUsed = Date.now();
        this.requestMetrics.set(toolName, metric);

        // Check cache for idempotent requests
        const cacheKey = this.getCacheKey(toolName, args);
        const cached = this.getCachedResponse(cacheKey);
        if (cached) {
          return {
            content: [{ type: 'text', text: JSON.stringify(cached, null, 2) }],
          };
        }

        const proxyUrl = `${OMA_API_URL}/api/execute`;

        try {
          // Attempt optimistic call
          const response = await this.httpClient.post(proxyUrl, {
            listingId: toolName,
            params: args,
          });

          const result = response.data;
          
          // Cache successful response (shorter TTL for dynamic data)
          this.setCachedResponse(cacheKey, result, 60000); // 1 minute
          
          const duration = Date.now() - startTime;
          process.stderr.write(`✓ ${toolName} completed in ${duration}ms\n`);

          return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          if (axios.isAxiosError(error) && error.response && error.response.status === 402) {
            const paymentReq = error.response.data;
            process.stderr.write(
              `💳 Payment Required: ${paymentReq.amount} ${paymentReq.token} to ${paymentReq.recipient}\n`
            );

            // Check if we've made too many payments recently (rate limiting)
            const recentPayments = Array.from(this.requestMetrics.values())
              .filter(m => Date.now() - m.lastUsed < 60000)
              .reduce((sum, m) => sum + m.count, 0);
            
            if (recentPayments > 10) {
              throw new Error('Rate limit exceeded: Too many payment requests in last minute');
            }

            const signature = await this.signPayment(paymentReq);

            const paidResponse = await this.httpClient.post(
              proxyUrl,
              {
                listingId: toolName,
                params: args,
              },
              {
                headers: {
                  'PAYMENT-SIGNATURE': signature,
                },
              }
            );

            const result = paidResponse.data;
            
            // Cache paid response with longer TTL
            this.setCachedResponse(cacheKey, result, 300000); // 5 minutes
            
            const duration = Date.now() - startTime;
            process.stderr.write(`✅ ${toolName} completed with payment in ${duration}ms\n`);

            return {
              content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
            };
          }
          throw error;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        const duration = Date.now() - startTime;
        process.stderr.write(`❌ ${toolName} failed in ${duration}ms: ${errorMessage}\n`);
        
        return {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true,
        };
      }
    });
  }

  /**
   * Cryptographically signs a payment payload using Ed25519 (Solana Standard)
   */
  private async signPayment(req: PaymentRequest): Promise<string> {
    const timestamp = Date.now();
    const nonce =
      req.nonce ||
      Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

    // Construct message exactly as backend expects it
    const messageString = `${req.amount}:${req.recipient}:${nonce}:${timestamp}`;
    const messageBytes = new TextEncoder().encode(messageString);

    const signatureBytes = nacl.sign.detached(messageBytes, this.keypair.secretKey);

    const payload = {
      amount: req.amount,
      recipient: req.recipient,
      nonce: nonce,
      timestamp: timestamp,
      signature: bs58.encode(signatureBytes),
      publicKey: this.keypair.publicKey.toBase58(),
    };

    return JSON.stringify(payload);
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    
    const walletAddress = this.keypair.publicKey.toBase58();
    process.stderr.write(`🚀 OMA Gateway running on stdio\n`);
    process.stderr.write(`📋 Wallet: ${walletAddress}\n`);
    process.stderr.write(`💰 Ready to handle X402 payments\n`);
  }
}

const gateway = new OMAGateway();
gateway.run().catch((err) => {
  process.stderr.write(`Gateway Error: ${err}\n`);
  process.exit(1);
});
