export type AgeGroup = 'infantil' | 'adolescente' | 'adulto' | 'idoso' | 'gestante' | 'universal';

export interface VaccineStockType {
  id: string;
  name: string;
  targetAgeGroup: AgeGroup;
  currentQuantity: number;
  minimumQuantity: number;
  batchNumber?: string;
  expirationDate?: string;
  createdAt: string;
}

export type VaccineStock = VaccineStockType;

export interface CreateVaccineStockPayload {
  name: string;
  targetAgeGroup: AgeGroup;
  currentQuantity: number;
  minimumQuantity: number;
  batchNumber?: string;
  expirationDate?: string;
}

export interface UpdateVaccineQuantityPayload {
  quantity: number;
}
