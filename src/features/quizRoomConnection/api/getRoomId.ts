import { publicFetch, privateEndpoints } from "../../../shared";

export const getRoomIdResponse = async (roomCode: string) => {
  const roomdIdRes = await publicFetch(
    `${privateEndpoints.quiz.getRoomId}${roomCode}/room_id`,
    { method: "GET" }
  );
  if (roomdIdRes.ok) {
    const data = await roomdIdRes.json();
    return data;
  } else {
    throw new Error(`${roomdIdRes.status} + ${roomdIdRes.statusText}`);
  }
};
