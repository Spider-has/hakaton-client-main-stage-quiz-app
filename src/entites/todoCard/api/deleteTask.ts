import { privateEndpoints, publicFetch } from "../../../shared";

export const deleteTodo = async (id: number): Promise<Response> => {
  const res = await publicFetch(`${privateEndpoints.tasks.delete}${id}`, {
    method: "DELETE",
  });

  return res;
};
