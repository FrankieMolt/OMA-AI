'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { RatingStars } from '@/components/web3/RatingStars';
import {
  CheckCircle,
  Clock,
  Shield,

  Globe,
  Twitter,
  Github,
  Zap,
  Loader2,
  Terminal,
  Copy,
  Check,
  Code,
} from 'lucide-react';
import { toast } from 'sonner';
import { type ListingDetail } from '@/lib/types';
// import { TREASURY_WALLET_ADDRESS } from '@/lib/constants'; // Not used, removed to fix lint
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, SystemProgram, Transaction, PublicKey } from '@solana/web3.js';

// Simple helper to shorten address
function shortenAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

interface MarketplaceDetailPageProps {
  listing: ListingDetail;
}

export function MarketplaceDetailPage({ listing }: MarketplaceDetailPageProps) {
  const [hasAccess, setHasAccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyInstall = () => {
    if (listing.installCommand) {
      navigator.clipboard.writeText(listing.installCommand);
      setCopied(true);
      toast.success('Install command copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Solana Hooks
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  // Import constant
  const TREASURY_WALLET = process.env.NEXT_PUBLIC_TREASURY_WALLET || '7XgS3vD9M4krX01o98p2974261687352316498111111';

  const handleBuy = async () => {
    if (!connected || !publicKey) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      setIsPurchasing(true);

      // Calculate Price
      const priceSOL = listing.price || 0.1;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(TREASURY_WALLET), // Use Real Treasury
          lamports: priceSOL * LAMPORTS_PER_SOL,
        })
      );

      const {
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send and Confirm
      const signature = await sendTransaction(transaction, connection);

      toast.info('Transaction sent...', {
        description: 'Waiting for confirmation on Solana Devnet.',
      });

      await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });

      // Call Backend Verification
      toast.info('Verifying purchase...');

      const response = await fetch('/api/purchase/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signature,
          amount: priceSOL,
          buyerAddress: publicKey.toString(),
          listingId: listing.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      // Success
      setHasAccess(true);
      setShowPaymentModal(false);
      toast.success('Purchase successful & Verified!', {
        description: `Tx: ${shortenAddress(signature)}`,
        action: {
          label: 'View',
          onClick: () =>
            window.open(`${process.env.NEXT_PUBLIC_SOLANA_EXPLORER || 'https://explorer.solana.com'}/tx/${signature}?cluster=devnet`, '_blank'),
        },
      });
    } catch (error) {
      console.error('Purchase failed:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Transaction was rejected or timed out.';
      toast.error('Purchase failed', {
        description: errorMessage,
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleReviewSubmit = () => {
    if (!reviewText) return;
    toast.success('Review submitted successfully!');
    setReviewText('');
  };

  // Calculate stats
  const averageRating = listing.rating;
  const ratingCount = listing.reviewCount || 0;
  // Format price for display
  const priceDisplay =
    listing.pricingType === 'free'
      ? 'Free'
      : `$${listing.price} / ${listing.pricingType === 'usage' ? 'req' : 'mo'}`;

  return (
    <div className="animate-in fade-in duration-700 space-y-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-foreground/5 backdrop-blur-xl p-8 md:p-12">
        {/* Animated Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: Icon & Action */}
          <div className="shrink-0 flex flex-col items-center gap-6 w-full lg:w-auto">
            <div className="size-48 rounded-[2.5rem] bg-foreground/5 border border-border/60 shadow-2xl flex items-center justify-center p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent opacity-20 blur group-hover:opacity-40 transition-opacity duration-700" />
              {listing.icon ? (
                <Image
                  src={listing.icon}
                  alt={listing.name}
                  width={192}
                  height={192}
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                />
              ) : (
                <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent relative z-10 font-mono tracking-tighter">
                  {listing.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 w-full max-w-[240px]">
              {hasAccess ? (
                <Button className="w-full h-14 rounded-2xl gap-2 bg-success/10 text-success hover:bg-success/20 border border-success/30 font-bold">
                  <CheckCircle className="size-5" />
                  Owned & Verified
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full h-14 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-neon hover:shadow-neon-lg transition-all duration-300"
                >
                  {listing.pricingType === 'free' ? 'Install Now' : `Purchase Access`}
                </Button>
              )}

              {!connected && (
                <div className="flex justify-center mt-2">
                  <WalletMultiButton className="!bg-foreground/5 !border !border-border/50 !rounded-xl !h-10 !px-4 !text-xs !font-bold !text-foreground !hover:bg-foreground/10 !transition-all" />
                </div>
              )}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex-1 space-y-8 w-full">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                  {listing.category}
                </Badge>
                {listing.verified && (
                <Badge className="bg-success/10 text-success border-success/20 px-3 py-1 gap-1.5 font-bold">
                    <Shield className="size-3.5" />
                    Verified Provider
                  </Badge>
                )}
                <Badge variant="outline" className="border-border/60 text-muted-foreground font-mono text-[10px]">
                  v{listing.version || '1.0.0'}
                </Badge>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <h1 className="text-5xl font-black tracking-tighter text-foreground">
                  {listing.name}
                </h1>
                <div className="bg-foreground/5 border border-border/60 rounded-2xl px-6 py-4 min-w-[180px]">
                  <div className="text-3xl font-black text-primary font-mono tracking-tighter shadow-glow-primary/20">
                    {priceDisplay}
                  </div>
                  <div className="text-[10px] text-muted-foreground/70 font-bold uppercase tracking-[0.2em] mt-1">
                    {listing.pricingType === 'usage' ? 'Per Interaction' : 'Monthly Access'}
                  </div>
                </div>
              </div>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl font-medium">
                {listing.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-8 items-center border-t border-border/60 pt-8">
              <div className="flex items-center gap-3">
                <RatingStars rating={averageRating} size="md" />
                <span className="text-xl font-bold text-foreground">{averageRating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground font-medium">({ratingCount} verified reviews)</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="size-5 text-primary" />
                <span className="text-lg font-bold text-foreground">{(listing.totalUsage || 0).toLocaleString()}</span>
                <span className="text-sm font-medium">Active Nodes</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="size-5" />
                <span className="text-sm font-medium">Updated 2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Content Section */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-foreground/5 border border-border/60 p-1 rounded-2xl h-14 mb-8">
          <TabsTrigger value="overview" className="rounded-xl px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-all">
            Overview
          </TabsTrigger>
          <TabsTrigger value="capabilities" className="rounded-xl px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-all">
            Capabilities
          </TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-xl px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-all">
            Reviews
          </TabsTrigger>
          <TabsTrigger value="api" className="rounded-xl px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-all">
            API / SDK
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="glass-card border-border/60 overflow-hidden">
                <CardHeader className="border-b border-border/60 bg-foreground/[0.02]">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Globe className="size-5 text-primary" />
                    About this Agent
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {listing.description}
                    </p>
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                      This agent is built using the latest autonomous reasoning models and is fully compatible with the OpenMarketAccess (OMA) runtime. It features native support for the x402 payment protocol, allowing for seamless per-interaction monetization on the Solana blockchain.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/60 overflow-hidden">
                <CardHeader className="border-b border-border/60 bg-foreground/[0.02]">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Terminal className="size-5 text-primary" />
                    Quick Installation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="relative group">
                    <div className="bg-background/60 border border-border/60 rounded-2xl p-6 font-mono text-lg flex items-center justify-between overflow-hidden shadow-inner">
                      <div className="flex items-center gap-4 overflow-hidden">
                        <Terminal className="size-6 text-muted-foreground/70 shrink-0" />
                        <span className="text-success truncate">
                          {listing.installCommand || `oma install ${listing.slug}`}
                        </span>
                      </div>
                      <button
                        onClick={handleCopyInstall}
                        className="ml-6 p-3 hover:bg-foreground/10 rounded-xl transition-all text-muted-foreground hover:text-primary"
                        title="Copy command"
                      >
                        {copied ? <Check className="size-6 text-success" /> : <Copy className="size-6" />}
                      </button>
                    </div>
                    <div className="absolute inset-0 bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-border/60 overflow-hidden">
                <CardHeader className="border-b border-border/60 bg-foreground/[0.02]">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Shield className="size-5 text-primary" />
                    Node Specs
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground/70 text-sm font-bold uppercase tracking-widest">Status</span>
                    <Badge className="bg-success/10 text-success border-success/20 font-bold">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground/70 text-sm font-bold uppercase tracking-widest">Runtime</span>
                    <span className="text-foreground font-mono text-sm">OMA-v2.1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground/70 text-sm font-bold uppercase tracking-widest">Latency</span>
                    <span className="text-foreground font-mono text-sm">~450ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground/70 text-sm font-bold uppercase tracking-widest">Type</span>
                    <span className="text-foreground font-mono text-sm capitalize">{listing.category}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="glass-card border border-border/60 rounded-3xl p-8 space-y-6 bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="text-xl font-black text-foreground tracking-tight">Need help with this?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Join our developer community to get support and learn how to integrate this agent into your workflows.
                </p>
                <div className="flex flex-col gap-3">
                  <Button variant="outline" className="w-full rounded-xl border-border/60 hover:bg-foreground/5">
                    <Twitter className="size-4 mr-2" /> Twitter / X
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl border-border/60 hover:bg-foreground/5">
                    <Github className="size-4 mr-2" /> GitHub Repo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="capabilities" className="animate-in slide-in-from-bottom-4 duration-500">
          <Card className="glass-card border-border/60 overflow-hidden">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listing.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-foreground/5 border border-border/60 hover:border-primary/20 transition-all group">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="size-5 text-primary" />
                    </div>
                    <span className="font-bold text-foreground capitalize">{cap.replace(/-/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-card border-border/60 p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Submit a Review</h3>
                </div>
                <div className="space-y-4">
                  <RatingStars rating={0} onRatingChange={() => {}} />
                  <Textarea
                    placeholder="Tell us about your experience with this node..."
                    className="min-h-[120px] bg-foreground/5 border-border/60 rounded-2xl focus:border-primary/50 transition-all"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                  <Button
                    onClick={handleReviewSubmit}
                    disabled={!reviewText}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 rounded-xl shadow-neon"
                  >
                    Post Review
                  </Button>
                </div>
              </Card>

              {/* Reviews List */}
              <div className="space-y-4">
                {(listing.reviews || []).length > 0 ? (
                  listing.reviews?.map((review) => (
                    <Card key={review.id} className="glass-card border-border/60 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-10 border border-border/60">
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                              {review.user?.name?.slice(0, 2).toUpperCase() || review.user?.email?.slice(0, 2).toUpperCase() || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold text-foreground">{review.user?.name || review.user?.email || 'Anonymous User'}</div>
                            <div className="text-xs text-muted-foreground font-mono">
                              Verified Purchase • 2 weeks ago
                            </div>
                          </div>
                        </div>
                        <RatingStars rating={review.rating} />
                      </div>
                      <p className="text-foreground/90 leading-relaxed">{review.content}</p>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-20 glass-card rounded-3xl border border-dashed border-border/60">
                    <p className="text-muted-foreground font-bold">No reviews yet. Be the first to rate!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-border/60 p-8 text-center space-y-6">
                <div className="text-5xl font-black text-foreground font-mono">{averageRating}</div>
                <RatingStars rating={averageRating} />
                <p className="text-muted-foreground/70 text-sm font-bold uppercase tracking-widest">
                  Average User Rating
                </p>
                <div className="space-y-3 pt-4">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground w-3">{star}</span>
                      <div className="flex-1 h-1.5 bg-foreground/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: star === 5 ? '85%' : star === 4 ? '10%' : '5%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="api" className="animate-in slide-in-from-bottom-4 duration-500">
          <Card className="glass-card border-border/60 overflow-hidden">
            <CardHeader className="border-b border-border/60 bg-foreground/[0.02]">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Code className="size-5 text-primary" />
                Developer SDK Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <p className="text-muted-foreground">
                Integrate this agent directly into your application using our TypeScript SDK.
              </p>
              <div className="bg-background/60 rounded-2xl p-6 border border-border/60 font-mono text-sm overflow-x-auto shadow-inner">
                <pre className="text-success">
                  {`import { OMA } from '@oma/sdk';

const agent = await OMA.loadAgent('${listing.slug}');
const response = await agent.execute({
  input: "Analyze this codebase for security vulnerabilities",
  context: {
    repo: "https://github.com/example/app"
  }
});

console.log(response.output);`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="glass-card border-border/60 sm:max-w-[425px] p-8 rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-foreground tracking-tight">Confirm Purchase</DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium">
              You are about to purchase access to <span className="text-foreground font-bold">{listing.name}</span>. This transaction will be processed on the Solana network.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-8 space-y-6">
            <div className="bg-foreground/5 rounded-2xl p-6 border border-border/60 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-muted-foreground/70 font-bold uppercase tracking-widest mb-1">Total Amount</p>
                <p className="text-3xl font-black text-primary font-mono tracking-tighter shadow-glow-primary/20">0.10 SOL</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground/70 font-bold uppercase tracking-widest mb-1">Network</p>
                <Badge className="bg-foreground/5 text-foreground border-border/60 font-mono">Devnet</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-medium">Service Fee</span>
                <span className="text-foreground font-mono">0.0001 SOL</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-medium">Provider</span>
                <span className="text-foreground font-mono">{shortenAddress(listing.ownerWallet || '7XgS3...98p2')}</span>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-3 sm:flex-col">
            <Button
              onClick={handleBuy}
              disabled={isPurchasing || !connected}
              className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg shadow-neon transition-all"
            >
              {isPurchasing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : connected ? (
                'Confirm & Pay'
              ) : (
                'Connect Wallet'
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowPaymentModal(false)}
              className="w-full h-12 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/5 font-bold"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
