// features/quiz-room-connection/model/socket-handlers.ts

import type { Player, Question } from "../model/messages";
import type { QuizSocket } from "../socket/socket";
import { useQuizRoomStore } from "../store/quizSocketStore";

export const handleIncomingEvents = (socket: QuizSocket) => {
  const {
    updateCurrentQuestion,
    addPlayer,
    removePlayer,
    startQuiz,
    setError,
  } = useQuizRoomStore.getState();

  socket.on("question_changed", (question: Question) => {
    updateCurrentQuestion(question);
  });

  socket.on("player_joined", (player: Player) => {
    addPlayer(player); // player: Player
  });

  socket.on("player_leave", (playerId) => {
    removePlayer(playerId); // playerId: string
  });

  socket.on("quiz_started", () => {
    startQuiz(); // payload: Record<string, never> — можно игнорировать
  });

  socket.on("error", (message) => {
    setError(message); // message: string
  });
};
