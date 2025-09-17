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
    email: string;
    fullName: string;
    avatarUrl?: string;
  };
}

const authApi = {
  register: async (data: RegisterRequest) => {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
    return response.data;
  },
  login: async (data: LoginRequest) => {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
    return response.data;
  }
};

export default authApi;
