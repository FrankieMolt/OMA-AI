import { LifeStats, TimeRemaining, UserData } from '@/types';
import { getLifeExpectancy } from './lifeExpectancy';

// Constants for calculations
const HEARTBEATS_PER_MINUTE = 80;
const BREATHS_PER_MINUTE = 16;
const BLINKS_PER_MINUTE = 15;
const WORDS_PER_DAY = 16000;
const SLEEP_HOURS_PER_DAY = 8;
const MEALS_PER_DAY = 3;
const STEPS_PER_DAY = 7000;

export function calculateLifeStats(birthDate: string): LifeStats {
  const birth = new Date(birthDate);
  const now = new Date();
  const diffMs = now.getTime() - birth.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffDays = diffSeconds / 86400;
  const diffYears = diffDays / 365.25;

  return {
    secondsLived: diffSeconds,
    heartbeats: Math.floor(diffSeconds * (HEARTBEATS_PER_MINUTE / 60)),
    breathsTaken: Math.floor(diffSeconds * (BREATHS_PER_MINUTE / 60)),
    blinks: Math.floor(diffSeconds * (BLINKS_PER_MINUTE / 60)),
    wordsSpoken: Math.floor(diffDays * WORDS_PER_DAY),
    sleepHours: Math.floor(diffDays * SLEEP_HOURS_PER_DAY),
    mealsEaten: Math.floor(diffDays * MEALS_PER_DAY),
    stepsTaken: Math.floor(diffDays * STEPS_PER_DAY)
  };
}

export function calculateTimeRemaining(userData: UserData): TimeRemaining {
  const birth = new Date(userData.birthDate);
  const now = new Date();
  const lifeExpectancy = getLifeExpectancy(userData.country, userData.gender);
  
  // Calculate expected death date
  const expectedDeathDate = new Date(birth);
  expectedDeathDate.setFullYear(birth.getFullYear() + Math.floor(lifeExpectancy));
  expectedDeathDate.setMonth(birth.getMonth() + Math.floor((lifeExpectancy % 1) * 12));
  
  const totalLifeMs = expectedDeathDate.getTime() - birth.getTime();
  const livedMs = now.getTime() - birth.getTime();
  const remainingMs = expectedDeathDate.getTime() - now.getTime();
  
  if (remainingMs <= 0) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
      yearsRemaining: 0,
      daysRemaining: 0,
      hoursRemaining: 0,
      minutesRemaining: 0,
      secondsRemaining: 0,
      heartbeatsRemaining: 0,
      breathsRemaining: 0,
      blinksRemaining: 0,
      lifeCompletePercent: 100
    };
  }
  
  const remainingSeconds = Math.floor(remainingMs / 1000);
  const remainingMinutes = Math.floor(remainingSeconds / 60);
  const remainingHours = Math.floor(remainingMinutes / 60);
  const remainingDays = Math.floor(remainingHours / 24);
  
  const years = Math.floor(remainingDays / 365.25);
  const months = Math.floor((remainingDays % 365.25) / 30.44);
  const days = Math.floor(remainingDays % 30.44);
  const hours = remainingHours % 24;
  const minutes = remainingMinutes % 60;
  const seconds = remainingSeconds % 60;
  
  const lifeCompletePercent = Math.min(100, (livedMs / totalLifeMs) * 100);
  
  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    totalDays: remainingDays,
    yearsRemaining: years,
    daysRemaining: remainingDays,
    hoursRemaining: remainingHours,
    minutesRemaining: remainingMinutes,
    secondsRemaining: remainingSeconds,
    heartbeatsRemaining: Math.floor(remainingSeconds * (HEARTBEATS_PER_MINUTE / 60)),
    breathsRemaining: Math.floor(remainingSeconds * (BREATHS_PER_MINUTE / 60)),
    blinksRemaining: Math.floor(remainingSeconds * (BLINKS_PER_MINUTE / 60)),
    lifeCompletePercent: Math.round(lifeCompletePercent * 100) / 100
  };
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}

export function formatTimeUnit(value: number, unit: string): string {
  return `${value} ${unit}${value !== 1 ? 's' : ''}`;
}

export function getMotivationalQuote(lifeCompletePercent: number): string {
  if (lifeCompletePercent < 20) {
    return "The journey of a thousand miles begins with a single step. - Lao Tzu";
  } else if (lifeCompletePercent < 40) {
    return "In the middle of difficulty lies opportunity. - Albert Einstein";
  } else if (lifeCompletePercent < 60) {
    return "Life is what happens when you're busy making other plans. - John Lennon";
  } else if (lifeCompletePercent < 80) {
    return "It is not the length of life, but depth of life. - Ralph Waldo Emerson";
  } else {
    return "The best way to predict the future is to create it. - Peter Drucker";
  }
}
