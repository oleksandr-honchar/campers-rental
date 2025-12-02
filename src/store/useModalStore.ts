import { create } from 'zustand';

interface ModalState {
  // Стан
  isOpen: boolean;
  modalType: 'booking' | 'gallery' | null;
  modalData: Record<string, unknown> | null;
  
  // Дії
  openModal: (type: 'booking' | 'gallery', data?: Record<string, unknown>) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  // Початковий стан
  isOpen: false,
  modalType: null,
  modalData: null,
  
  // Дії
  openModal: (type: 'booking' | 'gallery', data: Record<string, unknown> | null = null) => set({ 
    isOpen: true, 
    modalType: type,
    modalData: data 
  }),
  
  closeModal: () => set({ 
    isOpen: false, 
    modalType: null,
    modalData: null 
  }),
}));