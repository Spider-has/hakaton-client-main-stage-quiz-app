import { CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";

const LazyAuth = lazy(() => import("./page/AuthPage"));

export const AuthPage = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <LazyAuth />
    </Suspense>
  );
};
