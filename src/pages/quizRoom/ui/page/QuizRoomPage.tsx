import { Box, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import {
  QuizRoomContext,
  RoomStatus,
  useQuizRoomConnection,
  useQuizRoomStore,
} from "../../../../features";
import { AnswerReviewArea, LeaderboardScreen, PlayerList, QuizRoomArea, RoomCodeCard } from "../../../../widgets";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../../entites";
import { getRoomIdResponse } from "../../../../features/quizRoomConnection/api/getRoomId";
import { PAGE_ENDPOINTS } from "../../../../app/config/pageEnpoints";

export default function QuizRoomPageComponent() {
  const { code } = useParams<{ code: string }>();

  const user = useUserStore((state) => state.user);
  const { roomId, setRoomCode, setRoomId, isConnected } = useQuizRoomStore();

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!code) {
    return <div>Invalid room ID</div>;
  }

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const data = await getRoomIdResponse(code);
        if (data.room_id) {
          setRoomCode(code);
          setRoomId(data.room_id);
        }
      } catch (err) {
        setError("room not found");
      }
    };
    initialFetch();
  }, [code, setRoomCode, setRoomId]);

  useEffect(() => {
    if (error) {
      alert(error);
      navigate(PAGE_ENDPOINTS.quiz);
    }
  }, [error]);


  const actions = useQuizRoomConnection(roomId, user?.id ?? null);

  useEffect(() => {
    if (isConnected) {
      actions.getAllPlayerInRoom(roomId ?? "");
      actions.roomStatus(roomId ?? "");
    }
    console.log("connected: ", isConnected);
  }, [roomId, isConnected]);

  const players = useQuizRoomStore((state) => state.players);

  const roomStatus = useQuizRoomStore((store) => store.status);
  const roomOwner = useQuizRoomStore(state => state.owner)
  const reset = useQuizRoomStore(state => state.reset)

  const leaveRoomHandler = () => {
    if(roomId && user){
      actions.leaveRoom(roomId, user.id)
      reset();
      navigate(PAGE_ENDPOINTS.quiz)
    }
  }

  const startRoomHandler = () => {
    if(roomId && user && roomOwner){
      if(roomOwner.user_id == user.id){
        actions.startGame(roomId, user.id)
      }
    }
  }

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
        {roomStatus === RoomStatus.WAITING && (
          <>
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
                handleStartQuiz={startRoomHandler}
                handleLeaveRoom={leaveRoomHandler} owner={roomOwner ?? {
                  hasAnsweredCorrectly: false,
                  user_id: "",
                  username: "",
                  score: 0,
                  correct: 0,
                  answered: false,
                  answer: "",
                  joined_at: ""
                }}           />
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
                handleStartQuiz={startRoomHandler}
                handleLeaveRoom={leaveRoomHandler} owner={ roomOwner ?? {
                  hasAnsweredCorrectly: false,
                  user_id: "",
                  username: "",
                  score: 0,
                  correct: 0,
                  answered: false,
                  answer: "",
                  joined_at: ""
                }}              />
            </Box>
          </>
        )}
        {roomStatus === RoomStatus.QUESTION && <QuizRoomArea />}
        {roomStatus === RoomStatus.CHECK_CORRECT_ANSWERS && <AnswerReviewArea/>}
        {roomStatus === RoomStatus.FINISHED && <LeaderboardScreen players={players} handleLeaveRoom={leaveRoomHandler}/>}
      </Container>
    </QuizRoomContext.Provider>
  );
}
