import { useState, useCallback } from "react";

export const useTextFieldState = (
  initial: string = ""
): [
  string,
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
] => {
  const [password, setPassword] = useState(initial);
  const setPasswordController = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPassword(event.target.value);
    },
    []
  );
  return [password, setPasswordController];
};
