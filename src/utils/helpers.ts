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
