import {
  Card,
  CardContent,
  Typography,
  Box,
  Checkbox,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Delete, Edit, Flag, WatchLater } from "@mui/icons-material";
import type { Todo } from "../model";
import { getPriorityLabel } from "../utils";

export const TodoCard = ({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
}: {
  todo: Todo;
  onEdit?: (todo: Todo) => void;
  onDelete?: (id: number) => void;
  onToggleComplete?: (completed: boolean) => void;
}) => {
  const { title, description, priority, completed, deadline_date } = todo;
  const priorityLabel = getPriorityLabel(priority);
  return (
    <Card
      variant="outlined"
      sx={{
        opacity: completed ? 0.7 : 1,
        backgroundColor: completed ? "#fafafa" : "background.paper",
        transition: "opacity 0.2s",
      }}
    >
      <CardContent sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
          {onToggleComplete ? (
            <Checkbox
              checked={completed}
              onChange={(e) => onToggleComplete(e.target.checked)}
              sx={{ p: 0.5 }}
            />
          ) : (
            <Box
              sx={{
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
              }}
            >
              {completed ? "✓" : "○"}
            </Box>
          )}

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              sx={{
                textDecoration: completed ? "line-through" : "none",
                fontWeight: 500,
                wordBreak: "break-word",
                mb: 0.5,
              }}
            >
              {title}
            </Typography>

            {description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1, wordBreak: "break-word" }}
              >
                {description}
              </Typography>
            )}

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              <Chip
                icon={<Flag fontSize="small" />}
                label={`Приоритет: ${priorityLabel}`}
                size="small"
                variant="outlined"
                sx={{ borderRadius: 1, height: 24 }}
              />

              {todo.categoryId && todo.category && (
                <Chip
                  label={todo.category}
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: 1, height: 24 }}
                />
              )}

              {deadline_date && (
                <Chip
                  icon={<WatchLater fontSize="small" />}
                  label={deadline_date}
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: 1, height: 24 }}
                />
              )}
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 0.5, ml: 1 }}
          >
            {onEdit && (
              <Tooltip title="Редактировать">
                <IconButton
                  size="small"
                  onClick={() => onEdit(todo)}
                  sx={{ width: 28, height: 28 }}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip title="Удалить">
                <IconButton
                  size="small"
                  onClick={() => onDelete(todo.id)}
                  sx={{ width: 28, height: 28, color: "error.main" }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
