export interface UserData {
  birthDate: string;
  country: string;
  gender: 'male' | 'female' | 'other';
  name: string;
}

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

export interface TimeRemaining {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  lifeCompletePercent: number;
}

export interface LifeExpectancyData {
  male: number;
  female: number;
  overall: number;
}

export interface CountryData {
  code: string;
  name: string;
  lifeExpectancy: LifeExpectancyData;
}
