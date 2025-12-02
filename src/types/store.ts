import { Camper } from './camper';
import { FiltersState } from './filters';

// Стан кемперів
export interface CampersState {
  campers: Camper[];
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  hasMore: boolean;
}

// Дії для кемперів
export interface CampersActions {
  setCampers: (campers: Camper[]) => void;
  addCampers: (campers: Camper[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTotal: (total: number) => void;
  setCurrentPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  resetCampers: () => void;
}

// Повний тип стору кемперів
export type CampersStore = CampersState & CampersActions;

// Стан фільтрів (експортується з filters.ts)
export type FiltersStore = FiltersState & {
  setLocation: (location: string) => void;
  setForm: (form: string) => void;
  toggleEquipment: (equipment: string) => void;
  clearEquipment: () => void;
  resetFilters: () => void;
  hasActiveFilters: () => boolean;
};

// Стан обраних
export interface FavoritesState {
  favorites: string[];
}

// Дії для обраних
export interface FavoritesActions {
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  getFavoritesCount: () => number;
}

// Повний тип стору обраних
export type FavoritesStore = FavoritesState & FavoritesActions;

// Стан модального вікна
export interface ModalState {
  isOpen: boolean;
  modalType: ModalType | null;
  modalData: unknown;
}

// Типи модальних вікон
export type ModalType = 'booking' | 'gallery' | 'filters';

// Дії для модального вікна
export interface ModalActions {
  openModal: (type: ModalType, data?: unknown) => void;
  closeModal: () => void;
}

// Повний тип стору модального вікна
export type ModalStore = ModalState & ModalActions;