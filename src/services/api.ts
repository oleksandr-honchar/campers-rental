import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from '@/types'

// Базовий URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

// Створення екземпляра axios
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 секунд
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (перед відправкою запиту)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Логування запиту (тільки в dev режимі)
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Request:', config.method?.toUpperCase(), config.url);
    }
    
    // Можна додати токен авторизації
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor (після отримання відповіді)
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Логування успішної відповіді
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Response:', response.status, response.config.url);
    }
    return response;
  },
  (error: AxiosError) => {
    // Обробка помилок
    const apiError: ApiError = {
      message: error.message || 'An error occurred',
      status: error.response?.status || 500,
      data: error.response?.data as Record<string, unknown> | undefined,
    };

    // Логування помилки
    console.error('❌ Response Error:', {
      status: apiError.status,
      message: apiError.message,
      url: error.config?.url,
    });

    // Можна додати обробку специфічних статусів
    if (apiError.status === 401) {
      // Неавторизований - можна редіректити на login
      console.error('Unauthorized - redirect to login');
    } else if (apiError.status === 404) {
      console.error('Resource not found');
    } else if (apiError.status >= 500) {
      console.error('Server error');
    }

    return Promise.reject(apiError);
  }
);

export default api;