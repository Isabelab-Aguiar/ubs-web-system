export type FeedbackType = 'compliment' | 'suggestion' | 'complaint';
export type FeedbackStatus = 'pending' | 'in_review' | 'resolved';

export interface Feedback {
  id: string;
  type: FeedbackType;
  content: string;
  authorName: string;
  status: FeedbackStatus;
  createdAt: string;
}

export interface CreateFeedbackPayload {
  type: FeedbackType;
  content: string;
  authorName: string;
}

export interface UpdateFeedbackStatusPayload {
  status: FeedbackStatus;
}
