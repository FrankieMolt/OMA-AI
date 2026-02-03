import React, { memo } from 'react';
import Link from 'next/link';
import { Listing } from '@/lib/types';
import { Cpu, Zap, Globe, TrendingUp, Star, Users, BadgeCheck, GitBranch, Bot, Workflow, Copy, Check, Terminal } from 'lucide-react';
import { SolanaCircleColorful, UsdcCircleColorful } from '@ant-design/web3-icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface MarketplaceListingCardProps {
  listing: Listing;
  viewMode?: 'grid' | 'list';
  basePath?: string;
}

const BrainIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

export const MarketplaceListingCard = memo(
  ({ listing, viewMode = 'grid', basePath = '/marketplace' }: MarketplaceListingCardProps) => {
    const [mounted, setMounted] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    const handleCopyInstall = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (listing.installCommand) {
        navigator.clipboard.writeText(listing.installCommand);
        setCopied(true);
        toast.success('Install command copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
      }
    };

    const getIcon = () => {
      switch (listing.category) {
        case 'agent':
          return <Globe className="size-6 text-primary" />;
        case 'mcp':
          return <Cpu className="size-6 text-info" />;
        case 'api':
          return <Zap className="size-6 text-success" />;
        case 'llm':
          return <BrainIcon className="size-6 text-secondary-foreground" />;
        case 'workflow':
          return <Workflow className="size-6 text-warning" />;
        case 'subagent':
          return <Bot className="size-6 text-accent" />;
        case 'n8n':
          return <GitBranch className="size-6 text-info" />;
        case 'x402':
          return <Zap className="size-6 text-warning" />;
        default:
          return <Zap className="size-6 text-muted-foreground" />;
      }
    };

    const getCategoryColor = (category: string) => {
      const colors = {
        agent: 'bg-primary/10 text-primary border-primary/20',
        mcp: 'bg-info/10 text-info border-info/20',
        api: 'bg-success/10 text-success border-success/20',
        llm: 'bg-secondary/40 text-secondary-foreground border-border/60',
        skill: 'bg-warning/10 text-warning border-warning/20',
        workflow: 'bg-warning/10 text-warning border-warning/20',
        subagent: 'bg-accent/10 text-accent border-accent/20',
        n8n: 'bg-info/10 text-info border-info/20',
        x402: 'bg-warning/10 text-warning border-warning/20',
      };
      return (
        colors[category as keyof typeof colors] || 'bg-muted/50 text-muted-foreground border-border/60'
      );
    };

    const pricingLabel =
      listing.pricingType === 'usage'
        ? 'Per Request'
        : listing.pricingType === 'subscription'
          ? 'Per Month'
          : listing.pricingType === 'one-time'
            ? 'One Time'
            : 'Free';

    if (viewMode === 'list') {
      return (
        <Card className="glass-card border-border/60 hover:border-primary/30 transition-all duration-300 group overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-6 flex-1">
                <div className="size-14 rounded-2xl bg-foreground/5 border border-border/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  {getIcon()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <Link
                      href={`${basePath}/${listing.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      <h3 className="text-xl font-bold text-foreground truncate">{listing.name}</h3>
                    </Link>
                    <Badge
                      className={`text-[10px] font-bold uppercase tracking-wider ${getCategoryColor(listing.category)}`}
                    >
                      {listing.category}
                    </Badge>
                    {listing.verified && <BadgeCheck className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{listing.description}</p>
                  
                  {listing.installCommand && (
                    <div className="hidden md:flex items-center gap-2 mb-2 p-1.5 bg-foreground/[0.06] rounded border border-border/60 font-mono text-xs text-muted-foreground max-w-md group/cmd">
                      <Terminal className="w-3 h-3 text-muted-foreground/70" />
                      <span className="truncate flex-1">{listing.installCommand}</span>
                      <button 
                        onClick={handleCopyInstall}
                        className="p-1 hover:bg-foreground/10 rounded transition-colors"
                        title="Copy command"
                      >
                        {copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-muted-foreground/70 font-mono">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-warning text-warning" />
                      <span>{listing.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{(listing.totalUsage || 0).toLocaleString()}</span>
                    </div>
                    {listing.ownerName && <span>by {listing.ownerName}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 pl-6 border-l border-border/60 h-12">
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground/70 block uppercase mb-1">
                    {pricingLabel}
                  </span>
                  <div className="flex items-center gap-2 justify-end">
                    {mounted && listing.price > 0 && listing.currency === 'USDC' && (
                      <UsdcCircleColorful className="size-5" />
                    )}
                    {mounted && listing.price > 0 && listing.currency === 'SOL' && (
                      <SolanaCircleColorful className="size-5" />
                    )}
                    {!mounted && listing.price > 0 && (
                      <span className="size-5 bg-foreground/10 rounded-full animate-pulse" />
                    )}
                    <span className="text-xl font-bold text-foreground font-mono">
                      {!listing.price || listing.price === 0
                        ? 'Free'
                        : listing.price.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 px-6 rounded-xl shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all"
                >
                  <Link href={`${basePath}/${listing.slug}`}>Access Details</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="glass-card h-full flex flex-col border-border/60 hover:border-primary/30 transition-all duration-300 group overflow-hidden">
        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="size-12 rounded-2xl bg-foreground/5 border border-border/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
              {getIcon()}
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge
                className={`text-[10px] font-bold uppercase tracking-wider ${getCategoryColor(listing.category)}`}
              >
                {listing.category}
              </Badge>
              {listing.verified && (
                <span className="flex items-center gap-1 text-[10px] text-primary font-medium">
                  <BadgeCheck className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
          </div>

          <Link href={`${basePath}/${listing.slug}`} className="block group-hover:text-primary transition-colors mb-2">
            <h3 className="text-lg font-bold text-foreground line-clamp-1" title={listing.name}>{listing.name}</h3>
          </Link>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{listing.description}</p>
          
          {listing.installCommand && (
            <div className="flex items-center gap-2 mb-4 p-1.5 bg-foreground/[0.06] rounded border border-border/60 font-mono text-[10px] text-muted-foreground group/cmd relative">
              <Terminal className="w-3 h-3 text-muted-foreground/70 shrink-0" />
              <span className="truncate flex-1">{listing.installCommand}</span>
              <button 
                onClick={handleCopyInstall}
                className="absolute right-1 top-1 p-0.5 hover:bg-foreground/10 rounded transition-colors"
                title="Copy command"
              >
                {copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border/60 mt-auto">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground/70 uppercase font-bold">{pricingLabel}</span>
              <div className="flex items-center gap-1.5 mt-1">
                {mounted && listing.price > 0 && listing.currency === 'USDC' && (
                  <UsdcCircleColorful className="size-5" />
                )}
                {mounted && listing.price > 0 && listing.currency === 'SOL' && (
                  <SolanaCircleColorful className="size-5" />
                )}
                {!mounted && listing.price > 0 && (
                  <span className="size-5 bg-foreground/10 rounded-full animate-pulse" />
                )}
                <span className="text-xl font-bold text-foreground font-mono leading-none">
                  {listing.price === 0 ? 'Free' : listing.price.toLocaleString()}
                </span>
                {listing.price > 0 && (
                  <span className="text-[10px] text-muted-foreground/70 font-bold ml-0.5">
                    {listing.currency}
                  </span>
                )}
              </div>
            </div>
            <Button
              asChild
              size="sm"
              className="bg-foreground/5 hover:bg-foreground/10 border border-border/60 text-foreground/80 hover:text-foreground px-4 rounded-lg font-bold text-[11px] uppercase tracking-wide transition-all h-9 flex items-center gap-2"
            >
              <Link href={`${basePath}/${listing.slug}`}>
                View
                <TrendingUp className="size-3" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);
MarketplaceListingCard.displayName = 'MarketplaceListingCard';
