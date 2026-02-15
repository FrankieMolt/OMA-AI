import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function formatPrice(price: number, priceType?: string): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
  
  if (priceType === 'monthly_usd') return `${formatted}/mo`;
  if (priceType === 'yearly_usd') return `${formatted}/yr`;
  if (priceType === 'subscription_monthly_usd') return `${formatted}/mo`;
  return formatted;
}
