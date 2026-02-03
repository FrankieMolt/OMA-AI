'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { TelemetryPanel } from './TelemetryPanel';
import { AgentChat } from './AgentChat';
import MemVidPlayer from './MemVidPlayer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import strings from '@/constants/text.json';

export function ConsoleLayout() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Mobile View: Tabbed Interface
  if (!isDesktop) {
    return (
      <Tabs defaultValue="chat" className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-3 bg-foreground/5 border border-border/60">
          <TabsTrigger value="telemetry">{strings.console.layout.tabs.sensors}</TabsTrigger>
          <TabsTrigger value="chat">{strings.console.layout.tabs.control}</TabsTrigger>
          <TabsTrigger value="memvid">{strings.console.layout.tabs.vision}</TabsTrigger>
        </TabsList>
        <div className="flex-1 mt-4 overflow-hidden">
          <TabsContent value="telemetry" className="h-full m-0">
            <TelemetryPanel />
          </TabsContent>
          <TabsContent value="chat" className="h-full m-0">
            <AgentChat />
          </TabsContent>
          <TabsContent value="memvid" className="h-full m-0">
            <MemVidPlayer />
          </TabsContent>
        </div>
      </Tabs>
    );
  }

  // Desktop View: 3-Pane Resizable Layout
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-full rounded-xl glass-panel overflow-hidden"
    >
      {/* LEFT PANE: TELEMETRY */}
      <ResizablePanel
        defaultSize={20}
        minSize={15}
        maxSize={30}
        className="border-r border-border/60"
      >
        <TelemetryPanel />
      </ResizablePanel>

      <ResizableHandle withHandle className="bg-foreground/5 hover:bg-primary/20 transition-colors" />

      {/* CENTER PANE: CHAT / INTERACTION */}
      <ResizablePanel defaultSize={50} minSize={30}>
        <AgentChat />
      </ResizablePanel>

      <ResizableHandle withHandle className="bg-foreground/5 hover:bg-primary/20 transition-colors" />

      {/* RIGHT PANE: MEMVID */}
      <ResizablePanel
        defaultSize={30}
        minSize={20}
        maxSize={40}
        className="border-l border-border/60"
      >
        <MemVidPlayer />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
