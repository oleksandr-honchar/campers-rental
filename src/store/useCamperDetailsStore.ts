import { create } from 'zustand';
import { CamperDetails } from '@/types/camper';
import { getCamperById } from '@/services/campers';

interface CamperDetailsState {
  camper: CamperDetails | null;
  isLoading: boolean;
  error: string | null;
  fetchCamperDetails: (id: string) => Promise<void>;
  clearDetails: () => void;
}

export const useCamperDetailsStore = create<CamperDetailsState>((set) => ({
  camper: null,
  isLoading: false,
  error: null,

  fetchCamperDetails: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const camper = await getCamperById(id);
      set({ camper, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch camper details',
        isLoading: false 
      });
    }
  },

  clearDetails: () => {
    set({ camper: null, error: null, isLoading: false });
  },
}));