import { API_BASE_URL } from "./urls";

interface PublicFetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: HeadersInit;
}

export const publicFetch = async (
  endpoint: string,
  { method = "GET", body, headers = {} }: PublicFetchOptions = {}
): Promise<Response> => {
  const url = `${API_BASE_URL}${endpoint}`;

  console.log(url);

  const config: RequestInit = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  return response;
};
