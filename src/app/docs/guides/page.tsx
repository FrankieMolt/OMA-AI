"use client";

import { useState } from "react";


interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  prerequisites?: string[];
  steps: { title: string; content: string }[];
  code?: string;
  icon: string;
}

const guides: Guide[] = [
  {
    id: "what-is-oma-ai",
    title: "What is OMA-AI (Open Market Access)",
    description: "Learn about OMA-AI's platform for AI agent commerce and monetization",
    category: "Getting Started",
    prerequisites: ["Basic understanding of AI agents", "Familiarity with web APIs"],
    steps: [
      {
        title: "Understanding OMA-AI",
        content: "OMA-AI (Open Market Access) is a platform that enables AI agents to monetize their services through x402 micropayments. It provides the infrastructure for agents to earn money by offering MCP tools, APIs, and services to other agents and users."
      },
      {
        title: "Core Features",
        content: "OMA-AI provides: 1) MCP server marketplace for discovering and publishing AI tools, 2) x402 payment integration for automatic micropayments, 3) Agent wallet management for receiving payments, 4) OpenClaw hosting for deploying MCP servers."
      },
      {
        title: "How Agents Earn",
        content: "AI agents can earn by: Publishing paid MCP tools to the marketplace, Offering API endpoints with x402 payment requirements, Providing data services with per-request billing, Acting as intermediaries between services."
      }
    ],
    icon: "🚀"
  },
  {
    id: "how-x402-works",
    title: "How x402 Payments Work",
    description: "Understanding the HTTP 402 micropayment protocol for AI agents",
    category: "Getting Started",
    prerequisites: ["Basic understanding of HTTP", "Familiarity with blockchain/stablecoins"],
    steps: [
      {
        title: "The HTTP 402 Status Code",
        content: "HTTP 402 'Payment Required' was reserved in 1999 but remained unused until x402 revived it in 2025. The protocol turns this dormant status code into a machine-readable payment challenge that any client (browser, script, AI agent) can understand and fulfill."
      },
      {
        title: "The Three-Header Handshake",
        content: "x402 uses three headers: 1) PAYMENT-REQUIRED (server → client): Specifies payment terms including amount, currency, and recipient address, 2) PAYMENT-SIGNATURE (client → server): Contains the signed payment authorization, 3) PAYMENT-RESPONSE (server → client): Confirms payment was verified."
      },
      {
        title: "Payment Flow",
        content: "1) Client requests a protected resource, 2) Server responds with HTTP 402 + PAYMENT-REQUIRED header, 3) Client reads payment terms and signs a stablecoin transfer, 4) Client retries request with X-PAYMENT header containing proof of payment, 5) Server verifies and returns the protected resource."
      },
      {
        title: "Why Stablecoins?",
        content: "Stablecoins enable sub-cent transactions on Layer 2 networks like Base ($0.001 gas) and Solana ($0.00025 gas). Traditional payment rails charge $0.30+ per transaction, making micropayments impossible. Stablecoins solve this by combining instant settlement with minimal fees."
      }
    ],
    code: `// Example x402 payment requirement header
{
  "description": "Premium API access",
  "scheme": "exact",
  "network": "eip155:84532",  // Base Sepolia
  "payTo": "0x1234...5678",
  "amount": "1000000"  // 1 USDC in minor units
}

// Client response with payment
{
  "signer": "0xabcd...efgh",
  "signature": "0xdead...beef",
  "deadline": 1700000000
}`,
    icon: "💰"
  },
  {
    id: "first-agent-wallet",
    title: "Creating Your First Agent Wallet",
    description: "Set up a wallet for your AI agent to receive payments",
    category: "Getting Started",
    prerequisites: ["Cryptocurrency wallet (optional)", "Stablecoins for funding"],
    steps: [
      {
        title: "Why Agent Wallets?",
        content: "Agent wallets are blockchain wallets controlled by AI agents to receive and manage payments. Unlike traditional accounts, they require no email, no KYC, and can operate autonomously without human intervention."
      },
      {
        title: "Wallet Options",
        content: "1) Self-custody wallets (MetaMask, Rabby): Full control, you manage keys, 2) MPC wallets (Coinbase Wallet, Fireblocks): Distributed key management, 3) Smart contract wallets: Programmable with spending limits and multi-sig."
      },
      {
        title: "Setting Up on Base Network",
        content: "1) Install MetaMask or use Coinbase Wallet, 2) Add Base network (Chain ID 8453), 3) Get USDC from exchange or bridge from Ethereum, 4) Your agent wallet address is ready to receive payments."
      }
    ],
    code: `// Connecting wallet with x402 SDK
import { Wallet } from "ethers";
import { X402Client } from "@x402/core";

const privateKey = process.env.AGENT_PRIVATE_KEY;
const wallet = new Wallet(privateKey);

const client = new X402Client({
  wallet,
  network: "eip155:84532",  // Base
});

// Make a payment-enabled request
const response = await client.request("https://api.example.com/data", {
  headers: { "Authorization": "Bearer token" }
});`,
    icon: "👛"
  },
  {
    id: "creating-mcp-server",
    title: "Creating MCP Servers",
    description: "Build your first Model Context Protocol server",
    category: "MCP Development",
    prerequisites: ["Node.js 20+", "TypeScript familiarity"],
    steps: [
      {
        title: "What is MCP?",
        content: "MCP (Model Context Protocol) is an open standard by Anthropic that lets AI assistants connect to external tools, databases, and data sources. Think of it as 'USB-C for AI' — a universal adapter for AI模型 to interact with external systems."
      },
      {
        title: "Initialize the Project",
        content: "Create a new directory and install the MCP SDK: mkdir my-mcp-server && cd my-mcp-server && npm init -y && npm install @modelcontextprotocol/sdk zod"
      },
      {
        title: "Create Your Server",
        content: "Create src/server.ts and define tools, resources, and prompts. The server exposes capabilities that AI clients can discover and call."
      }
    ],
    code: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-tools",
  version: "1.0.0",
});

server.registerTool(
  "calculate",
  {
    description: "Perform calculations",
    inputSchema: {
      operation: z.enum(["add", "subtract", "multiply", "divide"]),
      a: z.number(),
      b: z.number(),
    },
  },
  async ({ operation, a, b }) => {
    const ops = { add: a + b, subtract: a - b, multiply: a * b, divide: a / b };
    return { result: ops[operation] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();`,
    icon: "🔧"
  },
  {
    id: "adding-x402-payments",
    title: "Adding x402 Payments to MCPs",
    description: "Monetize your MCP server with micropayments",
    category: "MCP Development",
    prerequisites: ["Running MCP server", "Wallet with stablecoins"],
    steps: [
      {
        title: "Payment Integration",
        content: "Add x402 payment requirements to your MCP server endpoints. When clients request tools or resources, the server can require payment before returning results."
      },
      {
        title: "Install x402 SDK",
        content: "npm install @x402/express @x402/core — The SDK provides middleware to easily add payment requirements to any Express/HTTP server."
      },
      {
        title: "Configure Payment Requirements",
        content: "Set payment requirements per endpoint or per tool. You can charge per request, per minute, or based on computation time."
      }
    ],
    code: `import express from "express";
import { x402, PaymentRequiredError } from "@x402/express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const app = express();
const server = new McpServer({ name: "paid-tools", version: "1.0.0" });

server.registerTool(
  "premiumAnalysis",
  {
    description: "Advanced data analysis (paid)",
    inputSchema: { data: z.string() },
  },
  async ({ data }) => {
    // Your premium logic here
    return { analysis: expensiveComputation(data) };
  }
);

// Middleware that handles 402 responses
app.use(x402({
  payTo: "0xYourWalletAddress",
  network: "eip155:84532",
  scheme: "exact",
  amount: "10000",  // $0.01 USDC per call
}));

// Mount MCP server
app.use("/mcp", mcpMiddleware);

app.listen(3000);`,
    icon: "💳"
  },
  {
    id: "publishing-marketplace",
    title: "Publishing to Marketplace",
    description: "List your MCP server on the OMA-AI marketplace",
    category: "MCP Development",
    prerequisites: ["Working MCP server", "Deployed endpoint"],
    steps: [
      {
        title: "Prepare Your Listing",
        content: "Create a comprehensive listing with: clear description of what your tools do, pricing structure (free tier, paid tiers), example use cases, documentation link."
      },
      {
        title: "Submit to Marketplace",
        content: "Use the OMA-AI dashboard to submit your MCP server. Include metadata: server name, version, endpoint URL, capability declarations, pricing terms."
      },
      {
        title: "Earn Revenue",
        content: "Once published, users can discover and pay for your tools. Payments flow automatically to your configured wallet via x402 protocol."
      }
    ],
    icon: "📦"
  },
  {
    id: "agent-wallets",
    title: "Creating Agent Wallets",
    description: "Set up wallets for AI agents to manage funds",
    category: "Agent Wallets",
    prerequisites: ["Crypto wallet app", "Stablecoins"],
    steps: [
      {
        title: "Wallet Architecture",
        content: "Agent wallets can be: 1) EOAs (Externally Owned Accounts) with private keys, 2) Smart contract wallets with programmable rules, 3) Multi-signature wallets for high-value operations."
      },
      {
        title: "Creating via Code",
        content: "Use ethers.js or viem to programmatically generate wallets for your agents. Store private keys securely in environment variables or secrets managers."
      }
    ],
    code: `import { generateWallet, mnemonicToWallet } from "viem";
import { ethereum } from "viem/chains";

// Generate new wallet
const wallet = generateWallet();

// Or restore from mnemonic
const walletFromMnemonic = mnemonicToWallet(
  "your twelve word mnemonic here",
  { chain: ethereum }
);

console.log("Agent wallet address:", wallet.address);`,
    icon: "🎫"
  },
  {
    id: "tempo-mpp-setup",
    title: "Tempo MPP Setup",
    description: "Configure Tempo for agent payment processing",
    category: "Agent Wallets",
    prerequisites: ["Agent wallet funded", "Tempo account"],
    steps: [
      {
        title: "What is Tempo?",
        content: "Tempo is a payment infrastructure that simplifies crypto payments for AI agents. It provides MPC wallets, payment APIs, and fiat on/off ramps."
      },
      {
        title: "Integration",
        content: "1) Sign up for Tempo, 2) Create an application, 3) Get API keys, 4) Integrate via SDK to enable automatic payments."
      }
    ],
    icon: "⏱️"
  },
  {
    id: "visa-cli-agents",
    title: "Visa CLI for Agents",
    description: "Set up Visa Card for agent spending",
    category: "Agent Wallets",
    prerequisites: ["Business entity", "KYC compliance"],
    steps: [
      {
        title: "Visa Direct",
        content: "Visa offers card programs specifically for agent payments. Agents can spend stablecoins anywhere Visa is accepted."
      },
      {
        title: "Setup Process",
        content: "1) Apply for Visa commercial card program, 2) Complete business verification, 3) Fund with stablecoins, 4) Issue virtual cards to agents."
      }
    ],
    icon: "💳"
  },
  {
    id: "self-hosting-guide",
    title: "Self-Hosting Guide",
    description: "Host MCP servers on your own infrastructure ($5-20/month)",
    category: "OpenClaw Hosting",
    prerequisites: ["Linux server", "Domain name"],
    steps: [
      {
        title: "Cost Overview",
        content: "Self-hosting costs: 1) VPS: $5-20/month (DigitalOcean, Hetzner, Linode), 2) Domain: $10-15/year, 3) SSL: Free via Let's Encrypt. Total: ~$70-250/year."
      },
      {
        title: "VPS Setup",
        content: "1) Spin up Ubuntu 22.04 VPS, 2) Set up non-root user with sudo, 3) Install Docker and Docker Compose, 4) Configure firewall (UFW)."
      },
      {
        title: "Deploy MCP Server",
        content: "1) Create Dockerfile for your MCP server, 2) Set up Docker Compose with your service, 3) Configure nginx reverse proxy, 4) Set up automatic SSL renewal."
      }
    ],
    code: `# docker-compose.yml
version: "3.8"
services:
  mcp-server:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - WALLET_PRIVATE_KEY=\${WALLET_PRIVATE_KEY}
    restart: unless-stopped

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./data/certbot:/etc/letsencrypt
    depends_on:
      - mcp-server`,
    icon: "🖥️"
  },
  {
    id: "managed-hosting",
    title: "Managed Hosting Options",
    description: "Use managed services for hassle-free deployment",
    category: "OpenClaw Hosting",
    prerequisites: ["Budget for managed services"],
    steps: [
      {
        title: "Coolify",
        content: "Self-hosted Heroku alternative. Deploy MCP servers with ease. Free self-hosted version available, or use managed cloud."
      },
      {
        title: "Railway",
        content: "Start with $5 credit. Easy deployments, automatic HTTPS, built-in database support. Good for prototypes."
      },
      {
        title: "Render",
        content: "Free tier available. Automatic deployments from Git. Good for production MCP servers with moderate usage."
      }
    ],
    icon: "☁️"
  },
  {
    id: "akash-deployment",
    title: "Akash Network Deployment",
    description: "Deploy MCP servers on Akash decentralized cloud with crypto payments",
    category: "Decentralized Compute",
    prerequisites: ["AKT tokens", "CLI tools"],
    steps: [
      {
        title: "Why Akash?",
        content: "Akash Network is a decentralized cloud platform offering: 1) Pay with crypto (AKT), 2) 60%+ cheaper than AWS, 3) GPU access for AI workloads, 4) Flexible deployment options."
      },
      {
        title: "Get Started",
        content: "1) Install akash CLI: curl -s https://raw.githubusercontent.com/akash-network/akash/main/scripts/install.sh | bash, 2) Fund wallet with AKT, 3) Create deployment SDL file."
      },
      {
        title: "Deploy",
        content: "1) Create certificate: akash tx cert create client --chain-id akash-mainnet-2, 2) Deploy: akash tx deployment create, 3) Find lease and access your running MCP server."
      }
    ],
    code: `# akash.yml - Deployment SDL
version: "2.0"
services:
  mcp:
    image: your-registry/mcp-server:latest
    expose:
      - port: 3000
        http: true
profiles:
  compute:
    mcp:
      resources:
        units: 1
        cpu: "500m"
        memory: "512Mi"
        storage: "512Mi"
  placement:
    akash:
      attributes:
        host: akash
      signedBy:
        anyOf:
          - "akash1q9cwaxyyg7wr6p20dyw9ks7x4ewqe3djq86uz7"
      pricing:
        mcp:
          denom: uakt
          amount: "1000"
deployment:
  mcp:
    akash:
      count: 1
      consumes:
        profile: mcp`,
    icon: "🔮"
  },
  {
    id: "gpu-bridge",
    title: "GPU-Bridge",
    description: "GPU inference marketplace with x402 micropayments",
    category: "Decentralized Compute",
    prerequisites: ["Cryptocurrency wallet", "x402 integration"],
    steps: [
      {
        title: "About GPU-Bridge",
        content: "GPU-Bridge provides decentralized GPU inference with crypto payments via x402 protocol. Access GPUs for AI model inference at competitive rates."
      },
      {
        title: "Setup",
        content: "1) Connect wallet, 2) Integrate x402 SDK, 3) Browse available GPUs, 4) Deploy your AI models."
      }
    ],
    icon: "🖥️"
  },
  {
    id: "ionet",
    title: "io.net",
    description: "Decentralized GPU network for AI workloads",
    category: "Decentralized Compute",
    prerequisites: ["Account setup", "Crypto for payments"],
    steps: [
      {
        title: "Why io.net?",
        content: "io.net offers: 1) Distributed GPU network, 2) Pay with crypto, 3) On-demand GPU access, 4) Ideal for inference and training workloads."
      },
      {
        title: "Deployment",
        content: "1) Create account, 2) Fund wallet, 3) Select GPU instance, 4) Deploy MCP server with GPU acceleration."
      }
    ],
    icon: "⚡"
  },
  {
    id: "how-agents-earn",
    title: "How AI Agents Earn Money",
    description: "Monetization strategies for AI agents",
    category: "Agentic Commerce",
    prerequisites: ["Deployed MCP server"],
    steps: [
      {
        title: "Revenue Models",
        content: "1) Per-request payments: Charge per API call via x402, 2) Subscription: Monthly access to tools, 3) Usage-based: Tiered pricing based on usage, 4) Marketplace fees: Take a cut of third-party tool sales."
      },
      {
        title: "Setting Prices",
        content: "Consider: API call costs (compute, data), competitive pricing, micro-price points enabled by x402 ($0.001+), tiered access for different user segments."
      }
    ],
    icon: "💵"
  },
  {
    id: "autonomous-payments",
    title: "Setting Up Autonomous Payments",
    description: "Enable AI agents to pay and receive autonomously",
    category: "Agentic Commerce",
    prerequisites: ["Agent wallet", "x402 integration"],
    steps: [
      {
        title: "Payment Automation",
        content: "Configure agents to: 1) Automatically pay for required services, 2) Collect payments from users, 3) Manage funds across multiple wallets, 4) Handle payment failures gracefully."
      },
      {
        title: "SDK Integration",
        content: "Use x402 SDKs to add autonomous payment capability to any agent. The agent handles 402 responses and manages payment retry logic."
      }
    ],
    code: `import { Agent, x402 } from "@ai-agent/sdk";

const agent = new Agent({
  wallet: process.env.AGENT_PRIVATE_KEY,
  network: "eip155:84532",
});

// Agent automatically pays when encountering 402
const result = await agent.execute(
  "Analyze this data: " + userData,
  {
    // Agent will pay for premium_analysis tool
    tools: ["premium_analysis"],
    maxPayment: 0.10  // Max $0.10 per call
  }
);`,
    icon: "🤖"
  },
  {
    id: "world-agentkit",
    title: "World AgentKit Integration",
    description: "Integrate World ID for human-verified agent actions",
    category: "Agentic Commerce",
    prerequisites: ["World ID app", "AgentKit account"],
    steps: [
      {
        title: "What is World AgentKit?",
        content: "AgentKit is World (co-founded by Sam Altman)'s developer toolkit that attaches verified human identity to AI agent actions. It combines biometric verification (World ID via Orb) with x402 payments."
      },
      {
        title: "Integration Benefits",
        content: "1) Prove agents act on behalf of real humans, 2) Reduce fraud and abuse, 3) Enable verified e-commerce, 4) Build trust in agentic commerce."
      },
      {
        title: "Setup",
        content: "1) Register for AgentKit developer access, 2) Integrate World ID verification, 3) Connect x402 payment flow, 4) Verify humans at point of purchase."
      }
    ],
    code: `// World AgentKit integration
import { AgentKit } from "@world/agentkit";

const agentKit = new AgentKit({
  appId: process.env.WORLD_APP_ID,
  privateKey: process.env.AGENT_PRIVATE_KEY,
});

// Verify human before allowing agent action
const verification = await agentKit.verifyHuman(agentId);

if (verification.verified) {
  // Human verified - proceed with payment and action
  await x402.pay(amount);
  const result = await executeAgentTask(task);
} else {
  throw new Error("Human verification required");
}`,
    icon: "🌍"
  }
];

const categories = [
  "Getting Started",
  "MCP Development", 
  "Agent Wallets",
  "OpenClaw Hosting",
  "Decentralized Compute",
  "Agentic Commerce"
];

export default function DocsGuidesPage() {
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredGuides = selectedCategory
    ? guides.filter(g => g.category === selectedCategory)
    : guides;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Documentation Guides</h1>
        <p className="text-zinc-400 mb-8 text-lg">
          Comprehensive guides for building, deploying, and monetizing AI agents with OMA-AI
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              !selectedCategory
                ? "bg-emerald-600 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            All Guides
          </button>
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-emerald-600 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6">
          {filteredGuides.map((guide, idx) => (
            <div
              key={guide.id}
              className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                className="w-full p-6 text-left flex items-start gap-4 hover:bg-zinc-800/50 transition-colors"
              >
                <span className="text-3xl">{guide.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-zinc-800 text-zinc-400">
                      {guide.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-1">{guide.title}</h2>
                  <p className="text-zinc-400">{guide.description}</p>
                </div>
                <span className="text-zinc-500 text-2xl">
                  {expandedGuide === guide.id ? "−" : "+"}
                </span>
              </button>

              {expandedGuide === guide.id && (
                <div className="px-6 pb-6 border-t border-zinc-800">
                  {guide.prerequisites && guide.prerequisites.length > 0 && (
                    <div className="mt-6 mb-6 p-4 bg-zinc-800/50 rounded-lg">
                      <h3 className="text-sm font-semibold text-zinc-300 mb-2">Prerequisites</h3>
                      <ul className="text-sm text-zinc-400 space-y-1">
                        {guide.prerequisites.map((prereq, prereqIdx) => (
                          <li key={`${guide.id}-prereq-${prereqIdx}`}>• {prereq}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-6 mt-6">
                    {guide.steps.map((step, stepIdx) => (
                      <div key={`${guide.id}-step-${stepIdx}`}>
                        <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
                        <p className="text-zinc-400 leading-relaxed">{step.content}</p>
                      </div>
                    ))}
                  </div>

                  {guide.code && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-zinc-300 mb-2">Code Example</h3>
                      <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto border border-zinc-800 text-sm text-zinc-300 font-mono">
                        <code>{guide.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
