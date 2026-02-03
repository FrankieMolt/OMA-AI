import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Terminal, Database, Cpu, Brain, Download, Mic, Zap, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'OMA Framework | Build Ultimate Agents',
  description:
    'The open-source framework for building self-evolving AI agents with MemVid memory and meta-learning.',
};

export default function FrameworkPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-accent/10 to-transparent blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Badge className="mb-4 bg-accent/15 text-accent-foreground hover:bg-accent/20 border-accent/40">
            v1.0.0 RELEASE AVAILABLE
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-accent/70">
            The OS for <br /> Embodied Intelligence
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Fork, Merge, and Deploy the world&apos;s most advanced AI protocols in one unified
            system.
            <br />
            Now featuring <strong>Hybrid Architecture</strong> (Node.js + Python FastAPI).
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Terminal className="w-4 h-4 mr-2" />
              Install CLI
            </Button>
            <Button variant="outline" className="border-border/60 hover:bg-foreground/5 text-foreground">
              <Download className="w-4 h-4 mr-2" />
              Get Cortex (Python)
            </Button>
          </div>
        </div>
      </section>

      {/* Architecture Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Mic className="w-8 h-8 text-accent" />}
              title="Kokoro TTS"
              desc="Browser-native 82M param voice model. Zero latency WebGPU synthesis."
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-info" />}
              title="AContext (Active Context)"
              desc="Adaptive Compression & Skill Distillation. 'Teacher' traces -> 'Student' skills."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-warning" />}
              title="FastMCP Python"
              desc="Heavy-duty Python backend for RAG and Vector operations."
            />
            <FeatureCard
              icon={<Globe className="w-8 h-8 text-success" />}
              title="Real MemVid"
              desc="Visual memory stream with QR/OCR Scanning & Time-Travel."
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-foreground/[0.04]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Database className="w-8 h-8 text-warning" />}
            title="MemVid Architecture"
            desc="Replace brittle RAG with 'Smart Frame' video-like memory streams. Enable time-travel debugging and perfect context restoration."
          />
          <FeatureCard
            icon={<Cpu className="w-8 h-8 text-info" />}
            title="MCP Runtime"
            desc="Unified tool execution across MCP servers with dynamic routing and policy control."
          />
          <FeatureCard
            icon={<Brain className="w-8 h-8 text-success" />}
            title="Reinforced Meta-Learning"
            desc="Context7-style injection that allows agents to write their own system prompts based on past failures."
          />
        </div>
      </section>

      {/* Code Snippet */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-foreground/[0.04] rounded-xl border border-border/60 overflow-hidden shadow-2xl">
            <div className="bg-foreground/5 px-4 py-2 border-b border-border/60 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-mono">agent.ts</span>
            </div>
            <div className="p-6 font-mono text-sm overflow-x-auto">
              <div className="text-accent">import</div>{' '}
              <div className="text-foreground inline">{`{`}</div>{' '}
              <div className="text-warning inline">memvid</div>{' '}
              <div className="text-foreground inline">{`}`}</div>{' '}
              <div className="text-accent inline">from</div>{' '}
              <div className="text-success inline">&apos;@oma/core&apos;</div>;
              <br />
              <br />
              <div className="text-muted-foreground">{`// 1. Remember the result`}</div>
              <div className="text-accent">await</div>{' '}
              <div className="text-warning inline">memvid</div>.
              <div className="text-info inline">addFrame</div>(
              <div className="text-success inline">&apos;Sector A7 Clear&apos;</div>);
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="glass-card border-border/60 hover:border-accent/40 transition-colors">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground text-lg leading-relaxed">{desc}</CardDescription>
      </CardContent>
    </Card>
  );
}
