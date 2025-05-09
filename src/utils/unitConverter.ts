// Conversion rates relative to base units
const conversionRates: { [key: string]: { [key: string]: number } } = {
  Length: {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344,
  },
  Weight: {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lb: 0.45359237,
    oz: 0.028349523125,
    t: 1000,
  },
  Volume: {
    l: 1,
    ml: 0.001,
    gal: 3.78541,
    qt: 0.946353,
    pt: 0.473176,
    fl_oz: 0.0295735,
  },
  Temperature: {
    c: 1,
    f: 5/9,
    k: 1,
  },
  Data: {
    b: 1,
    kb: 1024,
    mb: 1024 * 1024,
    gb: 1024 * 1024 * 1024,
    tb: 1024 * 1024 * 1024 * 1024,
  },
};

// Special handling for temperature conversions
const convertTemperature = (value: number, fromUnit: string, toUnit: string): number => {
  let celsius: number;
  
  // Convert to Celsius first
  switch (fromUnit) {
    case 'c':
      celsius = value;
      break;
    case 'f':
      celsius = (value - 32) * 5/9;
      break;
    case 'k':
      celsius = value - 273.15;
      break;
    default:
      throw new Error('Invalid temperature unit');
  }
  
  // Convert from Celsius to target unit
  switch (toUnit) {
    case 'c':
      return celsius;
    case 'f':
      return (celsius * 9/5) + 32;
    case 'k':
      return celsius + 273.15;
    default:
      throw new Error('Invalid temperature unit');
  }
};

export const convertUnit = async (
  value: number,
  fromUnit: string,
  toUnit: string,
  category: string
): Promise<number> => {
  // Special handling for temperature
  if (category === 'Temperature') {
    return convertTemperature(value, fromUnit, toUnit);
  }

  // Get conversion rates for the category
  const rates = conversionRates[category];
  if (!rates) {
    throw new Error('Invalid unit category');
  }

  // Get the conversion rates for the units
  const fromRate = rates[fromUnit];
  const toRate = rates[toUnit];

  if (!fromRate || !toRate) {
    throw new Error('Invalid unit conversion');
  }

  // Convert to base unit first, then to target unit
  const baseValue = value * fromRate;
  return baseValue / toRate;
}; 