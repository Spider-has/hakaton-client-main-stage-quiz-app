import { Box, useMediaQuery, useTheme } from "@mui/material";
import { CurrentQuestion } from "./Question";
import { useQuizRoomStore } from "../../../features";
import { AnswerTimer } from "./AnswerTimer";
import { PlayersLeaderboard } from "./LeaderBoard";

type QuizRoomAreaProps = {};

export const QuizRoomArea = ({}: QuizRoomAreaProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const currentQuestion = useQuizRoomStore((store) => store.currentQuestion);
  const players = useQuizRoomStore((store) => store.players);

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
        <CurrentQuestion
          question={
            currentQuestion ?? {
              id: "",
              text: "",
              options: [],
            }
          }
        />
        <AnswerTimer durationSeconds={30} />
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
            question={
              currentQuestion ?? {
                id: "",
                text: "",
                options: [],
              }
            }
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <AnswerTimer durationSeconds={30} />
        <PlayersLeaderboard players={players} />
      </Box>
    </Box>
  );
};
