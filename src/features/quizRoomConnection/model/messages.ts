export type Question = {
  id: string;
  text: string;
  options: { id: string; text: string }[];
};

export type Player = {
  id: string;
  name: string;
};

export interface ClientToServerEvents {
  answer_submitted: (data: { questionId: string; answerId: string }) => void;
  player_ready: (data: { playerId: string }) => void;
  player_leave: (data: Record<string, never>) => void;
}

export interface ServerToClientEvents {
  question_changed: (data: Question) => void;
  player_joined: (data: Player) => void;
  player_leave: (data: string) => void;
  quiz_started: (data: Record<string, never>) => void;
  error: (message: string) => void;
}
