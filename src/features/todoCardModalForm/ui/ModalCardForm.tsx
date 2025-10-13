import type { Todo } from "../../../entites";
import { Modal } from "../../../shared";
import { TodoForm, type Category } from "./TodoCardForm";

interface TodoFormModalProps {
  initialData?: Todo;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { id?: number; values: any }) => void;
  categories: Category[];
}

export const TodoFormModal = ({
  open,
  onClose,
  initialData,
  onSubmit,
  categories,
}: TodoFormModalProps) => {
  const isEditMode = initialData?.id !== undefined;
  const title = isEditMode ? "Редактировать задачу" : "Создать задачу";
  const handleSubmit = (values: any) => {
    onSubmit({
      id: initialData?.id,
      values,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <TodoForm
        initialValues={isEditMode && initialData ? initialData : undefined}
        onSubmit={handleSubmit}
        submitLabel={isEditMode ? "Сохранить" : "Создать"}
        onCancel={onClose}
        categories={categories}
      />
    </Modal>
  );
};
