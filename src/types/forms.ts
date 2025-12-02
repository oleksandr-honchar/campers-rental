// Дані форми бронювання
export interface BookingFormData {
  name: string;
  email: string;
  bookingDate: string;
  comment?: string;
}

// Помилки валідації форми
export interface BookingFormErrors {
  name?: string;
  email?: string;
  bookingDate?: string;
  comment?: string;
}

// Стан форми
export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Результат валідації
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Результат відправки форми
export interface FormSubmitResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}