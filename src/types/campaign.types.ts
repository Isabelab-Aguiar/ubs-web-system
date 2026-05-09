export interface CampaignType {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  targetAudience?: string;
  location?: string;
  contact?: string;
  startDate: string;
  endDate?: string;
  scheduleTime?: string;
  isUrgent: boolean;
  isFeatured: boolean;
  showOnHomepage: boolean;
  createdAt: string;
}

export type Campaign = CampaignType;

export interface CreateCampaignPayload {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  targetAudience?: string;
  isUrgent: boolean;
  isFeatured: boolean;
  showOnHomepage: boolean;
}
