# Environment Canada Weather Skill

**Skill ID**: `canadian.weather`  
**Version**: 1.0.0  
**Author**: CanClaw Team  
**Canadian**: ✅ Yes - Uses Environment Canada public API  
**Sovereignty**: ✅ Fully sovereign - Canadian government API  

---

## Description

Fetch weather data from Environment Canada's public API. This skill provides accurate, Canadian-focused weather information without requiring any API keys or sending data to foreign services.

## Features

- ✅ **Free**: No API key required
- ✅ **Canadian**: Uses Environment Canada's official data
- ✅ **Bilingual**: Supports English and French
- ✅ **Metric**: All temperatures in Celsius
- ✅ **Sovereign**: Data stays in Canada

## Usage

### Basic Usage

```
What's the weather in Toronto?
```

```
Quel temps fait-il à Montréal?
```

### Commands

```
weather toronto
weather montreal --fr
weather vancouver --forecast
weather calgary --alerts
```

## Examples

### Example 1: Current Weather (English)

**User**: What's the weather in Ottawa?

**CanClaw**:
```
The current weather in Ottawa:

🌡️ Temperature: -5°C (feels like -10°C)
☁️ Conditions: Light snow
💨 Wind: 15 km/h from the northwest
💧 Humidity: 78%
 visibility: 10 km

Data from Environment Canada
```

### Example 2: Current Weather (French)

**User**: Quel temps fait-il à Québec?

**CanClaw**:
```
Météo actuelle à Québec:

🌡️ Température: -8°C (ressenti -14°C)
☁️ Conditions: Neige légère
💨 Vent: 20 km/h venant du nord
💧 Humidité: 82%
👁️ Visibilité: 8 km

Données d'Environnement Canada
```

### Example 3: Forecast

**User**: What's the forecast for Halifax this week?

**CanClaw**:
```
3-Day Forecast for Halifax:

Today:
  High: 2°C | Low: -3°C
  Light rain changing to snow

Tomorrow:
  High: -1°C | Low: -6°C
  Cloudy with sunny breaks

Wednesday:
  High: 0°C | Low: -4°C
  Chance of flurries

Data from Environment Canada
```

## API Details

### Endpoint

```
GET https://dd.weather.gc.ca/citypage_weather/xml/{province}/{city_code}_e.xml
GET https://dd.weather.gc.ca/citypage_weather/xml/{province}/{city_code}_f.xml
```

### Parameters

- `{province}`: Two-letter province code (ON, QC, BC, AB, etc.)
- `{city_code}`: Environment Canada city code (e.g., s0000458 for Toronto)
- `_e.xml`: English version
- `_f.xml`: French version

### Sample Code

```typescript
async function fetchWeather(city: string, lang: 'en' | 'fr' = 'en'): Promise<WeatherData> {
  const { province, cityCode } = await getCityCode(city);
  const langSuffix = lang === 'fr' ? '_f' : '_e';
  const url = `https://dd.weather.gc.ca/citypage_weather/xml/${province}/${cityCode}${langSuffix}.xml`;
  
  const response = await fetch(url);
  const xml = await response.text();
  const data = parseWeatherXML(xml);
  
  return {
    temperature: data.temperature,
    condition: data.condition,
    wind: {
      speed: data.wind.speed,
      direction: data.wind.direction,
    },
    humidity: data.humidity,
    visibility: data.visibility,
    feelsLike: calculateWindChill(data.temperature, data.wind.speed),
    source: 'Environment Canada',
    language: lang,
  };
}
```

## Canadian Cities

Common city codes:

| City | Province | Code |
|------|----------|------|
| Toronto | ON | s0000458 |
| Montreal | QC | s0000635 |
| Vancouver | BC | s0000141 |
| Calgary | AB | s0000047 |
| Edmonton | AB | s0000045 |
| Ottawa | ON | s0000430 |
| Winnipeg | MB | s0000193 |
| Quebec City | QC | s0000620 |
| Halifax | NS | s0000318 |
| Victoria | BC | s0000775 |

## Alerts

Get weather alerts for a location:

```typescript
async function getWeatherAlerts(city: string): Promise<WeatherAlert[]> {
  const alerts = await fetchWeatherAlerts(city);
  return alerts.map(alert => ({
    type: alert.type, // snowfall, rainfall, wind, etc.
    severity: alert.severity, // warning, watch, advisory
    description: alert.description,
    issued: alert.issued,
    expires: alert.expires,
  }));
}
```

## Metric Conversions

All data is provided in metric:
- Temperature: Celsius (°C)
- Wind speed: km/h
- Visibility: km
- Pressure: kPa
- Precipitation: mm

## Privacy & Sovereignty

✅ **No API key required** - Public government data  
✅ **Canadian servers** - Data from Environment Canada  
✅ **No data collection** - We don't store your queries  
✅ **PIPEDA compliant** - Canadian privacy law  

## Limitations

- Updates every hour (not real-time)
- Limited to Canadian locations
- Some smaller towns may not have data
- XML format (not JSON)

## See Also

- [Environment Canada Weather API Documentation](https://eccc-msc.github.io/open-data/)
- [Metric Conversion Skill](./metric.md)
- [Bilingual Skill](./bilingual.md)

---

*CanClaw: Empowering Canadians with sovereign AI 🦞🇨🇦*
