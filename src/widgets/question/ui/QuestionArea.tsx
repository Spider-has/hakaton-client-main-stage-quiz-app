import { Box, useMediaQuery, useTheme } from "@mui/material";
import { CurrentQuestion } from "./Question";
import { QuizRoomContext, useQuizRoomStore } from "../../../features";
import { AnswerTimer } from "./AnswerTimer";
import { PlayersLeaderboard } from "./LeaderBoard";
import { useContext, useEffect, useRef } from "react";
import { useUserStore } from "../../../entites";

type QuizRoomAreaProps = {};

export const QuizRoomArea = ({}: QuizRoomAreaProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const currentQuestion = useQuizRoomStore((store) => store.currentQuestion);
  const players = useQuizRoomStore((store) => store.players);
  const actionsContext = useContext(QuizRoomContext)
  const roomId = useQuizRoomStore(state => state.roomId)
  const {user} = useUserStore();
  const saveAnswer = useQuizRoomStore(state => state.saveUserAnswer)

  const onSubmitAnswerHandler = (answer: string) => {
    if(actionsContext && roomId && user)
    {
      console.log(roomId, user, answer)
      actionsContext.submitAnswer(roomId, user.id, answer)
      saveAnswer(user.id, answer)
    }
  }
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!currentQuestion) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      return;
    }

    if (!audioRef.current) {
      const audio = new Audio("/sounds/clockTicking.mp3");
      audio.loop = true; 
      audio.volume = 0.3; 
      audioRef.current = audio;
    }

    const audio = audioRef.current;
    audio.play().catch((e) => {
      console.warn("Не удалось воспроизвести звук:", e);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentQuestion]);

  if (isMobile) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          p: 2,
          maxWidth: 800,
          mx: "auto",
          width: "100%",
        }}
      >
        <AnswerTimer durationSeconds={currentQuestion?.time_limit ?? 10} />
        <CurrentQuestion
        onAnswerSubmit={onSubmitAnswerHandler}
          question={
            currentQuestion ?? {
              id: "",
              text: "",
              position: 0,
              options: [],
                correct_answer: "",
                time_limit: 0,
                category_id: "",
            }
          }
        />
        <PlayersLeaderboard players={players} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 300px",
        gap: 3,
        p: 3,
        maxWidth: 1400,
        mx: "auto",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", maxWidth: 600 }}>
          <CurrentQuestion
          onAnswerSubmit={onSubmitAnswerHandler}
            question={
              currentQuestion ?? {
              id: "",
              text: "",
              position: 0,
              options: [],
                correct_answer: "",
                time_limit: 0,
                category_id: "",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <AnswerTimer durationSeconds={currentQuestion?.time_limit ?? 10} />
        <PlayersLeaderboard players={players} />
      </Box>
    </Box>
  );
};
