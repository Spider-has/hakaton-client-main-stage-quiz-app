import { privateEndpoints, publicFetch } from "../../../shared";

export type UserDTO = {
  id: string;
  login: string;
};

export const fetchUserProfile = async (): Promise<UserDTO | undefined> => {
  const res = await publicFetch(privateEndpoints.user.me, { method: "GET" });
  if (res.ok) {
    return await res.json();
  }
  return undefined;
};
