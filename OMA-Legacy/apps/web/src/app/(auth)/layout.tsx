import { SolanaLogo } from '@/components/ui/solana-logo';
import Link from 'next/link';
import strings from '@/constants/text.json';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden selection:bg-primary/30">
      <div className="fixed inset-0 -z-20 bg-background" />
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      <Link href="/" className="mb-8 group">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-foreground/5 rounded-xl flex items-center justify-center border border-border/60 group-hover:bg-foreground/10 transition-colors">
            <SolanaLogo className="h-6 w-8" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-foreground">{strings.common.app_name}</span>
        </div>
      </Link>

      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        {children}
      </div>
    </div>
  );
}
