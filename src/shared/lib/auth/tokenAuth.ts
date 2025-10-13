let currentToken: string | null = null;

export const setAuthToken = (token: string | null): void => {
  currentToken = token;
};

export const getAuthToken = (): string | null => {
  return currentToken;
};

export const clearAuthToken = (): void => {
  currentToken = null;
};
