import { CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";

const LazyAuth = lazy(() => import("./page/TasksPage"));

export const TasksPage = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <LazyAuth />
    </Suspense>
  );
};
