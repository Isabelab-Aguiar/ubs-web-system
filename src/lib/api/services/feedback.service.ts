import { api } from '../client';
import type {
  Feedback,
  CreateFeedbackPayload,
  UpdateFeedbackStatusPayload,
} from '@/types/feedback.types';

export const feedbackService = {
  list: async (): Promise<Feedback[]> => {
    const { data } = await api.get<Feedback[]>('/feedbacks');
    return data;
  },

  submit: async (payload: CreateFeedbackPayload): Promise<Feedback> => {
    const { data } = await api.post<Feedback>('/feedbacks', payload);
    return data;
  },

  updateStatus: async (id: string, payload: UpdateFeedbackStatusPayload): Promise<Feedback> => {
    const { data } = await api.patch<Feedback>(`/feedbacks/${id}/status`, payload);
    return data;
  },
};
