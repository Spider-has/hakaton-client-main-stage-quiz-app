import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
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

  const selectedIds = useCreateQuizStore((state) => state.selectedCategoryIds);
  const setSelectedIds = useCreateQuizStore(
    (state) => state.setSelectedCategoryIds
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesDTOs = await getCategories();
        setCategories(mapCategoryDTOtoCategory(categoriesDTOs.categories));
      } catch (err) {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleToggle = (id: string) => {
    setSelectedIds(
      selectedIds.includes(id)
        ? selectedIds.filter((catId) => catId !== id)
        : [...selectedIds, id]
    );
  };

  if (loading) {
    return (
      <FormControl fullWidth>
        <Typography>Загрузка категорий...</Typography>
        <CircularProgress size={24} />
      </FormControl>
    );
  }

  return (
    <FormControl component="fieldset" fullWidth>
      <FormLabel component="legend">Категории</FormLabel>
      <FormGroup>
        {categories.length === 0 ? (
          <Typography color="text.secondary">Нет доступных категорий</Typography>
        ) : (
          categories.map((cat) => (
            <FormControlLabel
              key={cat.id}
              control={
                <Checkbox
                  checked={selectedIds.includes(cat.id)}
                  onChange={() => handleToggle(cat.id)}
                />
              }
              label={cat.name}
            />
          ))
        )}
      </FormGroup>
    </FormControl>
  );
};