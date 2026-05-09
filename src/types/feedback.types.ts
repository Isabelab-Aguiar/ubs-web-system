export type FeedbackKind = 'praise' | 'complaint' | 'suggestion';
export type FeedbackStatus = 'pending' | 'reviewed' | 'resolved';

export interface FeedbackType {
  id: string;
  type: FeedbackKind;
  message: string;
  authorName?: string;
  authorEmail?: string;
  isAnonymous: boolean;
  status: FeedbackStatus;
  createdAt: string;
}

export type Feedback = FeedbackType;

export interface CreateFeedbackPayload {
  type: FeedbackKind;
  message: string;
  authorName?: string;
  authorEmail?: string;
  isAnonymous?: boolean;
}

export interface UpdateFeedbackStatusPayload {
  status: FeedbackStatus;
}
