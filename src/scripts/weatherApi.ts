export async function getWeather(latitude: number, longitude: number) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');

  url.searchParams.set('latitude', String(latitude));
  url.searchParams.set('longitude', String(longitude));

  url.searchParams.set(
    'current',
    'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
  );

  url.searchParams.set(
    'daily',
    'weather_code,temperature_2m_max,temperature_2m_min',
  );

  url.searchParams.set('hourly', 'temperature_2m,weather_code');

  url.searchParams.set('timezone', 'auto');
  url.searchParams.set('forecast_days', '5');

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to get weather data');
  }

  return response.json();
}
