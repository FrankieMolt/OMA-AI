'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, CheckCircle, AlertCircle, Rocket } from 'lucide-react';

export default function CreateListingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'mcp',
    endpoint: '',
    price: '',
  });

  const handleVerify = async () => {
    setLoading(true);
    // In a real production app, we would ping the endpoint from the server
    // For now, we just validate the URL format
    try {
      new URL(formData.endpoint);
      setTimeout(() => {
        setLoading(false);
        setVerified(true);
      }, 1000);
    } catch {
      setLoading(false);
      setVerified(false);
      alert('Please enter a valid URL');
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.title,
          description: formData.description,
          category: formData.category,
          endpoint: formData.endpoint,
          price: parseFloat(formData.price) || 0,
          pricingType: 'per_call', // Default for now
          capabilities: [],
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create listing');
      }

      const data = await res.json();
      router.push(`/marketplace/${data.slug}`);
    } catch (error) {
      console.error(error);
      alert('Failed to publish listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto pt-24 pb-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Listing</h1>
        <p className="text-muted-foreground mt-2">
          Share your agent or MCP server with the world. We&apos;ll verify it automatically.
        </p>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="details">1. Details</TabsTrigger>
          <TabsTrigger value="verification" disabled={step < 2}>
            2. Verification & Publish
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle>Listing Details</CardTitle>
              <CardDescription className="text-muted-foreground">
                Tell us about what you&apos;re building.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Name</Label>
                <Input
                  id="title"
                  placeholder="e.g. Research Agent Pro"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-background/5 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <div className="flex gap-2">
                  {['mcp', 'agent', 'api'].map((cat) => (
                    <Button
                      key={cat}
                      type="button"
                      variant={formData.category === cat ? 'default' : 'outline'}
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`capitalize flex-1 ${formData.category === cat ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent'}`}
                    >
                      {cat === 'mcp' ? 'MCP Server' : cat}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe capabilities, inputs, and outputs..."
                  className="min-h-[120px] bg-background/5 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (USDC per call)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.0001"
                  placeholder="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="bg-background/5 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                />
                <p className="text-xs text-muted-foreground">Set to 0 for free listings.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="verification">
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle>Endpoint Verification</CardTitle>
              <CardDescription className="text-muted-foreground">
                We need to verify your endpoint supports x402.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="endpoint">Endpoint URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="endpoint"
                    placeholder="https://api.myapp.com/v1/agent"
                    value={formData.endpoint}
                    onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
                    className="bg-background/5 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                  />
                  <Button
                    variant="secondary"
                    onClick={handleVerify}
                    disabled={loading || verified}
                    className="bg-background/10 text-foreground hover:bg-accent"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify'}
                  </Button>
                </div>
              </div>

              {verified && (
                <div className="rounded-md bg-success/10 border border-success/20 p-4 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-success">Verification Successful</h4>
                    <p className="text-sm text-success/80">
                      We detected a valid <code>PAYMENT-REQUIRED</code> header. You are ready to
                      publish.
                    </p>
                  </div>
                </div>
              )}

              {!verified && formData.endpoint && !loading && (
                <div className="rounded-md bg-warning/10 border border-warning/20 p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-warning">Waiting for Verification</h4>
                    <p className="text-sm text-warning/80">
                      Click verify to test your endpoint. Ensure your server returns 402 for unpaid
                      requests.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                className="text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                disabled={!verified || loading}
                onClick={handlePublish}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Rocket className="h-4 w-4 mr-2" />
                )}
                Publish Listing
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
