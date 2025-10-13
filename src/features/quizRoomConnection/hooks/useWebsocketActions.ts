import { createContext, useContext } from "react";
import type { QuizSocket } from "../socket/socket";

export type QuizRoomActions = {
  submitAnswer: (questionId: string, answerId: string) => void;
  sendReadySignal: (playerId: string) => void;
  leaveRoom: () => void;
  getAllPlayerInRoom: (room_id: string) => void;
};

export const getQuizSocketActions = (
  socketRef: React.RefObject<QuizSocket | null>
): QuizRoomActions => {
  const submitAnswer = (questionId: string, answerId: string) => {
    socketRef.current?.emit("answer_submitted", { questionId, answerId });
  };

  const sendReadySignal = (playerId: string) => {
    socketRef.current?.emit("player_ready", { playerId });
  };

  const leaveRoom = () => {
    socketRef.current?.emit("player_leave", {});
  };

  const getAllPlayerInRoom = (room_id: string) => {
    console.log(room_id);
    socketRef.current?.emit("all_players_in_lobby", { room_id });
  };

  return {
    submitAnswer,
    sendReadySignal,
    leaveRoom,
    getAllPlayerInRoom,
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
