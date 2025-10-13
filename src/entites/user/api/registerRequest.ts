import { publicEndpoints, publicFetch } from "../../../shared";

export const registerRequest = async (
  login: string,
  password: string
): Promise<Response> => {
  const res = await publicFetch(publicEndpoints.register, {
    method: "POST",
    body: { login, password },
  });
  return res;
};
