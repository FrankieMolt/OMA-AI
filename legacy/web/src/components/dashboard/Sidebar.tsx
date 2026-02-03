import Link from 'next/link';
import {
  LayoutDashboard,
  Bot,
  Wallet,
  BarChart,
  Terminal,
  Power,
  MessageSquareCode,
  Globe,
  Activity,
} from 'lucide-react';
import { Zap } from 'lucide-react';
import strings from '@/constants/text.json';

export function Sidebar() {
  return (
    <aside className="relative z-10 w-20 lg:w-64 flex flex-col justify-between border-r border-border/60 bg-background/80 backdrop-blur-xl h-full transition-all duration-300 min-h-screen">
      <div className="flex flex-col gap-8 p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 pl-2">
          <div className="size-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.3)]">
            <Zap className="text-background text-lg font-bold size-5" />
          </div>
          <div className="hidden lg:flex flex-col">
            <h1 className="text-lg font-bold tracking-widest leading-none text-foreground">{strings.common.app_name}</h1>
            <span className="text-[10px] text-muted-foreground tracking-wider">{strings.dashboard.sidebar.command_version}</span>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-4 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all group"
          >
            <LayoutDashboard className="group-hover:scale-110 transition-transform size-5" />
            <span className="hidden lg:block text-sm font-medium tracking-wide">{strings.dashboard.sidebar.overview}</span>
          </Link>
          <Link
            href="/dashboard/console"
            className="flex items-center gap-4 px-3 py-3 rounded-lg bg-primary/10 text-primary border-l-2 border-primary transition-all group"
          >
            <Activity className="group-hover:scale-110 transition-transform size-5" />
            <span className="hidden lg:block text-sm font-medium tracking-wide">{strings.dashboard.sidebar.live_console}</span>
          </Link>
          <Link
            href="/dashboard/chat"
            className="flex items-center gap-4 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all group"
          >
            <MessageSquareCode className="group-hover:scale-110 transition-transform size-5" />
            <span className="hidden lg:block text-sm font-medium tracking-wide">{strings.dashboard.sidebar.secure_chat}</span>
          </Link>
          <Link
            href="/dashboard/agents"
            className="flex items-center gap-4 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all group"
          >
            <Bot className="group-hover:scale-110 transition-transform size-5" />
            <span className="hidden lg:block text-sm font-medium tracking-wide">{strings.dashboard.sidebar.agent_fleet}</span>
          </Link>
          <Link
            href="/dashboard/marketplace"
            className="flex items-center gap-4 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all group"
          >
            <Globe className="group-hover:scale-110 transition-transform size-5" />
            <span className="hidden lg:block text-sm font-medium tracking-wide">{strings.dashboard.sidebar.my_listings}</span>
          </Link>
          <Link
            href="/dashboard/wallet"
            className="flex items-center gap-4 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all group"
          >
            <Wallet className="group-hover:scale-110 transition-transform size-5" />
            <span className="hidden lg:block text-sm font-medium tracking-wide">{strings.dashboard.sidebar.wallet_x402}</span>
          </Link>
          <Link
            href="/dashboard/analytics"
            className="flex items-center gap-4 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all group"
          >
            <BarChart className="group-hover:scale-110 transition-transform size-5" />
            <span className="hidden lg:block text-sm font-medium tracking-wide">{strings.dashboard.sidebar.analytics}</span>
          </Link>
          <Link
            href="/dashboard/logs"
            className="flex items-center gap-4 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all group"
          >
            <Terminal className="group-hover:scale-110 transition-transform size-5" />
            <span className="hidden lg:block text-sm font-medium tracking-wide">{strings.dashboard.sidebar.logs}</span>
          </Link>
        </nav>
      </div>
      <div className="p-4 border-t border-border/60">
        <button className="flex items-center gap-4 px-3 py-3 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all group w-full text-left">
          <Power className="group-hover:rotate-90 transition-transform size-5" />
          <span className="hidden lg:block text-sm font-medium tracking-wide">{strings.dashboard.sidebar.emergency_stop}</span>
        </button>
      </div>
    </aside>
  );
}
