import {
  Box,
  Card,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  SportsScore as ScoreIcon,
  EmojiEvents as MedalIcon,
  AccessTime as TimeIcon,
  Checklist as CorrectIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { privateEndpoints, publicFetch } from "../../../../shared";

interface GameHistoryItem {
  score: number;
  correct: number;
  owner_id: string;
  owner_username: string;
  amount: number;
  creation: string;
  end: string;
  place: number;
}

interface GameHistoryResponse {
  games: GameHistoryItem[];
}

export  const GameHistory = () => {
  const [games, setGames] = useState<GameHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, "dd.MM.yyyy HH:mm");
  };

  const getMedalInfo = (place: number) => {
    switch (place) {
      case 1:
        return { icon: <MedalIcon color="warning" />, label: "1 место 🥇" };
      case 2:
        return { icon: <MedalIcon color="info" />, label: "2 место 🥈" };
      case 3:
        return { icon: <MedalIcon color="error" />, label: "3 место 🥉" };
      default:
        return { icon: <MedalIcon color="disabled" />, label: `${place} место` };
    }
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await publicFetch(privateEndpoints.user.getHistoryRooms, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data: GameHistoryResponse = await res.json();
        setGames(data.games || []);
      } catch (err) {
        console.error("Failed to load game history:", err);
        setError(
          err instanceof Error ? err.message : "Не удалось загрузить историю игр"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h5" gutterBottom align="center">
        История игр
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : games.length === 0 ? (
        <Typography align="center" color="text.secondary" sx={{ py: 3 }}>
          У вас пока нет завершённых игр.
        </Typography>
      ) : (
        <Card
          sx={{
            backgroundColor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
          }}
        >
          <List sx={{ py: 0 }}>
            {games.map((game, index) => {
              const medal = getMedalInfo(game.place);
              return (
                <ListItem
                  key={`${game.owner_id}-${game.creation}`}
                  divider={index < games.length - 1}
                  sx={{
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: "flex-start",
                    py: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "flex-start", mr: 2 }}>
                    {medal.icon}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          {medal.label}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Box display="flex" alignItems="center" sx={{ mt: 0.5 }}>
                            <ScoreIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                            <Typography component="span" variant="body2">
                              Счёт: <strong>{game.score}</strong>
                            </Typography>
                          </Box>

                          <Box display="flex" alignItems="center" sx={{ mt: 0.5 }}>
                            <CorrectIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                            <Typography component="span" variant="body2">
                              Верно: <strong>{game.correct}</strong> из {game.amount}
                            </Typography>
                          </Box>

                          <Box display="flex" alignItems="center" sx={{ mt: 0.5 }}>
                            <TimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                            <Typography component="span" variant="body2" color="text.secondary">
                              {formatDate(game.creation)} – {formatDate(game.end)}
                            </Typography>
                          </Box>
                        </>
                      }
                    />
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </Card>
      )}
    </Container>
  );
};

export default GameHistory