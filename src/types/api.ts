import { Camper, EngineType, TransmissionType, VehicleForm } from './camper';

// Відповідь від API при отриманні списку кемперів
export interface ApiResponse<T = unknown> {
  total: number;
  items: T[];
}

// Типізована відповідь для кемперів
export interface CampersApiResponse {
  total: number;
  items: Camper[];
};

// Параметри для запиту кемперів (з фільтрацією)
export interface GetCampersParams {
  page?: number;
  limit?: number;
  location?: string;
  form?: VehicleForm;
  AC?: boolean;
  kitchen?: boolean;
  bathroom?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
  transmission?: TransmissionType;
  engine?: EngineType;
}

// Помилка API
export interface ApiError {
  message: string;
  status: number;
  data?: Record<string, unknown>; // Specify a more precise type
}

// Статус запиту
export enum RequestStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

// Загальний тип для асинхронних операцій
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  status: RequestStatus;
}