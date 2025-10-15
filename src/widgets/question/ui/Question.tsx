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
import { type Question as BackendQuestion } from "../../../features";
import { useCallback, useEffect, useMemo, useState } from "react";

const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; 
  }
  return Math.abs(hash).toString();
};

interface FrontendOption {
  id: string;
  text: string;
}

interface FrontendQuestion {
  id: string; 
  text: string;
  options: FrontendOption[];
}

const toFrontendQuestion = (backendQuestion: BackendQuestion): FrontendQuestion => {
  return {
    id: backendQuestion.id,
    text: backendQuestion.text,
    options: backendQuestion.options.map((opt) => ({
      id: simpleHash(opt), 
      text: opt,
    })),
  };
};

interface CurrentQuestionProps {
  question: BackendQuestion;
  hasSubmittedAnswer?: boolean;
  onAnswerSubmit?: (answer: string) => void; 
}

export const CurrentQuestion = ({
  question,
  hasSubmittedAnswer = false,
  onAnswerSubmit,
}: CurrentQuestionProps) => {

  const frontendQuestion = useMemo(() => toFrontendQuestion(question), [question]);
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
  }, [frontendQuestion.id, hasSubmittedAnswer]); 

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

    const selectedOption = frontendQuestion.options.find(
      (opt) => opt.id === selectedOptionId
    );

    if (!selectedOption) {
      setSubmitError("Выбранный вариант не найден.");
      return;
    }

    try {
      onAnswerSubmit(selectedOption.text);
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
        {question.position}. {frontendQuestion.text}
      </Typography>

      {(isSubmitted || hasSubmittedAnswer) && selectedOptionId && (
        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Ответ отправлен</AlertTitle>
          Вы выбрали: «
          {frontendQuestion.options.find((opt) => opt.id === selectedOptionId)?.text}»
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
            {frontendQuestion.options.map((option) => (
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