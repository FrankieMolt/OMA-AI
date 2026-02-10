import { UserData } from '@/types';

const STORAGE_KEY = 'lethometry_user_data';

export function saveUserData(data: UserData): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export function loadUserData(): UserData | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function clearUserData(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function hasUserData(): boolean {
  return loadUserData() !== null;
}
