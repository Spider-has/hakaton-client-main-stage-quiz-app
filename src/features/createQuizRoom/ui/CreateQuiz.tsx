import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useCreateQuizStore } from "../store/createQuizStore";
import { CategorySelector } from "./CategorySelector";
import { QuestionCountInput } from "./QuizQuestionsCountInput";
import { createQuizRoom } from "../api/createQuizRoom";

export const CreateQuizForm = () => {
  const navigate = useNavigate();
  const { selectedCategoryIds, questionCount, reset } = useCreateQuizStore();
  const [isCreating, setIsCreating] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedCategoryIds) return;

    setIsCreating(true);
    try {
      const roomCode = await createQuizRoom({
        category_ids: selectedCategoryIds,
        count_questions: questionCount,
      });
      reset();
      navigate(`../${roomCode}`, { relative: "route" });
    } catch (error) {
      console.error("Ошибка создания квиза:", error);
    }
    setIsCreating(false);
  };

  const isFormValid = selectedCategoryIds.length > 0 && questionCount > 0;
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        p: 3,
        boxShadow: 1,
        maxWidth: 500,
        width: "100%",
      }}
      component={"form"}
      onSubmit={handleFormSubmit}
    >
      <Typography variant="h5" gutterBottom align="center">
        Создать квиз
      </Typography>

      <Stack spacing={3}>
        <CategorySelector />
        <QuestionCountInput />

        <Button
          variant="contained"
          color="primary"
          type={"submit"}
          disabled={!isFormValid || isCreating}
          fullWidth
        >
          {isCreating ? "Создаём..." : "Создать квиз"}
        </Button>
      </Stack>
    </Box>
  );
};
