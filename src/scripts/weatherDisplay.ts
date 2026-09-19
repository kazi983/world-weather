export type WeatherDescription = {
  condition: string;
  icon: string;
};

const METEOCONS_BASE_URL = 'https://cdn.jsdelivr.net/npm/@meteocons/svg/fill';

export function getWeatherIconUrl(icon: string): string {
  return `${METEOCONS_BASE_URL}/${icon}.svg`;
}

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function getWeatherDescription(code: number): WeatherDescription {
  if (code === 0) {
    return { condition: 'Clear sky', icon: 'clear-day' };
  }

  if (code === 1 || code === 2) {
    return { condition: 'Partly cloudy', icon: 'partly-cloudy-day' };
  }

  if (code === 3) {
    return { condition: 'Overcast', icon: 'overcast-day' };
  }

  if (code === 45 || code === 48) {
    return { condition: 'Fog', icon: 'fog-day' };
  }

  if (code >= 51 && code <= 57) {
    return { condition: 'Drizzle', icon: 'drizzle' };
  }

  if (code >= 61 && code <= 67) {
    return { condition: 'Rain', icon: 'rain' };
  }

  if (code >= 71 && code <= 77) {
    return { condition: 'Snow', icon: 'snow' };
  }

  if (code >= 80 && code <= 82) {
    return { condition: 'Rain showers', icon: 'partly-cloudy-day-rain' };
  }

  if (code >= 85 && code <= 86) {
    return { condition: 'Snow showers', icon: 'partly-cloudy-day-snow' };
  }

  if (code >= 95) {
    return { condition: 'Thunderstorm', icon: 'thunderstorms-day-rain' };
  }

  return { condition: 'Unknown', icon: 'not-available' };
}
