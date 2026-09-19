import { atom } from 'nanostores';
import { type City } from './placeStore';

export type FavoriteCity = City & {
  id: string;
};

const FAVORITE_CITIES_STORAGE_KEY = 'favoriteCities';

/**
 * Creates a unique identifier for a city based on its coordinates.
 */
function createCityId(place: City): string {
  return `${place.lat}|${place.lng}`;
}

/**
 * Retrieves favorite cities from local storage.
 */
function loadFavoriteCities(): FavoriteCity[] {
  try {
    const stored = JSON.parse(
      localStorage.getItem(FAVORITE_CITIES_STORAGE_KEY) ?? '[]',
    );

    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

export const $favoriteCities = atom<FavoriteCity[]>(loadFavoriteCities());

$favoriteCities.listen((favorites) => {
  localStorage.setItem(FAVORITE_CITIES_STORAGE_KEY, JSON.stringify(favorites));
});

/**
 * Checks whether a city is currently in the favorites list.
 */
export function isFavorited(place: City): boolean {
  const id = createCityId(place);

  return $favoriteCities.get().some((favorite) => favorite.id === id);
}

/**
 * Adds or removes a city from the favorites list.
 */
export function toggleFavorite(place: City): void {
  const targetId = createCityId(place);
  const currentFavoriteCities = $favoriteCities.get();
  const alreadyFavorited = currentFavoriteCities.some(
    (favorite) => favorite.id === targetId,
  );

  $favoriteCities.set(
    alreadyFavorited
      ? currentFavoriteCities.filter((favorite) => favorite.id !== targetId)
      : [...currentFavoriteCities, { ...place, id: targetId }],
  );
}
