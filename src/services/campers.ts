import { api } from './api';
import { ApiResponse, Camper } from '@/types';

export interface GetCampersParams {
  page?: number;
  limit?: number;
  location?: string;
  form?: string;
  AC?: boolean;
  kitchen?: boolean;
  bathroom?: boolean;
  TV?: boolean;
  transmission?: string;
}

/**
 * Отримати список всіх кемперів з фільтрацією
 */
export const getCampers = async (params?: GetCampersParams): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>('/campers', { params });
  return response.data;
};

/**
 * Отримати деталі кемпера за ID
 */
export const getCamperById = async (id: string): Promise<Camper> => {
  const response = await api.get<Camper>(`/campers/${id}`);
  return response.data;
};
