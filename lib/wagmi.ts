/**
 * OMA-AI Wagmi Configuration
 *
 * Configures Wagmi for RainbowKit wallet integration
 */

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, baseSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "OMA-AI",
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
    "YOUR_WALLETCONNECT_PROJECT_ID",
  chains: [base, baseSepolia],
  ssr: true,
});
