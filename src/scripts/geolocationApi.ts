/**
 * Searches for a place using the provided latitude and longitude coordinates.
 * @param lat The latitude of the location.
 * @param lng The longitude of the location.
 * @returns A promise that resolves to the search results for the specified coordinates.
 */
export async function getGeolocation(lat: number, lng: number) {
  const response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
  );

  if (!response.ok) {
    throw new Error('Placeskit error' + response.status);
  }

  return response.json();
}
