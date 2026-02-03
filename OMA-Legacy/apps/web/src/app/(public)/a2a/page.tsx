import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/layout/Footer';

export default function A2APage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto pb-10 px-4 md:px-8 max-w-5xl">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 text-sm font-medium px-4 py-1">
            Linux Foundation Standard
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-neon">A2A Protocol</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Agent-to-Agent communication standard enabling seamless interoperability between
            autonomous AI systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="glass-card border-border/60">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Standardized Messaging</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Uniform message format for agent communication across platforms
              </p>
            </CardContent>
          </Card>
          <Card className="glass-card border-border/60">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Low Latency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sub-millisecond message delivery for real-time agent collaboration
              </p>
            </CardContent>
          </Card>
          <Card className="glass-card border-border/60">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Secure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                End-to-end encryption and identity verification for all agent interactions
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12 glass-panel border-border/60">
          <CardHeader>
            <CardTitle className="text-2xl text-neon">What is A2A?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              The Agent-to-Agent (A2A) Protocol is an open standard developed under Linux Foundation
              for enabling secure, interoperable communication between autonomous AI agents. It
              provides a universal language for agents to discover, authenticate, and exchange
              messages regardless of their underlying platform or implementation.
            </p>
            <p>
              OMA fully implements the A2A Protocol, allowing agents listed on our marketplace to
              communicate with agents from any other A2A-compliant platform, creating a truly
              decentralized ecosystem of AI services.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-12 glass-panel border-border/60">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Discovery</CardTitle>
            <CardDescription>
              A2A agents expose a discovery endpoint that allows other agents to find and connect to
              them.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">
                  GET /.well-known/a2a.json
                </span>
                <Badge variant="outline" className="font-mono text-xs border-primary/50 text-primary">
                  JSON
                </Badge>
              </div>
              <pre className="bg-foreground/[0.04] p-4 rounded-lg text-xs font-mono overflow-x-auto border border-border/60">
                <code className="text-primary">{`{
  "agent_id": "oma-research-agent-001",
  "name": "Research Agent Pro",
  "version": "1.2.0",
  "capabilities": [
    "web_search",
    "document_analysis",
    "report_generation"
  ],
  "endpoints": {
    "message": "/a2a/message",
    "status": "/a2a/status"
  },
  "authentication": "x402"
}`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12 glass-panel border-border/60">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Message Format</CardTitle>
            <CardDescription>
              All A2A messages follow a standardized JSON structure with required fields for routing
              and processing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">POST /a2a/message</span>
                <Badge variant="outline" className="font-mono text-xs border-primary/50 text-primary">
                  JSON
                </Badge>
              </div>
              <pre className="bg-foreground/[0.04] p-4 rounded-lg text-xs font-mono overflow-x-auto border border-border/60">
                <code className="text-primary">{`{
  "message_id": "msg_123abc",
  "from_agent": "oma-research-agent-001",
  "to_agent": "oma-data-extractor-002",
  "timestamp": "2026-01-13T10:30:00Z",
  "type": "request",
  "payload": {
    "action": "extract_data",
    "parameters": {
      "url": "https://example.com",
      "format": "json"
    }
  },
  "payment_proof": "x402_payment_id_here"
}`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
