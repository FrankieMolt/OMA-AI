import { Wifi } from 'lucide-react';
import { WalletButton } from '@/components/wallet/WalletButton';
import strings from '@/constants/text.json';

export function Header({ user }: { user?: { name?: string | null } }) {
  return (
    <header className="h-16 border-b border-border/60 bg-background/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50">
      <h2 className="text-foreground text-lg font-bold tracking-widest flex items-center gap-2">
        <Wifi className="text-primary animate-pulse size-5" />
        {strings.dashboard.header.network_status}
      </h2>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-foreground/5 px-3 py-1.5 rounded-full border border-border/60">
          <div className="size-2 rounded-full bg-primary shadow-neon"></div>
          <span className="text-xs font-mono text-primary">{strings.dashboard.header.tps_label}: 2,459</span>
        </div>
        <div className="flex items-center gap-3 pl-6 border-l border-border/60">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-foreground">{user?.name || strings.dashboard.header.anonymous_agent}</p>
            <p className="text-[10px] text-muted-foreground">{strings.dashboard.header.net_label}: {strings.dashboard.header.net_value}</p>
          </div>
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
