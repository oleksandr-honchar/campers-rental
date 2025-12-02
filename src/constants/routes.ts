export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog',
  CAMPER_DETAILS: (id: string) => `/catalog/${id}`,
} as const;

/**
 * Назви сторінок для мета-тегів
 */
export const PAGE_TITLES = {
  HOME: 'Campers Rental - Find Your Dream Camper',
  CATALOG: 'Catalog - Campers Rental',
  CAMPER_DETAILS: (name: string) => `${name} - Campers Rental`,
} as const;

/**
 * Описи сторінок для мета-тегів
 */
export const PAGE_DESCRIPTIONS = {
  HOME: 'Find and rent the perfect camper for your next adventure. Browse our extensive catalog of campervans and motorhomes.',
  CATALOG: 'Browse our extensive catalog of campervans and motorhomes. Filter by location, type, and amenities.',
  CAMPER_DETAILS: 'View detailed information, features, and reviews.',
} as const;