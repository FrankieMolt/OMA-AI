import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: January 13, 2026</p>
      </div>

      <div className="space-y-6">
        <Section
          title="1. Introduction"
          content="OpenMarketAccess (OMA) respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you."
        />

        <Section
          title="2. Data We Collect"
          content={
            <div className="space-y-3">
              <Subsection
                title="2.1 Wallet Information"
                content="We collect public wallet addresses for the purpose of facilitating transactions and account identification. We do not collect private keys or sensitive wallet data."
              />
              <Subsection
                title="2.2 Usage Data"
                content="We collect information about how you use our platform, including pages visited, features used, and time spent, to improve our services."
              />
              <Subsection
                title="2.3 Transaction Data"
                content="All transactions are recorded on the Solana blockchain. We maintain records of marketplace interactions for the purpose of service delivery and dispute resolution."
              />
              <Subsection
                title="2.4 Cookies"
                content="We use cookies to enhance your browsing experience, analyze site traffic, and for security purposes."
              />
            </div>
          }
        />

        <Section
          title="3. How We Use Your Data"
          content={
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our platform</li>
              <li>To process transactions through x402 protocol</li>
              <li>To improve and personalize your experience</li>
              <li>To communicate with you about service updates</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          }
        />

        <Section
          title="4. Data Sharing and Disclosure"
          content={
            <div className="space-y-3">
              <Subsection
                title="4.1 Service Providers"
                content="We may share data with third-party service providers who perform services on our behalf (e.g., cloud hosting, analytics). These providers are contractually obligated to protect your data."
              />
              <Subsection
                title="4.2 Public Blockchain"
                content="All transaction data is publicly recorded on the Solana blockchain and cannot be removed or hidden."
              />
              <Subsection
                title="4.3 Legal Requirements"
                content="We may disclose your data if required by law or to protect our rights, property, or safety."
              />
            </div>
          }
        />

        <Section
          title="5. Data Security"
          content="We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure."
        />

        <Section
          title="6. Your Rights"
          content={
            <ul className="list-disc pl-6 space-y-2">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your account and associated data</li>
              <li>Objection to processing of your data</li>
              <li>Data portability (where applicable)</li>
            </ul>
          }
        />

        <Section
          title="7. Third-Party Links"
          content="Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies."
        />

        <Section
          title="8. Children's Privacy"
          content="Our platform is not intended for children under 18. We do not knowingly collect personal data from children. If we discover such data, we will delete it immediately."
        />

        <Section
          title="9. Changes to This Policy"
          content="We may update our privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last updated' date."
        />

        <Section
          title="10. Contact Us"
          content={
            <div className="space-y-2">
              <p>If you have questions about this privacy policy, please contact us at:</p>
              <p className="font-mono text-sm">privacy@openmarketaccess.com</p>
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

function Subsection({ title, content }: { title: string; content: string }) {
  return (
    <div className="pl-4 border-l-2 border-muted">
      <p className="font-medium mb-1">{title}</p>
      <p className="text-sm text-muted-foreground">{content}</p>
    </div>
  );
}
