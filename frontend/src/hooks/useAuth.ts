import { register, login } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";
import type { RegisterRequest, LoginRequest, AuthResponse } from "@/api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

const useAuth = () => {
  
  const { user, token, setUser } = useAuthStore();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data: AuthResponse) => {
      navigate("/login");
    },
    onError: (error: any) => {
      console.error("Registration failed:", error);
    }
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data: AuthResponse) => {
      setUser(data.user, data.token);
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
    }
  });

  return {
    user,
    token,
    isRegistering: registerMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    register: (data: RegisterRequest) => registerMutation.mutate(data),
    login: (data: LoginRequest) => loginMutation.mutate(data),
  }
}

export default useAuth;
