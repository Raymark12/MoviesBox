const STORAGE_KEY = "moviebox_favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(imdbID: string): void {
  if (typeof window === "undefined") return;
  
  const favorites = getFavorites();
  const index = favorites.indexOf(imdbID);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(imdbID);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function isFavorite(imdbID: string): boolean {
  return getFavorites().includes(imdbID);
}
