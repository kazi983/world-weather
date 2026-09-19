import { atom } from 'nanostores';

export type City = {
  city: string;
  administrative: string;
  country: string;
  countrycode: string;
  lat: number;
  lng: number;
};

export const $selectedPlace = atom<City | null>(null);
