export const PAGE_ENDPOINTS = {
  login: "/login",
  register: "/register",
  quiz: "/quiz",
  history: "/quiz/history",
  room: {
    base: "room",
    createRoom: "create-room",
    usersRoom: ":code",
  },
};

export const pulbicPages = [PAGE_ENDPOINTS.login, PAGE_ENDPOINTS.register];
