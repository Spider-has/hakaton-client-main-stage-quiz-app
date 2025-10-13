import { Paper, type PaperProps } from "@mui/material";

export const PaperBlock = ({ sx, ...props }: PaperProps) => (
  <Paper
    elevation={2}
    sx={{
      p: 3,
      bgcolor: "background.paper",
      borderRadius: 2,
      ...sx,
    }}
    {...props}
  />
);
