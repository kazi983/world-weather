import { atom } from 'nanostores';

export type WeatherApiResponse = {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
};

export type WeatherInfo = {
  weather: WeatherApiResponse;
  city: string;
  countryCode: string;
};

export const $weatherData = atom<WeatherInfo | null>(null);

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export const $temperatureUnit = atom<TemperatureUnit>('celsius');

export const $selectedDayIndex = atom<number>(0);
