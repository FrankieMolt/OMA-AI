/**
 * OMA-AI x402 Payment Integration — Barrel re-export
 *
 * All actual implementations live in ./server.ts.
 * Import from here or from './server' — both are equivalent.
 *
 * ⚠️  Do NOT add implementations here. Add them to ./server.ts.
 */

export {
  NETWORKS,
  dollarsToMicroUnits,
  microUnitsToDollars,
  createPaymentRequirement,
  create402Response,
  encodePaymentRequirement,
  decodePaymentRequirement,
  verifyBasePayment,
  requestFacilitatorPayment,
  verifyFacilitatorPayment,
  getUSDCBalance,
  USDC_ABI,
  type NetworkName,
  type PaymentRequirement,
  type X402PaymentConfig,
  type FacilitatorPaymentRequest,
  type FacilitatorPaymentResponse,
} from './server';
