import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesState {
  // Стан
  favorites: string[];

  // Дії (Actions)
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  getFavoritesCount: () => number;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      // Початковий стан
      favorites: [],

      // Реалізація дій (Actions)
      addFavorite: (id) => set((state) => {
        if (state.favorites.includes(id)) return state;
        return { favorites: [...state.favorites, id] };
      }),
    
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

      clearFavorites: () => set({ favorites: [] }),

      getFavoritesCount: () => get().favorites.length,
    }),
    {
      name: 'campers-favorites-storage', // Ім'я в локальному сховищі
      storage: createJSONStorage(() => localStorage),
    }
  )
);
