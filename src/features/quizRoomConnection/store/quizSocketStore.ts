import { create } from "zustand";
import type { QuizRoomState } from "../model/store";

export const useQuizRoomStore = create<QuizRoomState>((set) => ({
  roomId: null,
  isConnected: false,
  error: null,
  currentQuestion: null,
  players: [],
  owner: null,
  isQuizStarted: false,

  setRoomId: (id) => set({ roomId: id }),
  setRoomOwner: (player) => set({ owner: player }),
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

  updateCurrentQuestion: (question) => set({ currentQuestion: question }),

  addPlayer: (player) =>
    set((state) => ({ players: [...state.players, player] })),

  setPlayers: (players) => set({ players }),

  removePlayer: (playerId) =>
    set((state) => ({
      players: state.players.filter((p) => p.user_id !== playerId),
    })),

  startQuiz: () => set({ isQuizStarted: true }),
}));
