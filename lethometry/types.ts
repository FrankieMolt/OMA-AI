// Lethometry Types

export interface LifeStats {
  secondsLived: number;
  heartbeats: number;
  breathsTaken: number;
  blinks: number;
  wordsSpoken: number;
  sleepHours: number;
  mealsEaten: number;
  stepsTaken: number;
}

export interface CountryData {
  code: string;
  name: string;
  lifeExpectancy: {
    male: number;
    female: number;
    overall: number;
  };
}

export interface UserData {
  name?: string;
  birthDate: string;
  gender?: 'male' | 'female' | 'other';
  country?: string;
  smoking?: boolean;
  alcohol?: boolean;
  exercise?: 'none' | 'light' | 'moderate' | 'vigorous';
  bmi?: number;
  stress?: 'low' | 'moderate' | 'high';
  sleep?: number;
  familyHistory?: string[];
  occupation?: string;
  education?: string;
}

export interface TimeRemaining {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  yearsRemaining: number;
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  secondsRemaining: number;
  heartbeatsRemaining: number;
  breathsRemaining: number;
  blinksRemaining: number;
  lifeCompletePercent: number;
}

export interface LifeExpectancyData {
  totalLifeExpectancy: number;
  healthyLifeExpectancy: number;
  factors: {
    country: { value: number; years: number; description: string };
    gender: { value: number; years: number; description: string };
    lifestyle: { value: number; years: number; description: string };
  };
  startDate: string;
  endDate: string;
}

export interface MemoryMetrics {
  totalMemories: number;
  importantMemories: number;
  decayRate: number;
  retentionRate: number;
  emotionalImpact: number;
}
