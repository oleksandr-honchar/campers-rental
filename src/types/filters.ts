import { VehicleForm } from './camper';

// Стан фільтрів
export interface FiltersState {
  location: string;
  form: VehicleForm | '';
  equipment: EquipmentType[];
}

// Типи обладнання для фільтрації
export type EquipmentType = 
  | 'AC'
  | 'transmission'
  | 'kitchen'
  | 'TV'
  | 'bathroom'
  | 'radio'
  | 'refrigerator'
  | 'microwave'
  | 'gas'
  | 'water';

// Опція фільтра (для UI)
export interface FilterOption {
  id: string;
  label: string;
  icon?: string;
  value?: string | boolean;
}

// Опції обладнання
export interface EquipmentOption extends FilterOption {
  id: EquipmentType;
}

// Опції типів кузова
export interface VehicleTypeOption extends FilterOption {
  id: VehicleForm;
}

// Опції локацій
export interface LocationOption {
  value: string;
  label: string;
}