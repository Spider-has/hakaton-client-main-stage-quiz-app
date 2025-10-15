import { create } from "zustand";
import type { CreateQuizState } from "../model/createQuizState";

export const useCreateQuizStore = create<CreateQuizState>((set) => ({
  questionCount: 5,
    selectedCategoryIds: [],
  setSelectedCategoryIds: (ids) => set({ selectedCategoryIds: ids }),
  setQuestionCount: (count) => set({ questionCount: count }),
  reset: () => set({ selectedCategoryIds: [], questionCount: 5 }),
}));
