import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark scanline-bg p-4">
      <div className="relative w-full max-w-md">
        {/* Glow effect */}
        <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50 animate-pulse" />

        <Card className="relative glass-panel border-border/50 p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-destructive/10 border border-destructive/20 shadow-[0_0_15px_hsl(var(--destructive)/0.5)]">
              <AlertCircle className="size-12 text-destructive" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter text-foreground">404</h1>
            <h2 className="text-xl font-medium text-muted-foreground">System Malfunction</h2>
            <p className="text-muted-foreground text-sm">
              The requested node could not be located on the network. The protocol link may be
              severed or the resource has been collected.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button
              asChild
              className="w-full bg-primary text-secondary-foreground hover:bg-primary/90 font-bold"
            >
              <Link href="/">
                <Home className="mr-2 size-4" />
                Return to Base
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-border/50 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
            >
              <Link href="/marketplace">
                <Search className="mr-2 size-4" />
                Search Marketplace
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
