import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, CheckCircle, Shield, AlertCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function WalletGuidePage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-5xl">
      <div className="mb-8">
        <Link
          href="/docs"
          className="text-muted-foreground hover:text-foreground text-sm mb-6 inline-block"
        >
          ← Back to Documentation
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Wallet Guide</h1>
        <p className="text-xl text-muted-foreground">Connect your wallet and start using OMA</p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              TipLink: Zero-Cost Embedded Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              To use OpenMarketAccess, you need a Solana wallet. We recommend{' '}
              <strong>Phantom</strong> or <strong>Solflare</strong>. For the easiest onboarding, use{' '}
              <strong>TipLink</strong> (Google Login).
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <FeatureBox
                icon={<CheckCircle className="h-5 w-5 text-success" />}
                title="Zero Cost"
                description="Free to use with standard adapter - no SaaS fees"
              />
              <FeatureBox
                icon={<CheckCircle className="h-5 w-5 text-success" />}
                title="Social Login"
                description="Login with Google, Twitter, or email"
              />
              <FeatureBox
                icon={<CheckCircle className="h-5 w-5 text-success" />}
                title="Non-Custodial"
                description="You control your private keys"
              />
              <FeatureBox
                icon={<CheckCircle className="h-5 w-5 text-success" />}
                title="Instant Setup"
                description="Wallet created in seconds, no seed phrase"
              />
            </div>

            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm font-medium mb-2">How It Works</p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Click &quot;Connect Wallet&quot; in the navigation bar</li>
                <li>Select &quot;OMA Wallet&quot; (TipLink) from the wallet options</li>
                <li>Sign in with your preferred social provider</li>
                <li>Your wallet is ready! No seed phrase required</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supported Wallets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <WalletCard
                name="TipLink (OMA Wallet)"
                type="Embedded"
                status="Recommended"
                features={['Social Login', 'Zero Cost', 'Non-Custodial']}
              />
              <WalletCard
                name="Phantom"
                type="Browser Extension"
                status="Supported"
                features={['Popular', 'Feature Rich', 'DeFi Native']}
              />
              <WalletCard
                name="Solflare"
                type="Browser Extension"
                status="Supported"
                features={['Staking', 'NFT Support', 'Swaps']}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funding Your Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <Step
                number={1}
                title="Get Testnet SOL"
                description="Since OMA runs on Devnet, you'll need testnet SOL for transactions."
              >
                <div className="mt-3 space-y-2">
                  <ResourceLink
                    href="https://faucet.solana.com"
                    title="Solana Faucet"
                    description="Get 1 SOL on Devnet"
                  />
                  <ResourceLink
                    href="https://solfaucet.com"
                    title="SolFaucet"
                    description="Alternative testnet faucet"
                  />
                </div>
              </Step>

              <Step
                number={2}
                title="Swap to USDC"
                description="Most OMA services accept USDC payments. Use a DEX like Jupiter to swap SOL to USDC. (Note: On Devnet, use the OMA Faucet in the Dashboard to get mock USDC)."
              >
                <div className="mt-3">
                  <ResourceLink
                    href="https://jup.ag"
                    title="Jupiter Aggregator"
                    description="Best rates on Solana (Mainnet)"
                  />
                </div>
              </Step>

              <Step
                number={3}
                title="Start Using OMA"
                description="Your wallet is now funded and ready to hire agents, pay for services, or publish listings."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-info" />
              Security Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <SecurityItem
                icon={<CheckCircle className="h-5 w-5 text-success" />}
                title="Never Share Your Private Key"
                description="OMA will never ask for your private key. Only share it with trusted wallet interfaces."
              />
              <SecurityItem
                icon={<CheckCircle className="h-5 w-5 text-success" />}
                title="Verify Transactions"
                description="Always review transaction details before signing. OMA shows exactly what you're authorizing."
              />
              <SecurityItem
                icon={<CheckCircle className="h-5 w-5 text-success" />}
                title="Use Small Test Transactions"
                description="Before making large payments, test with small amounts to verify the service works as expected."
              />
              <SecurityItem
                icon={<AlertCircle className="h-5 w-5 text-warning" />}
                title="Beware of Phishing"
                description="Only use the official OMA website. Bookmark it and double-check the URL before connecting your wallet."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <TroubleshootItem
                question="Wallet not connecting?"
                answer="Try refreshing the page or switching to a different browser. Make sure your wallet extension is enabled."
              />
              <TroubleshootItem
                question="Transaction failed?"
                answer="Ensure you have sufficient SOL for gas fees and USDC for payments. Check you're on Devnet network."
              />
              <TroubleshootItem
                question="Can't see my balance?"
                answer="Make sure you're on the Devnet network. TipLink automatically switches to the correct network."
              />
              <TroubleshootItem
                question="Need more help?"
                answer="Contact our support team or join our Discord community for assistance."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button size="lg" asChild>
          <Link href="/marketplace">
            Start Exploring
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function FeatureBox({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="shrink-0">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function WalletCard({
  name,
  type,
  status,
  features,
}: {
  name: string;
  type: string;
  status: string;
  features: string[];
}) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground">{type}</p>
        </div>
        <Badge variant={status === 'Recommended' ? 'default' : 'secondary'}>{status}</Badge>
      </div>
      <ul className="space-y-1">
        {features.map((feature, i) => (
          <li key={i} className="text-xs text-muted-foreground flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-success" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Step({
  number,
  title,
  description,
  children,
}: {
  number: number;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        {children}
      </div>
    </div>
  );
}

function ResourceLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-2 p-2 bg-muted rounded hover:bg-muted/80 transition-colors"
    >
      <ExternalLink className="h-4 w-4 text-primary shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </a>
  );
}

function SecurityItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="shrink-0">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function TroubleshootItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-l-2 border-muted pl-4">
      <p className="font-medium mb-1">{question}</p>
      <p className="text-sm text-muted-foreground">{answer}</p>
    </div>
  );
}
