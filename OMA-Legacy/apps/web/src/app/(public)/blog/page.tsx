import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

const POSTS = [
  {
    slug: 'announcing-oma-framework',
    title: 'Announcing OMA: The OS for Embodied Intelligence',
    excerpt:
      'Today we are unveiling the OpenMarketAccess Framework v1.0, featuring MemVid memory streams, the Cortex-Edge Protocol for IoT, and the Ultimate Agent Console.',
    date: '2026-01-16',
    category: 'Engineering',
    author: 'OMA Team',
  },
  {
    slug: 'x402-micropayments-explained',
    title: 'Deep Dive: How x402 Enables Robot Economy',
    excerpt:
      'Why we chose HTTP 402 for the Cortex-Edge protocol and how it enables "Pay-to-Actuate" for autonomous drones.',
    date: '2026-01-10',
    category: 'Protocol',
    author: 'Satoshi Nakamoto (Sim)',
  },
];

export default function BlogIndex() {
  return (
    <div className="container mx-auto py-24 px-4 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Engineering Blog</h1>
        <p className="text-xl text-muted-foreground">Updates from the Cortex-Edge.</p>
      </div>

      <div className="grid gap-8">
        {POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="glass-card border-border/60 hover:border-warning/40 transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <Badge variant="outline" className="text-warning border-warning/40">
                    {post.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                </div>
                <CardTitle className="text-2xl group-hover:text-warning transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
