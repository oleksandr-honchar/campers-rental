// Зробити всі поля опціональними
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Зробити всі поля обов'язковими
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Зробити всі поля readonly
export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Вибрати певні поля з типу
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Виключити певні поля з типу
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Nullable тип
export type Nullable<T> = T | null;

// Maybe тип
export type Maybe<T> = T | null | undefined;

// ID тип
export type ID = string | number;

// Pagination
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Sort
export interface Sort {
  field: string;
  order: 'asc' | 'desc';
}

// Search
export interface SearchParams {
  query: string;
  filters?: Record<string, unknown>;
}