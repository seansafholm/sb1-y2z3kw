import { zipToCounty } from './zipCodeData';

export const getCountyFromZip = (zipCode: string): { county: string; state: string } => {
  const result = zipToCounty[zipCode];
  if (!result) {
    // Default to unknown if zip not found
    return { county: "Unknown", state: "CA" };
  }
  return result;
};