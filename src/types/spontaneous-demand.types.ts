export type DemandStatus = 'waiting' | 'in_progress' | 'completed' | 'cancelled';
export type DemandPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface SpontaneousDemandType {
  id: string;
  patientName: string;
  patientBirthDate?: string;
  chiefComplaint: string;
  priority: DemandPriority;
  status: DemandStatus;
  notes?: string;
  createdAt: string;
}

export type SpontaneousDemand = SpontaneousDemandType;

export interface CreateSpontaneousDemandPayload {
  patientName: string;
  chiefComplaint: string;
  priority: DemandPriority;
  patientBirthDate?: string;
  notes?: string;
}

export interface UpdateDemandStatusPayload {
  status: DemandStatus;
}
