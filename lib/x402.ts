/**
 * x402 Payment Protocol - Crypto Micropayments
 *
 * This module handles USDC payments on Base network using the x402 protocol.
 * Users pay for API calls with crypto micropayments.
 */

import {
  createPublicClient,
  createWalletClient,
  http,
  parseUnits,
  formatUnits,
} from "viem";
import { base } from "viem/chains";

// USDC contract on Base
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const;

// x402 Payment Handler
export class X402PaymentHandler {
  private client: any;
  private chain = base;

  constructor(rpcUrl?: string) {
    this.client = createPublicClient({
      chain: this.chain,
      transport: http(rpcUrl || "https://mainnet.base.org"),
    });
  }

  /**
   * Get USDC balance for a wallet
   */
  async getBalance(address: `0x${string}`): Promise<string> {
    try {
      // For demo, return mock balance
      // In production, this would call the actual USDC contract
      return "100.00";
    } catch (error) {
      console.error("Failed to get balance:", error);
      return "0.00";
    }
  }

  /**
   * Create a payment request for an API call
   */
  createPaymentRequest(params: {
    serviceId: string;
    serviceName: string;
    pricePerCall: number;
    calls: number;
    recipientAddress: `0x${string}`;
  }): X402PaymentRequest {
    const totalCost = params.pricePerCall * params.calls;

    return {
      id: crypto.randomUUID(),
      serviceId: params.serviceId,
      serviceName: params.serviceName,
      amount: totalCost,
      currency: "USDC",
      chain: "base",
      recipient: params.recipientAddress,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Validate a payment transaction
   */
  async validatePayment(
    txHash: string,
    expectedAmount: number,
  ): Promise<boolean> {
    try {
      const receipt = await this.client.getTransactionReceipt({
        hash: txHash as `0x${string}`,
      });
      // In production, decode the transfer event and validate amount
      return receipt.status === "success";
    } catch (error) {
      console.error("Payment validation failed:", error);
      return false;
    }
  }
}

export interface X402PaymentRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  amount: number;
  currency: "USDC";
  chain: "base";
  recipient: `0x${string}`;
  status: "pending" | "completed" | "failed";
  txHash?: string;
  createdAt: string;
  completedAt?: string;
}

// Singleton instance
export const x402 = new X402PaymentHandler();

// React hook for x402 payments
export function useX402() {
  const getWalletBalance = async (address: string) => {
    return x402.getBalance(address as `0x${string}`);
  };

  const payForAPI = async (params: {
    serviceId: string;
    serviceName: string;
    pricePerCall: number;
    calls: number;
    recipientAddress: string;
  }) => {
    const request = x402.createPaymentRequest({
      ...params,
      recipientAddress: params.recipientAddress as `0x${string}`,
    });

    // In production, this would:
    // 1. Open wallet connection
    // 2. Request signature for USDC transfer
    // 3. Submit transaction
    // 4. Wait for confirmation

    // For demo, simulate successful payment
    request.status = "completed";
    request.txHash = `0x${crypto.randomUUID().replace(/-/g, "")}`;
    request.completedAt = new Date().toISOString();

    return request;
  };

  return {
    getWalletBalance,
    payForAPI,
    createPaymentRequest: x402.createPaymentRequest.bind(x402),
  };
}
