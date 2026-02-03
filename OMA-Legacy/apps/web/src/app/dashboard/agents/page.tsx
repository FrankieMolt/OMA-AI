'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import {
  Bot,
  Plus,
  Search,
  MoreVertical,
  Settings,
  Play,
  Pause,
  Trash2,
  TrendingUp,
  Activity,
  Shield,
  Grid,
  List,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AgentCard } from '@/components/dashboard/AgentCard';
import { AgentManagementModal, AgentConfig } from '@/components/dashboard/AgentManagementModal';
import { toast } from 'sonner';

export interface Agent {
  id: number;
  name: string;
  description: string;
  category: 'agent' | 'mcp' | 'api';
  pricingType: 'free' | 'usage' | 'subscription' | 'one-time';
  price: number;
  capabilities: string[];
  tags: string[];
  status: 'active' | 'inactive' | 'maintenance';
  totalCalls: number;
  revenue: number;
  rating: number;
  lastUsed: string;
  createdAt: string;
}

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'agent' | 'mcp' | 'api'>('all');
  const [selectedStatus, setSelectedStatus] = useState<
    'all' | 'active' | 'inactive' | 'maintenance'
  >('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const queryClient = useQueryClient();

  // Fetch agents
  const { data: agents = [], isLoading } = useQuery<Agent[]>({
    queryKey: ['agents'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/agents');
      if (!res.ok) throw new Error('Failed to fetch agents');
      return res.json();
    },
  });

  // Create agent mutation
  const createAgentMutation = useMutation({
    mutationFn: async (config: AgentConfig) => {
      const res = await fetch('/api/dashboard/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error('Failed to create agent');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      toast.success('Agent deployed successfully');
    },
  });

  // Update agent mutation
  const updateAgentMutation = useMutation({
    mutationFn: async ({ id, config }: { id: number; config: AgentConfig }) => {
      const res = await fetch(`/api/dashboard/agents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error('Failed to update agent');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      toast.success('Agent updated successfully');
    },
  });

  // Delete agent mutation
  const deleteAgentMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/dashboard/agents/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete agent');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      toast.success('Agent deleted successfully');
    },
  });

  // Toggle agent status
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: 'active' | 'inactive' }) => {
      const res = await fetch(`/api/dashboard/agents/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  // Filter agents
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || agent.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateAgent = async (config: AgentConfig) => {
    await createAgentMutation.mutateAsync(config);
  };

  const handleEditAgent = async (config: AgentConfig) => {
    if (editingAgent) {
      await updateAgentMutation.mutateAsync({ id: editingAgent.id, config });
    }
  };

  const handleDeleteAgent = (id: number, name: string) => {
    if (
      window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)
    ) {
      deleteAgentMutation.mutate(id);
    }
  };

  const handleToggleStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toggleStatusMutation.mutate({ id, status: newStatus });
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Agents</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="glass-card">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-foreground/10 rounded w-3/4" />
                  <div className="h-3 bg-foreground/10 rounded w-1/2" />
                  <div className="h-3 bg-foreground/10 rounded w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agents</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor your deployed AI agents</p>
        </div>
        <div className="flex gap-3">
          <Link href="/marketplace">
            <Button
              variant="outline"
              className="glass-enhanced border-border/50 hover:bg-foreground/5"
            >
              <Grid className="w-4 h-4 mr-2" />
              Browse Marketplace
            </Button>
          </Link>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Deploy Agent
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{agents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {agents.filter((a) => a.status === 'active').length} active
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Total Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {agents.reduce((sum, a) => sum + a.totalCalls, 0).toLocaleString()}
            </div>
            <p className="text-xs text-success mt-1">+15.3% this month</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${agents.reduce((sum, a) => sum + a.revenue, 0).toFixed(2)}
            </div>
            <p className="text-xs text-success mt-1">+22.1% this month</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              Avg Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {agents.length > 0
                ? (agents.reduce((sum, a) => sum + a.rating, 0) / agents.length).toFixed(1)
                : '0.0'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Based on user reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search agents by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-foreground/5 border-border/50"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as typeof selectedCategory)}
                className="bg-foreground/5 border border-border/50 rounded-md px-3 py-2 text-foreground"
              >
                <option value="all">All Types</option>
                <option value="agent">AI Agents</option>
                <option value="mcp">MCP Servers</option>
                <option value="api">APIs</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}
                className="bg-foreground/5 border border-border/50 rounded-md px-3 py-2 text-foreground"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="border-border/50"
              >
                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Grid/List */}
      {filteredAgents.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <Bot className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No agents found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your filters'
                : 'Deploy your first agent to get started'}
            </p>
            {!searchQuery && selectedCategory === 'all' && selectedStatus === 'all' && (
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Deploy Your First Agent
              </Button>
            )}
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              id={agent.id}
              name={agent.name}
              description={agent.description}
              type={agent.category}
              status={agent.status}
              category={agent.category}
              usage={agent.totalCalls}
              revenue={agent.revenue}
              rating={agent.rating}
              onToggleStatus={(id) => handleToggleStatus(id, agent.status)}
              onEdit={(id) => {
                if (id !== agent.id) {
                  return;
                }
                setEditingAgent(agent);
                setShowEditModal(true);
              }}
              onDelete={(id) => handleDeleteAgent(id, agent.name)}
            />
          ))}
        </div>
      ) : (
        <Card className="glass-card">
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Agent</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Calls</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Revenue</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Rating</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map((agent) => (
                  <tr key={agent.id} className="border-b border-border/50 hover:bg-foreground/[0.02]">
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-foreground">{agent.name}</div>
                        <div className="text-sm text-muted-foreground">{agent.description}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="capitalize">
                        {agent.category}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={agent.status === 'active' ? 'default' : 'secondary'}
                        className={
                          agent.status === 'active'
                            ? 'bg-success/10 text-success border-success/20'
                            : 'bg-warning/10 text-warning border-warning/20'
                        }
                      >
                        {agent.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right font-mono text-foreground">
                      {agent.totalCalls.toLocaleString()}
                    </td>
                    <td className="p-4 text-right font-mono text-success">
                      ${agent.revenue.toFixed(2)}
                    </td>
                    <td className="p-4 text-right text-warning">★ {agent.rating.toFixed(1)}</td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass-card">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingAgent(agent);
                              setShowEditModal(true);
                            }}
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Configure
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleStatus(agent.id, agent.status)}
                          >
                            {agent.status === 'active' ? (
                              <>
                                <Pause className="w-4 h-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteAgent(agent.id, agent.name)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Create Agent Modal */}
      <AgentManagementModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        mode="create"
        onSave={handleCreateAgent}
        isLoading={createAgentMutation.isPending}
      />

      {/* Edit Agent Modal */}
      {editingAgent && (
        <AgentManagementModal
          open={showEditModal}
          onOpenChange={setShowEditModal}
          agent={{
            id: editingAgent.id,
            name: editingAgent.name,
            description: editingAgent.description,
            category: editingAgent.category,
            pricingType: editingAgent.pricingType,
            price: editingAgent.price,
            capabilities: editingAgent.capabilities,
            tags: editingAgent.tags,
            status: editingAgent.status,
          }}
          mode="edit"
          onSave={handleEditAgent}
          isLoading={updateAgentMutation.isPending}
        />
      )}
    </div>
  );
}
