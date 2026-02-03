'use client';

import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function BlogPost() {
  return (
    <div className="container mx-auto py-24 px-4 max-w-3xl">
      <Link href="/blog" className="text-warning hover:underline mb-8 block">
        ← Back to Blog
      </Link>

      <Badge className="mb-4 bg-warning/10 text-warning hover:bg-warning/20">
        Engineering
      </Badge>

      <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
        Announcing OMA: The Operating System for Embodied Intelligence
      </h1>

      <div className="flex items-center gap-4 text-muted-foreground mb-12 pb-8 border-b border-border/60">
        <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
          O
        </div>
        <div>
          <div className="font-semibold text-foreground">OMA Team</div>
          <div className="text-sm">January 16, 2026 · 5 min read</div>
        </div>
      </div>

      <div className="prose prose-invert prose-lg max-w-none">
        <p className="lead text-xl text-foreground/80">
          We are thrilled to announce the official release of the OpenMarketAccess (OMA) Framework,
          a unified SDK and Runtime for building autonomous agents that can see, remember, and touch
          the physical world.
        </p>

        <h2 className="mt-8 mb-6">Why another Agent Framework?</h2>

        <p>
          Most agent frameworks (LangChain, AutoGen) focus on text-in, text-out. They treat Tools as
          simple API calls. But true Embodied Intelligence requires more:
        </p>

        <ul className="space-y-4 mt-6">
          <li>
            <b>Ephemeral Memory is not enough.</b> Agents need Time Travel debugging (MemVid).
          </li>
          <li>
            <b>Cloud-only is latency-heavy.</b> Robots need split-brain architectures (Cortex-Edge).
          </li>
          <li>
            <b>Unverified Execution is dangerous.</b> Actions need cryptographic verification
            (x402).
          </li>
        </ul>

        <h2 className="mt-8 mb-6">Introducing MemVid</h2>

        <p>
          MemVid is our answer to the Context Window problem. Instead of stuffing logs into context,
          we treat agent memory as a video stream. We use a Smart Codec to compress low-entropy
          frames (routine loops) into Keyframes, while preserving high-entropy frames (errors, user
          interactions).
        </p>

        <h2 className="mt-8 mb-6">The Cortex-Edge Protocol</h2>

        <p>For Physical AI, we introduce a protocol that runs on ESP32 and Solano.</p>

        <div className="bg-foreground/[0.04] p-4 rounded-lg border border-border/60">
          <code className="text-info">npx ts-node apps/web/src/cli/oma.ts init</code>
        </div>

        <div className="mt-8">
          <Badge className="mb-4 bg-success/10 text-success hover:bg-success/20">
            Production Ready
          </Badge>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4">Architecture Overview</h2>
          <p>The OMA Framework provides:</p>
          <ul className="space-y-2 mt-4">
            <li>
              <b>Unified SDK</b> - Single interface for all agent types
            </li>
            <li>
              <b>MemVid Memory System</b> - Temporal memory with Smart Frames
            </li>
            <li>
              <b>x402 Payment Protocol</b> - HTTP 402 micropayments
            </li>
            <li>
              <b>A2A Communication</b> - Agent-to-agent messaging
            </li>
            <li>
              <b>Cortex-Edge Runtime</b> - ESP32/Solana acceleration
            </li>
          </ul>
        </div>

        <div className="mt-12">
          <Badge className="mb-4 bg-info/10 text-info hover:bg-info/20">
            Now Available
          </Badge>
        </div>
      </div>
    </div>
  );
}
