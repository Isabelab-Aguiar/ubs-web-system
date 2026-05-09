export type Specialty =
  | 'doctor'
  | 'nurse'
  | 'dentist'
  | 'pharmacist'
  | 'psychologist'
  | 'physiotherapist'
  | 'nutritionist'
  | 'social_worker'
  | 'gynecologist'
  | 'pediatrician';

export interface HealthProfessionalType {
  id: string;
  name: string;
  specialty: Specialty;
  councilType?: string;
  councilNumber?: string;
  bio?: string;
  isActive: boolean;
  createdAt: string;
}

export type HealthProfessional = HealthProfessionalType;

export interface CreateHealthProfessionalPayload {
  name: string;
  specialty: Specialty;
  councilType?: string;
  councilNumber?: string;
  bio?: string;
}
