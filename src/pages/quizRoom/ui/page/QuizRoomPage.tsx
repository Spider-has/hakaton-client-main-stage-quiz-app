import { Box, Container } from "@mui/material";
import { useParams } from "react-router";
import {
  QuizRoomContext,
  useQuizRoomConnection,
  useQuizRoomStore,
} from "../../../../features";
import { PlayerList, RoomCodeCard } from "../../../../widgets";
import { useEffect } from "react";
import { useUserStore } from "../../../../entites";

export default function QuizRoomPageComponent() {
  const { code } = useParams<{ code: string }>();

  const user = useUserStore((state) => state.user);

  if (!code) {
    return <div>Invalid room ID</div>;
  }

  const actions = useQuizRoomConnection(code, user?.id ?? "");

  useEffect(() => {
    actions.getAllPlayerInRoom(code);
  }, [code, actions]);

  const players = useQuizRoomStore((state) => state.players);
  console.log(players);
  return (
    <QuizRoomContext.Provider value={actions}>
      <Container
        maxWidth={false}
        sx={{
          width: `100%`,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          flexDirection: "column",
          paddingTop: 2,
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "flex-start",
            maxWidth: "1400px",
            gap: 2,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ width: 220 }} />
          <PlayerList
            players={players}
            handleStartQuiz={() => {}}
            handleLeaveRoom={() => {}}
          />
          <RoomCodeCard roomCode={code} />
        </Box>

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: 3,
          }}
        >
          <RoomCodeCard roomCode={code} />
          <PlayerList
            players={players}
            handleStartQuiz={() => {}}
            handleLeaveRoom={() => {}}
          />
        </Box>
      </Container>
    </QuizRoomContext.Provider>
  );
}
