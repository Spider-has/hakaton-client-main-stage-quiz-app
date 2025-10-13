export const API_BASE_URL = "http://localhost:5000/";

export const publicEndpoints = {
  login: `user/signin`,
  register: "user/signup",
};

export const privateEndpoints = {
  user: {
    me: "user/me",
    logout: "user/logout",
  },
  categories: {
    getCategories: "categories/list",
  },
  quiz: {
    getPulbicRooms: "rooms/list",
    createRoom: "rooms/create",
    connectToRoom: "rooms/join",
  },
};
