'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Eye, Film, Maximize2, Play, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import strings from '@/constants/text.json';

export default function MemVidPlayer() {
  const [status, setStatus] = useState(strings.console.memvid.status.connecting);
  const [logs, setLogs] = useState<string[]>([]);
  const [frameUrl, setFrameUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const captureFrame = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 360;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.drawImage(video, 0, 0, width, height);
    const imageData = canvas.toDataURL('image/jpeg', 0.75);
    setFrameUrl(imageData);
    setStatus(strings.console.memvid.status.live_feed);

    try {
      // Send frame to MemVid for scanning (QR/OCR/Object Detection)
      const res = await fetch('/api/console/memvid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: 'video_frame',
          imageData,
          tags: ['video_frame'],
          type: 'observation',
          importance: 0.7,
          metadata: { confidence: 0.9 },
        }),
      });
      
      const data = await res.json();
      
      // Update logs with scan results
      if (data.scan?.qr) {
        setLogs(prev => [`${strings.console.memvid.logs.scan_qr} ${data.scan.qr}`, ...prev].slice(0, 10));
      }
      if (data.scan?.text) {
        setLogs(prev => [`${strings.console.memvid.logs.scan_ocr} ${data.scan.text}`, ...prev].slice(0, 10));
      }

    } catch {  
      // Silent error
    }
  }, []);
  const startCapture = useCallback(
    async (file: File) => {
      const video = videoRef.current;
      if (!video) return;
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const objectUrl = URL.createObjectURL(file);
      video.src = objectUrl;
      video.muted = true;
      video.playsInline = true;

      await new Promise<void>((resolve) => {
        video.onloadedmetadata = () => resolve();
      });

      try {
        await video.play();
      } catch {
        setStatus(strings.console.memvid.status.offline);
        URL.revokeObjectURL(objectUrl);
        return;
      }

      await captureFrame();
      intervalRef.current = window.setInterval(async () => {
        if (video.paused || video.ended) {
          if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsProcessing(false);
          URL.revokeObjectURL(objectUrl);
          return;
        }
        await captureFrame();
      }, 1000);
    },
    [captureFrame]
  );
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = '';
      if (!file) return;
      setIsProcessing(true);
      setStatus(strings.console.memvid.status.capturing);
      startCapture(file);
    },
    [startCapture]
  );

  useEffect(() => {
    const fetchFrame = async () => {
      try {
        const res = await fetch('/api/console/memvid');
        if (res.ok) {
          const data = await res.json();
          if (data.imageData) {
            setFrameUrl(data.imageData);
            setStatus(strings.console.memvid.status.live_feed);
          } else if (data.status === 'empty') {
            setStatus(strings.console.memvid.status.no_frames);
          }
          if (data.metadata?.objects_detected) {
            const timestamp = new Date().toLocaleTimeString();
            const log = `[${timestamp}] Detected: ${data.metadata.objects_detected.join(', ')} (${data.metadata.confidence})`;
            setLogs((prev) => [log, ...prev].slice(0, 10));
          }
        }
      } catch {  
        setStatus(strings.console.memvid.status.offline);
      }
    };

    const interval = setInterval(fetchFrame, 2000); // 0.5 FPS for simulation
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col bg-foreground/5">
      <div className="p-4 border-b border-border/60 bg-foreground/5">
        <h2 className="text-sm font-mono font-bold text-primary flex items-center gap-2">
          <Eye className="size-4" />
          {strings.console.memvid.title}
        </h2>
      </div>

      <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
        {/* Main Viewport */}
        <div className="relative aspect-video bg-foreground/5 rounded-lg border border-border/60 shadow-[0_0_30px_hsl(var(--primary)/0.1)] overflow-hidden group">
          {/* Placeholder Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

          {frameUrl && (
            <Image
              src={frameUrl}
              alt="MemVid Frame"
              fill
              className="absolute inset-0 object-cover"
              unoptimized // Since we use data URLs
            />
          )}

          {/* Center Status */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-primary/50 flex flex-col items-center gap-2">
              <Film className="size-12 animate-pulse" />
              <span className="font-mono text-xs tracking-widest">{strings.console.memvid.overlay.awaiting}</span>
            </div>
          </div>

          {/* Overlays */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-destructive/15 text-destructive border-destructive/40 animate-pulse">
              {status}
            </Badge>
            <Badge className="bg-foreground/5 text-foreground border-border/60 font-mono">
              {strings.console.memvid.overlay.rec}
            </Badge>
          </div>

          {/* Controls Overlay (Bottom) */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-foreground hover:bg-foreground/10"
                >
                  <Play className="size-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-foreground hover:bg-foreground/10"
                >
                  <SkipBack className="size-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-foreground hover:bg-foreground/10"
                >
                  <SkipForward className="size-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-foreground hover:bg-foreground/10"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                >
                  {isProcessing ? strings.console.memvid.overlay.capturing : strings.console.memvid.overlay.load_video}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-foreground hover:bg-foreground/10"
                >
                  <Maximize2 className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Object Detection / Analysis Log */}
        <div className="flex-1 bg-foreground/5 rounded border border-border/60 p-3 overflow-y-auto font-mono text-xs custom-scrollbar">
          <div className="text-primary mb-2 font-bold opacity-70">{strings.console.memvid.logs.title}</div>
          <div className="space-y-1 text-muted-foreground">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span>{log}</span>
              </div>
            ))}
            {logs.length === 0 && (
              <div className="text-muted-foreground/60">{strings.console.memvid.logs.waiting}</div>
            )}
          </div>
        </div>

        <video ref={videoRef} className="hidden" />
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
