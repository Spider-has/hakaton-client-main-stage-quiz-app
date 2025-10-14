import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../model/messages";
import { WEBSOCKET_URL } from "../../../shared";

export type QuizSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const createQuizSocket = (
  roomId: string,
  token?: string
): QuizSocket => {
  return io(WEBSOCKET_URL, {
    query: { roomId },
    withCredentials: true,
    auth: token ? { token } : undefined,
    reconnection: true,
    reconnectionAttempts: 5,
  });
};
