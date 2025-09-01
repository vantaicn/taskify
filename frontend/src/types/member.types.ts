export interface CreateMemberPayload {
  email: string;
  role: "admin" | "member";
}
