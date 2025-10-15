import { Card, CardContent, Typography, Button, Chip } from "@mui/material";
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

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Участников:{" "}
          <strong>
            {room.currentPlayers}
            {room.maxPlayers != null ? ` / ${room.maxPlayers}` : ""}
          </strong>
        </Typography>

        {room.categories.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Категории:
            <div>
              {room.categories.map((category, index) => (
                <Chip
                  key={index}
                  label={category}
                  size="small"
                  sx={{ mr: 0.5, mt: 0.5 }}
                />
              ))}
            </div>
          </Typography>
        )}

        <Button
          variant="outlined"
          size="small"
          sx={{ mt: 2 }}
          onClick={() => joinRoomById(room.code)}
        >
          Войти
        </Button>
      </CardContent>
    </Card>
  );
};