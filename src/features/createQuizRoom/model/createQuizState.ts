export interface CreateQuizState {
  selectedCategoryId: string | null;
  questionCount: number;
  setSelectedCategoryId: (id: string) => void;
  setQuestionCount: (count: number) => void;
  reset: () => void;
}
