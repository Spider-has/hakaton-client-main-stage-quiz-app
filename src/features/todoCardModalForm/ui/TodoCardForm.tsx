import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import type { Todo } from "../../../entites";

export interface Category {
  id: number;
  name: string;
}

interface TodoFormProps {
  initialValues?: Todo;
  onSubmit: (values: Todo) => void;
  submitLabel?: string;
  onCancel?: () => void;
  categories: Category[];
}

const EMPTY_VALUES: Todo = {
  title: "",
  description: "",
  priority: 2,
  deadline_date: "",
  category: "",
  id: 0,
  completed: false,
};

export const TodoForm = ({
  initialValues,
  onSubmit,
  submitLabel = "Создать задачу",
  onCancel,
  categories,
}: TodoFormProps) => {
  const [values, setValues] = useState<Todo>(initialValues || EMPTY_VALUES);

  useEffect(() => {
    setValues(initialValues || EMPTY_VALUES);
  }, [initialValues]);

  const handleChange =
    (field: keyof Todo) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev: Todo) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const categoryChangeHandler = (
    event:
      | React.ChangeEvent<
          Omit<HTMLInputElement, "value"> & {
            value: number;
          }
        >
      | (Event & {
          target: {
            value: number;
            name: string;
          };
        })
  ) => {
    setValues({
      ...values,
      categoryId: event.target.value,
      category:
        categories.find((el) => el.id == event.target.value)?.name ?? "",
    });
  };

  const handlePriorityChange = (e: any) => {
    setValues((prev: Todo) => ({
      ...prev,
      priority: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Название задачи *"
        value={values.title}
        onChange={handleChange("title")}
        fullWidth
        required
        autoFocus
      />

      <TextField
        label="Описание"
        value={values.description}
        onChange={handleChange("description")}
        fullWidth
        multiline
        minRows={2}
      />

      <FormControl fullWidth>
        <InputLabel id="priority-label">Приоритет *</InputLabel>
        <Select
          labelId="priority-label"
          value={values.priority}
          label="Приоритет *"
          onChange={handlePriorityChange}
        >
          <MenuItem value={1}>Высокий</MenuItem>
          <MenuItem value={2}>Средний</MenuItem>
          <MenuItem value={3}>Низкий</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="category-label">Категория</InputLabel>
        <Select
          labelId="category-label"
          value={values.categoryId || ""}
          label="Категория"
          onChange={categoryChangeHandler}
        >
          <MenuItem value="">
            <em>Без категории</em>
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label={"Дедлайн"}
        type={"datetime-local"}
        value={
          values.deadline_date && values.deadline_date.includes("T")
            ? `${values.deadline_date}`
            : `${values.deadline_date}T00:00`
        }
        onChange={handleChange("deadline_date")}
        fullWidth
      />

      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
        {onCancel && (
          <Button onClick={onCancel} color="secondary">
            Отмена
          </Button>
        )}
        <Button type="submit" variant="contained">
          {submitLabel}
        </Button>
      </Box>
    </Box>
  );
};
