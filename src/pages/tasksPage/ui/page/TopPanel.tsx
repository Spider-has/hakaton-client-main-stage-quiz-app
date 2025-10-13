import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
interface TopBarProps {
  userLogin: string;
  onLogout: () => void;
}

type DownloadJsonButtonProps = {
  data: any;
};
export const DownloadJsonButton = (props: DownloadJsonButtonProps) => {
  const handleDownload = () => {
    const { data } = props;
    const jsonStr = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonStr], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="contained" onClick={handleDownload}>
      Скачать JSON
    </Button>
  );
};

export const TopBar = (props: TopBarProps) => {
  const { userLogin, onLogout } = props;
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {userLogin}
        </Typography>

        <Box>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={onLogout}
            sx={{ textTransform: "none" }}
          >
            Выйти
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
