import { BrowserRouter, Routes, Route } from "react-router";
import { AuthPage } from "../pages";
import { PAGE_ENDPOINTS } from "./config/pageEnpoints";
import { RegisterPage } from "../pages/registerPage";
import { AuthContext, AuthProvider } from "../entites";
import { TasksPage } from "../pages/tasksPage";
import { useContext } from "react";

const Router = () => {
  const context = useContext(AuthContext);
  if (context && context.isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route index path={PAGE_ENDPOINTS.tasks} element={<TasksPage />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<AuthPage />} />
          <Route path={PAGE_ENDPOINTS.login} element={<AuthPage />} />
          <Route path={PAGE_ENDPOINTS.register} element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
};

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
