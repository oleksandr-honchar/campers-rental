import { create } from 'zustand';

interface FiltersState {
  // Стан
  location: string;
  form: string;
  equipment: string[];

  // Дії (Actions)
  setLocation: (location: string) => void;
  setForm: (form: string) => void;
  toggleEquipment: (equipment: string) => void;
  clearEquipment: () => void;
  resetFilters: () => void;
  hasActiveFilters: () => boolean;
}

export const useFiltersStore = create<FiltersState>((set, get) => ({
  // Початковий стан
  location: '',
  form: '',
  equipment: [],

  // Реалізація дій (Actions)
  setLocation: (location) => set({ location }),
  
  setForm: (form) => set({ form }),

  toggleEquipment: (equipment) => set((state) => {
    const isSelected = state.equipment.includes(equipment);
    return {
      equipment: isSelected
        ? state.equipment.filter((item) => item !== equipment)
        : [...state.equipment, equipment],
    };
  }),

  clearEquipment: () => set({ equipment: [] }),

  resetFilters: () => set({
    location: '',
    form: '',
    equipment: []
  }),

  // Перевірка наявності активних фільтрів
  hasActiveFilters: () => {
    const state = get();
    return !!(state.location || state.form || state.equipment.length > 0);
  },
}));
