import { Box, useMediaQuery, useTheme } from "@mui/material";
import { CurrentQuestion } from "./Question";
import { QuizRoomContext, useQuizRoomStore } from "../../../features";
import { AnswerTimer } from "./AnswerTimer";
import { PlayersLeaderboard } from "./LeaderBoard";
import { useContext } from "react";
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
