import { Camper } from './camper';

export interface ApiResponse {
  total: number;
  items: Camper[];
}

export interface ApiError {
  message: string;
  status: number;
}
