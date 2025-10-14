import { Typography, Box, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

interface AnswerTimerProps {
  durationSeconds: number;
  onTimeUp?: () => void;
}

export const AnswerTimer = (props: AnswerTimerProps) => {
  const { durationSeconds, onTimeUp } = props;
  const [remaining, setRemaining] = useState(durationSeconds);

  useEffect(() => {
    if (remaining <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setTimeout(() => {
      setRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [remaining, onTimeUp]);

  const progress = (remaining / durationSeconds) * 100;

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Осталось: <strong>{remaining} сек</strong>
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ height: 8, borderRadius: 4 }}
      />
    </Box>
  );
};
