import { create } from "zustand";
import type { QuizRoomState } from "../model/store";

export const useQuizRoomStore = create<QuizRoomState>((set) => ({
  roomId: null,
  isConnected: false,
  error: null,
  currentQuestion: null,
  players: [],
  isQuizStarted: false,

  setRoomId: (id) => set({ roomId: id }),
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

  removePlayer: (playerId) =>
    set((state) => ({
      players: state.players.filter((p) => p.id !== playerId),
    })),

  startQuiz: () => set({ isQuizStarted: true }),
}));
