import { publicFetch, publicEndpoints } from "../../../shared";

export const loginRequest = async (
  login: string,
  password: string
): Promise<Response> => {
  const res = await publicFetch(publicEndpoints.login, {
    method: "POST",
    body: { login, password },
  });

  return res;
};
