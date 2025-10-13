import { TextField } from "@mui/material";
import { useCreateQuizStore } from "../store/createQuizStore";

export const QuestionCountInput = () => {
  const count = useCreateQuizStore((state) => state.questionCount);
  const setCount = useCreateQuizStore((state) => state.setQuestionCount);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 50) {
      setCount(value);
    }
  };

  return (
    <TextField
      label="Количество вопросов"
      type="number"
      value={count}
      onChange={handleChange}
      fullWidth
    />
  );
};
