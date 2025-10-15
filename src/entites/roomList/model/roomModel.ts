export interface Room {
  id: string;
  creatorName: string;
  currentPlayers: number;
  maxPlayers?: number;
  code: string;
  questions: number,
  categories: string[]
}

export interface RoomStore {
  publicRooms: Room[];
  loading: boolean;
  fetchPublicRooms: () => Promise<void>;
}
