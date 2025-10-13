import { privateEndpoints, publicFetch } from "../../../shared";
import type { CreateTodoDto } from "./createTask";

export const updateTask = async (
  data: CreateTodoDto,
  id: number
): Promise<Response> => {
  const res = await publicFetch(`${privateEndpoints.tasks.update}${id}`, {
    method: "PUT",
    body: data,
  });
  return res;
};
