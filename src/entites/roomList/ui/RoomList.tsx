import { Typography, List, ListItem } from "@mui/material";
import { RoomCard } from "./Room";
import type { Room } from "../model/roomModel";

type RoomListProps = {
  rooms: Room[];
  joinRoomById: (id: string) => void;
};

export const RoomList = (props: RoomListProps) => {
  const { rooms, joinRoomById } = props;

  return (
    <>
      {rooms.length === 0 ? (
        <Typography>Нет доступных комнат</Typography>
      ) : (
        <List sx={{ width: "100%" }}>
          {rooms.map((room) => (
            <ListItem key={room.id} sx={{ p: 0, mb: 2 }}>
              <RoomCard key={room.id} room={room} joinRoomById={joinRoomById} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};
