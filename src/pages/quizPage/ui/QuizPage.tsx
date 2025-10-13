import { CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";

const LazyQuizPage = lazy(() => import("./page/QuizPage"));

export const QuizPage = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <LazyQuizPage />
    </Suspense>
  );
};
