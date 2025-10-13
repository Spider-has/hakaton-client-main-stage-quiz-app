import {
  Box,
  TextField,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type UserFormProps = {
  login: string;
  setLogin: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  password: string;
  setPassword: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  onSubmit: () => void;
};

export const UserForm = (props: UserFormProps) => {
  const { login, password, setLogin, setPassword, onSubmit } = props;
  const [showPassword, setShown] = useState(false);
  return (
    <Box
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      component="form"
      noValidate
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Логин"
        name="email"
        autoComplete="Логин"
        autoFocus
        value={login}
        size="small"
        onChange={setLogin}
        sx={{ marginBottom: 2 }}
      />
      <FormControl fullWidth variant="outlined">
        <InputLabel size="small" htmlFor="outlined-adornment-password">
          Пароль
        </InputLabel>
        <OutlinedInput
          value={password}
          size="small"
          onChange={setPassword}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "скрыть пароль" : "показать пароль"}
                onClick={() => setShown(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Пароль"
        />
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ marginTop: 3 }}>
        Войти
      </Button>
    </Box>
  );
};
