import { CountryData } from '@/types';

// Life expectancy data based on WHO 2023 data (years at birth)
export const countryLifeExpectancy: Record<string, CountryData> = {
  US: {
    code: 'US',
    name: 'United States',
    lifeExpectancy: { male: 73.5, female: 79.3, overall: 76.4 }
  },
  UK: {
    code: 'UK',
    name: 'United Kingdom',
    lifeExpectancy: { male: 78.8, female: 82.8, overall: 80.8 }
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    lifeExpectancy: { male: 79.8, female: 84.1, overall: 81.9 }
  },
  AU: {
    code: 'AU',
    name: 'Australia',
    lifeExpectancy: { male: 81.2, female: 85.3, overall: 83.2 }
  },
  DE: {
    code: 'DE',
    name: 'Germany',
    lifeExpectancy: { male: 78.6, female: 83.4, overall: 81.0 }
  },
  FR: {
    code: 'FR',
    name: 'France',
    lifeExpectancy: { male: 79.2, female: 85.3, overall: 82.3 }
  },
  JP: {
    code: 'JP',
    name: 'Japan',
    lifeExpectancy: { male: 81.5, female: 87.6, overall: 84.5 }
  },
  IT: {
    code: 'IT',
    name: 'Italy',
    lifeExpectancy: { male: 80.0, female: 84.8, overall: 82.4 }
  },
  ES: {
    code: 'ES',
    name: 'Spain',
    lifeExpectancy: { male: 80.1, female: 85.9, overall: 83.0 }
  },
  SE: {
    code: 'SE',
    name: 'Sweden',
    lifeExpectancy: { male: 80.6, female: 84.3, overall: 82.5 }
  },
  NO: {
    code: 'NO',
    name: 'Norway',
    lifeExpectancy: { male: 81.0, female: 84.4, overall: 82.7 }
  },
  NL: {
    code: 'NL',
    name: 'Netherlands',
    lifeExpectancy: { male: 80.0, female: 83.4, overall: 81.7 }
  },
  CH: {
    code: 'CH',
    name: 'Switzerland',
    lifeExpectancy: { male: 81.6, female: 85.4, overall: 83.5 }
  },
  KR: {
    code: 'KR',
    name: 'South Korea',
    lifeExpectancy: { male: 80.3, female: 86.1, overall: 83.2 }
  },
  SG: {
    code: 'SG',
    name: 'Singapore',
    lifeExpectancy: { male: 81.1, female: 85.9, overall: 83.5 }
  },
  NZ: {
    code: 'NZ',
    name: 'New Zealand',
    lifeExpectancy: { male: 80.5, female: 84.0, overall: 82.2 }
  },
  BR: {
    code: 'BR',
    name: 'Brazil',
    lifeExpectancy: { male: 73.2, female: 79.8, overall: 76.4 }
  },
  MX: {
    code: 'MX',
    name: 'Mexico',
    lifeExpectancy: { male: 72.6, female: 78.4, overall: 75.4 }
  },
  IN: {
    code: 'IN',
    name: 'India',
    lifeExpectancy: { male: 69.8, female: 72.5, overall: 71.1 }
  },
  CN: {
    code: 'CN',
    name: 'China',
    lifeExpectancy: { male: 75.5, female: 81.2, overall: 78.3 }
  },
  RU: {
    code: 'RU',
    name: 'Russia',
    lifeExpectancy: { male: 66.5, female: 77.3, overall: 71.7 }
  },
  ZA: {
    code: 'ZA',
    name: 'South Africa',
    lifeExpectancy: { male: 60.7, female: 67.4, overall: 64.0 }
  },
  NG: {
    code: 'NG',
    name: 'Nigeria',
    lifeExpectancy: { male: 53.8, female: 55.6, overall: 54.7 }
  },
  EG: {
    code: 'EG',
    name: 'Egypt',
    lifeExpectancy: { male: 69.6, female: 74.2, overall: 71.9 }
  },
  WORLD: {
    code: 'WORLD',
    name: 'World Average',
    lifeExpectancy: { male: 70.8, female: 75.6, overall: 73.2 }
  }
};

export function getLifeExpectancy(countryCode: string, gender: string): number {
  const country = countryLifeExpectancy[countryCode] || countryLifeExpectancy['WORLD'];
  
  switch (gender) {
    case 'male':
      return country.lifeExpectancy.male;
    case 'female':
      return country.lifeExpectancy.female;
    default:
      return country.lifeExpectancy.overall;
  }
}

export const countriesList = Object.values(countryLifeExpectancy).map(c => ({
  code: c.code,
  name: c.name
}));
