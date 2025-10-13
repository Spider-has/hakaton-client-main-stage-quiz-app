import type { Player } from "./player";
import type { Question } from "./question";

export interface QuizRoomState {
  roomId: string | null;
  isConnected: boolean;
  error: string | null;

  currentQuestion: Question | null;
  players: Player[];
  isQuizStarted: boolean;

  setRoomId: (id: string) => void;
  setIsConnected: (connected: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;

  updateCurrentQuestion: (question: Question) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  startQuiz: () => void;
}
