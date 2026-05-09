export type AnnouncementCategory = 'vaccine' | 'campaign' | 'notice' | 'urgent';
export type AnnouncementTargetPage = 'home' | 'vaccines' | 'services' | 'all';

export interface AnnouncementType {
  id: string;
  title: string;
  content: string;
  category: AnnouncementCategory;
  targetPage: AnnouncementTargetPage;
  showOnHomepage: boolean;
  isActive: boolean;
  expiresAt?: string;
  authorId: string;
  createdAt: string;
}

export type Announcement = AnnouncementType;

export interface CreateAnnouncementPayload {
  title: string;
  content: string;
  category: AnnouncementCategory;
  targetPage: AnnouncementTargetPage;
  showOnHomepage: boolean;
  expiresAt?: string;
}
