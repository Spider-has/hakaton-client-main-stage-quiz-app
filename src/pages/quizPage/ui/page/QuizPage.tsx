import { Box, Container, Divider, Typography } from "@mui/material";
import {
  CreateRoomSection,
  EnterByCode,
  RoomList,
  tryJoinToRoom,
  useRoomStore,
} from "../../../../entites";
import { useNavigate } from "react-router";
import { PAGE_ENDPOINTS } from "../../../../app/config/pageEnpoints";
import { useEffect } from "react";

export default function QuizPageComponent() {
  const publicRooms = useRoomStore((store) => store.publicRooms);
  const fetchRooms = useRoomStore((store) => store.fetchPublicRooms);
  // const joinRoomById = useRoomStore((store) => store.joinRoomByCode);
  // const createRoom = useRoomStore((store) => store.createRoom);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const createRoomHandler = () => {
    navigate(PAGE_ENDPOINTS.room.base + `/${PAGE_ENDPOINTS.room.createRoom}`);
  };

  const joinByRoomCodeHandler = async (code: string) => {
    try {
      const roomId = await tryJoinToRoom(code);
      console.log(roomId);
      if (roomId) {
        navigate(PAGE_ENDPOINTS.room.base + `/${code}`);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
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
          width: "100%",
          maxWidth: 800,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 1,
          p: 3,
        }}
      >
        <CreateRoomSection onCreate={createRoomHandler} />
        <Divider sx={{ my: 3 }} />
        <EnterByCode joinRoomByCode={joinByRoomCodeHandler} />
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom>
          Доступные комнаты
        </Typography>
        <RoomList rooms={publicRooms} joinRoomById={joinByRoomCodeHandler} />
      </Box>
    </Container>
  );
}
