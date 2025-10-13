import { Card, CardContent, Typography, Button } from "@mui/material";
import type { Room } from "../model/roomModel";

type RoomCard = {
  room: Room;
  joinRoomById: (id: string) => void;
};

export const RoomCard = (props: RoomCard) => {
  const { room, joinRoomById } = props;
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant="body1">
          Создал: <strong>{room.creatorName}</strong>
        </Typography>
        <Typography variant="body1">
          Код комнаты: <strong>{room.code}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Участников: {room.currentPlayers}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
          onClick={() => joinRoomById(room.code)}
        >
          Войти
        </Button>
      </CardContent>
    </Card>
  );
};
