import { CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";

const LazyHistoryPage = lazy(() => import("./page/HistoryPage"));

export const HistoryPage = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <LazyHistoryPage />
    </Suspense>
  );
};
