/**
 * OMA-AI x402 Facilitator Configuration
 *
 * This module configures x402 payment processing for Base and Solana networks
 */

import { HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { ExactSvmScheme } from "@x402/svm/exact/server";

/**
 * x402 Facilitator Configuration
 *
 * Supports both CDP (Coinbase) and custom facilitators
 */
export const facilitatorConfig = {
  // Production CDP Facilitator
  production: {
    url:
      process.env.X402_FACILITATOR_URL ||
      "https://api.cdp.coinbase.com/platform/v2/x402",
    apiKey: process.env.CDP_API_KEY || "",
  },

  // Testnet Facilitator (FREE, no API key needed)
  testnet: {
    url: process.env.X402_TESTNET_URL || "https://www.x402.org/facilitator",
    apiKey: "", // No API key needed for testnet
  },
};

/**
 * OMA-AI Treasury Wallet Addresses
 * These wallets receive x402 payments from agents
 */
export const treasuryWallets = {
  base:
    process.env.TREASURY_WALLET_BASE ||
    "0x590FdA238A52bBA79fD4635e73bDAC1eAe558e784",
  solana: process.env.TREASURY_WALLET_SOLANA || "YourSolanaAddress",
};

/**
 * x402 Network Identifiers (CAIP-2 format)
 */
export const networks = {
  base: {
    caip2: "eip155:8453",
    testnetCaip2: "eip155:84532",
    name: "Base",
    token: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
    decimals: 6,
  },
  solana: {
    caip2: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    testnetCaip2: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
    name: "Solana",
    token: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC on Solana
    decimals: 6,
  },
};

/**
 * Create Facilitator Client
 */
let facilitatorClient: HTTPFacilitatorClient | null = null;

export function getFacilitatorClient(): HTTPFacilitatorClient {
  const isProduction = process.env.NODE_ENV === "production";
  const config = isProduction
    ? facilitatorConfig.production
    : facilitatorConfig.testnet;

  if (!facilitatorClient) {
    facilitatorClient = new HTTPFacilitatorClient({
      url: config.url,
      ...(config.apiKey ? { apiKey: config.apiKey } : {}),
    });
  }

  return facilitatorClient;
}

/**
 * Get payment configuration for a service
 */
export interface ServicePaymentConfig {
  price: string;
  network: string;
  payTo: string;
  description?: string;
}

export function getServicePaymentConfig(
  priceUsdc: number,
  network: "base" | "solana",
): ServicePaymentConfig {
  const net = networks[network];
  const wallet =
    network === "base" ? treasuryWallets.base : treasuryWallets.solana;

  return {
    price: `$${priceUsdc.toFixed(3)}`,
    network: net.caip2,
    payTo: wallet,
    description: `Access to OMA-AI service on ${net.name}`,
  };
}
