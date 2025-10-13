import { create } from "zustand";
import type { User, UserState } from "../model/userModel";
import { userApi } from "../api/userApiService";
import type { LoginCredentials } from "../api/types";

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,
  isInitialized: false,

  setUser: (user) => set({ user, error: null }),
  clearUser: () => set({ user: null }),

  login: async (userInputData: LoginCredentials) => {
    set({ loading: true, error: null });
    try {
      await userApi.login(userInputData);
      const userDTO = await userApi.getProfile();
      const user: User = {
        id: userDTO.id,
        name: userDTO.login,
      };
      set({ user, loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      set({ error: message, loading: false });
      throw err;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await userApi.logout();
      set({ user: null, loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Logout failed";
      set({ error: message, loading: false });
      set({ user: null });
      throw err;
    }
  },

  loadProfile: async () => {
    set({ loading: true });
    try {
      const userDto = await userApi.getProfile();
      const user: User = {
        id: userDto.id,
        name: userDto.login,
      };
      set({ user, loading: false, isInitialized: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Session expired";
      set({ error: message, loading: false, user: null, isInitialized: true });
    }
  },
}));
