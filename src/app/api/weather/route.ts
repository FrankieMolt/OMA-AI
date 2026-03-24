import { NextResponse } from 'next/server';

// Free weather APIs - wttr.in doesn't need API key
const WTTR_API = 'https://wttr.in';

const CITY_COORDS: Record<string, string> = {
  london: 'London',
  'new york': 'New+York',
  tokyo: 'Tokyo',
  'san francisco': 'San+Francisco',
  dubai: 'Dubai',
  singapore: 'Singapore',
  berlin: 'Berlin',
  paris: 'Paris',
  sydney: 'Sydney',
  miami: 'Miami',
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'London';
  
  try {
    const cityKey = city.toLowerCase().replace(/\s+/g, '+');
    
    // Use wttr.in (free, no API key needed)
    const response = await fetch(
      `${WTTR_API}/${cityKey}?format=j1`,
      { next: { revalidate: 600 } }
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    const current = data.current_condition[0];
    
    const weatherData = {
      success: true,
      city: data.nearest_area?.[0]?.area_name?.[0] || city,
      temp_c: parseInt(current.temp_C),
      temp_f: parseInt(current.temp_F),
      humidity: parseInt(current.humidity),
      condition: current.weatherDesc[0]?.value || 'Unknown',
      wind_kph: parseInt(current.windspeedkmph),
      feels_like_c: parseInt(current.FeelsLikeC),
      uv_index: parseInt(current.UV_Index) || 0,
      precipitation_mm: parseFloat(current.precipMM),
      last_updated: current.localObsDateTime,
      source: 'wttr.in'
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
      wind_kph: 10
    }, { status: 503 });
    responseJson.headers.set('Access-Control-Allow-Origin', '*');
    return responseJson;
  }
}
