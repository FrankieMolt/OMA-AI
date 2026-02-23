import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About OMA-AI | The Agentic Marketplace for AI",
  description:
    "Discover OMA-AI, the premier marketplace for AI agents, MCP servers, and APIs. Build, trade, and deploy autonomous agents with x402 crypto payments.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
