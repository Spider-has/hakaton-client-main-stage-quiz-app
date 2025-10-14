import { create } from "zustand";
import type { RoomStore } from "../model/roomModel";
import { getRooms, mapRoomsDTOtoRoom } from "../api/getRooms";

export const useRoomStore = create<RoomStore>((set) => ({
  publicRooms: [],
  loading: false,

  fetchPublicRooms: async () => {
    set({ loading: true });
    try {
      const roomsDTOs = await getRooms();

      set({ publicRooms: mapRoomsDTOtoRoom(roomsDTOs.rooms), loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Session expired";
      alert(message);
    }
  },
}));
