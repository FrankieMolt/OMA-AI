/**
 * Lethometry Homepage - Refactored with Approved Components
 * Following Wednesday Design guidelines
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Brain, 
  BookOpen, 
  Quote as QuoteIcon, 
  ArrowRight,
  Sparkles,
  LifeBuoy,
  History
} from 'lucide-react';

export default function LethometryPage() {
  const [currentView, setCurrentView] = useState<'death-clock' | 'memory-tools' | 'philosophy'>('death-clock');

  const stoicWisdom = [
    { quote: 'Death smiles at us all, all she asks is that we will try to be worthy of her.', author: 'Marcus Aurelius' },
    { quote: 'The obstacle on the path becomes the path.', author: 'Marcus Aurelius' },
    { quote: 'You have power over your mind - not outside events.', author: 'Epictetus' },
    { quote: 'Happiness depends upon ourselves.', author: 'Aristotle' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
              <Clock size={20} className="text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight">Lethometry</span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {[
              { label: 'Death Clock', view: 'death-clock' },
              { label: 'Memory Tools', view: 'memory-tools' },
              { label: 'Philosophy', view: 'philosophy' },
            ].map((item) => (
              <Button
                key={item.view}
                variant={currentView === item.view ? 'default' : 'ghost'}
                size="sm"
                className={currentView === item.view ? 'bg-primary/20 text-primary border-primary/30 hover:bg-primary/30' : ''}
                onClick={() => setCurrentView(item.view as any)}
              >
                {item.label}
              </Button>
            ))}
          </div>

          <Button size="sm" className="bg-gradient-to-r from-[#4ADE80] to-[#0D9488]">
             Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-[#4ADE80]/20 text-[#4ADE80] border-[#4ADE80]/30 px-3 py-1">
              <Sparkles className="w-3 h-3 mr-2" />
              Contemplate Mortality
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Embrace
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4ADE80] to-[#0D9488]">
                Life Finite
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Stoic philosophy meets modern reflection. Calculate your death clock, 
              preserve your memories, and find wisdom in the ancient teachings.
            </p>

            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-[#4ADE80] to-[#0D9488] px-8">
                Calculate Your Death Clock
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30 border-y border-border px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Core Tools</Badge>
            <h2 className="text-4xl font-bold">Explore Life's Tools</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Death Clock',
                description: 'Calculate your estimated time remaining based on lifestyle factors.',
                icon: Clock,
                view: 'death-clock'
              },
              { 
                title: 'Memory Tools',
                description: 'Preserve your memories with advanced storage and organization.',
                icon: Brain,
                view: 'memory-tools'
              },
              { 
                title: 'Stoic Philosophy',
                description: 'Ancient wisdom for modern life. Timeless teachings from the greats.',
                icon: BookOpen,
                view: 'philosophy'
              },
            ].map((tool, i) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full hover:border-primary/50 transition-all cursor-pointer" onClick={() => setCurrentView(tool.view as any)}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <tool.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{tool.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">Explore Tool</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Daily Wisdom</Badge>
            <h2 className="text-4xl font-bold">Stoic Teachings for Modern Life</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {stoicWisdom.map((wisdom, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full border-border bg-card/50">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-4">
                       <QuoteIcon className="text-primary w-8 h-8 opacity-20" />
                       <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                         — {wisdom.author}
                       </span>
                    </div>
                    <CardTitle className="text-xl italic font-serif leading-relaxed">
                      "{wisdom.quote}"
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0">
                      Share Wisdom
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30 border-t border-border px-6">
        <div className="max-w-7xl mx-auto text-center">
           <h2 className="text-3xl font-bold mb-12">Community Impact</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest">Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">5,400+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest">Wisdom Shared</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">2,800+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest">Daily Reflections</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">145+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest">Countries</div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                <Clock size={16} className="text-muted-foreground" />
             </div>
             <span className="font-bold">Lethometry</span>
          </div>
          
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Death Clock</a>
            <a href="#" className="hover:text-foreground transition-colors">Memory</a>
            <a href="#" className="hover:text-foreground transition-colors">Philosophy</a>
            <a href="#" className="hover:text-foreground transition-colors">About</a>
          </div>

          <div className="text-sm text-muted-foreground">
            © 2026 Lethometry Research. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
