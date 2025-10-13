import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../model/messages";

const websocketURL = "ws://localhost:5000/";
export type QuizSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const createQuizSocket = (
  roomId: string,
  token?: string
): QuizSocket => {
  return io(websocketURL, {
    query: { roomId },
    withCredentials: true,
    auth: token ? { token } : undefined,
    reconnection: true,
    reconnectionAttempts: 5,
  });
};
