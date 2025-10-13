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
    setPlayers,
  } = useQuizRoomStore.getState();

  socket.on("question_changed", (question: Question) => {
    updateCurrentQuestion(question);
  });

  socket.on("player_joined", (player: Player) => {
    addPlayer(player);
  });

  socket.on("all_players_in_lobby", ({ players }) => {
    console.log(players);
    setPlayers(players);
  });

  socket.on("player_leave", (playerId) => {
    removePlayer(playerId);
  });

  socket.on("quiz_started", () => {
    startQuiz();
  });

  socket.on("error", (message) => {
    setError(message);
  });
};
