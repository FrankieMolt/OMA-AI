# Metric Conversion Skill

**Skill ID**: `canadian.metric`  
**Version**: 1.0.0  
**Author**: CanClaw Team  
**Canadian**: ✅ Yes - Canada uses metric system  
**Sovereignty**: ✅ Fully sovereign - Local conversion  

---

## Description

Automatically convert units to the metric system. Canada officially uses the metric system for most measurements, and this skill ensures all values are displayed in metric by default.

## Features

- ✅ **Auto-convert**: Automatically converts imperial to metric
- ✅ **Temperature**: Fahrenheit ↔ Celsius
- ✅ **Distance**: Miles/feet/inches ↔ Kilometers/meters/centimeters
- ✅ **Volume**: Gallons/quarts ↔ Liters/milliliters
- ✅ **Weight**: Pounds/ounces ↔ Kilograms/grams
- ✅ **Speed**: MPH ↔ km/h

## Usage

### Basic Conversion

```
convert 100 fahrenheit to celsius
```

```
convert 50 miles to kilometers
```

### Auto-Convert in Context

```
How far is it from Toronto to Montreal? (convert to metric)
```

## Conversion Formulas

### Temperature
```
°C = (°F - 32) × 5/9
°F = (°C × 9/5) + 32
```

### Distance
```
1 mile = 1.60934 kilometers
1 foot = 0.3048 meters
1 inch = 2.54 centimeters
```

### Volume
```
1 US gallon = 3.78541 liters
1 quart = 0.946353 liters
1 fluid ounce = 29.5735 milliliters
```

### Weight/Mass
```
1 pound = 0.453592 kilograms
1 ounce = 28.3495 grams
```

### Speed
```
1 mph = 1.60934 km/h
```

## Examples

### Example 1: Temperature

**User**: What is 72°F in Celsius?

**CanClaw**:
```
72°F = 22.22°C

Formula: (72 - 32) × 5/9 = 22.22°C

This is considered room temperature - comfortable for most people.
```

### Example 2: Distance

**User**: Convert 100 miles to km

**CanClaw**:
```
100 miles = 160.93 kilometers

Formula: 100 × 1.60934 = 160.93 km

For reference: That's roughly the distance from Toronto to Kingston, ON.
```

### Example 3: Cooking/Baking

**User**: The recipe says 350°F, what's that in Celsius?

**CanClaw**:
```
350°F = 176.67°C

For practical purposes, use 175°C or 180°C depending on your oven.

Oven Temperature Guide:
- 275°F = 135°C (Very Low)
- 300°F = 150°C (Low)
- 325°F = 165°C (Medium-Low)
- 350°F = 175°C (Medium)
- 375°F = 190°C (Medium-High)
- 400°F = 200°C (Hot)
- 425°F = 220°C (Very Hot)
- 450°F = 230°C (Extremely Hot)
```

### Example 4: Speed

**User**: The speed limit is 60 mph, what is that in km/h?

**CanClaw**:
```
60 mph = 96.56 km/h

This is typical highway speed in the US.
In Canada, highway speeds are usually 100-110 km/h.
```

### Example 5: Volume (Gas/Petrol)

**User**: Gas is $4.50 per gallon, what is that per liter?

**CanClaw**:
```
$4.50 USD per US gallon = $1.19 USD per liter

Calculation:
1 US gallon = 3.78541 liters
$4.50 ÷ 3.78541 = $1.19 per liter

Note: In Canada, gas is sold in cents per liter (¢/L).
So this would be approximately 119 ¢/L or $1.19/L CAD.

For comparison:
- Current average in Canada: ~$1.60/L CAD
- Current average in US: ~$1.20/L USD
```

## Implementation

```typescript
interface Conversion {
  from: string;
  to: string;
  value: number;
  result: number;
  formula: string;
}

const conversions: Record<string, (n: number) => number> = {
  // Temperature
  'fahrenheit->celsius': (f) => (f - 32) * 5/9,
  'celsius->fahrenheit': (c) => (c * 9/5) + 32,
  
  // Distance
  'miles->kilometers': (mi) => mi * 1.60934,
  'kilometers->miles': (km) => km / 1.60934,
  'feet->meters': (ft) => ft * 0.3048,
  'meters->feet': (m) => m / 0.3048,
  'inches->centimeters': (in) => in * 2.54,
  'centimeters->inches': (cm) => cm / 2.54,
  
  // Volume
  'gallons->liters': (gal) => gal * 3.78541,
  'liters->gallons': (L) => L / 3.78541,
  'quarts->liters': (qt) => qt * 0.946353,
  'liters->quarts': (L) => L / 0.946353,
  
  // Weight
  'pounds->kilograms': (lb) => lb * 0.453592,
  'kilograms->pounds': (kg) => kg / 0.453592,
  'ounces->grams': (oz) => oz * 28.3495,
  'grams->ounces': (g) => g / 28.3495,
  
  // Speed
  'mph->kmh': (mph) => mph * 1.60934,
  'kmh->mph': (kmh) => kmh / 1.60934,
};

function convert(value: number, from: string, to: string): Conversion {
  const key = `${from}->${to}`.toLowerCase();
  const converter = conversions[key];
  
  if (!converter) {
    throw new Error(`Unknown conversion: ${from} to ${to}`);
  }
  
  const result = converter(value);
  
  return {
    from,
    to,
    value,
    result,
    formula: getFormula(from, to),
  };
}
```

## Canadian Context

### When to Use Metric
Canada uses metric for:
- ✅ Temperature (Celsius)
- ✅ Distance (kilometers)
- ✅ Speed (km/h)
- ✅ Volume (liters)
- ✅ Weight (kilograms)
- ✅ Height (meters/centimeters)

### Common Exceptions
Canada sometimes uses imperial for:
- ⚠️ Height informally (feet/inches)
- ⚠️ Weight informally (pounds)
- ⚠️ Cooking measurements (cups, tablespoons)
- ⚠️ Construction (feet/inches for lumber)

### Best Practice
Always provide metric first, then imperial in parentheses if needed:
```
The distance is 100 km (62 miles).
```

## Privacy & Sovereignty

✅ **Local calculation** - No external APIs needed  
✅ **No data collection** - Conversions not logged  
✅ **PIPEDA compliant** - Canadian privacy law  

## See Also

- [Environment Canada Weather Skill](./weather.md)
- [Bilingual Skill](./bilingual.md)

---

*CanClaw: Empowering Canadians with sovereign AI 🦞🇨🇦*
