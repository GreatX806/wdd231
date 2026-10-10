// localStorage helpers: saved favorites and the last-used filters
const FAVORITES_KEY = "lbc-favorites";
const FILTERS_KEY = "lbc-filters";

const defaultFilters = { category: "all", area: "all", search: "", favoritesOnly: false };

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Could not read ${key}:`, error);
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Could not save ${key}:`, error);
  }
}

export const getFavorites = () => read(FAVORITES_KEY, []);

export function toggleFavorite(id) {
  const favorites = getFavorites();
  const updated = favorites.includes(id)
    ? favorites.filter((favoriteId) => favoriteId !== id)
    : [...favorites, id];
  write(FAVORITES_KEY, updated);
  return updated;
}

export const getFilters = () => ({ ...defaultFilters, ...read(FILTERS_KEY, {}) });
export const saveFilters = (filters) => write(FILTERS_KEY, filters);
export const clearFilters = () => {
  write(FILTERS_KEY, defaultFilters);
  return { ...defaultFilters };
};
