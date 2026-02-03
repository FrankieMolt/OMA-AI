
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function DataImportSettings() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleImport = async (type: string, name: string) => {
    setLoading(type);
    try {
      const response = await fetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Import failed');
      }

      await response.json();
      toast.success(`${name} imported successfully!`);
    } catch (error) {
      toast.error(`Failed to import ${name}`, {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card className="glass-card border-none">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Database className="w-5 h-5 text-info" />
          Data Import
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Import community listings and seed data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-background/5 border border-border/50 rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-foreground">Scientific Skills</h3>
                <p className="text-sm text-muted-foreground">
                  Import 130+ scientific research skills from K-Dense-AI
                </p>
              </div>
              <Download className="w-4 h-4 text-muted-foreground" />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-border/50 hover:bg-accent"
              onClick={() => handleImport('scientific-skills', 'Scientific Skills')}
              disabled={!!loading}
            >
              {loading === 'scientific-skills' ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Import Skills
            </Button>
          </div>

          <div className="p-4 bg-background/5 border border-border/50 rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-foreground">Superpowers</h3>
                <p className="text-sm text-muted-foreground">
                  Import developer workflow skills from obra/superpowers
                </p>
              </div>
              <Download className="w-4 h-4 text-muted-foreground" />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-border/50 hover:bg-accent"
              onClick={() => handleImport('superpowers', 'Superpowers')}
              disabled={!!loading}
            >
              {loading === 'superpowers' ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Import Superpowers
            </Button>
          </div>

          <div className="p-4 bg-background/5 border border-border/50 rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-foreground">Community Agents</h3>
                <p className="text-sm text-muted-foreground">
                  Import 40+ agents from wshobson/agents repository
                </p>
              </div>
              <Download className="w-4 h-4 text-muted-foreground" />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-border/50 hover:bg-accent"
              onClick={() => handleImport('wshobson-agents', 'Community Agents')}
              disabled={!!loading}
            >
              {loading === 'wshobson-agents' ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Import Agents
            </Button>
          </div>

          <div className="p-4 bg-background/5 border border-border/50 rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-foreground">Import All</h3>
                <p className="text-sm text-muted-foreground">
                  Run all available community importers at once
                </p>
              </div>
              <Database className="w-4 h-4 text-muted-foreground" />
            </div>
            <Button
              variant="default"
              size="sm"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => handleImport('all', 'All Community Data')}
              disabled={!!loading}
            >
              {loading === 'all' ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Import Everything
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
