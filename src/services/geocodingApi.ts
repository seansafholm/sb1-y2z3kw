interface GeocodingResponse {
  results: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
  }[];
}

export const getCountyFromAddress = async (address: {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}): Promise<string> => {
  try {
    const formattedAddress = `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;
    const encodedAddress = encodeURIComponent(formattedAddress);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Geocoding API response not ok');
    }

    const data: GeocodingResponse = await response.json();
    const county = data.results[0].address_components.find(component =>
      component.types.includes('administrative_area_level_2')
    );

    return county?.long_name.replace(' County', '') || '';
  } catch (error) {
    console.error('Error getting county:', error);
    return '';
  }
};