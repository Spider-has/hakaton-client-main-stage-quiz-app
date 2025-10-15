export interface CreateQuizState {
  selectedCategoryIds: string[];
  questionCount: number;
  setSelectedCategoryIds: (ids: string[]) => void;
  setQuestionCount: (count: number) => void;
  reset: () => void;
}
