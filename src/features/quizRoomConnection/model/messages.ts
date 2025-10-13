export type Question = {
  id: string;
  text: string;
  options: { id: string; text: string }[];
};

export type Player = {
  user_id: string;
  username: string;
  score: number;
  correct: number;
  answered: boolean;
  answer: string;
  joined_at: string;
};

export interface ClientToServerEvents {
  answer_submitted: (data: { questionId: string; answerId: string }) => void;
  player_ready: (data: { playerId: string }) => void;
  player_leave: (data: Record<string, never>) => void;
  all_players_in_lobby: (data: { room_id: string }) => void;
  join_room: (data: { room_id: string; user_id: string }) => void;
}

export interface ServerToClientEvents {
  question_changed: (data: Question) => void;
  player_joined: (data: Player) => void;
  player_leave: (data: string) => void;
  quiz_started: (data: Record<string, never>) => void;
  error: (message: string) => void;
  all_players_in_lobby: ({ players }: { players: Player[] }) => void;
}
