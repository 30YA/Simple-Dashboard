import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile } from "../api/types";

type AuthState = {
  token: string | null;
  user: UserProfile | null;

  setAuth: (token: string, user: UserProfile | null) => void;
  setToken: (token: string | null) => void;
  setUser: (user: UserProfile | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      setAuth: (token, user) => set({ token, user }),

      setToken: (token) => set({ token }),

      setUser: (user) => set({ user }),

      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-store",
      version: 1,
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
