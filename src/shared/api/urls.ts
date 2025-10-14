const default_URL = "http://localhost:5000/";
const env_URL = import.meta.env.VITE_API_URL;

export const API_BASE_URL = env_URL ?? default_URL;
console.log(env_URL);

const default_websocket_url = "ws://localhost:5000/";
const env_websocket_url = import.meta.env.VITE_WEBSOCKET_URL;
export const WEBSOCKET_URL = default_websocket_url ?? env_websocket_url;
console.log(env_websocket_url);

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
    getRoomId: "rooms/",
    createRoom: "rooms/create",
    connectToRoom: "rooms/join",
  },
};
