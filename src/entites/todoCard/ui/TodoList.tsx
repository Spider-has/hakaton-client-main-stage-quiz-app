import { Box, Typography } from "@mui/material";
import type { Todo } from "../model";
import { TodoCard } from "./TodoCard";

interface TodoListProps {
  todos: Todo[];
  onToggleComplete?: (id: number, completed: boolean) => void;
  onEdit?: (todo: Todo) => void;
  onDelete?: (id: number) => void;
}

export const TodoList = ({
  todos,
  onToggleComplete,
  onEdit,
  onDelete,
}: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ textAlign: "center", mt: 4 }}>
        Нет задач
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggleComplete={
            onToggleComplete
              ? (completed) => onToggleComplete(todo.id, completed)
              : undefined
          }
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
};
