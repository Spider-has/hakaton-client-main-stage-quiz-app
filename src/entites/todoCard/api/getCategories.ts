import { privateEndpoints, publicFetch } from "../../../shared";

type CategoryDTO = {
  category_id: number;
  name: string;
};

type ListDTO = {
  message: string;
  category_list: CategoryDTO[];
};

export const getCategories = async (): Promise<CategoryDTO[] | undefined> => {
  const res = await publicFetch(privateEndpoints.categories.getCategories);
  if (res.ok) {
    const data = (await res.json()) as ListDTO;
    return data.category_list;
  }
  return undefined;
};
