import { useEffect, useRef } from "react";
import { useQuizRoomStore } from "../store/quizSocketStore";
import {
  getQuizSocketActions,
  type QuizRoomActions,
} from "./useWebsocketActions";
import { handleIncomingEvents } from "./handleIncomingMessage";
import { createQuizSocket, type QuizSocket } from "../socket/socket";

export const useQuizRoomConnection = (
  roomId: string | null,
  userId: string | null
): QuizRoomActions => {
  const { setRoomId, reset, setIsConnected, setError } = useQuizRoomStore();

  const socketRef = useRef<QuizSocket | null>(null);

  useEffect(() => {
    if (!roomId || !userId) return;

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
      setIsConnected(true);
    };

    socket.on("connect", handleConnect);

    handleIncomingEvents(socketRef);

    return () => {
      socket.disconnect();
      socketRef.current = null;
      reset();
    };
  }, [roomId, userId, setRoomId, setIsConnected, setError, reset]);

  const actions = getQuizSocketActions(socketRef);

  return actions;
};
