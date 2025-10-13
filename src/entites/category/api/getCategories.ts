import { handleResponse, privateEndpoints, publicFetch } from "../../../shared";
import type { Category } from "../model/types";

type CategoryDTO = {
  id: string;
  name: string;
};

type getCategoriesDTO = {
  categories: CategoryDTO[];
};

export const getCategories = async (): Promise<getCategoriesDTO> => {
  const res = await publicFetch(privateEndpoints.categories.getCategories, {
    method: "GET",
  });
  return handleResponse<getCategoriesDTO>(res);
};

export const mapCategoryDTOtoCategory = (data: CategoryDTO[]): Category[] => {
  return data.map((el) => ({
    id: el.id,
    name: el.name,
  }));
};
