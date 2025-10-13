import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useCreateQuizStore } from "../store/createQuizStore";
import {
  getCategories,
  mapCategoryDTOtoCategory,
  type Category,
} from "../../../entites";

export const CategorySelector = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedId = useCreateQuizStore((state) => state.selectedCategoryId);

  const setSelectedId = useCreateQuizStore(
    (state) => state.setSelectedCategoryId
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesDTOs = await getCategories();
        console.log(categoriesDTOs);
        setCategories(mapCategoryDTOtoCategory(categoriesDTOs.categories));
      } catch (err) {
        setCategories([]);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const handleChange = (e: SelectChangeEvent<string>) => {
    setSelectedId(e.target.value);
  };

  return (
    <FormControl fullWidth>
      {!loading && (
        <>
          <InputLabel>Категория</InputLabel>

          <Select
            value={selectedId || ""}
            label="Категория"
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
      {loading && (
        <>
          <Typography>Категории</Typography>
          <CircularProgress />
        </>
      )}
    </FormControl>
  );
};
