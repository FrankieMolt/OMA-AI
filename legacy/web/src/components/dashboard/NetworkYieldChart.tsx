interface NetworkYieldChartProps {
  yieldAmount?: string | number;
  latency?: string | number;
  className?: string;
}

export function NetworkYieldChart({
  yieldAmount = '4,203.55',
  latency = '14',
  className,
}: NetworkYieldChartProps) {
  return (
    <div
      className={`glass-enhanced rounded-md border border-border/60 p-6 box-glow relative overflow-hidden group ${className || ''}`}
    >
      {/* Decorative glow */}
      <div className="absolute -top-24 -right-24 size-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="flex flex-wrap items-end justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-muted-foreground text-sm tracking-wider uppercase mb-1">
            Network Yield vs. Latency
          </h3>
          <div className="flex items-baseline gap-4">
            <div>
              <span className="text-3xl font-bold text-foreground tabular-nums tracking-tighter">
                {typeof yieldAmount === 'number' ? yieldAmount.toLocaleString() : yieldAmount}
              </span>
              <span className="text-sm text-primary font-bold ml-1">USDC</span>
            </div>
            <div className="h-8 w-px bg-border/60"></div>
            <div>
              <span className="text-xl font-bold text-secondary tabular-nums tracking-tighter">
                {latency}
              </span>
              <span className="text-xs text-secondary/80 font-bold ml-1">ms avg</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded bg-foreground/5 hover:bg-foreground/10 text-xs font-medium border border-border/60 transition-colors text-foreground">
            1H
          </button>
          <button className="px-3 py-1 rounded bg-primary/20 text-primary text-xs font-medium border border-primary/20 shadow-[0_0_10px_rgba(0,255,217,0.1)]">
            24H
          </button>
          <button className="px-3 py-1 rounded bg-foreground/5 hover:bg-foreground/10 text-xs font-medium border border-border/60 transition-colors text-foreground">
            7D
          </button>
        </div>
      </div>
      {/* Chart SVG */}
      <div className="relative w-full h-64">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          <div className="w-full h-px bg-border/60"></div>
          <div className="w-full h-px bg-border/60"></div>
          <div className="w-full h-px bg-border/60"></div>
          <div className="w-full h-px bg-border/60"></div>
          <div className="w-full h-px bg-border/60"></div>
        </div>
        <svg
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 400 150"
        >
          <defs>
            <linearGradient id="gradientYield" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3"></stop>
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0"></stop>
            </linearGradient>
            <linearGradient id="gradientLatency" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.1"></stop>
              <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
          {/* Tooltip Line (simulated) */}
          <line
            stroke="hsl(var(--foreground))"
            strokeDasharray="4 4"
            strokeOpacity="0.2"
            x1="280"
            x2="280"
            y1="0"
            y2="150"
          ></line>
          <circle
            className="animate-pulse shadow-neon"
            cx="280"
            cy="55"
            fill="hsl(var(--primary))"
            r="4"
          ></circle>
          <circle
            className="animate-pulse shadow-neon-secondary"
            cx="280"
            cy="95"
            fill="hsl(var(--secondary))"
            r="4"
          ></circle>
          {/* Yield Area (Primary) */}
          <path
            d="M0 120 C 40 110, 60 90, 100 80 S 160 40, 200 60 S 260 90, 300 50 S 360 20, 400 40 V 150 H 0 Z"
            fill="url(#gradientYield)"
          ></path>
          <path
            className="drop-shadow-[0_0_5px_hsl(var(--primary)/0.5)]"
            d="M0 120 C 40 110, 60 90, 100 80 S 160 40, 200 60 S 260 90, 300 50 S 360 20, 400 40"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeLinecap="round"
            strokeWidth="2"
          ></path>
          {/* Latency Line (Secondary) */}
          <path
            className="drop-shadow-[0_0_5px_hsl(var(--accent)/0.5)]"
            d="M0 100 C 50 105, 80 110, 120 100 S 180 80, 220 90 S 280 120, 320 90 S 370 70, 400 85"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeDasharray="2 2"
            strokeLinecap="round"
            strokeWidth="2"
          ></path>
        </svg>
        <div className="absolute top-8 left-[65%] bg-surface border border-border/60 p-2 rounded shadow-xl backdrop-blur-md">
          <div className="text-[10px] text-muted-foreground mb-1">14:30 UTC</div>
          <div className="text-[10px] text-muted-foreground mb-1">14:30 UTC</div>
          <div className="text-xs font-bold text-primary">Yield: $42.50</div>
          <div className="text-xs font-bold text-secondary">Lat: 18ms</div>
        </div>
      </div>
    </div>
  );
}
