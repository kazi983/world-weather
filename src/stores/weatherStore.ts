import { atom } from 'nanostores';


type City = {
  city: string;
  administrative: string;
  country: string;
  lat: number;
  lng: number;
  coordinates: string;
};

export const selectedPlace = atom<City | null>(null);