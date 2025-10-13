import { useUserStore } from "../store/userStore";

export const useIsAuthenticated = () => {
  const user = useUserStore((state) => state.user);
  return user !== null;
};
