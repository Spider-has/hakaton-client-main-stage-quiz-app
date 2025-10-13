export type QuizRoomActions = {
  submitAnswer: (questionId: string, answerId: string) => void;
  sendReadySignal: (playerId: string) => void;
};
