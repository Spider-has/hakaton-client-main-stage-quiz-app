import type { RefObject } from "react";
import type {  Question } from "../model/messages";
import type { QuizSocket } from "../socket/socket";
import { useQuizRoomStore } from "../store/quizSocketStore";
import { RoomStatus } from "../model/store";

export const handleIncomingEvents = (socket: RefObject<QuizSocket | null>, roomId: string) => {
  const {
    updateCurrentQuestion,
    setPlayers,
    startQuiz,
    setRoomStatus,
    updatePlayers,
    setPlayerAnswerStatus,
    setRoomOwner,
    resetAllUsersAnswersData
  } = useQuizRoomStore.getState();
  if (socket.current) {
    socket.current.on("question_changed", (question: Question) => {
      updateCurrentQuestion(question);
    });


    socket.current.on("all_players_in_lobby", ({ players, owner }) => {
      console.log("get players in lobby...");
      setRoomOwner(owner);
      setPlayers(players);
    });


    socket.current.on("update_leaderboard", ( players ) => {
      console.log("update leaderboard...");
      console.log(players);
      updatePlayers(players);
    });


    socket.current.on('startGame', (question) => {
      console.log("start game...");
      console.log(question)
      setRoomStatus(RoomStatus.QUESTION);
      updateCurrentQuestion(question);
      resetAllUsersAnswersData();
      startQuiz()
    })

    socket.current.on('get_quest', (question) => {
      console.log("get new question...");
      console.log(question)
      setRoomStatus(RoomStatus.QUESTION);
      updateCurrentQuestion(question);
      resetAllUsersAnswersData();
      startQuiz()
    })

    socket.current.on('answered', ({user_id, correct_answered}) => {
      console.log("userAnswered...");
      console.log(user_id, correct_answered)
      setPlayerAnswerStatus(user_id, correct_answered == 1)
    })

    socket.current.on('show_correct_answer', ({correct_answer}) => {
      console.log('time to show correct answer: ', correct_answer);
      setRoomStatus(RoomStatus.CHECK_CORRECT_ANSWERS);
      socket.current?.emit("all_players_in_lobby", ({room_id: roomId}))
    })

    socket.current.on('need_update_leaderboard', () => {
      console.log('need to update leaderboard')
      socket.current?.emit("update_leaderboard", ({room_id: roomId}))
    })

     socket.current.on('endOfGame', () => {
      console.log('end of game')
      setRoomStatus(RoomStatus.FINISHED);
      socket.current?.emit("update_leaderboard", ({room_id: roomId}))
    })


    socket.current.on('room_status', ({status, question}) => {
      console.log('get room status')
      setRoomStatus(status);
      updateCurrentQuestion(question);
    })
  }
};
