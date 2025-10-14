import { create } from "zustand";
import { RoomStatus, type QuizRoomState } from "../model/store";
import type { Question } from "../model/messages";

const sampleQuestion: Question = {
  id: "q-001",
  text: "Какой язык программирования используется для написания React-компонентов?",
  options: [
    { id: "opt-1", text: "Java" },
    { id: "opt-2", text: "Python" },
    { id: "opt-3", text: "JavaScript" },
    { id: "opt-4", text: "C++" },
  ],
};

export const useQuizRoomStore = create<QuizRoomState>((set) => ({
  roomId: null,
  roomCode: null,
  isConnected: false,
  error: null,
  currentQuestion: sampleQuestion,
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
