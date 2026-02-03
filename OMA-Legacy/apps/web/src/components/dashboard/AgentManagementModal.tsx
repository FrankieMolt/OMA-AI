'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, CheckCircle, Loader2, Zap, Activity } from 'lucide-react';
import { toast } from 'sonner';

export interface AgentConfig {
  id?: number;
  name: string;
  description: string;
  category: 'agent' | 'mcp' | 'api';
  pricingType: 'free' | 'usage' | 'subscription' | 'one-time';
  price: number;
  endpointUrl?: string;
  capabilities: string[];
  tags: string[];
  status: 'active' | 'inactive' | 'maintenance';
}

interface AgentManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent?: AgentConfig;
  onSave: (config: AgentConfig) => Promise<void>;
  mode: 'create' | 'edit';
  isLoading?: boolean;
}

export function AgentManagementModal({
  open,
  onOpenChange,
  agent,
  onSave,
  mode,
  isLoading = false,
}: AgentManagementModalProps) {
  const [config, setConfig] = React.useState<AgentConfig>(
    agent || {
      name: '',
      description: '',
      category: 'agent',
      pricingType: 'free',
      price: 0,
      capabilities: [],
      tags: [],
      status: 'active',
    }
  );
  const [newCapability, setNewCapability] = React.useState('');
  const [newTag, setNewTag] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  React.useEffect(() => {
    if (agent) {
      setConfig(agent);
    }
  }, [agent]);

  React.useEffect(() => {
    const valid =
      config.name.length > 0 &&
      config.description.length > 0 &&
      (config.pricingType === 'free' || config.price >= 0);
    setIsValid(valid);
  }, [config]);

  const handleAddCapability = () => {
    if (newCapability.trim() && !config.capabilities.includes(newCapability.trim())) {
      setConfig((prev) => ({
        ...prev,
        capabilities: [...prev.capabilities, newCapability.trim()],
      }));
      setNewCapability('');
    }
  };

  const handleRemoveCapability = (capability: string) => {
    setConfig((prev) => ({
      ...prev,
      capabilities: prev.capabilities.filter((c) => c !== capability),
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !config.tags.includes(newTag.trim())) {
      setConfig((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setConfig((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSave = async () => {
    if (!isValid) return;
    try {
      await onSave(config);
      toast.success(
        mode === 'create' ? 'Agent created successfully' : 'Agent updated successfully'
      );
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to save agent', {
        description: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            {mode === 'create' ? 'Deploy New Agent' : 'Configure Agent'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Configure and deploy your new AI agent to the marketplace'
              : 'Update your agent configuration and settings'}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Agent Name *</Label>
              <Input
                id="name"
                value={config.name}
                onChange={(e) => setConfig((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Artemis-V2"
                className="bg-foreground/5 border-border/60"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={config.category}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    category: e.target.value as AgentConfig['category'],
                  }))
                }
                className="w-full bg-foreground/5 border border-border/60 rounded-md px-3 py-2 text-foreground"
              >
                <option value="agent">AI Agent</option>
                <option value="mcp">MCP Server</option>
                <option value="api">API</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={config.description}
                onChange={(e) => setConfig((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what your agent does..."
                className="bg-foreground/5 border-border/60 min-h-[100px]"
              />
            </div>

            {config.category === 'api' && (
              <div className="space-y-2">
                <Label htmlFor="endpoint">Endpoint URL</Label>
                <Input
                  id="endpoint"
                  value={config.endpointUrl || ''}
                  onChange={(e) => setConfig((prev) => ({ ...prev, endpointUrl: e.target.value }))}
                  placeholder="https://api.example.com/v1/endpoint"
                  className="bg-foreground/5 border-border/60"
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="capabilities" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Capabilities</Label>
              <div className="flex gap-2">
                <Input
                  value={newCapability}
                  onChange={(e) => setNewCapability(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCapability()}
                  placeholder="Add capability..."
                  className="bg-foreground/5 border-border/60"
                />
                <Button onClick={handleAddCapability} size="sm">
                  <Activity className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {config.capabilities.map((capability) => (
                  <Badge key={capability} variant="secondary" className="gap-1">
                    {capability}
                    <button
                      onClick={() => handleRemoveCapability(capability)}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  placeholder="Add tag..."
                  className="bg-foreground/5 border-border/60"
                />
                <Button onClick={handleAddTag} size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {config.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="gap-1">
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={config.status}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    status: e.target.value as AgentConfig['status'],
                  }))
                }
                className="w-full bg-foreground/5 border border-border/60 rounded-md px-3 py-2 text-foreground"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="pricingType">Pricing Type</Label>
              <select
                id="pricingType"
                value={config.pricingType}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    pricingType: e.target.value as AgentConfig['pricingType'],
                  }))
                }
                className="w-full bg-foreground/5 border border-border/60 rounded-md px-3 py-2 text-foreground"
              >
                <option value="free">Free</option>
                <option value="usage">Per Usage</option>
                <option value="subscription">Subscription</option>
                <option value="one-time">One-time</option>
              </select>
            </div>

            {config.pricingType !== 'free' && (
              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={config.price}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, price: parseFloat(e.target.value) || 0 }))
                  }
                  placeholder="0.00"
                  className="bg-foreground/5 border-border/60"
                />
                <p className="text-xs text-muted-foreground">
                  Price will be automatically converted to credits (1000 credits = $1 USD)
                </p>
              </div>
            )}

            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-primary mb-1">Pricing Tips</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Free agents get more initial visibility</li>
                    <li>• Per usage pricing is ideal for variable workloads</li>
                    <li>• Subscription pricing ensures predictable revenue</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!isValid || isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                {mode === 'create' ? 'Deploy Agent' : 'Save Changes'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
