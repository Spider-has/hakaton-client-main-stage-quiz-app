import { create } from "zustand";
import type { CreateQuizState } from "../model/createQuizState";

export const useCreateQuizStore = create<CreateQuizState>((set) => ({
  selectedCategoryId: null,
  questionCount: 5,
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
  setQuestionCount: (count) => set({ questionCount: count }),
  reset: () => set({ selectedCategoryId: null, questionCount: 5 }),
}));
