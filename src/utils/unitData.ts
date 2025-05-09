// Unit categories and their available units
const unitCategories = [
  'Length',
  'Weight',
  'Volume',
  'Temperature',
  'Data',
];

const unitLabels: { [key: string]: { [key: string]: string } } = {
  Length: {
    m: 'Meter (m)',
    km: 'Kilometer (km)',
    cm: 'Centimeter (cm)',
    mm: 'Millimeter (mm)',
    in: 'Inch (in)',
    ft: 'Foot (ft)',
    yd: 'Yard (yd)',
    mi: 'Mile (mi)',
  },
  Weight: {
    kg: 'Kilogram (kg)',
    g: 'Gram (g)',
    mg: 'Milligram (mg)',
    lb: 'Pound (lb)',
    oz: 'Ounce (oz)',
    t: 'Tonne (t)',
  },
  Volume: {
    l: 'Liter (L)',
    ml: 'Milliliter (mL)',
    gal: 'Gallon (gal)',
    qt: 'Quart (qt)',
    pt: 'Pint (pt)',
    fl_oz: 'Fluid Ounce (fl oz)',
  },
  Temperature: {
    c: 'Celsius (°C)',
    f: 'Fahrenheit (°F)',
    k: 'Kelvin (K)',
  },
  Data: {
    b: 'Byte (B)',
    kb: 'Kilobyte (KB)',
    mb: 'Megabyte (MB)',
    gb: 'Gigabyte (GB)',
    tb: 'Terabyte (TB)',
  },
};

export const getUnitCategories = async (): Promise<string[]> => {
  return unitCategories;
};

export const getUnitsForCategory = async (category: string): Promise<string[]> => {
  const units = unitLabels[category];
  if (!units) {
    throw new Error('Invalid unit category');
  }
  return Object.keys(units);
};

export const getUnitLabel = (category: string, unit: string): string => {
  const units = unitLabels[category];
  if (!units) {
    throw new Error('Invalid unit category');
  }
  const label = units[unit];
  if (!label) {
    throw new Error('Invalid unit');
  }
  return label;
}; 