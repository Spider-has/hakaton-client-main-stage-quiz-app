import { CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";

const LazyCreateRoom = lazy(() => import("./page/CreateRoomPage"));

export const CreateRoomPage = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <LazyCreateRoom />
    </Suspense>
  );
};
