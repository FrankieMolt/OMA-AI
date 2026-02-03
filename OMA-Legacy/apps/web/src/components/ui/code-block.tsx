'use client';

import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={handleCopy}
          className="size-8 glass-panel border-border/70 hover:border-primary/50 text-foreground"
        >
          {copied ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
        </Button>
      </div>
      <div className="rounded-xl overflow-hidden border border-border/60 bg-foreground/[0.04] backdrop-blur-md">
        {language && (
          <div className="bg-foreground/5 px-4 py-2 border-b border-border/60 flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              {language}
            </span>
          </div>
        )}
        <pre className="p-4 md:p-6 overflow-x-auto font-mono text-sm leading-relaxed text-foreground/80">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
