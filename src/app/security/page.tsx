import { Metadata } from 'next';
import { GlassCard, GlassCardPurple } from '@/components/ui/GlassCard';
import { Shield, Lock, Eye, CheckCircle2, AlertTriangle, RefreshCw, ShieldAlert, Fingerprint, Key, Database, Globe, Zap, FileText, Code, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security | OMA-AI - Secure MCP Marketplace',
  description: 'Learn about OMA-AI\'s security measures. Row Level Security, encryption, verified MCPs, and more.',
  keywords: ['OMA-AI', 'Security', 'MCP marketplace', 'Row Level Security', 'Verified MCPs'],
};

export default function SecurityPage() {
  const securityLayers = [
    {
      layer: 'Infrastructure',
      icon: <Shield className="w-6 h-6" />,
      items: [
        'Enterprise-grade hosting on secure VPS',
        'DDoS protection with Cloudflare',
        'Regular security audits and penetration testing',
        '24/7 monitoring and incident response',
        'Disaster recovery and backups',
      ],
    },
    {
      layer: 'Database Security',
      icon: <Database className="w-6 h-6" />,
      items: [
        'Row Level Security (RLS) for data isolation',
        'Encrypted database connections (TLS 1.3)',
        'Automatic data encryption at rest',
        'Secure credential management (Hashicorp Vault)',
        'Database backups every 6 hours',
      ],
    },
    {
      layer: 'Application Security',
      icon: <Lock className="w-6 h-6" />,
      items: [
        'Input validation and sanitization (Zod schemas)',
        'SQL injection prevention (parameterized queries)',
        'XSS protection (DOMPurify)',
        'CSRF protection (double-submit cookies)',
        'Rate limiting (100-1000 requests/minute)',
      ],
    },
    {
      layer: 'Payment Security',
      icon: <Key className="w-6 h-6" />,
      items: [
        'x402 protocol with ERC-3009',
        'Random nonces (128-bit entropy)',
        'Time-based authentication (24h expiration)',
        'Domain separation (replay attack prevention)',
        'No private key exposure (delegated transfers)',
      ],
    },
  ];

  const verifiedFeatures = [
    {
      icon: <Eye className="w-5 h-5" />,
      title: 'Manual MCP Review',
      description: 'Every MCP is manually reviewed by our security team before publication. No automatic approvals.',
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'Security Testing',
      description: 'MCPs undergo security testing including SQL injection, XSS, and CSRF vulnerability scanning.',
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: 'Code Review',
      description: 'Source code is reviewed for security best practices, proper error handling, and secure defaults.',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Performance Benchmarking',
      description: 'MCPs are benchmarked for performance under load to prevent DoS vulnerabilities.',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Community Feedback',
      description: 'Users can report security issues. Prompt action on all reports.',
    },
  ];

  const compliance = [
    { name: 'SOC 2 Type II', description: 'Information security controls', status: 'In Progress' },
    { name: 'GDPR', description: 'EU data protection regulation', status: 'Compliant' },
    { name: 'CCPA', description: 'California privacy law', status: 'Compliant' },
    { name: 'ISO 27001', description: 'Information security management', status: 'Planned' },
  ];

  const dataHandling = [
    'We collect minimal data (email, name, wallet addresses)',
    'Private keys NEVER stored (public addresses only)',
    'Usage data aggregated and anonymized (no PII)',
    'Payment data encrypted at rest and in transit',
    'Data retention: 90 days for analytics, 30 days for logs',
    'Users can request data export or deletion (GDPR rights)',
  ];

  const incidentResponse = [
    {
      phase: 'Detection',
      icon: <Eye className="w-5 h-5" />,
      description: '24/7 monitoring with automatic threat detection and alerting.',
    },
    {
      phase: 'Response',
      icon: <RefreshCw className="w-5 h-5" />,
      description: 'Automated incident response with predefined playbooks for common threats.',
    },
    {
      phase: 'Recovery',
      icon: <ShieldAlert className="w-5 h-5" />,
      description: 'Rollback capabilities, database backups, and disaster recovery procedures.',
    },
    {
      phase: 'Communication',
      icon: <Globe className="w-5 h-5" />,
      description: 'Transparent incident communication with affected users and public disclosure.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-full mb-6">
            <Shield className="w-4 h-4 text-green-300" />
            <span className="text-sm font-semibold text-green-300">Security First</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your Data is Safe
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade security protecting your MCPs, payments, and data.
            Multi-layered defense with transparency at every step.
          </p>
        </div>

        {/* Security Layers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Security Layers</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {securityLayers.map((layer, index) => (
              <GlassCard key={index} className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-300">
                    {layer.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {layer.layer}
                    </h3>
                  </div>
                </div>
                <ul className="space-y-2">
                  {layer.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                      <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-green-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Verified MCPs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Verified MCP Program</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedFeatures.map((feature, index) => (
              <GlassCard key={index} className="p-6 hover">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center text-green-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* x402 Security */}
        <GlassCardPurple className="max-w-5xl mx-auto p-8 mb-16">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-shrink-0 w-16 h-16 bg-purple-600/30 rounded-2xl flex items-center justify-center">
              <Key className="w-8 h-8 text-purple-300" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-4">
                x402 Payment Security
              </h2>
              <p className="text-purple-100 leading-relaxed text-lg">
                Our x402 protocol implements gasless payments with enterprise-grade security.
                Users sign transactions off-chain, and we relay them securely on-chain.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-green-400" />
                Random Nonces
              </h3>
              <p className="text-gray-300 leading-relaxed">
                128-bit random nonces prevent replay attacks. Each transaction has unique signature.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-green-400" />
                Time-Based Auth
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Signatures expire after 24 hours. Invalidates old signatures automatically.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-green-400" />
                Domain Separation
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Each contract domain uses unique prefixes. Prevents cross-domain replay.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-green-400" />
                Delegated Transfers
              </h3>
              <p className="text-gray-300 leading-relaxed">
                No private key exposure. Users sign, platform executes. Zero gas fees.
              </p>
            </div>
          </div>
        </GlassCardPurple>

        {/* Compliance */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Compliance</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {compliance.map((item) => (
              <GlassCard key={item.name} className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">
                    {item.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Compliant'
                      ? 'bg-green-600/20 text-green-400'
                      : item.status === 'In Progress'
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'bg-gray-600/20 text-gray-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Data Handling */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Data Handling</h2>
          <GlassCard className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {dataHandling.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5 text-green-400" />
                  <span className="text-gray-300 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Incident Response */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Incident Response</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {incidentResponse.map((phase, index) => (
              <GlassCard key={phase.phase} className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center text-amber-300">
                    {phase.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {phase.phase} Phase
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Report Vulnerability */}
        <GlassCard className="max-w-4xl mx-auto p-8 mb-16 bg-red-900/20 border-red-700/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-300" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">
                Found a Vulnerability?
              </h2>
              <p className="text-red-100 leading-relaxed">
                Responsible disclosure is encouraged. We'll work with you to fix it quickly.
              </p>
            </div>
          </div>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-400" />
              <span><strong className="text-white">Don't</strong> exploit vulnerabilities</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-400" />
              <span><strong className="text-white">Do</strong> report privately to security@oma-ai.com</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-400" />
              <span><strong className="text-white">Allow</strong> us reasonable time to fix (14 days)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-400" />
              <span><strong className="text-white">Receive</strong> credit in our security hall of fame</span>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <a
              href="mailto:security@oma-ai.com"
              className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors text-center"
            >
              Report Vulnerability
            </a>
            <a
              href="/contact"
              className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors text-center"
            >
              General Contact
            </a>
          </div>
        </GlassCard>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
          <GlassCard className="p-6 text-center hover">
            <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">100%</div>
            <div className="text-sm text-gray-400">MCP Verification</div>
          </GlassCard>
          <GlassCard className="p-6 text-center hover">
            <Lock className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">4</div>
            <div className="text-sm text-gray-400">Security Layers</div>
          </GlassCard>
          <GlassCard className="p-6 text-center hover">
            <Eye className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">95/100</div>
            <div className="text-sm text-gray-400">Health Score</div>
          </GlassCard>
          <GlassCard className="p-6 text-center hover">
            <RefreshCw className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">24/7</div>
            <div className="text-sm text-gray-400">Monitoring</div>
          </GlassCard>
        </div>

        {/* CTA */}
        <GlassCardPurple className="max-w-4xl mx-auto p-12 text-center">
          <div className="w-16 h-16 bg-green-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-green-300" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Trust is Everything
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Security isn't just technology—it's our commitment to protecting your data,
            revenue, and reputation. Every decision is guided by security-first principles.
          </p>
          <a
            href="/docs"
            className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
          >
            <FileText size={20} />
            View Documentation
          </a>
        </GlassCardPurple>
      </div>
    </div>
  );
}
