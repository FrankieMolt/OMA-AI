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

const STORAGE_KEY = 'oma-compare-items';

const CompareContext = createContext<CompareContextValue | null>(null);

function loadFromStorage(): CompareItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CompareItem =>
        typeof item.id === 'string' &&
        typeof item.name === 'string' &&
        typeof item.slug === 'string'
    );
  } catch {
    return [];
  }
}

function saveToStorage(items: CompareItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // quota exceeded or private mode — ignore
  }
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>(loadFromStorage);

  const add = useCallback((skill: MCPSkill) => {
    setItems((prev) => {
      if (prev.some((s) => s.id === skill.id)) return prev;
      const next = prev.length >= 3
        ? [...prev.slice(1), { id: skill.id, name: skill.name, slug: skill.slug, category: skill.category, pricing_usdc: skill.pricing_usdc, tier: skill.tier ?? 'free' }]
        : [...prev, { id: skill.id, name: skill.name, slug: skill.slug, category: skill.category, pricing_usdc: skill.pricing_usdc, tier: skill.tier ?? 'free' }];
      saveToStorage(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((s) => s.id !== id);
      saveToStorage(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    saveToStorage([]);
  }, []);

  const isSelected = useCallback((id: string) => items.some((s) => s.id === id), [items]);

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
