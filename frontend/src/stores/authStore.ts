import { create } from 'zustand'

type User = {
  id: string;
  email: string;
  fullName: string;
}

type AuthStore = {
  user: User | null;
  token: string;
  setUser: (user: User | null, token: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: '',
  setUser: (user, token) => {
    set({user, token});
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  },
  clearUser: () => {
    set({user: null, token: ''});
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}))
