import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: January 13, 2026</p>
      </div>

      <div className="space-y-6">
        <Section
          title="1. Acceptance of Terms"
          content="By accessing and using OpenMarketAccess (OMA), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform."
        />

        <Section
          title="2. Description of Service"
          content="OpenMarketAccess is a decentralized marketplace for AI agents, MCP servers, and API services. We provide a platform for users to discover, access, and monetize AI-related services through x402 payment protocol on the Solana blockchain."
        />

        <Section
          title="3. User Responsibilities"
          content={
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 18 years old to use this platform</li>
              <li>
                You are responsible for maintaining the security of your wallet and private keys
              </li>
              <li>You agree to use the platform for lawful purposes only</li>
              <li>You will not attempt to exploit vulnerabilities in the platform</li>
              <li>You will not share offensive, harmful, or illegal content</li>
            </ul>
          }
        />

        <Section
          title="4. Payments and x402 Protocol"
          content="All payments on the platform are processed through the x402 payment protocol on the Solana blockchain. Payments are non-custodial and irreversible once confirmed on-chain. OMA does not hold or control user funds at any time."
        />

        <Section
          title="5. Service Listings"
          content={
            <div className="space-y-2">
              <p>Service providers (sellers) are responsible for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Accurately describing their services</li>
                <li>Maintaining service availability and performance</li>
                <li>Complying with x402 payment standards</li>
                <li>Delivering the promised service quality</li>
              </ul>
            </div>
          }
        />

        <Section
          title="6. Intellectual Property"
          content="Service providers retain ownership of their intellectual property. By listing services on OMA, providers grant users a license to use the service as described. OMA does not claim ownership of any user-generated content or services listed on the platform."
        />

        <Section
          title="7. Disclaimers and Warranties"
          content={
            <div className="space-y-2">
              <p>
                OMA is provided on an &quot;as is&quot; basis without warranties of any kind. We do
                not guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Uninterrupted or error-free service</li>
                <li>The accuracy or reliability of listed services</li>
                <li>The security of any third-party integrations</li>
                <li>Any specific results from using services</li>
              </ul>
            </div>
          }
        />

        <Section
          title="8. Limitation of Liability"
          content="To the maximum extent permitted by law, OMA shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, data loss, or other damages arising from your use of the platform."
        />

        <Section
          title="9. Privacy Policy"
          content={
            <>
              <p className="mb-2">
                Your use of OMA is also governed by our Privacy Policy. Please review our{' '}
                <Link href="/privacy" className="text-primary underline">
                  Privacy Policy
                </Link>{' '}
                to understand how we collect, use, and protect your information.
              </p>
            </>
          }
        />

        <Section
          title="10. Modifications"
          content="We reserve the right to modify these terms at any time. Continued use of the platform after modifications constitutes acceptance of the updated terms."
        />

        <Section
          title="11. Termination"
          content="We reserve the right to suspend or terminate your access to the platform at our sole discretion, with or without notice, for any reason including violation of these terms."
        />

        <Section
          title="12. Governing Law"
          content="These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which OMA operates, without regard to its conflict of law provisions."
        />

        <Section
          title="13. Contact Information"
          content={
            <div className="space-y-2">
              <p>For questions about these Terms of Service, please contact us at:</p>
              <p className="font-mono text-sm">legal@openmarketaccess.com</p>
            </div>
          }
        />
      </div>
    </div>
  );
}

function Section({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground">{content}</div>
      </CardContent>
    </Card>
  );
}
