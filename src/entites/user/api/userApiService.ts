// src/shared/api/user-api/user-api.ts

import {
  handleResponse,
  privateEndpoints,
  publicEndpoints,
  publicFetch,
} from "../../../shared";
import type { LoginCredentials, UserDTO } from "./types";

export const userApi = {
  getProfile: async (): Promise<UserDTO> => {
    const res = await publicFetch(privateEndpoints.user.me, { method: "GET" });
    return handleResponse<UserDTO>(res);
  },

  login: async (credentials: LoginCredentials): Promise<Response> => {
    const res = await publicFetch(publicEndpoints.login, {
      method: "POST",
      body: credentials,
    });
    return res;
  },

  register: async (credentials: LoginCredentials): Promise<Response> => {
    const res = await publicFetch(publicEndpoints.register, {
      method: "POST",
      body: credentials,
    });
    return res;
  },

  logout: async (): Promise<void> => {
    const res = await publicFetch(privateEndpoints.user.logout, {
      method: "POST",
    });
    if (!res.ok) {
      throw new Error(`Logout failed: ${res.status}`);
    }
  },
};
