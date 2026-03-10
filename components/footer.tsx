import Link from 'next/link';
import { Brain } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">OMA-AI</span>
          </Link>
          <p className="text-muted-foreground max-w-sm">
            Enterprise-grade infrastructure for building, deploying, and monitoring autonomous AI agents at scale. Pay per call with x402.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2">
            <li><Link href="/models" className="text-muted-foreground hover:text-primary transition-colors">Models</Link></li>
            <li><Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link href="/mcps" className="text-muted-foreground hover:text-primary transition-colors">MCP Registry</Link></li>
            <li><Link href="/status" className="text-muted-foreground hover:text-primary transition-colors">System Status</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors">Documentation</Link></li>
            <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground">© 2026 OMA-AI. All rights reserved.</p>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <span className="text-sm text-muted-foreground">x402 Protocol Enabled</span>
        </div>
      </div>
    </footer>
  );
}