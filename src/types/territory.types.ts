export interface MicroArea {
  id: string;
  name: string;
  description?: string;
  acsAgentId?: string;
  createdAt: string;
}

export interface AcsAgent {
  id: string;
  name: string;
  phone: string;
  microAreaId?: string;
  createdAt: string;
}

export interface CreateMicroAreaPayload {
  name: string;
  description?: string;
}

export interface CreateAcsAgentPayload {
  name: string;
  phone: string;
  microAreaId?: string;
}
