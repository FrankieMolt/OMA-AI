'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { MCPSkill } from '@/lib/types';

interface CompareItem {
  id: string;
  name: string;
  slug: string;
  category: string[];
  pricing_usdc: number;
  tier: 'free' | 'premium';
}

interface CompareContextValue {
  items: CompareItem[];
  add: (skill: MCPSkill) => void;
  remove: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([]);

  const add = useCallback((skill: MCPSkill) => {
    setItems(prev => {
      if (prev.some(s => s.id === skill.id)) return prev;
      if (prev.length >= 3) return [...prev.slice(1), {
        id: skill.id,
        name: skill.name,
        slug: skill.slug,
        category: skill.category,
        pricing_usdc: skill.pricing_usdc,
        tier: skill.tier ?? 'free',
      }];
      return [...prev, {
        id: skill.id,
        name: skill.name,
        slug: skill.slug,
        category: skill.category,
        pricing_usdc: skill.pricing_usdc,
        tier: skill.tier ?? 'free',
      }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems(prev => prev.filter(s => s.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const isSelected = useCallback((id: string) => items.some(s => s.id === id), [items]);

  return (
    <CompareContext.Provider value={{ items, add, remove, clear, isSelected }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
