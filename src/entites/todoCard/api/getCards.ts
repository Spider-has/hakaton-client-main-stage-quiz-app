import { privateEndpoints, publicFetch } from "../../../shared";
import type { GetTasksDataDTO } from "../model";

export const getTasks = async (): Promise<GetTasksDataDTO | undefined> => {
  const res = await publicFetch(privateEndpoints.tasks.getList);
  if (res.ok) {
    const data = await res.json();
    console.log(data);
    return data;
  }
  return undefined;
};
