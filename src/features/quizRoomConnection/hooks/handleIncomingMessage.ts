import type { RefObject } from "react";
import type { Player, Question } from "../model/messages";
import type { QuizSocket } from "../socket/socket";
import { useQuizRoomStore } from "../store/quizSocketStore";

export const handleIncomingEvents = (socket: RefObject<QuizSocket | null>) => {
  const {
    updateCurrentQuestion,
    addPlayer,
    removePlayer,
    startQuiz,
    setError,
    setPlayers,
  } = useQuizRoomStore.getState();
  if (socket.current) {
    socket.current.on("question_changed", (question: Question) => {
      updateCurrentQuestion(question);
    });

    socket.current.on("player_joined", (player: Player) => {
      addPlayer(player);
    });

    socket.current.on("all_players_in_lobby", ({ players }) => {
      console.log(players);
      setPlayers(players);
    });

    socket.current.on("player_leave", (playerId) => {
      removePlayer(playerId);
    });

    socket.current.on("quiz_started", () => {
      startQuiz();
    });

    socket.current.on("error", (message) => {
      setError(message);
    });
  }
};
