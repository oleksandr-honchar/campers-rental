import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (id) => set((state) => ({
        favorites: [...state.favorites, id],
      })),
      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter((favId) => favId !== id),
      })),
      toggleFavorite: (id) => set((state) => {
        const isFavorite = state.favorites.includes(id);
        return {
          favorites: isFavorite
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        };
      }),
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: 'favorites-storage',
    }
  )
);
