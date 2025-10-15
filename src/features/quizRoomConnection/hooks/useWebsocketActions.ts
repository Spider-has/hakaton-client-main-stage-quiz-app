import { createContext, useContext } from "react";
import type { QuizSocket } from "../socket/socket";

export type QuizRoomActions = {
  submitAnswer: (room_id: string, user_id: string, answer: string) => void;
  sendReadySignal: (playerId: string) => void;
  leaveRoom: (roomId: string, userId: string) => void;
  getAllPlayerInRoom: (room_id: string) => void;
  startGame: (room_id: string, user_id: string) => void;
  roomStatus: (room_id: string) => void;
};

export const getQuizSocketActions = (
  socketRef: React.RefObject<QuizSocket | null>
): QuizRoomActions => {
  const submitAnswer = (room_id: string, user_id: string, answer: string) => {
    socketRef.current?.emit("answer", { room_id, user_id, answer });
  };

  const sendReadySignal = (playerId: string) => {
    socketRef.current?.emit("player_ready", { playerId });
  };

  const leaveRoom = (roomId: string, userId: string) => {
    console.log(roomId, userId)
    socketRef.current?.emit("leave_room", {room_id: roomId, user_id: userId});
  };

  const getAllPlayerInRoom = (room_id: string) => {
    console.log("get players in room: " + room_id);
    socketRef.current?.emit("all_players_in_lobby", { room_id });
  };

  const startGame = (room_id: string, user_id: string) => {
    socketRef.current?.emit("start_quiz", {room_id, user_id});
  };

  const roomStatus = (room_id: string) => {
    socketRef.current?.emit(  'room_status', {room_id: room_id});
  };



  return {
    submitAnswer,
    sendReadySignal,
    leaveRoom,
    getAllPlayerInRoom,
    startGame,
    roomStatus
  };
};

export const QuizRoomContext = createContext<QuizRoomActions | null>(null);

export const useQuizRoomActions = () => {
  const ctx = useContext(QuizRoomContext);
  if (!ctx) {
    throw new Error("useQuizRoomActions must be used inside QuizRoomProvider");
  }
  return ctx;
};
