import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  AuthContext,
  createTask,
  createTaskDTOMapper,
  getTasks,
  mapDtoToTodo,
  TodoList,
  updateTask,
  type GetTasksDataDTO,
  type Todo,
} from "../../../../entites";
import { Add } from "@mui/icons-material";
import { TodoFormModal } from "../../../../features";
import { deleteTodo } from "../../../../entites/todoCard/api/deleteTask";
import { DownloadJsonButton, TopBar } from "./TopPanel";
import { userLogout } from "../../../../entites/user/api/logout";
import { useNavigate } from "react-router";
import { PAGE_ENDPOINTS } from "../../../../app/config/pageEnpoints";
import type { Category } from "../../../../features/todoCardModalForm/ui/TodoCardForm";
import { getCategories } from "../../../../entites/todoCard/api/getCategories";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getCategories();
        if (data) {
          const mapped = data?.map((el) => ({
            id: el.category_id,
            name: el.name,
          }));
          setCategories(mapped);
        }
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    };

    load();
  }, []);

  return { categories, loading, error };
};

export default function TaskPageComponent() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [reload, setReload] = useState<boolean>(true);

  const { categories } = useCategories();
  const navigate = useNavigate();

  const context = useContext(AuthContext);
  useEffect(() => {
    if (!context?.isAuthenticated) {
      navigate(PAGE_ENDPOINTS.login);
    }
  }, [context]);

  useEffect(() => {
    const fetchTodos = async () => {
      const dtoList: GetTasksDataDTO | undefined = await getTasks();
      if (dtoList) {
        const mapped = dtoList.task_list.map(mapDtoToTodo);
        setTodos(mapped);
      }
    };
    if (reload) {
      fetchTodos();
      setReload(false);
    }
  }, [reload]);

  const handleToggleComplete = (id: number, completed: boolean) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<undefined | Todo>(undefined);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const userContext = useContext(AuthContext);

  const openCreateModal = () => {
    setModalData(undefined);
    setModalOpen(true);
  };

  const openEditModal = (todo: Todo) => {
    setModalData(todo);
    setModalOpen(true);
  };

  const showSnackbar = (
    message: string,
    severity: "success" | "error" = "success"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  const handleFormSubmit = async ({
    id,
    values,
  }: {
    id?: number;
    values: Todo;
  }) => {
    if (id !== undefined) {
      const res = await updateTask(
        createTaskDTOMapper(
          values.title,
          values.description,
          values.deadline_date,
          values.priority,
          values.categoryId
        ),
        id
      );
      if (res.ok) setReload(true);
    } else {
      const res = await createTask(
        createTaskDTOMapper(
          values.title,
          values.description,
          values.deadline_date,
          values.priority,
          values.categoryId
        )
      );
      if (res.ok) setReload(true);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setReload(true);
      showSnackbar("Задача удалена");
    } catch (err: any) {
      showSnackbar(err.message || "Не удалось удалить задачу", "error");
    }
  };

  const handleLogout = async () => {
    const res = await userLogout();
    if (res.ok) {
      userContext?.refreshUser();
      navigate(PAGE_ENDPOINTS.login);
    }
  };
  return (
    <>
      <TopBar
        userLogin={userContext?.user?.name ?? ""}
        onLogout={handleLogout}
      />
      <Container
        maxWidth={false}
        sx={{
          minHeight: "100vh",
          width: `100%`,
          display: "flex",
          alignContent: "center",
          backgroundColor: "#f5f5f5",
          flexDirection: "column",
          paddingTop: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5">Мои задачи</Typography>
          <DownloadJsonButton data={todos} />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={openCreateModal}
          >
            Новая задача
          </Button>
        </Box>
        <TodoList
          todos={todos}
          onToggleComplete={handleToggleComplete}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
        <TodoFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          initialData={modalData}
          onSubmit={handleFormSubmit}
          categories={categories}
        />
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={closeSnackbar}
        >
          <Alert
            onClose={closeSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
