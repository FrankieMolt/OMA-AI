'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  gradient?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
}

export function Card({ children, className, hoverable = true, gradient }: CardProps) {
  return (
    <div
      className={cn(
        'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6',
        'transition-all duration-300',
        hoverable && 'hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1',
        gradient && 'bg-gradient-to-br from-gray-800/80 to-gray-900/80',
        className
      )}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
}

export interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn('text-xl font-bold text-white', className)}>
      {children}
    </h3>
  );
}

export interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-gray-400 text-sm', className)}>
      {children}
    </p>
  );
}

export interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
}

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('mt-4 flex items-center justify-between', className)}>
      {children}
    </div>
  );
}
