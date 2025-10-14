import type { Player, PlayerLeaderBoard, Question } from "./messages";

export type RoomStatuses = "waiting" | "question" | "finished" | "checkCorrectAnswer";

export const RoomStatus = {
  WAITING: "waiting",
  QUESTION: "question",
  FINISHED: "finished",
  CHECK_CORRECT_ANSWERS: "checkCorrectAnswer"
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
  updatePlayers: (playersLeaderBoard: PlayerLeaderBoard[]) => void;
  setError: (error: string | null) => void;
  reset: () => void;

  saveUserAnswer: (playerId: string, answer: string) => void;

  resetAllUsersAnswersData: () => void;

  setPlayerAnswerStatus: (playerId: string, isCorrect: boolean) => void;

  updateCurrentQuestion: (question: Question) => void;
  startQuiz: () => void;
}
