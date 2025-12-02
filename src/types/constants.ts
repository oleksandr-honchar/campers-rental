import { VehicleForm, TransmissionType, EngineType } from './camper';

// Доступні форми кузова
export const VEHICLE_FORMS: readonly VehicleForm[] = [
  'alcove',
  'fullyIntegrated',
  'panelTruck',
] as const;

// Доступні типи коробки передач
export const TRANSMISSION_TYPES: readonly TransmissionType[] = [
  'automatic',
  'manual',
] as const;

// Доступні типи двигуна
export const ENGINE_TYPES: readonly EngineType[] = [
  'diesel',
  'petrol',
  'hybrid',
] as const;

// Лейбли для форм кузова
export const VEHICLE_FORM_LABELS: Record<VehicleForm, string> = {
  alcove: 'Alcove',
  fullyIntegrated: 'Fully Integrated',
  panelTruck: 'Van',
};

// Лейбли для коробки передач
export const TRANSMISSION_LABELS: Record<TransmissionType, string> = {
  automatic: 'Automatic',
  manual: 'Manual',
};

// Лейбли для типу двигуна
export const ENGINE_LABELS: Record<EngineType, string> = {
  diesel: 'Diesel',
  petrol: 'Petrol',
  hybrid: 'Hybrid',
};