import { CircularProgress } from "@mui/material";
import { Navigate, Outlet, Route } from "react-router";
import { TopPanel, useUserStore } from "../../entites";
import { useIsAuthenticated } from "../../entites/user/hooks/useIfAuthenticated";
import { AuthPage, QuizPage, RegisterPage } from "../../pages";
import { PAGE_ENDPOINTS } from "../config/pageEnpoints";
import { CreateRoomPage } from "../../pages/createRoomPage";
import { QuizRoomPage } from "../../pages/quizRoom/ui/QuizRoomPage";
import { HistoryPage } from "../../pages/history";

const ProtectedRouteLayout = () => {
  const isAuthenticated = useIsAuthenticated();
  const userLoading = useUserStore((state) => state.loading);

  if (userLoading) {
    return <CircularProgress />;
  }

  if (!isAuthenticated) {
    return <Navigate to={PAGE_ENDPOINTS.login} replace />;
  }

  return <Outlet />;
};

const PublicRouteLayout = () => {
  const isAuthenticated = useIsAuthenticated();
  const userLoading = useUserStore((state) => state.loading);

  if (userLoading) {
    return <CircularProgress />;
  }

  if (isAuthenticated) {
    return <Navigate to={PAGE_ENDPOINTS.quiz} replace />;
  }

  return <Outlet />;
};

export const PublicRoutes = () => (
  <Route element={<PublicRouteLayout />}>
    <Route path={PAGE_ENDPOINTS.login} element={<AuthPage />} />
    <Route path={PAGE_ENDPOINTS.register} element={<RegisterPage />} />
  </Route>
);

export const PrivateRoutes = () => (
  <Route element={<ProtectedRouteLayout />}>
    <Route path={PAGE_ENDPOINTS.quiz} element={<TopPanel />}>
      <Route index element={<QuizPage />} />
      <Route path={'history'} element={<HistoryPage/>}/>
      <Route path={PAGE_ENDPOINTS.room.base}>
        <Route
          path={PAGE_ENDPOINTS.room.createRoom}
          element={<CreateRoomPage />}
        />
        <Route
          path={PAGE_ENDPOINTS.room.usersRoom}
          element={<QuizRoomPage />}
        />
      </Route>
    </Route>
  </Route>
);
