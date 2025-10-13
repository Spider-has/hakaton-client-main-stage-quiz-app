import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import type { Player } from "../../../features";
import { PaperBlock } from "./Paper";

interface PlayerListProps {
  players: Player[];
  handleStartQuiz: () => void;
  handleLeaveRoom: () => void;
}

export const PlayerList = (props: PlayerListProps) => {
  const { players } = props;

  // const user = useUserStore((state) => state.user);
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0]?.toUpperCase())
      .join("")
      .substring(0, 2);
  };

  const isCurrentUserHost = false;
  // const host = players.find((p) => p.isHost);
  // const participants = players.filter((p) => !p.isHost);

  const handleStartQuiz = () => {
    console.log("Начать квиз");
  };

  const handleLeaveRoom = () => {
    console.log("Покинуть комнату");
  };

  return (
    <PaperBlock
      sx={{ minWidth: { xs: "100%", md: 400 }, flexGrow: 1, maxWidth: 1200 }}
    >
      <Typography variant="h6" gutterBottom>
        Организатор
      </Typography>
      {/* {host && (
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {getInitials(host.username)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={host.username} />
          <Box sx={{ color: "text.secondary", ml: 1 }}>👑</Box>
        </ListItem>
      )} */}

      {players.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Участники ({players.length})
          </Typography>
          <List disablePadding>
            {players.map((player, index) => (
              <ListItem key={player.user_id} sx={{ pl: 0 }}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{
                    minWidth: 32,
                    textAlign: "center",
                    color: "primary.main",
                    fontSize: "1.125rem", // ~18px
                    mr: 1.5,
                  }}
                >
                  {index + 1}
                </Typography>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "grey.400" }}>
                    {getInitials(player.username)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={player.username} />
              </ListItem>
            ))}
          </List>
        </>
      )}
      <Stack spacing={2} sx={{ mt: 3 }}>
        {isCurrentUserHost && (
          <Button
            variant="contained"
            color="success"
            size="large"
            fullWidth
            onClick={handleStartQuiz}
          >
            Начать квиз
          </Button>
        )}
        <Button
          variant="outlined"
          color="error"
          size="medium"
          fullWidth
          onClick={handleLeaveRoom}
        >
          Покинуть комнату
        </Button>
      </Stack>
    </PaperBlock>
  );
};
