import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, ArrowRight } from 'lucide-react';

export default function APIReferencePage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-5xl">
      <div className="mb-8">
        <Link
          href="/docs"
          className="text-muted-foreground hover:text-foreground text-sm mb-6 inline-block"
        >
          ← Back to Documentation
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-4">API Reference</h1>
        <p className="text-xl text-muted-foreground">
          Complete reference for OpenMarketAccess REST APIs
        </p>
      </div>

      <div className="space-y-8">
        <APISection
          title="Marketplace & Payments"
          description="Manage marketplace listings and handle x402 payments"
          endpoints={[
            {
              method: 'GET',
              path: '/api/listings',
              description: 'Get all listings with filtering and pagination',
              parameters: [
                {
                  name: 'category',
                  type: 'string',
                  description: 'Filter by category (mcp, agent, api, llm)',
                },
                {
                  name: 'pricing',
                  type: 'string',
                  description: 'Filter by pricing type (free, paid, usage)',
                },
                { name: 'search', type: 'string', description: 'Search in name and description' },
                {
                  name: 'sort',
                  type: 'string',
                  description: 'Sort order (rating, price-asc, price-desc, usage)',
                },
              ],
            },
            {
              method: 'GET',
              path: '/api/listings/:id',
              description: 'Get single listing details with reviews',
            },
            {
              method: 'POST',
              path: '/api/purchase/verify',
              description: 'Verify a Solana transaction for a marketplace purchase',
              body: {
                listingId: 'string',
                signature: 'string',
                amount: 'number',
                paymentType: 'string (credits, direct)',
              },
            },
            {
              method: 'POST',
              path: '/api/listings',
              description: 'Create new listing (authentication required)',
              body: {
                name: 'string',
                description: 'string',
                category: 'string',
                pricingType: 'string',
                price: 'number',
                endpoint: 'string',
                capabilities: 'string[]',
              },
            },
          ]}
        />

        <APISection
          title="LLM Gateway API"
          description="Access 400+ AI models through OpenRouter integration"
          endpoints={[
            {
              method: 'POST',
              path: '/api/llm/generate',
              description: 'Generate chat completions',
              body: {
                model: 'string (default: openai/gpt-4-turbo)',
                messages: 'array',
                temperature: 'number (default: 0.7)',
                maxTokens: 'number (default: 1000)',
                stream: 'boolean (default: false)',
              },
            },
            {
              method: 'GET',
              path: '/api/llm/models',
              description: 'List available LLM models',
              parameters: [
                {
                  name: 'capability',
                  type: 'string',
                  description: 'Filter by capability (chat, code, analysis, etc.)',
                },
                { name: 'search', type: 'string', description: 'Search in model names' },
              ],
            },
          ]}
        />

        <APISection
          title="x402 Verification API"
          description="Verify x402 payment protocol compliance"
          endpoints={[
            {
              method: 'GET',
              path: '/api/purchase/verify?id=:id',
              description: 'Check verification status',
            },
          ]}
        />

        <APISection
          title="Solana Actions API"
          description="Blink support for viral agent distribution"
          endpoints={[
            {
              method: 'OPTIONS',
              path: '/api/actions/:agentId',
              description: 'CORS headers for Blink support',
            },
            {
              method: 'GET',
              path: '/api/actions/:agentId',
              description: 'Get Action metadata (Blink schema)',
            },
            {
              method: 'POST',
              path: '/api/actions/:agentId',
              description: 'Generate signed transaction',
              body: {
                account: 'string',
              },
            },
          ]}
        />
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>SDK Libraries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <SDKCard
              name="OpenRouter Client"
              description="TypeScript client for LLM integration"
              install="npm install openai"
              link="/docs/sdk/openrouter"
            />
            <SDKCard
              name="x402 Client"
              description="Payment protocol verification client"
              install="npm install @x402/core @x402/fetch"
              link="/docs/sdk/x402"
            />
            <SDKCard
              name="Agent Executor"
              description="Agent execution and streaming"
              install="@/lib/agents/executor"
              link="/docs/sdk/executor"
            />
            <SDKCard
              name="Solana Actions"
              description="Blink integration for viral distribution"
              install="npm install @solana/actions"
              link="/docs/sdk/actions"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function APISection({
  title,
  description,
  endpoints,
}: {
  title: string;
  description: string;
  endpoints: Array<{
    method: string;
    path: string;
    description: string;
    parameters?: Array<{ name: string; type: string; description: string }>;
    body?: Record<string, string>;
  }>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {endpoints.map((endpoint, i) => (
            <div key={i} className="border-b last:border-0 pb-6 last:pb-0">
              <div className="flex items-start gap-3 mb-3">
                <Badge
                  variant={
                    endpoint.method === 'GET'
                      ? 'default'
                      : endpoint.method === 'POST'
                        ? 'secondary'
                        : 'outline'
                  }
                >
                  {endpoint.method}
                </Badge>
                <code className="text-sm bg-muted px-2 py-1 rounded flex-1 overflow-x-auto">
                  {endpoint.path}
                </code>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{endpoint.description}</p>

              {endpoint.parameters && endpoint.parameters.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold mb-2 uppercase text-muted-foreground">
                    Query Parameters
                  </p>
                  <div className="space-y-1">
                    {endpoint.parameters.map((param, j) => (
                      <div key={j} className="text-sm font-mono bg-muted/50 px-2 py-1 rounded">
                        <span className="text-primary">{param.name}</span>
                        <span className="text-muted-foreground">: {param.type}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          - {param.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {endpoint.body && (
                <div>
                  <p className="text-xs font-semibold mb-2 uppercase text-muted-foreground">
                    Request Body
                  </p>
                  <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                    <code>{JSON.stringify(endpoint.body, null, 2)}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SDKCard({
  name,
  description,
  install,
  link,
}: {
  name: string;
  description: string;
  install: string;
  link: string;
}) {
  return (
    <Link href={link} className="block border rounded-lg p-4 hover:bg-muted transition-colors">
      <div className="flex items-start gap-3">
        <Code className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          <code className="text-xs bg-muted px-2 py-1 rounded block">{install}</code>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
      </div>
    </Link>
  );
}
