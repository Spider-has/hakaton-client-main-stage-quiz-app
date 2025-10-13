import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { PrivateRoutes, PublicRoutes } from "./router/router";
import { PAGE_ENDPOINTS } from "./config/pageEnpoints";
import { useInitSession } from "../entites/user/hooks/useInitSession";
import { CircularProgress } from "@mui/material";
import { useUserStore } from "../entites";

const Router = () => {
  useInitSession();
  const isInitialized = useUserStore((state) => state.isInitialized);

  if (!isInitialized) {
    return <CircularProgress />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {PrivateRoutes()}

        {PublicRoutes()}

        <Route
          path="/"
          element={<Navigate to={PAGE_ENDPOINTS.quiz} replace />}
        />
        <Route
          path="*"
          element={<Navigate to={PAGE_ENDPOINTS.login} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return <Router />;
}

export default App;
