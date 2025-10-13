import type { CreateTodoDto } from "./api/createTask";
import type { Todo, TodoTaskDTO } from "./model";

const parseHttpDate = (dateStr?: string): string | undefined => {
  if (!dateStr) return undefined;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? undefined : date.toISOString().split("T")[0]; // "2025-10-10"
};

export const mapDtoToTodo = (dto: TodoTaskDTO): Todo => {
  console.log(mapDtoToTodo);
  return {
    id: dto.task_id,
    title: dto.title,
    description: dto.description || undefined,
    priority: dto.priority,
    completed: dto.is_completed === 1,
    deadline_date: parseHttpDate(dto.deadline_date),
    category: dto.category_name,
    categoryId: dto.category_id,
  };
};

export const getPriorityLabel = (priority: number): string => {
  switch (priority) {
    case 1:
      return "Высокий";
    case 2:
      return "Средний";
    case 3:
      return "Низкий";
    default:
      return "—";
  }
};
export const createTaskDTOMapper = (
  title: string,
  description?: string,
  deadline?: string,
  priority?: 1 | 2 | 3,
  categoryid?: number
): CreateTodoDto => {
  return {
    title: title,
    description: description,
    deadline_date: deadline,
    priority: priority,
    category_id: categoryid,
  };
};
