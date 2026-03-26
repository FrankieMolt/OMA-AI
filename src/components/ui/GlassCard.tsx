import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'backdrop-blur-xl bg-zinc-800/50 border border-zinc-700/50 rounded-2xl',
        hover && 'hover:bg-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}

export function GlassCardPurple({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'backdrop-blur-xl bg-violet-900/50 border border-violet-700/50 rounded-2xl',
        hover && 'hover:bg-violet-800/50 hover:border-violet-600/50 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}
