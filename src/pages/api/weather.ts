import type { NextApiRequest, NextApiResponse } from 'next';

interface ForecastDay {
  date: string;
  max_c: number;
  min_c: number;
  condition: string;
}

interface WeatherApiResponse {
  location?: {
    name?: string;
    country?: string;
  };
  current?: {
    temp_c?: number;
    temp_f?: number;
    condition?: {
      text?: string;
      icon?: string;
    };
    wind_kph?: number;
    humidity?: number;
  };
  forecast?: {
    forecastday?: Array<{
      date: string;
      day?: {
        maxtemp_c?: number;
        mintemp_c?: number;
        condition?: {
          text?: string;
        };
      };
    }>;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=1800');

  const { city = 'New York' } = req.query;
  
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY || ''}&q=${city}&days=7`,
      { headers: { 'Accept': 'application/json' } }
    );
    
    if (response.ok) {
      const data: WeatherApiResponse = await response.json();
      return res.json({
        success: true,
        location: data.location?.name,
        country: data.location?.country,
        current: {
          temp_c: data.current?.temp_c,
          temp_f: data.current?.temp_f,
          condition: data.current?.condition?.text,
          icon: data.current?.condition?.icon,
          wind_kph: data.current?.wind_kph,
          humidity: data.current?.humidity
        },
        forecast: data.forecast?.forecastday?.map((day): ForecastDay => ({
          date: day.date,
          max_c: day.day?.maxtemp_c || 0,
          min_c: day.day?.mintemp_c || 0,
          condition: day.day?.condition?.text || 'Unknown'
        }))
      });
    }
  } catch (e) {
    console.error('Weather error:', e);
  }
  
  // Fallback mock data
  return res.json({
    success: true,
    location: city,
    current: {
      temp_c: 22,
      temp_f: 72,
      condition: 'Partly cloudy',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
    },
    forecast: [
      { date: new Date().toISOString().split('T')[0], max_c: 25, min_c: 18, condition: 'Sunny' },
      { date: new Date(Date.now() + 86400000).toISOString().split('T')[0], max_c: 23, min_c: 17, condition: 'Cloudy' }
    ],
    source: 'fallback'
  });
}