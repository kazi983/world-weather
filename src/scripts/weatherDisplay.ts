export type WeatherDescription = {
  condition: string;
  icon: string;
};

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function getWeatherDescription(code: number): WeatherDescription {
  if (code === 0) {
    return { condition: 'Clear sky', icon: '☀️' };
  }

  if (code === 1 || code === 2) {
    return { condition: 'Partly cloudy', icon: '🌤️' };
  }

  if (code === 3) {
    return { condition: 'Overcast', icon: '☁️' };
  }

  if (code === 45 || code === 48) {
    return { condition: 'Fog', icon: '🌫️' };
  }

  if (code >= 51 && code <= 57) {
    return { condition: 'Drizzle', icon: '🌦️' };
  }

  if (code >= 61 && code <= 67) {
    return { condition: 'Rain', icon: '🌧️' };
  }

  if (code >= 71 && code <= 77) {
    return { condition: 'Snow', icon: '❄️' };
  }

  if (code >= 80 && code <= 82) {
    return { condition: 'Rain showers', icon: '🌧️' };
  }

  if (code >= 85 && code <= 86) {
    return { condition: 'Snow showers', icon: '🌨️' };
  }

  if (code >= 95) {
    return { condition: 'Thunderstorm', icon: '⛈️' };
  }

  return { condition: 'Unknown', icon: '🌡️' };
}
