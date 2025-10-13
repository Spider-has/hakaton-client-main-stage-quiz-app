import { privateEndpoints, publicFetch } from "../../../shared";

export const userLogout = async (): Promise<Response> => {
  const res = await publicFetch(privateEndpoints.user.logout, {
    method: "POST",
  });
  return res;
};
