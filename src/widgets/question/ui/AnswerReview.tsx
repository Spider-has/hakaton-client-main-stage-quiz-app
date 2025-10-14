
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useQuizRoomStore, type Player } from "../../../features";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { AnswerTimer } from "./AnswerTimer";
import { PlayersLeaderboard } from "./LeaderBoard";

type AnswerReviewProps = {
    players: Player[]
}
export const AnswerReview = (props: AnswerReviewProps) => {
    const { players} = props;
  const currentQuestion = useQuizRoomStore((state) => state.currentQuestion);


  if (!currentQuestion) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography>Нет данных для отображения</Typography>
      </Box>
    );
  }


  const correctPlayers = players.filter((p) => p.hasAnsweredCorrectly);
  const incorrectPlayers = players.filter(
    (p) => p.answered && !p.hasAnsweredCorrectly
  );
  const noAnswerPlayers = players.filter((p) => !p.answered);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
      <Box>
        <Typography variant="h6" color="success.main" gutterBottom>
          Правильный ответ:
        </Typography>
        <Chip
          label={currentQuestion.correct_answer}
          color="success"
          variant="outlined"
          sx={{ fontSize: "1.1rem", py: 1 }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Ответы игроков:
        </Typography>
        <List dense>
          {correctPlayers.map((player) => (
            <ListItem key={player.user_id}>
              <CheckCircle color="success" sx={{ mr: 1 }} />
              <ListItemText primary={player.username} />
            </ListItem>
          ))}
          {incorrectPlayers.map((player) => (
            <ListItem key={player.user_id}>
              <Cancel color="error" sx={{ mr: 1 }} />
              <ListItemText
                primary={player.username}
                secondary={`Ответ: ${player.answer}`}
              />
            </ListItem>
          ))}
          {noAnswerPlayers.map((player) => (
            <ListItem key={player.user_id}>
              <ListItemText
                primary={player.username}
                secondary="Не ответил"
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export const AnswerReviewArea = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

      const players = useQuizRoomStore((state) => state.players);
    return       <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 300px",
              gap: 3,
              p: isMobile ? 2 : 3,
              maxWidth: isMobile ? 800 : 1400,
              mx: "auto",
              width: "100%",
            }}
          >
            {isMobile ? (
              <>
                <AnswerTimer durationSeconds={5} />
                <AnswerReview players={players} />
                <PlayersLeaderboard players={players} />
              </>
            ) : (
              <>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box sx={{ width: "100%", maxWidth: 600 }}>
                    <AnswerReview players={players} />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <AnswerTimer durationSeconds={5}  />
                  <PlayersLeaderboard players={players} />
                </Box>
              </>
            )}
          </Box>
}