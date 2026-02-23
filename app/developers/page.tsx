/**
 * OMA-AI Developers
 * SEO: Unique metadata, single H1
 */

import { Metadata } from "next";
import DevelopersPage from "./DevelopersClient";

export const metadata: Metadata = {
  title: "Developer Hub - SDKs, APIs & Integration Guides",
  description:
    "Build the next generation of autonomous agents with the OMA-AI SDK. Comprehensive tools for programmatic discovery, x402 payments, and MCP integration.",
  keywords: [
    "AI SDK",
    "autonomous agent development",
    "programmatic discovery",
    "agentic engineering",
    "x402 integration",
  ],
};

export default function Page() {
  return <DevelopersPage />;
}
