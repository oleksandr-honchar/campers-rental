export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog',
  CAMPER_DETAILS: (id: string) => `/catalog/${id}`,
} as const;
