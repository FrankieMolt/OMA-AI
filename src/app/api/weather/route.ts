import { NextResponse } from 'next/server';

const OPEN_METEO_API = 'https://api.open-meteo.com/v1/forecast';

// WMO weather code mapping
function getWeatherCondition(code: number): string {
  const conditions: Record<number, string> = {
    0: 'Clear',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Rime Fog',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Dense Drizzle',
    56: 'Freezing Drizzle',
    57: 'Heavy Freezing Drizzle',
    61: 'Light Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    66: 'Freezing Rain',
    67: 'Heavy Freezing Rain',
    71: 'Light Snow',
    73: 'Moderate Snow',
    75: 'Heavy Snow',
    77: 'Snow Grains',
    80: 'Light Showers',
    81: 'Moderate Showers',
    82: 'Violent Showers',
    85: 'Light Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Hail',
    99: 'Thunderstorm with Heavy Hail',
  };
  return conditions[code] || 'Unknown';
}

// Geocoding helper - find lat/lon for a city
async function geocodeCity(city: string): Promise<{ lat: number; lon: number } | null> {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );
    if (!response.ok) return null;
    const data = await response.json();
    if (!data.results || data.results.length === 0) return null;
    return { lat: data.results[0].latitude, lon: data.results[0].longitude };
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'London';

  try {
    // First geocode the city
    const coords = await geocodeCity(city);
    if (!coords) {
      throw new Error(`Could not find city: ${city}`);
    }

    // Fetch current weather from Open-Meteo
    const response = await fetch(
      `${OPEN_METEO_API}?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    const cw = data.current_weather;

    const weatherData = {
      success: true,
      city,
      temp_c: Math.round(cw.temperature),
      temp_f: Math.round(cw.temperature * 9 / 5 + 32),
      humidity: 0, // Open-Meteo current_weather doesn't include humidity
      condition: getWeatherCondition(cw.weathercode),
      wind_kph: Math.round(cw.windspeed),
      feels_like_c: Math.round(cw.temperature), // Open-Meteo doesn't provide feels-like separately
      uv_index: 0, // Open-Meteo current_weather doesn't include UV
      precipitation_mm: 0, // Open-Meteo current_weather doesn't include precipitation
      last_updated: cw.time,
      source: 'Open-Meteo',
      // Additional fields
      wind_direction: cw.winddirection,
      weather_code: cw.weathercode,
    };

    const responseJson = NextResponse.json(weatherData);
    responseJson.headers.set('Access-Control-Allow-Origin', '*');
    responseJson.headers.set('Cache-Control', 'public, max-age=600');
    return responseJson;

  } catch (error) {
    console.error('Weather API error:', error);

    // Fallback to fail gracefully
    const responseJson = NextResponse.json({
      success: false,
      error: 'Failed to fetch weather data',
      city,
      temp_c: 20,
      temp_f: 68,
      humidity: 50,
      condition: 'Unknown',
      wind_kph: 10,
      source: 'Open-Meteo',
    }, { status: 503 });
    responseJson.headers.set('Access-Control-Allow-Origin', '*');
    return responseJson;
  }
}
