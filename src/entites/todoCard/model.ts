export type Priority = 1 | 2 | 3;

export interface TodoTaskDTO {
  task_id: number;
  title: string;
  description?: string;
  priority: Priority;
  is_completed: 0 | 1;
  deadline_date?: string;
  creation_date: string;
  category_id?: number;
  category_name?: string;
}

export interface GetTasksDataDTO {
  message: string;
  task_list: TodoTaskDTO[];
}

export interface Todo {
  id: number;
  title: string;
  description?: string;
  priority: Priority;
  completed: boolean;
  deadline_date?: string;
  category?: string;
  categoryId?: number;
}
