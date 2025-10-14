import {
  Typography,
  ListItem,
  Paper,
  List,
  ListItemButton,
  Alert,
  AlertTitle,
  Button,
} from "@mui/material";
import { type Question } from "../../../features";
import { useCallback, useEffect, useState } from "react";

interface CurrentQuestionProps {
  question: Question;
  hasSubmittedAnswer?: boolean;
  onAnswerSubmit?: (questionId: string, optionId: string) => void;
}
export const CurrentQuestion = ({
  question,
  hasSubmittedAnswer = false,
  onAnswerSubmit,
}: CurrentQuestionProps) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (hasSubmittedAnswer) {
      setIsSubmitted(true);
      setSelectedOptionId(null);
    } else {
      setIsSubmitted(false);
      setSelectedOptionId(null);
      setSubmitError(null);
    }
  }, [question.id, hasSubmittedAnswer]);

  const handleOptionSelect = useCallback(
    (optionId: string) => {
      if (!isSubmitted && !hasSubmittedAnswer) {
        setSelectedOptionId(optionId);
      }
    },
    [isSubmitted, hasSubmittedAnswer]
  );

  const handleSendAnswer = () => {
    if (!selectedOptionId || !onAnswerSubmit) return;

    try {
      onAnswerSubmit(question.id, selectedOptionId);
      setIsSubmitted(true);
      setSubmitError(null);
    } catch (err) {
      setSubmitError("Не удалось отправить ответ. Попробуйте ещё раз.");
    }
  };

  const isSubmitDisabled =
    !selectedOptionId || isSubmitted || hasSubmittedAnswer;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {question.text}
      </Typography>

      {(isSubmitted || hasSubmittedAnswer) && selectedOptionId && (
        <Alert severity="success" sx={{ mb: 2 }}>
          <AlertTitle>Ответ отправлен</AlertTitle>
          Вы выбрали: «
          {question.options.find((opt) => opt.id === selectedOptionId)?.text}»
        </Alert>
      )}

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}

      {!isSubmitted && !hasSubmittedAnswer && (
        <>
          <List sx={{ pl: 0, mb: 2 }}>
            {question.options.map((option) => (
              <ListItem key={option.id} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  selected={selectedOptionId === option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  sx={{
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor:
                      selectedOptionId === option.id
                        ? "primary.main"
                        : "divider",
                  }}
                >
                  <Typography>{option.text}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitDisabled}
            onClick={handleSendAnswer}
          >
            Отправить ответ
          </Button>
        </>
      )}
    </Paper>
  );
};
