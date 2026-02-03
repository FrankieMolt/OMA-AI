import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Wrench,
  ArrowRight,
  Search,
  ExternalLink,
} from 'lucide-react';

export default function TroubleshootingPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-5xl">
      <div className="mb-8">
        <Link
          href="/docs"
          className="text-muted-foreground hover:text-foreground text-sm mb-6 inline-block"
        >
          ← Back to Documentation
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Troubleshooting</h1>
        <p className="text-xl text-muted-foreground">Common issues and how to resolve them</p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-info" />
              Wallet Connection Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TroubleshootSection
              title="Wallet won't connect"
              status="error"
              solutions={[
                'Refresh the page and try connecting again',
                'Make sure your wallet extension is enabled in browser settings',
                'Try switching to a different browser (Chrome/Brave recommended)',
                'Clear your browser cache and cookies',
                'Disable other wallet extensions temporarily',
              ]}
            />
            <TroubleshootSection
              title="Wrong network detected"
              status="warning"
              solutions={[
                'Open your wallet and switch to Devnet network',
                'For TipLink: The wallet automatically switches to the correct network',
                "For Phantom/Solflare: Click network selector and choose 'Devnet'",
                'After switching, refresh the OMA page',
              ]}
            />
            <TroubleshootSection
              title="Transaction keeps failing"
              status="error"
              solutions={[
                'Ensure you have enough SOL for gas fees (~0.000005 SOL per transaction)',
                'Check that you have sufficient USDC balance for the payment',
                "Verify you're on the correct network (Devnet)",
                'Try the transaction with a smaller amount first',
                'Check Solana network status at explorer.solana.com',
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-accent" />
              Marketplace Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TroubleshootSection
              title="Can't find a listing"
              status="warning"
              solutions={[
                'Check your spelling and try different search terms',
                'Clear all filters to show all listings',
                'Try browsing by category instead of searching',
                'The listing might be temporarily unavailable - check back later',
              ]}
            />
            <TroubleshootSection
              title="Listing shows as 'unavailable'"
              status="error"
              solutions={[
                'The service provider might be experiencing downtime',
                'Check the service endpoint status if available',
                'Contact the provider through their listed contact information',
                'Try alternative listings in the same category',
              ]}
            />
            <TroubleshootSection
              title="Payment not processing"
              status="error"
              solutions={[
                'Verify your wallet has sufficient funds',
                'Check that x402 payment is supported by the service',
                'Try approving the transaction again',
                "Ensure you're using the correct currency (USDC)",
                'Contact support if the issue persists',
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Agent Execution Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TroubleshootSection
              title="Agent runs but returns errors"
              status="error"
              solutions={[
                'Verify your input parameters match the expected format',
                'Check if the agent supports the requested action',
                "Review the agent's documentation for usage examples",
                "Ensure you've paid the required amount (x402 error 402)",
                'Check if your payment signature is expired (> 5 mins)',
                'Try a simpler request to isolate the issue',
              ]}
            />
            <TroubleshootSection
              title="Agent execution hangs"
              status="warning"
              solutions={[
                'Wait a bit longer - some agents take time to process',
                'Check your network connection stability',
                'Try the request again - it might be a temporary issue',
                "Verify the agent's endpoint is responding",
                'Contact support if it persists for more than 5 minutes',
              ]}
            />
            <TroubleshootSection
              title="Can't view execution results"
              status="error"
              solutions={[
                'Refresh the page to load results',
                'Check if the execution completed successfully',
                "Verify you're logged into the correct account",
                'Try accessing results from a different browser/device',
                'Clear browser cache if results are corrupted',
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              LLM Gateway Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TroubleshootSection
              title="LLM request times out"
              status="error"
              solutions={[
                'Check your internet connection',
                'Reduce max_tokens in your request',
                'Try a smaller prompt to test the connection',
                "Verify the model you're using is available",
                'Check OpenRouter status at status.openrouter.ai',
              ]}
            />
            <TroubleshootSection
              title="API key errors"
              status="error"
              solutions={[
                'Verify your OpenRouter API key is configured in .env.local',
                'Ensure the API key has the correct permissions',
                'Regenerate your API key if it might be compromised',
                "Check that the API key hasn't expired",
                'Contact support if issues persist',
              ]}
            />
            <TroubleshootSection
              title="Model not found error"
              status="warning"
              solutions={[
                "Verify the model ID is correct (e.g., 'openai/gpt-4-turbo')",
                'Check the available models list at /api/llm/models',
                'Ensure the model is supported by OpenRouter',
                'Try a different model as a workaround',
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Help</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <HelpResource
                title="Documentation"
                description="Browse our comprehensive guides"
                href="/docs"
                icon={<Search className="h-5 w-5 text-primary" />}
              />
              <HelpResource
                title="Community Forum"
                description="Get help from other users"
                href="https://github.com/openmarketaccess/discussions"
                icon={<ExternalLink className="h-5 w-5 text-info" />}
              />
              <HelpResource
                title="Discord Server"
                description="Real-time chat with the community"
                href="https://discord.gg/oma"
                icon={<ExternalLink className="h-5 w-5 text-accent" />}
              />
              <HelpResource
                title="Support Email"
                description="Direct support from our team"
                href="mailto:support@openmarketaccess.com"
                icon={<CheckCircle className="h-5 w-5 text-success" />}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <StatusItem service="Marketplace API" status="operational" uptime="99.9%" />
              <StatusItem service="LLM Gateway" status="operational" uptime="99.5%" />
              <StatusItem service="x402 Facilitator" status="operational" uptime="99.8%" />
              <StatusItem
                service="Solana Devnet"
                status="degraded"
                uptime="N/A"
                note="Experiencing occasional delays"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 13, 2026 at 17:42 UTC
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <Button size="lg" asChild>
          <Link href="/marketplace">
            Back to Marketplace
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function TroubleshootSection({
  title,
  status,
  solutions,
}: {
  title: string;
  status: 'error' | 'warning' | 'success';
  solutions: string[];
}) {
  const statusIcon =
    status === 'error' ? (
      <XCircle className="h-5 w-5 text-destructive" />
    ) : status === 'warning' ? (
      <AlertTriangle className="h-5 w-5 text-warning" />
    ) : (
      <CheckCircle className="h-5 w-5 text-success" />
    );

  return (
    <div className="border-b last:border-0 pb-6 last:pb-0">
      <div className="flex items-start gap-3 mb-3">
        {statusIcon}
        <h4 className="font-semibold">{title}</h4>
      </div>
      <ul className="space-y-2 ml-8">
        {solutions.map((solution, i) => (
          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            {solution}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HelpResource({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="block border rounded-lg p-4 hover:bg-muted transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0">{icon}</div>
        <div className="flex-1">
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </a>
  );
}

function StatusItem({
  service,
  status,
  uptime,
  note,
}: {
  service: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: string;
  note?: string;
}) {
  const statusBadge =
    status === 'operational' ? (
      <Badge className="bg-success/10 text-success">Operational</Badge>
    ) : status === 'degraded' ? (
      <Badge className="bg-warning/10 text-warning">Degraded</Badge>
    ) : (
      <Badge className="bg-destructive/10 text-destructive">Down</Badge>
    );

  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div>
        <p className="font-medium text-sm">{service}</p>
        {note && <p className="text-xs text-muted-foreground">{note}</p>}
      </div>
      <div className="text-right">
        {statusBadge}
        <p className="text-xs text-muted-foreground mt-1">{uptime} uptime</p>
      </div>
    </div>
  );
}
