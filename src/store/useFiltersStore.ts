import { create } from 'zustand';

interface FiltersState {
  location: string;
  form: string;
  equipment: string[];
  setLocation: (location: string) => void;
  setForm: (form: string) => void;
  toggleEquipment: (equipment: string) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  location: '',
  form: '',
  equipment: [],
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
  resetFilters: () => set({ location: '', form: '', equipment: [] }),
}));
