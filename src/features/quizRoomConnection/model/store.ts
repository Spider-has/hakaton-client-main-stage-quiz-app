import type { Player, Question } from "./messages";

export type RoomStatuses = "waiting" | "question" | "finished";

export const RoomStatus = {
  WAITING: "waiting",
  QUESTION: "question",
  FINISHED: "finished",
} as const;

export interface QuizRoomState {
  roomId: string | null;
  roomCode: string | null;
  isConnected: boolean;
  error: string | null;

  status: RoomStatuses;

  currentQuestion: Question | null;
  players: Player[];
  owner: Player | null;
  isQuizStarted: boolean;

  setRoomId: (id: string) => void;
  setRoomCode: (code: string) => void;
  setRoomOwner: (player: Player) => void;
  setRoomStatus: (status: RoomStatuses) => void;
  setPlayers: (players: Player[]) => void;
  setIsConnected: (connected: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;

  updateCurrentQuestion: (question: Question) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  startQuiz: () => void;
}
