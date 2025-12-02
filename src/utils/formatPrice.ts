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
