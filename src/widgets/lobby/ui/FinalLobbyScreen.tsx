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
import { useUserStore } from "../../../entites";
import { useEffect, useRef } from "react";

interface LeaderboardScreenProps {
  players: Player[];
  handleLeaveRoom: () => void;
}

export const LeaderboardScreen = ({
  players,
  handleLeaveRoom,
}: LeaderboardScreenProps) => {
  const user = useUserStore((state) => state.user);

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0]?.toUpperCase())
      .join("")
      .substring(0, 2);
  };

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "";
  };

  const getRankStyles = (rank: number) => {
    if (rank === 1) {
      return {
        border: "2px solid gold",
        backgroundColor: "rgba(255, 215, 0, 0.08)",
      };
    }
    if (rank === 2) {
      return {
        border: "2px solid silver",
        backgroundColor: "rgba(192, 192, 192, 0.08)",
      };
    }
    if (rank === 3) {
      return {
        border: "2px solid #cd7f32",
        backgroundColor: "rgba(205, 127, 50, 0.08)",
      };
    }
    return {};
  };

  const getAvatarStyles = (rank: number) => {
    if (rank === 1) return { bgcolor: "gold", color: "#000" };
    if (rank === 2) return { bgcolor: "silver", color: "#000" };
    if (rank === 3) return { bgcolor: "#cd7f32", color: "#000" };
    return { bgcolor: "grey.400" };
  };

  const fanfarePlayedRef = useRef(false);

  useEffect(() => {
    if (fanfarePlayedRef.current) return;

    const audio = new Audio("/sounds/pole-chudes-priz.mp3");
    audio.volume = 0.6;

    audio.play().catch((e) => {
      console.warn("Не удалось воспроизвести фанфары:", e);
    });

    fanfarePlayedRef.current = true;

    return () => {
      fanfarePlayedRef.current = false;
    };
  }, []); 

  return (
    <Box
      sx={{
        minWidth: { xs: "100%", md: 400 },
        maxWidth: 800,
        width: "100%",
        mx: "auto",
        p: { xs: 2, md: 3 },
      }}
    >
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        Результаты квиза
      </Typography>

      <List disablePadding>
        {sortedPlayers.map((player, index) => {
          const rank = index + 1;
          const isCurrentUser = player.user_id === (user?.id ?? "");
          const isTop3 = rank <= 3;

          return (
            <Box
              key={player.user_id}
              sx={{
                p: 1.5,
                mb: 1,
                borderRadius: 1,
                ...getRankStyles(rank),
              }}
            >
              <ListItem sx={{ px: 0 }}>
                {/* Место */}
                <Box sx={{ minWidth: 48, textAlign: "center", mr: 2 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color={isTop3 ? "primary.main" : "text.primary"}
                  >
                    {rank}
                  </Typography>
                  {isTop3 && (
                    <Typography variant="body2" color="text.secondary">
                      {getMedalIcon(rank)}
                    </Typography>
                  )}
                </Box>

                {/* Аватар */}
                <ListItemAvatar>
                  <Avatar sx={getAvatarStyles(rank)}>
                    {getInitials(player.username)}
                  </Avatar>
                </ListItemAvatar>

                {/* Основная информация */}
                <ListItemText
                  primary={
                    isCurrentUser
                      ? `${player.username} (Вы)`
                      : player.username
                  }
                  secondary={
                    <Stack direction="row" spacing={2} mt={0.5}>
                      <Typography variant="body2" color="text.secondary">
                        Очки: <strong>{player.score}</strong>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Правильных: <strong>{player.correct}</strong>
                      </Typography>
                    </Stack>
                  }
                />
              </ListItem>
            </Box>
          );
        })}
      </List>

      <Stack spacing={2} sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          color="error"
          size="large"
          fullWidth
          onClick={handleLeaveRoom}
        >
          Покинуть комнату
        </Button>
      </Stack>
    </Box>
  );
};