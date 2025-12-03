import { create } from 'zustand';
import { EquipmentType } from '@/types/filters';
import { VehicleForm } from '@/types/camper';

interface FiltersState {
  // Стан
  location: string;
  form: VehicleForm | '';
  equipment: EquipmentType[];

  // Дії (Actions)
  setLocation: (location: string) => void;
  setForm: (form: VehicleForm | '') => void;
  toggleEquipment: (equipment: EquipmentType) => void;
  clearEquipment: () => void;
  resetFilters: () => void;
  hasActiveFilters: () => boolean;
}

export const useFiltersStore = create<FiltersState>((set, get) => ({
  // Початковий стан
  location: '',
  form: '' as VehicleForm | '',
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
    form: '' as VehicleForm | '',
    equipment: []
  }),

  // Перевірка наявності активних фільтрів
  hasActiveFilters: () => {
    const state = get();
    return !!(state.location || state.form || state.equipment.length > 0);
  },
}));
