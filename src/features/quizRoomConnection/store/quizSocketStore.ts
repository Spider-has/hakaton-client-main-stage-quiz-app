import { create } from "zustand";
import { RoomStatus, type QuizRoomState } from "../model/store";

export const useQuizRoomStore = create<QuizRoomState>((set, get) => ({
  roomId: null,
  roomCode: null,
  isConnected: false,
  error: null,
  currentQuestion: null,
  players: [],
  owner: null,
  isQuizStarted: false,

  status: RoomStatus.WAITING,

  setRoomId: (id) => set({ roomId: id }),
  setRoomCode: (code) => set({ roomId: code }),
  setRoomOwner: (player) => set({ owner: player }),
  setRoomStatus: (status) => set({ status }),
  setIsConnected: (connected) => set({ isConnected: connected }),
  setError: (error) => set({ error }),
  
  reset: () =>
    set({
      roomId: null,
      isConnected: false,
      error: null,
      currentQuestion: null,
      players: [],
      isQuizStarted: false,
    }),

   updatePlayers: (updatedPlayers) => {
    const currentPlayers = get().players;

    const updatedMap = new Map(updatedPlayers.map(p => [p.user_id, p]));

    const nextPlayers = currentPlayers.map(player =>
    {
      if  (updatedMap.has(player.user_id)){
    const newdata = updatedMap.get(player.user_id) 
    return {...player, score: newdata?.score ?? player.score}}
    return player
    }
    );

    set({ players: nextPlayers });
  },


  setPlayerAnswerStatus: (playerId: string, isCorrect: boolean) => {
    console.log('try to set answered player. ', playerId, isCorrect)
    set((state) => ({
      players: state.players.map((player) =>
        player.user_id === playerId
          ? { ...player, hasAnsweredCorrectly: isCorrect, answered: true }
          : player
      ),
    }))
  },

  saveUserAnswer: (playerId: string, answer: string) => {
    console.log('try to save user answer. ', playerId, answer)
    set((state) => ({
      players: state.players.map((player) =>
        player.user_id === playerId
          ? { ...player, answer: answer }
          : player
      ),
    }))
  },

  resetAllUsersAnswersData: () => {
    set(state => ({
      players: state.players.map((player) => ({
        ...player,
        hasAnsweredCorrectly: false,
        answer: "",
        answered: false,
      }))
    }))
  },
  updateCurrentQuestion: (question) => set({ currentQuestion: question }),

  setPlayers: (players) => set({ players }),

  startQuiz: () => set({ isQuizStarted: true }),
}));
