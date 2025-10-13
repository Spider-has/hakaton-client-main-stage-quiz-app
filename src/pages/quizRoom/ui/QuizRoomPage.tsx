import { CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";

const LazyQuizRoom = lazy(() => import("./page/QuizRoomPage"));

export const QuizRoomPage = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <LazyQuizRoom />
    </Suspense>
  );
};
