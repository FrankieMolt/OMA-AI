/**
 * Documentation UI - Client Component
 */

"use client";

import React, { useState } from "react";
import {
  Search,
  BookOpen,
  Wallet,
  Code,
  Shield,
  Database,
  ExternalLink,
  ChevronRight,
  Terminal,
  Info,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// --- Types ---
interface DocSubsection {
  id: string;
  title: string;
  content: string;
  code?: string;
  externalLink?: string;
  externalLinkText?: string;
  note?: string;
  warning?: string;
  tip?: string;
}

interface DocSection {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  subsections: DocSubsection[];
}

// --- Documentation Content ---
const docSections: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: BookOpen,
    description: "Quick start guide to begin using OMA-AI",
    subsections: [
      {
        id: "introduction",
        title: "Introduction to OMA-AI",
        content:
          "OMA-AI is a decentralized API marketplace for autonomous AI agents. It enables agents to discover, access, and pay for APIs and MCP servers using x402 crypto payments on the Base network. Our platform eliminates the need for traditional API keys and credit cards, allowing seamless, autonomous agent commerce.",
        note: "OMA-AI supports both traditional APIs and Model Context Protocol (MCP) servers.",
      },
      {
        id: "architecture",
        title: "Core Architecture",
        content:
          "The OMA-AI ecosystem consists of three main components: the Marketplace (discovery), the x402 Protocol (payments), and the SDK (integration). Together, they form a cohesive environment where machines can interact with digital services without human intervention.",
      },
      {
        id: "quick-start",
        title: "Quick Start",
        content: "Get up and running with OMA-AI in minutes:",
        code: `# 1. Install the OMA-AI SDK\nnpm install @oma-ai/sdk\n\n# 2. Initialize your agent\nimport { OMAAgent } from '@oma-ai/sdk';\n\nconst agent = new OMAAgent({\n  walletAddress: '0x...',\n  network: 'base'\n});\n\n# 3. Discover and call APIs\nconst api = await agent.discoverAPI('gpt-4-turbo');\nconst result = await api.call({\n  messages: [{ role: 'user', content: 'Hello, world!' }]\n});`,
      },
    ],
  },
  {
    id: "x402-payments",
    title: "x402 Payments",
    icon: Wallet,
    description: "Integrate x402 crypto payments for API access",
    subsections: [
      {
        id: "overview",
        title: "Payment Overview",
        content:
          "x402 is a payment protocol built on Base that enables autonomous agents to pay for API usage autonomously. It uses smart contracts for trustless transactions and automatic billing. By utilizing Layer 2 scaling, we ensure that micropayments are feasible even for high-volume agent interactions.",
      },
      {
        id: "wallet-adapter",
        title: "Wallet Adapter Setup",
        content:
          "Configure your agent's wallet to make x402 payments. This requires a funded wallet on the Base network with USDC.",
        code: `import { X402WalletAdapter } from '@oma-ai/sdk';\n\nconst wallet = new X402WalletAdapter({\n  privateKey: process.env.WALLET_PRIVATE_KEY,\n  network: 'base',\n  gasLimit: 100000\n});`,
        tip: "Use environment variables for private keys. Never hardcode credentials in your source code.",
      },
    ],
  },
  {
    id: "mcp-integration",
    title: "MCP Integration",
    icon: Database,
    description: "Connect Model Context Protocol servers",
    subsections: [
      {
        id: "what-is-mcp",
        title: "What is MCP?",
        content:
          "Model Context Protocol (MCP) is an open standard that enables AI models to securely connect to external data sources and tools. OMA-AI acts as a discovery layer for MCP servers, allowing agents to find and connect to tools dynamically.",
        externalLink: "https://modelcontextprotocol.io",
        externalLinkText: "Official MCP documentation",
      },
    ],
  },
  {
    id: "api-reference",
    title: "API Reference",
    icon: Code,
    description: "Complete API documentation and endpoints",
    subsections: [
      {
        id: "rest-endpoints",
        title: "REST API Endpoints",
        content:
          "Direct HTTP endpoints for integration if you are not using our official SDK:",
        code: `# List all APIs\nGET /api/v1/apis\n\n# Call an API\nPOST /api/v1/apis/{id}/call\nHeaders: {\n  "Authorization": "Bearer {api_key}",\n  "X-Payment-Proof": "{x402_proof}"\n}`,
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
    description: "Security best practices",
    subsections: [
      {
        id: "api-keys",
        title: "API Key Security",
        content:
          "Protect your API keys at all costs. Since OMA-AI uses cryptographic proofs for many operations, the security of your private keys is paramount.",
        warning:
          "Never expose private keys or sensitive API keys in client-side code or public repositories.",
      },
    ],
  },
];

export default function DocsClient() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = docSections
    .map((section) => ({
      ...section,
      subsections: section.subsections.filter(
        (sub) =>
          sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.content.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((section) => section.subsections.length > 0);

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Search Header */}
      <section className="pt-32 pb-12 px-4 md:px-14 border-b border-memoria-border-muted">
        <div className="max-w-7xl mx-auto">
          <Badge
            variant="outline"
            className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4"
          >
            Knowledge Base
          </Badge>
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter mb-8 font-display text-memoria-text-hero">
            Documentation
          </h1>
          <div className="relative max-w-2xl">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-memoria-text-whisper"
              size={18}
            />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-memoria-bg-card border border-memoria-border-default rounded-sm text-white text-sm focus:outline-none focus:border-white transition-all"
              aria-label="Search documentation"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-14 py-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <nav
            className="sticky top-24 space-y-1"
            aria-label="Documentation sections"
          >
            {docSections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-left transition-all ${
                    isActive
                      ? "bg-memoria-text-hero text-memoria-bg-ultra-dark"
                      : "text-memoria-text-whisper hover:text-white hover:bg-memoria-bg-card"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={16} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    {section.title}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 max-w-4xl">
          {filteredSections.map((section) => {
            if (activeSection !== section.id && !searchQuery) return null;
            return (
              <div
                key={section.id}
                className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-memoria-bg-card border border-memoria-border-muted rounded-sm flex items-center justify-center">
                    <section.icon
                      className="text-memoria-text-hero"
                      size={24}
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-light text-memoria-text-hero font-display tracking-tight">
                      {section.title}
                    </h2>
                    <p className="text-sm text-memoria-text-meta">
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-12">
                  {section.subsections.map((sub) => (
                    <div key={sub.id} id={sub.id} className="group">
                      <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-xl font-normal text-memoria-text-hero group-hover:text-memoria-text-secondary transition-colors font-display">
                          {sub.title}
                        </h3>
                        <Link
                          href={`#${sub.id}`}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={`Jump to ${sub.title} section`}
                        >
                          <ChevronRight
                            size={14}
                            className="text-memoria-text-meta"
                          />
                        </Link>
                      </div>

                      <div className="prose prose-invert max-w-none text-memoria-text-whisper font-light leading-relaxed">
                        <p>{sub.content}</p>
                      </div>

                      {sub.code && (
                        <div className="mt-6 relative group/code">
                          <pre className="bg-memoria-bg-ultra-dark border border-memoria-border-muted p-6 rounded-sm overflow-x-auto text-xs font-mono text-memoria-text-hero leading-relaxed">
                            <code>{sub.code}</code>
                          </pre>
                        </div>
                      )}

                      {sub.note && (
                        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-sm flex gap-3">
                          <Info size={18} className="text-blue-500 shrink-0" />
                          <p className="text-xs text-blue-200/80 leading-relaxed">
                            <span className="font-bold text-blue-400">
                              Note:
                            </span>{" "}
                            {sub.note}
                          </p>
                        </div>
                      )}

                      {sub.warning && (
                        <div className="mt-6 p-4 bg-amber-500/5 border border-amber-500/20 rounded-sm flex gap-3">
                          <AlertTriangle
                            size={18}
                            className="text-amber-500 shrink-0"
                          />
                          <p className="text-xs text-amber-200/80 leading-relaxed">
                            <span className="font-bold text-amber-400">
                              Warning:
                            </span>{" "}
                            {sub.warning}
                          </p>
                        </div>
                      )}

                      {sub.tip && (
                        <div className="mt-6 p-4 bg-green-500/5 border border-green-500/20 rounded-sm flex gap-3">
                          <Lightbulb
                            size={18}
                            className="text-green-500 shrink-0"
                          />
                          <p className="text-xs text-green-200/80 leading-relaxed">
                            <span className="font-bold text-green-400">
                              Tip:
                            </span>{" "}
                            {sub.tip}
                          </p>
                        </div>
                      )}

                      {sub.externalLink && (
                        <Link
                          href={sub.externalLink}
                          target="_blank"
                          className="inline-flex items-center gap-2 mt-6 text-[10px] uppercase tracking-[0.2em] font-bold text-memoria-text-hero hover:text-memoria-text-secondary transition-colors no-underline"
                        >
                          {sub.externalLinkText} <ExternalLink size={12} />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
