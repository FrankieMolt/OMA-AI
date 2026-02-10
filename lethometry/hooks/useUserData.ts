'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserData } from '@/types';
import { loadUserData, saveUserData, clearUserData } from '@/lib/storage';

export function useUserData() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = loadUserData();
    setUserData(data);
    setIsLoaded(true);
  }, []);

  const updateUserData = useCallback((data: UserData) => {
    setUserData(data);
    saveUserData(data);
  }, []);

  const resetUserData = useCallback(() => {
    setUserData(null);
    clearUserData();
  }, []);

  const hasData = userData !== null;

  return {
    userData,
    isLoaded,
    hasData,
    updateUserData,
    resetUserData
  };
}
