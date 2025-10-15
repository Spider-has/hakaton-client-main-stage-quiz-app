import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUserStore } from "../..";
import { Link, Outlet } from "react-router";
import { PAGE_ENDPOINTS } from "../../../app/config/pageEnpoints";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: "100vh",
          padding: "0 !important",
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
          <Toolbar
            sx={{
              flexWrap: isMobile ? "nowrap" : "wrap",
              overflowX: isMobile ? "auto" : "visible",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              component="div"
              noWrap
            >
              {user?.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: isMobile ? 2 : 3,
                minWidth: 0, 
                whiteSpace: "nowrap",
              }}
            >
              <Typography
                component={Link}
                to={PAGE_ENDPOINTS.quiz}
                variant="h6"
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "bold",
                  "&:hover": { textDecoration: "underline" },
                  fontSize: {
                    xs: "0.75rem",
                    sm: "1.25rem", 
                  },
                }}
              >
                Главная
              </Typography>
              <Typography
                component={Link}
                to={PAGE_ENDPOINTS.history}
                variant="h6"
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "bold",
                  "&:hover": { textDecoration: "underline" },
                  fontSize: {
                      xs: "0.75rem",
                    sm: "1.25rem",
                  },
                }}
              >
                История игр
              </Typography>
            </Box>

            <LogoutButton />
          </Toolbar>
        </AppBar>
        <Outlet />
      </Container>
    </>
  );
};