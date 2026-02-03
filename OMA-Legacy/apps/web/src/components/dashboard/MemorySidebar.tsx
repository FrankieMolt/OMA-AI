'use client';

import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Folder, RefreshCw, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import strings from '@/constants/text.json';

type MemoryItem = {
  id: string;
  content: string;
  type: string;
  tags?: string[];
  timestamp: string;
};

export function MemorySidebar() {
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMemories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/memory');
      const data = await res.json();
      if (Array.isArray(data)) {
        setMemories(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  return (
    <div className="w-80 border-l border-border/60 bg-foreground/5 backdrop-blur-xl h-full hidden xl:flex flex-col">
      <div className="p-4 border-b border-border/60 flex justify-between items-center">
        <h2 className="font-mono text-sm font-bold text-muted-foreground flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-primary" />
          {strings.dashboard.memory_sidebar.title}
        </h2>
        <Button variant="ghost" size="icon" onClick={fetchMemories} className="h-6 w-6">
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Folder className="w-3 h-3" />
            <span>{strings.dashboard.memory_sidebar.path}</span>
          </div>

          {memories.length === 0 ? (
            <div className="text-xs text-muted-foreground/70 text-center py-8">
              {strings.dashboard.memory_sidebar.empty}
            </div>
          ) : (
            memories.map((mem) => (
              <Card
                key={mem.id}
                className="bg-foreground/5 border-border/60 hover:border-primary/30 transition-all hover:bg-foreground/10"
              >
                <CardHeader className="p-3 pb-2">
                  <div className="flex justify-between items-start">
                    <Badge
                      variant="outline"
                      className="text-[10px] h-5 border-primary/20 text-primary capitalize"
                    >
                      {mem.type}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {new Date(mem.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <p className="text-xs text-foreground/80 line-clamp-3 font-mono">{mem.content}</p>
                  {mem.tags && mem.tags.length > 0 && (
                    <div className="flex gap-1 flex-wrap mt-2">
                      {mem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] text-muted-foreground bg-foreground/5 px-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border/60 bg-foreground/5">
        <div className="text-[10px] text-muted-foreground font-mono flex flex-col gap-1">
          <div className="flex justify-between">
            <span>{strings.dashboard.memory_sidebar.storage_label}</span>
            <span className="text-primary">{strings.dashboard.memory_sidebar.storage_value}</span>
          </div>
          <div className="flex justify-between">
            <span>{strings.dashboard.memory_sidebar.encryption_label}</span>
            <span className="text-success">{strings.dashboard.memory_sidebar.encryption_value}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
