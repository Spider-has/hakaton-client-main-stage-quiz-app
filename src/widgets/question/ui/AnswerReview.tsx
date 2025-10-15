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
import { useRef, useEffect } from "react";
import { useUserStore } from "../../../entites";

type AnswerReviewProps = {
  players: Player[];
};

export const AnswerReview = (props: AnswerReviewProps) => {
  const { players } = props;
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
     <Box
  sx={{
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    p: 2,
    bgcolor: "background.paper",
    borderRadius: 2,
    width: "100%", 
  }}
>
  <Typography
    variant="h6"
    color="success.main"
    fontWeight="bold"
    sx={{
      flex: "0 1 auto",
      minWidth: 0,    
    }}
  >
    Правильный ответ:
  </Typography>
  <Chip
    label={currentQuestion.correct_answer}
    color="success"
    variant="outlined"
    sx={{
      fontSize: "1.1rem",
      py: 1,
      flex: "1 1 auto",   
      minWidth: 0,         
      maxWidth: "100%",     
      whiteSpace: "normal", 
      wordBreak: "break-word",
    }}
  />
</Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
          height: "fit-content",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Ответы игроков:
        </Typography>
        <List dense sx={{ py: 0 }}>
          {correctPlayers.map((player) => (
            <ListItem key={player.user_id} sx={{ py: 0.5 }}>
              <CheckCircle color="success" sx={{ mr: 1, flexShrink: 0 }} />
              <ListItemText primary={player.username} />
            </ListItem>
          ))}
          {incorrectPlayers.map((player) => (
            <ListItem key={player.user_id} sx={{ py: 0.5 }}>
              <Cancel color="error" sx={{ mr: 1, flexShrink: 0 }} />
              <ListItemText
                primary={player.username}
                secondary={`Ответ: ${player.answer}`}
              />
            </ListItem>
          ))}
          {noAnswerPlayers.map((player) => (
            <ListItem key={player.user_id} sx={{ py: 0.5 }}>
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

  const { user } = useUserStore();

  const audioPlayedRef = useRef(false); 

  useEffect(() => {
    if ( !user || audioPlayedRef.current) return;

    const currentPlayer = players.find((p) => p.user_id === user.id);
    if (!currentPlayer || !currentPlayer.answered) return;

    const soundFile = currentPlayer.hasAnsweredCorrectly
      ? "/sounds/correct_answer.mp3"
      : "/sounds/incorrect_answer.mp3";

    const audio = new Audio(soundFile);
    audio.volume = 0.5;

    audio.play().catch((e) => {
      console.warn("Не удалось воспроизвести звук:", e);
    });

    audioPlayedRef.current = true;

  }, [ players, user]);

  useEffect(() => {
    return () => {
      audioPlayedRef.current = false;
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 300px",
        gap: 3,
        p: isMobile ? 2 : 3,
        maxWidth: isMobile ? 800 : 'auto',
        mx: "auto",
        justifyContent:'center',
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
              <AnswerReview players={players} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <AnswerTimer durationSeconds={5} />
            <PlayersLeaderboard players={players} />
          </Box>
        </>
      )}
    </Box>
  );
};