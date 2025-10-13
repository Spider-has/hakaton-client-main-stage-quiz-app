import { Link, Paper, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";
import { PAGE_ENDPOINTS } from "../../../app/config/pageEnpoints";
import { UserForm, useTextFieldState } from "../../../shared";
import { useCallback } from "react";
import { userApi, useUserStore } from "../../../entites";

export const RegisterForm = () => {
  const [login, setLogin] = useTextFieldState("");
  const [password, setPassword] = useTextFieldState("");

  const userLogin = useUserStore((state) => state.login);
  const userError = useUserStore((state) => state.error);
  const navigate = useNavigate();

  const onSubmit = useCallback(async () => {
    if (login.length > 0 && password.length) {
      try {
        const response = await userApi.register({ login, password });
        if (response.ok) {
          await userLogin({ login, password });
          navigate(PAGE_ENDPOINTS.quiz);
        }
      } catch (err) {
        console.error(userError);
      }
    }
  }, [userLogin, login, password]);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        width: "100%",
        maxWidth: 550,
        borderRadius: `10px`,
      }}
    >
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Регистрация
      </Typography>
      <UserForm
        login={login}
        setLogin={setLogin}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />
      <Typography sx={{ marginTop: 2 }} variant="body2" align="center">
        Уже есть аккаунт?{" "}
        <RouterLink to={PAGE_ENDPOINTS.login}>
          <Link component={"span"}>Войти</Link>
        </RouterLink>
      </Typography>
    </Paper>
  );
};
