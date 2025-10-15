import type { RoomStatuses } from "./store";

export type Question = {
  id: string,
  text: string,
  options: string[],
  correct_answer: string
  time_limit: number
  category_id: string,
  position: number,
};

export type Player = {
  hasAnsweredCorrectly: boolean;
  user_id: string;
  username: string;
  score: number;
  correct: number;
  answered: boolean;
  answer: string;
  joined_at: string;
};


export type PlayerLeaderBoard = {
  score: number,
  user_id: string;
  username: string;
}

export interface ClientToServerEvents {
  answer: (data: { room_id:string, user_id: string, answer:string }) => void;
  player_ready: (data: { playerId: string }) => void;
  leave_room: (data: {room_id: string, user_id: string}) => void;
  all_players_in_lobby: (data: { room_id: string }) => void;
  join_room: (data: { room_id: string; user_id: string }) => void;
  start_quiz: (data: { room_id: string; user_id: string }) => void;
  update_leaderboard: (data:{room_id: string}) => void;
  room_status: (data: {room_id: string}) => void;
}

export interface ServerToClientEvents {
  question_changed: (data: Question) => void;

  update_leaderboard: (data: PlayerLeaderBoard[]) => void;
  quiz_started: (data: Record<string, never>) => void;
  all_players_in_lobby: ({ players, owner }: { players: Player[], owner: Player }) => void;
  startGame: (question: Question) => void;
  need_update_leaderboard: () => void;
  answered: (data: {user_id: string, correct_answered: 0 | 1}) => void;
  show_correct_answer: (data: {correct_answer: string}) => void;
  get_quest: (data: Question) => void;
  endOfGame: (data: {}) => void;

  room_status: (data: {status: RoomStatuses, question: Question}) => void;
}
