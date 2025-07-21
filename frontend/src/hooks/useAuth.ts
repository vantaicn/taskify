import { register, login } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";
import type { RegisterRequest, LoginRequest, AuthResponse } from "@/api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import {toast} from "sonner"

const useAuth = () => {
  
  const { user, token, setUser } = useAuthStore();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data: AuthResponse) => {
      navigate("/login");
    },
    onError: (error: any) => {
      console.log("Registration failed:", error);
      toast.error(`Registration failed: ${error.response?.data?.error || "Please try again."}`);
    }
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data: AuthResponse) => {
      setUser(data.user, data.token);
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
      toast.error(`Login failed: ${error.response?.data?.error || "Please try again."}`);
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
