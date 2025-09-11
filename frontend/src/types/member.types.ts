import type { UserType } from './user.types';

export interface MemberType {
  id: string;
  boardId: string;
  role: "admin" | "member";
  user?: UserType;
}

export interface CreateMemberPayload {
  email: string;
  role: "admin" | "member";
}

export interface UpdateMemberPayload {
  memberId: string;
  role: "admin" | "member";
}