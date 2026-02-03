'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Battery, MapPin, Cpu } from 'lucide-react';
import strings from '@/constants/text.json';

export function TelemetryPanel() {
  const [data, setData] = useState({
    battery: 0,
    voltage: 0,
    cpuTemp: 0,
    lat: 0,
    lng: 0,
    motorStatus: strings.console.telemetry.hardware.motors,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/console/telemetry');
        if (res.ok) {
          const json = await res.json();
          setData({
            battery: json.battery?.level || json.battery || 0,
            voltage: json.battery?.voltage || json.voltage || 0,
            cpuTemp: json.hardware?.cpuTemp || json.cpu_temp || 0,
            lat: json.position?.lat || json.gps?.lat || 0,
            lng: json.position?.lng || json.gps?.lng || 0,
            motorStatus: json.hardware?.motorStatus || json.system_status || strings.console.memvid.status.offline,
          });
        }
      } catch {
        setData((prev) => ({
          ...prev,
          motorStatus: strings.console.memvid.status.offline,
        }));
      }
    };

    fetchData(); // Fetch immediately
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border/60">
        <h2 className="text-sm font-mono font-bold text-primary flex items-center gap-2">
          <Activity className="size-4" />
          {strings.console.telemetry.header_title}
        </h2>
      </div>

      <div className="p-4 space-y-6 overflow-y-auto custom-scrollbar">
        {/* Battery Module */}
        <Card className="glass-card shadow-glow">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center text-xs text-primary/80 font-mono uppercase tracking-widest">
              <span>{strings.console.telemetry.power.title}</span>
              <Battery className="size-4" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{data.battery}%</div>
                <div className="text-xs text-muted-foreground/70">{strings.console.telemetry.power.charge}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{data.voltage}V</div>
                <div className="text-xs text-muted-foreground/70">{strings.console.telemetry.power.voltage}</div>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="h-1 w-full bg-foreground/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${data.battery}%` }}></div>
            </div>
          </CardContent>
        </Card>

        {/* GPS Module */}
        <Card className="glass-card shadow-glow">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center text-xs text-primary/80 font-mono uppercase tracking-widest">
              <span>{strings.console.telemetry.position.title}</span>
              <MapPin className="size-4" />
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground/70">{strings.console.telemetry.position.lat}</span>
                <span className="text-foreground">{data.lat.toFixed(6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground/70">{strings.console.telemetry.position.lng}</span>
                <span className="text-foreground">{data.lng.toFixed(6)}</span>
              </div>
            </div>
            <div className="aspect-video bg-foreground/5 rounded border border-border/60 flex items-center justify-center">
              <span className="text-xs text-primary">{strings.console.telemetry.position.map_offline}</span>
            </div>
          </CardContent>
        </Card>

        {/* Hardware Module */}
        <Card className="bg-foreground/5 border-border/60 shadow-[0_0_15px_hsl(var(--primary)/0.05)]">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center text-xs text-primary/80 font-mono uppercase tracking-widest">
              <span>{strings.console.telemetry.hardware.title}</span>
              <Cpu className="size-4" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-foreground/5 rounded border border-border/60">
                <div className="text-lg font-bold text-foreground">{data.cpuTemp}°C</div>
                <div className="text-[10px] text-muted-foreground/70">{strings.console.telemetry.hardware.core_temp}</div>
              </div>
              <div className="p-2 bg-foreground/5 rounded border border-border/60">
                <div className="text-lg font-bold text-foreground">{data.motorStatus}</div>
                <div className="text-[10px] text-muted-foreground/70">{strings.console.telemetry.hardware.motors}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
