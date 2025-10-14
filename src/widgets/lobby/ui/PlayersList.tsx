import {
  Avatar,
  Box,
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
import { useUserStore } from "../../../entites";

interface PlayerListProps {
  players: Player[];
  owner: Player;
  handleStartQuiz: () => void;
  handleLeaveRoom: () => void;
}

export const PlayerList = (props: PlayerListProps) => {
  const { players, owner,handleLeaveRoom, handleStartQuiz } = props;

  const user = useUserStore((state) => state.user);

  const host = owner;
  const isCurrentUserHost = (user?.id ?? "") === host.user_id
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0]?.toUpperCase())
      .join("")
      .substring(0, 2);
  };

  return (
    <PaperBlock
      sx={{ minWidth: { xs: "100%", md: 400 }, flexGrow: 1, maxWidth: 1200 }}
    >
      <Typography variant="h6" gutterBottom>
        Организатор
      </Typography>
      {host && (
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {getInitials(host.username)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={host.username} />
          <Box sx={{ color: "text.secondary", ml: 1 }}>👑</Box>
        </ListItem>
      )}

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
                    fontSize: "1.125rem", 
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
                <ListItemText primary={player.user_id == (user?.id ?? "") ? player.username + " (Вы)" : player.username} />
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
