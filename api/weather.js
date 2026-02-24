/**
 * OMA-AI Weather API
 * Uses free OpenWeather API
 */

const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;
const OPENWEATHER_URL = 'https://api.openweathermap.org/data/2.5';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { city, lat, lon } = req.query;
  
  try {
    let url;
    if (lat && lon) {
      url = `${OPENWEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}&units=metric`;
    } else if (city) {
      url = `${OPENWEATHER_URL}/weather?q=${city}&appid=${OPENWEATHER_KEY}&units=metric`;
    } else {
      return res.status(400).json({ error: 'Provide city or lat/lon' });
    }
    
    const response = await fetch(url);
    const data = await response.json();
    
    res.json({
      location: data.name,
      temp: data.main?.temp,
      feels_like: data.main?.feels_like,
      humidity: data.main?.humidity,
      description: data.weather?.[0]?.description,
      wind: data.wind?.speed
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
