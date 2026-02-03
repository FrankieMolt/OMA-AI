import Link from 'next/link';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Server,
  Plug,
  ArrowRight,
  CheckCircle,
  Zap,
  Database,
  Code2,
  Shield,
  Layers,
} from 'lucide-react';
import { DocsToc } from '@/components/docs/DocsToc';
import { CodeBlock } from '@/components/ui/code-block';

export const metadata: Metadata = {
  title: 'MCP Servers - OpenMarketAccess',
  description:
    'Connect your tools to any AI model with Model Context Protocol. Deploy and monetize MCP servers on OpenMarketAccess.',
  keywords: ['MCP', 'Model Context Protocol', 'tools', 'integration', 'Claude', 'GPT-4'],
};

export default function McpServersPage() {
  return (
    <div className="container mx-auto py-10 px-0 max-w-4xl">
      <Link
        href="/docs"
        className="text-muted-foreground hover:text-foreground text-sm mb-6 inline-block"
      >
        ← Back to Documentation
      </Link>

      <div className="mb-8">
        <Badge variant="outline" className="mb-4">
          Core Concept
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">MCP Servers</h1>
        <p className="text-xl text-muted-foreground">
          Connect your tools to any AI model with Model Context Protocol
        </p>
      </div>

      <DocsToc />

      <div className="prose prose-invert max-w-none space-y-12">
        <section id="overview">
          <p className="text-lg leading-relaxed">
            <strong>Model Context Protocol (MCP)</strong> is an open standard that enables AI models
            to connect with external tools, data sources, and APIs. OMA provides a marketplace for
            MCP servers, making it easy to discover, deploy, and monetize your tools.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <Card className="bg-info/10 border-info/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Server className="h-5 w-5 text-info" />
                  Universal Compatibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Works with Claude, GPT-4, and any LLM that supports MCP
                </p>
              </CardContent>
            </Card>
            <Card className="bg-success/10 border-success/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plug className="h-5 w-5 text-success" />
                  Easy Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Standardized interface - plug and play with any MCP client
                </p>
              </CardContent>
            </Card>
            <Card className="bg-accent/10 border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Monetize Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Earn USDC every time someone uses your MCP server
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="how-mcp-works">
          <h2 className="text-2xl font-bold mb-6">How MCP Works</h2>

          <div className="space-y-6">
            <Card className="glass-card border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">The MCP Architecture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-sm">MCP Server</p>
                    <p className="text-xs text-muted-foreground">
                      Your tool exposes capabilities via standard endpoints
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-sm">OMA Gateway (x402 Proxy)</p>
                    <p className="text-xs text-muted-foreground">
                      OMA intercepts requests, enforcing x402 payment and rate limits
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-sm">MCP Client</p>
                    <p className="text-xs text-muted-foreground">
                      AI model (Claude, GPT-4) connects via the Gateway
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Tool Execution</p>
                    <p className="text-xs text-muted-foreground">
                      Model calls your tools, paying micropayments per interaction
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="mcp-capabilities">
          <h2 className="text-2xl font-bold mb-6">MCP Capabilities</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="glass-card border-border/60">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database className="h-5 w-5 text-info" />
                  Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Expose functions that AI models can call
                </p>
                <CodeBlock
                  language="typescript"
                  code={`server.tool('get_weather', 'Get current weather', {
  location: {
    type: 'string',
    description: 'City name or coordinates'
  }
}, async ({ location }) => {
  const data = await weatherAPI(location);
  return {
    temperature: data.temp,
    humidity: data.humidity,
    conditions: data.description
  };
});`}
                />
              </CardContent>
            </Card>

            <Card className="glass-card border-border/60">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Layers className="h-5 w-5 text-success" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Provide data that models can access directly
                </p>
                <CodeBlock
                  language="typescript"
                  code={`server.resource('user_data', 'User Profile Data', {
  uri: 'users://profile/{id}',
  mimeType: 'application/json',
  description: 'User profile information'
}, async ({ uri }) => {
  const userId = uri.split('/').pop();
  return await getUserProfile(userId);
});`}
                />
              </CardContent>
            </Card>

            <Card className="glass-card border-border/60">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-accent" />
                  Prompts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Define reusable prompt templates
                </p>
                <CodeBlock
                  language="typescript"
                  code={`server.prompt('code_review', 'Code Review Template', {
  description: 'Review code for bugs and improvements',
  arguments: [
    {
      name: 'code',
      description: 'Code to review',
      required: true
    },
    {
      name: 'language',
      description: 'Programming language',
      required: false
    }
  ]
});`}
                />
              </CardContent>
            </Card>

            <Card className="glass-card border-border/60">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-warning" />
                  Authentication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Secure your MCP server with authentication
                </p>
                <CodeBlock
                  language="typescript"
                  code={`const server = new McpServer({
  name: 'my-api',
  version: '1.0.0',
  authentication: {
    type: 'api_key',
    provider: 'oma',
    validateToken: async (token) => {
      return await verifyToken(token);
    }
  }
});`}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="typescript-implementation">
          <h2 className="text-2xl font-bold mb-6">TypeScript Implementation</h2>

          <div className="space-y-6">
            <Card className="glass-card border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">Complete MCP Server Example</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="typescript"
                  code={`import { McpServer } from '@oma/sdk';

// Initialize MCP server
const server = new McpServer({
  name: 'weather-api',
  version: '1.0.0',
  description: 'Weather data and forecasts',
  transport: {
    type: 'http',
    port: 3000,
    host: 'localhost'
  }
});

// Define a tool
server.tool('get_weather', 'Get current weather for a location', {
  location: {
    type: 'string',
    description: 'City name or coordinates (lat,lon)',
    required: true
  },
  units: {
    type: 'string',
    description: 'Temperature units (celsius or fahrenheit)',
    enum: ['celsius', 'fahrenheit'],
    default: 'celsius'
  }
}, async ({ location, units = 'celsius' }) => {
  try {
    // Call external API
    const response = await fetch(
      \`https://api.weather.example.com/current?location=\${location}&units=\${units}\`
    );
    const data = await response.json();
    
    // Return structured result
    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      conditions: data.weather[0].description,
      location: data.name,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    throw new Error(\`Failed to fetch weather: \${error.message}\`);
  }
});

// Define a resource
server.resource('forecasts', 'Weather Forecasts', {
  uri: 'weather://forecasts/{location}',
  mimeType: 'application/json',
  description: '7-day weather forecasts for any location'
}, async ({ uri }) => {
  const location = uri.split('/').pop();
  const forecasts = await getForecasts(location);
  return forecasts;
});

// Start the server
await server.listen();

console.log('MCP Server running on http://localhost:3000');`}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="x402-integration">
          <h2 className="text-2xl font-bold mb-6">x402 Payment Integration</h2>
          <p className="mb-4">Add x402 payment support to monetize your MCP server:</p>

          <CodeBlock
            language="typescript"
            code={`import { withX402 } from '@x402/next';
import { McpServer } from '@oma/sdk';

const server = new McpServer({
  name: 'premium-api',
  version: '1.0.0',
  x402: {
    enabled: true,
    pricing: {
      perCall: 0.01,  // USDC per tool call
      freeCalls: 10,     // First 10 calls are free
      subscription: {
        monthly: 1.00,  // Unlimited calls for $1/month
        benefits: ['unlimited', 'priority', 'support']
      }
    }
  }
});

// Apply x402 middleware to your tools
server.tool('premium_data', 'Get premium data', {
  input: { type: 'string' }
}, withX402(async ({ input }) => {
  // Your tool logic here
  return await getPremiumData(input);
}, {
  amount: 0.01,
  token: 'USDC',
  network: 'devnet'
}));`}
          />

          <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/20">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm mb-1">Payment Flow</p>
                <p className="text-sm text-muted-foreground">
                  OMA handles payment verification automatically. Users pay with their Solana
                  wallet, and revenue is deposited directly to your wallet address. No credit cards
                  or KYC required.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="deployment">
          <h2 className="text-2xl font-bold mb-6">Deployment</h2>

          <div className="space-y-6">
            <Card className="glass-card border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">Deployment Options</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Railway</p>
                      <p className="text-xs text-muted-foreground">
                        One-click deployment with auto SSL
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Render</p>
                      <p className="text-xs text-muted-foreground">
                        Free tier available, fast startup times
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Vercel</p>
                      <p className="text-xs text-muted-foreground">
                        Serverless functions, global CDN
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Docker</p>
                      <p className="text-xs text-muted-foreground">
                        Containerized deployment for any cloud
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-warning/10 border-warning/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-warning" />
                  Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>Use clear, descriptive names for tools and resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>Provide detailed input/output schemas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>Implement proper error handling and validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>Add comprehensive documentation for each tool</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>Monitor performance and uptime</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>Offer a free tier for discovery</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="publishing-to-oma">
          <h2 className="text-2xl font-bold mb-6">Publishing to OMA</h2>

          <div className="space-y-4">
            <StepItem number="1" text="Create an MCP server with @oma/sdk" />
            <StepItem number="2" text="Test locally and ensure all tools work" />
            <StepItem number="3" text="Deploy to Railway, Render, or any hosting platform" />
            <StepItem number="4" text="Create a listing on OMA marketplace" />
            <StepItem number="5" text="Set your pricing (free, per-call, or subscription)" />
          </div>

          <div className="mt-6 p-6 rounded-lg bg-primary/5 border border-primary/10">
            <h3 className="font-bold mb-2">💡 Pro Tip</h3>
            <p className="text-muted-foreground">
              MCP servers with clear documentation and reliable uptime get more users. Consider
              offering a free tier for discovery, then premium features for power users.
            </p>
          </div>
        </section>

        <section id="next-steps">
          <div className="flex gap-4 mt-12">
            <Link
              href="/docs/quick-start"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Quick Start Guide
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border/60 text-foreground font-bold rounded-lg hover:bg-foreground/5 transition-colors"
            >
              Browse MCP Servers
              <Plug className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function StepItem({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
        {number}
      </div>
      <span className="text-sm">{text}</span>
    </div>
  );
}
