import { handleResponse, privateEndpoints, publicFetch } from "../../../shared";
import type { Room } from "../model/roomModel";

type RoomDTO = {
  room_id: string;
  owner: string;
  player_count: number;
  max_players: number;
  room_code: string;
};

type GetRoomsDTO = {
  rooms: RoomDTO[];
};

export const getRooms = async (): Promise<GetRoomsDTO> => {
  const res = await publicFetch(privateEndpoints.quiz.getPulbicRooms, {
    method: "GET",
  });
  return handleResponse<GetRoomsDTO>(res);
};

export const mapRoomsDTOtoRoom = (data: RoomDTO[]): Room[] => {
  return data.map((el) => ({
    id: el.room_id,
    creatorName: el.owner,
    currentPlayers: el.player_count,
    maxPlayers: el.max_players,
    code: el.room_code,
  }));
};

export const tryJoinToRoom = async (code: string): Promise<Response> => {
  const res = await publicFetch(privateEndpoints.quiz.connectToRoom, {
    method: "POST",
    body: {
      code,
    },
  });
  return res;
};
