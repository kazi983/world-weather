export type WeatherDescription = {
  condition: string;
  icon: string;
  class: string;
};

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function getWeatherDescription(code: number): WeatherDescription {
  if (code === 0) {
    return { condition: 'Clear sky', icon: '☀️', class: 'weatherClear' };
  }

  if (code === 1 || code === 2) {
    return {
      condition: 'Partly cloudy',
      icon: '🌤️',
      class: 'weatherCloudy',
    };
  }

  if (code === 3) {
    return { condition: 'Overcast', icon: '☁️', class: 'weatherOvercast' };
  }

  if (code === 45 || code === 48) {
    return { condition: 'Fog', icon: '🌫️', class: 'weatherFog' };
  }

  if (code >= 51 && code <= 57) {
    return { condition: 'Drizzle', icon: '🌦️', class: 'weatherDrizzle' };
  }

  if (code >= 61 && code <= 67) {
    return { condition: 'Rain', icon: '🌧️', class: 'weatherRain' };
  }

  if (code >= 71 && code <= 77) {
    return { condition: 'Snow', icon: '❄️', class: 'weatherSnow' };
  }

  if (code >= 80 && code <= 82) {
    return {
      condition: 'Rain showers',
      icon: '🌧️',
      class: 'weatherRainShowers',
    };
  }

  if (code >= 85 && code <= 86) {
    return {
      condition: 'Snow showers',
      icon: '🌨️',
      class: 'weatherSnowShowers',
    };
  }

  if (code >= 95) {
    return {
      condition: 'Thunderstorm',
      icon: '⛈️',
      class: 'weatherThunderstorm',
    };
  }

  return { condition: 'Unknown', icon: '🌡️', class: 'weatherUnknown' };
}
