import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUserStore } from "../..";
import { Outlet } from "react-router";

export const LogoutButton = () => {
  const logout = useUserStore((state) => state.logout);
  const userError = useUserStore((state) => state.error);

  const logoutHandler = () => {
    try {
      logout();
    } catch {
      alert(userError);
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={logoutHandler}
        sx={{ textTransform: "none" }}
      >
        Выйти
      </Button>
    </Box>
  );
};

export const TopPanel = () => {
  const user = useUserStore((state) => state.user);
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: `100%`,
          minHeight: `100vh`,
          padding: `0 !important`,
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {user?.name}
            </Typography>
            <LogoutButton />
          </Toolbar>
        </AppBar>
        <Outlet />
      </Container>
    </>
  );
};
