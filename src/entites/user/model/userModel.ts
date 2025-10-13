import type { LoginCredentials } from "../api/types";

export interface User {
  id: string;
  name: string;
}

export type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  login: (userInputData: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  loadProfile: () => Promise<void>; // опционально, но полезно
};
