import { Button, Typography, Box } from "@mui/material";

type CreateRoomSectionProps = {
  onCreate: () => void;
};

export const CreateRoomSection = (props: CreateRoomSectionProps) => {
  const { onCreate } = props;
  return (
    <Box sx={{ textAlign: "center", mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Создайте свою комнату
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onCreate}
        sx={{ px: 4, py: 1.5 }}
      >
        Создать комнату
      </Button>
    </Box>
  );
};
