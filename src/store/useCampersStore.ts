import { create } from 'zustand';
import { Camper } from '@/types';

interface CampersState {
  campers: Camper[];
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  setCampers: (campers: Camper[]) => void;
  addCampers: (campers: Camper[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTotal: (total: number) => void;
  setCurrentPage: (page: number) => void;
  resetCampers: () => void;
}

export const useCampersStore = create<CampersState>((set) => ({
  campers: [],
  loading: false,
  error: null,
  total: 0,
  currentPage: 1,
  setCampers: (campers) => set({ campers }),
  addCampers: (newCampers) => set((state) => ({ 
    campers: [...state.campers, ...newCampers] 
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setTotal: (total) => set({ total }),
  setCurrentPage: (page) => set({ currentPage: page }),
  resetCampers: () => set({ campers: [], currentPage: 1 }),
}));
