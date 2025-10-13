import { CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";

const LazyAuth = lazy(() => import("./page/RegisterPage"));

export const RegisterPage = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <LazyAuth />
    </Suspense>
  );
};
