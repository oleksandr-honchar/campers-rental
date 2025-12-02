// Основний тип кемпера
export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: VehicleForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: TransmissionType;
  engine: EngineType;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: Gallery[];
  reviews: Review[];
}

// Типи форм кузова
export type VehicleForm = 'alcove' | 'fullyIntegrated' | 'panelTruck';

// Типи коробки передач
export type TransmissionType = 'automatic' | 'manual';

// Типи двигуна
export type EngineType = 'diesel' | 'petrol' | 'hybrid';

// Галерея зображень
export interface Gallery {
  thumb: string;
  original: string;
}

// Відгуки
export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

// Характеристики кемпера (features)
export interface CamperFeatures {
  transmission: TransmissionType;
  engine: EngineType;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
}

// Деталі кемпера (vehicle details)
export interface CamperDetails {
  form: VehicleForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
}

// Скорочена інформація про кемпер (для карток)
export interface CamperCard {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: VehicleForm;
  gallery: Gallery[];
  AC: boolean;
  transmission: TransmissionType;
  kitchen: boolean;
  bathroom: boolean;
}