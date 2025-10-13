import { privateEndpoints, publicFetch } from "../../../shared";

export type CreateTodoDto = {
  title: string;
  description?: string;
  deadline_date?: string;
  priority?: 1 | 2 | 3;
  category_id?: number;
};

export const createTask = async (data: CreateTodoDto): Promise<Response> => {
  const res = await publicFetch(privateEndpoints.tasks.create, {
    method: "POST",
    body: data,
  });
  return res;
};
