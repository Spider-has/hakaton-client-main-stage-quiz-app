import { useEffect, useRef } from "react";
import { useQuizRoomStore } from "../store/quizSocketStore";
import {
  getQuizSocketActions,
  type QuizRoomActions,
} from "./useWebsocketActions";
import type { Socket } from "socket.io-client";
import { handleIncomingEvents } from "./handleIncomingMessage";
import { createQuizSocket } from "../socket/socket";

export const useQuizRoomConnection = (
  roomId: string,
  userId: string
): QuizRoomActions => {
  const { setRoomId, reset, setIsConnected, setError } = useQuizRoomStore();

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    setRoomId(roomId);

    const socket = createQuizSocket(roomId);
    socketRef.current = socket;

    socket.on("disconnect", () => {
      console.log("🔌 Disconnected");
      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket.IO connection error:", err);
      setError("Connection failed");
    });

    const handleConnect = () => {
      console.log("Socket connected");
      socket.emit("join_room", { room_id: roomId, user_id: userId });
    };

    socket.on("connect", handleConnect);

    handleIncomingEvents(socket);

    return () => {
      socket.disconnect();
      socketRef.current = null;
      reset();
    };
  }, [roomId, setRoomId, setIsConnected, setError, reset]);
  const actions = getQuizSocketActions(socketRef);

  return actions;
};
