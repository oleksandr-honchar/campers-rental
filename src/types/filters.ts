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
