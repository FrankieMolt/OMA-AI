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
        'backdrop-blur-xl bg-slate-800/50 border border-slate-700/50 rounded-2xl',
        hover && 'hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300',
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
        'backdrop-blur-xl bg-purple-900/50 border border-purple-700/50 rounded-2xl',
        hover && 'hover:bg-purple-800/50 hover:border-purple-600/50 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}
