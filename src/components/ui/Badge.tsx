import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className
}: BadgeProps) {
  const variants = {
    default: 'bg-slate-700 text-slate-200 border-slate-600',
    primary: 'bg-purple-600/20 text-purple-300 border-purple-500/30',
    success: 'bg-green-600/20 text-green-300 border-green-500/30',
    warning: 'bg-amber-600/20 text-amber-300 border-amber-500/30',
    danger: 'bg-red-600/20 text-red-300 border-red-500/30',
    info: 'bg-sky-600/20 text-sky-300 border-sky-500/30',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'rounded-full font-medium',
        'border',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
