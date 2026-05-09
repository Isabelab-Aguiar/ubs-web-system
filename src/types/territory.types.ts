export interface AcsAgentType {
  id: string;
  name: string;
  phone: string;
  microAreaId?: string;
  createdAt: string;
}

export interface MicroAreaType {
  id: string;
  code: string;
  name: string;
  streets: string[];
  description?: string;
  acsAgents?: AcsAgentType[];
  createdAt: string;
}

export type MicroArea = MicroAreaType;
export type AcsAgent = AcsAgentType;

export interface CreateMicroAreaPayload {
  code: string;
  name: string;
  streets?: string[];
  description?: string;
}

export interface CreateAcsAgentPayload {
  name: string;
  phone: string;
  microAreaId?: string;
}
