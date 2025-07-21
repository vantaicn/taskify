import axiosInstance from "@/lib/axios";

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
}

export const register = async (data: RegisterRequest) => {
  const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
  return response.data;
}

export const login = async (data: LoginRequest) => {
  const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
  return response.data;
}
