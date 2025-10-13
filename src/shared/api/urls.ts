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
  tasks: {
    getList: "task/get_list",
    create: "task/create",
    delete: "task/delete/",
    update: "task/update/",
  },
  categories: {
    getCategories: "category/get_list",
  },
};
