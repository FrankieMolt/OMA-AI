'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Zap,
  Shield,
  DollarSign,
  Play,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  Terminal,
  FileCode,
  Package,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function APIDocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: Zap },
    { id: 'api-reference', title: 'API Reference', icon: Code2 },
    { id: 'x402-payments', title: 'x402 Payments', icon: DollarSign },
    { id: 'sdk', title: 'SDK Guide', icon: Package }
  ];

  const codeExamples = {
    javascript: `// Install SDK\nnpm install @oma-ai/sdk\n\n// Initialize client\nimport { OMAAgent } from '@oma-ai/sdk';\n\nconst agent = new OMAAgent({\n  walletAddress: '0x...',\n  network: 'base',\n  apiKey: 'your-api-key'\n});`
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <section className="pt-32 pb-12 px-4 md:px-14 border-b border-memoria-border-muted">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
               Technical
            </Badge>
            <h1 className="text-4xl md:text-7xl font-light tracking-tighter mb-4 font-display text-memoria-text-hero">
               API Documentation
            </h1>
            <p className="text-memoria-text-whisper text-sm font-light">Build with OMA-AI in minutes</p>
          </div>
          <div className="flex gap-4">
             <Button variant="outline" className="border-memoria-border-muted text-memoria-text-meta hover:text-white rounded-sm px-6 h-12 text-[10px] font-bold uppercase tracking-widest">
                <Play size={14} className="mr-2" /> Try Demo
             </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-14 py-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <nav className="sticky top-24 space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                aria-label={`View ${section.title} documentation`}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-left transition-all ${
                  activeSection === section.id
                    ? 'bg-memoria-text-hero text-memoria-bg-ultra-dark'
                    : 'text-memoria-text-whisper hover:text-white hover:bg-memoria-bg-card'
                }`}
              >
                <section.icon size={16} />
                <span className="text-[10px] uppercase tracking-widest font-bold">{section.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 max-w-4xl">
          <motion.section
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {activeSection === 'getting-started' && (
              <div className="space-y-10">
                <div>
                   <h2 className="text-3xl font-light text-memoria-text-hero mb-4 font-display">Getting Started</h2>
                   <p className="text-memoria-text-whisper font-light leading-relaxed">
                      Initialize the OMA-AI SDK to begin building your autonomous agent workforce.
                   </p>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-xl font-light text-memoria-text-hero mb-4">Installation</h3>
                  <Card className="bg-memoria-bg-ultra-dark border-memoria-border-muted rounded-sm relative">
                    <button
                      onClick={() => handleCopy(codeExamples.javascript)}
                      aria-label="Copy code to clipboard"
                      className="absolute top-3 right-3 p-2 text-memoria-text-meta hover:text-white"
                    >
                      {copiedCode === codeExamples.javascript ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                    <CardContent className="p-6">
                      <pre className="text-xs font-mono text-memoria-text-hero leading-relaxed overflow-x-auto">
                        <code>{codeExamples.javascript}</code>
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeSection === 'api-reference' && (
               <div className="space-y-8">
                  <div>
                     <h2 className="text-3xl font-light text-memoria-text-hero mb-4 font-display">Endpoints</h2>
                     <p className="text-memoria-text-whisper font-light leading-relaxed">List of primary REST endpoints.</p>
                  </div>
                  <div className="space-y-4">
                     {[
                       { method: 'GET', path: '/api/v1/marketplace', desc: 'List all APIs' },
                       { method: 'POST', path: '/api/v1/call', desc: 'Execute API call' },
                       { method: 'GET', path: '/api/v1/usage', desc: 'Get analytics' }
                     ].map((api, i) => (
                       <Card key={i} className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-4 hover:border-memoria-border-active transition-all">
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                <Badge variant="outline" className={`rounded-sm text-[9px] uppercase tracking-widest ${api.method === 'GET' ? 'border-green-900/30 text-green-400' : 'border-blue-900/30 text-blue-400'}`}>
                                   {api.method}
                                </Badge>
                                <span className="text-xs font-mono text-memoria-text-hero">{api.path}</span>
                             </div>
                             <span className="text-[10px] text-memoria-text-meta uppercase tracking-widest">{api.desc}</span>
                          </div>
                       </Card>
                     ))}
                  </div>
               </div>
            )}

            {/* Other sections would follow similar refactor */}
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10 text-center">
               <h3 className="text-2xl font-light text-memoria-text-hero mb-4 font-display">Advanced Guide Pending</h3>
               <p className="text-sm text-memoria-text-whisper mb-8 max-w-sm mx-auto">The full technical reference is being migrated to the Memoria system.</p>
               <Link href="/docs" className="no-underline">
                  <Button variant="outline" className="border-memoria-border-muted text-memoria-text-meta hover:text-white rounded-sm px-8 h-12 text-xs font-bold uppercase tracking-widest">
                     Read Full Docs
                  </Button>
               </Link>
            </Card>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
