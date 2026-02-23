import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | OMA-AI Platform Capabilities",
  description:
    "Explore OMA-AI features: API marketplace, MCP integration, x402 payments, bounties system, and agent-to-agent commerce infrastructure.",
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
