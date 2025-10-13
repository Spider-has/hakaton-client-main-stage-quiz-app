import type { Player, Question } from "./messages";

export interface QuizRoomState {
  roomId: string | null;
  isConnected: boolean;
  error: string | null;

  currentQuestion: Question | null;
  players: Player[];
  owner: Player | null;
  isQuizStarted: boolean;

  setRoomId: (id: string) => void;
  setRoomOwner: (player: Player) => void;
  setPlayers: (players: Player[]) => void;
  setIsConnected: (connected: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;

  updateCurrentQuestion: (question: Question) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  startQuiz: () => void;
}
