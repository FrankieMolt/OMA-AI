'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Tag,
  Cpu,
  Database,
  Network,
  Shield,
  Zap,
  Bot,
  Globe,
  DollarSign,
  BarChart3,
  Code,
  MessageSquare,
  Image as ImageIcon,
  Layers,
  ArrowRight,
} from 'lucide-react';

export type CategoryType =
  | 'ai-agents'
  | 'mcp-servers'
  | 'apis'
  | 'llms'
  | 'data'
  | 'security'
  | 'infrastructure'
  | 'finance'
  | 'analytics'
  | 'development'
  | 'chat'
  | 'media'
  | 'productivity'
  | 'other';

const categoryVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-300 hover:scale-105',
  {
    variants: {
      variant: {
        default: 'border',
        solid: 'border-transparent',
        glow: 'border-transparent shadow-lg',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px] gap-1',
        md: 'px-2.5 py-1 text-xs gap-1.5',
        lg: 'px-3 py-1.5 text-sm gap-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface CategoryConfig {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
  glowColor?: string;
}

const categoryConfig: Record<CategoryType, CategoryConfig> = {
  'ai-agents': {
    label: 'AI Agents',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20',
    icon: <Bot className="h-3 w-3" />,
    glowColor: 'shadow-primary/25',
  },
  'mcp-servers': {
    label: 'MCP Servers',
    color: 'text-info',
    bgColor: 'bg-info/10',
    borderColor: 'border-info/20',
    icon: <Network className="h-3 w-3" />,
    glowColor: 'shadow-info/25',
  },
  apis: {
    label: 'APIs',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/20',
    icon: <Globe className="h-3 w-3" />,
    glowColor: 'shadow-accent/25',
  },
  llms: {
    label: 'LLMs',
    color: 'text-secondary-foreground',
    bgColor: 'bg-secondary/40',
    borderColor: 'border-border/60',
    icon: <Cpu className="h-3 w-3" />,
    glowColor: 'shadow-foreground/10',
  },
  data: {
    label: 'Data',
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/20',
    icon: <Database className="h-3 w-3" />,
    glowColor: 'shadow-success/25',
  },
  security: {
    label: 'Security',
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-destructive/20',
    icon: <Shield className="h-3 w-3" />,
    glowColor: 'shadow-destructive/25',
  },
  infrastructure: {
    label: 'Infrastructure',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted/50',
    borderColor: 'border-border/60',
    icon: <Layers className="h-3 w-3" />,
    glowColor: 'shadow-foreground/10',
  },
  finance: {
    label: 'Finance',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/20',
    icon: <DollarSign className="h-3 w-3" />,
    glowColor: 'shadow-warning/25',
  },
  analytics: {
    label: 'Analytics',
    color: 'text-info',
    bgColor: 'bg-info/10',
    borderColor: 'border-info/20',
    icon: <BarChart3 className="h-3 w-3" />,
    glowColor: 'shadow-info/25',
  },
  development: {
    label: 'Development',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/20',
    icon: <Code className="h-3 w-3" />,
    glowColor: 'shadow-accent/25',
  },
  chat: {
    label: 'Chat',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20',
    icon: <MessageSquare className="h-3 w-3" />,
    glowColor: 'shadow-primary/25',
  },
  media: {
    label: 'Media',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/20',
    icon: <ImageIcon className="h-3 w-3" />,
    glowColor: 'shadow-accent/25',
  },
  productivity: {
    label: 'Productivity',
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/20',
    icon: <Zap className="h-3 w-3" />,
    glowColor: 'shadow-success/25',
  },
  other: {
    label: 'Other',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted/50',
    borderColor: 'border-border/60',
    icon: <Tag className="h-3 w-3" />,
    glowColor: 'shadow-foreground/10',
  },
};

export interface CategoryBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof categoryVariants> {
  /** Category type */
  category: CategoryType | string;
  /** Custom label */
  label?: string;
  /** Show icon */
  showIcon?: boolean;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Click handler */
  onCategoryClick?: (category: string) => void;
  /** Show arrow for navigation */
  showArrow?: boolean;
  /** Count badge */
  count?: number;
  /** Custom color config (overrides default) */
  customConfig?: Partial<CategoryConfig>;
}

export function CategoryBadge({
  category,
  label,
  showIcon = true,
  icon,
  onCategoryClick,
  showArrow = false,
  count,
  customConfig,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: CategoryBadgeProps) {
  const config = categoryConfig[category as CategoryType] || categoryConfig['other'];
  const finalConfig = { ...config, ...customConfig };

  const displayLabel = label || finalConfig.label;
  const displayIcon = icon || finalConfig.icon;

  const variantClasses = {
    default: cn(finalConfig.bgColor, finalConfig.color, finalConfig.borderColor, 'border'),
    solid: cn(finalConfig.bgColor, finalConfig.color),
    glow: cn(
      finalConfig.bgColor,
      finalConfig.color,
      finalConfig.borderColor,
      `shadow-lg ${finalConfig.glowColor || 'shadow-primary/25'}`
    ),
  };

  return (
    <div
      className={cn(
        categoryVariants({ variant, size }),
        variant && variantClasses[variant as keyof typeof variantClasses],
        onCategoryClick && 'cursor-pointer hover:scale-105 active:scale-95',
        className
      )}
      onClick={() => onCategoryClick?.(category)}
      {...props}
    >
      {showIcon && <span className="flex-shrink-0">{displayIcon}</span>}
      <span className="font-medium">{displayLabel}</span>
      {count !== undefined && <span className="ml-1 text-xs opacity-70">({count})</span>}
      {showArrow && <ArrowRight className="h-3 w-3 ml-0.5 opacity-50" />}
    </div>
  );
}

// Category chip for filter buttons
export function CategoryChip({
  category,
  isSelected,
  onSelect,
  count,
  className,
}: {
  category: CategoryType | string;
  isSelected: boolean;
  onSelect: (category: string) => void;
  count?: number;
  className?: string;
}) {
  const config = categoryConfig[category as CategoryType] || categoryConfig['other'];

  return (
    <button
      onClick={() => onSelect(category)}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200',
        'hover:scale-105 active:scale-95',
        isSelected
          ? cn(config.bgColor, config.color, config.borderColor, 'border')
          : 'bg-muted/50 text-muted-foreground hover:bg-muted',
        className
      )}
    >
      {config.icon}
      <span>{config.label}</span>
      {count !== undefined && <span className="ml-1 text-xs opacity-70">{count}</span>}
    </button>
  );
}

// Category pills for horizontal scrolling
export function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
  className,
}: {
  categories: (CategoryType | string)[];
  selectedCategory?: string;
  onSelect?: (category: string) => void;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {categories.map((category) => {
        const config = categoryConfig[category as CategoryType] || categoryConfig['other'];
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            onClick={() => onSelect?.(category)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200',
              'hover:scale-105 active:scale-95',
              isSelected
                ? cn(config.bgColor, config.color, config.borderColor, 'border shadow-md')
                : 'bg-muted/50 text-muted-foreground hover:bg-muted',
              className
            )}
          >
            {config.icon}
            <span>{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}
