# Weather API Skill

> Current conditions and forecasts for any location

---

## Overview

The Weather API provides real-time weather data and 7-day forecasts for any city worldwide.

## Endpoint

```
GET https://oma-ai.com/api/weather?city={city}
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| city | string | Yes | City name (e.g., "London", "New York") |
| units | string | No | "metric" or "imperial" (default: metric) |

## Response

```json
{
  "success": true,
  "location": "London, UK",
  "current": {
    "temp_c": 22,
    "temp_f": 72,
    "condition": "Partly cloudy",
    "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png"
  },
  "forecast": [
    {
      "date": "2026-02-27",
      "max_c": 25,
      "min_c": 18,
      "condition": "Sunny"
    },
    {
      "date": "2026-02-28",
      "max_c": 23,
      "min_c": 17,
      "condition": "Cloudy"
    }
  ],
  "source": "weatherapi"
}
```

## Pricing

| Tier | Price |
|------|-------|
| Free | 100 calls/day |
| Pro | $0.002/call |

## Example Usage

```bash
# Get weather for London
curl "https://oma-ai.com/api/weather?city=London"

# Get weather for New York in Fahrenheit
curl "https://oma-ai.com/api/weather?city=New%20York&units=imperial"
```

## Data Sources

- Primary: WeatherAPI.com
- Fallback: Open-Meteo

## Use Cases

- Travel planning agents
- Event scheduling
- Agricultural monitoring
- Energy demand forecasting

---

_Last updated: 2026-02-27_
