import { Camper } from './camper';

// Відповідь від API при отриманні списку кемперів
export interface ApiResponse {
  total: number;
  items: Camper[];
}

// Параметри для запиту кемперів
export interface GetCampersParams {
  page?: number;
  limit?: number;
  location?: string;
  form?: 'alcove' | 'fullyIntegrated' | 'panelTruck';
  AC?: boolean;
  kitchen?: boolean;
  bathroom?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
  transmission?: 'automatic' | 'manual';
  engine?: 'diesel' | 'petrol' | 'hybrid';
}

// Помилка API
export interface ApiError {
  message: string;
  status: number;
  data?: Record<string, unknown>; // Specify a more precise type
}

// Дані форми бронювання
export interface BookingData {
  name: string;
  email: string;
  bookingDate: string;
  comment?: string;
}