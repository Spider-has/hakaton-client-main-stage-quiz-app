import { useEffect } from "react";
import { useUserStore } from "../store/userStore";

export const useInitSession = () => {
  const loadProfile = useUserStore((state) => state.loadProfile);
  const isInitialized = useUserStore((state) => state.isInitialized);
  useEffect(() => {
    if (!isInitialized) {
      loadProfile();
    }
  }, [isInitialized, loadProfile]);
};
