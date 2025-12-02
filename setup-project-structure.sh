#!/bin/bash

# Скрипт для створення структури Next.js проєкту з TypeScript

echo "🚀 Початок створення структури проєкту..."

# Перевірка чи існує директорія src
if [ ! -d "src" ]; then
    echo "❌ Помилка: Директорія src не знайдена. Переконайтесь, що ви в кореневій директорії Next.js проєкту."
    exit 1
fi

# Створення структури папок
echo "📁 Створення директорій..."

# App Router структура
mkdir -p src/app/catalog/\[id\]

# Компоненти
mkdir -p src/components/layout
mkdir -p src/components/ui

# Типи
mkdir -p src/types

# Сервіси
mkdir -p src/services

# Стор
mkdir -p src/store

# Утиліти
mkdir -p src/utils

# Константи
mkdir -p src/constants

# Стилі
mkdir -p src/styles/modules

# Публічні файли
mkdir -p public/images/icons

echo "✅ Директорії створено успішно!"

# Створення базових файлів
echo "📄 Створення базових файлів..."

# Types
cat > src/types/camper.ts << 'EOF'
export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: 'alcove' | 'fullyIntegrated' | 'panelTruck';
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: 'automatic' | 'manual';
  engine: 'diesel' | 'petrol' | 'hybrid';
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

export interface Gallery {
  thumb: string;
  original: string;
}

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}
EOF

cat > src/types/filters.ts << 'EOF'
export interface Filters {
  location: string;
  form: string;
  equipment: string[];
}

export interface FilterOptions {
  AC: boolean;
  kitchen: boolean;
  bathroom: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
}
EOF

cat > src/types/api.ts << 'EOF'
import { Camper } from './camper';

export interface ApiResponse {
  total: number;
  items: Camper[];
}

export interface ApiError {
  message: string;
  status: number;
}
EOF

# Constants
cat > src/constants/routes.ts << 'EOF'
export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog',
  CAMPER_DETAILS: (id: string) => `/catalog/${id}`,
} as const;
EOF

cat > src/constants/filters.ts << 'EOF'
export const VEHICLE_EQUIPMENT = [
  { id: 'AC', label: 'AC', icon: '❄️' },
  { id: 'transmission', label: 'Automatic', icon: '⚙️' },
  { id: 'kitchen', label: 'Kitchen', icon: '🍳' },
  { id: 'TV', label: 'TV', icon: '📺' },
  { id: 'bathroom', label: 'Bathroom', icon: '🚿' },
  { id: 'radio', label: 'Radio', icon: '📻' },
  { id: 'refrigerator', label: 'Refrigerator', icon: '🧊' },
  { id: 'microwave', label: 'Microwave', icon: '📟' },
  { id: 'gas', label: 'Gas', icon: '🔥' },
  { id: 'water', label: 'Water', icon: '💧' },
] as const;

export const VEHICLE_TYPES = [
  { id: 'panelTruck', label: 'Van', icon: '🚐' },
  { id: 'fullyIntegrated', label: 'Fully Integrated', icon: '🚌' },
  { id: 'alcove', label: 'Alcove', icon: '🚙' },
] as const;

export const LOCATIONS = [
  'Ukraine, Kyiv',
  'Ukraine, Poltava',
  'Ukraine, Dnipro',
  'Ukraine, Odesa',
  'Ukraine, Kharkiv',
  'Ukraine, Sumy',
  'Ukraine, Lviv',
] as const;
EOF

# Utils
cat > src/utils/formatPrice.ts << 'EOF'
/**
 * Форматує ціну у формат з крапкою (наприклад, 8000 -> 8000.00)
 */
export const formatPrice = (price: number): string => {
  return price.toFixed(2);
};

/**
 * Форматує ціну з валютою (наприклад, 8000 -> €8000.00)
 */
export const formatPriceWithCurrency = (price: number, currency: string = '€'): string => {
  return `${currency}${formatPrice(price)}`;
};
EOF

cat > src/utils/helpers.ts << 'EOF'
/**
 * Генерує унікальний ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Затримка для демонстрації лоадера
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Перевірка чи елемент в обраних
 */
export const isFavorite = (id: string, favorites: string[]): boolean => {
  return favorites.includes(id);
};
EOF

cat > src/utils/validation.ts << 'EOF'
export interface BookingFormData {
  name: string;
  email: string;
  bookingDate: string;
  comment?: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateBookingForm = (data: BookingFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.bookingDate) {
    errors.bookingDate = 'Booking date is required';
  }

  return errors;
};
EOF

# Services
cat > src/services/api.ts << 'EOF'
import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor для обробки помилок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
EOF

cat > src/services/campers.ts << 'EOF'
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
EOF

# Store
cat > src/store/useCampersStore.ts << 'EOF'
import { create } from 'zustand';
import { Camper } from '@/types';

interface CampersState {
  campers: Camper[];
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  setCampers: (campers: Camper[]) => void;
  addCampers: (campers: Camper[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTotal: (total: number) => void;
  setCurrentPage: (page: number) => void;
  resetCampers: () => void;
}

export const useCampersStore = create<CampersState>((set) => ({
  campers: [],
  loading: false,
  error: null,
  total: 0,
  currentPage: 1,
  setCampers: (campers) => set({ campers }),
  addCampers: (newCampers) => set((state) => ({ 
    campers: [...state.campers, ...newCampers] 
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setTotal: (total) => set({ total }),
  setCurrentPage: (page) => set({ currentPage: page }),
  resetCampers: () => set({ campers: [], currentPage: 1 }),
}));
EOF

cat > src/store/useFiltersStore.ts << 'EOF'
import { create } from 'zustand';

interface FiltersState {
  location: string;
  form: string;
  equipment: string[];
  setLocation: (location: string) => void;
  setForm: (form: string) => void;
  toggleEquipment: (equipment: string) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  location: '',
  form: '',
  equipment: [],
  setLocation: (location) => set({ location }),
  setForm: (form) => set({ form }),
  toggleEquipment: (equipment) => set((state) => {
    const isSelected = state.equipment.includes(equipment);
    return {
      equipment: isSelected
        ? state.equipment.filter((item) => item !== equipment)
        : [...state.equipment, equipment],
    };
  }),
  resetFilters: () => set({ location: '', form: '', equipment: [] }),
}));
EOF

cat > src/store/useFavoritesStore.ts << 'EOF'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (id) => set((state) => ({
        favorites: [...state.favorites, id],
      })),
      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter((favId) => favId !== id),
      })),
      toggleFavorite: (id) => set((state) => {
        const isFavorite = state.favorites.includes(id);
        return {
          favorites: isFavorite
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        };
      }),
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: 'favorites-storage',
    }
  )
);
EOF

# UI Components
cat > src/components/ui/Button.tsx << 'EOF'
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all cursor-pointer';
  
  const variants = {
    primary: 'bg-red-500 text-white hover:bg-red-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border-2 border-red-500 text-red-500 hover:bg-red-50',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
EOF

cat > src/components/ui/Loader.tsx << 'EOF'
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
    </div>
  );
};
EOF

cat > src/components/ui/Input.tsx << 'EOF'
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className = '',
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
EOF

# App pages
cat > src/app/page.tsx << 'EOF'
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Campers of your dreams
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            You can find everything you want in our catalog
          </p>
          <Link href="/catalog">
            <Button variant="primary" className="text-lg px-8 py-4">
              View Now
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
EOF

cat > src/app/catalog/page.tsx << 'EOF'
'use client';

import { useEffect, useState } from 'react';
import { useCampersStore } from '@/store/useCampersStore';
import { useFiltersStore } from '@/store/useFiltersStore';
import { getCampers } from '@/services/campers';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';

export default function CatalogPage() {
  const { campers, loading, total, currentPage, setCampers, addCampers, setLoading, setTotal, setCurrentPage, resetCampers } = useCampersStore();
  const { location, form, equipment } = useFiltersStore();
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 4;

  const fetchCampers = async (page: number, reset: boolean = false) => {
    try {
      setLoading(true);
      
      const params: any = {
        page,
        limit: ITEMS_PER_PAGE,
      };

      if (location) params.location = location;
      if (form) params.form = form;
      
      // Додати обране обладнання як окремі параметри
      equipment.forEach((item) => {
        params[item] = true;
      });

      const data = await getCampers(params);
      
      if (reset) {
        setCampers(data.items);
      } else {
        addCampers(data.items);
      }
      
      setTotal(data.total);
      setHasMore(campers.length + data.items.length < data.total);
    } catch (error) {
      console.error('Error fetching campers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetCampers();
    fetchCampers(1, true);
  }, [location, form, equipment]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchCampers(nextPage, false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catalog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Filters Sidebar */}
        <aside className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <p className="text-gray-500">Filter components will be added here</p>
          </div>
        </aside>

        {/* Campers List */}
        <div className="md:col-span-2">
          {loading && campers.length === 0 ? (
            <Loader />
          ) : (
            <>
              <div className="space-y-6">
                {campers.map((camper) => (
                  <div key={camper.id} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">{camper.name}</h3>
                    <p className="text-gray-600">{camper.location}</p>
                    <p className="text-lg font-bold mt-2">€{camper.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {hasMore && !loading && (
                <div className="mt-8 text-center">
                  <Button onClick={handleLoadMore}>
                    Load More
                  </Button>
                </div>
              )}

              {loading && campers.length > 0 && <Loader />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
EOF

cat > src/app/catalog/\[id\]/page.tsx << 'EOF'
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCamperById } from '@/services/campers';
import { Camper } from '@/types';
import { Loader } from '@/components/ui/Loader';

export default function CamperDetailsPage() {
  const params = useParams();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

  useEffect(() => {
    const fetchCamper = async () => {
      try {
        setLoading(true);
        const data = await getCamperById(params.id as string);
        setCamper(data);
      } catch (error) {
        console.error('Error fetching camper:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCamper();
  }, [params.id]);

  if (loading) return <Loader />;
  if (!camper) return <div>Camper not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{camper.name}</h1>
      <p className="text-gray-600 mb-2">{camper.location}</p>
      <p className="text-2xl font-bold mb-6">€{camper.price.toFixed(2)}</p>

      <div className="mb-8">
        <p className="text-gray-700">{camper.description}</p>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === 'features'
              ? 'border-b-2 border-red-500 text-red-500'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === 'reviews'
              ? 'border-b-2 border-red-500 text-red-500'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'features' ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Vehicle Details</h3>
            <ul className="space-y-1 text-gray-700">
              <li>Form: {camper.form}</li>
              <li>Length: {camper.length}</li>
              <li>Width: {camper.width}</li>
              <li>Height: {camper.height}</li>
              <li>Tank: {camper.tank}</li>
              <li>Consumption: {camper.consumption}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="space-y-1 text-gray-700">
              <li>Transmission: {camper.transmission}</li>
              <li>Engine: {camper.engine}</li>
              {camper.AC && <li>✓ AC</li>}
              {camper.bathroom && <li>✓ Bathroom</li>}
              {camper.kitchen && <li>✓ Kitchen</li>}
              {camper.TV && <li>✓ TV</li>}
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {camper.reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="font-semibold">{review.reviewer_name}</span>
                <span className="ml-4 text-yellow-500">{'⭐'.repeat(review.reviewer_rating)}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
EOF

# README
cat > README.md << 'EOF'
# Campers Rental - Next.js Application

## 📋 Опис проєкту

Веб-додаток для перегляду та бронювання кемперів, створений з використанням Next.js, TypeScript та Zustand.

## 🚀 Основні функції

- Перегляд каталогу кемперів
- Фільтрація за локацією, типом кузова та обладнанням
- Детальна інформація про кожен кемпер
- Додавання кемперів до обраного
- Форма бронювання
- Відгуки користувачів

## 🛠 Технології

- **Next.js 14** (App Router)
- **TypeScript**
- **Zustand** (управління станом)
- **Axios** (HTTP запити)
- **Tailwind CSS** (стилізація)

## 📦 Встановлення

\`\`\`bash
# Клонування репозиторію
git clone <repository-url>

# Перехід в директорію проєкту
cd campers-rental

# Встановлення залежностей
npm install

# Запуск проєкту в режимі розробки
npm run dev
\`\`\`

Додаток буде доступний за адресою: http://localhost:3000

## 📁 Структура проєкту

\`\`\`
src/
├── app/              # Next.js App Router
├── components/       # React компоненти
├── types/           # TypeScript типи
├── services/        # API сервіси
├── store/           # Zustand стори
├── utils/           # Допоміжні функції
└── constants/       # Константи
\`\`\`

## 🔗 API

Проєкт використовує MockAPI:
- Base URL: https://66b1f8e71ca8ad33d4f5f63e.mockapi.io
- Документація: https://github.com/mockapi-io/docs/wiki

## 👤 Автор

[Ваше ім'я]

## 📝 Ліцензія

MIT
EOF

# .env.local
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=https://66b1f8e71ca8ad33d4f5f63e.mockapi.io
EOF

echo "✅ Базові файли створено!"
echo ""
echo "📋 Структура проєкту готова!"
echo ""
echo "🔧 Наступні кроки:"
echo "1. npm install zustand axios"
echo "2. npm run dev"
echo ""
echo "✨ Готово! Структура проєкту успішно створена."