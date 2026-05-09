import { UserRole } from './auth.types';

export interface UserType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export type User = UserType;

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
